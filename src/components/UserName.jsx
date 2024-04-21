import { PropTypes } from 'prop-types';

export default function UserName({name}){
    return (
        <h2>{name}</h2>
    )
} 


UserName.propTypes = {
    name: PropTypes.string
}
