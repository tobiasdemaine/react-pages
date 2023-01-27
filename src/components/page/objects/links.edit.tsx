import { useState, useEffect } from 'react';
import { useDelayFire } from '../hooks/delayFire';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// Delete Zone
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface props {
    content: any,
    setContentCB: Function,
}


export const Links = ({ content, setContentCB }: props) => {
    const { delayFire, _props, set_props } = useDelayFire(content)
    const [index, setIndex] = useState<any>(false)
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false)

    const newLink = () => {
        const _content = { ...content };
        if (!_content.links) {
            _content.links = []
        }
        _content.links.push({
            link: "",
            title: "New Link"
        })
        setContentCB(_content)
        set_props(_content)
        setIndex(_content.links.length - 1)
    }

    const deleteLink = () => {
        const _content = { ...content };
        _content.cards.splice(index, 1);
        set_props(_content)
        setContentCB(_content)
        if (_content.links.length == 0) {
            setIndex(false)
        } else {
            setIndex(_content.links.length - 1)
        }
    }
    useEffect(() => {
        set_props(content)
    }, [content]);

    return (
        <>
            <Dialog
                open={confirmOpen}
                onClose={() => { }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this Link.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setConfirmOpen(false)
                    }}>Cancel</Button>
                    <Button onClick={() => {
                        setConfirmOpen(false)
                        deleteLink()
                    }} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>


            <Tabs
                variant="scrollable"
                value={index}
                onChange={(event: React.SyntheticEvent, newValue: number) => {
                    setIndex(newValue)

                }}

            >
                {
                    content.links &&
                    content.links.map((item: any, index: any) => (
                        <Tab key={index} label={item.title} />
                    ))
                }

                <Box textAlign="right" sx={{ minWidth: 160, flexGrow: 1, pt: 1 }}>
                    <Button sx={{ mr: .5 }} size="small" onClick={() => {
                        setConfirmOpen(true)
                    }}>Delete</Button>
                    <Button size="small" onClick={newLink}>New Link</Button>
                </Box>
            </Tabs>

            {
                index !== false &&
                <Box role="tabpanel" sx={{ pt: 2 }}>
                    <TextField sx={{ mt: 1, mb: 1 }} fullWidth
                        label="Url"
                        id="url"
                        value={_props.links[index].link}
                        onChange={(event: any) => {
                            delayFire(
                                "links[" + index + "].link",
                                event.target.value,
                                () => {
                                    const _content = { ...content };
                                    _content.links[index].link = event.target.value;
                                    setContentCB(_content)
                                })
                        }
                        } />
                    <TextField sx={{ mt: 1, mb: 1 }} fullWidth
                        label="title"
                        id="content"
                        value={_props.links[index].title}
                        onChange={(event: any) => {
                            delayFire(
                                "links[" + index + "].title",
                                event.target.value,
                                () => {
                                    const _content = { ...content };
                                    _content.links[index].title = event.target.value;
                                    setContentCB(_content)
                                })

                        }
                        } />
                </Box>
            }
        </>
    )
}