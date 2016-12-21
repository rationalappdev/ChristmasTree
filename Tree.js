import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  View
} from 'react-native';
import Flake from './Flake';

// Detect screen size
const { width, height } = Dimensions.get('window');

export default class Tree extends Component {

  static defaultProps = {
    flakesCount: 50, // total number of flakes on the screen
  }

  /**
   * Initialize state with flakes
   */
  componentWillMount() {
    const { flakesCount } = this.props;
    let flakes = [];
    for (let i = 0; i < flakesCount; i++)
    {
      // Generate random coordinates, radius and density
      flakes.push({
        x: Math.random() * width,       // x-coordinate
        y: Math.random() * height,      // y-coordinate
        r: Math.random() * 4 + 1,       // radius
        d: Math.random() * flakesCount  // density
      });
    }
    this.setState({
      flakes
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Christmas Tree background image */}
        <Image
          style={styles.image}
          source={require('./assets/tree.jpg')}
        >
          {/* Loop through flakes and render each using Flake component */}
          {this.state.flakes.map((flake, index) => <Flake
            x={flake.x}
            y={flake.y}
            radius={flake.r}
            density={flake.d}
            key={index}
          />)}
        </Image>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: width,
    position: 'relative',
  },
});
