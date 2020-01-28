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
export function initializeFlashComponents() {
  const components = document.querySelectorAll('.rev-Flash')

  for (let i = 0; i < components.length; i++) {
    const component = components[i]

    const closeButton = component.querySelector('.rev-Close')

    if (closeButton) {
      closeButton.addEventListener('click', (e) => {
        e.preventDefault()
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
        e.preventDefault()

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
export function initializeAccordianComponents() {
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
export function initializeModalComponents() {
  const modals = document.querySelectorAll('.rev-Modal')

  for (let i = 0; i < modals.length; i++) {
    const modal = modals[i]

    const closeButton = modal.querySelector('.rev-CloseButton')

    closeButton.addEventListener('click', (e) => {
      e.preventDefault()
      closeModal(modal)
    })
  }
}

/**
 * Makes the given tab the active one
 * @param {HTMLElement} tabComponent The Tab component
 * @param {number} tabIndex The index of the tab to select
 * @returns {void}
 */
export function selectTab(tabComponent, tabIndex) {
  const tabTitles = tabComponent.querySelectorAll('.rev-TabsTitle')
  const tabPanels = tabComponent.querySelectorAll('.rev-TabsItem-panel')

  for (let i = 0; i < tabTitles.length; i++) {
    const tabTitle = tabTitles[i]
    const tabPanel = tabPanels[i]

    if (tabIndex === i) {
      tabTitle.classList.add('rev-TabsTitle--selected')
      tabPanel.classList.add('rev-TabsItem-panel--selected')
    } else {
      tabTitle.classList.remove('rev-TabsTitle--selected')
      tabPanel.classList.remove('rev-TabsItem-panel--selected')
    }
  }
}

function initializeTab(tabComponent) {
  const tabTitles = tabComponent.querySelectorAll('.rev-TabsTitle-link')

  console.log(tabTitles)

  for (let i = 0; i < tabTitles.length; i++) {
    const tabTitle = tabTitles[i]

    tabTitle.addEventListener('click', (e) => {
      e.preventDefault()
      selectTab(tabComponent, i)
    })
  }
}

/**
 * Initializes all tab components on page.
 * @returns {void}
 */
export function initializeTabsComponents() {
  const tabComponents = document.querySelectorAll('.rev-Tabs')

  for (let i = 0; i < tabComponents.length; i++) {
    const tabComponent = tabComponents[i]

    initializeTab(tabComponent)
  }
}

/**
 * Initializes all Harmonium components on page.
 * @returns {void}
 */
export function initializeAllComponents() {
  initializeFlashComponents()
  initializeAccordianComponents()
  initializeModalComponents()
  initializeTabsComponents()
}
