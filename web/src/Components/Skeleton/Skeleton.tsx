import * as React from "react"
import { withStyles, AppBar, Toolbar, StyledComponentProps, WithStyles, Theme, Divider, Typography, List, ListItem, ListItemIcon, Icon, ListItemText } from "material-ui";
import { Drawer, IconButton } from "..";

export interface Props extends StyledComponentProps {
    children?: React.ReactNode
}

export interface State {
    leftDrawerOpen: boolean
    rightDrawerOpen: boolean
}

const drawerWidth = 240;
const styles = (theme: Theme) => ({
    root: {
        flexGrow: 1,
        display: "flex",
        overflow: "hidden"
    },
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    appBarShiftLeft: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appBarShiftRight: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginRight: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        overflow: "hidden",
        marginLeft: -drawerWidth,
        marginRight: -drawerWidth,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    contentShiftLeft: {
        // content dont flow?
        // marginLeft: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    contentShiftRight: {
        // content dont flow?
        // marginRight: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    flex: {
        flex: 1
    }
})

class Skeleton extends React.Component<Props & WithStyles, State> {

    constructor(props: Props) {
        super(props as any)

        this.state = {
            leftDrawerOpen: false,
            rightDrawerOpen: false
        }
    }

    toggleLeftSidemenu() {
        this.setState({ leftDrawerOpen: !this.state.leftDrawerOpen, rightDrawerOpen: false })
    }

    toggleRightSidemenu() {
        this.setState({ rightDrawerOpen: !this.state.rightDrawerOpen, leftDrawerOpen: false })
    }

    render() {
        const { classes } = this.props
        return (
            <div className={this.props.classes.root}>
                <AppBar className={this.appbarClassNames} color="primary">
                    <Toolbar>
                        <IconButton icon="dehaze" onClick={this.toggleLeftSidemenu.bind(this)} />
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            VCR
                        </Typography>
                        <IconButton icon="mail" badge={21} onClick={this.toggleRightSidemenu.bind(this)} />
                    </Toolbar>
                </AppBar>
                <Drawer anchor="left" open={this.state.leftDrawerOpen}>
                    <Divider />
                    <List component="nav">
                        <ListItem button>
                            <ListItemIcon>
                                <Icon>mail</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Inbox" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <Icon>drafts</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Drafts" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List component="nav">
                        <ListItem button>
                            <ListItemIcon>
                                <Icon>mail</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Inbox" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <Icon>drafts</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Drafts" />
                        </ListItem>
                    </List>
                </Drawer>
                <div className={this.contentClassNames}>
                    <div className={classes.drawerHeader} />
                    {this.props.children}
                </div>
                <Drawer anchor="right" open={this.state.rightDrawerOpen}>
                    <Divider />
                    Ello
                </Drawer>
            </div>
        )
    }

    private get appbarClassNames(): string {
        const classNames: Array<string> = [this.props.classes.appBar]

        if (this.state.leftDrawerOpen) {
            classNames.push(this.props.classes.appBarShiftLeft)
        }

        if (this.state.rightDrawerOpen) {
            classNames.push(this.props.classes.appBarShiftRight)
        }

        return classNames.filter(e => e).join(" ")
    }

    private get contentClassNames(): string {
        const classNames: Array<string> = [this.props.classes.content]

        if (this.state.leftDrawerOpen) {
            classNames.push(this.props.classes.contentShiftLeft)
        }

        if (this.state.rightDrawerOpen) {
            classNames.push(this.props.classes.contentShiftRight)
        }

        return classNames.filter(e => e).join(" ")
    }
}

export default withStyles(styles as any)<Props>(Skeleton)