import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'mobx-react'
import { GeneralStore } from './stores/GeneralStore'
import * as serviceWorker from './serviceWorker';


const generalStore = new GeneralStore()


const stores = { generalStore }

ReactDOM.render(<Provider {...stores}>
    <App />
</Provider>, document.getElementById('root'));

serviceWorker.register();
