import React from "react"
import { Text as RNText, StyleProp, TextStyle } from "react-native"

interface TextProps {
  style?: StyleProp<TextStyle>
  children: React.ReactNode
}

const Text: React.FC<TextProps> = ({ style, ...props }) => {
  return <RNText style={[{ color: "white" }, style]} {...props} />
}

export default Text
