import React, {useContext} from "react";
import {UserContext} from "../../providers/UserProvider";
import {auth} from "../../firebase";
import defaultAvatar from "../../static/default-avatar.png"
import {navigate} from "@reach/router";
import Wrapper from "../Wrapper";

const ProfilePage = () => {
    const user = useContext(UserContext);
    const {photoURL, displayName, email} = user;

    const div = <div>
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
                <h2>{displayName}</h2>
                <h3>{email}</h3>
            </div>
        </div>
        <button onClick={() => {
            auth.signOut()
            navigate('/');
        }}>
            Sign out
        </button>
    </div>

    return <Wrapper>{div}</Wrapper>
};
export default ProfilePage;