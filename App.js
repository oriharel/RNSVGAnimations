import React, { Component } from 'react';
import Svg, {G} from 'react-native-svg';
import {
    Animated,
    StyleSheet,
    View,
    Easing,
    Button,
    ART
} from 'react-native';
import Sector from "./Sector";
const {
    Group,
    Surface
} = ART;

const AnimatedSector = Animated.createAnimatedComponent(Sector);

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
                duration: 2000,
                easing: Easing.inOut(Easing.quad),
                // useNativeDriver: true,
            }
        ).start(()=>{
            setTimeout(this.resetPie, 2000);
        });
    };

    render() {
        let endAngle = Animated.multiply(this.state.animValue, Math.PI);
        return (
            <View style={styles.container}>
                <Surface
                    width={200}
                    style={styles.pieSVG}
                    height={200}
                    // viewBox={`-100 -100 200 200`}
                >
                    <Group x={100} y={100}>
                        {
                            demoData.map( (item, index) =>{
                                return (
                                    <AnimatedSector
                                        index={index}
                                        endAngle={endAngle}
                                        color={item.color}
                                        data={demoData}
                                        key={'pie_shape_' + index}
                                    />
                                )
                            })
                        }
                    </Group>
                </Surface>
                <Button onPress={this.animate} title={'Animate'}/>
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
