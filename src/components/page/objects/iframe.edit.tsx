import { useDelayFire } from "../hooks/delayFire";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";

export interface props {
  content: any;
  setContentCB: Function;
}

export const Iframe = ({ content, setContentCB }: props) => {
  const { delayFire, _props, set_props } = useDelayFire(content);
  useEffect(() => {
    set_props(content);
  }, [content]);
  return (
    <>
      <TextField
        sx={{ mt: 1, mb: 1 }}
        fullWidth
        label="Iframe URL"
        id="src"
        value={_props.src ? _props.src : ""}
        onChange={(event: any) => {
          delayFire("src", event.target.value, () => {
            const _content = { ...content };
            _content.src = event.target.value;
            setContentCB(_content);
          });
        }}
      />
    </>
  );
};
