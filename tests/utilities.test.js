// Created by Anna McColl 31/05/23

// Still to do Delete alert test

import DateFormatConverter from "../src/utilities/DateFormatConverter";
import TimeFormatConverter from "../src/utilities/TimeFormatConverter";
import ForumAuthorName from "../src/utilities/ForumAuthorName";

test("DateTime object format date with month name", () => {
  const dateTimeObject = new Date("2023-06-28T08:45:39.391784Z");
  expect(DateFormatConverter(dateTimeObject)).toBe("28 June 2023");
});

test("DateTime object format time for NZ 12 hour clock", () => {
  const dateTimeObject = new Date("2023-06-28T08:45:39.391784Z");
  expect(TimeFormatConverter(dateTimeObject)).toBe("8:45 pm");
});

test("Author Name for Counsellor", () => {
  const counsellorUser = {
    username: "BlackWidow",
    firstName: "Natasha",
    lastName: "Romanoff",
    businessName: "Red Room Ltd",
  };
  expect(ForumAuthorName(counsellorUser)).toBe(
    "Natasha Romanoff, Red Room Ltd"
  );
});

test("Author Name for Patient", () => {
  const patientUser = {
    username: "Ironman",
  };
  expect(ForumAuthorName(patientUser)).toBe("Ironman");
});
