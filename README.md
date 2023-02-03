# React Pages

React Pages is a React component consisting of a editor and renderer for small screen content.
This componet is designed for react apps where uses get to create content and/or display content from GraphQL or Rest API sources.

- Quickly build content and save as a json
- render a json structure as a page

## Objects

- audio : embed an audio file
- carousel : a swipable carsousel of images and text
- dataTable : a table for dsplaying data
- graphQl : graphQl query as content source
- heading : a title
- iframe : display external content in a Iframe
- image : display an image
- links : a list of links
- paragraph : a praragraph of typography
- rest : a rest query as a content source
- timed display : display an object for a given time period
- video : embed a video

## usage

For the content renderer

```ts
import Page from "@tobiasdemaine/React-Pages";
import { useState } from "react";

export const PageDisplay = () => {
  const [content, setContent] = useState({}); //the page content json
  return (
    <>
      <Page page={content} />
    </>
  );
};
```

for the content editor

```ts
import { ContentEdit } from "@tobiasdemaine/React-Pages";

export const PageEdit = () => {
  const [content, setContent] = useState({}); //the page content json
  return (
    <>
      <ContentEdit
        page={content}
        setPageCB={(_page: any) => {
          setContent(_page);
        }}
        fileHandlerCB={async (_file: any) => {
          const file = await uploadFile(_file); // your file upload hook
          return file.data.src; // returns the filename to constent editor for insertion into the page json
        }}
      />
    </>
  );
};
```
