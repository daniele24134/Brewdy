import React from "react";
import { View, Text } from "react-native";
import { Pub } from "../types";

type PubsListProps = {
  pubs: Pub[]
}

export const PubsList: React.FC<PubsListProps> = ({pubs}) => {

  return (
    <View>
      {pubs.map(pub => (
        <Text key={pub.id}>{pub.name}</Text>
      ))}
    </View>
  );
}