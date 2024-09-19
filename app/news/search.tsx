import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { NewsDataType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import Loading from "@/components/Loading";
import { NewsItem } from "@/components/NewsList";

type Props = {};

const search = (props: Props) => {
  const { category, country, query } = useLocalSearchParams<{
    query: string;
    category: string;
    country: string;
  }>();
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    try {
      let categoryString = "";
      if (category) {
        categoryString = `&category=${category}`;
      }

      let countryString = "";
      if (country) {
        countryString = `&country=${country}`;
      }

      let queryString = "";
      if (query) {
        queryString = `&q=${query}`;
      }

      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=10${categoryString}${countryString}${queryString}`;

      const response = await axios.get(URL);

      if (response && response.data) {
        setNews(response.data.results);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log("Error message:", error.messsage);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} />
            </TouchableOpacity>
          ),
          title: "Search",
        }}
      />
      <View style={styles.container}>
        {isLoading ? (
          <Loading size="large" />
        ) : (
          <FlatList
            data={news}
            keyExtractor={(_, index) => `list_item${index}
        `}
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

export default search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});
