import React, { Component } from 'react';
import Svg, {Path} from 'react-native-svg';
import {
    Animated,
    StyleSheet,
    View,
    Easing,
    Button
} from 'react-native';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);


const batman1 = "M 256,213 C 245,181 206,187 234,262 147,181 169,71.2 233,18   220,56   235,81   283,88   285,78.7 286,69.3 288,60   289,61.3 290,62.7 291,64   291,64   297,63   300,63   303,63   309,64   309,64   310,62.7 311,61.3 312,60   314,69.3 315,78.7 317,88   365,82   380,56   367,18   431,71   453,181 366,262 394,187 356,181 344,213 328,185 309,184 300,284 291,184 272,185 256,213 Z";
const batman2 = "M 212,220 C 197,171 156,153 123,221 109,157 120,109  159,63.6 190,114  234,115  254,89.8 260,82.3 268,69.6 270,60.3 273,66.5 275,71.6 280,75.6 286,79.5 294,79.8 300,79.8 306,79.8 314,79.5 320,75.6 325,71.6 327,66.5 330,60.3 332,69.6 340,82.3 346,89.8 366,115  410,114  441,63.6 480,109  491,157 477,221 444,153 403,171 388,220 366,188 316,200 300,248 284,200 234,188 212,220 Z";
const batman3 = "M 213,222 C 219,150 165,139 130,183 125,123 171,73.8 247,51.6 205,78   236,108  280,102  281,90.3 282,79   286,68.2 287,72   288,75.8 289,79.7 293,79.7 296,79.7 300,79.7 304,79.7 307,79.7 311,79.7 312,75.8 313,72   314,68.2 318,79   319,90.3 320,102  364,108  395,78   353,51.6 429,73.8 475,123 470,183 435,139 381,150 387,222 364,176 315,172 300,248 285,172 236,176 213,222 Z";
type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props);
        this.animValue = new Animated.Value(0);
    }

    componentDidMount() {
        Animated.timing(this.animValue, {
            toValue: 1,
            duration: 1000,
            // useNativeDriver: true,
        }).start();
    }


    render() {

      const interpolatedPath = this.animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [batman1, batman2],
        // outputRange: ['M20,20L20,80L80,80L80,20Z', 'M40,40L33,60L60,60L65,40Z'],
      });

        return (
            <View style={styles.container}>
                <Svg
                    width={380}
                    style={[styles.pieSVG]}
                    height={400}
                    viewBox={`110 -50 380 400`}
                    // viewBox={`0 0 380 400`}
                >
                    <AnimatedPath
                        d={interpolatedPath}
                        stroke={"blue"}
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
      // backgroundColor: "red"
    },
});
