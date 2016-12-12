import * as React from 'react';
import * as moment from 'moment';
import {Component, PropTypes} from 'react';

export interface PartialBlogPost {
  id: string;
  title: string;
  datetime: string;
  author: {
    firstName: string;
    lastName: string;
  }
}

interface BlogPostSummaryProps {
  post: PartialBlogPost;
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
      <div key={post.id}>
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
