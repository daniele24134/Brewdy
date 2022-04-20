import React from "react";
import { ScrollView } from "react-native";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useState } from "react";

type SliderProp = {
  val: number,
  setVal: React.Dispatch<React.SetStateAction<number>>,
  min: number,
  max: number,
  step: number
}

export const Slider: React.FC<SliderProp> = (props) => {

  const [scroll, setScroll] = useState(true);


  const enableScroll = () => setScroll(true);
  const disableScroll = () => setScroll(false);

  return (<ScrollView style={{
    marginLeft: 3,
    paddingLeft:15,
  }} scrollEnabled={scroll}>
    <MultiSlider
      onValuesChange={(value) => props.setVal(value[0])}
      values={[props.val]}
      sliderLength={180}
      max={props.max}
      step={props.step}
      onValuesChangeStart={enableScroll}
      onValuesChangeFinish={disableScroll}
    />
  </ScrollView>);
}