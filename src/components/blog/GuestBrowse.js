import React, {Component} from "react";
import firebase from "../../firebase";
import {Link} from "@reach/router";
import GuestWrapper from "../GuestWrapper";
import {List} from "antd";
import Title from "antd/lib/typography/Title";
import defaultPost from "../../static/default-post.png";

class GuestBrowse extends Component {
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
            const {title, desc, cover, posted, updated} = doc.data();
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

        this.setState({
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
            <GuestWrapper>
                <List itemLayout={"vertical"} size={"large"} dataSource={this.state.posts}
                      style={{background: "#fdfdffff", borderRadius: 10}}

                      renderItem={
                          item => (
                              <List.Item key={item.posted}>
                                  <List.Item.Meta
                                      avatar={<Link to={`/guest/${item.key}`}><img width={100} height={100} onError={this.noCoverImg} src={item.cover} style={{ objectFit: "cover", borderRadius: 4}} alt={""}/></Link>}
                                      title={
                                          <Link to={`/guest/${item.key}`} style={{fontWeight: 400}}>
                                              {(new Date(item.posted)).toLocaleDateString()} - {item.title}
                                          </Link>
                                      }
                                      description={
                                          <div>
                                              <Title level={5}
                                                     style={{
                                                         color: "#393d3fff",
                                                         textAlign: "left",
                                                         marginBottom: 0,
                                                         marginTop: 0,
                                                         fontWeight: 400
                                                     }}
                                                     ellipsis={{rows: 3}}>
                                                  <Link to={`/guest/${item.key}`}
                                                        style={{fontWeight: 400, color: "#393d3fff"}}>
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
            </GuestWrapper>
        );
    }
}

export default GuestBrowse;