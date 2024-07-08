import React from 'react';
import GraphVisualization from './visualize-utils/Tester';
import Welcome from './pages/Welcome';
import DFAPage from './pages/dfa';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Welcome/>}/>
          <Route path='/frtest' element={<GraphVisualization/>}/>
          <Route path='/dfa' element={<DFAPage/>} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
