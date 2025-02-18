import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { apiGet } from "../../apis/request";
import { Card, WhiteSpace, WingBlank } from "@ant-design/react-native";

// feed 流

const DEFAULT_AVATAR =
  "https://img0.baidu.com/it/u=3483825080,1831784857&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500";
const DEFAULT_BRIEF = "这个人什么都没留下";
const List = ({ navigation }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    apiGet({ path: "list" }).then((res) => {
      const { data = [] } = res;
      const _list = data
        .filter(
          (item) =>
            item?.item_info?.article_info?.cover_image &&
            item?.item_info?.author_user_info
        )
        .map((item) => ({
          title: item?.item_info?.article_info?.title,
          cover_image: item?.item_info?.article_info?.cover_image,
          author: item?.item_info?.author_user_info?.user_name,
          avatar:
            item?.item_info?.author_user_info?.avatar_large || DEFAULT_AVATAR,
          brief_content:
            item?.item_info?.article_info?.brief_content || DEFAULT_BRIEF,
        }));
      setList(_list);
    });
  }, []);

  return (
    <ScrollView>
      {list.map((item, idx) => (
        <NewItem key={idx} item={item} navigation={navigation} />
      ))}
    </ScrollView>
  );
};

const NewItem = ({ item, navigation }) => {
  return (
    <TouchableWithoutFeedback
      onPress={(e) => {
        navigation.navigate({ name: "Search", params: item });
      }}
    >
      <View>
        <WingBlank size="md">
          <Card>
            <Card.Header title={item.title}></Card.Header>
            <Card.Body>
              <Image
                source={{ uri: DEFAULT_AVATAR }}
                style={styles.img}
                onError={(err) => {
                  console.log(11, err);
                }}
              />
            </Card.Body>
            <Card.Footer
              content={
                <Image source={{ uri: DEFAULT_AVATAR }} style={styles.avatar} />
              }
              extra={item.author}
            />
          </Card>
        </WingBlank>
        <WhiteSpace size="md" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  avatar: {
    width: 30,
    height: 30,
  },
});

export default List;
