import React from 'react';
import { Modal } from 'react-bootstrap';

export const MessagePopup = (props) => {

    return (
        <Modal show={props.show} aria-labelledby="contained-modal-title-vcenter" centered="true"  onHide={props.popupClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body dangerouslySetInnerHTML={{ __html: props.message }}>

            </Modal.Body>
            <Modal.Footer>
                <div className="text-right w-100">
                    <input type="button" className="btn btn-primary" value="OK" onClick={props.popupClose} />
                </div>

            </Modal.Footer>
        </Modal>)
}

export default MessagePopup;