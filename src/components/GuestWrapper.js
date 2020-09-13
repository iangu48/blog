import "./blog.css"
import React from 'react';
import {navigate} from "@reach/router";
import Particles from "react-particles-js";
import {Layout, Typography, Button, Row, List, Space, Col} from "antd";

const { Header, Content, Footer } = Layout;

function GuestWrapper(props) {

    return (
        <Layout style={{background: "transparent"}}>
            <ParticleBg/>

            <Header style={{background: "transparent"}}>
                <Space>
                    <Button
                        shape={"round"}
                        onClick={() => {navigate('/guest')}}>
                        Blogs
                    </Button>

                    <Button
                        shape={"round"}
                        onClick={() => {navigate('/')}}>
                        Sign in
                    </Button>

                    <Button
                        shape={"round"}
                        onClick={() => {navigate('/signUp')}}>
                        Create an account
                    </Button>

                </Space>
            </Header>

            <Content>
                <Row align={"top"} justify={"center"}>
                    <Col align={"middle"} justify={"center"} span={12}>

                        <div>
                            {props.children}
                        </div>

                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

const ParticleBg = () => (
    <Particles className={"particles-js"}
               params={{
                   "particles": {
                       "number": {
                           "value": 60,
                           "density": {
                               "enable": true,
                               "value_area": 1500
                           }
                       },
                       "line_linked": {
                           "enable": true,
                           "opacity": 0.2
                       },
                       "move": {
                           "direction": "right",
                           "speed": 0.20
                       },
                       "size": {
                           "value": 1
                       },
                       "opacity": {
                           "anim": {
                               "enable": true,
                               "speed": 1,
                               "opacity_min": 0.05
                           }
                       }
                   },
                   "interactivity": {
                       "events": {
                           "onclick": {
                               "enable": true,
                               "mode": "push"
                           }
                       },
                       "modes": {
                           "push": {
                               "particles_nb": 1
                           }
                       }
                   },
                   "retina_detect": true
               }} />
);


export default GuestWrapper;