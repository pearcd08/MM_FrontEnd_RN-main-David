// Created by Anna McColl 23/05/23

import { useNavigation } from "@react-navigation/core";
import ForumPostForm from "../forum/ForumPostForm";
import axios from "axios";

function EditForumPost({ route }) {
  
  // Get the navigation and the parameters passed through the route.
  const navigation = useNavigation();
  const oldData = route.params.postData;
  console.log(oldData);

  // If cancel is pressed the user is taken back to the previous screen.
  function onCancelHandler() {
    navigation.goBack();
  }

  // If post is pressed in the form, the onPostHandler will access this function to 
  // update the post in the database and return the user to the previous screen.
  function onUpdateHandler(newData) {
    let config = {
      method: "put",
      url:
        "https://mindmagic.pythonanywhere.com/api/forumpost/" +
        oldData.id +
        "/update/",
      headers: {
        Authorization: "Token " + oldData.currentUser.token,
        "Content-Type": "application/json",
      },
      data: newData,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    navigation.goBack();
  }

  return (
    <ForumPostForm
      isForumPostUpdate={true}
      oldData={oldData}
      onCancel={onCancelHandler}
      onSave={onUpdateHandler}
    />
  );
}
export default EditForumPost;
