import * as React from 'react'
import {Toast as BaseToast} from '@base-ui/react/toast'
import styles from './Toast.module.css'

/** A toast, as passed to `toast()` (without `id`). */
export interface ToastData {
  /** Id returned by `toast()`, for `dismiss(id)` */
  id: string
  /** The message */
  message: React.ReactNode
  /** Color and urgency; `error` toasts are announced assertively. Defaults to `'info'`. */
  variant?: 'info' | 'success' | 'warning' | 'error'
  /** Milliseconds before it closes itself. Defaults to 5000; `0` or `Infinity` keeps it open until dismissed. */
  duration?: number
}

interface ToastContextValue {
  toast: (options: Omit<ToastData, 'id'>) => string
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

/**
 * Shows toasts from anywhere inside a `ToastProvider`. Returns
 * `toast({message, variant, duration})`, which returns the toast's id, and
 * `dismiss(id)`. Throws outside a `ToastProvider`.
 *
 * @category Feedback
 * @example
 * const {toast} = useToast()
 * toast({message: 'Saved', variant: 'success'})
 */
export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

export interface ToastProviderProps {
  /** Your app, or the part of it that shows toasts */
  children: React.ReactNode
  /** Position of toast stack */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

/**
 * Shows the toasts created with `useToast()`; wrap your app in it once.
 *
 * Built on Base UI. The viewport is a persistent `aria-live` region, so
 * screen readers announce each toast as it is added; `error` toasts are
 * announced assertively (`role="alert"`). Auto-dismiss timers pause while the
 * pointer is over the stack, while it has keyboard focus (F6 jumps to it) and
 * while the window is in the background.
 *
 * @category Feedback
 * @example
 * <ToastProvider position="top-right">
 *   <App />
 * </ToastProvider>
 */
export function ToastProvider({children, position = 'bottom-right'}: ToastProviderProps) {
  return (
    // No limit: every toast stays visible and interactive, as before
    <BaseToast.Provider limit={Number.POSITIVE_INFINITY}>
      <ToastApi>{children}</ToastApi>
      <ToastViewport position={position} />
    </BaseToast.Provider>
  )
}

function ToastApi({children}: {children: React.ReactNode}) {
  const {add, close} = BaseToast.useToastManager()
  const value = React.useMemo<ToastContextValue>(
    () => ({
      toast: ({message, variant = 'info', duration = 5000}) =>
        add({
          title: message,
          type: variant,
          // Base UI treats 0 as "never auto-dismiss"; a non-finite timer
          // (e.g. Infinity) would otherwise fire immediately.
          timeout: Number.isFinite(duration) ? duration : 0,
          priority: variant === 'error' ? 'high' : 'low',
        }),
      dismiss: (id) => close(id),
    }),
    [add, close],
  )
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

function ToastViewport({position}: {position: NonNullable<ToastProviderProps['position']>}) {
  const {toasts} = BaseToast.useToastManager()
  const swipeDirection = position.endsWith('left') ? 'left' : 'right'

  // Rendered in place (no portal), as before, so a `data-theme` wrapper still
  // applies to the toasts.
  return (
    <BaseToast.Viewport className={styles.container} data-position={position}>
      {/* Base UI lists the newest toast first; stack it last, as before */}
      {toasts
        .slice()
        .reverse()
        .map((t) => (
          <BaseToast.Root
            key={t.id}
            toast={t}
            className={styles.toast}
            data-variant={t.type ?? 'info'}
            swipeDirection={swipeDirection}
          >
            <BaseToast.Title className={styles.message} render={<span />}>
              {t.title}
            </BaseToast.Title>
            <BaseToast.Close className={styles.dismiss} aria-label="Dismiss">
              &times;
            </BaseToast.Close>
          </BaseToast.Root>
        ))}
    </BaseToast.Viewport>
  )
}
