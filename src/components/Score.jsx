import { PropTypes } from 'prop-types';

export default function Score({onPlusClick, onMinusClick, score}){
    return (
        <div className="message-score">
            <button 
                onClick={onPlusClick} 
                className="message-score__control" 
                aria-label='vote up comment'
            >
                <span aria-hidden='true'>&#43;</span>
            </button>
            <p className="message-score__num">{score}</p>
            <button 
                onClick={onMinusClick} 
                className="message-score__control"
                aria-label='vote down comment'
            >
                <span aria-hidden>&#8722;</span>
            </button>
        </div>
    )
} 

Score.propTypes = {
    score: PropTypes.number,
    onPlusClick: PropTypes.func,
    onMinusClick: PropTypes.func
}