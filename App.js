import React, { Component } from 'react';
import Svg, {G, Rect} from 'react-native-svg';
import {
    Animated,
    StyleSheet,
    View,
    Text,
    Easing,
    Button
} from 'react-native';
import Slice from "./Slice";

const AnimatedRect = Animated.createAnimatedComponent(Rect);


type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            animValue: new Animated.Value(0),
        };
        this.animMirror = 0;

    }

    componentDidMount() {
        this.animate();
    }

    animate = ()=>{
        Animated.timing(
            this.state.animValue,
            {
                toValue: 1-this.animMirror,
                duration: 2000,
                easing: Easing.inOut(Easing.quad),
            }
        ).start(()=>{
            this.animMirror = 1 - this.animMirror;
            this.animate();
        });
    };

    render() {

        let translateRectX = this.state.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['5', '220'],
        });
        return (
            <View style={styles.container}>
                <Svg
                    height="60"
                    width="320"

                >
                    <AnimatedRect
                        y="10"
                        x={translateRectX}
                        width="90"
                        height="90"
                        fill="rgb(0,0,255)"
                        strokeWidth="1"
                        stroke="rgb(0,0,0)"
                    />
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
