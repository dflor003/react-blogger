import * as React from 'react';
import * as moment from 'moment';
import {Component, PropTypes} from 'react';
import {Link, hashHistory} from 'react-router';
import {BlogPost} from '../BlogPostDetail/BlogPostDetail';

interface BlogPostSummaryProps {
  post: BlogPost;
  isSelf?: boolean;
}

export default class BlogPostSummary extends Component<BlogPostSummaryProps, void> {
  static propTypes = {
    isSelf: PropTypes.bool,
    post: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string
      })
    }),
  };

  render() {
    const { post } = this.props;
    const isSelf = typeof this.props.isSelf === 'boolean' ? this.props.isSelf : false;

    return (
      <div onClick={() => hashHistory.replace(`/posts/${post.id}`)} style={{cursor: 'pointer'}}>
        <h3>
          {post.title} <br/>
          {
            !isSelf && post.author && (
              <small>By: {`${post.author.firstName} ${post.author.lastName}`}</small>
            )
          }
          {
            isSelf && (<small>By: Me</small>)
          }
        </h3>
        <em>{moment(post.datetime).fromNow()}</em>
      </div>
    );
  }
}
