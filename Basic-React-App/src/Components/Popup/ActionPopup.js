import React from 'react';
import { Modal } from 'react-bootstrap';

const ActionPopup = (props) => {

    return (
        <Modal show={props.show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered="true"  onHide={props.popupClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body dangerouslySetInnerHTML={{ __html: props.message }}>

            </Modal.Body>
            <Modal.Footer>
                <div className="text-right w-100">                    
                    <button className="btn btn-primary" value="Yes" onClick={props.popupAction} ><span>Yes</span></button>
                    <button className="btn btn-secondary" value="No" onClick={props.popupClose} ><span>No</span></button>
                </div>

            </Modal.Footer>
        </Modal>)
}

export default ActionPopup;