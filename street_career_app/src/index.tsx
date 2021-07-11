import { CssBaseline } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import RootComponent from "./root";

// const store = createStore(rootReducer);
ReactDOM.render(
    // <Provider store={store}>
    <>
        <CssBaseline />
        <RootComponent />
    </>,
    // </Provider>,
    document.getElementById("root")
);