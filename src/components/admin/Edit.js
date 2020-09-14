import React, {Component, useContext} from 'react';
import firebase, {storage} from "../../firebase";
import {navigate} from "@reach/router";
import {UserContext} from "../../providers/UserProvider";
import Wrapper from "../Wrapper";
import Title from "antd/lib/typography/Title";
import { Row, Col, Form, Input, Button} from "antd";
import Text from "antd/lib/typography/Text";
import RichEditor from "../RichEditor";


class EditImpl extends Component {

    constructor(props) {

        super(props);
        this.state = {
            key: '',
            title: '',
            desc: '',
            content: '',
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
                   content: post.content,
                   posted: post.posted,
                   updated: post.updated,
                   cover: post.cover,
               });
           } else {
               console.log("Cannot find document")
           }
        });
    }

    onEditorChange = (content, editor) => {
        const state = this.state;
        state.content = content;
        this.setState({post: state});
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

        const { title, desc, content, posted, updated = Date.now(), cover } = this.state;

        const updateRef = firebase.firestore().collection('posts').doc(this.state.key);

        if (typeof cover === "string") {
            updateRef.set({
                title, desc, content, posted, updated: Date.now(), cover
            }).then((docRef) => {
                this.setState({
                    key: '',
                    title: '',
                    desc: '',
                    content: '',
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
                                content: '',
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
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };

        return(
            <Wrapper>
                <Row justify={"space-between"}>
                    <Col offset={4}>
                        <Title level={2} style={{color: "white", marginTop: "30px", fontWeight: 300}}>Edit</Title>
                    </Col>
                    <Col>
                        <Title level={5} style={{textAlign: "right", color: "white", marginTop: "30px", fontWeight: 300}}>Posted: {(new Date(this.state.posted)).toLocaleDateString()}</Title>
                        <Title level={5} style={{textAlign: "right", color: "white", marginTop: "0", fontWeight: 300}}>Last updated: {(new Date(this.state.updated)).toLocaleDateString()}</Title>
                    </Col>
                </Row>

                <Form onSubmit={this.onSubmit} layout={"horizontal"} {...layout}>
                    <Form.Item label={<Text style={{color: "#fdfdffff", fontWeight: 300}}>Title</Text>}>
                        <Input type="text" name="title" value={this.state.title}
                               onChange={this.onChange} placeholder="Title"/>
                    </Form.Item>

                    <Form.Item label={<Text style={{color: "#fdfdffff", fontWeight: 300}}>Upload/change cover</Text>}>
                        <Input type={"file"} name={"cover"} onChange={this.onFileUpload}>
                        </Input>
                        <img src={this.state.cover} alt={""} style={{maxWidth:100}}/>
                    </Form.Item>

                    <Form.Item label={<Text style={{color: "#fdfdffff", fontWeight: 300}}>Description</Text>}>
                        <Input type="text" name="desc" value={this.state.desc}
                               onChange={this.onChange} placeholder="Description"/>
                    </Form.Item>

                    <Form.Item label={<Text style={{color: "#fdfdffff", fontWeight: 300}}>Content</Text>}>
                        <RichEditor content={this.state.content} onEditorChange={this.onEditorChange}/>
                    </Form.Item>



                    <Button type="primary" onClick={this.onSubmit}>Submit</Button>
                </Form>
                <br/>
                <br/>
                <br/>
                <br/>
                <Button danger type={"primary"} onClick={this.delete.bind(this, this.state.key)}>Delete</Button>

            </Wrapper>
        );
    }
}

export default function Edit(props) {
    const user = useContext(UserContext);
    const admin = user.email === "iangu234@gmail.com" || user.email === "ian.gu@mail.utoronto.ca";

    return <EditImpl admin={admin} {...props}/>
}