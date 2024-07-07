import React from 'react';
import GraphVisualization from './visualize-utils/Tester';
import Welcome from './pages/Welcome';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Welcome/>}/>
          <Route path='/frtest' element={<GraphVisualization/>}/>
        </Routes>
      </BrowserRouter>
    );
}

export default App;
