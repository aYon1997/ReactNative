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
    // TouchableWithoutFeedback 是一个用于处理触摸事件的组件,主要功能是为其子组件添加触摸交互能力
    // 常用属性及事件
    // 常用属性
    // accessible：一个布尔值，用于指定该组件是否可以被无障碍服务访问，默认为 true。
    // accessibilityLabel：为无障碍服务提供一个文本标签，用于描述该组件的用途。
    // 常用事件
    // onPress：当用户点击或触摸该组件时触发的事件处理函数。
    // onPressIn：当用户开始触摸该组件时触发的事件处理函数。
    // onPressOut：当用户结束触摸该组件时触发的事件处理函数。
    // onLongPress：当用户长按该组件时触发的事件处理函数。
    <TouchableWithoutFeedback
      onPress={(e) => {
        // 导航跳转到search页
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
