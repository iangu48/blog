import "./blog.css"
import React from 'react';
import {auth} from "../firebase";
import {navigate} from "@reach/router";

function Wrapper(props) {

    return (
        <div className={"h100"}>
            <button onClick={() => {navigate('/')}}>
                Blogs
            </button>
            <button onClick={() => {navigate('/profile')}}>
                Profile
            </button>
            <button
                onClick={() => {
                auth.signOut()
                navigate('/');
            }}>
                Sign out
            </button>

            <div>
                {props.children}
            </div>
        </div>
    );
}

export default Wrapper;