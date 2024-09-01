import { createContext,useState} from "react";
//* 1.adım: Context oluşturmak için createContext reacttan import edilir ve kullanılır.
const Songs = createContext();

//* 2.adım:Context sağlayıcısıdır ve value propu ile sağlanan değerleri dışarıya aktarır.
//* children propu bu bileşen tarafından sarılan tüm alt bileşenleri ifade eder.
const SongsProvider = ({children}) => {
    const [songs, setSongs] = useState([]);

    return <Songs.Provider value={{songs}}></Songs.Provider>;
};

export {SongsProvider, Songs};