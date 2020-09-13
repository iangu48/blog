import React, {Component, useContext} from "react";
import firebase from "../../firebase";
import {Link} from "@reach/router";
import {UserContext} from "../../providers/UserProvider";
import Wrapper from "../Wrapper";

class BrowseImpl extends Component {
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
        const div = (
            <div>
                {this.props.admin ?
                    <Link to="/new">Add post</Link>
                    :
                    <div> </div>
                }

                <table style={{margin: "auto"}}>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.posts.map(post =>
                        <tr>
                            <td><Link to={`/${post.key}`}>{post.title}</Link></td>
                            <td>{post.desc}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
        return <Wrapper>{div}</Wrapper>;
    }
}

export default function Browse(props) {
    const user = useContext(UserContext);
    const admin = user.email === "iangu234@gmail.com" || user.email === "ian.gu@mail.utoronto.ca";

    return <BrowseImpl admin={admin} {...props} user={user}/>

};