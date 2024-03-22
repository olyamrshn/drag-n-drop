import Page from "components/Page"
import Toolbar from "components/Toolbar"
import React, { useState } from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"

interface CardData {
  id: string
  heading: string
  paragraph: string
}

const App: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([])
  const [isNewTodoVisible, setIsNewTodoVisible] = useState(false)

  const updatedCards = (card: CardData) => {
    setCards([card, ...cards])
    setIsNewTodoVisible(false)
  }

  const cancelAdding = () => {
    setIsNewTodoVisible(false)
  }

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: "black" }}>
        <Page
          cards={cards}
          setCards={setCards}
          isNewTodoVisible={isNewTodoVisible}
          onUpdate={updatedCards}
        />
      </GestureHandlerRootView>
      <Toolbar
        onAddCard={() => setIsNewTodoVisible(true)}
        isAddingTodo={isNewTodoVisible}
        onCancel={cancelAdding}
      />
    </>
  )
}

export default App
