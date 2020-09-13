import "./blog.css"
import React from 'react';
import {navigate} from "@reach/router";

function Wrapper(props) {

    return (
        <div className={"h100"}>
            <button onClick={() => {navigate('/guest')}}>
                Blogs
            </button>

            <button onClick={() => {navigate('/')}}>
                Sign in
            </button>

            <button onClick={() => {navigate('/signUp')}}>
                Sign up
            </button>
            <div>
                {props.children}
            </div>
        </div>
    );
}

export default Wrapper;