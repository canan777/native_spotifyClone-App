import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation, useRoute} from '@react-navigation/native';
export default function SongInfoScreen() {
  const navigation = useNavigation();

  const route = useRoute();
  //* HomeScreenden gönderilen veriyi useRoute ile aldık
  const {album} = route.params || {};
  //* Gelen verileri parçalayarak aldık
  const {coverArt, name, artist, year} = album;

  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.paddingView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons color="white" size={24} name="arrow-back" />
          </TouchableOpacity>
          <View style={styles.imageView}>
            <Image source={{uri: coverArt}} style={styles.coverImage} />
          </View>
        </View>
        <Text style={styles.albumNameText}>{name}</Text>

        <View style={styles.artistView}>
          <Text style={styles.artistText}>{artist}</Text>
        </View>

        <Pressable style={styles.controlView}>
          <Pressable style={styles.downloadButton}>
            <AntDesign name="arrowdown" color="white" size={20} />
          </Pressable>

          <View style={styles.playButtonView}>
            <MaterialCommunityIcons
              name="cross-bolnisi"
              size={24}
              color="#1DB954"
            />
            <Pressable style={styles.playButton}>
              <Entypo name="controller-play" size={24} color="white" />
            </Pressable>
          </View>
        </Pressable>
        <View>
          <View style={styles.infoView}>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Album {name}</Text>

              <Text style={styles.infoText}>Artist {artist}</Text>
              <Text style={styles.infoText}>Year:{year}</Text>
            </View>
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollView: {marginTop: 50},
  paddingView: {padding: 10},
  imageView: {flex: 1, alignItems: 'center'},
  coverImage: {
    width: 200,
    height: 200,
  },
  albumNameText: {
    color: 'white',
    marginHorizontal: 12,
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  artistView: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  artistText: {
    color: '#909090',
    fontSize: 13,
    fontWeight: 'bold',
  },
  controlView: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  downloadButton: {
    backgroundColor: '#1DB954',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonView: {flexDirection: 'row', gap: 10, alignItems: 'center'},
  playButton: {
    backgroundColor: '#1DB954',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  infoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 10,
  },
  infoText: {color: 'white', fontWeight: '500', fontSize: 16},
  infoContainer: {
    gap: 5,
  },
});