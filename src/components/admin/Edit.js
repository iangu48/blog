import React, {Component, useContext} from 'react';
import firebase, {storage} from "../../firebase";
import {navigate} from "@reach/router";
import {UserContext} from "../../providers/UserProvider";
import Wrapper from "../Wrapper";

class EditImpl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: '',
            title: '',
            desc: '',
            posted: '',
            updated: '',
            cover: '',
        }
    };

    delete(id) {

        firebase.firestore().collection('posts').doc(id).delete().then( () => {
            navigate('/');
            }).catch((error) => {
                console.log("error: ", error);
            }
        );
    }
    
    componentDidMount() {
        const ref = firebase.firestore().collection('posts').doc(this.props.id);
        ref.get().then((doc) => {
           if (doc.exists) {
               const post = doc.data();
               this.setState({
                   key: doc.id,
                   title: post.title,
                   desc: post.desc,
                   posted: post.posted,
                   updated: post.updated,
                   cover: post.cover,
               });
           } else {
               console.log("Cannot find document")
           }
        });
    }
    
    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({post: state});
    }

    onFileUpload = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.files[0];
        this.setState(state);
    }
    
    onSubmit = (e) => {
        e.preventDefault()

        const { title, desc, posted, updated = Date.now(), cover } = this.state;

        const updateRef = firebase.firestore().collection('posts').doc(this.state.key);

        if (typeof cover === "string") {
            updateRef.set({
                title, desc, posted, updated, cover
            }).then((docRef) => {
                this.setState({
                    key: '',
                    title: '',
                    desc: '',
                    posted: '',
                    updated: '',
                    cover: '',
                });
                navigate(`../`);

            }).catch((error) => {
                console.error("Error: ", error);
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
                        updateRef.set({
                            title, desc, posted, updated, cover: url
                        }).then((docRef) => {
                            this.setState({
                                key: '',
                                title: '',
                                desc: '',
                                posted: '',
                                updated: '',
                                cover: '',
                            });
                            navigate(`../`);

                        }).catch((error) => {
                            console.error("Error: ", error);
                        });
                    })
            });
        }




    }

    render() {
        return(
            <Wrapper>
                <h3>Edit</h3>
                <form onSubmit={this.onSubmit}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" value={this.state.title}
                           onChange={this.onChange} placeholder="Title"/>

                    <label htmlFor="desc">Description:</label>
                    <input type="text" name="desc" value={this.state.desc}
                           onChange={this.onChange} placeholder="Description"/>

                    <label htmlFor="cover">
                        Upload/change cover
                        <img src={this.state.cover} alt={""} style={{maxWidth:100}}/>
                    </label>
                    <input type={"file"} name={"cover"} onChange={this.onFileUpload}/>

                    <button type="submit">Submit</button>
                </form>
                <br/>
                <br/>
                <br/>
                <br/>
                <button onClick={this.delete.bind(this, this.state.key)}>Delete</button>

            </Wrapper>
        );
    }
}

export default function Edit(props) {
    const user = useContext(UserContext);
    const admin = user.email === "iangu234@gmail.com" || user.email === "ian.gu@mail.utoronto.ca";

    return <EditImpl admin={admin} {...props}/>
}