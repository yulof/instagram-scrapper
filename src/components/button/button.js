import React from 'react';
import './button.css'

function Button(props) {
    return (
        <button
            className={"button " + props.color}
            onClick={props.onClick}
        >
            {props.label}
        </button>
    );
}

export default Button;
