/**
 * harmonium/require-docs: the generated LLM docs (scripts/generate-llm-docs.ts)
 * are only as good as the JSDoc they read, so require it at the source.
 *
 * - Every exported component (PascalCase const or function) has a JSDoc
 *   description.
 * - The component a file is named after (Card in Card.tsx) is the family's
 *   main component: it also needs an `@example` and a `@category`.
 * - Every member of an exported interface or object type has a JSDoc
 *   description, or is marked `@internal` (and left out of the docs).
 */

const PASCAL = /^[A-Z][A-Za-z0-9]*$/

function jsdoc(sourceCode, node) {
  const comments = sourceCode.getCommentsBefore(node)
  const last = comments[comments.length - 1]
  if (!last || last.type !== 'Block' || !last.value.startsWith('*')) return null
  return last.value
}

function description(doc) {
  return doc
    .split('\n')
    .map((line) => line.replace(/^\s*\*\s?/, ''))
    .join('\n')
    .split(/^\s*@/m)[0]
    .trim()
}

export default {
  meta: {
    type: 'suggestion',
    docs: {description: 'Require JSDoc on exported components and their props'},
    schema: [],
    messages: {
      componentDescription: 'Exported component `{{name}}` needs a JSDoc description.',
      componentTag: '`{{name}}` is this file\'s main component, so its JSDoc needs `@{{tag}}`.',
      memberDescription: '`{{type}}.{{name}}` needs a JSDoc description.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode
    const fileBase = context.filename.split('/').pop().replace(/\.tsx?$/, '')

    function checkComponent(exportNode, name, reportNode) {
      if (!PASCAL.test(name)) return
      const doc = jsdoc(sourceCode, exportNode)
      if (!doc || !description(doc)) {
        context.report({node: reportNode, messageId: 'componentDescription', data: {name}})
        return
      }
      if (name !== fileBase) return
      for (const tag of ['example', 'category']) {
        if (!new RegExp(`@${tag}\\b`).test(doc)) {
          context.report({node: reportNode, messageId: 'componentTag', data: {name, tag}})
        }
      }
    }

    function checkMembers(typeName, members) {
      for (const member of members) {
        if (member.type !== 'TSPropertySignature' && member.type !== 'TSMethodSignature') continue
        const doc = jsdoc(sourceCode, member)
        // `@internal` members are left out of the generated docs.
        if (doc && (description(doc) || /@internal\b/.test(doc))) continue
        const name = member.key.type === 'Identifier' ? member.key.name : sourceCode.getText(member.key)
        context.report({node: member, messageId: 'memberDescription', data: {type: typeName, name}})
      }
    }

    return {
      ExportNamedDeclaration(node) {
        const decl = node.declaration
        if (!decl) return
        if (decl.type === 'VariableDeclaration') {
          for (const d of decl.declarations) {
            if (d.id.type !== 'Identifier' || !d.init) continue
            // Components are calls (forwardRef, memo) or functions; skip plain objects and contexts.
            let init = d.init
            while (init.type === 'TSAsExpression' || init.type === 'TSSatisfiesExpression') init = init.expression
            const isComponent =
              init.type === 'ArrowFunctionExpression' ||
              init.type === 'FunctionExpression' ||
              (init.type === 'CallExpression' &&
                /(^|\.)(forwardRef|memo)$/.test(sourceCode.getText(init.callee)))
            if (isComponent) checkComponent(node, d.id.name, d.id)
          }
        } else if (decl.type === 'FunctionDeclaration' && decl.id) {
          checkComponent(node, decl.id.name, decl.id)
        } else if (decl.type === 'TSInterfaceDeclaration') {
          checkMembers(decl.id.name, decl.body.body)
        } else if (decl.type === 'TSTypeAliasDeclaration') {
          const parts =
            decl.typeAnnotation.type === 'TSIntersectionType'
              ? decl.typeAnnotation.types
              : [decl.typeAnnotation]
          for (const part of parts) {
            if (part.type === 'TSTypeLiteral') checkMembers(decl.id.name, part.members)
          }
        }
      },
    }
  },
}
