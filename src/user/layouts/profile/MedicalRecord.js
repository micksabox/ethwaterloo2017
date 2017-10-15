import React, { Component } from 'react'

class MedicalRecord extends Component {
  constructor(props, { authData }) {
    super(props)
    this.state = {
      data: '',
      record: {
        name: '',
        height: '',
        weight: '',
        allergies: []}
    };
    console.log('called', this.state);
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Medical Record</h1>
            <div className="table table-responsive">
              <p><strong>Name: </strong>{ this.props.record ? this.props.record.name : '' }</p>
              <p><strong>Height: </strong>{ this.props.record ? this.props.record.height : '' }</p>

              <p><strong>Weight: </strong>{ this.props.record ? this.props.record.weight : '' }</p>
              <p>
                <strong>Allergies: </strong>
                <ul>
                {this.props.record &&
                   this.props.record.allergies.map((x, i) =>
                      <li>{x}</li>
                    )
                }
                </ul>
              </p>
            </div>
          </div>
        </div>
    </main>
    )
  }
}

export default MedicalRecord
