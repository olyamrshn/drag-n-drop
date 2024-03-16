import React, { useState } from "react"
import { View } from "react-native"
import Page from "./components/Page"
import Taskbar from "./components/Taskbar"
interface CardData {
  id: string
  heading: string
  paragraph: string
}

const App: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([])

  const addNewCard = () => {
    const newCard = {
      id: Date.now().toString(),
      heading: "new heading",
      paragraph: "new paragraph",
    }
    setCards([newCard, ...cards])
  }


  return (
    <View style={{ flex: 1 }}>
      <Page cards={cards} setCards={setCards}/>
      <Taskbar onAddCard={addNewCard} />
    </View>
  )
}

export default App
