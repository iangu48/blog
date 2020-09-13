import React, {Component } from "react";
import firebase from "../../firebase";
import {Link} from "@reach/router";
import GuestWrapper from "../GuestWrapper";

class GuestBrowse extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('posts');
        this.unsubscribe = null;
        this.state = {
            posts: []
        }
    }

    onCollectionUpdate = (querySnapshot) => {
        const posts = [];

        querySnapshot.forEach((doc) => {
            const { title, desc, cover, posted, updated } = doc.data();
            posts.push({
                key: doc.id,
                doc,  // snapshot
                title,
                desc,
                cover,
                posted,
                updated,
            });
        });

        this.setState( {
            posts
        })
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    render() {
        return (
            <GuestWrapper>
                <div>
                    <table style={{margin: "auto"}}>
                        <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.posts.map(post =>
                            <tr>
                                <td>
                                    <Link to={`/guest/${post.key}`}><img src={post.cover} alt={""} style={{maxWidth:400}}/></Link>
                                    <br/></td>
                                <td><Link to={`/guest/${post.key}`}>{post.title}</Link></td>
                                <td>{(new Date(post.posted)).toLocaleDateString()}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </GuestWrapper>
        );
    }
}

export default GuestBrowse;