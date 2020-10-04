import React from 'react';
import './profile.css'
import {MDBCard} from "mdbreact";
import Counter from "../counter/counter";

function Profile(props) {
    return (
        <MDBCard className="profile">
            <div>
                <img className="pic" src={props.img} alt="Profile"/>
                <a href={props.img} target="_blank" rel="noopener noreferrer">Descargar</a>
            </div>
            <div className="name">
                <h4>{props.name}</h4>
            </div>
            <Counter amount={props.followers} type="Seguidores"/>
        </MDBCard>
    );
}

export default Profile;