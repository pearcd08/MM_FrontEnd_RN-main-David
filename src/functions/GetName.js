import React, { useState, useEffect } from "react";
import { Text } from "react-native";

const GetName = ({ id }) => {
  const [name, setName] = useState("");
  console.log("GET NAME");

  useEffect(() => {
    axios
      .get(`https://mindmagic.pythonanywhere.com/api/genders/${id}`)
      .then((response) => {
        setName(response.data.name);
        console.log(response.data.name);
      })
      .catch((error) => {
        console.log("get name error:" + error);
      });
  }, []);

  return <Text>Name={name}</Text>;
};
export default GetName;
