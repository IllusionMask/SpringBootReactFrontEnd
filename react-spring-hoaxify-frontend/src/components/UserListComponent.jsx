import React, { Component } from 'react';
import UserService from '../services/UserService';
import defaultIcon from '../assets/profile.png';
import {Link } from 'react-router-dom';
import ProfileImageWithDefault from './ProfileImageWithDefault';

class UserListComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            page:{
                content: [],
                number:0,
                size:3
            }
        }

    }
    
    componentDidMount(){
        this.loadData();
    }

    loadData = (requestedPage = 0) => {
        UserService.listUsers({page: requestedPage, size: this.state.page.size})
        .then((response) => {
            this.setState({page: response.data, loadError:undefined})
        })
        .catch(() => {
            this.setState({loadError: "User Load Failed"})
        });
    };

    onClickNext = () => {
        this.loadData(this.state.page.number + 1);
    };

    onClickPrevious = () => {
        this.loadData(this.state.page.number - 1);
    };


    render() {
        return ( 
            <div className='card'>
                <h3 className='card-title m-auto'>Users</h3>
                <div className='list-group list-group-flush'>
                    {this.state.page.content.map((user) => {
                        return <Link to ={`/${user.username}`} key={user.username} className='list-group-item list-group-item-action'>
                            <ProfileImageWithDefault className='rounded-circle' alt='profile' width="32" height="32" image={user.image}/>
                            <span className='pl-2'>{`${user.username}@${user.displayName}`}</span>
                            </Link>;
                    })}
                </div>
                <div className='clearfix'>
                    {!this.state.page.first &&(<span className='badge badge-light float-left' onClick={this.onClickPrevious} style={{cursor: 'pointer'}}>Previous</span>)}
                    {!this.state.page.last &&(<span className='badge badge-light float-right' onClick={this.onClickNext} style={{cursor: 'pointer'}}>Next</span>)}
                </div>
                {this.state.loadError && <span className='text-center text-danger'>{this.state.loadError}</span>}
            </div>
        );
    }
}

export default UserListComponent;