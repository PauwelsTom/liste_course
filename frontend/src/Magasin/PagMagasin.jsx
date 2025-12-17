import "./PageMagasin.css"
import { Component } from "react";
import { BoutonRetour } from "../Menu_principal/BoutonRetour";
import { RequeteClass } from "../Class/Requete";
import { ArticleMagasin } from "./ArticleMagasin";
import { Categorie } from "../Liste/Categorie";

export class PageMagasin extends Component {
    constructor(props) {
        super();
        this.state = {
            ingrList: []
        }
        this.req = new RequeteClass();

        const foyer = parseInt(localStorage.getItem("foyer"));
        this.foyer = isNaN(foyer)? null: foyer;
    }

    get_ingrList = async () => {
        const l = await this.req.get_magasin_ingr(this.foyer);
        this.setState({ ingrList: l });
    }

    check_ingr = (ingr, check) => {
        // Ici je veux faire le change localement uniquement avec un setstate grace au name
        this.setState(prevState => ({
            ingrList: prevState.ingrList.map(i =>
                i.name === ingr.name ? { ...i, check: check } : i
            )
        }));
        console.log(ingr);
        this.req.ma_liste_check(ingr.id, check)
    }

    componentDidMount() {
        this.get_ingrList();
    }

    render() {
        return (
            <div>
                <BoutonRetour visible={true}/>
                <header className="HeaderBar">
                    <div onClick={this.debug}>Au magasin</div>
                </header>
                <div className="PageMagasinDiv">
                    {this.state.ingrList.map((ingr, index) => {
                        if ((index === 0 || ingr.type !== this.state.ingrList[index - 1].type)) {
                            return (
                                <div className="FirstItem">
                                    <Categorie categorie={ingr.type}/>
                                    <ArticleMagasin ingr={ingr} key={index} check_ingr={this.check_ingr}/>
                                </div>
                            )
                        } else {
                            return (
                                <ArticleMagasin ingr={ingr} key={index} check_ingr={this.check_ingr}/>
                            )
                        }
                    })}
                </div>
            </div>
        );
    }
}