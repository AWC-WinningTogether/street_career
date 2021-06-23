import React from "react";

export interface HomeComponentProps {
    name: string;
}

export interface HomeComponentState { }

export class HomeComponent extends React.Component<HomeComponentProps, HomeComponentState> {
    render() {
        return (
            <div>
                HI {this.props.name}
            </div>
        );
    }
}