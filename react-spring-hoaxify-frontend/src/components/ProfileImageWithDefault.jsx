import React from 'react';
import defaultIcon from '../assets/profile.png';

const ProfileImageWithDefault = (props) => {
    
    let imageSource = defaultIcon;
    if(props.image){
        imageSource = `/images/profile/${props.image}`;
        //imageSource = "/images/profile/profileSec.png";
    }
    
    return (
      //To disable alt in img
        // eslint-disable-next-line
        <img 
        {...props}
        src={props.src || imageSource}       
        onError={(event) => {
          //event.target.src = defaultIcon;
          //console.log(event.nativeEvent.message);
          console.log(event);
          console.log("The file location is " + imageSource);
          //console.error(event.target.src);
        }}
      />
    );
};

export default ProfileImageWithDefault;