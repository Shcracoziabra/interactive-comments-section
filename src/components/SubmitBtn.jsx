import { PropTypes } from 'prop-types';

export default function SubmitBtn({className, title, onBtnClick}){
    return (
        <button 
            onClick={onBtnClick}
            type='submit' 
            className={className || 'btn'}>{title || 'click'}
        </button>
    )
} 

SubmitBtn.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    onBtnClick: PropTypes.func
}