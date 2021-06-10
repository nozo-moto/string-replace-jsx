# String-Replace-Jsx
![npm](https://img.shields.io/npm/v/string-replace-jsx)
[![GitHub stars](https://img.shields.io/github/stars/nozo-moto/string-replace-jsx)](https://github.com/nozo-moto/string-replace-jsx/stargazers)
[![GitHub license](https://img.shields.io/github/license/nozo-moto/string-replace-jsx)](https://github.com/nozo-moto/string-replace-jsx)
## What 
The `stringReplaceJsx` method returns a new string with some or all matches of a pattern.

## How to use

`npm i --save string-replace-jsx`

```js
import stringReplaceJsx from "string-replace-jsx";

<div>
  {stringReplaceJsx("fuga https://google.com", urlRegex, (match) => (
    <a
      className={styles.link}
      href={match.toString()}
      target="_blank"
      rel="noreferrer"
    >
      {match}
    </a>
  ))}
</div>;
```
