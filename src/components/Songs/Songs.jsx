import React, { useState } from 'react';

import HeaderSong from './HeaderSong';
import ListSongs from './ListSongs';
import Footer from "../Footer/Footer"
// import { useParams } from 'react-router-dom';


const Songs = () => {

    const [key, setKey] = useState("moi-hot");


    return <div>
        <HeaderSong type="song" setKey={setKey} />
        <ListSongs param={key} type="song" />
        <Footer />
    </div>;
};

export default Songs;
