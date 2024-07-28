// regexToDfaConverter.js

class State {
	constructor() {
		this.transitions = {a: new Set(), b: new Set()};
		this.isAccepting = false;
	}
}

function parseRegex(regex) {
	const tokens = [];
	let i = 0;
	while (i < regex.length) {
		if (
			regex[i] === "a" ||
			regex[i] === "b" ||
			regex[i] === "*" ||
			regex[i] === "+" ||
			regex[i] === "(" ||
			regex[i] === ")"
		) {
			tokens.push(regex[i]);
			i++;
		} else if (regex[i] === ".") {
			tokens.push(".");
			i++;
		} else {
			throw new Error(`Invalid character in regex: ${regex[i]}`);
		}
	}
	return tokens;
}

function buildNFA(tokens) {
	const stack = [];
	for (const token of tokens) {
		if (token === "a" || token === "b") {
			const start = new State();
			const end = new State();
			end.isAccepting = true;
			start.transitions[token].add(end);
			stack.push({start, end});
		} else if (token === ".") {
			const right = stack.pop();
			const left = stack.pop();
			left.end.transitions.a = right.start.transitions.a;
			left.end.transitions.b = right.start.transitions.b;
			left.end.isAccepting = false;
			stack.push({start: left.start, end: right.end});
		} else if (token === "+") {
			const right = stack.pop();
			const left = stack.pop();
			const start = new State();
			const end = new State();
			end.isAccepting = true;
			start.transitions.a.add(left.start);
			start.transitions.b.add(left.start);
			start.transitions.a.add(right.start);
			start.transitions.b.add(right.start);
			left.end.transitions.a.add(end);
			left.end.transitions.b.add(end);
			right.end.transitions.a.add(end);
			right.end.transitions.b.add(end);
			stack.push({start, end});
		} else if (token === "*") {
			const {start, end} = stack.pop();
			const newStart = new State();
			const newEnd = new State();
			newEnd.isAccepting = true;
			newStart.transitions.a.add(start);
			newStart.transitions.b.add(start);
			newStart.transitions.a.add(newEnd);
			newStart.transitions.b.add(newEnd);
			end.transitions.a.add(start);
			end.transitions.b.add(start);
			end.transitions.a.add(newEnd);
			end.transitions.b.add(newEnd);
			stack.push({start: newStart, end: newEnd});
		}
	}
	return stack[0];
}

function epsilonClosure(state, visited = new Set()) {
	if (visited.has(state)) return visited;
	visited.add(state);
	for (const nextState of state.transitions.a) {
		epsilonClosure(nextState, visited);
	}
	for (const nextState of state.transitions.b) {
		epsilonClosure(nextState, visited);
	}
	return visited;
}

function NFAtoDFA(nfa) {
	const dfa = {};
	const queue = [epsilonClosure(nfa.start)];
	const stateMap = new Map();

	while (queue.length > 0) {
		const currentStates = queue.shift();
		const stateKey = Array.from(currentStates)
			.map((s) => s.id)
			.sort()
			.join(",");

		if (stateMap.has(stateKey)) continue;

		const dfaState = {id: stateKey, transitions: {}, isAccepting: false};
		stateMap.set(stateKey, dfaState);
		dfa[stateKey] = dfaState;

		for (const state of currentStates) {
			if (state.isAccepting) {
				dfaState.isAccepting = true;
				break;
			}
		}

		for (const symbol of ["a", "b"]) {
			const nextStates = new Set();
			for (const state of currentStates) {
				for (const nextState of state.transitions[symbol]) {
					epsilonClosure(nextState, nextStates);
				}
			}

			if (nextStates.size > 0) {
				const nextStateKey = Array.from(nextStates)
					.map((s) => s.id)
					.sort()
					.join(",");
				dfaState.transitions[symbol] = nextStateKey;
				if (!stateMap.has(nextStateKey)) {
					queue.push(nextStates);
				}
			}
		}
	}

	return dfa;
}

export function convertRegexToDFA(regex) {
	const tokens = parseRegex(regex);
	const nfa = buildNFA(tokens);
	return NFAtoDFA(nfa);
}
