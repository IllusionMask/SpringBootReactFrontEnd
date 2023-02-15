import React, { Component } from 'react';
import LoginService from '../services/LoginService';
import ButtonWithProgress from './ButtonWithProgress';
import Input from "./input"
import { WithRouter } from './WithRouter';
import {connect} from 'react-redux';
import * as authActions from "../redux/authActions";

class LoginComponent extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            username: "",
            password: "",
            apiError: undefined,
            pendingApiCall: false
        }

        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onClickLogin = this.onClickLogin.bind(this);
    }

    onChangeUsername = (event) => {
        const value = event.target.value;
        this.setState({username: value, apiError: undefined});
    }

    onChangePassword = (event) => {
        const value = event.target.value;
        this.setState({password: value, apiError: undefined});
    }

    onClickLogin = (event) => {
        event.preventDefault();
        
        let user = {username: this.state.username, password: this.state.password};
        this.setState({pendingAPICall: true})
        
        //LoginService.postLogin(user)
        //this.props.dispatch(authActions.loginHandler(user))
        this.props.actions.postLogin(user)
        .then((response) => {  
            this.setState({pendingAPICall: false},
                () => {this.props.navigate("/")})
            })
        .catch(error => {
            if(error.response){
                this.setState({apiError: error.response.data.message,
                pendingAPICall: false})
            }
        });
    }

    render() {

        let disableSubmit = false;
        if(this.state.username === "" || this.state.password === ""){
            disableSubmit = true;
        }

        return (
            <div>
               <h1 className='text-center'>Login</h1> 
               <div className='col-12 mb-3'>
                    <Input label="Username" placeholder = "Your username" 
                    value={this.state.username} onChange= {this.onChangeUsername}></Input>
               </div>
               <div className='col-12 mb-3'>
                    <Input label="Password" placeholder='Your password' type="password" 
                    value={this.state.password} onChange={this.onChangePassword}></Input>
               </div>
               {this.state.apiError && (
                <div className='col-12 mb-3'>
                        <div className='alert alert-danger'>{this.state.apiError}</div>
                </div>
               )}
               <div className='text-center'>
                    <ButtonWithProgress  
                    onClick={this.onClickLogin}
                    disabled = {disableSubmit || this.state.pendingApiCall}
                    pendingAPICall = {this.state.pendingAPICall}
                    text="Login"/>
               </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            postLogin: (user) =>  dispatch(authActions.loginHandler(user))
        }
    }
}


export default connect(null, mapDispatchToProps)(WithRouter(LoginComponent));