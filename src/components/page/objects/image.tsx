
import { Typography } from "@mui/material"
import _ from "lodash"
import React, { useEffect, useState } from "react"
import { defaults } from "../content.defaults"

export interface zoneProps {
    image: any,
}
const API_ENPOINT = process.env.REACT_APP_API_ENDPOINT
export const Image = ({ image }: zoneProps) => {
    //prepare the styles
    const [styles, setStyles] = useState<any>(defaults.image)
    useEffect(() => {
        if (image.styles) {
            setStyles(image.styles)
        }
    }, [image.styles])
    return (
        <>

            <img src={image?.src} style={styles[0].image.img}></img>
            {
                image?.title !== "" &&
                <>
                    <Typography variant="body2" component="div" sx={_.cloneDeep(styles[1].title.Typography)}>{image?.title}</Typography>
                </>
            }
        </>
    )
}