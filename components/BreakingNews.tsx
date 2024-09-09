import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { NewsDataType } from "@/types";
import SliderItem from "./SliderItem";
import Animated, {
  useAnimatedRef,
  useSharedValue,
} from "react-native-reanimated";

type Props = {
  newsList: Array<NewsDataType>;
};

export default function BreakingNews({ newsList }: Props) {
  const [data, setData] = useState(newsList);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breaking News</Text>
      <View style={styles.slideWrapper}>
        <Animated.FlatList
          ref={ref}
          data={data}
          keyExtractor={(_, index) => `list_item${index}
        `}
          renderItem={({ item, index }) => (
            <SliderItem slideItem={item} index={index} />
          )}
          horizontal
          showsVerticalScrollIndicator={false}
          pagingEnabled
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
    marginLeft: 20,
  },
  slideWrapper: {
    justifyContent: "center",
  },
});
