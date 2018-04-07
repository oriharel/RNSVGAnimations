import React, { Component } from 'react';
import Svg, {G} from 'react-native-svg';
import AnimArc from './js/AnimArc';
import * as shape from 'd3-shape';
const d3 = {shape};
import {
    Button,
    StyleSheet,
    View
} from 'react-native';

// const AnimatedPath = Animated.createAnimatedComponent(Path);


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
    },
    // {
    //     number: 0,
    //     color: 'transparent'
    // }
];

type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            // animValue: new Animated.Value(0),
            pieMultiplier: 0.1
        };
        this.value = (item)=>{
            return item.number;
        };
        this.color = (item)=>{
            return item.color;
        };

        this.arcGenerator = d3.shape.arc()
            .outerRadius(100)
            .padAngle(0)
            .innerRadius(0);

        setTimeout(()=>this.setState({pieMultiplier: 2}), 1000);

    }

    componentDidMount(){
        // requestAnimationFrame(()=>{
        //     if (this.state.pieMultiplier < 2) {
        //         this.setState({pieMultiplier: this.state.pieMultiplier+=0.1});
        //     }
        // })
        // this.setState({pieMultiplier: 2});
    }

    componentDidUpdate(){
        // requestAnimationFrame(()=>{
        //     if (this.state.pieMultiplier < 2) {
        //         this.setState({pieMultiplier: this.state.pieMultiplier+=0.1});
        //     }
        // })
    }

    _createPieChart = (index) => {

        // let multiplier = this.state.animValue.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [0.1, 2]
        // });

        const arcs = d3.shape.pie()
            .value(this.value)
            .startAngle(0)
            .endAngle(this.state.pieMultiplier*Math.PI)
            (demoData);

        let arcData = arcs[index];
        let path = this.arcGenerator(arcData);

        return {
            path,
            color: this.color(demoData[index]),
        };
    };

    render() {
    return (
      <View style={styles.container}>
          <Svg
              width={200}
              style={styles.pieSVG}
              height={200}
              viewBox={`-100 -100 200 200`}
          >
              <G>
                  {
                      demoData.map( (item, index) =>{
                          return (
                              <AnimArc
                                  d={ () => this._createPieChart(index)}
                                  color={item.color}
                                  key={'pie_shape_' + index}
                              />
                          )
                      })
                  }
              </G>
          </Svg>
          <Button
              onPress={()=>this.setState({pieMultiplier: 2})}
              title="Press Me"
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
    pieSVG: {
        shadowColor: "rgba(59, 74, 116, 0.35)",
        shadowOffset: {
            width: 0,
            height: 32
        },
        elevation: 12,
        shadowRadius: 12.5,
        shadowOpacity: 1,
    },
});
