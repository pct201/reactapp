import React from 'react';

const GlobalLoader = () => {
  return (<>
    <div id="loader_div" style={{ display: "none" }}>
      <div className="loader"></div>
      <div className="loader-overlay"></div>
    </div></>
  )
}
export default React.memo(GlobalLoader);