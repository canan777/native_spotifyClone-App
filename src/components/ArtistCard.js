import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

export default function ArtistCard({artist}) {
  return (
    <TouchableOpacity>
      <View style={styles.artistContainer}>
        <Image
          source={{uri: artist.data.visuals.avatarImage.sources[0].url}}
          style={styles.artistImage}
        />
        <Text numberOfLines={1} style={styles.artistName}>
          {artist.data.profile.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  artistContainer: {
    margin: 10,
    width: 100,
  },
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  artistName: {
    color: 'white',
    marginTop: 7,
    textAlign: 'center',
  },
});