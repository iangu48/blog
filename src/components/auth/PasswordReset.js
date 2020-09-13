import React, { useState } from "react";
import { Link } from "@reach/router";
import {auth} from "../../firebase";
import GuestWrapper from "../GuestWrapper";
import Title from "antd/lib/typography/Title";
import { Form, Input, Button, Space } from 'antd';
import { MailOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";



const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
    const [error, setError] = useState(null);

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "userEmail") {
            setEmail(value);
        }
    };
    const sendResetEmail = event => {
        setError("")
        event.preventDefault();
        auth.sendPasswordResetEmail(email)
            .then(() => {
                setEmailHasBeenSent(true);
            })
            .catch(() => {
                setError("Error resetting password");
            });
    };

    return (
        <GuestWrapper>
            <Title level={2} style={{color: "white", fontWeight: 350, marginTop: 100}}>Reset your password</Title>

            <Space direction={"vertical"}>

                <Form style={{width: "100"}} action="" layout={"inline"}>

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
                    <Form.Item>
                        <Button type={"primary"} onClick={sendResetEmail}>
                            Send me a reset link
                    </Button>
                    </Form.Item>
                </Form>
                {emailHasBeenSent && (
                    <Text type={"success"}>
                        An email has been sent to you!
                    </Text>
                )}
                {error !== null && (
                    <Text type={"danger"}>
                        {error}
                    </Text>
                )}
                <Form>
                    <Form.Item>
                        <Link to ="/">
                            &larr; back to sign in page
                        </Link>
                    </Form.Item>
                </Form>
            </Space>
        </GuestWrapper>
    );
};
export default PasswordReset;