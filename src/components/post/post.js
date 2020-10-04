import React from 'react';
import './post.css'
import {MDBCard, MDBCardBody} from "mdbreact";
import Select from "./select/select";
import Media from "./media/media";
import Counter from "../counter/counter";

class Post extends React.Component {
    constructor(props) {
        super(props);

        let media = []
        let optionList = []
        let isVideo = []
        if (this.props.src['__typename'] === 'GraphSidecar') {
            for (let i = 0; i < this.props.src['edge_sidecar_to_children']['edges'].length; i++) {
                media.push(getMedia(this.props.src['edge_sidecar_to_children']['edges'][i]['node']))
                isVideo.push(this.props.src['edge_sidecar_to_children']['edges'][i]['node']['is_video'])
                optionList.push(i)
            }

        } else {
            media.push(getMedia(this.props.src))
            isVideo.push(this.props.src['is_video'])
        }

        this.state = {
            selectedValue: "0",
            optionList: optionList,
            media: media,
            isVideo: isVideo,
            likes: this.props.src['edge_liked_by']['count']
        };

        this.onOptionChange = this.onOptionChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.src !== this.state.source) {
            let media = []
            let optionList = []
            let isVideo = []
            if (nextProps.src['__typename'] === 'GraphSidecar') {
                for (let i = 0; i < nextProps.src['edge_sidecar_to_children']['edges'].length; i++) {
                    media.push(getMedia(nextProps.src['edge_sidecar_to_children']['edges'][i]['node']))
                    isVideo.push(nextProps.src['edge_sidecar_to_children']['edges'][i]['node']['is_video'])
                    optionList.push(i)
                }

            } else {
                media.push(getMedia(nextProps.src))
                isVideo.push(nextProps.src['is_video'])
            }

            this.setState({selectedValue: "0"});
            this.setState({optionList: optionList});
            this.setState({media: media});
            this.setState({isVideo: isVideo});
            this.setState({likes: nextProps.src['edge_liked_by']['count']})

        }
    }

    onOptionChange(e) {
        this.setState({selectedValue: e.target.value});
    }

    render() {
        const {selectedValue, optionList, media, isVideo, likes} = this.state;
        let source = this.props.src;

        let select
        if (source['__typename'] === 'GraphSidecar')
            select = <Select onChange={this.onOptionChange} value={selectedValue} options={optionList}/>

        return (
            <MDBCard className="mdbcard post-card w100">
                <Media className="img" src={media[selectedValue]} isVideo={isVideo[selectedValue]}/>
                {select}
                <a href={media[selectedValue]} target="_blank" rel="noopener noreferrer">Descargar</a>
                <MDBCardBody>{reduceString(text(source['edge_media_to_caption']['edges'][0]))}</MDBCardBody>
                <Counter className="red-color" type="Me gusta" amount={likes}/>
                <p>{timeConverter(source['taken_at_timestamp'])}</p>
            </MDBCard>
        );
    }
}

function getMedia(src) {
    if (src['is_video'])
        return src['video_url']

    return src['display_url']
}

function timeConverter(UNIX_timestamp) {
    let d = new Date(UNIX_timestamp * 1000);
    let months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    let year = d.getFullYear();
    let month = months[d.getMonth()];
    let date = d.getDate();
    let hour = twoDigits(d.getHours());
    let min = twoDigits(d.getMinutes());
    let sec = twoDigits(d.getSeconds());
    return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
}

function twoDigits(number) {
    if (number === 0)
        return "00"

    if (number < 10)
        return "0" + number

    return number
}

function text(node) {
    if (node === undefined)
        return ""

    return node['node']['text'];
}

function reduceString(str) {
    let string = str;
    if (str.length > 100) {
        string = str.substr(0, 100).concat("...");
    }

    return string;
}

export default Post;