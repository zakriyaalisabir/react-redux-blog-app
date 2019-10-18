import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'react-icons/fa';
import { Provider } from 'react-redux';
import store from './redux/store';
import {
  BrowserRouter as Router,
  Route
} from '../node_modules/react-router-dom';

import logo from './assets/img/logo.png';
import './App.css';

import MainNav from './components/others/MainNav';
import TableView from './components/posts/listPosts/TableView';
import ContentView from './components/posts/viewPost/ContentView';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <MainNav logo={logo} />
            <Route path='/' exact strict component={TableView} />
            <Route path='/posts/:postId' component={ContentView} />
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
