import React from "react";
import { View, Text } from "react-native";
import { VictoryPie } from "victory-native";
import { global, theme } from "../theme";
import { useThemeContext } from "../Theme.provider";


type colorChartProps = {
  data: {x: number, y: number}[]
}

export const ColorChart: React.FC<colorChartProps> = ({data}) => {

  const { themeStyle } = useThemeContext();

  return (
    <View style={{ marginTop: 15, alignItems: 'center' }}>
      <Text style={[global.bold, global.titleH2, { marginBottom: 0, color: themeStyle.text }]}>Colors</Text>
      <VictoryPie
        labelRadius={80}
        radius={150}
        colorScale={[
          theme.yellow,
          theme.orange,
          theme.brown,
          theme.black,
        ]}
        style={{
          labels: {
            fontSize: 30,
            fill: theme.bgLight,
            display: 'none'
          }
        }}
        data={data}
        />
    </View>
  );
}