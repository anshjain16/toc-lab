// GRAPH CLASS
// to store the graph in format required by the layout algorithm

import Node from "./Node";

export default class Graph {
	constructor(data) {
		this.numNodes = data.numNodes;
		this.rawNodes = data.nodes; // destructuring data to avoid mess - this is used to init nodes
		this.edges = data.edges;
		this.nodes = {}; // will store Node objects identified by their id
		this.adj = {}; // will store the id of neighboring Nodes for each Node
		this.radius = 2; // hardcoding this value, as it is only used to calculate init positions

		// converting each node from the ui to Node class object for further calculations
		for (let i = 0; i < this.numNodes; i++) {
			const positions = this.initPositions(i, this.numNodes);
			const newNode = new Node(this.rawNodes[i].id, positions.x, positions.y);
			this.nodes[this.rawNodes[i].id] = newNode;
		}

		// storing the adjacency list
		for (let i = 0; i < this.edges.length; i++) {
			this.addEdge(this.edges[i][0], this.edges[i][1]); // testing phase => 2 - D list, another form of input may come in future
		}
	}

	// undirected graph so u <-> v
	addEdge(u, v) {
		this.adj[u] = this.adj[u] || [];
		this.adj[u].push(v);
		this.adj[v] = this.adj[v] || [];
		this.adj[v].push(u);
	}

	// initialising positions of nodes in circular format, the most optimal starting position for this algorithm
	initPositions(i, numNode) {
		const angle = Math.PI - (i * (2 * Math.PI)) / numNode;
		const radius = this.radius;
		const x = radius * Math.cos(angle);
		const y = radius * Math.sin(angle);
		return {x: x, y: y};
	}
}
