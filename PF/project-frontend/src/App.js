import logo from './logo.svg';
import './App.css';

import React from 'react';
import TestClass from './components/topbar/testfunc';

import CookieTest from './components/topbar/CookieTest';
import TopAppBar from './components/topbar/TopBar';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#fd6114'
      },
      secondary: {
        main: "#2f528f"
      },
    },
  });


class App extends React.Component{
    constructor(){
        super()

        this.state = {
            testItem1: null,
            testItem2: null
        }
    }

    render() {
        let test = <TestClass/>

        return (
            <ThemeProvider theme={theme}>
                <div className="App">
                    <div>

                    <TopAppBar/>

                    </div>
                    <h1>Stuff Test</h1>
                    <div>
                        <h2>Stuff H2</h2>
                        {test}
                    </div>
                    <div>
                        <CookieTest/>
                        <br/>
                    </div>
                    <div>
                        Blank Space <br/><br/><br/>
                        Blank Space <br/><br/><br/>
                        Blank Space <br/><br/><br/>
                        Blank Space <br/><br/><br/>
                        Blank Space <br/><br/><br/>
                        Blank Space <br/><br/><br/>
                        Blank Space <br/><br/><br/>
                        Blank Space <br/><br/><br/>
                        Blank Space <br/><br/><br/>
                        Blank Space <br/><br/><br/>
                        Blank Space <br/><br/><br/>
                        Blank Space <br/><br/><br/>
                    </div>
                </div>
            </ThemeProvider>

        );
    }
}



export default App;
