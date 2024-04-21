import { PropTypes } from 'prop-types';
import { useContext } from 'react';
import { AppContext } from '../AppContext';
import Message from './Message';

export default function Comment({ comment }){
    const currentUserName = useContext(AppContext).currentUser.username;
    const isCurrentUserComment = comment.user.username === currentUserName;

    const replies = comment.replies.map(reply => {
        const isCurrentUserReply = reply.user.username === currentUserName;
        return (
            <Message 
                parentId={comment.id}
                isReply={true}
                key={'rep-' + reply.id}
                postedByCurrentUser={isCurrentUserReply}
                data={reply}
            />
        )
    });

    return (
        <section 
            className="wrapper wrapper_comment"
        >
            <Message 
                isReply={false}
                key={'com-'+comment.id}
                postedByCurrentUser={isCurrentUserComment}
                data={comment}
            />
            {
                replies.length > 0 
                    ? <section className="wrapper wrapper_replies">{replies}</section> 
                    : null
            }
        </section>
    )
} 

Comment.propTypes = {
    comment: PropTypes.shape({
        id: PropTypes.number,
        content: PropTypes.string,
        score: PropTypes.number,
        createdAt: PropTypes.number,
        edited: PropTypes.number,
        user: PropTypes.shape({
            image: PropTypes.shape({
                png: PropTypes.string,
                webp: PropTypes.string
            }),
            username: PropTypes.string.isRequired
        }),
        repliesnextid: PropTypes.number,
        replies: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                content: PropTypes.string,
                score: PropTypes.number,
                createdAt: PropTypes.number,
                edited: PropTypes.number,
                user: PropTypes.shape({
                    image: PropTypes.shape({
                        png: PropTypes.string,
                        webp: PropTypes.string
                    }),
                    username: PropTypes.string.isRequired
                }),
                replyingTo: PropTypes.string
            }),
        )
    })
}   
