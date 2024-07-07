// NODE CLASS
// to store graph nodes

import Vector from './Vector'

export default class Node{
    constructor(id, x, y){
        this.id = id;
        this.pos = new Vector(x, y); // store the position of node
        this.disp = new Vector(0.0, 0.0); // store the calculated displacement after the algorithm work at each step
    }
}