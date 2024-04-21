import { PropTypes } from 'prop-types';
import { useMemo } from 'react';

export default function MessageControl({isFaded, title, onBtnClick}){
    const label = useMemo(() => title === 'reply' ? 'reply to comment' : title + ' your message', [title]);
    const className = isFaded ? 
        `message-control message-control_faded message-control_${title}` :
        `message-control message-control_${title}`
    return <button aria-label={label} onClick={onBtnClick} className={className} >{title}</button>
} 

MessageControl.propTypes = {
    title: PropTypes.string.isRequired,
    isFaded: PropTypes.bool,
    onBtnClick: PropTypes.func
}