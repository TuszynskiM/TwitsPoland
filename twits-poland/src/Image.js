import React from 'react';

const Image = (props) => {
    return ( 
        <div className="image">
            <img src={props.src} alt="twitter Polska"/>
        </div>
     );
}
 
export default Image;