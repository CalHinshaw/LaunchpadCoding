import React from 'react'
import dagre from 'dagre'

export class Graph extends React.Component {
  render() {
    // construct a new graph from scratch
    // because dagre mutates g for the layout
    var g = new dagre.graphlib.Graph();

    g.setGraph({});

    React.Children.forEach(this.props.children, function(child) {
      if (child.type === Vertex) {
        g.setNode(child.key, { label: child, width: child.props.width, height: child.props.height });

      } else if (child.type === Edge) {
        g.setEdge(child.props.source, child.props.target, { label: child });
      }
    });

    dagre.layout(g);

    // now render
    // node svg elements
    var nodes = g.nodes().map(function(v) {
      var node = g.node(v);
      return React.cloneElement(node.label, {
        x: node.x,
        y: node.y
      });
    });

    var edges = g.edges().map(function(e) {
      var edge = g.edge(e);
      return React.cloneElement(edge.label, {
        points: edge.points
      });
    });

    return (
      <g {...this.props}>
        {nodes}
        {edges}
      </g>
    );
  }
}

export class Vertex extends React.Component {
  render() {
    return (
      <g transform={"translate("+
        (this.props.x-(this.props.width/2))+","+
        (this.props.y-(this.props.height/2))+")"}
        {...this.props}>

        {this.props.children}
      </g>
    );
  }
}

export class Edge extends React.Component {
  render() {
    var points = this.props.points;

    var path = "M" + points[0].x + " " + points[0].y + " ";
    for (var i = 1; i < points.length; i++) {
      path += "L" + points[i].x + " " + points[i].y + " ";
    }

    return <path {...this.props} d={path} />;
  }
}
