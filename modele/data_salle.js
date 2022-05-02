"use strict";
class UneSalle {
    constructor(num_salle = "", lib_salle = "", etage = "", code_dept = "") {
        this._numSalle = num_salle;
        this._libSalle = lib_salle;
        this._etage = etage;
        this._codeDept = code_dept;
    }
    // définition des « getters » et des « setters » pour les attributs privés de la classe
    get numSalle() {
        return this._numSalle;
    }
    set numSalle(num_salle) {
        this._numSalle = num_salle;
    }
    get libSalle() {
        return this._libSalle;
    }
    set libSalle(lib_salle) {
        this._libSalle = lib_salle;
    }
    get etage() {
        return this._etage;
    }
    set etage(etage) {
        this._etage = etage;
    }
    get codeDept() {
        return this._codeDept;
    }
    set codeDept(code_dept) {
        this._codeDept = code_dept;
    }
    toArray() {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        const tableau = {
            numSalle: this._numSalle,
            libSalle: this._libSalle,
            etage: this.etage,
            codeDept: this._codeDept,
        };
        return tableau;
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesSalles {
    // définition de la classe gérant les données de la table SALLE
    constructor() {
        // rien
    }
    // les méthodes commençant par « list » traitent les données filtrées (toutes les salles, salles d’un
    // étage, salles d’un département) afin de renvoyer le résultat dans un tableau de tableaux associatifs
    // pour un affichage dans un tableau HTML
    listPrepare(where) {
        // préparation de la requête avec ou sans restriction (WHERE)
        // pour une liste avec des données venant de tables liées
        let sql;
        sql = "SELECT num_salle as numSalle, lib_salle as libSalle, etage ";
        sql += " ,SALLE.code_dept as codeDept, nom_dept as nomDept";
        sql +=
            " FROM SALLE JOIN DEPARTEMENT ON SALLE.code_dept = DEPARTEMENT.code_dept";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        sql += " ORDER BY etage ";
        return sql;
    }
    listAll() {
        // renvoie un tableau de tableaux associatifs de toutes les salles
        // pour un affichage dans un tableau HTML
        return APIpageWeb.SQLloadData(this.listPrepare(""), []);
    }
    listByEtage(etage) {
        // renvoie un tableau de tableaux associatifs des salles d’un étage
        // pour un affichage dans un tableau HTML
        return APIpageWeb.SQLloadData(this.listPrepare("etage = ?"), [etage]);
    }
    listByDepartement(code_dept, nom_dept) {
        // renvoie un tableau de tableaux associatifs des salles d’un département
        // par le code partiel ou le nom partiel d’un département pour un affichage dans un tableau HTML
        return APIpageWeb.SQLloadData(this.listPrepare("SALLE.code_dept LIKE CONCAT('%',?,'%') OR nom_dept LIKE CONCAT('%',?,'%') "), [code_dept, nom_dept]);
    }
    idExiste(num_salle) {
        // renvoie le test d’existence d’une salle dans la table
        // sert pour l’ajout d’une nouvelle salle
        return (APIpageWeb.SQLloadData("SELECT num_salle FROM SALLE WHERE num_salle=?", [
            num_salle,
        ]).length > 0);
    }
    load(result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UneSalle
        let salles = {};
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            const salle = new UneSalle(item["num_salle"], item["lib_salle"], item["etage"], item["code_dept"]);
            salles[salle.numSalle] = salle; // clé d’un élément du tableau : num salle
        }
        return salles;
    }
    prepare(where) {
        // préparation de la requête avec ou sans restriction (WHERE)
        let sql;
        sql = "SELECT num_salle, lib_salle, etage, code_dept ";
        sql += " FROM SALLE";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    }
    all() {
        // renvoie le tableau d’objets contenant toutes les salles
        return this.load(APIpageWeb.SQLloadData(this.prepare(""), []));
    }
    byNumSalle(num_salle) {
        // renvoie l’objet correspondant à la salle num_salle
        let salle = new UneSalle();
        const salles = this.load(APIpageWeb.SQLloadData(this.prepare("num_salle = ?"), [num_salle]));
        const lesCles = Object.keys(salles);
        // affecte les clés du tableau associatif « salles » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            salle = salles[lesCles[0]]; // récupérer le 1er élément du tableau associatif « salles »
        }
        return salle;
    }
    toArray(salles) {
        // renvoie le tableau d’objets sous la forme
        // d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        let T = [];
        for (let id in salles) {
            T.push(salles[id].toArray());
        }
        return T;
    }
    delete(num_salle) {
        // requête de suppression d’une salle dans la table
        let sql;
        sql = "DELETE FROM SALLE WHERE num_salle = ?";
        return APIpageWeb.SQLexec(sql, [num_salle]); // requête de manipulation : utiliser SQLexec
    }
    insert(salle) {
        // requête d’ajout d’une salle dans la table
        let sql; // requête de manipulation : utiliser SQLexec
        sql =
            "INSERT INTO SALLE(num_salle, lib_salle, etage, code_dept ) VALUES (?, ?, ?, ?)";
        return APIpageWeb.SQLexec(sql, [
            salle.numSalle,
            salle.libSalle,
            salle.etage,
            salle.codeDept,
        ]);
    }
    update(salle) {
        // requête de modification d’une salle dans la table
        let sql;
        sql = "UPDATE SALLE SET lib_salle = ?, etage = ?, code_dept = ? ";
        sql += " WHERE num_salle = ?"; // requête de manipulation : utiliser SQLexec
        return APIpageWeb.SQLexec(sql, [
            salle.libSalle,
            salle.etage,
            salle.codeDept,
            salle.numSalle,
        ]);
    }
}
//# sourceMappingURL=data_salle.js.map