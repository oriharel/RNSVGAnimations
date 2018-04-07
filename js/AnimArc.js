import React from 'react';
import {Path} from 'react-native-svg';
import Morph from 'art/morph/path';

const AnimationDurationMs = 2000;

export default class AnimArc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: ''
        };

        this.value = (item)=>{
            return item.number;
        };
        this.color = (item)=>{
            return item.color;
        };

        // this.arcGenerator = d3.shape.arc()
        //     .outerRadius(100)
        //     .padAngle(0)
        //     .innerRadius(0);
    }

    componentWillMount() {
        this.computeNextState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.computeNextState(nextProps);
    }

    computeNextState(nextProps) {
        const {
            d,
        } = nextProps;

        const graph = this.props.d();

        this.setState({
            path: graph.path,
        });

        // The first time this function is hit we need to set the initial
        // this.previousGraph value.
        if (!this.previousGraph) {
            this.previousGraph = graph;
        }

        // Only animate if our properties change. Typically this is when our
        // yAccessor function changes.
        if (this.props !== nextProps) {
            const pathFrom = this.previousGraph.path;
            const pathTo = graph.path;

            cancelAnimationFrame(this.animating);
            this.animating = null;

            this.setState({
                // Create the ART Morph.Tween instance.
                path: Morph.Tween( // eslint-disable-line new-cap
                    pathFrom,
                    pathTo,
                ),
            }, () => {
                // Kick off our animations!
                this.animate();
            });

            this.previousGraph = graph;
        }
    }

    animate = (start) => {
        this.animating = requestAnimationFrame((timestamp) => {
            if (!start) {
                start = timestamp;
            }

            // Get the delta on how far long in our animation we are.
            const delta = (timestamp - start) / AnimationDurationMs;

            // If we're above 1 then our animation should be complete.
            if (delta > 1) {

                this.animating = null;
                // Just to be safe set our final value to the new graph path.
                this.setState({
                    path: this.previousGraph.path,
                });

                // Stop our animation loop.
                return;
            }

            // Tween the SVG path value according to what delta we're currently at.
            this.state.path.tween(delta);

            this.setState(this.state, () => {
                this.animate(start);
            });
        });
    };


    render() {
        const path = this.state.path;
        return(
            <Path
                d={path}
                fill={this.props.color}
            />
        )
    }
}