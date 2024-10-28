import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Meta = (props) => {
  return (
    <View style={styles.item}>
      <Text>{props.text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'lightgray',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 15,
        borderRadius: 20,
      },
})

export default Meta;