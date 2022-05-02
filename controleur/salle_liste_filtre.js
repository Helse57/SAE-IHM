"use strict";
// test pour ne définir que la classe et l'objet une seule fois sinon redéclaration ==> erreur
if (vueSalleFiltre === undefined) {
    class VueSalleFiltre {
        constructor() {
            // rien
        }
        init() {
            this.idSelect = "";
            document.querySelector("[id=filtre_recherche]").hidden =
                true;
            // aucun filtre déployé
            this.aucuneSelection(); // aucun filtre sélectionné
        }
        itemClick(event) {
            const cible = event.target; // clic dans la div "filtre_choix
            // test si clic sur une div qui est le titre d'un filtre
            // tel que balise name='bouton', par exemple : "filtre_etage_btn"
            if (cible.getAttribute("name") === "bouton") {
                this.aucuneSelection(); // retirer sélection actuelle
                const choixSelect = cible.parentNode;
                // div parent, par exemple "filtre_etage" est parent de "filtre_etage_btn"
                this.idSelect = choixSelect.id; // "filtre_etage"
                cible.nextElementSibling.style.display = "";
                // div complète dépliée (rendre visible l'élément suivant de "filtre_etage_btn", càd "filtre_etage_edit")
                cible.classList.add("pnlselection");
                // mise en évidence de la div sélectionnée : "filtre_etage"
                const divRecherche = (document.querySelector("[id=filtre_recherche]"));
                // div contenant le bouton "rechercher"
                if (this.idSelect === "filtre_tous") {
                    divRecherche.hidden = true;
                    // choix "tous" ==> inutile d'afficher la div contenant le bouton "Rechercher"
                    this.rechercherClick(); // simuler clic sur le bouton "Rechercher"
                }
                else {
                    divRecherche.hidden = false; // afficher la div contenant le bouton "Rechercher"
                    choixSelect.appendChild(divRecherche);
                    // afficher dans le filtre sélectionné, la div contenant le bouton "Rechercher"
                }
            }
        }
        aucuneSelection() {
            // lister les div 'bouton' du filtre choix
            const choix = document.querySelector("[id=filtre_choix]");
            const lesBoutons = choix.querySelectorAll("[name=bouton]");
            for (let bouton of lesBoutons) {
                // cacher le noeud (partie saisie) qui suit et retirer la style 'pnlselection' de la liste des styles
                bouton.nextElementSibling.style.display = "none";
                bouton.classList.remove("pnlselection");
                // réinitialiser (vider) toutes les zones de saisie du filtre
                const lesInputs = choix.querySelectorAll("input");
                for (let input of lesInputs) {
                    if (input.type === "text") {
                        // vider uniquement le contenu des champs de saisie
                        input.value = "";
                    }
                }
            }
        }
        rechercherClick() {
            let chaine = "";
            // récupération des zones de saisie (input) du filtre sélectionné
            const choix = (document.querySelector("[id=" + this.idSelect + "_edit]"));
            const lesInputs = choix.querySelectorAll("input");
            // passage de paramètres (méthode la plus courante) :
            // passage de paramètres d'un fichier html à un autre
            // avec ? pour le 1er paramètre et & pour les autres paramètres
            chaine = "?" + encodeURIComponent(this.idSelect);
            // permet d'encoder un composant d'un Uniform Resource Identifier (URI)
            // en remplaçant chaque exemplaire de certains caractères
            // par une, deux, trois ou quatres séquences d'échappement UTF-8 correspondantes
            // ajout des valeurs input dans la chaine des paramètres à passer à la page « salle_liste »
            for (let input of lesInputs) {
                chaine += "&" + encodeURIComponent(input.value);
            }
            // cacher la zone du bouton « rechercher »
            document.querySelector("[id=filtre_recherche]").hidden =
                true;
            // appel API +chaine ou params sont facultatifs
            APIpageWeb.show("salle_liste" + chaine, "gabarit_travail");
        }
    }
    // eslint-disable-next-line no-var
    var vueSalleFiltre = new VueSalleFiltre();
}
vueSalleFiltre.init();
// définition des événements
document.querySelector("[id=filtre_choix]").addEventListener("click", function (event) {
    vueSalleFiltre.itemClick(event);
});
document.querySelector("[id=btn_rechercher]").addEventListener("click", function () {
    vueSalleFiltre.rechercherClick();
});
//# sourceMappingURL=salle_liste_filtre.js.map