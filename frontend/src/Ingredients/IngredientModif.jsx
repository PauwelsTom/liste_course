
import { IngredientClass } from "../Class/Ingredient";
import "./IngredientModif.css"
import { Component } from "react";

// ingr, saveChange, 
export class IngredientModif extends Component {
    constructor(props) {
        super();
        this.ingr = props.ingr;
        this.add = this.ingr["name"] === "add";
    }

    componentDidMount() {
        // Rentrer tous les arguments dans les champs de texte
        this.ingr.attribute_list_form.map((attr, _) => {
            document.getElementById("Modif" + attr).value = (this.add? "": this.ingr[attr]);
        });
    }

    get_ingr = () => {
        // On récupère tous les éléments pour faire un ingrédient
        let ingr = {};
        this.ingr.attribute_list_form.map((attr, _) => {
            ingr[attr] = document.getElementById("Modif" + attr).value;
        });
        if (this.props.ingr.id != null) {
            ingr["id"] = this.props.ingr.id;
        }
        return new IngredientClass(ingr);
    }

    save = (succes) => {
        this.props.saveChange(succes, this.add, this.get_ingr());
    }

    suppr = () => {
        this.props.suppr(this.get_ingr());
    }

    render() {
        return (
            <div className="IngredientModifDiv">
                
                {this.ingr.attribute_list_form.map((attr, index) => (
                    <div key={index} className="ChampTexte">
                        <span className="LabelIngrModif">{attr}</span>
                        <input className="InputIngrModif" id={"Modif" + attr} type="text"/>
                    </div>
                ))}

                <div className="BoutonValiderRetourDiv">
                    <button onClick={() => this.save(false)}>Retour</button>
                    <button onClick={() => this.save(true)}>Valider</button>
                </div>

                <div className="BoutonValiderRetourDiv">
                    {
                        this.add? ""
                        :<button onClick={this.suppr}>Supprimer</button>
                    }
                </div>

                
            </div>
        );
    }
}