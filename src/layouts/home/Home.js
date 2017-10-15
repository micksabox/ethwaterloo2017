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
            <h1 style={{ 'text-align':'center'}}>myHΞALTH Identity System</h1>
            <div className="panel panel-info">
              <div className="row justify-content-center">
                <button className="btn btn-lg btn-outline-primary" onClick={ this.setRole.bind(this, 'patient') }>I am a Patient</button>
              </div>
              <br/>
              <div className="row justify-content-center">
                <button className="btn btn-lg btn-outline-primary" onClick={ this.setRole.bind(this, 'provider') }>I am a Healthcare Provider</button>
              </div>
            </div>
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
