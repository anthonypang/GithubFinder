import React, { Fragment, useEffect } from 'react'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Repos from '../repos/Repos'



const User = ({user, loading, repos, getUser, getUserRepos, match}) => {
    useEffect(() => {
        getUser(match.params.login)
        getUserRepos(match.params.login)
        //eslint-disable-next-line
    }, [])

        const {
            name,
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            followers,
            following,
            company,
            public_repos,
            public_gists,
            hireable
        } = user


        if (loading){
            return(
                <Spinner />
            )
        }
        return (
            <Fragment>
                <Link to='/' className='btn btn-light' >Back</Link>
                Hireable: {hireable ? <i className='fas fa-check text-success'/> : <i className='fas fa-times-circle text-danger'/>}
                <div className='card grid-2'>
                    <div className='all-center'>
                        <img src={avatar_url} className='round-img' style={{width: '150px'}} alt='user'/>
                        <h1>{name}</h1>
                        <p>{location}</p>
                    </div>
                    <div>
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                        <div>
                            <a href={html_url} target='_blank' rel="noreferrer" className='btn btn-dark my-1'>Visit GitHub Profile</a>
                            <ul>
                                <li><strong>Username:</strong> {login}</li>
                                {company && <li><strong>Company:</strong> {company}</li>}
                                {blog && <li><strong>Website: </strong>{blog}</li>}
                            </ul>
                        </div>
                    </div>
                    
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">Followers: {followers}</div>
                    <div className="badge badge-success">Following: {following}</div>
                    <div className="badge badge-light">Public Repos: {public_repos}</div>
                    <div className="badge badge-dark">Public Gists: {public_gists}</div>
                </div>
                <Repos repos={repos}/>
            </Fragment>
        )
    
}

User.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
}


export default User
