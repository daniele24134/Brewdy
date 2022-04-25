import React from "react";
import {View, Text, StyleSheet,  } from 'react-native';
import { VictoryPie } from "victory-native";
import { theme } from "../theme";
import { useThemeContext } from "../Theme.provider";


type PieChartProps = {
  percent: number,
  data: { x: number, y: number }[],
}

export const PieChart:React.FC<PieChartProps> = ( { percent, data } ) => {

  const { themeStyle } = useThemeContext();

  return (
    <View style={styles.pieContainer}>
      <Text style={styles.percentage}>{Math.round(percent)}%</Text>
      <VictoryPie
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
        radius={100}
        width={300}
        height={300}
        data={data}
        innerRadius={120}
        cornerRadius={0}
        labels={() => ""}
        style={{ labels: { fill: "white", fontSize: 30 } }}
        colorScale={[themeStyle.blue, themeStyle.headerbg]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pieContainer: {
    alignItems: "center",
    width: 300,
    height: 300,
    alignSelf: "center",
    position: "relative",
  }, 
  percentage: {
    position: "absolute",
    fontSize: 50,
    color: theme.buttonColor,
    top: 120,
  },
});