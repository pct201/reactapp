import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
const HelpTip = (props) => {
    return (
        <OverlayTrigger overlay={<Tooltip id="tooltip">{ReactHtmlParser(props.message)}</Tooltip>}>
            <button className="helplink" tabIndex="-1" onClick={(event) => event.preventDefault()} />
        </OverlayTrigger>
    )
}
export default HelpTip;