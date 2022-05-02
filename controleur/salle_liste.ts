// test pour ne définir que la classe et l'objet une seule fois sinon redéclaration ==> erreur
if (vueSalleListe === undefined) {
  class VueSalleListe {
    private _params: Tparams; // paramètres passées en paramètre du fichier HTML
    private _lesSalles: LesSalles; // instance pour la gestion des données de la table salle
    private _grille: GrilleTabulaire; // résultat contenu dans la grille tabulaire
    private _data: TdataSet;
    // tableau contenant le résultat d'une requête
    //retournant un tableau de lignes ; chaque ligne contenant un tableau associatif
    constructor() {
      // rien
    }
    init(params: Tparams): void {
      this._grille = new GrilleTabulaire(); // résultat contenu dans une grille tabulaire (tableau)
      this._data = [];
      this._lesSalles = new LesSalles();
      this._params = params;
      // récupération des valeurs passées en paramètre du fichier HTML
      // sous le format "?statut&id&elt1&elt2" tel que statut facultatif
      switch (this._params.id) {
        case "filtre_tous":
          this._data = this._lesSalles.listAll();
          break;
        case "filtre_etage":
          this._data = this._lesSalles.listByEtage(this._params.elts[0]);
          break;
        case "filtre_departement":
          this._data = this._lesSalles.listByDepartement(
            this._params.elts[0],
            this._params.elts[1]
          );
          break;
      }
      this._grille = APIpageWeb.showArray(
        "salle_table",
        this._data,
        "numSalle",
        true
      );
      // id conteneur, tableau de données, nom de la clé, clé visible ou pas
    }
    afficherClick(): void {
      if (this._grille.getIdSelect() !== "") {
        // est-ce qu'une ligne est sélectionnée dans le tableau ?
        const chaine = "?affi&" + this._grille.getIdSelect();
        // affichage ‘affi’ du détail de la salle sélectionnée 'id'
        APIpageWeb.showModal("salle_edit" + chaine, "gabarit_travail");
      }
    }
    modifierClick(): void {
      if (this._grille.getIdSelect() !== "") {
        // est-ce qu'une ligne est sélectionnée dans le tableau ?
        const chaine = "?modif&" + this._grille.getIdSelect();
        // affichage avec modifications 'modif' du détail de la salle sélectionnée 'id'
        APIpageWeb.showModal("salle_edit" + chaine, "gabarit_travail");
      }
    }

    ajouterClick(): void {
      const chaine = "?ajout&"; // ajout 'ajout' d'une nouvelle salle ➔ id vide
      APIpageWeb.showModal("salle_edit" + chaine, "gabarit_travail");
    }
    supprimerClick(): void {
      if (this._grille.getIdSelect() !== "") {
        // est-ce qu'une ligne est sélectionnée dans le tableau ?
        if (
          confirm(
            "Confirmez-vous la suppression de l'infraction " +
              this._grille.getIdSelect()
          )
        ) {
          let lesTypEquiptsBySalle: LesTypEquiptsBySalle =
            new LesTypEquiptsBySalle();
          // instance pour la gestion des données de la table
          // comprenant la liste des équipements par salle
          lesTypEquiptsBySalle.delete(this._grille.getIdSelect());
          // suppression dans la base des équipements de la salle
          this._lesSalles.delete(this._grille.getIdSelect());
          // suppression dans la base de la salle
          this._grille.delSelectLine(); // suppression de la ligne dans la grille tabulaire
        }
      }
    }
  }
  // eslint-disable-next-line no-var
  var vueSalleListe = new VueSalleListe();
}
vueSalleListe.init(APIpageWeb.params);
// définition des événements
(<HTMLInputElement>(
  document.querySelector("[id=salle_btn_detail]")
)).addEventListener("click", function () {
  vueSalleListe.afficherClick();
});
(<HTMLInputElement>(
  document.querySelector("[id=salle_btn_ajouter]")
)).addEventListener("click", function () {
  vueSalleListe.ajouterClick();
});
(<HTMLInputElement>(
  document.querySelector("[id=salle_btn_modifier]")
)).addEventListener("click", function () {
  vueSalleListe.modifierClick();
});
(<HTMLInputElement>(
  document.querySelector("[id=salle_btn_supprimer]")
)).addEventListener("click", function () {
  vueSalleListe.supprimerClick();
});
