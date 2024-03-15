import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, TextInput } from 'react-native';

const AddTaskForm: React.FC<{
  onPressIn: () => void;
  onPressOut: () => void;
  isActive: boolean;
  onAddTask: (task: string, task2?: string) => void;
}> = ({ onPressIn, onPressOut, isActive, onAddTask }) => {
  const [showInput, setShowInput] = useState(false);
  const [task, setTask] = useState('');
  const [task2, setTask2] = useState('');

  const handleSubmit = () => {
    if (task.trim() || task2.trim()) {
      onAddTask(task.trim(), task2.trim());
      setTask('');
      setTask2('');
      setShowInput(false);
    }
  };

  return (
    <View
      style={
        showInput ? styles.taskContainer : [styles.taskContainer, styles.initialTaskContainer]
      }>
      {showInput && (
        <>
          <View style={styles.inputs}>
            <TextInput
              style={styles.taskInput}
              onChangeText={setTask}
              value={task}
              placeholder="Add a task..."
              placeholderTextColor="#ccc"
            />
            <TextInput
              style={styles.taskInput}
              onChangeText={setTask2}
              value={task2}
              placeholder="add description"
              placeholderTextColor="#ccc"
            />
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.text}>create</Text>
          </TouchableOpacity>
        </>
      )}
      {!showInput && (
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => setShowInput(true)}
          onPressIn={onPressIn}
          onPressOut={onPressOut}>
          <Text style={isActive ? styles.activeText : styles.text}>+</Text>
        </TouchableOpacity>
      )}
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
  initialTaskContainer: {
    justifyContent: 'flex-end',
  },
  inputs: {
    flex: 1,
    flexDirection: 'column',
  },
  taskInput: {
    height: 40,
    width: 250,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    padding: 10,
    color: 'black',
    marginBottom: 10,
  },
  plusButton: {
    backgroundColor: '#101010',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: 'white',
    borderWidth: 1,
    width: 30,
    marginTop: 10,
    marginLeft: 10,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#101010',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 1,
    width: 70,
    marginTop: 10,
    marginLeft: 10,
  },
  activeText: {
    color: '#101010',
    textAlign: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    margin: 'auto',
  },
});

export default AddTaskForm;
