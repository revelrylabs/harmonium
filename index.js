export function initializeFlash() {
  const components = document.querySelectorAll('.rev-Flash')

  for (let i = 0; i < components.length; i++) {
    const component = components[i]

    closeButton = component.querySelector('.rev-Close')
    closeButton.addEventListener('click', (e) => {
      e.stopPropagation()
      component.parentNode.removeChild(component)
    })
  }
}

export function initializeAccordian() {
  const components = document.querySelectorAll('.rev-Accordion')

  for (let i = 0; i < components.length; i++) {
    const component = components[i]

    const item = component.querySelector('.rev-AccordionItem')
    const title = component.querySelector('.rev-AccordionItem-title')
    const content = component.querySelector('.rev-AccordionItem-content')

    title.addEventListener('click', (e) => {
      e.stopPropagation()
      item.classList.toggle('rev-AccordionItem--selected')
      title.classList.toggle('rev-AccordionItem-title--selected')
      content.classList.toggle('rev-AccordionItem-content--selected')
    })
  }
}

export function initializeAll() {
  initializeFlash()
  initializeAccordian()
}
