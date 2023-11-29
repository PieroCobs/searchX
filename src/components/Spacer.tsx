import {View} from 'react-native';
import React from 'react';

type Props = {
  height?: number;
  width?: number;
};

const Spacer = ({height, width}: Props) => {
  return <View style={{height: height, width: width}} />;
};

export default Spacer;
