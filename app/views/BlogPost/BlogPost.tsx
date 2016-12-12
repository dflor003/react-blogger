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
import CommentThread from '../../components/CommentThread/CommentThread';

const log = logger('BLOG-POST');

export default class BlogPost extends Component<any, any> {
  static contextTypes = {
    auth: PropTypes.instanceOf(AuthService).isRequired
  };

  constructor() {
    super();
    this.state = {
      post: null,
      comments: []
    };
  }

  componentWillMount() {
    this.fetchBlogPost();
  }

  render() {
    const auth: AuthService = this.context.auth;
    const { post, comments } = this.state;
    const user = auth.getProfile();

    log.info(`Rendering post`, post);

    return (
      <div>
        <BlogPostDetail post={post}/>
        <CommentThread comments={comments} user={user}
                       onCommented={(content: string) => this.submitComment(user, post, content)}/>
      </div>
    )
  }

  async fetchBlogPost() {
    const { id }= this.props.params;

    log.info(`Fetching blog post ${id}`);
    const results = await graphql(`
      query (
          $id: String!
          $limit: Int
          $offset: Int
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
          commentsForPost(
            postId: $id
            limit: $limit
            offset: $offset
          ) {
            id
            datetime
            user {
              id
              firstName
              lastName
              pictureSmallUrl
            }
            content
          }
      }
    `, {
      id: id,
      limit: 10,
      offset: 0
    });

    log.info('Fetched blog post', results);

    this.setState({
      post: results.postById,
      comments: results.commentsForPost
    })
  }

  async submitComment(user: any, post: any, content: string) {
    log.info('Comment', content);
    if (!user || !post) {
      return;
    }

    const results = await graphql(`
      mutation commentOn(
          $userId: String!
          $postId: String!
          $content: String!
        ) {
        addComment(
          userId: $userId
          postId: $postId
          content: $content
        ) {
          id
          datetime
          user{
            id
            firstName
            lastName
            pictureSmallUrl
          }
          content
        }
      }
    `, {
      userId: user.id,
      postId: post.id,
      content: content
    });

    const newComment = results.addComment;
    log.info(`Succeeded commenting!`, newComment);
    this.setState({
      post: this.state.post,
      comments: [newComment, ... this.state.comments]
    });
  }
}
