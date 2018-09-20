import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import App from './src/App';
import store from "./src/state/createStore";

ReactDOM.render(
    <Provider store={store} >
        <App/>
    </Provider>
    , document.getElementById("root")
);