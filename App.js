import React, { Component } from 'react';
import Svg, {G} from 'react-native-svg';
import {
    Animated,
    StyleSheet,
    View,
    Easing,
    Button
} from 'react-native';
import Slice from "./Slice";

const AnimatedSlice = Animated.createAnimatedComponent(Slice);

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
            animValue: new Animated.Value(0.1),
        };

    }

    resetPie = ()=>{
        this.state.animValue.setValue(0.1);
    };

    animate = ()=>{

        Animated.timing(
            this.state.animValue,
            {
                toValue: 2,
                duration: 500,
                easing: Easing.inOut(Easing.quad)
            }
        ).start(()=>{
            setTimeout(this.resetPie, 2000);
        });
    };

    render() {
        let endAngle = Animated.multiply(this.state.animValue, Math.PI);
        return (
            <View style={styles.container}>
                <Svg
                    width={200}
                    style={styles.pieSVG}
                    height={200}
                    viewBox={`-100 -100 200 200`}
                >
                    {
                        demoData.map( (item, index) =>
                            <AnimatedSlice
                                index={index}
                                endAngle={endAngle}
                                color={item.color}
                                data={demoData}
                                key={'pie_shape_' + index}
                            />
                        )
                    }
                </Svg>
                <View style={{marginTop: 20}}>
                    <Button onPress={this.animate} title={'Animate'}/>
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
});
