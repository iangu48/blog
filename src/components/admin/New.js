import React, {Component} from "react";
import firebase from "../../firebase";
import {Link, navigate} from "@reach/router";
import Wrapper from "../Wrapper";

class New extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection("posts");
        this.state = {
            title: '',
            desc: '',
            posted: Date.now(),
            updated: Date.now(),
            cover: 'default cover',
        };
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { title, desc, posted, updated, cover } = this.state;

        this.ref.add({
            title,
            desc,
            posted,
            updated,
            cover
        }).then((docRef) => {
            this.setState({
                title: '',
                desc: '',
                posted: Date.now(),
                updated: Date.now(),
                cover: '',
            });
            navigate(`/${docRef.id}`);
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    render() {
        const {title, desc } = this.state;
        return (
            <Wrapper>
                <div>
                    <h4>new post</h4>
                    <h4><Link to="/">browse</Link></h4>

                    <form onSubmit={this.onSubmit}>
                        <label htmlFor="title">Title:</label>
                        <input type="text" name="title" value={title} onChange={this.onChange} placeholder="Title"/>

                        <label htmlFor="desc">Description:</label>
                        <textArea name="desc" onChange={this.onChange} placeholder="Description" cols="80"
                                  rows="3">{desc}</textArea>

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </Wrapper>
        );
    }
}

export default New;