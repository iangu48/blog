import React, { Component, createContext } from "react";
import {auth, generateUserDocument} from "../firebase";

export const UserContext = createContext({ user: null });
class UserProvider extends Component {
    state = {
        user: null
    };

    componentDidMount = async () => {
        auth.onAuthStateChanged(async userAuth => {
            // eslint-disable-next-line no-unused-vars
            const user = await generateUserDocument(userAuth);
            this.setState({ user: userAuth});
            // console.log(`user ${user.displayName} logged in`);
        });
    };
    render() {
        return (
            <UserContext.Provider value={this.state.user}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
export default UserProvider;