import React, { PureComponent } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { hashHistory, Link } from 'react-router'

import query from '../queries/fetchSongs'

class SongCreate extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            title: ''
        }
    }

    onSubmit(event) {
        const { title } = this.state
        const { mutate } = this.props

        event.preventDefault()
    
        mutate({ variables: { title },
            refetchQueries: [{ query }]
        }).then(() => hashHistory.push('/'))
    }

    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Create a new song</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Song Title:</label>
                    <input 
                        onChange={e => this.setState({ title: e.target.value })}
                        value={this.state.title}
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
        )
    }
}

const mutation = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) {
            id
            title
        }
    }
`

export default graphql(mutation)(SongCreate)