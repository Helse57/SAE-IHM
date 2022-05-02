"use strict";
// test pour ne définir que la classe et l'objet une seule fois sinon redéclaration ==> erreur
if (vueSalleEquipementEdit === undefined) {
    class VueSalleEquipementEdit {
        constructor() {
            // rien
        }
        init(params) {
            this._data = {};
            this._lesTypEquipts = new LesTypEquipts();
            this._params = params;
            const liste = (document.querySelector("[id=equipement_select]"));
            if (this._params.statut === "ajout") {
                this._data = this._lesTypEquipts.all();
                const equiptsSalle = this._params.elts;
                // tableau contenant les id des équipements dejà dans la salle
                for (let i in this._data) {
                    const item = this._data[i];
                    const id = item.idEquipt;
                    if (equiptsSalle.indexOf(id) === -1) {
                        // pas dans la liste des équipement déjà dans la salle
                        liste.options.add(new Option(item.libEquipt, id)); // text, value
                    }
                }
            }
            else {
                // modification uniqument de la quantité possible
                const unTypEquipt = this._lesTypEquipts.byIdEquipt(this._params.id);
                liste.options.add(new Option(unTypEquipt.libEquipt, this._params.id)); // text, value
                liste.selectedIndex = 0;
                (document.querySelector("[id=equipement_edt_qte]")).value = this._params.elts[0];
            }
        }
        annuler() {
            APIpageWeb.hide("salle_equipement_edit");
        }
        valider() {
            const erreurQte = (document.querySelector("[id=erreur_qte]"));
            const erreurSelect = (document.querySelector("[id=erreur_select]"));
            erreurQte.textContent = "";
            erreurSelect.textContent = "";
            const cible = (document.querySelector("[id=equipement_select]"));
            if (cible.value !== "") {
                const valeur = (document.querySelector("[id=equipement_edt_qte]")).value;
                if (Number.isInteger(Number(valeur)) && Number(valeur) > 0) {
                    if (this._params.statut === "ajout") {
                        // ajout visuel de la ligne dans la grille tabulaire de la liste des équipements d'une salle
                        const unTypEquipt = this._lesTypEquipts.byIdEquipt(cible.value);
                        const unTypEquiptBySalle = new UnTypEquiptBySalle(unTypEquipt.idEquipt, unTypEquipt.libEquipt, unTypEquipt.commentaire, valeur);
                        vueSalleEquipement.data[unTypEquipt.idEquipt] = unTypEquiptBySalle;
                    }
                    else {
                        // modification de la quantité dans les données de la grille tabulaire
                        vueSalleEquipement.data[this._params.id].qte = valeur;
                    }
                    vueSalleEquipement.affiGrille();
                    this.annuler();
                }
                else {
                    erreurQte.textContent =
                        "La quantité doit être un nombre entier supérieur à 0";
                }
            }
            else {
                erreurSelect.textContent = "Aucun équipement choisi.";
            }
        }
    }
    // eslint-disable-next-line no-var
    var vueSalleEquipementEdit = new VueSalleEquipementEdit();
}
vueSalleEquipementEdit.init(APIpageWeb.params);
(document.querySelector("[id=equipement_btn_valider]")).addEventListener("click", function () {
    vueSalleEquipementEdit.valider();
});
(document.querySelector("[id=equipement_btn_annuler]")).addEventListener("click", function () {
    vueSalleEquipementEdit.annuler();
});
//# sourceMappingURL=salle_equipement_edit.js.map