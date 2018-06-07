import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,

} from 'react-router-dom';

import './config';
import Login from './container/login/login';
import Register from './container/register/register';
import Authroute from './component/authroute/authroute'
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo'

const store = createStore(
    reducers,
    compose(applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

function Boss() {
    return <h2>boss component</h2>
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Authroute></Authroute>
                <Route path="/boss" component={BossInfo}></Route>
                <Route path="/bossinfo" component={BossInfo} />
                <Route path="/geniusinfo" component={GeniusInfo} />
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);


registerServiceWorker();
