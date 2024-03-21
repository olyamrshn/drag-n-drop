declare module "react-native-text-editor" {
  interface UseEditorBridgeOptions {
    autofocus?: boolean
    avoidIosKeyboard?: boolean
  }

  export function useEditorBridge(options?: UseEditorBridgeOptions): any
}
