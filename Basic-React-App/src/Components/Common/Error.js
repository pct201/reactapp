import React from 'react';
import ReactHtmlParser from 'react-html-parser';
const Error = (props) => {
    return (
        <div className="text_center">
            <div><h2>Oops! Error</h2></div>
            <div>{ReactHtmlParser(props.match.params.message)}</div>
        </div>
    )
}
export default Error;