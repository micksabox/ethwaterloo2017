import React, { Component } from 'react'

class Download extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.state = {data: ''};
  }

  downloadMR(e) {
    fetch('http://localhost:8081/api/download/0e881f2b3a2512525b252cb6/')
      .then((response) => response.json() )
      .then((responseJson) => {
        // console.log(responseJson);
        this.setState({data: JSON.stringify(responseJson) });
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
            </form>
          </div>
        </div>
      </main>
    )
  }
}

export default Download
