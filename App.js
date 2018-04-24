import React, { Component } from 'react';
import Svg, {G, Text as SVGText} from 'react-native-svg';
import {
    Animated,
    StyleSheet,
    View,
    Easing,
    Button
} from 'react-native';
import Shape from "./Shape";

const AnimatedShape = Animated.createAnimatedComponent(Shape);

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
            animPie: new Animated.Value(0.1),
            animText: new Animated.Value(0),
        };

    }

    resetPie = ()=>{
        this.state.animPie.setValue(0.1);
    };

    animate = ()=>{

        Animated.timing(
            this.state.animPie,
            {
                toValue: 2,
                duration: 500,
                easing: Easing.inOut(Easing.quad)
            }
        ).start(()=>{
            setTimeout(this.resetPie, 2000);
        });
    };

    animateText = ()=>{

        Animated.timing(
            this.state.animPie,
            {
                toValue: 2,
                duration: 500,
                easing: Easing.inOut(Easing.quad)
            }
        ).start(()=>{
            setTimeout(this.resetPie, 2000);
        });
    };

    componentDidUpdate(){}

    render() {
        let endAngle = Animated.multiply(this.state.animPie, Math.PI);
        return (
            <View style={styles.container}>
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
                                        <AnimatedShape
                                            index={index}
                                            endAngle={endAngle}
                                            color={item.color}
                                            data={demoData}
                                            key={'pie_shape_' + index}
                                        />
                                    )
                                })
                            }
                        </G>
                    </Svg>
                    <View style={styles.button}>
                        <Button onPress={this.animate} title={'Animate'}/>
                    </View>
                </View>
                <View style={styles.container}>
                    <Svg
                        height="70"
                        width="400"
                    >
                        <SVGText
                            fill="none"
                            stroke="#de1e2a"
                            fontSize="40"
                            fontWeight="bold"
                            x="200"
                            y="50"
                            textAnchor="middle"
                        >Chain React 2018</SVGText>
                    </Svg>
                    <View style={styles.button}>
                        <Button onPress={this.animateText} title={'Animate'}/>
                    </View>
                </View>


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
    button: {
        marginTop: 20
    }
});
