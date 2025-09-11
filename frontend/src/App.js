import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { ListeModes } from './Menu_principal/ListeModes';
import { PageFoyer } from './Foyer/PageFoyer';
import { PageListe } from './Liste/PageListe';
import { PageMagasin } from './Magasin/PagMagasin';
import { PageRecette } from './Recette/PageRecette';

class App extends Component {

    constructor(props) {
        super();
    }

    render () {
        return (
            <Router className="App">
                <Routes>
                    <Route path='/' element={<ListeModes />}/>
                    <Route path='/liste' element={<PageListe />}/>
                    <Route path='/magasin' element={<PageMagasin />}/>
                    <Route path='/recette' element={<PageRecette />}/>
                    <Route path='/foyer' element={<PageFoyer />} />
                </Routes>
            </Router>
        );
    }
}

export default App;