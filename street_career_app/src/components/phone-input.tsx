import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

export interface PhoneInputProps {
    phoneNumber?: string
    onChange: (phoneNumber?: string) => void
}

export interface PhoneInputState {
    
}

export class PhoneInputComponent extends React.Component<PhoneInputProps, PhoneInputState> {
    constructor(props: PhoneInputProps) {
        super(props)
        this.state = {
        }
    }

    onPhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(event.currentTarget.value)
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={3}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required={false}
                        fullWidth
                        id="phoneNumber"
                        label="Extension"
                        name="phoneNumber"
                        autoComplete="phoneNumber"
                        autoFocus={false}
                        value="+91"
                        disabled={true}
                    />
                </Grid>
                <Grid item xs={9}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="phoneNumber"
                        label="Phone Number"
                        name="phoneNumber"
                        autoComplete="phoneNumber"
                        type="number"
                        autoFocus
                        value={this.props.phoneNumber}
                        onChange={this.onPhoneNumberChange}
                    />
                </Grid>
            </Grid>
        );
    }
}