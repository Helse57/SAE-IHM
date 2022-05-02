"use strict";
// type interne pour la gestion des données gérées par une grille tabulaire
class GrilleTabulaire {
    constructor() {
        // gestion de l'affichage d'une grille tabulaire
        this.dataSet = { data: [], cleId: "", valeurId: "", ligneSelect: undefined, cleVisible: true };
    }
    show(tableId, dataSet, cleId, cleVisible) {
        // afficher une liste sous la forme d'une table : balise <TABLE> en HTML
    }
    getIdSelect() {
        // renvoie l'identifiant de la ligne sélectionnée dans le tableau
        return "";
    }
    getData() {
        return this.dataSet['data'];
        // renvoie le tableau de données affichées
    }
    addLine(tab2) {
        // ajouter des lignes complètes dans la liste
    }
    delSelectLine() {
        // supprimer la ligne sélectionnée de la liste
    }
    count() {
        return this.dataSet['data'].length;
        // renovie le nombre de lignes de la liste
    }
}
class PageWeb {
    constructor(cheminHTML, fichier, http, css) {
        this.fichierAPI = http + 'loadHTML.php';
        this.spExec = http + 'spExec.php';
        this.cheminHTML = cheminHTML;
        this.http = http;
        this.css = css;
        this.pile = {};
        this.grille = {};
        this.params = { statut: "", id: "", elts: [] };
        this.show(fichier, "body");
    }
    showArray(tableId, dataSet, cleId, cleVisible = true) {
        // instanciation d'un nouvel objet de la table "grille", appel de la méthode show de "grille" et retour de l'objet grille créé
        return this.grille[tableId];
    }
    show(fichier, id, modal = false) {
        // affichage de la page HTML de nom "fichier" dans la balise identifie par "id" en mode "modal" ou pas
    }
    showModal(fichier, id) {
        // affichage de la page HTML de nom "fichier" dans la balise identifié par la valeur de "id" en mode "modal"
    }
    hide(id) {
        // cache la fenêtre "id" 
    }
    close() {
        // ferme l'application
    }
    SQLexec(sp, params) {
        // exécute une requête de manipulation (insert, update, delete)
        return true;
    }
    SQLloadData(sp, params, req = 'interrogation') {
        // exécute une requête d'interrogation et retourne le résultat soit un tableau d'objets, soit un tableau de tableaux associatifs
        let resultat = [];
        return resultat;
    }
    bdOpen(host, port, bdname, user, pwd, charset = 'utf8', driver = 'mysql') {
        // ouvrir une base de données
    }
}
// eslint-disable-next-line no-var
var APIpageWeb;
//# sourceMappingURL=pageWeb_signature.js.map