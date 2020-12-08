const menuItems = [
    {
      category: 'Design Tokens',
      domain: 'design-tokens',
      contents: [
        {
          label: 'Blur',
          endpoint: '#blur'
        },
        {
          label: 'Border Radius',
          endpoint: '#border-radius'
        },
        {
          label: 'Colors',
          endpoint: '#colors'
        },
        {
          label: 'Fonts',
          endpoint: '#fonts'
        },
        {
          label: 'Font Sizes',
          endpoint: '#font-sizes'
        },
        {
          label: 'Font Weights',
          endpoint: '#font-weights'
        },
        {
          label: 'Grid',
          endpoint: '#grid'
        },
        {
          label: 'Icon Sizes',
          endpoint: '#icon-sizes'
        },
        {
          label: 'Line Heights',
          endpoint: '#line-heights'
        },
        {
          label: 'Opacity',
          endpoint: '#opacity'
        },
        {
          label: 'Screen Widths',
          endpoint: '#screen-widths'
        },
        {
          label: 'Shadows',
          endpoint: '#shadows'
        },
        {
          label: 'Spacing',
          endpoint: '#spacing'
        },
        {
          label: 'Z-Index',
          endpoint: '#z-index'
        }
      ]
    },
    {
        category: 'Grid',
        domain: 'components',
        contents: [
            {
                label: 'Rows & Columns',
                endpoint: 'grid'
            },
            {
                label: 'Expanding Columns',
                endpoint: 'ExpandingCol'
            }
        ]
    },
    {
        category: 'Forms',
        domain: 'components',
        contents: [
            {
                label: 'Buttons',
                endpoint: 'Button'
            },
            {
                label: 'Checkboxes',
                endpoint: 'Checkbox'
            },
            {
                label: 'Date Picker',
                endpoint: 'DatePicker'
            },
            {
                label: 'Inputs',
                endpoint: 'Input'
            },
            {
                label: 'Input Group',
                endpoint: 'InputGroup'
            },
            {
                label: 'Media Uploader',
                endpoint: 'MediaUploader'
            },
            {
                label: 'Radio Buttons',
                endpoint: 'Radio'
            },
            {
                label: 'Selects',
                endpoint: 'Select'
            },
            {
                label: 'Textareas',
                endpoint: 'Textarea'
            },
            {
                label: 'Time Picker',
                endpoint: 'TimePicker'
            },
            {
                label: 'Slider Input',
                endpoint: 'Slider'
            }
        ]
    },
    {
        category: 'Lists',
        domain: 'components',
        contents: [
            {
                label: 'Emptyable',
                endpoint: 'Emptyable'
            },
            {
                label: 'Pagination',
                endpoint: 'Pagination'
            },
            {
                label: 'Selects',
                endpoint: 'Select'
            }
        ]
    },
    {
        category: 'Formatting',
        domain: 'components',
        contents: [
            {
                label: 'Currency',
                endpoint: 'Currency'
            },
            {
                label: 'Number Formatter',
                endpoint: 'NumberFormatter'
            },
            {
                label: 'Pluralize',
                endpoint: 'Pluralize'
            }
        ]
    },
    {
        category: 'Navigation',
        domain: 'components',
        contents: [
            {
                label: 'Menu',
                endpoint: 'Menu'
            },
            {
                label: 'Top Bar',
                endpoint: 'TopBar'
            },
            {
                label: 'Stateful Drawer',
                endpoint: 'Drawer'
            },
            {
                label: 'Stateless Drawer',
                endpoint: 'StatelessDrawer'
            },
            {
                label: 'Breadcrumbs',
                endpoint: 'Breadcrumbs'
            }
        ]
    },
    {
        category: 'Media',
        domain: 'components',
        contents: [
            {
                label: 'Card',
                endpoint: 'Card'
            },
            {
                label: 'Card Layout',
                endpoint: 'CardLayout'
            },
            {
                label: 'Flex Video',
                endpoint: 'FlexVideo'
            },
            {
                label: 'Media Object',
                endpoint: 'MediaObject'
            }
        ]
    },
    {
        category: 'Containers',
        domain: 'components',
        contents: [
            {
                label: 'Accordion',
                endpoint: 'Accordion'
            },
            {
                label: 'Callout',
                endpoint: 'Callout'
            },
            {
                label: 'Modal',
                endpoint: 'Modal'
            },
            {
                label: 'Sticky',
                endpoint: 'Sticky'
            },
            {
                label: 'Tabs',
                endpoint: 'Tabs'
            },
            {
                label: 'Table',
                endpoint: 'Table'
            },
            {
                label: 'DataGrid',
                endpoint: 'DataGrid'
            }
        ]
    },
    {
        category: 'Atoms',
        domain: 'components',
        contents: [
            {
                label: 'Badge',
                endpoint: 'Badge'
            },
            {
                label: 'Close Button',
                endpoint: 'CloseButton'
            },
            {
                label: 'Icon',
                endpoint: 'Icon'
            }
        ]
    },
    {
        category: 'Utilities',
        domain: 'components',
        contents: [
            {
                label: 'Authenticity Token',
                endpoint: 'AuthenticityToken'
            },
            {
                label: 'Browser Support Warning',
                endpoint: 'BrowserSupportWarning'
            },
            {
                label: 'Help Text',
                endpoint: 'HelpText'
            },
            {
                label: 'Loader',
                endpoint: 'Loader'
            },
            {
                label: 'Progress',
                endpoint: 'Progress'
            },
            {
                label: 'Social',
                endpoint: 'Social'
            },
            {
                label: 'Text Align',
                endpoint: 'TextAlign'
            },
            {
                label: 'Visibility',
                endpoint: 'Visibility'
            }
        ]
    },
    {
        category: 'Prototyping',
        domain: 'components',
        contents: [
            {
                label: 'Lorem Ipsum',
                endpoint: 'Lipsum'
            }
        ]
    }, 
    {
        category: 'Map',
        domain: 'components/Map',
        contents: [
            {
                label: 'Default Map Component',
                endpoint: 'DefaultMap'
            },
            {
                label: 'Hybrid Map',
                endpoint: 'HybridMap'
            },
            {
                label: 'Small Designed Silver Map',
                endpoint: 'DesignedSilverMap'
            },
            {
                label: 'Designed Retro Map',
                endpoint: 'DesignedRetroMap'
            }
        ]
    },
    {
        category: 'Layout Examples',
        domain: 'components/LayoutExamples',
        contents: [
            {
                label: 'Log In',
                endpoint: 'LogIn'
            },
            {
                label: 'Registration',
                endpoint: 'Registration'
            },
            {
                label: 'Landing Page Sections',
                endpoint: 'Landing'
            },
            {
                label: 'Pricing Section',
                endpoint: 'Pricing'
            }
        ]
    }
  ]

  export default menuItems