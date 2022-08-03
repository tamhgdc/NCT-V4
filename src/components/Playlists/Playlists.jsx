import { useState, useEffect } from 'react';

import HeaderSong from "../Songs/HeaderSong"
import ListSongs from '../Songs/ListSongs';
import Footer from '../Footer/Footer';

const Playlists = () => {

    const [key, setKey] = useState("moi-hot");

    return <div>
        <HeaderSong type="playlist" setKey={setKey} />
        <ListSongs type="playlist" param={key} />
        <Footer />
    </div>;
};

export default Playlists;
