import * as React from 'react'

/**
 * True inside an element that is already the page's banner landmark
 * (AppShellHeader), so a TopBar inside it renders a plain element instead of
 * a second, nested `<header>` banner.
 */
export const BannerContext = React.createContext(false)
