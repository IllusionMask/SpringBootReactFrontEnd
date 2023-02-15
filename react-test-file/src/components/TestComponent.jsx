import React, { Component } from 'react';

class TestComponent extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            image:undefined,
            secondImage: undefined
        }
    }

    onFileSelect = (event) => {
        if(event.target.files.length === 0){
          //no file selected
          return;  
        }
        const file = event.target.files[0];
        let reader = new FileReader();
        //call after file is read, return text version of image
        reader.onloadend = () => {
            this.setState({image: reader.result});
        };
       
        reader.readAsDataURL(file);
    }

    onClickButton = () => {
        this.setState({secondImage:  this.state.image.split(',')[1]});
    }

    render() {
        return (
            <div>
                <h1>Image Test</h1>
                <img src={this.state.image}/>
                <h1>Sec Image Test</h1>
                <img src={this.state.secondImage}/>
                <input className='form-control-file mt-2' type = "file" onChange={this.onFileSelect}/>
                <div><button className='btn btn-primary' onClick={this.onClickButton}>Click</button></div>
                
            </div>
        );
    }
}

export default TestComponent;