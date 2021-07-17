import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, Card, CardContent } from '@material-ui/core';

export interface ScoringProps {
}

export interface ScoringState {

}

interface ScoringCardData {
    text: string
    color: "default" | "primary" | "secondary"
}

const getScoringDataList = (): ScoringCardData[] => {
    const scoringDataList: ScoringCardData[] = [1, 2, 3, 4, 5, 6.].map(num => {
        return { text: "" + num, color: "primary" }
    })
    return scoringDataList;
}

export class ScoringComponent extends React.Component<ScoringProps, ScoringState> {
    constructor(props: ScoringProps) {
        super(props)
        this.state = {
        }
    }

    render(): JSX.Element{
        const scoringDataList = getScoringDataList();
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Card variant="outlined">
                        <CardContent>
                            <Grid container>
                                {scoringDataList.map(p => {
                                    return <Grid item xs={1} key={p.text}>
                                        <Button variant="contained" color={p.color}>
                                            {p.text}
                                        </Button>
                                    </Grid>
                                })}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}