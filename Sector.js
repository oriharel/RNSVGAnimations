import React, {Component} from 'react';
import {ART, TouchableWithoutFeedback} from 'react-native';
import {Path} from 'react-native-svg';
import * as shape from 'd3-shape';
const d3 = {shape};

const {
    Shape
} = ART;


export default class Sector extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.arcGenerator = d3.shape.arc()
            .outerRadius(100)
            .padAngle(0)
            .innerRadius(0);
    }

    createPieArc = (index, endAngle, data) => {

        const arcs = d3.shape.pie()
            .value((item)=>item.number)
            .startAngle(0)
            .endAngle(endAngle)
            (data);

        let arcData = arcs[index];

        return this.arcGenerator(arcData);
    };


    render() {

        const {
            endAngle,
            color,
            index,
            data
        } = this.props;

        return (
            <TouchableWithoutFeedback onPress={()=>{alert('hey')}}>
                <Shape
                    d={this.createPieArc(index, endAngle, data)}
                    fill={color}
                />
            </TouchableWithoutFeedback>
        )

    }
}