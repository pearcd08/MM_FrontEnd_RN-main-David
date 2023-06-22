// Created by Anna McColl 31/05/23
import React from "react";

import { useEffect } from "react";
import axios from "axios";

import {
  removeDuplicates,
  sortByCreatedOn,
  getAllPosts,
} from "../src/screens/ViewAllForumPosts";

// may need to add file extension in import statements (ie .js) if not using a build tool like webpack or another transpiler.
// but I think I am, so I should be good.
jest.mock("axios");
describe("getAllPosts()", () => {
  test("Should return any available response data", async () => {
    const post = {
      authorID: 3,
      createdOn: "2023-06-28T08:45:39.391784Z",
      eventDateTime: "2023-07-28T08:45:39.391784Z",
      id: 1,
      postContent: "Test Content",
      postContentCategory: 4,
      postType: 2,
      title: "Test Title",
      user: "Test User",
    };
    const responsePost = {
      authorID: 3,
      authorUser: "Test User",
      createdOn: "2023-06-28T08:45:39.391784Z",
      eventDateTime: "2023-07-28T08:45:39.391784Z",
      id: 1,
      postContent: "Test Content",
      postContentCategory: 4,
      postType: 2,
      title: "Test Title"
    };
    const token = "123456";
    jest.spyOn(axios, "get").mockResolvedValueOnce({ data: [post] });
    const response = await getAllPosts(token);
    expect(response).toEqual([responsePost]);
  });
});

describe("removeDuplicates()", () => {
  test("Remove duplicates in an array of objects with id", () => {
    const randomArrayObjects = [
      { id: 5, colourName: "Red" },
      { id: 2, colourName: "Blue" },
      { id: 5, colourName: "Red" },
      { id: 1, colourName: "Yellow" },
      { id: 4, colourName: "Green" },
      { id: 5, colourName: "Red" },
      { id: 2, colourName: "Blue" },
      { id: 3, colourName: "Purple" },
      { id: 5, colourName: "Red" },
      { id: 1, colourName: "Yellow" },
    ];
    expect(removeDuplicates(randomArrayObjects)).toEqual([
      { colourName: "Yellow", id: 1 },
      { colourName: "Blue", id: 2 },
      { colourName: "Purple", id: 3 },
      { colourName: "Green", id: 4 },
      { colourName: "Red", id: 5 },
    ]);
  });

  test("Throw an error when an an array of objects with NO id is passed into the removeDuplicates function", () => {
    const anotherRandomArrayObjects = [
      { colourName: "Red" },
      { colourName: "Blue" },
      { colourName: "Red" },
      { colourName: "Yellow" },
      { colourName: "Green" },
      { colourName: "Red" },
      { colourName: "Blue" },
      { colourName: "Purple" },
      { colourName: "Red" },
      { colourName: "Yellow" },
    ];

    const resultFunction = () => {
      removeDuplicates(anotherRandomArrayObjects);
    };
    expect(resultFunction).toThrow("Object has no id field");
  });

  test("Throw an error when the object passed in to the removeDuplicates function is NOT an array", () => {
    const randomNotAnArrayObjects = {
      id:
        ({ id: 5, colourName: "Red" },
        { id: 2, colourName: "Blue" },
        { id: 5, colourName: "Red" },
        { id: 1, colourName: "Yellow" },
        { id: 4, colourName: "Green" },
        { id: 5, colourName: "Red" },
        { id: 2, colourName: "Blue" },
        { id: 3, colourName: "Purple" },
        { id: 5, colourName: "Red" },
        { id: 1, colourName: "Yellow" }),
    };

    const resultFunction = () => {
      removeDuplicates(randomNotAnArrayObjects);
    };
    expect(resultFunction).toThrow("Object is not an array");
  });
});

describe("sortByCreatedOn()", () => {
  test("Sorts an array of objects with a createdOn property of datetime objects with the newest object first", () => {
    const randomArrayObjects = [
      { id: 9, createdOn: "2023-07-15T11:59:59.391784Z" },
      { id: 2, createdOn: "2023-07-30T08:52:45.401784Z" },
      { id: 3, createdOn: "2023-10-05T09:45:39.391784Z" },
      { id: 8, createdOn: "2023-08-05T03:07:54.391784Z" },
      { id: 4, createdOn: "2023-06-31T10:35:19.391784Z" },
      { id: 10, createdOn: "2023-06-29T07:45:12.391784Z" },
      { id: 6, createdOn: "2023-09-01T07:13:29.391784Z" },
      { id: 7, createdOn: "2023-06-18T08:45:39.391784Z" },
      { id: 5, createdOn: "2023-06-10T04:05:30.391784Z" },
      { id: 1, createdOn: "2023-06-28T08:45:39.391784Z" },
    ];

    expect(sortByCreatedOn(randomArrayObjects)).toEqual([
      { createdOn: "2023-10-05T09:45:39.391784Z", id: 3 },
      { createdOn: "2023-09-01T07:13:29.391784Z", id: 6 },
      { createdOn: "2023-08-05T03:07:54.391784Z", id: 8 },
      { createdOn: "2023-07-30T08:52:45.401784Z", id: 2 },
      { createdOn: "2023-07-15T11:59:59.391784Z", id: 9 },
      { createdOn: "2023-06-31T10:35:19.391784Z", id: 4 },
      { createdOn: "2023-06-29T07:45:12.391784Z", id: 10 },
      { createdOn: "2023-06-28T08:45:39.391784Z", id: 1 },
      { createdOn: "2023-06-18T08:45:39.391784Z", id: 7 },
      { createdOn: "2023-06-10T04:05:30.391784Z", id: 5 },
    ]);
  });
});
