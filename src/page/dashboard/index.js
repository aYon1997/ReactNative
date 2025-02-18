import { View, Text, ScrollView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import City from "./city";

import { apiGet } from "../../apis/request";

const Dashboard = () => {
  const [list = [], setList] = useState();
  useEffect(() => {
    apiGet({ path: "city" }).then((res) => {
      setList(res.data);
    });
  }, []);
  return (
    <ScrollView>
      <City list={list} />
    </ScrollView>
  );
};

export default Dashboard;
