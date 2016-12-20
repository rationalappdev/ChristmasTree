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
    flakesCount: 50,  // total number of flakes on the screen
  }

  componentWillMount() {
    this.initState();
  }

  componentDidMount() {
    // Update flake coordinates every 10 milliseconds
    setInterval(this.animate, 10);
  }

  /**
   * Initialize state with flake particles
   */
  initState = () => {
    const { flakesCount } = this.props;
    let particles = [];
    for (let i = 0; i < flakesCount; i++)
    {
      // Generate random coordinates, radius and density
      particles.push({
        x: Math.random() * width,       // x-coordinate
        y: Math.random() * height,      // y-coordinate
        r: Math.random() * 4 + 1,       // radius
        d: Math.random() * flakesCount  // density
      });
    }
    this.setState({
      angle: 0,   // angle of falling
      particles   // flake particles
    });
  }

  /**
   * Animate flake falling
   */
  animate = () => {
    const { angle, particles } = this.state,
      // Increment angle
      newAngle = angle + 0.01;

    // Go throug existing particles and update coordinates
    const newParticles = particles.map((particle, index) => {

      // Apply Sin and Cos functions to create vertical and horizontal movements of the flakes
      let x = particle.x + Math.sin(angle) * 2;
      let y = particle.y + Math.cos(angle + particle.d) + 1 + particle.r / 2;

      // Send flakes back from the top
      if (particle.x > width + 5 || particle.x < -5 || particle.y > height)
      {
        if (index % 3 > 0) // 66.67% of the flakes
        {
          x = Math.random() * width;
          y = -10;
        }
        else
        {
          // If the flake is exitting from the right
          if (Math.sin(angle) > 0)
          {
            // Enter from the left
            x = -5;
            y = Math.random() * height;
          }
          else
          {
            // Enter from the right
            x = width + 5;
            y = Math.random() * height;
          }
        }
      }

      // Update x and y coordinates and keep other values
      return {
        ...particle,
        x: x,
        y: y,
      };

    });

    this.setState({
      angle: newAngle,
      particles: newParticles
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
          {/* Loop throug particles and render each using Flake component */}
          {this.state.particles.map((particle, index) => <Flake
            radius={particle.r}
            x={particle.x}
            y={particle.y}
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
