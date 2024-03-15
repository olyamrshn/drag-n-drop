import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, TextInput } from 'react-native';

// hide the input until the button is clicked
// add two inputs for tasks

const AddTaskForm: React.FC<{
  onPress: () => void;
  onPressIn: () => void;
  onPressOut: () => void;
  isActive: boolean;
}> = ({ onPress, onPressIn, onPressOut, isActive }) => {
  const [task, setTask] = useState('');

  return (
    <View style={styles.taskContainer}>
      <TextInput
        style={styles.taskInput}
        onChangeText={setTask}
        value={task}
        placeholder="Add a task..."
        placeholderTextColor="#ccc"
      />
      <TouchableOpacity
        onPress={() => {
          onPress();
          setTask('');
        }}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[styles.buttonContainer, !task ? styles.disabled : null]}
        disabled={!task}>
        <Text style={isActive ? styles.activeText : styles.text}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    margin: 'auto',
  },
  taskInput: {
    height: 40,
    width: 250,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    padding: 10,
    color: 'black',
  },
  buttonContainer: {
    backgroundColor: '#101010',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 1,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  active: {
    backgroundColor: 'white',
  },
  activeText: {
    color: '#101010',
  },
  text: {
    color: 'white',
  },
  disabled: {
    backgroundColor: 'grey',
  },
});

export default AddTaskForm;
