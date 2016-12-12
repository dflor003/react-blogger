import * as React from 'react';
import {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Button, Form} from 'react-bootstrap';
import {FaPlusCircle} from 'react-icons/lib/fa';

import AuthService from '../../services/AuthService';
import logger from '../../../server/utils/logger/logger';
import graphql from '../../services/GraphQLService';
import {InputField} from '../../components/Fields/InputField';
import {TextAreaField} from '../../components/Fields/TextAreaField';

const log = logger('NEW-POSTS');

export default class NewPost extends Component<any, any> {
  static contextTypes = {
    auth: PropTypes.instanceOf(AuthService).isRequired
  };

  constructor() {
    super();
    this.state = {
      title: '',
      authorId: '',
      content: '',
      dateTime: new Date(),
    };
  }

  componentDidMount() {
    const auth: AuthService = this.context.auth;
    const userId = auth.loggedInUserId();
    this.setState({
      ...this.state,
      authorId: userId,
    });
  }

  render() {
    return (
      <Form onSubmit={(evt) => {
          this.savePost(this.state);
          evt.preventDefault();
        }}>
        <h1 className='page-header'>
          New Blog Post

          <div className="pull-right">
            <Button type="submit" bsStyle="primary" bsSize="sm">Confirm</Button>
            <Link to="/my-posts">
              <Button type="button" bsStyle="link" bsSize="sm">Cancel</Button>
            </Link>
          </div>
        </h1>

        <InputField
          id="title" label="Title" value={this.state.title}
          onChange={(val) => this.setState({...this.state, title: val})}/>
        <TextAreaField
          id="content" label="Content" rows={50} value={this.state.content}
          onChange={(val) => this.setState({...this.state, content: val})}
        />
      </Form>
    )
  }

  async savePost(state: any) {
    const auth: AuthService = this.context.auth;
    const profile = auth.getProfile();
    const userId = profile.id;

    try {
      log.info(`Saving blog post for user ${userId}`, state);
      const results = await graphql(`
      mutation addPost (
        $authorId: String!
        $title: String!
        $content: String!	
      ) {
        addPost(
          authorId: $authorId
          title: $title
          content: $content
        ) {
          id
          datetime
        }
      }
    `, {
        authorId: userId,
        title: state.title,
        content: state.content
      });
      log.info(`Saved!`, results);
      this.props.router.replace('/my-posts');
    } catch (err) {
      log.error(`Failed to add post`, err);
    }
  }
}
