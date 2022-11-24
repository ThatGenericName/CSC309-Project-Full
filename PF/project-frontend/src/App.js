import logo from './logo.svg';
import './App.css';

import React from 'react';
import TestClass from './components/topbar/testfunc';
import SignUpButton from './components/topbar/SignUpButton';

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
            <div className="App">
                <h1>Stuff Test</h1>
                <div>
                    <h2>Stuff H2</h2>
                    {test}
                </div>
                <div>
                    <SignUpButton/>
                </div>
            </div>
        );
      }
}



export default App;
