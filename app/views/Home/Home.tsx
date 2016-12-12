import * as React from 'react';
import * as DocumentTitle from 'react-document-title';
import * as moment from 'moment';
import {Component} from 'react';
import graphql from '../../services/GraphQLService';
import {Panel} from 'react-bootstrap';
import logger from '../../../server/utils/logger/logger';
import BlogPostList from '../../components/BlogPostList/BlogPostList';

const log = logger('HOME');

export default class Home extends Component<any, any> {
  constructor() {
    super();
    this.state = { posts: [] };
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { posts } = this.state;
    return (
      <div>
        <h1 className="page-header">Blog Posts</h1>
        <BlogPostList posts={posts}/>
      </div>
    );
  }

  async fetchData() {
    const { limit, offset } = this.props.params;

    const results = await graphql(`
      query allPosts(
        $limit: Int
        $offset: Int
        ) {
        allPosts(limit: $limit, offset: $offset) {
          id
          title
          author {
            firstName
            lastName
          }
          datetime
        }
      }
    `, { limit, offset });
    this.setState({ posts: results.allPosts });
    log.info(`Home loaded with`, this.state);
  }
}
