import React, { useState } from "react";
import { View } from "react-native";
import Page from "./components/Page";
import Taskbar from "./components/Taskbar";
import NewTodo from "./components/NewTodo";
interface CardData {
  id: string;
  heading: string;
  paragraph: string;
}

const App: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [isNewTodoVisible, setIsNewTodoVisible] = useState(false);

  const addNewCard = (card: CardData) => {
    setCards([card, ...cards]);
    setIsNewTodoVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Page cards={cards} setCards={setCards} />
      {isNewTodoVisible && <NewTodo onAdd={addNewCard} />}
      <Taskbar onAddCard={() => setIsNewTodoVisible(true)} />
    </View>
  );
};

export default App;

