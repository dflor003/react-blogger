import * as React from 'react';
import * as styles from './CommentThread.scss';
import {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {BlogPost} from '../BlogPostDetail/BlogPostDetail';
import BlogPostSummary from '../BlogPostSummary/BlogPostSummary';
import logger from '../../../server/utils/logger/logger';
import CommentForm from './CommentForm';
import Comment from './Comment';
import {CommentData} from './Comment';
import Card from '../Card/Card';

interface CommentThreadProps {
  comments: CommentData[];
  user: any;
  onCommented: (content: string) => any;
}

const log = logger('COMMENT-THREAD');
export default class CommentThread extends Component<CommentThreadProps, void> {
  static propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object),
    user: PropTypes.object,
    onCommented: PropTypes.func,
  };

  render() {
    const comments = this.props.comments || [];
    const hasComments = !!comments && !!comments.length;
    const user = this.props.user;
    const onCommented = this.props.onCommented;
    const showForm = !!user;

    log.info(`Comment thread has ${comments.length} comments`, user, comments);
    return (
      <div className={styles.root}>
        <h4>Comments:</h4>
        {
          showForm && (<CommentForm profilePicUrl={user.pictureLargeUrl || user.pictureSmallUrl} onCommented={onCommented} />)
        }
        {
          !showForm && (<div className="text-center"><em>Sign in to comment</em></div>)
        }
        {
          !hasComments && (
            <div className={styles.empty}>
              <em>No comments on this blog post yet.</em>
            </div>
          )
        }
        {
          hasComments && (comments.map(comment => <Comment key={comment.id} comment={comment} />))
        }
      </div>
    );
  }
}
