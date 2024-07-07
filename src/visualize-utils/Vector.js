// VECTOR CLASS
// to implement vector operations like dot product, difference and addition of two vectors

export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }
    
    // a.subtract(b) => a - b
    subtract(v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    // a.dotProduct(b) => a.b <=> b.a
    dotProduct(v) {
        return this.x * v.x + this.y * v.y;
    }

    magnitude() {
        return Math.sqrt(this.dotProduct(this));
    }

    // divides the vector's coordinates by its magnitude
    normalize() {
        var mag = this.magnitude();
        return new Vector(this.x / mag, this.y / mag);
    }

    scale(scalar) {
        return new Vector(this.x * scalar, this.y * scalar); // multiplying a number to a vector
    }
}
