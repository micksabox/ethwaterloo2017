import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../user/ui/loginbutton/LoginButtonActions'

class Home extends Component {

  setRole(role){

    this.props.setRole(role);
    this.props.loginUser();
  }
  
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Healthcare Dapp</h1>
            <button onClick={ this.setRole.bind(this, 'patient') }>I am a Patient</button>
            <button onClick={ this.setRole.bind(this, 'provider') }>I am a Healthcare Provider</button>
          </div>
        </div>
      </main>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  setRole: (role) => dispatch({ type: "SET_ROLE", payload: role }),
  loginUser: () => dispatch( loginUser() )
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
