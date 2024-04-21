import { useContext, useRef, useEffect, useCallback } from "react";
import { PropTypes } from 'prop-types';
import { AppDispatchContext } from "../AppContext";

export default function DeleteModal({parentId, id, closeModal}){
    const dispatch = useContext(AppDispatchContext);
    const ref = useRef(document.body);
    const cancelRef = useRef(null);

    useEffect(()=>{
        if (cancelRef) {
            cancelRef.current.focus();
        } 

        ref.current.style.overflow = 'hidden';
    },[]);

    const onDeleteComment = useCallback((commentid) => {
        dispatch({ type: 'comment_deleted', commentid })
    }, [dispatch]);
    
    const onDeleteReply = useCallback((commentid, replyid) => {
        dispatch({type: 'reply_deleted', commentid, replyid})
    }, [dispatch]);

    const title = 'Delete comment';
    const description = `
    Are you sure you want to delete this comment? 
    This will remove the comment and can't be undone.`;

    return (
        <div 
            className='overlay'
            onKeyUp={(e) => {
                if (e.key === 'Escape') {
                    closeModal();
                }
            }}
            onClick={closeModal}
        >
            <div 
                role='alertdialog' 
                aria-labelledby='dialog-title'
                aria-describedby='dialog-description'
                aria-modal='true'
                className='overlay__dialog'>
                <h2 id='dialog-title' className='overlay__title'>{title}</h2>
                <p id='dialog-description' className='overlay__description'>{description}</p>
                <button 
                    ref={cancelRef}
                    onClick = {()=> {
                        closeModal();
                        ref.current.style.overflow = '';
                    }}
                    className='overlay__btn'>
                    no, cancel
                </button>
                <button 
                    onClick={
                        () => {
                            parentId && onDeleteReply(parentId, id);
                            !parentId && onDeleteComment(id);
                            closeModal();
                            ref.current.style.overflow = '';
                        }
                    }
                    className='overlay__btn overlay__btn_delete'>
                    yes, delete
                </button>
            </div>
        </div>
    )
}

DeleteModal.propTypes = {
    type: PropTypes.string,
    parentId: PropTypes.number,
    id: PropTypes.number,
    closeModal: PropTypes.func
}