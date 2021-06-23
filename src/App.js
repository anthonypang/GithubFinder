import React, {Component, Fragment} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import axios from 'axios'
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

class App extends Component {

  state = {
    users: [],
    user:{},
    loading: false,
    showClear: true,
    alert: null
  }

  async componentDidMount() {

    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/users?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    console.log(res.data)
    this.setState({users:res.data, loading: false})
  }

  searchUsers = async (text) => {
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    console.log(res.data)
    this.setState({users:res.data.items, loading: false, showClear: true})
  }

  //get a single github user
  getUser = async (login) => {
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/users/${login}?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    console.log(res.data)
    this.setState({user:res.data, loading: false})
  }

  clearUsers = () => {
    this.setState({users:[], loading:false, showClear: false})
  }

  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}})
    setTimeout(() => this.setState({alert: null}),5000)
  }
  
  render(){
    return (
      <Router>
        <div className='App'>
        <Navbar/>
        <div className="container">
          <Alert alert={this.state.alert}/>
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search searchUsers={this.searchUsers}
                clearUsers={this.clearUsers}
                showClear={this.state.showClear}
                setAlert={this.setAlert}/>
                <Users loading={this.state.loading} users={this.state.users}/>
              </Fragment>
            )}/>
            <Route exact path='/about' component={About}/>
            <Route exact path='/user/:login' render={props => (
              <User {...props} getUser={this.getUser} user={this.state.user} loading={this.state.loading}/>
            )}/>
          </Switch>
          
        </div>
        
      </div>
      </Router>
      
    );
  }
}

export default App;
