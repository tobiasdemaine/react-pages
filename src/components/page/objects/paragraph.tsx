
import { Typography } from "@mui/material"
import _ from "lodash"
import React, { useEffect, useState, useRef } from "react"
import { defaults } from "../content.defaults"

export interface zoneProps {
    paragraph: any,
}
const API_ENPOINT = process.env.REACT_APP_API_ENDPOINT
export const Paragraph = ({ paragraph }: zoneProps) => {
    const [styles, setStyles] = useState<any>(defaults.paragraph)
    useEffect(() => {
        if (paragraph.styles) {
            setStyles(paragraph.styles)
        }

    }, [paragraph.styles])
    return (
        <>

            <Typography variant="body1" component="div" sx={{ ...styles[0].content.Typography }}>{paragraph.content}</Typography>

        </>
    )
}