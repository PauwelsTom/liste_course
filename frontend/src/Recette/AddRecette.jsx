import { Component } from "react";
import "./AddRecette.css"
import { IngrRecetteClass, json_to_ingrRecetteList } from "../Class/IngrRecette";
import { json_to_ingrList } from "../Class/Ingredient";
import { RequeteClass } from "../Class/Requete";
import { RecetteClass } from "../Class/Recette";

// visible, exit, foyer, recette
export class AddRecette extends Component {
    constructor(props) {
        super();
        this.state = {
            ingredients: [],
            ingredientList: [],
            added: []
        }
        this.visible = props.visible;
        this.req = new RequeteClass();
    }

    get_class = () => {
        return "AddRecetteDiv " + (this.props.visible? "": "Hidden");
    }

    delete_ingr = async (ingr_id) => {
        await this.req.delete_ingr_recette(ingr_id);
        const ingrList = await this.req.get_ingr_recette(this.props.recette.id);
        this.setState({ingredients: json_to_ingrRecetteList(ingrList)});
    }

    modify_recette = async () => {
        const data = {
            name: document.getElementById("RecetteName").value,
            description: document.getElementById("RecetteDescription").value
        }
        const rec = new RecetteClass(data);

        if (this.props.recette != null) {
            rec.id = this.props.recette.id;
            await this.req.update_recette(rec);
        } else {
            await this.req.add_recette(rec);
        }

        await this.add_all_new_ingr();
        await this.update_all_ingredients();

        this.props.exit(); 
        this.setState({added: []});
        return;
    }

    add_all_new_ingr = async () => {
        for (let index = 0; index < this.state.added.length; index++) {
            const ingr = this.state.added[index];
            await this.req.create_ingr_recette_by_name(this.props.recette.id, ingr.name, ingr.quantite)
        }
    }

    update_all_ingredients = async () => {
        for (let index = 0; index < this.state.ingredients.length; index++) {
            const ingr = this.state.ingredients[index];
            ingr.quantite = document.getElementById("inputQuantite" + ingr.name).value;
            await this.req.update_ingr_recette(ingr);
        }
    }

    add_ingr = () => {
        this.state.added.push(new IngrRecetteClass({name: "", quantite: 0}));
        this.setState({added: this.state.added});
    }

    modify_ingr = (index, name=null, quantite=null) => {
        if (name!=null) {
            this.state.added[index].name = name;
        }
        if (quantite != null) {
            this.state.added[index].quantite = quantite
        }
        this.setState({added: this.state.added});
    }

    suppr_added = (index) => {
        this.state.added.splice(index, 1);
        this.setState({added: this.state.added});
    }

    async componentDidUpdate() {
        if (this.visible !== this.props.visible) {
            this.visible = this.props.visible;
            if (this.props.recette == null) { return; }
            const ingrList = await this.req.get_ingr_recette(this.props.recette.id);
            this.setState({ingredients: json_to_ingrRecetteList(ingrList)});
        }
    }

    async componentDidMount() {
        const ingrList = await this.req.get_ingredients(this.props.foyer);
        this.setState({ingredientList: json_to_ingrList(ingrList)});
    }

    render() {
        return (
            <div className={this.get_class()}>
                <div className="RecetteCoreDiv">
                    <div className="ChampTexte">
                        <span>Nom</span>
                        <input type='text' id="RecetteName" />
                    </div>

                    <div className="ChampTexte">
                        <span>Description</span>
                        <input type='text' id="RecetteDescription" />
                    </div>
                </div>
                <div className="IngredientsRecetteDiv">
                    <span className="IngredientTitle">Ingrédients:</span>
                    {
                        this.state.ingredients.map((ingr, index) => {
                            return  <div className="IngredientListeElement" key={ingr.id}>
                                        <span className="IngrNameListe">{ingr.name}</span>
                                        <input id={"inputQuantite" + ingr.name} type="number" defaultValue={ingr.quantite}/>
                                        <button className="BoutonSupprimer" onClick={() => {this.delete_ingr(ingr)}}>Supprimer</button>
                                    </div>
                        })
                    }

                    {
                        
                        this.state.added.map((elt, index) => {
                            return (
                                <div className="IngredientListeElement">
                                    <select className="IngredientSelect" value={this.state.added[index].name} onChange={(event) => {this.modify_ingr(index, event.target.value)}}>
                                        <option key="0" value=""></option>
                                        {this.state.ingredientList && this.state.ingredientList.map((ingr) => (
                                            <option key={ingr.id} value={ingr.id}>
                                                {ingr.name}
                                            </option>
                                        ))}
                                    </select>
                                    <input type="number" value={this.state.added[index].quantite} onChange={(event) => {this.modify_ingr(index, null, event.target.value)}}/>
                                    <button className="BoutonSupprimer" onClick={() => this.suppr_added(index)}>Supprimer</button>
                                </div>
                            )
                        })
                    }

                    {/* Ajouter un select avec comme option les this.ingredient_list */}
                    <button className="BoutonAjouterIngredient" onClick={this.add_ingr}>Ajouter un ingrédient</button>
                </div>
                <button className="BoutonOkRecette" onClick={this.modify_recette}>Valider</button>
            </div>
        );
    }
}