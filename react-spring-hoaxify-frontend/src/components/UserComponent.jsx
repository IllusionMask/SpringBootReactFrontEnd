import React, { Component } from 'react';
import { WithRouter } from './WithRouter';
import UserService from '../services/UserService';
import ProfileCard from './ProfileCard';
import {connect} from 'react-redux';

class UserComponent extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            user: undefined,
            userNotFound: false,
            isLoadingUser: false,
            isEditable: false,
            inEditMode: false,
            originalDisplayName: undefined,
            pendingUpdateCall: false,
            image: undefined,
            errors: {}
        }

    }
    
    componentDidMount(){
        this.loadUser();
    }

    componentDidUpdate(prevProps){
        if(prevProps.params.username !== this.props.params.username){
            this.loadUser();
        }
    }

    loadUser = () => {
        const username = this.props.params.username;
        if(!username){
            return;
        }
        this.setState({userNotFound: false, isLoadingUser: true});
        UserService.getUser(username)
        .then(response => {this.setState({user: response.data, isLoadingUser: false})})
        .catch(error => {this.setState({userNotFound: true, isLoadingUser: false})});
    };

    onClickEdit = () => {
        this.setState({inEditMode: true});
    };

    onClickCancel = () => {
        const user = {...this.state.user};
        if(this.state.originalDisplayName !== undefined){
            user.displayName = this.state.originalDisplayName;
        }

        this.setState({inEditMode: false, user, originalDisplayName: undefined, image:undefined, errors:{}});
    };

    onClickSave = () => {
        const userId = this.props.loggedInUser.id;
        const userUpdate = {
            displayName: this.state.user.displayName,
            image: this.state.image && this.state.image.split(',')[1]
        };
        this.setState({pendingUpdateCall: true});
        UserService.updateUser(userId, userUpdate)
        .then((response) =>{
            const user = {...this.state.user};
            user.image = response.data.image; 
            this.setState({inEditMode:false, originalDisplayName:undefined, pendingUpdateCall:false, user, image:undefined}
                , () => {
                    const action = {
                        type: "update-success",
                        payload: user
                    }
                    this.props.dispatch(action);
                });})
        .catch(error => {
            let errors = {};
            if(error.response.data.validationErrors){
                errors = error.response.data.validationErrors;
            }
            this.setState({pendingUpdateCall: false, errors});
        });
    }

    onChangeDisplayName = (event) => {
        const user = {...this.state.user};
        
        let originalDisplayName = this.state.originalDisplayName;
        if(originalDisplayName === undefined){
            //Only update one time
            originalDisplayName = user.displayName;
        }

        user.displayName = event.target.value;

        const errors = {...this.state.errors};
        errors.displayName = undefined;
        this.setState({user, originalDisplayName, errors});
    };

    onFileSelect = (event) => {
        if(event.target.files.length === 0){
          //no file selected
          return;  
        }
        const errors = {...this.state.errors};
        errors.image = undefined;

        const file = event.target.files[0];
        let reader = new FileReader();
        //call after file is read, return text version of image
        reader.onloadend = () => {
            this.setState({image: reader.result, errors});
        };
        reader.readAsDataURL(file);
    }

    render() {
        let pageContent;
        if(this.state.isLoadingUser){
            pageContent = (
                <div className='d-flex'>
                    <div className="spinner-border text-primary m-auto">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        } else if(this.state.userNotFound){
            pageContent = (
                <div className="alert alert-danger text-center" role="alert">
                    <div className='alert-heading'>
                        <i className='fas fa-exclamation-triangle fa-3x'/>
                    </div>
                    <h5>User Not Found</h5>
                </div>
            );
        } else{
            const isEditable = this.props.loggedInUser.username === this.props.params.username;
            pageContent = this.state.user && (
            <ProfileCard user = {this.state.user} 
            isEditable={isEditable} 
            inEditMode={this.state.inEditMode} 
            onClickEdit={this.onClickEdit} 
            onClickCancel={this.onClickCancel}
            onClickSave={this.onClickSave}
            onChangeDisplayName = {this.onChangeDisplayName}
            pendingUpdateCall = {this.pendingUpdateCall}
            loadedImage = {this.state.image}
            onFileSelect = {this.onFileSelect}
            errors = {this.state.errors}/>);            
        }

       return (
            <div>
                {pageContent}
            </div>
        );  
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state
    }
};

export default connect(mapStateToProps)(WithRouter(UserComponent));