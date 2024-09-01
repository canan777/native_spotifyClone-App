import {
  View,
  Text,
  ScrollView,
  Image,
  YellowBox,
  StyleSheet,
} from 'react-native';
import React, {useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ProfileContext} from '../context/ProfileContext';
import round from 'lodash/round';

export default function ProfileScreen() {
  const {profileData, loading, error} = useContext(ProfileContext);

  const {name, image_url, followers_count, public_playlists} = profileData;

  const formatFollowers = count => {
    if (count >= 1000000) {
      //* ikinci parametre işlemin kaç ondalık basamağa göre yapılacağını belirler
      return `${round(count / 1000000, 1)}M`;
    }
    if (count >= 1000) {
      return `${round(count / 1000, 1)}K`;
    }
  };

  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <ScrollView
        style={{marginTop: 50}}
        contentContainerStyle={{paddingBottom: 100}}>
        <View style={{padding: 12}}>
          <View style={styles.profileContainer}>
            <Image source={{uri: image_url}} style={styles.profileImage} />
            <View>
              <Text style={styles.profileName}>{name}</Text>
              <Text style={styles.profileFollowers}>
                {formatFollowers(followers_count)} followers
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Your Playlists</Text>
        <View style={styles.playlistContainer}>
          {public_playlists.map(playlist => (
            <View
              key={playlist.uri}
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}>
              <Image
                source={{uri: 'https://picsum.photos/200/300'}}
                style={styles.playlistImage}
              />
              <View>
                <Text style={styles.playlistName}>{playlist.name}</Text>
                <Text style={styles.playlistFollowers}>
                  {formatFollowers(playlist.followers_count)} followers
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  profileContainer: {flexDirection: 'row', alignItems: 'center', gap: 10},
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  profileName: {color: 'white', fontSize: 16, fontWeight: 'bold'},
  profileFollowers: {color: 'gray', fontSize: 16, fontWeight: 'bold'},
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginHorizontal: 12,
  },
  playlistContainer: {padding: 15},
  playlistImage: {width: 50, height: 50, borderRadius: 4},
  playlistName: {color: 'white'},
  playlistFollowers: {color: 'white', marginTop: 7},
});