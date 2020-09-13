import React, {Component, useContext} from "react";
import firebase from "../../firebase";
import {Link} from "@reach/router";
import {UserContext} from "../../providers/UserProvider";
import {Button, List} from "antd";
import defaultPost from "../../static/default-post.png"
import Wrapper from "../Wrapper";
import Title from "antd/lib/typography/Title";

class BrowseImpl extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('posts');
        this.unsubscribe = null;
        this.state = {
            posts: []
        }
    }

    onCollectionUpdate = (querySnapshot) => {
        const posts = [];

        querySnapshot.forEach((doc) => {
            const { title, desc, cover, posted, updated } = doc.data();
            posts.push({
                key: doc.id,
                doc,  // snapshot
                title,
                desc,
                cover,
                posted,
                updated,
            });
        });

        this.setState( {
            posts
        })
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    noCoverImg = (e) => {
        e.target.src = defaultPost
        // console.log(e)
    }

    render() {
        return (
            <Wrapper>
                {this.props.admin ?
                    <Button type={"primary"} style={{marginBottom: 10}}><Link to="/new">New post</Link></Button>
                    :
                    null
                }

                <List itemLayout={"vertical"} size={"large"} dataSource={this.state.posts}
                      style={{background: "#fdfdffff", borderRadius: 10}}

                      renderItem={
                          item => (
                              <List.Item
                                  key={item.posted}
                                  >
                                  <List.Item.Meta
                                      avatar={<Link to={`/${item.key}`}><img width={100} height={100} onError={this.noCoverImg} src={item.cover} style={{objectFit: "cover", borderRadius: 4}} alt={""}/></Link>}
                                      title={
                                          <Link to={`/${item.key}`} style={{fontWeight: 400}}>
                                              {(new Date(item.posted)).toLocaleDateString()} - {item.title}
                                          </Link>
                                      }
                                      description={
                                          <div>
                                              <Title level={5}
                                                     style={{color: "#393d3fff", textAlign: "left", marginBottom: 0, marginTop: 0, fontWeight: 400}}
                                                     ellipsis={{rows: 3}}>
                                                  <Link to={`/${item.key}`} style={{fontWeight: 400, color: "#393d3fff"}}>
                                                      {item.desc}
                                                  </Link>
                                              </Title>
                                          </div>
                                      }
                                      />
                              </List.Item>
                          )
                      }
                />

            </Wrapper>
        );
    }
}

export default function Browse(props) {
    const user = useContext(UserContext);
    const admin = user.email === "iangu234@gmail.com" || user.email === "ian.gu@mail.utoronto.ca";

    return <BrowseImpl admin={admin} {...props} user={user}/>

};