import React, { Component } from 'react'
import { Link } from 'react-router'

class Profile extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Profile</h1>
            <p>
              <strong>Name</strong><br />
              {this.props.authData.name}
            </p>
            <p>
              <strong>Raw JSON from uPort</strong><br />
              { JSON.stringify(this.props.authData) }
            </p>
            <Link to="upload">Upload Files</Link>

          </div>
        </div>
      </main>
    )
  }
}

export default Profile
