import React, { Component } from "react";
import firebase from "../../firebase.js";
import GuestWrapper from "../GuestWrapper";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";
import {Space} from "antd";

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

                    <br/>
                    <Title level={2} style={{color: "white", marginTop: "30px", fontWeight: 300}}>{this.state.post.title}</Title>

                    <img src={this.state.post.cover} alt={""} style={{maxHeight:"50vh", borderRadius: 10}}/>
                    <br/>

                    <br/>
                    <Space direction={"horizontal"}>
                        <div dangerouslySetInnerHTML={{
                            __html: this.state.post.content
                        }}/>
                    </Space>
                </div>
            </GuestWrapper>


        );
    }
}

export default GuestShow;