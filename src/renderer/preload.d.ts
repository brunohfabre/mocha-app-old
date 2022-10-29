import { Channels } from 'main/preload'

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, args?: any[]): void
        on(
          channel: string,
          func: (...args: unknown[]) => void,
        ): (() => void) | undefined
        once(channel: string, func: (...args: unknown[]) => void): void
      }
      node_env: 'development' | 'production'
      isMacos: boolean
    }
  }
}

export {}
