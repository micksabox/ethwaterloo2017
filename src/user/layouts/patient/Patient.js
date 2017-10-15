import React, { Component } from 'react'

import { connect } from 'react-redux'

import { getDoctorCount, getDoctorAtIndex, createSignature, uport } from '../../../util/connectors'
var mnid = require('mnid')
import Upload from '../profile/Upload'

class Patient extends Component {

  constructor(props){
    super(props)

    this.state = {
      numDoctors: null,
      doctors: [],
      selectedDoctor: null,
      fileReference: null,
      transactionHash: null
    }
  }

  componentDidMount(){

    getDoctorCount(  doctorCount => {

      for( var i = 0; i < doctorCount; i++){
        
        getDoctorAtIndex( i, doctor => {

          var key = doctor[0];
          var name = doctor[3];
          var specialty = doctor[4];
          
          this.setState({
            doctors: [ ...this.state.doctors, { name, specialty, key }]
          })     
        })
      }
      
    });
  }

  selectDoctor( doctor ){

    this.setState({
      selectedDoctor: doctor
    })
  }

  handleSignTransaction(){

    var networkDecoded = mnid.decode( this.props.user.address )

    var patientPublicKey = networkDecoded.address;
    var providerPublicKey = this.state.selectedDoctor.key;

    createSignature({
      patientPublicKey,
      providerPublicKey,
      dataHash: "fdsajkfdjslajlfdsakl",
      dataFileReference: this.state.fileReference,
    }, (result) => {
      
      this.setState({
        transactionHash: result
      })
    })
  }

  render(){
    return (
      <div>
      <p>Select Doctor</p>
      <ul className="list-group">
      {
         this.state.doctors.map( (doctor, index) => (
          <li className="list-group-item" key={ doctor.key }>
            <a href="#" className="btn" onClick={ this.selectDoctor.bind(this, doctor) }>{ doctor.name } <span className="badge badge-secondary"> { doctor.specialty } </span></a>
          </li>
        ))
      }
      </ul>
      {
        this.state.selectedDoctor ? 
        <div>
          <Upload doctor={ this.state.selectedDoctor } selectedDoctor={ this.state.selectedDoctor } successCallback={ fileReference => {
            this.setState({
              fileReference: fileReference.fileID
            })
          }} />
        </div> 
        : null
      }
      {
        this.state.fileReference ? 
        <div>
          <button className="btn btn-outline-primary" onClick={ this.handleSignTransaction.bind(this) }>Sign Transaction</button>
        </div>
        : null
      }
      {
        this.state.transactionHash ?
        <div>
          <h2>Signature Created</h2>
          <p><a target="__blank" href={`https://rinkeby.etherscan.io/tx/${this.state.transactionHash}`}>Click here</a> to view this transaction on the Ethereum blockchain.</p>
        </div>
        : null
      }
    </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data
})

export default connect(mapStateToProps)(Patient)