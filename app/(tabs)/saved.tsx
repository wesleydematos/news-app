import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Link, Stack } from "expo-router";
import Loading from "@/components/Loading";
import { NewsItem } from "@/components/NewsList";
import { useIsFocused } from "@react-navigation/native";
import { NewsDataType } from "@/types";

type Props = {};

const Page = (props: Props) => {
  const [bookmarkNews, setBookmarkNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchBookmark();
  }, [isFocused]);

  const fetchBookmark = async () => {
    await AsyncStorage.getItem("bookmark").then(async (token) => {
      const res = token === null ? null : JSON.parse(token);
      setIsLoading(true);

      if (res) {
        let queryString = res.join(",");
        try {
          const response = await axios.get(
            `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${queryString}`
          );

          setBookmarkNews(response.data.results);
          setIsLoading(false);
        } catch (error) {
          setBookmarkNews([]);
          setIsLoading(false);
        }
      } else {
        setBookmarkNews([]);
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
        }}
      />
      <View style={styles.container}>
        {isLoading ? (
          <Loading size="large" />
        ) : bookmarkNews.length === 0 ? (
          <Text style={styles.noneNotice}>No news saved!</Text>
        ) : (
          <FlatList
            data={bookmarkNews}
            keyExtractor={(_, index) => `list_item${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ index, item }) => {
              return (
                <Link key={index} href={`/news/${item.article_id}`} asChild>
                  <TouchableOpacity>
                    <NewsItem item={item} />
                  </TouchableOpacity>
                </Link>
              );
            }}
          />
        )}
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  noneNotice: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    margin: "auto",
  },
});
