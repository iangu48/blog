import React, {Component} from "react";
import firebase, {storage} from "../../firebase";
import {Link, navigate} from "@reach/router";
import Wrapper from "../Wrapper";

class New extends Component {
    constructor(props) {
        super(props);
        this.postsCollection = firebase.firestore().collection("posts");
        this.state = {
            title: '',
            desc: '',
            posted: Date.now(),
            updated: Date.now(),
            cover: '',

        };
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onFileUpload = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.files[0];
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { title, desc, posted, updated, cover } = this.state;

        if (cover === '') {
            this.postsCollection.add({
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
        } else {
            const name = `${Date.now()}-${cover.name}`
            const uploadTask = storage.ref(`/covers/${name}`).put(cover);
            uploadTask.on("state_changed", console.log, console.error, () => {
                storage
                    .ref("covers")
                    .child(name)
                    .getDownloadURL()
                    .then((url) => {
                        this.postsCollection.add({
                            title,
                            desc,
                            posted,
                            updated,
                            cover: url
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
                    })
            });
        }
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

                        <label htmlFor={"cover"}>Upload Cover</label>
                        <input type={"file"} name={"cover"} onChange={this.onFileUpload}/>

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </Wrapper>
        );
    }
}

export default New;