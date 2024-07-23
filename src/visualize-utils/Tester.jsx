import React, { useRef, useEffect, useState } from 'react';
import Graph from './Graph';
import FruchtermanReingold from './FruchtermanReingold';

const GraphVisualization = () => {
    const canvasRef = useRef(null);
    const [fr, setFr] = useState(null);
    const [iteration, setIteration] = useState(0); // used to render graph at every step

    useEffect(() => {
        const canvas = canvasRef.current;
        const width = canvas.width;
        const height = canvas.height;

        const data = {
            numNodes: 5,
            nodes: [
                { id: 'S0' },
                { id: 'S1' },
                { id: 'S2' },
                { id: 'S3' },
                { id: 'S4' },
                // { id: 'S5' },
                // { id: 'S6' },
                // { id: 'S7' },
                // { id: 'S8' }
            ],
            edges: [
                ['S0', 'S1'],
                ['S0', 'S3'],
                // ['S0', 'S4'],
                // ['S0', 'S5'],
                // ['S0', 'S7'],
                // ['S0', 'S8'],
                ['S0', 'S2'],
                ['S1', 'S2'],
                ['S1', 'S3'],
                // ['S2', 'S4'],
                ['S3', 'S4'],
                // ['S2', 'S6'],
                ['S1', 'S4'],
                ['S4', 'S2'],
                // ['S3?', 'S7'],
                // ['S3', 'S8'],
                // ['S4', 'S5'],
                // ['S4', 'S6'],
                // ['S4', 'S8'],
                // ['S5', 'S6'],
                // ['S5', 'S8'],
                // ['S6', 'S8']
            ]
        };
        
        

        const graph = new Graph(data);
        const fruchtermanReingold = new FruchtermanReingold(graph, width, height);
        setFr(fruchtermanReingold);
        // fruchtermanReingold.run()
    }, []);

    useEffect(() => {
        if (fr) {
            const interval = setInterval(() => {
                fr.step();
                setIteration(prev => prev + 1);
            }, 1);

            return () => clearInterval(interval);
        }
    }, [fr]);

    useEffect(() => {
        if (fr) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const width = canvas.width;
            const height = canvas.height;

            ctx.clearRect(0, 0, width, height);

            const drawNode = (node) => {
                ctx.beginPath();
                ctx.arc(node.pos.x * 100 + width / 2, node.pos.y * 100 + height / 2, 20, 0, 2 * Math.PI);
                ctx.fillStyle = 'lightblue';
                ctx.fill();
                ctx.stroke();

                ctx.font = '16px Arial';
                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(node.id, node.pos.x * 100 + width / 2, node.pos.y * 100 + height / 2);
            };

            const drawEdge = (u, v) => {
                ctx.beginPath();
                ctx.moveTo(u.pos.x * 100 + width / 2, u.pos.y * 100 + height / 2);
                ctx.lineTo(v.pos.x * 100 + width / 2, v.pos.y * 100 + height / 2);
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 2;
                ctx.stroke();
            };

            fr.graph.edges.forEach(edge => {
                const u = fr.graph.nodes[edge[0]];
                const v = fr.graph.nodes[edge[1]];
                drawEdge(u, v);
            });

            Object.values(fr.graph.nodes).forEach(node => {
                drawNode(node);
            });
        }
    }, [fr, iteration]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '500px' }}>
            <h1>Fruchterman Reingold Algorithm</h1>
            <canvas ref={canvasRef} width={800} height={500} style={{ border: '1px solid black' }} />
        </div>
    );
};

export default GraphVisualization;
