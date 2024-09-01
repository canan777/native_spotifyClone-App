import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';

export default function SongItem() {
  return (
    <Pressable>
      <Image
        source={{
          uri: 'https://www.google.com/imgres?q=horse%20wallpaper&imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-photo%2Fstallion-mane-waves-sunset-nature-beauty-unleashed-generated-by-artificial-intelligence_25030-67695.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Fphotos%2Fhorse-wallpaper-hd%2F2&docid=FVySP2dfFwH2PM&tbnid=jPNAzCUL39Y34M&vet=12ahUKEwiy0siFhJWHAxVQB9sEHcfVDx8QM3oECH0QAA..i&w=626&h=358&hcb=2&ved=2ahUKEwiy0siFhJWHAxVQB9sEHcfVDx8QM3oECH0QAA',
        }}
        style={{width: 50, height: 50}}
      />
    </Pressable>
  );
}