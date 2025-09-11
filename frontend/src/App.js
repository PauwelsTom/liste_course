import { Component } from 'react';
import './App.css';
import { ListeModes } from './Menu_principal/ListeModes';

class App extends Component {

    constructor(props) {
        super();
    }

    render () {
        return (
            <div className="App">
                <ListeModes />
            </div>
        );
    }
}

export default App;