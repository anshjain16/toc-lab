import React from "react";
import GraphVisualization from "./visualize-utils/Tester";
import Welcome from "./pages/Welcome";
import StateDrawer from "./pages/dfa";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FaCreation from "./Components/AutomataCreation/FAcreation";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Welcome />} />
				<Route path="/visualize" element={<GraphVisualization />} />
				<Route path="/dfa" element={<StateDrawer />} />
				<Route path="/FaCreate" element={<FaCreation />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
