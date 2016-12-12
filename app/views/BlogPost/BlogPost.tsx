import * as React from 'react';
import {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';
import {FaPlusCircle} from 'react-icons/lib/fa';

import AuthService from '../../services/AuthService';
import logger from '../../../server/utils/logger/logger';
import graphql from '../../services/GraphQLService';
import BlogPostList from '../../components/BlogPostList/BlogPostList';
import BlogPostDetail from '../../components/BlogPostDetail/BlogPostDetail';

const log = logger('BLOG-POST');

export default class BlogPost extends Component<any, any> {
  constructor() {
    super();
    this.state = {
      post: null
    };
  }

  componentWillMount() {
    this.fetchBlogPost();
  }

  render() {
    const { post } = this.state;

    log.info(`Rendering post`, post);

    return (
      <BlogPostDetail post={post}/>
    )
  }

  async fetchBlogPost() {
    const { id }= this.props.params;

    log.info(`Fetching blog post ${id}`);
    const results = await graphql(`
      query postById (
        $id: String!
        ) {
        postById(id: $id) {
          id
          title
          datetime
          content
          author {
            id
            firstName
            lastName
          }
        }
      }
    `, {
      id: id,
    });

    log.info('Fetched blog post', results);

    this.setState({
      post: results.postById
    })
  }
}
