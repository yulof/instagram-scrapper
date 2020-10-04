import React from "react";
import './select.css'

function Select(props) {
    return (
        <select className="select" value={props.value} onChange={props.onChange}>
            {props.options.map(options => (
                <option key={options} value={options}>
                    {options + 1}
                </option>
            ))}
        </select>
    );
}

export default Select;