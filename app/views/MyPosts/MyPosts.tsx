import * as React from 'react';
import {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';
import {FaPlusCircle} from 'react-icons/lib/fa';

import AuthService from '../../services/AuthService';
import logger from '../../../server/utils/logger/logger';
import graphql from '../../services/GraphQLService';
import BlogPostList from '../../components/BlogPostList/BlogPostList';

const log = logger('MY-POSTS');

export default class MyPosts extends Component<any, any> {
  static contextTypes = {
    auth: PropTypes.instanceOf(AuthService).isRequired
  };

  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    this.fetchBlogPosts();
  }

  render() {
    const posts = this.state.posts || [];

    return (
      <div>
        <h1 className="page-header">
          Your Blog Posts

          <Link to="/new-post" className="pull-right">
            <Button bsSize="sm">
              <FaPlusCircle /> New post
            </Button>
          </Link>
        </h1>

        <BlogPostList posts={posts}/>

      </div>
    )
  }

  async fetchBlogPosts() {
    const auth: AuthService = this.context.auth;
    const profile = auth.getProfile();
    const userId = profile.id;
    const fullName = profile.fullName;

    log.info(`Fetching blog posts for user ${userId}`, profile);
    const results = await graphql(`
      query userByIdWithPosts(
        $id: String!
        $limit: Int
        $offset: Int
      ) {
        userById(id: $id) {
          id
          posts(
            limit: $limit
            offset: $offset
          ){
            id
            title
            datetime
            author {
              id
              firstName
              lastName
            }
          }
        }
      }
    `, {
      id: userId,
      limit: 10,
      offset: 0
    });

    console.log(results);

    this.setState({
      userId,
      fullName,
      posts: results.userById.posts
    })
  }
}
