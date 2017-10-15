import React, { Component } from 'react'

import { connect } from 'react-redux'

var mnid = require("mnid");
import { getPatientCountForDoctor, addProvider } from '../../../util/connectors'


class Provider extends Component {

  constructor(props){
    super(props)

    this.checkDisabled = this.checkDisabled.bind(this)
    var networkDecoded = mnid.decode( props.user.address )
    this.state = {

      showProviderForm: false,
      providerName: "",
      providerSpecialty: "",
      providerAddress: networkDecoded.address,
      transactionHash: null
    }
  }

  componentDidMount(){

    getPatientCountForDoctor( '', count => {

      // this.setState({
      //   patientCount: count  
      // })
    })


  }

  submit(){

    addProvider({
      name: this.state.providerName,
      specialty: this.state.providerSpecialty,
      address: this.state.providerAddress
    }, transactionHash => {
      
      this.setState({
        transactionHash: transactionHash
      })
    })
  }

  handleAddProvider(){
    

    this.setState({
      showProviderForm: true
    })
  
  }

  checkDisabled(){
    return this.state.providerName.length == 0 || this.state.providerSpecialty.length === 0 || this.state.providerAddress.length === 0
  }

  handleNameChanged( e ){

    this.setState({
      providerName: e.target.value
    })
  }

  handleSpecialtyChanged( e ){
    
    this.setState({
      providerSpecialty: e.target.value
    })
  }

  handleAddressChanged( e ){
    
    this.setState({
      providerAddress: e.target.value
    })
  }

  render(){
    return (
      <div>
        
        <button className="btn btn-outline-primary" onClick={ this.handleAddProvider.bind(this) }>Add Provider</button>
        <br/>
        <div style={{ marginTop: 16 }}>
          {
            this.state.showProviderForm ? 
            
            <div className="card">
              <div className="card-header">
                Healthcare Provider Registration
              </div>
              
              <div className="card-body">
                <h4 className="card-title">On-Chain Registry</h4>
                <label>Name</label>
                <input type="text" onChange={ this.handleNameChanged.bind(this) } value={ this.state.providerName } className="form-control" />
                <label>Specialty</label>
                <input type="text" onChange={ this.handleSpecialtyChanged.bind(this) } value={ this.state.providerSpecialty } className="form-control" />
                <label>Address</label>
                <input type="text" onChange={ this.handleAddressChanged.bind(this) } value={ this.state.providerAddress } className="form-control" />
                <button onClick={ this.submit.bind(this) } disabled={ this.checkDisabled() } className="btn btn-sm btn-success">Register Now</button>

                {
                  this.state.transactionHash ? 
                  <p><a target="__blank" href={`https://rinkeby.etherscan.io/tx/${this.state.transactionHash}`}>Click here</a> to view this transaction on the Ethereum blockchain.</p>
                  : null
                }
              </div>
            </div>
            : null
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({

  user: state.user.data
})

export default connect(mapStateToProps)(Provider)