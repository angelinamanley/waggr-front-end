import React from "react";
import { Container, Button, Comment, Form } from "semantic-ui-react";
import API from "../adapters/API";
import moment from "moment";


class GroupForum extends React.Component {

    constructor(props){
        super(props)
    this.state = { 
        comment: null, 
        date: new Date().toLocaleString(), 
    }
}

    handleCommentSubmit = e => {
        e.preventDefault()
        API.postComment({group_id: this.props.group.id, user_id: this.props.user.id, content: this.state.comment})
        .then(post => this.props.addPostToGroup(post))
        // 
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
            <Container>
          <Comment.Group>
        
            {this.props.group.posts.map(post => 
              <Comment key={post.id}>
                  <Comment.Avatar as="a" src={post.user.photo}/>
                <Comment.Content>
                  <Comment.Author>{post.user.first_name}</Comment.Author>
                  <Comment.Metadata><div>{moment(post.created_at).format('MM/DD/YYYY h:mm a')}</div></Comment.Metadata>
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
          </Container>
        </React.Fragment>
      );
    }
  }
}

export default GroupForum;
