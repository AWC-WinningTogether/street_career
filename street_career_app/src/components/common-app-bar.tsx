import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import { Theme } from "@material-ui/core/styles";
import { WithStyles } from "@material-ui/core/styles";


export interface CommonAppBarComponentProps extends CommonAppBarComponentFieldProps, CommonAppBarComponentDispatchProps{

}

export interface CommonAppBarComponentFieldProps {
    title: string,
    rightOptionText: string
}

export interface CommonAppBarComponentDispatchProps {
    onRightOptionClick: () => void
}

export interface CommonAppBarComponentState { }

const styles = (theme: Theme) => {
    return {
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        }
    }
}

interface CommonAppBarComponentPropsWithStyles extends CommonAppBarComponentProps, WithStyles<typeof styles> {

}

class CommonAppBarComponent extends React.Component<CommonAppBarComponentPropsWithStyles, CommonAppBarComponentState> {
    constructor(props: CommonAppBarComponentPropsWithStyles) {
        super(props);
    }

    render(): JSX.Element {
        const props = this.props;
        return <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={this.props.classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={this.props.classes.title}>
                    {props.title}
                </Typography>
                <Button color="inherit" onClick={props.onRightOptionClick}>{props.rightOptionText}</Button>
            </Toolbar>
        </AppBar>
    }
}

export default withStyles(styles)(CommonAppBarComponent)