import "./AddFoyer.css"
import { Component } from "react";
import { FoyerForm } from "./FoyerForm";

// add
export class AddFoyer extends Component {
    constructor(props) {
        super();
        this.state = {
            unrolled: false
        }
    }

    getClass = (form) => {
        if (form) {
            return "FoyerAddForm " + (this.state.unrolled? "": "Invisible");
        } else {
            return "FoyerAddLine " + (this.state.unrolled? "Invisible": "");
        }
    }

    changeMode = () => {
        this.setState({unrolled: !this.state.unrolled});
    }

    add_foyer = (name, description) => {
        this.props.add(name, description)
        this.changeMode();
    }

    render() {
        return (
            <div className="AddFoyerDiv">
                <div className={this.getClass(false)}>
                    <span>Add</span>
                    <span>Cliquez ici pour ajouter votre foyer</span>
                    <button onClick={this.changeMode}>Ajouter</button>
                </div>

                <FoyerForm visible={this.state.unrolled} add={this.add_foyer}
                    changeMode={this.changeMode}/>
            </div>
        );
    }
}