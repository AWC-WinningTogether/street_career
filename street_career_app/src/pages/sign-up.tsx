import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Theme } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/core/styles';
import { CreateCSSProperties } from '@material-ui/core/styles/withStyles';
import { signUpApi } from '../fake-apis/sign-in';
import { UserInfo } from '../model/common';
import { PhoneInputComponent } from '../components/phone-input';

//Inspired from https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignUp.js
const styles = (theme: Theme) => {
    return {
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        } as CreateCSSProperties,
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }
}

export interface SignUpProps {
    onSignUpSuccess: (userInfo: UserInfo) => void
}

export interface SignUpState {
    phoneNumber?: string
    newPassword?: string
    confirmPassword?: string
    fullName?: string
    signUpBtnEnabled: boolean
}

interface SignUpPropsWithStyles extends SignUpProps, WithStyles<typeof styles> {

}

class SignUp extends React.Component<SignUpPropsWithStyles, SignUpState> {
    constructor(props: SignUpPropsWithStyles) {
        super(props)
        this.state = {
            signUpBtnEnabled: false
        }
    }

    onPhoneNumberChange = (phoneNumber?: string) => {
        this.setState({ phoneNumber: phoneNumber }, this.onStateChange)
    }

    onStateChange = () => {
        const state = this.state;
        if (SignUp.isSignUpBtnEnabled(state)) {
            this.setState({ signUpBtnEnabled: true });
        }
    }

    static isSignUpBtnEnabled(state: SignUpState) {
        return state.phoneNumber && state.newPassword && state.confirmPassword && state.newPassword == state.confirmPassword && state.fullName;
    }

    onNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = event.currentTarget.value;
        this.setState({ newPassword: value }, this.onStateChange)
    }

    onConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = event.currentTarget.value;
        this.setState({ confirmPassword: value }, this.onStateChange)
    }

    onFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = event.currentTarget.value;
        this.setState({ fullName: value }, this.onStateChange)
    }

    onSubmit = () => {
        const state = this.state;
        if (state.phoneNumber && state.newPassword && state.fullName && SignUp.isSignUpBtnEnabled(state)) {
            signUpApi(state.phoneNumber, state.newPassword, state.fullName).then((userInfo: UserInfo) => {
                this.props.onSignUpSuccess(userInfo)
            })
        }
    }

    render() {
        const props = this.props;
        const state: SignUpState = this.state;
        return (
            <Container component="main" maxWidth="sm">
                <div className={props.classes.paper}>
                    <Avatar className={props.classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="fullName"
                                label="Full Name"
                                id="fullName"
                                value={state.confirmPassword}
                                autoComplete="full-nmae"
                                onChange={this.onFullNameChange}
                            />
                        </Grid>
                        <Grid item xs>
                            <PhoneInputComponent
                                onChange={this.onPhoneNumberChange}
                                phoneNumber={this.state.phoneNumber} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="newPassword"
                                label="New Password"
                                type="password"
                                id="newPassword"
                                value={state.newPassword}
                                autoComplete="new-password"
                                onChange={this.onNewPasswordChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                value={state.confirmPassword}
                                autoComplete="confirm-password"
                                onChange={this.onConfirmPasswordChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={props.classes.submit}
                        disabled={!state.signUpBtnEnabled}
                        onClick={this.onSubmit}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        );
    }
}

export default withStyles(styles)(SignUp);