import React from 'react'
import Table from 'harmonium-react/lib/Table'
import Layout from '../../../layouts/index.js'

export default function MediaUploaderProps() {
  const propsArray = [
    {
      name: 'buttonLabel',
      type: 'string',
      defaultValue: 'Choose File',
      description: 'the text of the input button',
    },
    {
      name: 'className',
      type: 'string',
      defaultValue: 'none',
      description: 'className applied to the outer wrapper',
    },
    {
      name: 'defaultPreview',
      type: 'string',
      defaultValue: 'none',
      description:
        'the url of the original file if it exists (for populating edit forms)',
    },
    {
      name: 'getS3Info',
      type: 'function',
      defaultValue: 'none',
      description:
        'a function that takes a file and returns an object (see example above)',
    },
    {
      name: 'helpText',
      type: 'string',
      defaultValue: 'none',
      description:
        'help text to guide the user in selecting an appropriate file',
    },
    {
      name: 'imageClassName',
      type: 'string',
      defaultValue: 'none',
      description: 'custom className for styling the image preview container',
    },
    {
      name: 'label',
      type: 'string',
      defaultValue: 'none',
      description: 'label for the input',
    },
    {
      name: 'maxFileSize',
      type: 'number',
      defaultValue: '5',
      description: 'the maximum file size in MB',
    },
    {
      name: 'maxFileSizeMessage',
      type: 'string',
      defaultValue: 'Please choose a smaller file',
      description: 'error message shown to the user when the file is too large',
    },
    {
      name: 'name',
      type: 'string',
      defaultValue: 'none',
      description: 'the name attribute for the form input',
    },
    {
      name: 'placeholder',
      type: 'string',
      defaultValue: 'Choose file...',
      description: 'the placeholder text within the file input',
    },
    {
      name: 'required',
      type: 'bool',
      defaultValue: 'none',
      description: 'the required attribute',
    },
    {
      name: 'supportedFileTypes',
      type: 'array of strings',
      defaultValue:
        "['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'video/mp4']",
      description: 'an array of the supported file types for validation',
    },
    {
      name: 'supportedFileTypesMessage',
      type: 'string',
      defaultValue: 'Please choose a supported file type',
      description:
        'error message shown to the user when the file type is not supported',
    },
  ]

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Header>Name</Table.Header>
          <Table.Header>Type</Table.Header>
          <Table.Header>Default</Table.Header>
          <Table.Header>Description</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.HeadStacked>
        <Table.Row>
          <Table.Header>Media Uploader Props</Table.Header>
        </Table.Row>
      </Table.HeadStacked>
      <Table.Body>
        {propsArray.map(({name, type, defaultValue, description}, index) => (
          <Table.Row key={index}>
            <Table.Data>
              <Table.HeaderInline>Name:</Table.HeaderInline>
              {name}
            </Table.Data>
            <Table.Data>
              <Table.HeaderInline>Type:</Table.HeaderInline>
              {type}
            </Table.Data>
            <Table.Data>
              <Table.HeaderInline>Default:</Table.HeaderInline>
              {defaultValue}
            </Table.Data>
            <Table.Data>
              <Table.HeaderInline>Description:</Table.HeaderInline>
              {description}
            </Table.Data>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
