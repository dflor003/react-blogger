import * as React from 'react';
import {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {PartialBlogPost, default as BlogPostSummary} from '../BlogPostSummary/BlogPostSummary';
import logger from '../../../server/utils/logger/logger';

interface BlogPostListProps {
  posts: PartialBlogPost[];
}

const log = logger('BLOG-POST-LIST');
export default class BlogPostList extends Component<BlogPostListProps, void> {
  static propTypes = {
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.shape({
          firstName: PropTypes.string,
          lastName: PropTypes.string
        })
      })
    ),
  };

  render() {
    const { posts } = this.props;
    const hasPosts = !!posts && !!posts.length;

    log.info(`My posts has ${posts.length} posts`, posts);
    return (
      <div>
        {
          !hasPosts && (
            <div className="text-center">
              <em>You have not created any blog posts yet. <Link to="/new-post">Click here to create one now!</Link></em>
            </div>
          )
        }
        {
          hasPosts && posts.map(post => (<BlogPostSummary key={post.id} post={post}/>))
        }
      </div>
    );
  }
}
