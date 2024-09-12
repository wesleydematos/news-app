import { Colors } from "@/constants/Colors";
import { NewsDataType } from "@/types";
import { View, Text, StyleSheet } from "react-native";
import Animated, { SharedValue } from "react-native-reanimated";

type Props = {
  items: NewsDataType[];
  paginationIndex: number;
};

export default function Pagination({ items, paginationIndex }: Props) {
  return (
    <View style={styles.container}>
      {items.map((_, index) => {
        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  paginationIndex === index ? Colors.tint : Colors.darkGrey,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  dot: {
    backgroundColor: "#333",
    height: 8,
    width: 8,
    marginHorizontal: 2,
    borderRadius: 8,
  },
});
