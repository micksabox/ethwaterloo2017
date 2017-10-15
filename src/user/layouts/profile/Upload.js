import React, { Component } from 'react'
import { connect } from 'react-redux'

class Upload extends Component {
  constructor(props) {
    super(props)

    this.state = {
      record: null
    }
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
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return(
      <div>
        <h1>Upload Medical Record to { this.props.doctor.name }</h1>
        <form>
            {/* <button onClick={ ()=> this.setState({ record: {} }) } className="btn btn-success">Add Record</button> */}
            <p><textarea ref='input' defaultValue={'{ "name": "John Doe", "height": 185, "weight": 85, "allergies": [ "peanut", "soy" ] }'} className="form-control" /></p>
            <p><input className="btn btn-secondary" type="button" value="Send file" onClick={this.callStorage.bind(this)} /></p>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data
})

export default connect(mapStateToProps)(Upload)
