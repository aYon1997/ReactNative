import { View, Text } from 'react-native'
import React from 'react'

const Search = ({ route }) => {

  const item = route?.params || {};
  return (
    <View>
      <Text>{JSON.stringify(item)}</Text>
    </View>
  )
}

export default Search