import React, {useContext} from "react";
import {UserContext} from "../../providers/UserProvider";
import {auth} from "../../firebase";
import defaultAvatar from "../../static/default-avatar.png"
import {navigate} from "@reach/router";
import Wrapper from "../Wrapper";
import Title from "antd/lib/typography/Title";
import {Button} from "antd";

const ProfilePage = () => {
    const user = useContext(UserContext);
    const {photoURL, displayName, email} = user;


    return (
        <Wrapper>
            <div>
                <div style={{
                    background: `url(${photoURL || defaultAvatar})  no-repeat center center`,
                    backgroundSize: "cover",
                    height: "100px",
                    width: "100px",
                    borderRadius: "10px"
                }}
                > </div>
                <div>
                    <Title level={3} style={{color: "white", marginBottom: 0, fontWeight: 350}}>{displayName}</Title>
                    <Title level={4} style={{color: "white", marginBottom: 0, fontWeight: 350}}>{email}</Title>
                </div>
            </div>
            <Button
                style={{marginTop: 100}}
                onClick={() => {
                auth.signOut()
                navigate('/');
            }}>
                Sign out
            </Button>
        </Wrapper>
    );
};
export default ProfilePage;