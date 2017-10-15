import React, { Component } from 'react'

import { connect } from 'react-redux'

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
