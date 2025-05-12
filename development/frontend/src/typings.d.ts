interface Window {
  turnstile?: {
    render: (container: string | HTMLElement, options: unknown) => void
    reset: (widgetId: string) => void
  }
}
