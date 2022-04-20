import React from "react";
import { Text } from "react-native";
import { Beer } from '../types'

type BeerProps = {
  navigateToBeer: (beer: Beer) => void
}

export const BeerDetail:React.FC = ({route}: any) => {
  const beer = route.params;
  return (
    <Text>Beer</Text>
  );
}