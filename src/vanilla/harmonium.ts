/**
 * Closes the given flash component
 * @param {HTMLElement} flashComponentElement The Flash component
 * @returns {void}
 */
export function closeFlash(flashComponentElement: HTMLElement): void {
  if (flashComponentElement) {
    flashComponentElement.parentNode?.removeChild(flashComponentElement)
  }
}

/**
 * Initializes all flash components on page.
 * @returns {void}
 */
export function initializeFlashComponents(): void {
  const components = document.querySelectorAll('.rev-Flash')

  for (let i = 0; i < components.length; i++) {
    const component = components[i] as HTMLElement

    const closeButton = component.querySelector('.rev-Close')

    if (closeButton) {
      closeButton.addEventListener('click', (e) => {
        e.preventDefault()
        closeFlash(component)
      })
    }
  }
}

/**
 * Initializes all accordion items within an accordion
 * @param accordian The accordion element
 */
function initializeAccordianItems(accordian: HTMLElement): void {
  const items = accordian.querySelectorAll('.rev-AccordionItem')

  for (let i = 0; i < items.length; i++) {
    const item = items[i] as HTMLElement
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
export function initializeAccordianComponents(): void {
  const accordians = document.querySelectorAll('.rev-Accordion')

  for (let i = 0; i < accordians.length; i++) {
    const accordian = accordians[i] as HTMLElement

    initializeAccordianItems(accordian)
  }
}

/**
 * Opens the given Modal component
 * @param {HTMLElement} modalElement The Modal component
 * @returns {void}
 */
export function openModal(modalElement: HTMLElement): void {
  if (modalElement) {
    modalElement.classList.add('rev-Modal--open')
    modalElement.classList.remove('rev-Modal--closed')
  }
}

/**
 * Closes the given Modal component
 * @param {HTMLElement} modalElement The Modal component
 * @returns {void}
 */
export function closeModal(modalElement: HTMLElement): void {
  if (modalElement) {
    modalElement.classList.remove('rev-Modal--open')
    modalElement.classList.add('rev-Modal--closed')
  }
}

/**
 * Initializes all modals components on page.
 * @returns {void}
 */
export function initializeModalComponents(): void {
  const modals = document.querySelectorAll('.rev-Modal')

  for (let i = 0; i < modals.length; i++) {
    const modal = modals[i] as HTMLElement

    const closeButton = modal.querySelector('.rev-CloseButton')

    if (closeButton) {
      closeButton.addEventListener('click', (e) => {
        e.preventDefault()
        closeModal(modal)
      })
    }
  }
}

/**
 * Makes the given tab the active one
 * @param {HTMLElement} tabComponent The Tab component
 * @param {number} tabIndex The index of the tab to select
 * @returns {void}
 */
export function selectTab(tabComponent: HTMLElement, tabIndex: number): void {
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

/**
 * Initializes a single tab component
 * @param tabComponent The tab component to initialize
 */
function initializeTab(tabComponent: HTMLElement): void {
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
export function initializeTabsComponents(): void {
  const tabComponents = document.querySelectorAll('.rev-Tabs')

  for (let i = 0; i < tabComponents.length; i++) {
    const tabComponent = tabComponents[i] as HTMLElement

    initializeTab(tabComponent)
  }
}

/**
 * Opens the given Drawer component
 * @param {HTMLElement} drawerComponent The Drawer component element
 * @returns {void}
 */
export function openDrawer(drawerComponent: HTMLElement): void {
  drawerComponent.classList.add('rev-Drawer--open')
}

/**
 * Closes the given Drawer component
 * @param {HTMLElement} drawerComponent The Drawer component element
 * @returns {void}
 */
export function closeDrawer(drawerComponent: HTMLElement): void {
  drawerComponent.classList.remove('rev-Drawer--open')
}

/**
 * Initializes all drawer components on page.
 * @returns {void}
 */
export function initializeDrawerComponents(): void {
  const drawerComponents = document.querySelectorAll('.rev-Drawer')

  for (let i = 0; i < drawerComponents.length; i++) {
    const drawerComponent = drawerComponents[i] as HTMLElement

    const opener = drawerComponent.querySelector('.rev-Drawer-expander')
    const closer = drawerComponent.querySelector('.rev-Drawer-closer')

    if (opener) {
      opener.addEventListener('click', (e) => {
        e.preventDefault()
        openDrawer(drawerComponent)
      })
    }

    if (closer) {
      closer.addEventListener('click', (e) => {
        e.preventDefault()
        closeDrawer(drawerComponent)
      })
    }
  }
}

/**
 * Initializes all slider components on page.
 * @returns {void}
 */
export function initializeSliderComponents(): void {
  const sliderComponents = document.querySelectorAll('.rev-Slider')

  for (let i = 0; i < sliderComponents.length; i++) {
    const sliderComponent = sliderComponents[i] as HTMLElement

    const slider = sliderComponent.querySelector('.rev-Slider-range') as HTMLInputElement
    const input = sliderComponent.querySelector('.rev-Slider-input') as HTMLInputElement

    if (slider && input) {
      slider.addEventListener('input', () => {
        input.value = slider.value
      })

      input.addEventListener('input', () => {
        slider.value = input.value
      })
    }
  }
}

/**
 * Opens the given Expanding Column component.
 * @param {HTMLElement} expandingColumnComponent The expanding column component to open
 * @returns {void}
 */
export function openExpandingColumn(expandingColumnComponent: HTMLElement): void {
  expandingColumnComponent.classList.remove('is-closed')
  expandingColumnComponent.classList.add('is-open')
}

/**
 * Closes the given Expanding Column component.
 * @param {HTMLElement} expandingColumnComponent The expanding column component to close
 * @returns {void}
 */
export function closeExpandingColumn(expandingColumnComponent: HTMLElement): void {
  expandingColumnComponent.classList.add('is-closed')
  expandingColumnComponent.classList.remove('is-open')
}

/**
 * Initializes all expanding column components on page.
 * @returns {void}
 */
export function initializeExpandingColumnComponents(): void {
  const expandingColumnComponents = document.querySelectorAll(
    '.rev-ExpandingCol'
  )

  for (let i = 0; i < expandingColumnComponents.length; i++) {
    const expandingColumnComponent = expandingColumnComponents[i] as HTMLElement

    const expander = expandingColumnComponent.querySelector(
      '.rev-ExpandingCol-expander'
    )
    const closer = expandingColumnComponent.querySelector(
      '.rev-ExpandingCol-closer'
    )

    if (expander) {
      expander.addEventListener('click', (e) => {
        e.preventDefault()
        openExpandingColumn(expandingColumnComponent)
      })
    }

    if (closer) {
      closer.addEventListener('click', (e) => {
        e.preventDefault()
        closeExpandingColumn(expandingColumnComponent)
      })
    }
  }
}

/**
 * Initializes all components on page.
 * @returns {void}
 */
export function initializeAllComponents(): void {
  initializeFlashComponents()
  initializeAccordianComponents()
  initializeModalComponents()
  initializeTabsComponents()
  initializeDrawerComponents()
  initializeSliderComponents()
  initializeExpandingColumnComponents()
} 