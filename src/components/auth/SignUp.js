import React, { useState } from "react";
import {Link, navigate} from "@reach/router";
import {auth, generateUserDocument, signInWithGoogle} from "../../firebase";
import GuestWrapper from "../GuestWrapper";
import Title from "antd/lib/typography/Title";
import { Form, Input, Button, Space } from 'antd';
import {GoogleOutlined, LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import Text from "antd/lib/typography/Text";


const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState(null);

    const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
        event.preventDefault();
        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            generateUserDocument(user, {displayName});
            navigate('/')
        }
        catch(error){
            console.log(error);
            setError(error.code + ": " + error.message);
        }

        setEmail("");
        setPassword("");
        setDisplayName("");
    };

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "userEmail") {
            setEmail(value);
        } else if (name === "userPassword") {
            setPassword(value);
        } else if (name === "displayName") {
            setDisplayName(value);
        }
    };
    return (
        <GuestWrapper>
            <Title level={2} style={{color: "white", fontWeight: 350, marginTop: 100}}>Sign Up</Title>
            <Space direction={"vertical"}>
                {error !== null && (<div>{error}</div>)}

                <Form style={{width: "100"}}>
                    <Form.Item
                        name={"displayName"}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your display name!',
                            },
                        ]}>
                        <Input
                            type="text"
                            name="displayName"
                            value={displayName}
                            placeholder="Display name"
                            id="displayName"
                            onChange={event => onChangeHandler(event)}
                            prefix={<UserOutlined />}
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input
                            type="email"
                            name="userEmail"
                            value={email}
                            placeholder="example@gmail.com"
                            id="userEmail"
                            onChange={event => onChangeHandler(event)}
                            prefix={<MailOutlined />}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            name="userPassword"
                            id="userPassword"
                            placeholder="Password"
                            onChange = {(event) => onChangeHandler(event)}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type={"primary"}
                                onClick={event => {createUserWithEmailAndPasswordHandler(event, email, password);}}
                        >
                            Sign up
                        </Button>
                    </Form.Item>

                </Form>
                <br/>
                <Form>
                    <Form.Item>
                        <Button
                            onClick={signInWithGoogle}>
                            <GoogleOutlined/>
                            &nbsp;Sign in with Google
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Text style={{color: "#fdfdffff"}}>Already have an account?<Link to="/"> Sign in here </Link></Text>

                    </Form.Item>
                    <Form.Item>
                        <Link to = "guest">
                            Continue as guest
                        </Link>
                    </Form.Item>
                </Form>


            </Space>
        </GuestWrapper>
    );
};
export default SignUp;