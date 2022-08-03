import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '../components/Home/Home';
import Songs from '../components/Songs/Songs';
import Playlists from '../components/Playlists/Playlists';
import Videos from '../components/Videos/Videos';
import Chart from '../components/Chart/Chart';
import Artists from '../components/Artists/Artists';
import PlayListItem from '../components/PlaylistItem/PlayListItem';
import SongDetail from '../components/SongDetail/SongDetail';
import TopicDetail from '../components/TopicDetail/TopicDetail';
import Top100 from '../components/Top100/Top100';
import VideoDetail from '../components/VideoDetail/VideoDetail';
import ArtistDetail from '../components/Artists/ArtistDetail';

const Router = () => {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<Home />} />
                <Route path="discover" >
                    <Route path="song/:params" element={<Songs />} />
                    <Route path="playlist/:params" element={<Playlists />} />
                    <Route path="video/:params" element={<Videos />} />
                    <Route path="artist/:params" element={<Artists />} />
                    <Route path="chart/:params" element={<Chart />} />
                </Route>
                <Route path="playlist">
                    <Route path=":key" element={<PlayListItem />} />
                </Route>
                <Route path="song">
                    <Route path=":key" element={<SongDetail />} />
                </Route>
                <Route path="topic">
                    <Route path=":key" element={<TopicDetail />} />
                </Route>
                <Route path="top100">
                    <Route path=":key" element={<Top100 />} />
                </Route>
                <Route path="video">
                    <Route path=":key" element={<VideoDetail />} />
                </Route>
                <Route path="artist">
                    <Route path=":key" element={<ArtistDetail />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default Router;
