import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('app'));

const InformModal = (props) => {
    const { informModalToggel, message, isOpen, activeFunction, obj, history } = props

    const onPressEnter = () => {
        activeFunction(obj);
        informModalToggel();
        history.push('/treatments');

    }
    return (
        <Modal
            isOpen={isOpen}
            contentLabel="טיפול עבר חדש"
            onRequestClose={() => { informModalToggel() }}
            closeTimeoutMS={200}
            className="modal"
        >
            <h3 className="modal__title">{message}</h3>

            <div className="remove-cancel-buttons">
                <button className="button--ok" onClick={() => { onPressEnter() }}>אישור</button>
                <button className="button--secondery" onClick={() => { informModalToggel() }}>ביטול</button>
            </div>
        </Modal>
    )
}


export default InformModal;
