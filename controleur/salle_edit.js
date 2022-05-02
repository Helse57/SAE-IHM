"use strict";
// test pour ne définir que la classe et l'objet une seule fois sinon redéclaration ==> erreur
if (vueSalleEdit === undefined) {
    class VueSalleEdit {
        constructor() {
            // rien
        }
        initMsgErreur() {
            this._msgErreur = {
                erreur_num: {
                    correct: "",
                    vide: "Le numéro de salle doit être renseigné.",
                    inconnu: "",
                    doublon: "Le numéro de salle est déjà attribué.",
                },
                erreur_etage: {
                    correct: "",
                    vide: "L'étage doit être renseigné.",
                    inconnu: "",
                    doublon: "",
                },
                erreur_dept: {
                    correct: "",
                    vide: "Le département doit être renseigné.",
                    inconnu: "Département inconnu.",
                    doublon: "",
                },
                erreur_equipt: {
                    correct: "",
                    vide: "La salle doit contenir au moins un équipement.",
                    inconnu: "",
                    doublon: "",
                },
            };
            this._erreur = {};
            if (this._params.statut !== "ajout") {
                // affi ou modif
                for (let id in this._msgErreur) {
                    this._erreur[id] = "vide";
                }
            }
        }
        init(params) {
            this._lesSalles = new LesSalles();
            this._salle = new UneSalle();
            this._params = params;
            this._input = {
                num: document.querySelector("[id=salle_edt_num]"),
                lib: document.querySelector("[id=salle_edt_lib]"),
                etage: document.querySelector("[id=salle_edt_etage]"),
                codeDept: document.querySelector("[id=salle_edt_codedept]"),
            };
            this.initMsgErreur();
            let titre;
            switch (this._params.statut) {
                case "ajout":
                    titre = "Nouvelle salle";
                    break;
                case "modif":
                    titre = "Modification d'une salle";
                    break;
                default:
                    titre = "Détail d'une salle";
            }
            (document.querySelector("[id=salle_titre]")).textContent = titre;
            if (this._params.statut !== "ajout") {
                // affi ou modif
                this._salle = this._lesSalles.byNumSalle(params.id); // données salle passée en paramètre
                this._input.num.value = this._salle.numSalle;
                this._input.lib.value = this._salle.libSalle;
                this._input.etage.value = this._salle.etage;
                this._input.codeDept.value = this._salle.codeDept;
                for (let i in this._input) {
                    this._input[i].readOnly = this._params.statut === "affi";
                }
                this._input.num.readOnly = true;
                this._erreur["erreur_num"] = "correct"; // pas de risque d’erreur sur n° salle car lecture seule
                this.detailDepartement(this._salle.codeDept); // affichage detail du département
            }
            (document.querySelector("[id=salle_btn_retour]")).hidden = this._params.statut !== "affi";
            (document.querySelector("[id=salle_btn_valider]")).hidden = this._params.statut === "affi";
            (document.querySelector("[id=salle_btn_annuler]")).hidden = this._params.statut === "affi";
            let chaine = "?" + this._params.statut + "&" + this._params.id;
            APIpageWeb.show("salle_equipement" + chaine, "salle_equipement");
            // affichage page HTML des équipements d’une salle
        }
        verifNum(valeur) {
            // num_salle vide ? existe déjà dans la table SALLE ?
            this._erreur["erreur_num"] = "correct";
            const chaine = valeur.trim();
            if (chaine.length > 0) {
                if (this._params.statut == "ajout" &&
                    this._lesSalles.idExiste(chaine)) {
                    this._erreur["erreur_num"] = "doublon";
                }
            }
            else
                this._erreur["erreur_num"] = "vide";
        }
        verifEtage(valeur) {
            // étage vide ?
            this._erreur["erreur_etage"] = "correct";
            const chaine = valeur.trim();
            if (chaine.length === 0) {
                this._erreur["erreur_etage"] = "vide";
            }
        }
        detailDepartement(valeur) {
            const lesDepts = new LesDepts();
            const detail = (document.querySelector("[id=salle_departement]"));
            detail.textContent = "";
            this._erreur["erreur_dept"] = "correct";
            const chaine = valeur.trim();
            if (chaine.length > 0) {
                // code dépt non vide
                const dept = lesDepts.byCodeDept(chaine);
                if (dept.codeDept !== "") {
                    // département trouvé
                    detail.textContent =
                        dept.nomDept + "\r\n" + "Responsable : " + dept.respDept;
                }
                else {
                    this._erreur["erreur_dept"] = "inconnu";
                    detail.textContent = this._msgErreur["erreur_dept"]["inconnu"];
                }
            }
            else
                this._erreur["erreur_dept"] = "vide";
        }
        retourClick() {
            // cacher contenu “gabarit_travail”
            APIpageWeb.hide("gabarit_travail");
        }
        validerClick() {
            let correct = true;
            this.verifNum(this._input.num.value);
            this.verifEtage(this._input.etage.value);
            this.detailDepartement(this._input.codeDept.value);
            if (vueSalleEquipement.grille.count() == 0) {
                this._erreur["erreur_equipt"] = "vide";
            }
            else
                this._erreur["erreur_equipt"] = "correct";
            // formulaire contient-il des erreurs ?
            for (let id in this._erreur) {
                (document.querySelector("[id=" + id + "]")).textContent = "";
                if (this._erreur[id] !== "correct") {
                    // non correct ==> erreur
                    if (this._msgErreur[id][this._erreur[id]] != "") {
                        // erreur
                        (document.querySelector("[id=" + id + "]")).textContent = this._msgErreur[id][this._erreur[id]];
                        correct = false;
                    }
                }
            }
            // aucune erreur ➔ sauvegarde de la salle
            if (correct) {
                this._salle.numSalle = this._input.num.value;
                this._salle.libSalle = this._input.lib.value;
                this._salle.etage = this._input.etage.value;
                this._salle.codeDept = this._input.codeDept.value;
                if (this._params.statut === "ajout") {
                    this._lesSalles.insert(this._salle);
                }
                else {
                    this._lesSalles.update(this._salle);
                }
                const lesTypEquiptsBySalle = new LesTypEquiptsBySalle();
                lesTypEquiptsBySalle.delete(this._salle.numSalle);
                lesTypEquiptsBySalle.insert(this._salle.numSalle, vueSalleEquipement.data);
                this.retourClick();
            }
        }
    }
    // eslint-disable-next-line no-var
    var vueSalleEdit = new VueSalleEdit();
}
vueSalleEdit.init(APIpageWeb.params);
// définition des événements
(document.querySelector("[id=salle_edt_codedept]")).addEventListener("change", function () {
    vueSalleEdit.detailDepartement(this.value);
});
// changement du code dépt ➔ affichage des infos du département saisi
(document.querySelector("[id=salle_btn_retour]")).addEventListener("click", function () {
    vueSalleEdit.retourClick();
});
(document.querySelector("[id=salle_btn_annuler]")).addEventListener("click", function () {
    vueSalleEdit.retourClick();
});
(document.querySelector("[id=salle_btn_valider]")).addEventListener("click", function () {
    vueSalleEdit.validerClick();
});
//# sourceMappingURL=salle_edit.js.map