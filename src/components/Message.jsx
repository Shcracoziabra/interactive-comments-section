import PropTypes from 'prop-types';
import { createPortal } from "react-dom";
import { useState, useContext, useCallback, useRef, useEffect } from 'react';
import { AppDispatchContext } from '../AppContext';
import Avatar from "./Avatar"
import Score from "./Score"
import MessageControl from './MessageControl';
import MessageForm from './MessageForm';
import TextArea from './TextArea';
import SubmitBtn from './SubmitBtn';
import DeleteModal from './DeleteModal';
import getFormatedTimeStr from '../utils/getFormattedTimeStr';
import getParsedTimeObj from '../utils/getParsedTimeObj';
import getTimePassedText from '../utils/getTimePassedText';


export default function Message({ isReply, postedByCurrentUser, parentId, data }) {
    const { id, content, edited, createdAt, score, user, replyingTo } = data;
    const [isEdited, setIsEdited] = useState(false);
    const [isReplied, setIsReplied] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [text, setText] = useState(content);
    const createTimeString = getTimePassedText(createdAt);
    const dispatch = useContext(AppDispatchContext);

    const mainRef = useRef(document.querySelector('body'));
    const newReplyRef = useRef(null);

    useEffect(
        () => {
            if (isReply && newReplyRef) {
                newReplyRef.current.scrollIntoView({block: 'center'});
            } else {
                mainRef.current.scrollIntoView({block: 'end'});
            }
        }, [isReply]
    )

    const updateComment = useCallback((commentid) => {
        dispatch({type: 'comment_updated', payload: text, commentid})
    }, [dispatch, text]);

    const updateReply = useCallback((commentid, replyid) => {
        dispatch({type: 'reply_updated', payload: text, commentid, replyid})
    }, [dispatch, text]);

    const commentScoreUp = useCallback((commentid) => {
        dispatch({type: 'comment_score_up', commentid});
    }, [dispatch]);

    const commentScoreDown = useCallback((commentid) => {
        dispatch({type: 'comment_score_down', commentid});
    }, [dispatch]);

    const replyScoreUp = useCallback((commentid, replyid) => {
        dispatch({type: 'reply_score_up', commentid, replyid});
    }, [dispatch]);

    const replyScoreDown = useCallback((commentid, replyid) => {
        dispatch({type: 'reply_score_down', commentid, replyid});
    }, [dispatch]);

    const ariaLabel = !isReply 
    ? `user ${user.username} comment`
    : `user ${user.username} reply to user ${replyingTo}`;

    const paragraph = !isReply 
    ? <p className='message-content'>{content}</p> 
    : <p className='message-content message-content_reply' ref={newReplyRef} data-replyto={replyingTo}>{content}</p>;

    const userNameClass = postedByCurrentUser ? 'message-user__name message-user__name_you' : 'message-user__name';

    const messageBtns = postedByCurrentUser 
        ?   <div className='message-controls'>
                <MessageControl 
                    onBtnClick={() => setModalOpen(true)}
                    isFaded={isEdited} 
                    title='delete'/>
                <MessageControl
                    isFaded={isEdited} 
                    onBtnClick={() => setIsEdited(true)} 
                    title='edit'
                />
            </div> 
        :   <div className='message-controls'>
                <MessageControl
                    isFaded={isReplied} 
                    onBtnClick={() => setIsReplied(true)}
                    title='reply'
                    />
            </div>
        ;

    const messageContent = isEdited 
        ?   <form 
                onClick={()=>{
                    setIsEdited(false);
                    setText(content);
                }} 
                className='message-form'>
                <TextArea 
                    addressant={replyingTo}
                    className='message-form__area'
                    content={text}
                    onContentChange={setText}
                />
                <SubmitBtn 
                    title='update'
                    onBtnClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if(text.trim().length > 0){
                            isReply && updateReply(parentId, id);
                            !isReply && updateComment(id);
                        } else {
                            setText(content);
                        }
                        setIsEdited(false);
                    }}
                />
            </form> 
        :   <>{paragraph}</>

    const userName = isReply 
        ?   <h3 className={userNameClass}>{user.username}</h3> 
        :   <h2 className={userNameClass}>{user.username}</h2>;

    return (
        <>
            <article 
                className='message'
                aria-label={ariaLabel}
            >
                <Score 
                    onPlusClick={() => {
                        if (postedByCurrentUser) {
                            return;
                        }
                        if (isReply) {
                            replyScoreUp(parentId, id)
                        }
                        if (!isReply) {
                            commentScoreUp(id)
                        }
                    }}
                    onMinusClick={() => {
                        if (postedByCurrentUser) {
                            return;
                        }
                        if (isReply) {
                            replyScoreDown(parentId, id)
                        }
                        if (!isReply) {
                            commentScoreDown(id)
                        }
                    }}
                    score={score}
                />
                <div className='message-user'>
                    <Avatar className='message-user__icon' src={user.image}/>
                    {userName}
                    <span className='message-user__time'>{createTimeString}</span>
                </div>
                {messageBtns}
                {messageContent}
                {
                    edited &&   <span className='message__update-time'>
                                    {getFormatedTimeStr(getParsedTimeObj(edited))}
                                </span>
                }
            </article>
            {
                isReplied && !modalOpen 
                    ?   <MessageForm 
                            type='reply'
                            commentId={isReply ? parentId : id}
                            onFormClose={()=> setIsReplied(false)}
                            replyTo={user.username} 
                        /> 
                    : null
            }
            {
                modalOpen 
                ? createPortal(
                    <DeleteModal 
                        parentId={parentId} 
                        id={id} 
                        closeModal={()=>setModalOpen(false)}
                    />, document.body)
                : null
            }
        </>
    )
} 

Message.propTypes = {
    comment: PropTypes.object,
    parentId: PropTypes.number,
    postedByCurrentUser: PropTypes.bool.isRequired,
    isReply: PropTypes.bool.isRequired,
    data: PropTypes.shape({
        id: PropTypes.number, 
        content: PropTypes.string, 
        edited: PropTypes.number, 
        createdAt: PropTypes.number, 
        score: PropTypes.number, 
        user: PropTypes.shape({
            image: PropTypes.shape({
                png: PropTypes.string,
                wepb: PropTypes.string
            }),
            username: PropTypes.string
        }), 
        replies: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number,
                content: PropTypes.string,
                createdAt: PropTypes.number,
                score: PropTypes.number,
                replyingTo: PropTypes.string,
                user: PropTypes.shape({
                    image: PropTypes.shape({
                        png: PropTypes.string,
                        wepb: PropTypes.string
                    }),
                    username: PropTypes.string
                }), 
            })), 
        replyingTo: PropTypes.string
    })
}