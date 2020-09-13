import React, {useState} from "react";
import { Link } from "@reach/router";
import {auth, signInWithGoogle} from "../../firebase";
import GuestWrapper from "../GuestWrapper";
import Title from "antd/lib/typography/Title";
import { Form, Input, Button, Space } from 'antd';
import { MailOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import Text from "antd/lib/typography/Text";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signInWithEmailAndPasswordHandler = (event,email, password) => {
            event.preventDefault();
            auth.signInWithEmailAndPassword(email, password).catch( error => {
                setError(error.code + ": " + error.message);
                console.error(error);
            });
        };

    const onChangeHandler = (event) => {
        const {name, value} = event.currentTarget;

        if(name === 'userEmail') {
            setEmail(value);
        }
        else if(name === 'userPassword'){
            setPassword(value);
        }
    };

    return (
        <GuestWrapper>
            <Title level={2} style={{color: "white", fontWeight: 350, marginTop: 100}}>Sign In</Title>
            <Space direction={"vertical"}>
                {error !== null && <div>{error}</div>}
                <Form style={{width: "100"}}>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input type="email" name="userEmail" value = {email} id="userEmail" onChange = {(event) => onChangeHandler(event)}
                               prefix={<MailOutlined />} placeholder="Email" />
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
                        <Space>
                            <Button type="primary" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
                                Log in
                            </Button>
                            <Link to = "passwordReset">
                                Forgot Password?
                            </Link>
                        </Space>
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
                        <Text style={{color: "#fdfdffff"}}>Don't have an account?<Link to="signUp"> Sign up here </Link></Text>
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
export default SignIn;