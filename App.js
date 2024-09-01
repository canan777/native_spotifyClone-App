import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Navigation from './src/navigation/Routes'
import {SongsProvider} from './src/context/SongContext';
import { AlbumsProvider } from './src/context/AlbumsContext';
import { ArtistsProvider } from './src/context/ArtistContext';
import { ProfileProvider } from './src/context/ProfileContext';
export default function App() {
  return (
  <>
  <ProfileProvider>
  <ArtistsProvider>
   <AlbumsProvider>
      <Navigation/>
    </AlbumsProvider>
  </ArtistsProvider>
  </ProfileProvider>
  </>  
  )
}