import React from 'react';
import ReactDOM from 'react-dom';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './sass/index.scss';
import AppLayOut from "./components/AppLayOut/AppLayOut"

import { store } from "./redux/store"
import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppLayOut />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


