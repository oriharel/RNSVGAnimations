import React, {Component} from 'react';
import {Path} from 'react-native-svg';
import * as shape from 'd3-shape';
import {TouchableWithoutFeedback} from 'react-native';
const d3 = {shape};

export default class Shape extends Component {
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
        let val = data[index].number;

        return (
            <TouchableWithoutFeedback onPress={()=>alert('value is: '+val)}>
                <Path
                    d={this.createPieArc(index, endAngle, data)}
                    fill={color}
                />
            </TouchableWithoutFeedback>

        )

    }
}