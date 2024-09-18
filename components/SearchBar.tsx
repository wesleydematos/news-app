import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, TextInput } from "react-native";

type Props = {
  withHorizontalPadding: boolean;
};

export default function SearchBar({ withHorizontalPadding }: Props) {
  return (
    <View
      style={[
        styles.container,
        withHorizontalPadding && { marginHorizontal: 20 },
      ]}
    >
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={24} color={Colors.lightGrey} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={Colors.lightGrey}
          style={styles.searchTxt}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 10,
  },
  searchTxt: {
    flex: 1,
    fontSize: 14,
    color: Colors.darkGrey,
  },
});
