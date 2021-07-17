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
import { signInApi } from '../fake-apis/sign-in';
import { UserInfo } from '../model/common';
import { PhoneInputComponent } from '../components/phone-input';

//Inspired from https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js
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

export interface SignInProps {
    onSignInSuccess: (userInfo: UserInfo) => void
}

export interface SignInState {
    phoneNumber?: string
    password?: string
    signInBtnEnabled: boolean
}

interface SignInPropsWithStyles extends SignInProps, WithStyles<typeof styles> {
    
}

class SignIn extends React.Component<SignInPropsWithStyles, SignInState> {
    constructor(props: SignInPropsWithStyles) {
        super(props)
        this.state = {
            signInBtnEnabled: false
        }
    }

    onPhoneNumberChange = (phoneNumber?: string) => {
        const state = this.state;
        this.setState({ phoneNumber: phoneNumber, signInBtnEnabled: !!(phoneNumber && state.password) }, this.onStateChange)
    }

    onStateChange = () => {
        const state = this.state;
        this.setState({ signInBtnEnabled: !!(state.phoneNumber && state.password) })
    }

    onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const state = this.state;
        const value: string = event.currentTarget.value;
        this.setState({ password: value, signInBtnEnabled: !!(value && state.phoneNumber) }, this.onStateChange)
    }

    onSubmit = () => {
        const state = this.state;
        if (state.phoneNumber && state.password) {
            signInApi(state.phoneNumber, state.password).then((userInfo: UserInfo) => {
                this.props.onSignInSuccess(userInfo)
            })
        }
    }

    render() {
        const props = this.props;
        const state: SignInState = this.state;
        return (
            <Container component="main" maxWidth="sm">
                <div className={props.classes.paper}>
                    <Avatar className={props.classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Grid container>
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
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={state.password}
                                autoComplete="current-password"
                                onChange={this.onPasswordChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={props.classes.submit}
                        disabled={!state.signInBtnEnabled}
                        onClick={this.onSubmit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        );
    }
}

export default withStyles(styles)(SignIn);