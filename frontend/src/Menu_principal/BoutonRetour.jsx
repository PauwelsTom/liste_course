import "./BoutonRetour.css"
import { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export class BoutonRetour extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <Link className="BoutonRetourDiv" to="/">
                {"<"}
            </Link>
        );
    }
}