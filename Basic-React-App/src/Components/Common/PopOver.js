import React from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
const PopOver = (props) => {
    const position = props.position === undefined || props.position === "" ? 'top' : props.position
    const popover = (
        <Popover id="popover-basic" className={props.customClass}>
            <Popover.Title as="h3">{props.title}</Popover.Title>
            <Popover.Content>
                {ReactHtmlParser(props.message)}
            </Popover.Content>
        </Popover>
    );

    return (
        <OverlayTrigger trigger="click" placement={position} overlay={popover}>
            <button variant="success" className="popoverbtn">{props.buttonText}</button>
        </OverlayTrigger>
    )
}
export default PopOver;

