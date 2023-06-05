import { useContext } from 'react'
import { Toast } from 'react-bootstrap'
import { MessageContext } from './../../context/message.context'

const UserMessage = () => {

    const { closeToast, toastMessage, showToast } = useContext(MessageContext)

    return (
        <Toast onClose={closeToast} show={showToast} delay={3000} autohide style={{ position: 'fixed', bottom: 10, right: 10 }}>
            <Toast.Header>
                <strong className="me-auto">Mensaje del sistema</strong>
            </Toast.Header>
            <Toast.Body style={{ textAlign: 'center', fontSize: '1.8em' }}>{toastMessage}</Toast.Body>
        </Toast>
    )
}

export default UserMessage