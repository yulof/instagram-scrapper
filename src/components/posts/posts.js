import React from 'react';
import {MDBRow, MDBCol} from "mdbreact";
import Post from "../post/post";

export default class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: this.props.src
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.src !== this.state.source) {
            this.setState({source: nextProps.src});
        }
    }

    render() {
        const {source} = this.state;

        let postsRow1 = [], postsRow2 = [], postsRow3 = []
        for (let i = 0; i < source.length; i++) {
            if (i < 4) {
                postsRow1.push(
                    <MDBCol size="12" md="3" className="align-center">
                        <Post src={source[i]['node']}/>
                    </MDBCol>
                )
            } else if (i < 8) {
                postsRow2.push(
                    <MDBCol size="12" md="3" className="align-center">
                        <Post src={source[i]['node']}/>
                    </MDBCol>
                )
            } else {
                postsRow3.push(
                    <MDBCol size="12" md="3" className="align-center">
                        <Post src={source[i]['node']}/>
                    </MDBCol>
                )
            }
        }

        return (
            <>
                <MDBRow>
                    {postsRow1}
                </MDBRow>
                <MDBRow>
                    {postsRow2}
                </MDBRow>
                <MDBRow>
                    {postsRow3}
                </MDBRow>
            </>
        );
    }
}
