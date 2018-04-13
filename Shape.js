import React, {Component} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {Path} from 'react-native-svg';
import * as shape from 'd3-shape';
const d3 = {shape};

const demoData = [
    {
        number: 60,
        color: '#0d2f51'
    },
    {
        number: 20,
        color: '#28BD8B'
    },
    {
        number: 20,
        color: '#F66A6A'
    }
];

export default class Shape extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.arcGenerator = d3.shape.arc()
            .outerRadius(100)
            .padAngle(0)
            .innerRadius(0);
    }

    createPieArc = (index, endAngle) => {

        const arcs = d3.shape.pie()
            .value((item)=>item.number)
            .startAngle(0)
            .endAngle(endAngle)
            (demoData);

        let arcData = arcs[index];

        return this.arcGenerator(arcData);
    };


    render() {

        const {
            endAngle
        } = this.props;

        console.log(`[Shape] type of endAngle: ${typeof endAngle}`);

        return (
            <Path
                d={this.createPieArc(this.props.index, this.props.endAngle)}
                fill={this.props.color}
            />
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
