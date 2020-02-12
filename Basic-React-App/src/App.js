import React, { Component, Fragment } from 'react';
import Routes from './Route/route'
import { ErrorBoundary,GlobalLoader } from './Components/Common';

class App extends Component {
  render() {   
    return (          
        <ErrorBoundary>
          <div className="App">         
            <Routes /> 
            <GlobalLoader/>
          </div>
        </ErrorBoundary>     
    )
  }
}
export default App;