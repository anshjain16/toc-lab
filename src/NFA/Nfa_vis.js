import React, { useState, useEffect } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from 'react-flow-renderer';
import './Nfa_vis.css';

const initialNodes = [];
const initialEdges = [];

const Nfa_vis = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [states, setStates] = useState([]);
  const [alphabet, setAlphabet] = useState('');
  const [transitions, setTransitions] = useState([]);
  const [initialState, setInitialState] = useState('');
  const [finalStates, setFinalStates] = useState([]);
  const [inputString, setInputString] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    generateGraph();
  }, [states, transitions]);

  const addState = () => {
    setStates([...states, '']);
  };

  const updateState = (index, value) => {
    const newStates = [...states];
    newStates[index] = value;
    setStates(newStates);
  };

  const addTransition = () => {
    setTransitions([...transitions, { from: '', input: '', to: '' }]);
  };

  const updateTransition = (index, field, value) => {
    const newTransitions = [...transitions];
    newTransitions[index][field] = value;
    setTransitions(newTransitions);
  };

  const addFinalState = () => {
    setFinalStates([...finalStates, '']);
  };

  const updateFinalState = (index, value) => {
    const newFinalStates = [...finalStates];
    newFinalStates[index] = value;
    setFinalStates(newFinalStates);
  };

  const simulateNFA = () => {
    const nfa = buildNFA(states, alphabet.split(','), transitions, initialState, finalStates);
    const accepted = simulate(nfa, inputString);
    setResult(accepted ? 'Accepted' : 'Rejected');
  };

  const buildNFA = (states, alphabet, transitions, initialState, finalStates) => {
    const nfa = {
      states: new Set(states),
      alphabet: new Set(alphabet),
      transitions: {},
      initialState,
      finalStates: new Set(finalStates),
    };

    transitions.forEach(({ from, input, to }) => {
      if (!nfa.transitions[from]) {
        nfa.transitions[from] = {};
      }
      if (!nfa.transitions[from][input]) {
        nfa.transitions[from][input] = new Set();
      }
      nfa.transitions[from][input].add(to);
    });

    return nfa;
  };

  const simulate = (nfa, input) => {
    const currentStates = new Set([nfa.initialState]);
    for (const symbol of input) {
      const newStates = new Set();
      currentStates.forEach(state => {
        if (nfa.transitions[state] && nfa.transitions[state][symbol]) {
          nfa.transitions[state][symbol].forEach(newState => newStates.add(newState));
        }
      });
      if (newStates.size === 0) return false;
      currentStates.clear();
      newStates.forEach(state => currentStates.add(state));
    }
    return [...currentStates].some(state => nfa.finalStates.has(state));
  };

  const generateGraph = () => {
    const newNodes = states.map((state, index) => ({
      id: `${index}`,
      data: { label: state },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    }));
    setNodes(newNodes);

    const newEdges = transitions.map((trans, index) => ({
      id: `e${index}`,
      source: states.indexOf(trans.from).toString(),
      target: states.indexOf(trans.to).toString(),
      label: trans.input,
    }));
    setEdges(newEdges);
  };

  return (
    <div>
      <h1>NFA Simulator</h1>
      <div>
        <h2>States</h2>
        {states.map((state, index) => (
          <input
            key={index}
            type="text"
            value={state}
            onChange={(e) => updateState(index, e.target.value)}
            placeholder={`State ${index}`}
          />
        ))}
        <button onClick={addState}>Add State</button>
      </div>
      <div>
        <h2>Alphabet</h2>
        <input
          type="text"
          value={alphabet}
          onChange={(e) => setAlphabet(e.target.value)}
          placeholder="Alphabet (comma-separated)"
        />
      </div>
      <div>
        <h2>Transitions</h2>
        {transitions.map((transition, index) => (
          <div key={index}>
            <input
              type="text"
              value={transition.from}
              onChange={(e) => updateTransition(index, 'from', e.target.value)}
              placeholder="From"
            />
            <input
              type="text"
              value={transition.input}
              onChange={(e) => updateTransition(index, 'input', e.target.value)}
              placeholder="Input"
            />
            <input
              type="text"
              value={transition.to}
              onChange={(e) => updateTransition(index, 'to', e.target.value)}
              placeholder="To"
            />
          </div>
        ))}
        <button onClick={addTransition}>Add Transition</button>
      </div>
      <div>
        <h2>Initial State</h2>
        <input
          type="text"
          value={initialState}
          onChange={(e) => setInitialState(e.target.value)}
          placeholder="Initial State"
        />
      </div>
      <div>
        <h2>Final States</h2>
        {finalStates.map((state, index) => (
          <input
            key={index}
            type="text"
            value={state}
            onChange={(e) => updateFinalState(index, e.target.value)}
            placeholder={`Final State ${index}`}
          />
        ))}
        <button onClick={addFinalState}>Add Final State</button>
      </div>
      <div>
        <h2>Input String</h2>
        <input
          type="text"
          value={inputString}
          onChange={(e) => setInputString(e.target.value)}
          placeholder="Input String"
        />
      </div>
      <button onClick={simulateNFA}>Simulate NFA</button>
      <div>
        <h2>Result: {result}</h2>
      </div>
      <div style={{ height: 500, width: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Nfa_vis;
