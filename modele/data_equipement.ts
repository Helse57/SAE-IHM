class UnTypEquipt {
    private _idEquipt: string;
    private _libEquipt: string;
    private _commentaire: string;
    constructor(id_equipt = "", lib_equipt = "", commentaire = "") {
        // initialisation à l’instanciation
        this._idEquipt = id_equipt;
        this._libEquipt = lib_equipt;
        this._commentaire = commentaire;
    }
    // définition des « getters » et des « setters » pour les attributs privés de la classe
    get idEquipt(): string {
        return this._idEquipt;
    }
    set idEquipt(id_equipt: string) {
        this._idEquipt = id_equipt;
    }
    get libEquipt(): string {
        return this._libEquipt;
    }
    set libEquipt(lib_equipt: string) {
        this._libEquipt = lib_equipt;
    }
    get commentaire(): string {
        return this._commentaire;
    }
    set commentaire(commentaire: string) {
        this._commentaire = commentaire;
    }
    toArray(): TtabAsso {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau: TtabAsso = {
            idEquipt: this._idEquipt,
            libEquipt: this._libEquipt,
            commentaire: this._commentaire,
        };
        return tableau;
    }
}

type TTypEquipts = { [key: string]: UnTypEquipt }; // tableau d’objets UnTypEquipt
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesTypEquipts {
    // définition de la classe gérant les données de la table TYPE_EQUIPT
    constructor() {
        // rien
    }
    private load(result: TdataSet): TTypEquipts {
        // à partir d’un TdataSet, conversion en tableau d’objets UnTypEquipt
        let typEquipts: TTypEquipts = {};
        for (let i = 0; i < result.length; i++) {
            const item: TtabAsso = result[i];
            const typEquipt = new UnTypEquipt(
                item["id_equipt"],
                item["lib_equipt"],
                item["commentaire"]
            );
            typEquipts[typEquipt.idEquipt] = typEquipt; // clé d’un élément du tableau : id equipt
        }
        return typEquipts;
    }
    private prepare(where: string): string {
        // préparation de la requête avec ou sans restriction (WHERE)
        let sql: string;
        sql = "SELECT id_equipt, lib_equipt, commentaire";
        sql += " FROM TYPE_EQUIPT";
        if (where.trim() !== "") {
            sql += " WHERE " + where;
        }
        sql += " ORDER BY lib_equipt ASC ";
        return sql;
    }
    all(): TTypEquipts {
        // renvoie le tableau d’objets contenant tous les équipements
        return this.load(APIpageWeb.SQLloadData(this.prepare(""), []));
    }
    byIdEquipt(id_equipt: string): UnTypEquipt {
        // renvoie l’objet correspondant à l’équipement id_equipt
        let typEquipt = new UnTypEquipt();
        const typEquipts: TTypEquipts = this.load(
            APIpageWeb.SQLloadData(this.prepare("id_equipt = ?"), [id_equipt])
        );
        const lesCles: string[] = Object.keys(typEquipts);
        // affecte les clés du tableau associatif « typEquipts » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            typEquipt = typEquipts[lesCles[0]]; // récupérer le 1er élément du tableau associatif « typEquipts »
        }
        return typEquipt;
    }
    toArray(typEquipts: TTypEquipts): TdataSet {
        // renvoie le tableau d’objets sous la forme
        // d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        let T: TdataSet = [];
        for (let id in typEquipts) {
            T.push(typEquipts[id].toArray());
        }
        return T;
    }
}

class UnTypEquiptBySalle extends UnTypEquipt {
    // classe hérite de UnTypEquipt
    private _qte: string;
    constructor(id_equipt = "", lib_equipt = "", commentaire = "", qte = "") {
        // attributs de TYPE_EQUIPT auxquelles on ajouter l’attribut « qte » de la relation « contient »
        super(id_equipt, lib_equipt, commentaire); // appel de la méthode __constructor de « UnTypEquipt »
        this._qte = qte;
    }
    // définition des « getters » et des « setters » pour les attributs privés de la classe
    get qte() {
        return this._qte;
    }
    set qte(qte: string) {
        this._qte = qte;
    }
    toArray(): TtabAsso {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau = super.toArray(); // appel de la méthode « toArray » de « UnTypEquipt »
        tableau["qte"] = this.qte;
        return tableau;
    }
}
type TTypEquiptsBySalle = { [key: string]: UnTypEquiptBySalle };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesTypEquiptsBySalle {
    constructor() {
        // rien
    }
    private load(result: TdataSet): TTypEquiptsBySalle {
        // à partir d’un TdataSet, conversion en tableau d’objets UnTypEquiptBySalle
        let typEquiptsBySalle: TTypEquiptsBySalle = {};
        for (let i = 0; i < result.length; i++) {
            const item: TtabAsso = result[i];
            const typEquiptBySalle = new UnTypEquiptBySalle(
                item["id_equipt"],
                item["lib_equipt"],
                item["commentaire"],
                item["qte"]
            );
            typEquiptsBySalle[typEquiptBySalle.idEquipt] = typEquiptBySalle;
        }
        return typEquiptsBySalle;
    }
    private prepare(where: string): string {
        let sql: string;
        sql =
            "SELECT contient.id_equipt as id_equipt, lib_equipt, commentaire, qte";
        sql +=
            " FROM contient JOIN TYPE_EQUIPT ON contient.id_equipt=TYPE_EQUIPT.id_equipt";
        if (where.trim() !== "") {
            sql += " WHERE " + where;
        }
        sql += " ORDER BY lib_equipt ";
        return sql;
    }

    byNumSalle(num_salle: string): TTypEquiptsBySalle {
        // renvoie le tableau d’objets contenant tous les équipements de la salle num salle
        return this.load(
            APIpageWeb.SQLloadData(this.prepare("num_salle = ?"), [num_salle])
        );
    }
    byNumSalleIdEquipt(num_salle: string, id_equipt: string): UnTypEquiptBySalle {
        // renvoie l’objet de l’équipement id_equipt contenu dans la salle num_salle
        let typEquiptBySalle = new UnTypEquiptBySalle();
        let typEquiptsBySalle: TTypEquiptsBySalle = this.load(
            APIpageWeb.SQLloadData(this.prepare("num_salle = ? and id_equipt = ?"), [
                num_salle,
                id_equipt,
            ])
        );
        if (!typEquiptsBySalle[0] === undefined) {
            typEquiptBySalle = typEquiptsBySalle[0];
        }
        return typEquiptBySalle;
    }
    toArray(typEquipts: TTypEquiptsBySalle): TdataSet {
        let T: TdataSet = [];
        for (let id in typEquipts) {
            T.push(typEquipts[id].toArray());
            delete T[T.length - 1].commentaire; // pas besoin du commentaire pour l'affichage dans le tableau
        }
        return T;
    }
    getTotalNbEquipt(typEquipts: TTypEquiptsBySalle): string {
        // renvoie la quantité totale d’équipements d’une salle
        let total = 0;
        for (let id in typEquipts) {
            total += Number(typEquipts[id].qte);
        }
        return total.toString();
    }
    delete(num_salle: string): boolean {
        // requête de suppression des équipements d’une salle dans «contient»
        let sql: string;
        sql = "DELETE FROM contient WHERE num_salle = ?";
        return APIpageWeb.SQLexec(sql, [num_salle]); // requête de manipulation : utiliser SQLexec
    }
    insert(num_salle: string, typEquipts: TTypEquiptsBySalle): boolean {
        // requête d’ajout des équipements avec une quantité dans « contient » installé dans « num_salle »
        let sql: string;
        let separateur = "";
        sql = "INSERT INTO contient(num_salle,id_equipt, qte) VALUES ";
        for (let cle in typEquipts) {
            sql +=
                separateur +
                "('" +
                num_salle +
                "','" +
                typEquipts[cle].idEquipt +
                "','" +
                typEquipts[cle].qte +
                "')";
            separateur = ",";
        }
        return APIpageWeb.SQLexec(sql, []);
    }
}
