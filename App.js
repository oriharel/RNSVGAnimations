import React, { Component } from 'react';
import Svg, {G, Rect, Defs, Path, TextPath, TSpan, Text} from 'react-native-svg';
import {
    Animated,
    StyleSheet,
    View,
    // Text,
    Easing,
    Button
} from 'react-native';
import Slice from "./Slice";

const AnimatedSlice = Animated.createAnimatedComponent(Slice);
const AnimatedRect = Animated.createAnimatedComponent(Rect);
const path = `M 10 20
              C 40 10 60 0 80 10
              C 100 20 120 30 140 20
              C 160 10 180 10 180 10`;

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

type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            animValue: new Animated.Value(0),
            interpolatedDashArray: new Animated.ValueXY({x: 140, y: 540})
        };

    }

    componentDidMount() {

        this.state.interpolatedDashArray.addListener( (interpolatedDashArray) => {
            this.element.setNativeProps(
                {
                    strokeDasharray: [
                        interpolatedDashArray["x"].toString(),
                        interpolatedDashArray["y"].toString()
                    ]
                });
        });
    }

    resetPie = ()=>{
        this.state.animValue.setValue(0);
        this.state.interpolatedDashArray.setValue({x: 140, y: 540});
    };

    animate = ()=>{

        Animated.parallel([
            Animated.timing(
                this.state.animValue,
                {
                    toValue: 1,
                    duration: 500,
                    easing: Easing.inOut(Easing.quad),
                    // useNativeDriver: true
                }
            ),
            Animated.timing(
                this.state.interpolatedDashArray,
                {
                    toValue: {x: 760, y: 0},
                    duration: 500,
                    easing: Easing.inOut(Easing.quad),
                    // useNativeDriver: true
                }
            )

        ]).start(()=>{
            setTimeout(this.resetPie, 2000);
        });

    };

    render() {

        // let interpolatedDashArrayXY = this.state.animValue.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [['140', '540'], ['760', '0']]
        // });

        let interpolatedDashOffset = this.state.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-474, 0]
        });
        let interpolatedWidth = this.state.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['8', '2']
        });
        return (
            <View style={styles.container}>
                <Svg
                    height="200"
                    width="700"
                    viewBox={'16 -13 50 50'}
                >
                    <Defs>
                        <Path
                            id="path"
                            d={path}
                        />
                    </Defs>
                    <Text fill="blue">
                        <TextPath href="#path" >
                            Chain React,
                            <TSpan fill="red" > Portland 2018</TSpan>
                        </TextPath>
                    </Text>
                </Svg>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#333',
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
    hover: {
        color: '#fff',
        letterSpacing: 8,
        fontSize: 22,
        lineHeight: 32,
        position: "relative",
        top: -45
    }
});
