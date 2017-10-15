import React, { Component } from 'react'

import { connect } from 'react-redux'

import { getPatientCountForDoctor, addProvider } from '../../../util/connectors'


class Provider extends Component {

  constructor(props){
    super(props)

    this.state = {

      provider: {
        name: null,
        specialty: null,
        address: null
      }
    }
  }

  componentDidMount(){

    getPatientCountForDoctor( '', count => {

      // this.setState({
      //   patientCount: count  
      // })
    })


  }

  handleAddProvider(){
    
    addProvider({
      name: "Michael Nolivos",
      specialty: "general",
      address:"0xc2e87d85f89117c5a5052134d2082d1145717620"
    }, function(){

    })
    
    // addProvider({
    //   name: "Michael O'Rourke",
    //   specialty: "general",
    //   address:"0xfc7846d06fab273c62cda0d29eac0936a22eeca4"
    // }, function(){

    // })

    // addProvider({
    //   name: "Diogenes Fernandes",
    //   specialty: "general",
    //   address:"0x0a233329ecb78915800ecc44ad80dba1b0ad9571"
    // }, function(){

    // })  
  }

  render(){
    return (
      <div>
        <p>Provider</p>
        {/* <input value={  } /> */}
        <button onClick={ this.handleAddProvider }>Add Provider</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps)(Provider)