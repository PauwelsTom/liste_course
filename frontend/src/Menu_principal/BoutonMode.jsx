import { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "./BoutonMode.css"

// name, link
export class BoutonMode extends Component {
    constructor(props) {
        super();
        this.name = props.name;
        this.link = props.link;
    }

    render() {
        return (
            <Link className="BoutonModeDiv" to={this.link}>
                <div>{this.name}</div>
                <div className="BoutonFlèche">
                    {">"}
                </div>
            </Link>
        );
    }
}