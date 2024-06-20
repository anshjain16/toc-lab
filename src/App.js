// DFAForm.jsx
import React, { useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";

const DFAForm = () => {
  const [states, setStates] = useState([]);
  const [transitions, setTransitions] = useState([]);
  const [elements, setElements] = useState([]);
  const [alphabet, setAlphabet] = useState([]);
  const [startState, setStartState] = useState("");
  const [acceptStates, setAcceptStates] = useState([]);
  const [initialNodes, setInitialNodes] = useState([]);
  const [initialEdges, setInitialEdges] = useState([]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

  console.log(initialEdges, initialNodes);

  const handleAddState = (stateId) => {
    if (!states.includes(stateId)) {
      setStates([...states, stateId]);

      // Update elements with new state node
      setElements((els) => [
        ...els,
        {
          id: stateId,
          type: "default",
          data: { label: stateId },
          position: {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          },
        },
      ]);
      setInitialNodes((prev) => [
        ...prev,
        {
          id: stateId,
          type: "default",
          data: { label: stateId },
          position: {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          },
        },
      ]);
    } else {
      alert(`State '${stateId}' already exists!`);
    }
  };

  const handleAddAlphabetSymbol = (symbol) => {
    if (!alphabet.includes(symbol)) {
      setAlphabet([...alphabet, symbol]);
    } else {
      alert(`Alphabet symbol '${symbol}' already exists!`);
    }
  };

  const handleSetStartState = (state) => {
    if (states.includes(state)) {
      setStartState(state);
    } else {
      alert("Invalid start state! Make sure the state exists.");
    }
  };

  const handleToggleAcceptState = (state) => {
    if (states.includes(state)) {
      if (acceptStates.includes(state)) {
        setAcceptStates(acceptStates.filter((s) => s !== state));
      } else {
        setAcceptStates([...acceptStates, state]);
      }
    } else {
      alert("Invalid acceptance state! Make sure the state exists.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const fromState = formData.get("fromState");
    const inputSymbol = formData.get("inputSymbol");
    const toState = formData.get("toState");

    handleAddTransition(fromState, inputSymbol, toState);
  };

  const handleAddTransition = (fromState, inputSymbol, toState) => {
    if (
      states.includes(fromState) &&
      states.includes(toState) &&
      alphabet.includes(inputSymbol)
    ) {
      const newTransitionId = `transition-${transitions.length + 1}`;
      setTransitions([...transitions, newTransitionId]);

      setInitialEdges((prev) => [
        ...prev,
        {
          id: newTransitionId,
          source: fromState,
          target: toState,
        },
      ]);
    } else {
      alert(
        "Invalid states or input symbol! Make sure both states exist and input symbol is in alphabet."
      );
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <form onSubmit={handleSubmit}>
        <label>
          From State:
          <input type="text" name="fromState" required />
        </label>
        <label>
          Input Symbol:
          <input type="text" name="inputSymbol" required />
        </label>
        <label>
          To State:
          <input type="text" name="toState" required />
        </label>
        <button type="submit">Add Transition</button>
      </form>

      <div>
        <label>
          Add State:
          <input type="text" id="stateId" />
          <button
            onClick={() =>
              handleAddState(document.getElementById("stateId").value)
            }
          >
            Add
          </button>
        </label>
      </div>

      <div>
        <label>
          Add Alphabet Symbol:
          <input type="text" id="symbol" />
          <button
            onClick={() =>
              handleAddAlphabetSymbol(document.getElementById("symbol").value)
            }
          >
            Add
          </button>
        </label>
      </div>

      <div>
        <label>
          Set Start State:
          <input type="text" id="startState" />
          <button
            onClick={() =>
              handleSetStartState(document.getElementById("startState").value)
            }
          >
            Set
          </button>
        </label>
      </div>

      <div>
        <label>
          Toggle Acceptance State:
          <input type="text" id="acceptState" />
          <button
            onClick={() =>
              handleToggleAcceptState(
                document.getElementById("acceptState").value
              )
            }
          >
            Toggle
          </button>
        </label>
      </div>

      <div>
        <h3>Alphabet: {alphabet.join(", ")}</h3>
        <h3>Start State: {startState}</h3>
        <h3>Acceptance States: {acceptStates.join(", ")}</h3>
      </div>

      <div style={{ flex: 1, position: "relative" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          defaultViewport={defaultViewport}
          minZoom={0.2}
          maxZoom={4}
          attributionPosition="bottom-left"
        >
          {/* <MiniMap /> */}
          {/* <Controls /> */}
          {/* <Background /> */}
        </ReactFlow>
      </div>
    </div>
  );
};

export default DFAForm;
