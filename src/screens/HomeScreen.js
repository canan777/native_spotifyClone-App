import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, {useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import ArtistCard from '../components/ArtistCard';
import {AlbumsContext} from '../context/AlbumsContext';
import AlbumCard from '../components/AlbumCard';
import Loader from '../components/Loader';
import Error from '../components/Error';
import {ArtistsContext} from '../context/ArtistContext';
export default function HomeScreen() {
  const navigation = useNavigation();

  const {
    albums,
    loading: albumsLoading,
    error: albumsError,
  } = useContext(AlbumsContext);

  const {artists, loading, error} = useContext(ArtistsContext);
  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      {albumsLoading ? (
        <Loader />
      ) : albumsError ? (
        <Error error={albumsError} />
      ) : (
        <ScrollView
          style={{marginTop: 50}}
          contentContainerStyle={{paddingBottom: 100}}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Image
                source={{
                  uri: 'data:image/png;base64,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',
                }}
                style={styles.headerImage}
              />
              <Text style={styles.headerText}>messsage</Text>
            </View>

            <MaterialCommunityIcons
              name="lightning-bolt-outline"
              color="white"
              size={24}
            />
          </View>
          {/* TabButtons */}
          <View style={styles.tabButtons}>
            <Pressable style={styles.tabButton}>
              <Text style={styles.tabButtonText}>Music</Text>
            </Pressable>
            <Pressable style={styles.tabButton}>
              <Text style={styles.tabButtonText}>Podcast & Shows</Text>
            </Pressable>
          </View>
          {/*  */}
          <View>
            <Pressable
              onPress={() => navigation.navigate('Liked')}
              style={styles.likedSongs}>
              <LinearGradient colors={['#33006F', '#FFFFFF']}>
                <Pressable
                  style={{
                    width: 55,
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign name="heart" color="white" size={24} />
                </Pressable>
              </LinearGradient>

              <Text style={styles.likedSongsText}>Liked Songs</Text>
            </Pressable>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                flex: 1,
                marginHorizontal: 10,
                marginVertical: 8,
                backgroundColor: '#202020',
                borderRadius: 4,
              }}>
              <Image
                source={{uri: 'https://picsum.photos/100/100'}}
                style={{width: 55, height: 55}}
              />
              <View style={{}}>
                <Text
                  style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>
                  Hippop
                </Text>
              </View>
            </View>

            {/* flatlist renderitem */}
            <Pressable
              style={{
                marginVertical: 8,
                marginHorizontal: 10,
                backgroundColor: '#282828',
                flexDirection: 'row',
                borderRadius: 4,
              }}>
              <Image
                source={{uri: 'https://picsum.photos/200/300'}}
                style={{width: 55, height: 55}}
              />
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 8,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{fontSize: 13, fontWeight: 'bold', color: 'white'}}>
                  name
                </Text>
              </View>
            </Pressable>

            <Text style={styles.sectionTitle}>Your Top Artists</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {artists?.map((artist, index) => (
                <ArtistCard key={index} artist={artist} />
              ))}
            </ScrollView>

            <View style={{height: 10}} />

            <Text style={styles.sectionTitle}>Popular Albums</Text>
            {/* flatliste çevrilecek */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {albums?.map((album, index) => (
                <AlbumCard album={album} key={index} />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  tabButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 12,
    marginVertical: 5,
  },
  tabButton: {
    backgroundColor: '#282828',
    padding: 10,
    borderRadius: 30,
  },
  tabButtonText: {color: 'white', fontSize: 15},
  likedSongs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 8,
    backgroundColor: '#202020',
    borderRadius: 4,
  },
  likedSongsText: {color: 'white', fontSize: 13, fontWeight: 'bold'},
  sectionTitle: {
    color: 'white',
    marginHorizontal: 10,
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 10,
  },
});