import axios from "axios";
import { createContext, useEffect, useState } from "react";

const ArtistsContext = createContext();

const ArtistsProvider = ({children}) => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getArtists = async () => {
  const options = {
    method: 'GET',
    url: '',
    params: {
      q: 'Türkiye de popüler ',
      type: 'artists',
      offset: '0',
      limit: '10',
      numberOfTopResults: '5'
    },
    headers: {
      'x-rapidapi-key': '',
      'x-rapidapi-host': ''
    }
  };

  try {
    const response = await axios.request(options);
    const data = response.data.artists.items;
    setArtists(data);
    setLoading(false);
  } catch (error) {
    setError(error);
    setLoading(false);
  }
};
useEffect(() => {
  getArtists();
}, []);
  return (
  <ArtistsContext.Provider value={{artists, loading, error}}>{children}</ArtistsContext.Provider>
);
};

export {ArtistsContext,ArtistsProvider};
