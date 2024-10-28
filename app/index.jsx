import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Meta from '@/components/Meta';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function App() {
  const [meta, addmeta] = useState('');
  const [metas, setMetas] = useState([]);

  const handleMeta = () => {
    if (meta.trim()) {
      setMetas([...metas, meta]);
      addmeta('');
    }
  };

  const handleDelete = (index) => {
    let itemsCopy = [...metas];
    itemsCopy.splice(index, 1);
    setMetas(itemsCopy);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.taskwrapper}>
          <Text style={styles.title}>Metas</Text>
          <ScrollView style={styles.metaContainer}>
            {metas.map((meta, index) => (
              <TouchableOpacity key={index} onPress={() => handleDelete(index)}>
                <Meta text={meta} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Adicione uma nova meta"
            value={meta}
            onChangeText={text => addmeta(text)}
          />
          <Pressable style={styles.addButton} onPress={handleMeta}>
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
  },
  taskwrapper: {
    paddingTop: 60,
    paddingHorizontal: 30,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
  },
  metaContainer: {
    width: '100%',
    maxHeight: '70%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
  },
  addButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
