import React from "react";

const replaceJSX = (
  content: string | React.ReactNodeArray,
  regexp: string | RegExp,
  newSubstr: (
    match: string | React.ReactNodeArray,
    index: number
  ) => React.ReactElement
): React.ReactNodeArray => {
  if (typeof regexp === "string") {
    regexp = new RegExp(regexp);
  }
  let output: Array<React.ReactNode> = [];
  let result: RegExpExecArray | null;
  let r = regexp as RegExp;
  let c = content as string;
  let key = 0;
  while ((result = r.exec(c)) !== null) {
    const m = result[0];
    const i = result.index;
    if (i !== 0) {
      output.push(c.substring(0, i));
    }
    output.push(newSubstr(m, key++));
    c = c.substring(i + m.length, c.length);
    r.lastIndex = 0;
  }
  if (c !== "") {
    output.push(c);
  }
  return output;
};

export default replaceJSX;
