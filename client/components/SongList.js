import React, { PureComponent } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import gql from 'graphql-tag'

import query from '../queries/fetchSongs'

import '../style/style.css'

class SongList extends PureComponent {
    onSongDelete(id) {
        const { mutate, data } = this.props

        mutate({ 
            variables: { id } })
                .then(() => data.refetch())
    }

    renderSongs() {
        return this.props.data.songs.map(({ id, title}) => {
            return (
                <li key={id} className="collection-item">
                    {title}
                    <i
                        className="material-icons"
                        onClick={() => this.onSongDelete(id)}
                    >
                        delete
                    </i>
                </li>
            )
        })
    }

    render() {
        const { loading } = this.props.data

        return ( loading ? <div>Loading...</div> :
        <div>
            <ul className="collection">
                {this.renderSongs()}
            </ul>
            <Link
                to="/songs/new"
                className="btn-floating btn-large red right"
                >
                <i className="material-icons">add</i>
            </Link>
        </div>
        )
    }
}

const mutation = gql`
    mutation DeleteSong($id: ID){
        deleteSong(id: $id) {
        title
        }
    }
`

export default graphql(mutation)(
    graphql(query)(SongList)
)