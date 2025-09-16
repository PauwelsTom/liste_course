
import { IngredientClass } from "../Class/Ingredient";
import "./IngredientModif.css"
import { Component } from "react";

// ingr
export class IngredientModif extends Component {
    constructor(props) {
        super();
        this.ingr = props.ingr;
        if (this.ingr["name"] === "add") {
            this.ingr = new IngredientClass("add");
            this.add = true;
        } else {
            this.add = false;
        }
    }

    componentDidMount() {        
        // Rentrer tous les arguments dans les champs de texte
        this.ingr.get_attribute_list().map((attr, _) => {
            document.getElementById("Modif" + attr).value = (this.add? "": this.ingr[attr]);
        });
    }

    get_ingr = () => {
        // On récupère tous les éléments pour faire un ingrédient
        let ingr = {};
        this.ingr.get_attribute_list().map((attr, _) => {
            ingr[attr] = document.getElementById("Modif" + attr).value;
        });
        const res = new IngredientClass(ingr.name);
        res.build_ingr(ingr);
        return res;
    }

    save = (succes) => {
        this.props.saveChange(succes, this.add, this.get_ingr());
    }

    render() {
        return (
            <div className="IngredientModifDiv">
                
                {this.ingr.get_attribute_list().map((attr, index) => (
                    <div className="ChampTexte">
                        <span className="LabelIngrModif">{attr}</span>
                        <input className="InputIngrModif" id={"Modif" + attr} type="text"/>
                    </div>
                ))}

                <div className="BoutonValiderRetourDiv">
                    <button onClick={() => this.save(false)}>Retour</button>
                    <button onClick={() => this.save(true)}>Valider</button>
                </div>

                
            </div>
        );
    }
}