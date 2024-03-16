// import React, { useState } from "react"
// import { View } from "react-native"
// import Page from "./components/Page"
// import Taskbar from "./components/Taskbar"
// interface CardData {
//   id: string
//   heading: string
//   paragraph: string
// }

// const App: React.FC = () => {
//   const [cards, setCards] = useState<CardData[]>([])

//   const addNewCard = () => {
//     const newCard = {
//       id: Date.now().toString(),
//       heading: "new heading",
//       paragraph: "new paragraph",
//     }
//     setCards([newCard, ...cards])
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <Page cards={cards} setCards={setCards}/>
//       <Taskbar onAddCard={addNewCard} />
//     </View>
//   )
// }

// export default App

import React, { useState } from "react"
import { View, Modal } from "react-native"
import Page from "./components/Page"
import Taskbar from "./components/Taskbar"
import NewTodo from "./components/NewTodo"
interface CardData {
  id: string
  heading: string
  paragraph: string
}

const App: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([])
  const [isNewTodoVisible, setIsNewTodoVisible] = useState(false)

  const addNewCard = (card: CardData) => {
    setCards([card, ...cards]);
    setIsNewTodoVisible(false);
  };

  return (
<View style={{ flex: 1 }}>
      <Modal visible={isNewTodoVisible} animationType="slide">
        <NewTodo onAdd={addNewCard} />
      </Modal>
      <Page cards={cards} setCards={setCards} />
      <Taskbar onAddCard={() => setIsNewTodoVisible(true)} />
    </View>
  )
}

export default App
