// Created by Anna McColl 17-05-23

import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { styles } from "../styles/style";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import PostCard from "../forum/PostCard";
import MultiSelect from "react-native-multiple-select";
import PlusIcon from "../icons/PlusIcon";
import { useIsFocused } from "@react-navigation/native";

export default function ViewAllForumPosts({ route }) {
  // Gets access to the navigation and route.
  const navigation = useNavigation();

  // Gets the user object that was passed through the route.
  const currentUser = route.params.user;

  // The array of all post object returned from the API call.
  const [allPosts, setAllPosts] = useState([]);

  // The array of all posts objects to be displayed after any filters have been applied.
  const [postsToView, setPostsToView] = useState([]);

  // The array of all filters that are available for use based on those returned in allPosts.
  const [currentFilterCategories, setCurrentFilterCategories] = useState([]);

  // The filters that have been chosen to filter posts on.
  const [chosenFilters, setChosenFilters] = useState([]);

  // This is used to reload the screen once navigation.goBack is run.
  const isFocused = useIsFocused();

  // Upon loading, gets all the posts from the api.
  useEffect(() => {
    async function fetchPosts() {
      try {
        // Gets the posts from the api
        const posts = await getAllPosts(currentUser.token);

        // Used to store the the postContentCategories that will be used for filtering posts.
        let allCategories = [];

        // Gets the postContentCategory objects from each post object and stores them in an array.
        posts.forEach((post) => {
          post.postContentCategory.forEach((category) => {
            allCategories.push(category);
          });
        });

        // Removes the duplicate postContentCategories and stores them in a new array.
        const uniqueCategories = removeDuplicates(allCategories);

        // Sets the currentFilterCategory useState.
        setCurrentFilterCategories(uniqueCategories);

        // Sorts the posts by date (newest first).
        const sortedPosts = sortByCreatedOn(posts);

        // Sets the posts in the allPosts useState.
        setAllPosts(sortedPosts);

        // Sets the posts in the postsToView, as initially no filters have been applied.
        setPostsToView(posts);
      } catch {
        console.error(error);
      }
    }
    fetchPosts();
  }, [isFocused]);

  // When the chosenFilters useState changes, the posts are refiltered to adjust to the new filters selected.
  useEffect(() => {
    if (chosenFilters.length != 0) {
      let filteredPosts = filterPosts(chosenFilters, allPosts);
      setPostsToView(filteredPosts);
    }
  }, [chosenFilters]);

  // Event handler to set the chosenFilters useState.
  function onChosenFiltersHandler(selectedItems) {
    setChosenFilters(selectedItems);
  }

  // Takes the user to the CreateForumPost screen, passing user details through the route.
  function onAddHandler() {
    navigation.navigate("CreateForumPost", { user: currentUser });
  }

  // Sends the data for each post through to the PostCard.
  function renderPost({ item }) {
    const postProps = {
      id: item.id,
      title: item.title,
      authorID: item.authorID,
      postType: item.postType,
      postContentCategory: item.postContentCategory,
      postContent: item.postContent,
      createdOn: item.createdOn,
      eventDateTime: item.eventDateTime,
      authorUser: item.authorUser,
      currentUser: currentUser,
    };
    return <PostCard {...postProps} />;
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "85%" }}>
          <MultiSelect
            style={styles.input}
            items={currentFilterCategories}
            uniqueKey="id"
            onSelectedItemsChange={onChosenFiltersHandler}
            selectedItems={chosenFilters}
            selectText="Search by content categories"
            searchInputPlaceholderText="Search by content categories"
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: "#CCC" }}
            submitButtonColor="#55D6C2"
            submitButtonText="Confirm"
            hideTags="true"
          />
        </View>
        <Pressable onPress={onAddHandler}>
          <PlusIcon />
        </Pressable>
      </View>
      <FlatList
        data={postsToView}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPost}
      />
    </View>
  );
}

const internalStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    //   alignItems: "center",
    //   justifyContent: "center",
    backgroundColor: "#fff",
  },
  titleContainer: {
    // flex: 1,
    backgroundColor: "#EFE789",
    width: "100%",
    // justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  checkboxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

// Function gets all posts from the api.
export function getAllPosts(token) {
  return new Promise((resolve, reject) => {
    axios
      .get("http://mindmagic.pythonanywhere.com/api/forumpost/list/", {
        headers: {
          Authorization: `Token ` + token,
        },
      })
      .then(function (response) {
        const posts = response.data.map((post) => ({
          id: post.id,
          title: post.title,
          postType: post.postType,
          postContent: post.postContent,
          createdOn: post.createdOn,
          eventDateTime: post.eventDateTime,
          authorID: post.authorID,
          postContentCategory: post.postContentCategory,
          authorUser: post.user,
        }));
        resolve(posts);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

// This functions removes duplicates from an array of objects with an id property.
export function removeDuplicates(objectsArray) {
  if (Array.isArray(objectsArray)) {
    objectsArray.sort((a, b) => {
      if (a.id) {
        return a.id - b.id;
      } else {
        throw new Error("Object has no id field");
      }
    });
  } else {
    throw new Error("Object is not an array");
  }

  let uniqueArray = [];
  for (let i = 0; i < objectsArray.length; i++) {
    if (
      i === objectsArray.length - 1 ||
      objectsArray[i].id !== objectsArray[i + 1].id
    ) {
      uniqueArray.push(objectsArray[i]);
    }
  }
  return uniqueArray;
}

// Retrieves the posts that have postContentCategories in the array in the chosenFilters useState.
export function filterPosts(chosenFilters, allPosts) {
  let filteredPosts = [];
  chosenFilters.forEach((filterCategory) => {
    allPosts.forEach((post) => {
      post.postContentCategory.forEach((postCategory) => {
        if (postCategory.id === filterCategory) {
          filteredPosts.push(post);
          return;
        }
      });
    });
  });
  return sortByCreatedOn(filteredPosts);
}

// Sorts posts by the date they were created on within an object array.
export function sortByCreatedOn(objArray) {
  objArray.sort((a, b) => {
    let date_a = new Date(a.createdOn),
      date_b = new Date(b.createdOn);
    return date_b - date_a;
  });
  return objArray;
}
