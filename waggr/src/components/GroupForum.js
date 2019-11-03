import React from "react";
import { Message, Container, Button, Comment, Form } from "semantic-ui-react";
import API from "../adapters/API";


class GroupForum extends React.Component {

    constructor(props){
        super(props)
    this.state = { 
        comment: null, 
        date: new Date().toLocaleString()
    }
}

    handleCommentSubmit = e => {
        e.preventDefault()
        API.postComment({group_id: this.props.group.id, user_id: this.props.user.id, content: this.state.comment})

    }

     timeSince = (date) => {
        var aDay = 24*60*60*1000
        var seconds = Math.floor((new Date() - date) / 1000);
      
        var interval = Math.floor(seconds / 31536000);
      
        if (interval > 1) {
          return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
          return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
          return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
          return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
          return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
      }
    
  
    
  render() {
    if (!this.props.group) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    } else {
      return (
        <React.Fragment>
          <Comment.Group>
        
            {this.props.group.posts.map(post => 
              <Comment>
                  <Comment.Avatar as="a" src={post.user.photo}/>
                <Comment.Content>
                  <Comment.Author>{post.user.first_name}</Comment.Author>
                  <Comment.Metadata><div>{(Date.parse(new Date()) - Date.parse(post.created_at))/ (1000 * 3600 * 24)}</div></Comment.Metadata>
                  <Comment.Text>
                    <p>{post.content}</p>
                  </Comment.Text>
                </Comment.Content>
              </Comment>
            )}
             <Form onSubmit={this.handleCommentSubmit} reply>
      <Form.TextArea onChange={event => this.setState({comment: event.target.value})}/>
      <Button content='Add Comment' labelPosition='left' icon='edit' primary />
    </Form>
          </Comment.Group>
        </React.Fragment>
      );
    }
  }
}

export default GroupForum;
