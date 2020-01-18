import React, { Fragment } from 'react';

const Loader = (props) => {    
    return (       
        <Fragment>
            {props.show ?
                <div>
                    <div className="loader"></div>
                    <div className="loader-overlay"></div>  </div>
                : ""}
        </Fragment>
    )
}
export default Loader;