import React from "react";
import { Container, Button, Comment, Form, Icon, Message } from "semantic-ui-react";
import API from "../adapters/API";
import {Link} from 'react-router-dom'
import moment from "moment";


class GroupForum extends React.Component {


    state = { 
        comment: '', 
        errors: "",
        errorView: false
    }


  

    handleCommentSubmit = e => {
      e.preventDefault()
      if (this.state.comment === null|| this.state.comment === ''){
         this.setState({errors : "Please enter a comment before submitting", errorView : true})
      } else {
        API.postComment({group_id: this.props.group.id, user_id: this.props.user.id, content: this.state.comment})
        .then(post => this.props.addPostToGroup(post)).then(this.setState({ comment: "", errorView: false}))
      }
    }

    handleCommentDelete = (id) => {
      API.deletePost(id).then(()=> this.props.removePost(id))
    }

  render() {
    if (!this.props.group || !this.props.user) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    } else {
      
      
      return (

        <React.Fragment>
            <Container>
          {this.state.errorView? <Message negative>{this.state.errors}</Message> : null}
        
          <Comment.Group>
          <Form onSubmit={this.handleCommentSubmit} >
      <Form.TextArea value={this.state.comment} onChange={event => this.setState({comment: event.target.value})}/>
      <Button size='mini' content='Add Comment' labelPosition='right' icon='edit' primary />
    </Form>
            {this.props.group.posts.length === 0? null : 
            this.props.group.posts.sort((a, b) => moment(b.created_at).format('X')-moment(a.created_at).format('X')).map(post => 
              <Comment key={post.id}>
                  <Comment.Avatar  src={post.user.photo}/>
                <Comment.Content>
                  <Comment.Author as={Link} to={`/users/${post.user.id}`}>{post.user.first_name}</Comment.Author>
                  <Comment.Metadata>{moment(post.created_at).fromNow()} {this.props.user.id === post.user.id? <Icon onClick={()=> this.handleCommentDelete(post.id)} name='x' color='pink'/> : null} </Comment.Metadata>
                  <Comment.Text style={{height: '10%'}}>
                    <p>{post.content}</p>
                  </Comment.Text>
                </Comment.Content>
              </Comment>
            )}
            
          </Comment.Group>
          </Container>
        </React.Fragment>
      );
    }
  }
}

export default GroupForum;
