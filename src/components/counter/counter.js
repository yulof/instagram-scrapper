import React from "react";
import './counter.css'

function Counter(props) {
    return <p className={props.className}>{props.amount} {props.type}</p>;
}

export default Counter;