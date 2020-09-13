import React, {useContext} from "react";
import { Router } from "@reach/router";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import ProfilePage from "./auth/ProfilePage";
import PasswordReset from "./auth/PasswordReset";
import {UserContext} from "../providers/UserProvider";
import New from "./admin/New";
import Edit from "./admin/Edit";
import Show from "./blog/Show";
import Browse from "./blog/Browse";
import GuestBrowse from "./blog/GuestBrowse";
import GuestShow from "./blog/GuestShow";
import 'antd/dist/antd.css'


function Application() {
    const user = useContext(UserContext);
    return (
        user ?
            user.email === "iangu234@gmail.com" || user.email === "ian.gu@mail.utoronto.ca" ?
            // admin
            <Router>
                <Browse path={"/"}/>
                <ProfilePage path="/profile"/>
                <New path={"/new"}/>
                <Edit path={"/:id/edit"}/>
                <Show path={"/:id"}/>
            </Router>

            : // logged in
            <Router>
                <ProfilePage path="/profile"/>
                <Browse path="/"/>
                <Show path="/:id"/>
            </Router>

            : // not logged in
            <Router>
                <SignUp path="signUp" />
                <SignIn path="/" />
                <PasswordReset path = "passwordReset" />
                <GuestBrowse path={"guest"}/>
                <GuestShow path={"guest/:id"}/>
            </Router>

    );
}
export default Application;