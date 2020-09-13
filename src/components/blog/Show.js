import React, {Component, useContext} from "react";
import firebase from "../../firebase.js";
import {Link} from "@reach/router";
import {UserContext} from "../../providers/UserProvider";
import Wrapper from "../Wrapper";

class ShowImpl extends Component {
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
            <Wrapper>
                <div>
                    <Link to={"/"}>Home</Link>
                    { this.props.admin ?
                        <Link to={`/${this.state.key}/edit`}>Edit</Link>
                        :
                        null
                    }

                    <br/>

                    Title: {this.state.post.title}
                    <br/>
                    Desc: {this.state.post.desc}
                </div>
            </Wrapper>


        );
    }
}
// export default Show;

export default function Show(props) {
    const user = useContext(UserContext);
    const admin = user.email === "iangu234@gmail.com" || user.email === "ian.gu@mail.utoronto.ca";

    return <ShowImpl admin={admin} {...props}/>
}