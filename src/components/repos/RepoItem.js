import React from 'react'
import {PropTypes} from 'prop-types'


const RepoItem = ({repo}) => {
    return (
        <div>
           <a href={repo.html_url} target='__blank'>{repo.name}</a>
        </div>
    )
}

RepoItem.propType = {
    repo: PropTypes.object.isRequired,
}

export default RepoItem
