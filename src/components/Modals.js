import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Modals = ({ showModal }) => {
    const handleShow = () => {
        showModal(false)
    }
    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'absolute' }}
        >
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Статус запроса</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Запрос успешно выполнен</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShow}>Close</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}

export default Modals
