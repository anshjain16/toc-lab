import React from "react";
import ReactFlow, {Handle, Background, MarkerType} from "react-flow-renderer";

const DfaNode = ({data}) => (
	<div
		style={{
			padding: 10,
			borderRadius: "50%",
			border: data.isAccepting ? "6px double #ff0072" : "2px solid #1a192b",
			background: "#ffffff",
			color: "#333",
			width: 50,
			height: 50,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			fontWeight: "bold",
			position: "relative",
		}}>
		{data.label}
		<Handle
			type="source"
			position="right"
			id="right"
			style={{
				top: "50%",
				transform: "translateY(-50%)",
				background: "#555",
				width: 8,
				height: 8,
				right: -4,
			}}
		/>
		<Handle
			type="target"
			position="right"
			id="right"
			style={{
				top: "50%",
				transform: "translateY(-50%)",
				background: "#555",
				width: 8,
				height: 8,
				right: -4,
			}}
		/>
		<Handle
			type="target"
			position="left"
			id="left"
			style={{
				top: "50%",
				transform: "translateY(-50%)",
				background: "#555",
				width: 8,
				height: 8,
				left: -4,
			}}
		/>
		<Handle
			type="source"
			position="left"
			id="left"
			style={{
				top: "50%",
				transform: "translateY(-50%)",
				background: "#555",
				width: 8,
				height: 8,
				left: -4,
			}}
		/>
		<Handle
			type="target"
			position="top"
			id="top"
			style={{
				background: "#555",
				width: 8,
				height: 8,
				top: -4,
			}}
		/>
		<Handle
			type="source"
			position="top"
			id="top"
			style={{
				background: "#555",
				width: 8,
				height: 8,
				top: -4,
			}}
		/>
		<Handle
			type="source"
			position="bottom"
			id="bottom"
			style={{
				background: "#555",
				width: 8,
				height: 8,
				bottom: -4,
			}}
		/>
		<Handle
			type="target"
			position="bottom"
			id="bottom"
			style={{
				background: "#555",
				width: 8,
				height: 8,
				bottom: -4,
			}}
		/>
	</div>
);

const nodeTypes = {
	dfaNode: DfaNode,
};

const DfaVisualization = ({dfa}) => {
	const nodes = Object.keys(dfa.states).map((state, index) => ({
		id: state,
		type: "dfaNode",
		data: {
			label: state,
			isAccepting: dfa.accept.includes(state),
		},
		position: {x: 100 + index * 150, y: 100 + (index % 2) * 100},
	}));

	const edges = dfa.transitions.map(
		({from, symbol, to, sourceHandle, targetHandle}) => ({
			id: `${from}-${symbol}-${to}`,
			source: from,
			target: to,
			sourceHandle: sourceHandle,
			targetHandle: targetHandle,
			label: symbol,
			type: "default",
			labelStyle: {fill: "#333", fontSize: 16, fontWeight: 700},
			style: {stroke: "#333", strokeWidth: 2},
			markerEnd: {
				type: MarkerType.ArrowClosed,
				width: 15,
				height: 15,
				color: "#333",
			},
		})
	);

	nodes.push({
		id: "start",
		type: "input",
		data: {label: ""},
		position: {x: 0, y: 100},
		style: {background: "none", border: "none"},
	});

	edges.push({
		id: "start-edge",
		source: "start",
		target: dfa.start,
		sourceHandle: "right",
		targetHandle: "left",
		type: "default",
		style: {stroke: "#333", strokeWidth: 2},
		markerEnd: {
			type: MarkerType.ArrowClosed,
			width: 15,
			height: 15,
			color: "#333",
		},
	});

	return (
		<div style={{height: 500, width: "100%"}}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				nodeTypes={nodeTypes}
				fitView
				attributionPosition="bottom-left">
				<Background color="#888" gap={16} />
			</ReactFlow>
		</div>
	);
};

export default DfaVisualization;
