import React from "react";
import { View, Text, StyleSheet, } from "react-native";
import { theme, global, chartTheme } from "../theme";
import { VictoryChart, VictoryBar, VictoryAxis } from "victory-native";

type BarChartProps = {
  abvData: { x: string, y: number}[],
}

export const BarChart:React.FC<BarChartProps> = ({ abvData }) => {

  return (
    <View style={{ marginTop: 40 }}>
      <Text style={[global.bold, global.titleH2, { marginBottom: 0 }]}>
        Statistic ABV
      </Text>
      <VictoryChart
        theme={chartTheme}
        domainPadding={{ x: 5 }}
        padding={40}
        width={370}
        height={400}>
        <VictoryAxis style={{ grid: { stroke: "none" } }} />
        <VictoryAxis dependentAxis />
        <VictoryBar
          horizontal
          data={abvData}
          barWidth={10}
          style={{
            data: {
              fill: theme.buttonColor,
              stroke: "black",
              strokeWidth: 1.2,
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