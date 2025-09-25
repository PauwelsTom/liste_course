import "./FoyerForm.css"
import { Component } from "react";

// visible, add, changeMode, foyer
export class FoyerForm extends Component {
    constructor(props) {
        super();
        this.name = props.foyer? props.foyer.name: "Add";
    }

    get_class = () => {
        return "FoyerForm " + (this.props.visible? "": "Invisible");
    }

    add_foyer = () => {
        const name = document.getElementById("foyerNameInput" + this.name).value;
        const description = document.getElementById("foyerDescriptionInput" + this.name).value;
        if (this.name === "Add") {
            document.getElementById("foyerNameInput" + this.name).value = "";
            document.getElementById("foyerDescriptionInput" + this.name).value = "";
        }
        this.props.add(name, description);
    }

    fill_fields = () => {
        document.getElementById("foyerNameInput" + this.name).value = this.props.foyer.name;
        document.getElementById("foyerDescriptionInput" + this.name).value = this.props.foyer.description;
    }

    componentDidMount() {
        if (this.props.foyer) {
            this.fill_fields();
        }
    }

    render() {
        return (
            <div className={this.get_class()}>
                <div className="ChampTexte">
                    <span>Nom</span>
                    <input id={"foyerNameInput" + this.name}/>
                </div>

                <div className="ChampTexte">
                    <span>Description</span>
                    <input id={"foyerDescriptionInput" + this.name}/>
                </div>

                <div className="ColonneBoutonFoyer">
                    <button onClick={this.add_foyer}>{this.name === "Add"? "Ajouter": "Modifier"}</button>
                    <button className={this.name !== "Add"? "SupprFoyer": ""} onClick={this.props.changeMode}>{this.name === "Add"? "Annuler": "Supprimer"}</button>
                </div>
            </div>
        );
    }
}