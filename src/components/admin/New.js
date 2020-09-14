import React, {Component} from "react";
import firebase, {storage} from "../../firebase";
import {Link, navigate} from "@reach/router";
import Wrapper from "../Wrapper";
import Title from "antd/lib/typography/Title";
import {Button, Form, Input} from "antd";
import Text from "antd/lib/typography/Text";
import RichEditor from "../RichEditor";

class New extends Component {
    constructor(props) {
        super(props);
        this.postsCollection = firebase.firestore().collection("posts");
        this.state = {
            title: '',
            desc: '',
            content: '',
            posted: Date.now(),
            updated: Date.now(),
            cover: '',

        };
    }

    onEditorChange = (content, editor) => {
        const state = this.state;
        state.content = content;
        this.setState({post: state});
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

        const { title, desc, content, posted, updated, cover } = this.state;

        if (cover === '') {
            this.postsCollection.add({
                title,
                desc,
                content,
                posted,
                updated,
                cover
            }).then((docRef) => {
                this.setState({
                    title: '',
                    desc: '',
                    content: '',
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
                            content,
                            posted,
                            updated,
                            cover: url
                        }).then((docRef) => {
                            this.setState({
                                title: '',
                                desc: '',
                                content: '',
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
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };

        return (
            <Wrapper>
                <Title level={2} style={{color: "white", marginTop: "30px", fontWeight: 300}}>New Post</Title>

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
            </Wrapper>
        );
    }
}

export default New;