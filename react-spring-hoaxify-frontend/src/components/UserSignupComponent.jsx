import React, { Component } from 'react';
import UserService from '../services/UserService';
import ButtonWithProgress from './ButtonWithProgress';
import Input from './input';
import { WithRouter } from './WithRouter';
import {connect} from 'react-redux';
import LoginService from '../services/LoginService';
import * as authActions from "../redux/authActions";

class UserSignupComponent extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            displayName: "",
            username: "",
            password: "",
            repeatPassword: "",
            pendingAPICall: false,
            errors: {},
            passwordRepeatConfirmed: true
        }

        this.onChangeDisplayName = this.onChangeDisplayName.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRepeatPassword = this.onChangeRepeatPassword.bind(this);
        this.onClickSignup = this.onClickSignup.bind(this);
    }

    onChangeDisplayName = (event) => {
        const value = event.target.value;

        const errors = {...this.state.errors};
        delete errors.displayName;
        this.setState({displayName: value, errors});
    }

    onChangeUsername = (event) => {
        const value = event.target.value;

        const errors = {...this.state.errors};
        delete errors.username;
        this.setState({username: value, errors});
    }

    onChangePassword = (event) => {
        const value = event.target.value;
        const passwordRepeatConfirmed = this.state.repeatPassword === value;

        const errors = {...this.state.errors};
        delete errors.password;
        errors.repeatPassword = passwordRepeatConfirmed ? "": "Does not match to entered password";
        this.setState({password: value, passwordRepeatConfirmed, errors});
    }

    onChangeRepeatPassword = (event) => {
        const value = event.target.value;
        const passwordRepeatConfirmed = this.state.password === value;
        
        const errors = {...this.state.errors};
        errors.repeatPassword = passwordRepeatConfirmed ? "": "Does not match to entered password";
        this.setState({repeatPassword: value, passwordRepeatConfirmed, errors});
    }

    onClickSignup = (event)=>{
        event.preventDefault();

        let user = {
            username: this.state.username,
            displayName: this.state.displayName,
            password: this.state.password,
            reportPassword: this.state.repeatPassword
        };

        console.log("User -> " + JSON.stringify(user));
        this.setState({pendingAPICall: true});

        //UserService.signupNewUser(user).
        this.props.actions.signupNewUser(user).
        then((response) => {
            this.setState({pendingAPICall: false},
            () => {this.props.navigate("/")})
        })
        .catch(apiError => {
            let errors = {...this.state.errors}
            if(apiError.response.data && apiError.response.data.validationErrors){
                errors = {...apiError.response.data.validationErrors}
            }
            this.setState({pendingAPICall: false, errors})});
    }

    render() {
        return (
            <div className='container'>
                <h1 className='text-center'>Sign Up</h1>
                <div className='col-12 mb-3'>
                    <Input
                        label = "Display Name"  
                        placeholder='Your Display Name' 
                        value={this.state.displayName} 
                        onChange={this.onChangeDisplayName}
                        hasError = {this.state.errors.displayName && true}
                        error = {this.state.errors.displayName}
                      />
                </div>
                <div className='col-12 mb-3'>
                    <Input 
                    label = "Username" 
                    placeholder='Your Username' 
                    value={this.state.username} 
                    onChange={this.onChangeUsername} 
                    hasError = {this.state.errors.username && true}
                    error = {this.state.errors.username}/>
                </div>
                <div className='col-12 mb-3'>
                    <Input label="Password" 
                    placeholder='Your Password' 
                    type="password" 
                    value={this.state.password} 
                    onChange={this.onChangePassword}
                    hasError = {this.state.errors.password && true}
                    error = {this.state.errors.password}/>
                </div>
                <div className='col-12 mb-3'>
                    <Input label="Repeat Password" 
                    placeholder='Repeat Your Password' 
                    type="password" 
                    value={this.state.repeatPassword} 
                    onChange={this.onChangeRepeatPassword}
                    hasError = {this.state.errors.repeatPassword && true}
                    error = {this.state.errors.repeatPassword}/>
                </div>
                <div className='text-center'>
                    
                    <ButtonWithProgress 
                    onClick={this.onClickSignup} 
                    disabled={this.state.pendingAPICall || !this.state.passwordRepeatConfirmed}
                    pendingAPICall = {this.state.pendingAPICall}
                    text="Sign Up"/>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            signupNewUser: (user) =>  dispatch(authActions.signupHandler(user))
        }
    }
}

export default connect(null, mapDispatchToProps)(WithRouter(UserSignupComponent));