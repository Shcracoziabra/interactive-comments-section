import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { AppContext, AppDispatchContext } from '../AppContext';
import Avatar from "./Avatar"
import SubmitBtn from './SubmitBtn';
import TextArea from './TextArea';

export default function MessageForm({type, commentId, replyTo, onFormClose}){
    const { currentUser } = useContext(AppContext);
    const dispatch = useContext(AppDispatchContext);
    const [input, setInput] = useState('');

    const attrValue = replyTo || '';

    const onReplyBtnClick = (commentid) => {
        const nextReply = {
            content: input,
            createdAt: Date.now(),
            score: 0,
            replyingTo: replyTo,
            user: currentUser
        }
        dispatch({type: 'reply_added', commentid, payload: nextReply});
        onFormClose();
    }

    const onSendBtnClick = () => {
        const nextComment = {
            content: input,
            createdAt: Date.now(),
            score: 0,
            user: currentUser,
            repliesnextid: 1,
            replies: []
        }
        dispatch({ type: 'comment_added', payload: nextComment });
        setInput('');
    }
 
    return (
            <form 
                onClick={() => {onFormClose ? onFormClose() : null}}
                className='message-form' data-replyto={attrValue}>
                {type === 'update' ? null :
                    <Avatar 
                        className='message-form__icon' 
                        src={currentUser.image}
                    />
                } 
                <TextArea 
                    placeholder={type === 'send' ? 'Add a comment...' : ''}
                    addressant={replyTo}
                    className='message-form__area'
                    content={input}
                    onContentChange={setInput}
                />
                <SubmitBtn 
                    title={type} 
                    onBtnClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (input.trim().length > 0) {
                            type === 'reply' && onReplyBtnClick(commentId);
                            type === 'send' && onSendBtnClick();
                        } else {
                            onFormClose && onFormClose()
                        }
                    }}
                />
            </form>
    )
} 

MessageForm.propTypes = {
    type: PropTypes.string,
    commentId: PropTypes.number,
    replyTo: PropTypes.string,
    onFormClose: PropTypes.func
}