
import { Typography } from "@mui/material"
import _ from "lodash"
import React, { useEffect, useState } from "react"
import { defaults } from "../content.defaults"


export interface zoneProps {
    heading: any,
}


export const Heading = ({ heading }: zoneProps) => {
    //prepare the styles
    const [styles, setStyles] = useState<any>(defaults.heading)
    useEffect(() => {
        if (heading.styles) {
            setStyles(heading.styles)
        }
    }, [heading.styles])
    return (
        <>
            <Typography variant={heading.size} component="div" sx={_.cloneDeep(styles[0].text.Typography)}>
                {heading.text}
            </Typography>

        </>
    )
}