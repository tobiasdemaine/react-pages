
import { Grid, Typography, Box } from "@mui/material"
import _ from "lodash"
import React, { useEffect, useState } from "react"
import { defaults } from "../content.defaults"


export interface zoneProps {
    video: any,
}


export const Video = ({ video }: zoneProps) => {
    const [styles, setStyles] = useState<any>(defaults.video)
    useEffect(() => {
        if (video.styles) {
            setStyles(video.styles)
        }
    }, [video.styles])
    return (<>
        {
            video && (
                <>
                    <React.Fragment >
                        <Grid item>

                            {
                                video.title &&
                                <Typography variant="h4" component="div" sx={_.cloneDeep(styles[0].title.Typography)}>
                                    {video.title}
                                </Typography>

                            }
                            {
                                video.src &&
                                <video style={styles[0].player.video}
                                    controls={video.controls ? video.controls : true}
                                    autoPlay={video.autoPlay ? video.autoPlay : false}
                                    loop={video.loop ? video.loop : false}
                                >
                                    <source src={video.src} type="video/mp4" />
                                </video>
                            }
                            {
                                video.info &&
                                <Typography variant="body1" component="div" sx={_.cloneDeep(styles[0].info.Typography)}>
                                    {video.info}
                                </Typography>
                            }


                        </Grid>
                    </React.Fragment>


                </>
            )
        }
    </>)
}