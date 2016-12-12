import * as React from 'react';
import * as DocumentTitle from 'react-document-title';
import * as moment from 'moment';
import {Component} from 'react';
import graphql from '../../services/GraphQLService';
import {Panel} from 'react-bootstrap';
import logger from '../../../server/utils/logger/logger';

const log = logger('HOME');

export default class Home extends Component<any, any> {
  constructor() {
    super();
    this.state = { posts: [] };
  }

  componentDidMount() {
    this.fetchData();
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

  render() {
    const { posts } = this.state;

    return (
      <DocumentTitle title="Home">
        <Panel header="Blog Posts">
          { posts.map(post => (
            <div key={post.id}>
              <h3>
                {post.title} <br/>
                <small>{`${post.author.firstName} ${post.author.lastName}`}</small>
              </h3>
              <em>{moment(post.datetime).fromNow()}</em>
            </div>
          ))
          }
        </Panel>
      </DocumentTitle>
    );
  }
}
