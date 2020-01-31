import React from 'react';
import Routes from './Route/route'
import { ErrorBoundary } from './Components/Common';

export default function App() {
  return (
    <ErrorBoundary>
    <div className="App">     
        <Routes />     
    </div>
    </ErrorBoundary>
  );
}
