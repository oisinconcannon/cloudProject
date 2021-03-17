import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

import React from 'react';
import { View, StyleSheet } from 'react-native';

// https://github.com/react-native-svg/react-native-svg

export const MyChart = (props) => {
    var height = 320;
    let width = 320;
    let padding = 25;
    let lineData = props.dataToChart;
    let axesPath = "";
    let svgPath = "";

    let maxY = -1000000;
    let minY = 1000000;
    for(var ii = 0; ii < lineData.data.length; ii++){
      if(lineData.data[ii] > maxY){maxY = lineData.data[ii]}
      if(lineData.data[ii] < minY){minY = lineData.data[ii]}
    }
    let deltaY = (height - padding - padding)/(maxY - minY);
    let deltaX = (width - padding - padding)/lineData.data.length;
    let zeroXpoint = padding;
    let zeroYpoint = height - padding - deltaY * (0 - minY);
    axesPath = "M" + padding + " " + zeroYpoint;
    axesPath += " L" +  (width - padding) + " " + zeroYpoint;
    axesPath += " M" + padding + " " + padding;
    axesPath += " L" +  (width - padding) + " " + padding;
    axesPath += " M" + padding + " " + (height - padding);
    axesPath += " L" +  (width - padding) + " " + (height - padding);
    svgPath += " M" + padding + " " + zeroYpoint;
    for(var ii = 0; ii < lineData.data.length; ii++){
      let loopX = zeroXpoint + ii * deltaX;
      let loopY = zeroYpoint - deltaY * lineData.data.[ii];
      svgPath += ' ' + lineData.interpolation + loopX + ' ' + loopY;
    }

    return (
      <Svg height={height} width={width}>
        <Path
          d={axesPath}
          fill="none"
          stroke="gray"
          strokeWidth="1"
        />
        <Path
          d={svgPath}
          fill="none"
          stroke="blue"
          strokeWidth="1"
        />
        <Text
          fill="black"
          stroke="black"
          fontSize="15"
          x={zeroXpoint - padding/2}
          y={padding}
          textAnchor="middle"
        >{maxY}</Text>
        <Text
          fill="black"
          stroke="black"
          fontSize="15"
          x={zeroXpoint - padding/2}
          y={zeroYpoint}
          textAnchor="middle"
        >0</Text>
        <Text
          fill="black"
          stroke="black"
          fontSize="15"
          x={zeroXpoint - padding/2}
          y={height - padding}
          textAnchor="middle"
        >{minY}</Text>
      </Svg>
    );
  }
