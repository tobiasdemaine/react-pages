import { useDelayFire } from "../hooks/delayFire";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";

export interface props {
  content: any;
  setContentCB: Function;
}

export const Paragraph = ({ content, setContentCB }: props) => {
  const { delayFire, _props, set_props } = useDelayFire(content);
  useEffect(() => {
    set_props(content);
  }, [content]);
  return (
    <>
      <TextField
        sx={{ mt: 1, mb: 1 }}
        fullWidth
        label="Content"
        id="content"
        value={_props.content ? _props.content : ""}
        multiline
        rows={4}
        onChange={(event: any) => {
          delayFire("content", event.target.value, () => {
            const _content = { ...content };
            _content.content = event.target.value;
            setContentCB(_content);
          });
        }}
      />
    </>
  );
};
