import React, { useEffect, useState } from "react";
import { defaults } from "../content.defaults";
import { Grid, Typography } from "@mui/material";
import ReactAudioPlayer from "react-audio-player";
import _ from "lodash";

export interface zoneProps {
  audio: any;
}

export const Audio = ({ audio }: zoneProps) => {
  const [styles, setStyles] = useState<any>(defaults.audio);
  useEffect(() => {
    if (audio.styles) {
      setStyles(audio.styles);
    }
  }, [audio.styles]);
  return (
    <>
      {audio && (
        <>
          <Grid item>
            {audio.title && (
              <Typography
                variant="h4"
                component="div"
                sx={_.cloneDeep(styles[0].title.Typography)}
              >
                {audio.title}
              </Typography>
            )}
            <ReactAudioPlayer
              src={audio.src}
              autoPlay={audio.autoPlay ? audio.autoPlay : false}
              loop={audio.loop ? audio.loop : false}
              controls={audio.controls ? audio.controls : false}
              style={styles[0].player.ReactAudioPlayer}
            />
            {audio.info && (
              <Typography
                variant="body1"
                component="div"
                sx={_.cloneDeep(styles[2].info.Typography)}
              >
                {audio.info}
              </Typography>
            )}
          </Grid>
        </>
      )}
    </>
  );
};
