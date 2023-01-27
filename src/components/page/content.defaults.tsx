export const defaults = {
    audio:
        [{
            title: {
                Typography: {
                    flexGrow: 1,
                    marginTop: 5,
                    textAlign: 'center'
                }
            }
        },
        {
            player: {
                ReactAudioPlayer: {
                    width: "100%",
                    marginTop: "2em"
                }
            }
        }, {
            info: {
                Typography: {
                    marginLeft: 1,
                    marginTop: 2,
                    marginRight: 1,
                    flexGrow: 1
                }
            }
        }]
    ,
    carousel: [
        {
            container: {
                Box: {
                    flexGrow: 1,
                    marginTop: 4
                }
            }
        },
        {
            card: {
                Card: {
                    maxWidth: "100%"
                }
            }

        }
        ,
        {
            title: {
                Typography: {

                }
            }

        }
        ,
        {
            info: {
                Typography: {

                }
            }

        }
    ],
    dataTable: [{
        title: {
            Typography: {
                flexGrow: 1,
                marginTop: 6,
                marginBottom: 3,
                textAlign: 'center'
            }
        }
    }, {
        info: {
            Typography: {
                flexGrow: 1,
                marginTop: 6,
                marginBottom: 3
            }
        }
    },
    {
        container:
        {
            TableContainer:
            {
                flexGrow: 1,
                marginTop: 2,
                marginBottom: 2
            }
        }

    },
    ],
    heading: [{
        text:
        {
            Typography:
            {
                flexGrow: 1,
                marginTop: 1,
                marginBottom: 1,
                textAlign: 'center'
            }
        }

    }],

    image: [
        {
            image: {
                img: {
                    width: '100%'
                }
            }
        },
        {
            title: {
                Typography: {
                    flexGrow: 1,
                    marginBottom: 3,
                    extAlign: "center"
                }
            }
        }
    ],
    links: [{
        list: {
            List: {
                marginTop: 3,
                marginBottom: 3,
                width: '100%',
                bgcolor: "#0a0a0755",
                borderRadius: 2
            }
        }
    },
    {
        link_text: {
            ListItemText: {

            }
        }
    },
    {
        link_icon: {
            Avatar: {
                bgcolor: "rgba(113, 137, 180, 0.42)"
            }
        }
    }],
    paragraph: [{
        content: {
            Typography: {
                flexGrow: 1,
                marginTop: 4,
                marginBottom: 3
            }
        }
    }],
    video: [{
        title: {
            Typography: {
                flexGrow: 1,
                marginTop: 5,
                textAlign: 'center'
            }
        }
    },
    {
        player: {
            video: {
                width: "100%",
                marginTop: "2em"
            }
        }
    }, {
        info: {
            Typography: {
                marginLeft: 1,
                marginTop: 2,
                marginRight: 1,
                flexGrow: 1
            }
        }
    }],
}