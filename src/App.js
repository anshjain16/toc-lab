import React from 'react';
import GraphVisualization from './visualize-utils/Tester';
import Welcome from './pages/Welcome';
import StateDrawer from './pages/dfa';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nfa_vis from './NFA/Nfa_vis';

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Welcome/>}/>
          <Route path='/frtest' element={<GraphVisualization/>}/>
          <Route path='/dfa' element={<StateDrawer/>} />
          <Route path='/nfa' element={<Nfa_vis/>}/>
        </Routes>
      </BrowserRouter> 
    );
}

export default App;
