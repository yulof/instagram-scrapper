import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './input.css'
import Button from './components/button/button.js'
import Profile from "./components/profile/profile";
import Posts from "./components/posts/posts";
import {MDBRow, MDBCol, MDBContainer} from "mdbreact";


function App() {
    return (
        <div>
            <nav className="align-center">
                <input type="text" placeholder="Nombre de usuario" className="input" id="username"/>
                <Button color="blue-btn" label="Obtener" onClick={getData}/>
            </nav>

            <MDBContainer>
                <MDBRow>
                    <MDBCol size="12" lg="4" id="profile" className="align-center"/>
                    <MDBCol size="12" sm="6" lg="8" id="biography" style={{marginTop: "2rem"}}/>
                </MDBRow>
            </MDBContainer>

            <MDBContainer id="posts" style={{marginTop: "3rem"}}>
                <p>Introduce el nombre de la cuenta de Instagram que deseas buscar</p>
            </MDBContainer>

        </div>
    );
}

function getData() {
    let request = new Request('https://www.instagram.com/' + document.getElementById("username").value + '/?__a=1');

    fetch(request)
        .then(response => response.json())
        .then(data => {
                ReactDOM.render(
                    <Profile name={data['graphql']['user']['full_name']}
                             img={data['graphql']['user']['profile_pic_url_hd']}
                             followers={data['graphql']['user']['edge_followed_by']['count']}/>,
                    document.getElementById("profile")
                );

                ReactDOM.render(
                    <p>{data['graphql']['user']['biography']}</p>,
                    document.getElementById("biography")
                );

                if (data['graphql']['user']['is_private']) {
                    ReactDOM.render(
                        <p>La cuenta es privada</p>,
                        document.getElementById("posts")
                    );
                } else {
                    ReactDOM.render(<>
                            <h1>Últimas 12 publicaciones</h1>
                            <Posts
                                src={data['graphql']['user']['edge_owner_to_timeline_media']['edges']}
                            />
                        </>,
                        document.getElementById("posts")
                    );
                }
            }
        );
}

export default App;
