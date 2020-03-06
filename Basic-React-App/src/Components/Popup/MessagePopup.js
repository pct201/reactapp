import React from 'react';
import { Modal } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';

export const MessagePopup = (props) => {

    return (
        <Modal show={props.show} aria-labelledby="contained-modal-title-vcenter" centered="true" backdrop="static"  onHide={props.popupClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="custom-modal">
                <p className="wordwrap">{ReactHtmlParser(props.message)}</p>
            </Modal.Body>
            <Modal.Footer>
                <div className="text-right w-100">
                    <input type="button" className="btn btn-primary" value="OK" onClick={props.popupClose} />
                </div>

            </Modal.Footer>
        </Modal>)
}

export default MessagePopup;