import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function AlbumCard({album}) {
    const navigation = useNavigation();
  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Info', {album})}
      style={styles.albumContainer} >
        <Image source={{uri: album.coverArt}} style= {styles.albumImage } />
        <Text numberOfLines={1} style={styles.albumName}>
            {album.name}
            </Text>
        <Text numberOfLines={1} style={styles.albumArtist}>
            {album.artist}
            </Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    albumContainer: {
        width: 100,
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
      },
      albumImage: {
        width: 100,
        height: 100,
      },
      albumName: {
        color: 'white',
        marginTop: 7,
      },
      albumArtist: {color: 'gray', fontSize: 12},
});