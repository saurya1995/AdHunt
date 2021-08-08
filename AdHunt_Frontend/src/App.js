import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import About from "./components/profile/About";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";
import reducers from "./redux/reducers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import AppTheme from "./theming/themetypes";
import AppThemeOptions from "./theming/themes";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
    // create store for redux
    const store = createStore(reducers, applyMiddleware(thunkMiddleware));
    // theme for app
    const [theme, setTheme] = React.useState(AppTheme.LIGHT);
    return (
        <div>
            <MuiThemeProvider theme={createMuiTheme(AppThemeOptions[theme])}>
                <Provider store={store}>
                    <CssBaseline />

                    <React.Fragment>
                        <Switch>
                            {routes.map((route, i) => (
                                <Route key={i} {...route} />
                            ))}
                        </Switch>
                    </React.Fragment>
                </Provider>
            </MuiThemeProvider>
        </div>
    );
}

export default App;
