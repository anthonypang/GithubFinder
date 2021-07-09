import React, {useState, useEffect, Fragment} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import axios from 'axios'
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


const App = () => {

  const [users,setUsers] = useState([])
  const [user,setUser] = useState({})
  const [repos,setRepos] = useState([])
  const [loading,setLoading] = useState(false)
  const [showClear,setShowClear] = useState(true)
  const [alert,setAlertState] = useState(null)


  useEffect(() => {
    const getDefault = async() => {
      setLoading(true)
      const res = await axios.get(`https://api.github.com/users?client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      console.log(res.data);
      setUsers(res.data);
      setLoading(false);
    }
    getDefault();
    //eslint-disable-next-line
  }, []) 

 

  const searchUsers = async (text) => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    console.log(res.data)
    setUsers(res.data.items)
    setLoading(false)
    setShowClear(true)
  }

  //get a single github user
  const getUser = async (login) => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${login}?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    console.log(res.data)
    setUser(res.data)
    setLoading(false)
  }

  //get user repos
  const getUserRepos = async (login) => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    console.log(res.data)
    setRepos(res.data)
    setLoading(false)
  }

  const clearUsers = () => {
    setUsers([])
    setLoading(false)
    setShowClear(false)
  }

  const setAlert = (msg, type) => {
    setAlertState({msg,type})
    setTimeout(() => setAlertState(null),5000)
  }
  
    return (
      <Router>
        <div className='App'>
        <Navbar/>
        <div className="container">
          <Alert alert={alert}/>
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search searchUsers={searchUsers}
                clearUsers={clearUsers}
                showClear={showClear}
                setAlert={setAlert}/>
                <Users loading={loading} users={users}/>
              </Fragment>
            )}/>
            <Route exact path='/about' component={About}/>
            <Route exact path='/user/:login' render={props => (
              <Fragment>
                <User {...props} getUser={getUser} getUserRepos={getUserRepos} repos={repos} user={user} loading={loading}/>
              </Fragment>
            )}/>
          </Switch>
          
        </div>
        
      </div>
      </Router>
      
    );
  
}

export default App;
