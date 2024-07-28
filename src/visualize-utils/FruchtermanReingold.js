// LAYOUT ALGORITHM CLASS
// FORCE DIRECTED ALGORITHM -> FRUCHTERMAN - REINGOLD ALGORITHM
//
// basic info -
// considers repulsive forces between nodes
// considers edges as springs, so two nodes connected by an edge act an attraction force on each other
// calculate total forces on each node
// calculate net displacement on each node, and shifts its position accordingly
// repeats the steps until max iterations is reached or the equilibrium is attained
// sources - https://www.youtube.com/playlist?list=PLubYOWSl9mIuJXdt_pMYoTD8QkaX9kQgO
// sources - https://github.com/kamilniedzinski/graph-drawing

import Vector from "./Vector";

class FruchtermanReingold {
	constructor(graph, width, height) {
		this.graph = graph;
		this.width = width;
		this.height = height;
		this.area = width * height;
		this.l = 2;
		this.maxIters = 10000000; // max iteration for which the algorithm can run
		this.nodeIds = graph.rawNodes.map((node) => node.id);
		this.nodes = graph.nodes;
		this.edges = graph.edges;
		this.iterStep = 0.1;
		this.temp = 1; // parameter used to measure state of equilibrium
		this.currIter = 0;
	}

	// attraction force = ||u - v|| ^ 2 / optimalLen
	attraction(d) {
		return Math.pow(d, 2) / this.l;
	}

	// repulsion force = optimalLen ^ 2 / ||u - v||
	repulsion(d) {
		return Math.pow(this.l, 2) / d;
	}

	// calculates attraction force between all nodes that have an edge between them
	calcAttraction() {
		this.edges.forEach((element) => {
			const u = this.nodes[element[0]],
				v = this.nodes[element[1]];
			const uMinusV = u.pos.subtract(v.pos);
			const dist = uMinusV.normalize();
			const attForce = this.attraction(uMinusV.magnitude());
			const scaledDist = dist.scale(attForce);

			u.disp = u.disp.subtract(scaledDist);
			v.disp = v.disp.add(scaledDist);
		});
	}

	// calculate repulsion force acted by each node on every other node
	calcRepulsion() {
		this.nodeIds.forEach((uid) => {
			const u = this.nodes[uid];
			u.disp = new Vector(0.0, 0.0);
			this.nodeIds.forEach((vid) => {
				if (vid !== uid) {
					const v = this.nodes[vid];
					const uMinusV = u.pos.subtract(v.pos);
					const repForce = this.repulsion(uMinusV.magnitude());
					const dist = uMinusV.normalize().scale(repForce);

					u.disp = u.disp.add(dist);
				}
			});
		});
	}

	// calculates the displacements of each nodes
	calcDisplacement() {
		this.nodeIds.forEach((nid) => {
			const node = this.nodes[nid];
			const disp = node.disp.normalize();
			const factor = Math.min(node.disp.magnitude() / 100, this.temp * 0.1);
			const displacement = disp.scale(factor);

			node.pos = node.pos.add(displacement);
		});
	}

	// checks for equilibrium condition
	cool() {
		this.temp *= 1 - this.currIter / this.maxIters;
	}

	// what a step of the algorithm looks like
	updatePositions() {
		this.currIter += this.iterStep;

		this.calcRepulsion();
		this.calcAttraction();
		this.calcDisplacement();

		this.cool();
	}

	// checks if any teerminating condition has been reached or not
	isDone() {
		return this.temp < 0.5 || this.currIter > this.maxIters;
	}

	// just a utility function to run the algortihm stepwise
	step() {
		if (!this.isDone()) {
			this.updatePositions();
			// console.log(`Iteration: ${this.currIter}`);
		}
	}

	// runs the algorithm in one go, and gives final results
	run() {
		while (!this.isDone()) {
			this.updatePositions();
		}
	}
}

export default FruchtermanReingold;
