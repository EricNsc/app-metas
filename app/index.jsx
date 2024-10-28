import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Meta from '@/components/Meta';

export default function App() {
  const [meta, setMeta] = useState('');
  const [metas, setMetas] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleMeta = () => {
    if (meta.trim()) {
      setShowDatePicker(true); 
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      const formattedDate = selectedDate.toLocaleDateString(); 
      const daysLeft = calculateDaysLeft(selectedDate); 
      setMetas([...metas, { text: meta, date: formattedDate, daysLeft }]);
      setMeta(''); 
    }
  };

  const calculateDaysLeft = (targetDate) => {
    const today = new Date();
    const timeDiff = targetDate - today; 
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    return daysLeft > 0 ? daysLeft : 0; 
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
          <ScrollView contentContainerStyle={styles.metaContainer}>
            {metas.map((meta, index) => (
              <View key={index} style={styles.metaItem}>
                <Meta text={`${meta.text} - ${meta.date}`} />
                <Text style={styles.daysLeftText}>
                  {meta.daysLeft > 0 ? `Falta ${meta.daysLeft} dias para a sua meta` : 'Meta expirada'}
                </Text>
                <Pressable onPress={() => handleDelete(index)}>
                  <Text style={styles.deleteText}>Excluir</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome da meta"
            value={meta}
            onChangeText={text => setMeta(text)}
          />
          <Pressable style={styles.addButton} onPress={handleMeta}>
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
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
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
  },
  metaContainer: {
    flexGrow: 1,
    width: '100%',
    paddingBottom: 70, 
  },
  metaItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  daysLeftText: {
    fontSize: 14,
    color: 'gray',
  },
  deleteText: {
    color: 'red',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    position: 'absolute',
    bottom: 10, 
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
