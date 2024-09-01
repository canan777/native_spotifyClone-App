import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
//* 1.adım: Context'in temelini oluşturur
const AlbumsContext = createContext();
//* 2.adım: Sarmalayıcı yapı(Provider yapısı).Context sağlayıcısıdır ve value propu ile sağlanan değerleri dışarıya aktarır.
//* children propu bu bileşen tarafından sarılan tüm alt bileşenleri ifade eder.
const AlbumsProvider = ({children}) => {
    const [albums,setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = async () => {
      const options = {
        method: 'GET',
        url: '',
        params: {
          q: 'Türkiye de popüler olanlar',
          type: 'albums',
          offset: '0',
          limit: '10',
          numberOfTopResults: '5'
        },
        headers: {
          'x-rapidapi-key': '',
          'x-rapidapi-host': ''
        }
      };
    
      try{
        //* API isteği
        const response = await axios.request(options);
        //* API'den gelen veriyi dönüp içerisindeki alacağımız verileri obje olarak aldık
        const albumsItems = response.data?.albums?.items?.map(item=> ({
          uri:item.data.uri,
          name:item.data.name,
          artist:item.data.artists.items[0].profile.name,
          coverArt:item.data.coverArt.sources[0].url,
          year: item.data.date.year,
        }));
        setAlbums(albumsItems);
        setLoading(false);
      }catch (error){
        setError(error);
        setLoading(false);

      }
    };

 useEffect(()=> {
  getData();
 }, []);
  return (
    <AlbumsContext.Provider value={{albums,loading,error}}>{children}
    </AlbumsContext.Provider>
  )
}

export  {AlbumsContext, AlbumsProvider};
