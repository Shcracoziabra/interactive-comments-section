import { useEffect, useState, useRef, useCallback } from "react";
import { PropTypes } from 'prop-types';

export default function TextArea({placeholder='', addressant, className, content, onContentChange}) {
    const [height, setHeight] = useState('');
    const replyWord = addressant ? `@${addressant}, ` : '';
    const myRef = useRef(null);

    const setInnerHeight = useCallback(
        (content) => {
            const areaHeight = content.trim().length > 0 
                ? Math.max(myRef.current.scrollHeight, 100) 
                : 100;
            setHeight(areaHeight +'px');
        }, [setHeight]
    )

    useEffect(()=>{
        myRef.current.selectionStart = (replyWord + content).length;
        myRef.current.selectionEnd = (replyWord + content).length;
        setInnerHeight(content);
    }, [replyWord, content, setInnerHeight]);

    const textAreaLabel = content.trim().length === 0 ? 'create new message' : 'update message';

    return (
        <textarea 
            aria-label={textAreaLabel}
            name={addressant ? addressant + '_reply' : 'new_comment'}
            ref={myRef}
            value={replyWord+content}
            style={{height: height}}
            onClick={(e)=> e.stopPropagation()}
            placeholder={placeholder}
            onChange={
                (e) => {
                    onContentChange(e.target.value.slice(replyWord.length));
                    setInnerHeight(e.target.value);
                }  
            }
            className={className}
            maxLength={300}
        >   
        </textarea>
    )
}

TextArea.propTypes = {
    placeholder: PropTypes.string,
    addressant: PropTypes.string,
    className: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    onContentChange: PropTypes.func.isRequired
}