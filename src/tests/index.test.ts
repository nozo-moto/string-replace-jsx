import replaceJSX from "../index";
import React from "react";

describe("test", (): void => {
  test("one", (): void => {
    const actual = replaceJSX(
      "hello world",
      /hello/,
      (
        match: string | React.ReactNodeArray,
        index: number
      ): React.ReactElement => {
        return React.createElement("div", match.toString());
      }
    );
    const want: Array<React.ReactNode> = [
      React.createElement("div", "hello"),
      " world",
    ];
    expect(actual).toStrictEqual(want);
  });

  test("url before \n", () => {
    // const urlRegex = /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g
    const urlRegex = /(http(s)?:\/\/[a-zA-Z0-9-.!'()*;/?:@&=+$,%#]+)/gi;
    const actual = replaceJSX(
      "http://example.com?keyword=hogehoge&limit=25\nこんにちは",
      urlRegex,
      (
        match: string | React.ReactNodeArray,
        index: number
      ): React.ReactElement => {
        return React.createElement("a", { href: match }, match);
      }
    );
    const want: Array<React.ReactNode> = [
      React.createElement(
        "a",
        {
          href: "http://example.com?keyword=hogehoge&limit=25",
        },
        "http://example.com?keyword=hogehoge&limit=25"
      ),
      "\nこんにちは",
    ];
    expect(actual).toStrictEqual(want);
  });

  test("url after \n", () => {
    const urlRegex = /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g;
    const actual = replaceJSX(
      "こんにちは\nhttp://example.com?keyword=hogehoge&limit=25",
      urlRegex,
      (
        match: string | React.ReactNodeArray,
        index: number
      ): React.ReactElement => {
        return React.createElement(
          "a",
          { href: match.toString() },
          match.toString()
        );
      }
    );
    const want: Array<React.ReactNode> = [
      "こんにちは\n",
      React.createElement(
        "a",
        {
          href: "http://example.com?keyword=hogehoge&limit=25",
        },
        "http://example.com?keyword=hogehoge&limit=25"
      ),
    ];
    expect(actual).toStrictEqual(want);
  });

  test("url after space", () => {
    const urlRegex = /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g;
    const actual = replaceJSX(
      "こんにちは http://example.com?keyword=hogehoge&limit=25",
      urlRegex,
      (
        match: string | React.ReactNodeArray,
        index: number
      ): React.ReactElement => {
        return React.createElement(
          "a",
          { href: match.toString() },
          match.toString()
        );
      }
    );
    const want: Array<React.ReactNode> = [
      "こんにちは ",
      React.createElement(
        "a",
        {
          href: "http://example.com?keyword=hogehoge&limit=25",
        },
        "http://example.com?keyword=hogehoge&limit=25"
      ),
    ];
    expect(actual).toStrictEqual(want);
  });

  test("url befpre space", () => {
    const urlRegex = /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g;
    const actual = replaceJSX(
      "http://example.com?keyword=hogehoge&limit=25 こんにちは",
      urlRegex,
      (
        match: string | React.ReactNodeArray,
        index: number
      ): React.ReactElement => {
        return React.createElement(
          "a",
          { href: match.toString() },
          match.toString()
        );
      }
    );
    const want: Array<React.ReactNode> = [
      React.createElement(
        "a",
        {
          href: "http://example.com?keyword=hogehoge&limit=25",
        },
        "http://example.com?keyword=hogehoge&limit=25"
      ),
      " こんにちは",
    ];
    expect(actual).toStrictEqual(want);
  });
});
