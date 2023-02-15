import React, { Component } from 'react';
import UserListComponent from './UserListComponent';

class HomepageComponent extends Component {

    constructor(props) {
        super(props)
        
        this.state = {

        }

    }
    
    render() {
        return (
            <div>
                <UserListComponent/>
            </div>
        );
    }
}

export default HomepageComponent;