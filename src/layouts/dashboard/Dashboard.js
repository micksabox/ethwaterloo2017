import React, { Component } from 'react'

import { connect } from 'react-redux'

import Patient from '../../user/layouts/patient/Patient.js'
import Provider from '../../user/layouts/provider/Provider.js'

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>{this.props.role === 'patient' ? 'Patient' : 'Healthcare Provider' } Dashboard</h1>
            {
              this.props.role === "patient" ? <Patient /> : <Provider />
            }
          </div>
        </div>
      </main>
    )
  }
}

const mapStateToProps = state => ({
  role: state.user.role
})

export default connect(mapStateToProps)(Dashboard)
