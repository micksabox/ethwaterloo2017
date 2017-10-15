import React, { Component } from 'react'
import { connect } from 'react-redux'

class Upload extends Component {
  constructor(props) {
    super(props)

    
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
            userId: this.props.user.publicKey
        })
    }).then((response) => response.json() )
      .then((responseJson) => {
        this.props.successCallback(responseJson);
        // this.setState({data: JSON.stringify(responseJson) });
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
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

const mapStateToProps = state => ({
  user: state.user.data
})

export default connect(mapStateToProps)(Upload)
