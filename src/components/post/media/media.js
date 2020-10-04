import React from 'react';
import {MDBCardImage, MDBCardVideo} from "mdbreact";

function Media(props) {
    if (props.isVideo)
        return (
            <MDBCardVideo
                src={props.src}
                ratio={"1by1"}
            />
        );
    else
        return (
            <MDBCardImage
                className={props.className}
                src={props.src}
                waves
            />
        );
}

export default Media;
