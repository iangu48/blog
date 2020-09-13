import React, {Component, useContext} from 'react';
import firebase from "../../firebase";
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
    
    onSubmit = (e) => {
        e.preventDefault()

        const { title, desc, posted, updated = Date.now(), cover } = this.state;

        const updateRef = firebase.firestore().collection('posts').doc(this.state.key);

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

        console.log("reached")

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

                    <label htmlFor="cover">Cover:</label>
                    <input type="text" name="cover" value={this.state.cover}
                           onChange={this.onChange} placeholder="cover"/>

                    <button type="submit">Submit</button>
                </form>
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