import Spinner from 'react-bootstrap/Spinner';
import './Loader.css'

const Loader = () => {
    return (
        <div className='loader-container'>
            <Spinner className='loader' animation="border" variant="light" />
        </div>
    )
}

export default Loader;