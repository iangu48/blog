import React, { Component } from "react";
import firebase from "../../firebase.js";
import {Link} from "@reach/router";
import Wrapper from "../Wrapper";
import GuestWrapper from "../GuestWrapper";

class GuestShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            key: '',
        };
    };

    componentDidMount() {
        const ref = firebase.firestore().collection('posts').doc(this.props.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    post: doc.data(),
                    key: doc.id,
                    isLoading: false,
                });
            } else {
                console.log("Could not find document");
            }
        });
    }

    render() {

        return(
            <GuestWrapper>
                <div>

                    <img src={this.state.post.cover} alt={""} style={{maxWidth:400}}/>
                    <br/>
                    <br/>
                    Title: {this.state.post.title}
                    <br/>
                    Desc: {this.state.post.desc}
                </div>
            </GuestWrapper>


        );
    }
}

export default GuestShow;