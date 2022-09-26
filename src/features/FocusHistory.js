import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {fontSizes, spacing} from '../utils/sizes'

export const FocusHistory = ({history}) => {
  
  if(!history || !history.length) return <Text style={styles.item}>We havent focused on anything yet </Text>;

  const renderItem = ({item}) => <Text style={styles.item}>  - {item}</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Things we have focused on </Text>
      <FlatList data={history} renderItem={renderItem} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: spacing.md,
  },
  title: {
    color: 'white',
    fontSize: fontSizes.md ,
    fontWeight: 'bold',
  },
  item:{
    color: 'white',
    fontSize: fontSizes.md,
    paddingTop: spacing.sm,
  }
})