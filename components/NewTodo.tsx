// import React, { useState } from "react";
// import { View, TextInput, Button, StyleSheet } from "react-native";

// interface NewTodoProps {
//   onAdd: (heading: string, paragraph: string) => void;
// }

// const NewTodo: React.FC<NewTodoProps> = ({ onAdd }) => {
//   const [heading, setHeading] = useState('');
//   const [paragraph, setParagraph] = useState('');

//   const handleAddPress = () => {
//     onAdd(heading, paragraph);
//     setHeading('');
//     setParagraph('');
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Заголовок"
//         value={heading}
//         onChangeText={setHeading}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Параграф"
//         multiline
//         value={paragraph}
//         onChangeText={setParagraph}
//       />
//       <Button title="Создать" onPress={handleAddPress} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   input: {
//     marginBottom: 10,
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
// });

// export default NewTodo;

import React, { useState } from "react"
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native"

interface CardData {
  id: string
  heading: string
  paragraph: string
}

const NewTodo: React.FC<{ onAdd: (card: CardData) => void }> = ({ onAdd }) => {
  const [heading, setHeading] = useState("")
  const [paragraph, setParagraph] = useState("")

  const handleCreate = () => {
    const newCard: CardData = {
      id: Date.now().toString(),
      heading,
      paragraph,
    }
    onAdd(newCard)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputHeading}
        placeholder="add todo heading"
        value={heading}
        onChangeText={setHeading}
      />
      <TextInput
        style={styles.inputParagraph}
        placeholder="add description"
        value={paragraph}
        onChangeText={setParagraph}
      />
<TouchableOpacity onPress={handleCreate} style={styles.createbutton}>
        <Text style={styles.createbuttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
    backgroundColor: "#fff",
  },
  inputHeading: {
    color: "black",
    fontSize: 25,
    marginTop: 100,
    marginBottom: 10,
  },
  inputParagraph: {
    color: "black",
    fontSize: 25,
  },
  createbutton: {
    marginTop: 100,
  },
  createbuttonText: {
    fontSize: 20,
  },
})

export default NewTodo
