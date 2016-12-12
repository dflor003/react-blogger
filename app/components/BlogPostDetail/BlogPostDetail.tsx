import * as React from 'react';
import * as moment from 'moment';
import {Component, PropTypes} from 'react';

export interface BlogPost {
  id: string;
  title: string;
  datetime: string;
  content: string;
  author: {
    firstName: string;
    lastName: string;
  }
}

interface BlogPostSummaryProps {
  post: BlogPost;
}

export default class BlogPostDetail extends Component<BlogPostSummaryProps, void> {
  static propTypes = {
    post: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string
      })
    }),
  };

  render() {
    const post = this.props.post || {} as any;

    return (
      <div>
        <h1 className="page-header">
          {post.title} <br/>
          <small>{moment(post.datetime).fromNow()}</small>
        </h1>
        {
          post.author && (
            <h5>By: {`${post.author.firstName} ${post.author.lastName}`}</h5>
          )
        }
        <p>{post.content}</p>
      </div>
    );
  }
}
