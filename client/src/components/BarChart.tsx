import React from "react";
import { View, Text, StyleSheet, } from "react-native";
import { theme, global } from "../theme";
import { VictoryChart, VictoryBar, VictoryAxis } from "victory-native";
import { useThemeContext } from "../Theme.provider";

type BarChartProps = {
  abvData: { x: string, y: number}[],
}

export const BarChart:React.FC<BarChartProps> = ({ abvData }) => {

  const { themeStyle }= useThemeContext();

  const chartTheme = {
    grid: {
      fill: "none",
      stroke: "none",
      pointerEvents: "painted",
    },
    axis: {
      fill: "transparent",
      style: {
        tickLabels: {
          fill: themeStyle.text,
          
        },
      },
    },
  };

  return (
    <View style={{ marginTop: 40 , alignItems: 'center'}}>
      <Text style={[global.bold, global.titleH2, { marginBottom: 0, color: themeStyle.text }]}>
        Statistic ABV
      </Text>
      <VictoryChart
        theme={chartTheme}
        domainPadding={{ x: 5 }}
        padding={40}
        width={370}
        height={400}>
        <VictoryAxis style={{ grid: { stroke: "none" } }} />
        <VictoryAxis dependentAxis tickFormat={(y) => {
          if (Number.isInteger(y)) {
            return Math.round(y);
          } else {
            return '';
          }
        }}/>
        <VictoryBar
          horizontal
          data={abvData}
          barWidth={10}
          style={{
            data: {
              fill: theme.buttonColor,
              stroke: "black",
              strokeWidth: 1.3,
              
            },
          }}
          alignment="middle"
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
        />
      </VictoryChart>
    </View>
  );
}