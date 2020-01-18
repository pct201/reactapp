import React, { Fragment } from 'react';

const Loader = (props) => {    
    return (       
        <Fragment>
            {props.show ?
                <div>
                    <div class="loader"></div>
                    <div class="loader-overlay"></div>  </div>
                : ""}
        </Fragment>
    )
}
export default Loader;