
import { Typography, List, ListItemButton, Avatar, ListItemAvatar, ListItemText } from "@mui/material"
import LinkIcon from '@mui/icons-material/Link';
import React, { useEffect, useState } from "react"
import { defaults } from "../content.defaults"
import _ from "lodash";

export interface props {
    links: any,
}
const API_ENPOINT = process.env.REACT_APP_API_ENDPOINT
export const Links = ({ links }: props) => {
    //prepare the styles
    const [styles, setStyles] = useState<any>(defaults.links)
    useEffect(() => {
        if (links.styles) {
            setStyles(links.styles)
        }
    }, [links.styles])
    return (
        <>
            {links?.links &&
                <List dense={false} sx={_.cloneDeep(styles[0].list.List)}>
                    {
                        Object.entries(links?.links).map((link: any, index: any) => (
                            <React.Fragment key={index}>

                                < ListItemButton onClick={() => {
                                    window.open(String(links.links[index].link));

                                }}>
                                    <ListItemAvatar>
                                        <Avatar sx={_.cloneDeep(styles[2].link_icon.Avatar)}>
                                            <LinkIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText sx={_.cloneDeep(styles[1].link_text.ListItemText)}
                                        primary={links.links[index].title}
                                    />
                                    {link.title}
                                </ListItemButton>

                            </React.Fragment>
                        ))
                    }

                </List>
            }
        </>
    )
}