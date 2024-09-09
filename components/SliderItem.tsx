import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";

type Props = {
  slideItem: NewsDataType;
  index: number;
};

const { width } = Dimensions.get("screen");

export default function SliderItem({ slideItem, index }: Props) {
  return (
    <View style={styles.itemWrapper}>
      <Image source={{ uri: slideItem.image_url }} style={styles.image} />
      <Text>{slideItem.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: width,
  },
  image: {
    width: width,
    height: 150,
    borderRadius: 20,
  },
});
