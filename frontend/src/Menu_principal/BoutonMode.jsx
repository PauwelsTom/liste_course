import { Component } from "react";
import "./BoutonMode.css"

// name
export class BoutonMode extends Component {
    constructor(props) {
        super();
        this.name = props.name;
    }

    render() {
        return (
            <div className="BoutonModeDiv">
                <div>{this.name}</div>
                <div className="BoutonFlèche">
                    {">"}
                </div>
            </div>
        );
    }
}