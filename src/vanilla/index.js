/**
 * Closes the given flash component
 * @param {HTMLElement} flashComponentElement The Flash component
 * @returns {void}
 */
export function closeFlash(flashComponentElement) {
  if (flashComponentElement) {
    flashComponentElement.parentNode.removeChild(flashComponentElement)
  }
}

/**
 * Initializes all flash components on page.
 * @returns {void}
 */
export function initializeFlash() {
  const components = document.querySelectorAll('.rev-Flash')

  for (let i = 0; i < components.length; i++) {
    const component = components[i]

    const closeButton = component.querySelector('.rev-Close')

    if (closeButton) {
      closeButton.addEventListener('click', (e) => {
        e.stopPropagation()
        closeFlash(component)
      })
    }
  }
}

function initializeAccordianItems(accordian) {
  const items = accordian.querySelectorAll('.rev-AccordionItem')

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const title = item.querySelector('.rev-AccordionItem-title')
    const content = item.querySelector('.rev-AccordionItem-content')

    if (title) {
      title.addEventListener('click', (e) => {
        e.stopPropagation()

        title.classList.toggle('rev-AccordionItem-title--selected')

        if (item) {
          item.classList.toggle('rev-AccordionItem--selected')
        }

        if (content) {
          content.classList.toggle('rev-AccordionItem-content--selected')
        }
      })
    }
  }
}

/**
 * Initializes all accordian components on page.
 * @returns {void}
 */
export function initializeAccordian() {
  const accordians = document.querySelectorAll('.rev-Accordion')

  for (let i = 0; i < accordians.length; i++) {
    const accordian = accordians[i]

    initializeAccordianItems(accordian)
  }
}

/**
 * Opens the given Modal component
 * @param {HTMLElement} modalElement The Modal component
 * @returns {void}
 */
export function openModal(modalElement) {
  if (modalElement) {
    modalElement.classList.add('rev-Modal--open')
  }
}

/**
 * Closes the given Modal component
 * @param {HTMLElement} modalElement The Modal component
 * @returns {void}
 */
export function closeModal(modalElement) {
  if (modalElement) {
    modalElement.classList.remove('rev-Modal--open')
  }
}

/**
 * Initializes all modals components on page.
 * @returns {void}
 */
export function initializeModal() {
  const modals = document.querySelectorAll('.rev-Modal')

  for (let i = 0; i < modals.length; i++) {
    const modal = modals[i]

    const closeButton = modal.querySelector('.rev-CloseButton')

    closeButton.addEventListener('click', (e) => {
      e.stopPropagation()
      closeModal(modal)
    })
  }
}

/**
 * Initializes all Harmonium components on page.
 * @returns {void}
 */
export function initializeAll() {
  initializeFlash()
  initializeAccordian()
  initializeModal()
}
