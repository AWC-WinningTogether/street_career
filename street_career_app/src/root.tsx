import React from "react";

import { withStyles } from '@material-ui/core/styles';
import { Theme } from "@material-ui/core/styles";
import { WithStyles } from "@material-ui/core/styles";
import CommonAppBarComponent, { CommonAppBarComponentProps } from './components/common-app-bar'
import SignIn from './pages/sign-in'
import SignUp from './pages/sign-up'
import { CircularProgress } from "@material-ui/core";
import { UserInfo } from "./model/common";
import { ScoringComponent } from "./components/scoring";

export interface RootComponentProps extends WithStyles<typeof styles> { }

export interface RootComponentState {
    loading: boolean
    userInfo?: UserInfo
    isSignUp: boolean
}

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

class RootComponent extends React.Component<RootComponentProps, RootComponentState> {
    constructor(props: RootComponentProps) {
        super(props);
        this.state = {
            loading: true,
            isSignUp: false
        }
    }

    componentDidMount() {
        const userInfoStr = localStorage.getItem("userInfo");
        if (userInfoStr) {
            this.setState({ userInfo: JSON.parse(userInfoStr) as UserInfo, loading: false })
        } else {
            this.setState({ loading: false })
        }
    }

    onSignInSuccess = (userInfo: UserInfo) => {
        localStorage.setItem("userInfo", JSON.stringify(userInfo))
        this.setState({ userInfo: userInfo })
    }

    onSignUpSuccess = (userInfo: UserInfo) => {
        localStorage.setItem("userInfo", JSON.stringify(userInfo))
        this.setState({ userInfo: userInfo })
    }

    onSignOut = () => {
        localStorage.removeItem("userInfo")
        this.setState({ userInfo: undefined })
    }

    content = (): JSX.Element => {
        const state = this.state;
        let appBarProps: CommonAppBarComponentProps;
        const title = "Street Career";
        if (state.userInfo) {
            appBarProps = {
                title,
                rightOptionText: "Signout",
                onRightOptionClick: this.onSignOut
            }
        } else if (state.isSignUp) {
            appBarProps = {
                title,
                rightOptionText: "Sign In",
                onRightOptionClick: () => {
                    //TODO
                    this.setState({ isSignUp: false })
                }
            }
        } else {
            appBarProps = {
                title,
                rightOptionText: "Sign Up",
                onRightOptionClick: () => {
                    //TODO
                    this.setState({ isSignUp: true })
                }
            }
        }
        if (state.userInfo) {
            return <>
                <CommonAppBarComponent {...appBarProps} />
                <div> Hi {state.userInfo.fullName}</div>
                <ScoringComponent></ScoringComponent>
            </>
        }
        return <>
            <CommonAppBarComponent {...appBarProps} />
            {!state.isSignUp && <SignIn onSignInSuccess={this.onSignInSuccess} />}
            {state.isSignUp && <SignUp onSignUpSuccess={this.onSignUpSuccess}/>}
        </>
    }

    render(): JSX.Element {
        const state = this.state;
        const loading = state.loading;
        if (loading) {
            return <>
                <CircularProgress />
            </>
        }
        return this.content();
    }
}

export default withStyles(styles)(RootComponent)