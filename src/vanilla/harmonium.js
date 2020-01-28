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

  for (let i = 0; i < tabTitles.length; i++) {
    const tabTitle = tabTitles[i]

    tabTitle.addEventListener('click', (e) => {
      e.preventDefault()
      selectTab(tabComponent, i)
    })
  }
}

/**
 * Initializes all tabs components on page.
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
 * Opens the given Drawer component
 * @param {HTMLElement} drawerComponent The Drawer component element
 * @returns {void}
 */
export function openDrawer(drawerComponent) {
  drawerComponent.classList.add('rev-Drawer--open')
}

/**
 * Closes the given Drawer component
 * @param {HTMLElement} drawerComponent The Drawer component element
 * @returns {void}
 */
export function closeDrawer(drawerComponent) {
  drawerComponent.classList.remove('rev-Drawer--open')
}

/**
 * Initializes all drawer components on page.
 * @returns {void}
 */
export function initializeDrawerComponents() {
  const drawerComponents = document.querySelectorAll('.rev-Drawer')

  for (let i = 0; i < drawerComponents.length; i++) {
    const drawerComponent = drawerComponents[i]

    const opener = drawerComponent.querySelector('.rev-Drawer-expander')
    const closer = drawerComponent.querySelector('.rev-Drawer-closer')

    opener.addEventListener('click', (e) => {
      e.preventDefault()
      openDrawer(drawerComponent)
    })

    closer.addEventListener('click', (e) => {
      e.preventDefault()
      closeDrawer(drawerComponent)
    })
  }
}

/**
 * Initializes all slider components on page.
 * @returns {void}
 */
export function initializeSliderComponents() {
  const sliderComponents = document.querySelectorAll('.rev-Slider')

  for (let i = 0; i < sliderComponents.length; i++) {
    const sliderComponent = sliderComponents[i]

    const slider = sliderComponent.querySelector('.rev-Slider-range')
    const input = sliderComponent.querySelector('.rev-Slider-input')

    slider.addEventListener('input', () => {
      input.value = slider.value
    })

    input.addEventListener('input', () => {
      slider.value = input.value
    })
  }
}

/**
 * Opens the given Expanding Column component.
 * @param {HTMLElement} expandingColumnComponent The expanding column component to open
 * @returns {void}
 */
export function openExpandingColumn(expandingColumnComponent) {
  expandingColumnComponent.classList.remove('is-closed')
  expandingColumnComponent.classList.add('is-open')
}

/**
 * Closes the given Expanding Column component.
 * @param {HTMLElement} expandingColumnComponent The expanding column component to close
 * @returns {void}
 */
export function closeExpandingColumn(expandingColumnComponent) {
  expandingColumnComponent.classList.add('is-closed')
  expandingColumnComponent.classList.remove('is-open')
}

/**
 * Initializes all expanding column components on page
 * @returns {void}
 */
export function initializeExpandingColumnComponents() {
  const expandingColumns = document.querySelectorAll('.rev-ExpandingCol-pane')

  for (let i = 0; i < expandingColumns.length; i++) {
    const expandingColumnComponent = expandingColumns[i]

    const expander = expandingColumnComponent.querySelector(
      '.rev-ExpandingCol-expander'
    )

    expander.addEventListener('click', (e) => {
      e.preventDefault()

      if (expandingColumnComponent.classList.contains('is-closed')) {
        openExpandingColumn(expandingColumnComponent)
      } else {
        closeExpandingColumn(expandingColumnComponent)
      }
    })
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
  initializeDrawerComponents()
  initializeSliderComponents()
  initializeExpandingColumnComponents()
}
