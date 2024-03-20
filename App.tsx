import Page from "components/Page"
import React, { useState } from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { launchCamera, launchImageLibrary } from "react-native-image-picker"

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
    <>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#121212" }}>
        <Page
          cards={cards}
          setCards={setCards}
          isNewTodoVisible={isNewTodoVisible}
          onAdd={addNewCard}
        />
      </GestureHandlerRootView>
      <Taskbar
        onAddCard={() => setIsNewTodoVisible(true)}
        isAddingTodo={isNewTodoVisible}
        onCancel={cancelAdding}
      />
    </>
  )
}

export default App
