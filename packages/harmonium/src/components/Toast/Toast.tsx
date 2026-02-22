import * as React from 'react'
import styles from './Toast.module.css'

export interface ToastData {
  id: string
  message: React.ReactNode
  variant?: 'info' | 'success' | 'warning' | 'error'
  duration?: number
}

interface ToastContextValue {
  toast: (options: Omit<ToastData, 'id'>) => string
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

let toastCounter = 0

export interface ToastProviderProps {
  children: React.ReactNode
  /** Position of toast stack */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

export function ToastProvider({children, position = 'bottom-right'}: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastData[]>([])
  const timersRef = React.useRef(new Map<string, ReturnType<typeof setTimeout>>())

  React.useEffect(() => {
    const timers = timersRef.current
    return () => {
      timers.forEach((timer) => clearTimeout(timer))
      timers.clear()
    }
  }, [])

  const dismiss = React.useCallback((id: string) => {
    const timer = timersRef.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timersRef.current.delete(id)
    }
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = React.useCallback(
    (options: Omit<ToastData, 'id'>) => {
      const id = `toast-${++toastCounter}`
      const duration = options.duration ?? 5000
      setToasts((prev) => [...prev, {...options, id}])
      if (duration > 0) {
        const timer = setTimeout(() => {
          timersRef.current.delete(id)
          dismiss(id)
        }, duration)
        timersRef.current.set(id, timer)
      }
      return id
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={{toast, dismiss}}>
      {children}
      {toasts.length > 0 && (
        <div className={styles.container} data-position={position}>
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  )
}

interface ToastItemProps {
  toast: ToastData
  onDismiss: (id: string) => void
}

function ToastItem({toast, onDismiss}: ToastItemProps) {
  return (
    <div
      className={styles.toast}
      data-variant={toast.variant || 'info'}
      role="status"
      aria-live="polite"
    >
      <span className={styles.message}>{toast.message}</span>
      <button
        type="button"
        className={styles.dismiss}
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss"
      >
        &times;
      </button>
    </div>
  )
}
