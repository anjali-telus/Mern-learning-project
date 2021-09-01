import React, { Fragment,useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';

import './App.css';
// import TodoList from './components/TodoList/TodoList';
//Redux
import { Provider } from 'react-redux';
import store from './Store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Todos from './components/TodoList/Todos';
import PrivateRoute from './components/routing/PrivateRoute'

if(localStorage.token){
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(()=>{
    store.dispatch(loadUser());
  },[]
  );
  return(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            {/* <Route exact path="/todoList" component={TodoList} /> */}
            <PrivateRoute exact path="/Todos" component={Todos} />

          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
)};

export default App;