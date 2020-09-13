import React, {Component, useContext} from "react";
import firebase from "../../firebase.js";
import {Link} from "@reach/router";
import {UserContext} from "../../providers/UserProvider";
import Wrapper from "../Wrapper";
import {Button} from "antd";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";


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
                    { this.props.admin ?
                        <Button type={"default"} style={{marginBottom: 10}}><Link to={`/${this.state.key}/edit`}>Edit <FontAwesomeIcon icon={faEdit}/></Link></Button>
                        :
                        null
                    }

                    <br/>
                    <Title level={2} style={{color: "white", marginTop: "30px", fontWeight: 300}}>{this.state.post.title}</Title>

                    <img src={this.state.post.cover} alt={""} style={{maxHeight:"50vh", borderRadius: 10}}/>
                    <br/>

                    <br/>
                    <Paragraph style={{color: "#fdfdffff", textAlign: "justify", marginBottom: 0}}>
                        {this.state.post.desc}
                    </Paragraph>
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