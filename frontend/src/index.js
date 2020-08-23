
import moment from 'moment'
import 'moment/locale/pt-br'

import './assets/sass/global.scss';

import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';
import * as serviceWorker from './serviceWorker';

moment.locale('pt-br')

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
