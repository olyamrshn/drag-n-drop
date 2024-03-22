// @ts-ignore
import { enableLogging } from "@gorhom/bottom-sheet"
import { registerRootComponent } from "expo"
import { enableScreens } from "react-native-screens"

import App from "./App"

enableScreens(true)

enableLogging()

registerRootComponent(App)
