import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import SongItem from '../components/SongItem';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import TrackPlayer, {useProgress} from 'react-native-track-player';
export default function LikedSongScreen() {
  const navigation = useNavigation();

  const progress = useProgress();
  console.log(progress);
  const [searchText, setSearchText] = useState('Türkiye de Popüler Müzikler');
  const [searchedTracks, setSearchedTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleSearch = async () => {
    setLoading(true);
    const options = {
      method: 'GET',
      url: '',
      params: {
        term: searchText,
        locale: 'tr-TR',
        offset: '0',
        limit: '5'
      },
      headers: {
        'x-rapidapi-key': '',
        'x-rapidapi-host': ''
      }
    };

    try {
      const response = await axios.request(options);
      setSearchedTracks(response.data.tracks.hits);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const setupPlayer = async () => {
    try {
      /*
       * `TrackPlayer` kütüphanesinin oynatıcıyı kurmasını sağlar.Bu işlem, oynatıcıyı başlatmak için
       * gerekli olan yapılandırmayı sağlar.
       */
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        //* Oynatıcının sahip olacağı özellikleri belirler
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY, // Oynatma işlemi yapabilmesi için kullanırız
          TrackPlayer.CAPABILITY_PAUSE, // Oynatıcıda duraklatma işlemi için kullanırız
          TrackPlayer.CAPABILITY_STOP, // Oynatıcıda durdurma işlemi için kullanırız
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT, // Oynatıcıda bir sonraki müziği geçiş yapabilmesi için kullanılır
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS, // Oynatıcıda bir önceki müziğe geçiş yapabilmesi için kullanılır
          TrackPlayer.CAPABILITY_SEEK_TO, // Belirli bir zamana atlama
        ],
        // compactCapabilities: [
        //   TrackPlayer.CAPABILITY_PLAY,
        //   TrackPlayer.CAPABILITY_PAUSE,
        //   TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        //   TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        // ],
      });
    } catch (error) {
      console.log('Error setting up player:', error);
    }
  };

  const handlePlay = async track => {
    const trackData = {
      id: track.track.key,
      url: track.track.hub.actions.find(action => action.type === 'uri').uri, // ses dosyasının urli
      title: track.track.title,
      artist: track.track.subtitle,
      artwork: track.track.images.coverart,
    };
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add(trackData);
      await TrackPlayer.play();
      setSelectedTrack(track.track);
      setModalVisible(true);
      setIsPlaying(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleSearch();
    setupPlayer();
  }, []);

  const formatTime = seconds => {
    // toplam saniyeyi dakikaya çevir
    const mins = Math.floor(seconds / 60);
    // toplam saniye sayısından geriye kalan saniyeyi hesaplar
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      //* Müzik oynatılıyorsa durdur
      await TrackPlayer.pause();
    } else {
      //* Müzik duruyorsa oynat
      await TrackPlayer.play();
    }
    //* isPlaying değerini oynatma ve durdurma butonuna basıldığında tam tersi değerine çevir
    setIsPlaying(!isPlaying);
  };
  //* Oynatılan müziği 10 saniye positiona göre geri aldık
  const seekBackward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position - 10);
  };
  const seekForward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + 10);
  };

  return (
    <>
      <LinearGradient colors={['#614385', '#516395']} style={{flex: 1}}>
        <ScrollView style={{flex: 1, marginTop: 50}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{marginHorizontal: 10}}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>

            <Pressable
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 10,
                marginTop: 9,
              }}>
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  padding: 9,
                  // flex: 1,
                  height: 38,
                  backgroundColor: '#42275a',
                  borderRadius: 8,
                }}>
                <AntDesign name="search1" size={20} color="white" />
                <TextInput
                  placeholderTextColor={'white'}
                  placeholder="Find in Liked songs"
                  style={{
                    fontWeight: '500',
                    width: '85%',

                    color: 'white',
                  }}
                  onChangeText={setSearchText}
                  onSubmitEditing={handleSearch}
                />
              </Pressable>
            </Pressable>
          </View>

          <View style={{marginHorizontal: 10, marginVertical: 10}}>
            <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
              Liked Songs
            </Text>
            <Text style={{color: 'white', fontSize: 13, marginTop: 5}}>
              {searchedTracks.length} songs
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator size={'large'} color={'gray'} />
          ) : (
            <FlatList
              data={searchedTracks}
              keyExtractor={item => item.track.key}
              style={{marginTop: 10}}
              renderItem={({item}) => (
                <Pressable onPress={() => handlePlay(item)}>
                  <View style={styles.trackContainer}>
                    <Image
                      source={{uri: item.track.images.coverart}}
                      style={styles.albumCover}
                    />
                    <View style={styles.trackInfo}>
                      <Text style={styles.trackName}>{item.track.title}</Text>
                      <Text style={styles.albumName}>
                        {item.track.subtitle}
                      </Text>
                    </View>
                    <Entypo name="controller-play" size={24} color="white" />
                  </View>
                </Pressable>
              )}
            />
          )}
        </ScrollView>
      </LinearGradient>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection="down" // modalın hangi yöne kaydırılacağını belirler
        onSwipeComplete={() => setModalVisible(false)}
        style={{margin: 0}}>
        <View
          style={{
            backgroundColor: '#5072A7',
            width: '100%',
            height: '100%',
            paddingTop: 60,
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <AntDesign name="down" size={24} color="white" />
            </TouchableOpacity>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
              song name
            </Text>
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </View>

          <View style={{padding: 10, marginTop: 20}}>
            <Image
              source={{
                uri: selectedTrack?.images.coverart,
              }}
              style={{width: '100%', height: 330, borderRadius: 4}}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <View>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                  {selectedTrack?.title}
                </Text>
                <Text style={{color: '#D3D3D3', marginTop: 4}}>
                  {selectedTrack?.subtitle}
                </Text>
              </View>
              <AntDesign name="heart" size={24} color="#1DB954" />
            </View>
            <View style={{marginTop: 10}}>
              <View
                style={{
                  width: '100%',
                  marginTop: 10,
                  height: 3,
                  backgroundColor: 'gray',
                  borderRadius: 5,
                }}>
                <View
                  style={[
                    styles.progressbar,
                    {
                      width: `${
                        (progress.position / progress.duration) * 100
                      }%`,
                    },
                  ]}
                />
                <View
                  style={{
                    position: 'absolute',
                    top: -5,
                    width: 10,
                    height: 10,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    left: `${(progress.position / progress.duration) * 100}%`,
                  }}
                />
              </View>

              <View
                style={{
                  marginTop: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontSize: 15}}>
                  {formatTime(progress.position)}
                </Text>
                <Text style={{color: 'white', fontSize: 15}}>
                  {formatTime(progress.duration)}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 17,
                  alignItems: 'center',
                }}>
                <Pressable onPress={seekBackward}>
                  <Entypo
                    name="controller-fast-backward"
                    size={30}
                    color="white"
                  />
                </Pressable>
                <Pressable>
                  <Ionicons name="play-skip-back" size={30} color={'white'} />
                </Pressable>
                <Pressable onPress={togglePlayback}>
                  {isPlaying ? (
                    <AntDesign name="pausecircle" size={60} color="white" />
                  ) : (
                    <Entypo name="controller-play" size={60} color="white" />
                  )}
                </Pressable>
                <Pressable>
                  <Ionicons name="play-skip-forward" size={30} color="white" />
                </Pressable>
                <Pressable onPress={seekForward}>
                  <Entypo
                    name="controller-fast-forward"
                    size={30}
                    color="white"
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  progressbar: {
    height: '100%',
    backgroundColor: 'white',
  },
  trackContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  albumCover: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  trackInfo: {
    flex: 1,
    marginLeft: 10,
  },
  trackName: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  albumName: {
    fontSize: 14,
    color: '#758694',
  },
});
