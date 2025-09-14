
import { IngredientClass } from "../Class/Ingredient";
import "./IngredientModif.css"
import { Component } from "react";

// ingr
export class IngredientModif extends Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
        // Rentrer tous les arguments dans les champs de texte
        this.props.ingr.get_attribute_list().map((attr, _) => {
            document.getElementById("Modif" + attr).value = this.props.ingr[attr];
        });
    }

    get_ingr = () => {
        // On récupère tous les éléments pour faire un ingrédient
        let ingr = {};
        this.props.ingr.get_attribute_list().map((attr, _) => {
            ingr[attr] = document.getElementById("Modif" + attr).value;
        });
        const res = new IngredientClass(ingr.name);
        res.build_ingr(ingr);
        return res;
    }

    render() {
        return (
            <div className="IngredientModifDiv">
                
                {this.props.ingr.get_attribute_list().map((attr, index) => (
                    <div className="ChampTexte">
                        <span className="LabelIngrModif">{attr}</span>
                        <input className="InputIngrModif" id={"Modif" + attr} type="text"/>
                    </div>
                ))}

                <div className="BoutonValiderRetourDiv">
                    <button onClick={() => this.props.saveChange(false)}>Retour</button>
                    <button onClick={() => this.props.saveChange(true, this.get_ingr())}>Valider</button>
                </div>

                
            </div>
        );
    }
}