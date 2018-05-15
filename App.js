import React, { Component } from 'react';
import Svg, {Rect} from 'react-native-svg';
import {
    Animated,
    StyleSheet,
    View,
    Text,
    Easing,
} from 'react-native';

const AnimatedRect = Animated.createAnimatedComponent(Rect);


type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            animValue: new Animated.Value(0),
            dashArray: new Animated.ValueXY({x: 140, y: 540})
        };

    }

    componentDidMount() {

        this.state.dashArray.addListener( (dashArray) => {
            this.element.setNativeProps(
                {
                    strokeDasharray: [
                        dashArray["x"].toString(),
                        dashArray["y"].toString()
                    ]
                });
        });
    }

    resetPie = ()=>{
        this.state.animValue.setValue(0);
        this.state.dashArray.setValue({x: 140, y: 540});
    };

    animate = ()=>{

        Animated.parallel([
            Animated.timing(
                this.state.animValue,
                {
                    toValue: 1,
                    duration: 500,
                    easing: Easing.inOut(Easing.quad),
                }
            ),
            Animated.timing(
                this.state.dashArray,
                {
                    toValue: {x: 760, y: 0},
                    duration: 500,
                    easing: Easing.inOut(Easing.quad),
                }
            )

        ]).start(()=>{
            setTimeout(this.resetPie, 2000);
        });

    };

    render() {

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
                    height="60"
                    width="320"

                >
                    <AnimatedRect
                        height="60"
                        width="320"
                        strokeDasharray={[140, 540]}
                        strokeDashoffset={interpolatedDashOffset}
                        strokeWidth={interpolatedWidth}
                        stroke="#19f6e8"
                        ref={(ref)=>this.element = ref}
                        onPress={this.animate}
                    />
                </Svg>
                <Text style={styles.hover}>
                    TAP ME
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
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
