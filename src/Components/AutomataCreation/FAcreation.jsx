import React, {useState, useEffect} from "react";
import FaVisualization from "./FaVisualization";

const FaCreation = () => {
	const [dfa, setDfa] = useState(null);
	const [states, setStates] = useState([]);
	const [alphabet, setAlphabet] = useState([]);
	const [startState, setStartState] = useState("");
	const [acceptStates, setAcceptStates] = useState([]);
	const [transitions, setTransitions] = useState([]);
	const [newState, setNewState] = useState("");
	const [newSymbol, setNewSymbol] = useState("");
	const [newTransition, setNewTransition] = useState({
		from: "",
		symbol: "",
		to: "",
		sourceHandle: "",
		targetHandle: "",
	});

	useEffect(() => {
		if (
			states.length > 0 &&
			alphabet.length > 0 &&
			startState &&
			acceptStates.length > 0 &&
			transitions.length > 0
		) {
			const updatedDFA = {
				states: states.reduce((acc, state) => ({...acc, [state]: {}}), {}),
				start: startState,
				accept: acceptStates,
				transitions: transitions,
			};
			setDfa(updatedDFA);
		} else {
			setDfa(null);
		}
	}, [states, alphabet, startState, acceptStates, transitions]);

	const addState = () => {
		if (newState && !states.includes(newState)) {
			setStates([...states, newState]);
			setNewState("");
		}
	};

	const addSymbol = () => {
		if (newSymbol && !alphabet.includes(newSymbol)) {
			setAlphabet([...alphabet, newSymbol]);
			setNewSymbol("");
		}
	};

	const addTransition = () => {
		if (
			newTransition.from &&
			newTransition.symbol &&
			newTransition.to &&
			newTransition.sourceHandle &&
			newTransition.targetHandle
		) {
			setTransitions([...transitions, newTransition]);
			setNewTransition({
				from: "",
				symbol: "",
				to: "",
				sourceHandle: "",
				targetHandle: "",
			});
		} else {
			alert("Please fill in all fields for the transition.");
		}
	};

	const removeState = (stateToRemove) => {
		setStates(states.filter((state) => state !== stateToRemove));
		setAcceptStates(acceptStates.filter((state) => state !== stateToRemove));
		setTransitions(
			transitions.filter(
				(t) => t.from !== stateToRemove && t.to !== stateToRemove
			)
		);
		if (startState === stateToRemove) setStartState("");
	};

	const removeSymbol = (symbolToRemove) => {
		setAlphabet(alphabet.filter((symbol) => symbol !== symbolToRemove));
		setTransitions(transitions.filter((t) => t.symbol !== symbolToRemove));
	};

	const removeTransition = (transitionToRemove) => {
		setTransitions(
			transitions.filter(
				(t) =>
					t.from !== transitionToRemove.from ||
					t.symbol !== transitionToRemove.symbol ||
					t.to !== transitionToRemove.to
			)
		);
	};

	const DfaInfo = () => (
		<div className="border border-gray-300 p-4 mt-6 bg-gray-100 rounded-lg">
			<div>
				<strong className="text-lg">AUTOMATA Information:</strong>
				<ul className="list-disc list-inside">
					{dfa && (
						<>
							<li>Number of States: {Object.keys(dfa.states).length}</li>
							<li>Start State: {dfa.start}</li>
							<li>Accepting States: {dfa.accept.join(", ")}</li>
							<li>
								Alphabet:{" "}
								{[...new Set(dfa.transitions.map((t) => t.symbol))].join(", ")}
							</li>
						</>
					)}
				</ul>
			</div>
			{dfa && (
				<div className="mt-4">
					<strong className="text-lg">Transition Information:</strong>
					<table className="w-full border-collapse mt-2">
						<thead>
							<tr className="bg-gray-200">
								<th className="border border-gray-300 p-2">From State</th>
								<th className="border border-gray-300 p-2">Input</th>
								<th className="border border-gray-300 p-2">To State</th>
							</tr>
						</thead>
						<tbody>
							{dfa.transitions.map(({from, symbol, to}) => (
								<tr key={`${from}-${symbol}-${to}`}>
									<td className="border border-gray-300 p-2">{from}</td>
									<td className="border border-gray-300 p-2">{symbol}</td>
									<td className="border border-gray-300 p-2">{to}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);

	return (
		<div className="p-6 bg-white shadow-md rounded-lg">
			<h1 className="text-6xl font-bold mb-4 text-center">
				AUTOMATA Visualization
			</h1>

			<div className="flex mt-36 justify-around">
				<div className="mb-4">
					<h2 className="text-2xl font-bold mb-2">Create AUTOMATA</h2>

					{/* State input */}
					<div className="mb-2">
						<input
							type="text"
							value={newState}
							onChange={(e) => setNewState(e.target.value)}
							placeholder="New state"
							className="border p-2 rounded mr-2"
						/>
						<button
							onClick={addState}
							className="bg-green-500 text-white py-2 px-4 rounded">
							Add State
						</button>
					</div>

					{/* Symbol input */}
					<div className="mb-2">
						<input
							type="text"
							value={newSymbol}
							onChange={(e) => setNewSymbol(e.target.value)}
							placeholder="New symbol"
							className="border p-2 rounded mr-2"
						/>
						<button
							onClick={addSymbol}
							className="bg-green-500 text-white py-2 px-4 rounded">
							Add Symbol
						</button>
					</div>

					{/* Start state selection */}
					<div className="mb-2">
						<select
							value={startState}
							onChange={(e) => {
								if (e.target.value && !startState.includes(e.target.value)) {
									setStartState([...startState, e.target.value]);
								}
							}}
							className="border p-2 rounded mr-2">
							<option value="">Select start state</option>
							{states.map((state) => (
								<option key={state} value={state}>
									{state}
								</option>
							))}
						</select>
					</div>

					{/* Accept states selection */}
					<div className="mb-2">
						<select
							value=""
							onChange={(e) => {
								if (e.target.value && !acceptStates.includes(e.target.value)) {
									setAcceptStates([...acceptStates, e.target.value]);
								}
							}}
							className="border p-2 rounded mr-2">
							<option value="">Add accept state</option>
							{states
								.filter((state) => !acceptStates.includes(state))
								.map((state) => (
									<option key={state} value={state}>
										{state}
									</option>
								))}
						</select>
					</div>

					{/* Transition input */}
					<div className="flex flex-wrap gap-2">
						<select
							value={newTransition.from}
							onChange={(e) =>
								setNewTransition({...newTransition, from: e.target.value})
							}
							className="border p-2 rounded">
							<option value="">From State</option>
							{states.map((state) => (
								<option key={state} value={state}>
									{state}
								</option>
							))}
						</select>

						<select
							value={newTransition.symbol}
							onChange={(e) =>
								setNewTransition({...newTransition, symbol: e.target.value})
							}
							className="border p-2 rounded">
							<option value="">Symbol</option>
							{alphabet.map((symbol) => (
								<option key={symbol} value={symbol}>
									{symbol}
								</option>
							))}
						</select>

						<select
							value={newTransition.to}
							onChange={(e) =>
								setNewTransition({...newTransition, to: e.target.value})
							}
							className="border p-2 rounded">
							<option value="">To State</option>
							{states.map((state) => (
								<option key={state} value={state}>
									{state}
								</option>
							))}
						</select>

						<select
							value={newTransition.sourceHandle}
							onChange={(e) =>
								setNewTransition({
									...newTransition,
									sourceHandle: e.target.value,
								})
							}
							className="border p-2 rounded">
							<option value="">Source Handle</option>
							<option value="top">Top</option>
							<option value="right">Right</option>
							<option value="bottom">Bottom</option>
							<option value="left">Left</option>
						</select>

						<select
							value={newTransition.targetHandle}
							onChange={(e) =>
								setNewTransition({
									...newTransition,
									targetHandle: e.target.value,
								})
							}
							className="border p-2 rounded">
							<option value="">Target Handle</option>
							<option value="top">Top</option>
							<option value="right">Right</option>
							<option value="bottom">Bottom</option>
							<option value="left">Left</option>
						</select>

						<button
							onClick={addTransition}
							className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
							Add Transition
						</button>
					</div>
				</div>

				{/* Display current components */}
				<div className="mb-8 bg-gray-100 p-6 rounded-lg shadow-md">
					<h3 className="text-2xl font-bold mb-4 text-gray-800">
						Current Components
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-white p-4 rounded-md shadow">
							<h4 className="text-lg font-semibold mb-2 text-gray-700">
								States
							</h4>
							<div className="flex flex-wrap gap-2">
								{states.map((state) => (
									<span
										key={state}
										className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center">
										{state}
										<button
											onClick={() => removeState(state)}
											className="ml-1 text-red-500 hover:text-red-700 focus:outline-none">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4"
												viewBox="0 0 20 20"
												fill="currentColor">
												<path
													fillRule="evenodd"
													d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
													clipRule="evenodd"
												/>
											</svg>
										</button>
									</span>
								))}
							</div>
						</div>

						<div className="bg-white p-4 rounded-md shadow">
							<h4 className="text-lg font-semibold mb-2 text-gray-700">
								Alphabet
							</h4>
							<div className="flex flex-wrap gap-2">
								{alphabet.map((symbol) => (
									<span
										key={symbol}
										className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm flex items-center">
										{symbol}
										<button
											onClick={() => removeSymbol(symbol)}
											className="ml-1 text-red-500 hover:text-red-700 focus:outline-none">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4"
												viewBox="0 0 20 20"
												fill="currentColor">
												<path
													fillRule="evenodd"
													d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
													clipRule="evenodd"
												/>
											</svg>
										</button>
									</span>
								))}
							</div>
						</div>

						<div className="bg-white p-4 rounded-md shadow">
							<h4 className="text-lg font-semibold mb-2 text-gray-700">
								Start State
							</h4>
							<span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
								{startState || "Not set"}
							</span>
						</div>

						<div className="bg-white p-4 rounded-md shadow">
							<h4 className="text-lg font-semibold mb-2 text-gray-700">
								Accept States
							</h4>
							<div className="flex flex-wrap gap-2">
								{acceptStates.map((state) => (
									<span
										key={state}
										className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm flex items-center">
										{state}
										<button
											onClick={() =>
												setAcceptStates(acceptStates.filter((s) => s !== state))
											}
											className="ml-1 text-red-500 hover:text-red-700 focus:outline-none">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4"
												viewBox="0 0 20 20"
												fill="currentColor">
												<path
													fillRule="evenodd"
													d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
													clipRule="evenodd"
												/>
											</svg>
										</button>
									</span>
								))}
							</div>
						</div>
					</div>

					<div className="mt-6 bg-white p-4 rounded-md shadow">
						<h4 className="text-lg font-semibold mb-2 text-gray-700">
							Transitions
						</h4>
						<ul className="space-y-2">
							{transitions.map((t, index) => (
								<li
									key={index}
									className="flex items-center justify-between bg-gray-50 p-2 rounded">
									<span className="text-sm">
										<span className="font-medium text-blue-600">{t.from}</span>
										<span className="mx-2 text-gray-500">
											--({t.symbol})--&gt;
										</span>
										<span className="font-medium text-blue-600">{t.to}</span>
										<span className="ml-2 text-gray-500">
											(Source: {t.sourceHandle}, Target: {t.targetHandle})
										</span>
									</span>
									<button
										onClick={() => removeTransition(t)}
										className="text-red-500 hover:text-red-700 focus:outline-none">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											viewBox="0 0 20 20"
											fill="currentColor">
											<path
												fillRule="evenodd"
												d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
												clipRule="evenodd"
											/>
										</svg>
									</button>
								</li>
							))}
						</ul>
					</div>
				</div>

				<DfaInfo />
			</div>
			{dfa && <FaVisualization dfa={dfa} />}
		</div>
	);
};

export default FaCreation;
