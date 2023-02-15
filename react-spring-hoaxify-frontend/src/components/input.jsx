import React, { Component } from 'react';

class input extends Component {

    constructor(props) {
        super(props)
        
        this.state = {

        }


    }

    render() {
        let inputClassName = "form-control";

        if(this.props.type === 'file'){
            inputClassName += '-file'
        }
        
        // For differnt Case(Defalt, success, error case)
        if(this.props.hasError !== undefined){
            inputClassName += this.props.hasError? " is-invalid": " is-valid";
        }

        return (
            <div>
                {this.props.label && <label>{this.props.label}</label>}
                <input 
                className={inputClassName}
                type={this.props.type || "text"} 
                placeholder = {this.props.placeholder}
                value = {this.props.value}
                onChange = {this.props.onChange}/>
                {this.props.hasError &&<span className='invalid-feedback'>
                    {this.props.error}
                </span>}
            </div>
        );
    }
}

input.defaultProps = {
    onChange: () => {}
};

export default input;