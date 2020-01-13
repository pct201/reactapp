import React from 'react';
import { Modal } from 'react-bootstrap';

const MessagePopup = (props) => {

    return (
        <Modal show={props.show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered="true"  onHide={props.popupclose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body dangerouslySetInnerHTML={{ __html: props.message }}>

            </Modal.Body>
            <Modal.Footer>
                <div className="text-right w-100">
                    <input type="button" className="btn btn-primary" value="OK" onClick={props.popupclose} />
                </div>

            </Modal.Footer>
        </Modal>)
}

export default MessagePopup;