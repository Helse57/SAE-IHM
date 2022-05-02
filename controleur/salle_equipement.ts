// test pour ne définir que la classe et l'objet une seule fois sinon redéclaration ==> erreur
if (vueSalleEquipement === undefined) {
  class VueSalleEquipement {
    private _params: Tparams;
    private _grille: GrilleTabulaire;
    private _lesTypEquiptsBySalle: LesTypEquiptsBySalle;
    private _data: TTypEquiptsBySalle;
    constructor() {
      // rien
    }
    get data(): TTypEquiptsBySalle {
      return this._data;
    }
    get grille(): GrilleTabulaire {
      return this._grille;
    }
    init(params: Tparams): void {
      this._grille = new GrilleTabulaire();
      this._data = {};
      this._lesTypEquiptsBySalle = new LesTypEquiptsBySalle();
      this._params = params;
      (<HTMLElement>(
        document.querySelector("[id=equipement_btn_supprimer")
      )).hidden = this._params.statut === "affi";
      (<HTMLElement>(
        document.querySelector("[id=equipement_btn_ajouter]")
      )).hidden = this._params.statut === "affi";
      (<HTMLElement>(
        document.querySelector("[id=equipement_btn_modifier]")
      )).hidden = this._params.statut === "affi";
      this._data = this._lesTypEquiptsBySalle.byNumSalle(this._params.id);
      this.affiGrille();
    }
    affiGrille(): void {
      this._grille = APIpageWeb.showArray(
        "equipement_table",
        this._lesTypEquiptsBySalle.toArray(this._data),
        "idEquipt",
        false
      );
      // id conteneur, données, nom de la clé, clé visible ou pas
      this.affiTotalDelit();
    }
    affiTotalDelit(): void {
      (<HTMLSpanElement>(
        document.querySelector("[id=equipement_total]")
      )).textContent = this._lesTypEquiptsBySalle.getTotalNbEquipt(this._data);
    }
    ajouterClick(): void {
      let chaine = "?ajout&"; // mode ajout ==> id vide
      for (let i in this._data) {
        chaine = chaine + "&" + this._data[i].idEquipt;
      }
      APIpageWeb.showModal(
        "salle_equipement_edit" + chaine,
        "salle_equipement_edit"
      );
    }
    modifierClick(): void {
      if (this._grille.getIdSelect() !== "") {
        // est-ce qu'une ligne est sélectionnée dans le tableau ?
        const chaine =
          "?modif&" +
          this._grille.getIdSelect() +
          "&" +
          this._data[this._grille.getIdSelect()].qte;
        APIpageWeb.showModal(
          "salle_equipement_edit" + chaine,
          "salle_equipement_edit"
        );
      }
    }
    supprimerClick(): void {
      if (this._grille.getIdSelect() !== "") {
        // est-ce qu'une ligne est sélectionnée dans le tableau ?
        delete this._data[this._grille.getIdSelect()];
        this.affiGrille();
      }
    }
  }
  // eslint-disable-next-line no-var
  var vueSalleEquipement = new VueSalleEquipement();
}
vueSalleEquipement.init(APIpageWeb.params);
// définition des événements
(<HTMLInputElement>(
  document.querySelector("[id=equipement_btn_ajouter]")
)).addEventListener("click", function () {
  vueSalleEquipement.ajouterClick();
});
(<HTMLInputElement>(
  document.querySelector("[id=equipement_btn_modifier]")
)).addEventListener("click", function () {
  vueSalleEquipement.modifierClick();
});
(<HTMLInputElement>(
  document.querySelector("[id=equipement_btn_supprimer]")
)).addEventListener("click", function () {
  vueSalleEquipement.supprimerClick();
});
