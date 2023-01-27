
import React, { useState, useEffect } from "react"
import { useDelayFire } from '../hooks/delayFire';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export interface props {
    content: any,
    setContentCB: Function,
}


export const Heading = ({ content, setContentCB }: props) => {
    const [headSize, setHeadSize] = React.useState<string | null>('h1')
    const { delayFire, _props, set_props } = useDelayFire(content)
    const handleHeadSize = (
        event: React.MouseEvent<HTMLElement>,
        newSize: string | null,
    ) => {
        setHeadSize(newSize);
        const _content = { ...content };
        _content.size = newSize
        setContentCB(_content)
    };

    useEffect(() => {
        set_props(content)
        if (!content.text) {
            const _content = { ...content };
            _content.text = ""
            _content.size = headSize
            setContentCB(_content)
        }
    }, [content]);

    return (
        <>
            <TextField sx={{ mt: 1, mb: 1 }} fullWidth
                label="Text"
                id="text"
                value={_props.text ? _props.text : ""}

                onChange={(event: any) => {
                    delayFire(
                        "text",
                        event.target.value,
                        () => {
                            const _content = { ...content };
                            _content.text = event.target.value;
                            setContentCB(_content)
                        })

                }
                } />
            <ToggleButtonGroup
                value={headSize}
                exclusive
                onChange={handleHeadSize}
                aria-label="text size" sx={{ mb: 1 }}
            >
                <ToggleButton value="h1" aria-label="h1">
                    H1
                </ToggleButton>
                <ToggleButton value="h2" aria-label="h2">
                    H2
                </ToggleButton>
                <ToggleButton value="h3" aria-label="h3">
                    H3
                </ToggleButton>
                <ToggleButton value="h4" aria-label="h4" >
                    H4
                </ToggleButton>
                <ToggleButton value="h5" aria-label="h5" >
                    H5
                </ToggleButton>
                <ToggleButton value="h6" aria-label="h6" >
                    H6
                </ToggleButton>
            </ToggleButtonGroup>


        </>
    )
}

