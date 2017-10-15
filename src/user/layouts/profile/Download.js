import React, { Component } from 'react'
import MedicalRecord from '../profile/MedicalRecord'

class Download extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.state = {data: ''};
  }

  downloadMR(e) {
    // TODO Convert that to fileId
    fetch('http://localhost:8081/api/download/0e881f2b3a2512525b252cb6/')
    .then((response) => response.json() )
      .then((responseJson) => {
        // this.props.successCallback(responseJson);
        var resp = JSON.parse(JSON.stringify(responseJson).replace(/\r?\n?/g, '').trim());
        console.log(resp.data);
        this.setState({response: JSON.parse(resp.data)});
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
            <h1>Download Medical Record</h1>
            <form>
                {
                    this.state.data
                }

                <p><span ref="md"></span></p>
                <p><input type="button" value="Get Medical Record" onClick={this.downloadMR.bind(this)} /></p>

                <MedicalRecord record={this.state.response} />
            </form>
          </div>
        </div>
      </main>
    )
  }
}

export default Download
