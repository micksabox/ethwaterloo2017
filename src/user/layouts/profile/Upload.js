import React, { Component } from 'react'

class Upload extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  callStorage(e) {
    fetch('http://localhost:8081/api/upload/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: this.refs.input.value,
            userId: this.props.authData.publicKey
        })
    });
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Upload</h1>
            <form>
                <p><textarea ref='input' /></p>
                <p><input type="button" value="Send file" onClick={this.callStorage.bind(this)} /></p>
            </form>
          </div>
        </div>
      </main>
    )
  }
}

export default Upload
