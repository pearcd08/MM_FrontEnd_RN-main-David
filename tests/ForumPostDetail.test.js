// Created by Anna McColl 5-6-23

import axios from "axios";

import {
  deletePost,
  getComments,
  sortCommentsByCreatedOn,
} from "../src/screens/ForumPostDetail";

jest.mock("axios");
describe("deletePost()", () => {
  test("Should successfully delete a post", async () => {
    const postID = 1;
    const token = "123456";
    const data = { id: postID };

    axios.delete.mockResolvedValueOnce({ status: 204 });

    await new Promise((resolve) => {
      deletePost(postID, token);
      setTimeout(resolve, 0);
    });

    expect(axios.delete).toHaveBeenCalledWith(
      "http://mindmagic.pythonanywhere.com/api/forumpost/" +
        postID +
        "/delete/",
      {
        headers: {
          Authorization: "Token " + token,
          "Content-Type": "application/json",
        },
      }
    );
  });
});

describe("getAllComments()", () => {
  test("Should return any available response data", async () => {
    const comment = {
      id: 1,
      commentContent: "Test Comment Content",
      createdOn: "2023-06-28T08:45:39.391784Z",
      authorID: 2,
      forumPostID: 3,
      user: "Test user",
    };
    const responseComment = {
      authorID: 2,
      commentAuthorUser: "Test user",
      commentContent: "Test Comment Content",
      createdOn: "2023-06-28T08:45:39.391784Z",
      forumPostID: 3,
      id: 1,
    };

    const token = "123456";
    const postID = 1;
    const mockRequest = jest.spyOn(axios, "request");
    mockRequest.mockResolvedValueOnce({ data: [comment] });
    const response = await getComments(postID, token);
    expect(response).toEqual([responseComment]);
    expect(mockRequest).toHaveBeenCalledWith({
      method: "get",
      url: "http://mindmagic.pythonanywhere.com/api/forumpost/" + postID + "/comments/",
      headers: {
        Authorization: `Token ${token}`,
      },
      data: { id: postID },
    });
  });
});

describe("sortCommentsByCreatedOn()", () => {
  test("Sorts an array of objects with a createdOn property of datetime objects with the oldest object first", () => {
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

    expect(sortCommentsByCreatedOn(randomArrayObjects)).toEqual([
      { createdOn: "2023-06-10T04:05:30.391784Z", id: 5 },
      { createdOn: "2023-06-18T08:45:39.391784Z", id: 7 },
      { createdOn: "2023-06-28T08:45:39.391784Z", id: 1 },
      { createdOn: "2023-06-29T07:45:12.391784Z", id: 10 },
      { createdOn: "2023-06-31T10:35:19.391784Z", id: 4 },
      { createdOn: "2023-07-15T11:59:59.391784Z", id: 9 },
      { createdOn: "2023-07-30T08:52:45.401784Z", id: 2 },
      { createdOn: "2023-08-05T03:07:54.391784Z", id: 8 },
      { createdOn: "2023-09-01T07:13:29.391784Z", id: 6 },
      { createdOn: "2023-10-05T09:45:39.391784Z", id: 3 },
    ]);
  });
});
