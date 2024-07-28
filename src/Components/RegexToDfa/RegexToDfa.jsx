import React, {useState} from "react";
import DfaVisualization from "./DfaVisualization";

const RegexToDfa = () => {
	const [dfa, setDfa] = useState(null);

	const generateSampleDFA = () => {
		const sampleDFA = {
			states: {q0: {}, q1: {}, q2: {}},
			start: "q0",
			accept: ["q2", "q1"],
			transitions: [
				{
					from: "q0",
					symbol: "a",
					to: "q1",
					sourceHandle: "right",
					targetHandle: "left",
				},
				{
					from: "q1",
					symbol: "a",
					to: "q2",
					sourceHandle: "right",
					targetHandle: "left",
				},
				{
					from: "q2",
					symbol: "b",
					to: "q2",
					sourceHandle: "right",
					targetHandle: "top",
				},
				{
					from: "q0",
					symbol: "b",
					to: "q2",
					sourceHandle: "right",
					targetHandle: "left",
				},
				{
					from: "q1",
					symbol: "b",
					to: "q1",
					sourceHandle: "right",
					targetHandle: "top",
				},
			],
		};
		setDfa(sampleDFA);
	};

	const DfaInfo = () => (
		<div className="border border-gray-300 p-4 mt-6 bg-gray-100 rounded-lg">
			<div>
				<strong className="text-lg">DFA Information:</strong>
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
		<div className="regex-to-dfa p-6 bg-white shadow-md rounded-lg">
			<h1 className="text-8xl font-bold mb-4 text-center ">
				DFA Visualization
			</h1>
			<div className="flex justify-center mb-4">
				<button
					onClick={generateSampleDFA}
					className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ">
					Generate Complex Sample DFA
				</button>
			</div>
			{dfa && <DfaVisualization dfa={dfa} />}
			<DfaInfo />
		</div>
	);
};

export default RegexToDfa;
