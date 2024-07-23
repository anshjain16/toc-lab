import Graph from "../visualize-utils/Graph"

class DFA{
    constructor({states, initialState, finalStates, alphabets, transitions}) {
        this.states = states
        this.initialState = initialState
        this.alphabets = alphabets
        this.finalStates = finalStates
        this.transitions = transitions
    }

    addState({id}) {
        this.states.forEach(state => {
            if(state.id == id) throw new Error("State already exists");
        });
        this.states.push({id : id});
    }

    addTransition({from, to, alphabet}) {
        if(!this.alphabets.includes(alphabet)) throw new Error("Alphabet does not exist");
        if(this.transitions.includes({from, to, alphabet})) throw new Error("Transition already exist");
        this.transitions.push({from, to, alphabet});
    }

    removeState({id}){
        if(!this.states.includes({id})) throw new Error("State does not exist");
        this.states.splice(this.states.indexOf({id}), 1);
    }

    removeTransition(transition){
        if(!this.transitions.includes(transition)) throw new Error("Transition does not exist");
        this.transitions.splice(this.transitions.indexOf(transition), 1);
    }

    addAlphabet(c){
        if(this.alphabets.includes(c)) throw new Error("Alphabet already exists")
        this.alphabets.push(c);
    }

    removeAlphabet(c){
        if(!this.alphabets.includes(c)) throw new Error("Alphabet does not exist");
        this.alphabets.splice(this.alphabets.indexOf(c), 1);
    }

    addFinalState(state){
        if(this.finalStates.includes(state)) throw new Error("State is already a final state");
        this.finalStates.push(state);
    }

    removeFinalState(state) {
        if(!this.finalStates.includes(state)) throw new Error("State is not a final state");
        this.finalStates.splice(this.finalStates.indexOf(state), 1);
    }

    updateInitialState(state){
        if(this.initialState == state.id) throw new Error("state is already the initial state");
        this.initialState = state.id
    }

    getPositions(){
        const edgeMap = new Map();
        const stateMap = new Map();
        this.transitions.forEach(({from, to, alphabet}) => {
            stateMap.set({id : from}, true);
            stateMap.set({id : to}, true);
            edgeMap.set([from, to], true);
            edgeMap.set([to, from], true);
        })

        var nodes = []
        for(const [key, value] of stateMap){
            nodes.push(key.id);
        }
        var numNodes = nodes.length;
        var edges = []
        this.transitions.forEach(({from, to, alphabet}) => {
            if(edgeMap.get([from, to]) || edgeMap.get([to, from]) || from == to){
                // do nothing
            }
            else{
                edges.push([from, to]);
                edgeMap.set([from, to], true);
                edgeMap.set([to, from], true);
            }
        })
        
        console.log({numNodes, nodes, edges})
        const graph = new Graph({numNodes, nodes, edges});
        this.graph = graph

    }
}

export default DFA;