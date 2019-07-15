import React, {Component} from 'react'
import {Button, message} from 'antd'
import {HashRouter,NavLink,Route,Redirect,Switch} from 'react-router-dom'

import Login from './pages/login/login'
import Admin from './pages/admin/admin'

class App extends Component {

  handleClick = () => {
    message.success('成功啦...');
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/admin" component={Admin}></Route>
        </Switch>
        <Redirect to="/login"/>
      </HashRouter>
    
    )
  }
}

export default App