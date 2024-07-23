import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const StateDrawer = () => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current)
            .attr('width', 800)
            .attr('height', 600)
            .style('border', '1px solid black');

        svg.append('circle')
            .attr('cx', 100)
            .attr('cy', 100)
            .attr('r', 30)
            .style('fill', 'lightblue')
            .call(d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended));

        function dragstarted(event, d) {
            d3.select(this).raise().attr('stroke', 'black');
        }

        function dragged(event, d) {
            d3.select(this).attr('cx', event.x).attr('cy', event.y);
        }

        function dragended(event, d) {
            d3.select(this).attr('stroke', null);
        }
    }, []);

    return <svg ref={svgRef}></svg>;
};

export default StateDrawer;
