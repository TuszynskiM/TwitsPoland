import React from 'react';
import Image from './Image';

const Gallery = (props) => {
    const gallery = []
    props.twitterImgLinks.forEach((link, key) => {
        gallery.push(<Image key={key} src={link} />)
    });
    return ( 
        <div className="gallery">
            {gallery}
        </div> 
    );
}
 
export default Gallery;