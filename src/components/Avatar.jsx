import { PropTypes } from 'prop-types'

export default function Avatar({className, src}){

    return (
        <div className={className}>
            <picture>
                <source srcSet={src.webp} type='image/webp'/>
                <img src={src.png} alt='user picture'/>
            </picture>
            
        </div>
    )
} 

Avatar.propTypes = {
    className: PropTypes.string.isRequired,
    src: PropTypes.shape({
        webp: PropTypes.string,
        png: PropTypes.string
    })
}