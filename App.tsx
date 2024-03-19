import Page from "components/Page"
import React, { useState } from "react"
import { View } from "react-native"

import NewTodo from "./components/NewTodo"
import Taskbar from "./components/Taskbar"
interface CardData {
  id: string
  heading: string
  paragraph: string
}

const App: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([])
  const [isNewTodoVisible, setIsNewTodoVisible] = useState(false)

  const addNewCard = (card: CardData) => {
    setCards([card, ...cards])
    setIsNewTodoVisible(false)
  }

  const cancelAdding = () => {
    setIsNewTodoVisible(false)
  }

  return (
    <View style={{ flex: 1 }}>
      <Page
        cards={cards}
        setCards={setCards}
        isNewTodoVisible={isNewTodoVisible}
      />
      {isNewTodoVisible && <NewTodo onAdd={addNewCard} />}
      <Taskbar
        onAddCard={() => setIsNewTodoVisible(true)}
        isAddingTodo={isNewTodoVisible}
        onCancel={cancelAdding}
      />
    </View>
  )
}

export default App
