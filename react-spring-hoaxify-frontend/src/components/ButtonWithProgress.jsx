import React, { Component } from 'react';

class ButtonWithProgress extends Component {

    constructor(props) {
        super(props)
        
        this.state = {

        }

    }

    render() {
        return (
            <button className='btn btn-primary' 
            onClick={this.props.onClick} 
            disabled={this.props.disabled}>
            {this.props.pendingAPICall && (<div className="spinner-border text-light spinner-border-sm mr-sm-1" role="status">
                <span className="sr-only">Loading...</span>
            </div>)}
            {this.props.text}
            </button>
        );
    }
}

export default ButtonWithProgress;