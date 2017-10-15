import React, { Component } from 'react'

import { connect } from 'react-redux'

import { getDoctorCount, getDoctorAtIndex, createSignature } from '../../../util/connectors'

import Upload from '../profile/Upload'

class Patient extends Component {

  constructor(props){
    super(props)

    this.state = {
      numDoctors: null,
      doctors: [],
      selectedDoctor: null,
      fileReference: null
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

    var patientPublicKey = this.props.user.address;
    var providerPublicKey = this.state.selectedDoctor.key;

    console.log( this.props.user, this.state.selectedDoctor )

    createSignature({
      patientPublicKey,
      providerPublicKey,
      dataHash: "fdsajkfdjslajlfdsakl",
      dataFileReference: this.state.fileReference,
    }, (result) => {
      
      console.log(result)
    })
  }

  render(){
    return (
      <div>
      <p>Select Doctor</p>
      {
         this.state.doctors.map( (doctor, index) => (
          <div key={ doctor.key }>
            <a href="#" onClick={ this.selectDoctor.bind(this, doctor) }>{ doctor.name } - { doctor.specialty }</a>
          </div>
        ))
      }
      {
        this.state.selectedDoctor ? 
        <div>
          <Upload successCallback={ fileReference => {
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
          <button onClick={ this.handleSignTransaction.bind(this) }>Sign Transaction</button>
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