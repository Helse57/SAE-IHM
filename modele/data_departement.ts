class UnDept {
  // définition de la classe gérant les données d’un département
  private _codeDept: string;
  private _nomDept: string;
  private _respDept: string;
  constructor(code_dept = "", nom_dept = "", resp_dept = "") {
    // initialisation à l’instanciation
    this._codeDept = code_dept;
    this._nomDept = nom_dept;
    this._respDept = resp_dept;
  }
  // définition des « getters » et des « setters » pour la lecture/écriture des attributs privés de la classe
  get codeDept(): string {
    return this._codeDept;
  }
  set codeDept(code_dept: string) {
    this._codeDept = code_dept;
  }
  get nomDept(): string {
    return this._nomDept;
  }
  set nomDept(nom_dept: string) {
    this._nomDept = nom_dept;
  }
  get respDept(): string {
    return this._respDept;
  }
  set respDept(resp_dept: string) {
    this._respDept = resp_dept;
  }
  toArray(): TtabAsso {
    // renvoie l’objet sous la forme d’un tableau associatif
    // pour un affichage dans une ligne d’un tableau HTML
    let tableau: TtabAsso = {
      codeDept: this.codeDept,
      nomDept: this.nomDept,
      respDept: this.respDept,
    };
    return tableau;
  }
}
type TDepts = { [key: string]: UnDept }; // tableau d’objets UnDept
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesDepts {
  // définition de la classe gérant les données de la table DEPARTEMENT
  constructor() {
    // rien
  }
  private load(result: TdataSet): TDepts {
    // à partir d’un TdataSet, conversion en tableau d’objets UnDept
    const depts: TDepts = {};
    for (let i = 0; i < result.length; i++) {
      const item: TtabAsso = result[i];
      const dept = new UnDept(
        item["code_dept"],
        item["nom_dept"],
        item["resp_dept"]
      );
      depts[dept.codeDept] = dept; // clé d’un élément du tableau : code dépt
    }
    return depts;
  }
  private prepare(where: string): string {
    // préparation de la requête avec ou sans restriction (WHERE)
    let sql: string;
    sql = "SELECT code_dept, nom_dept, resp_dept FROM DEPARTEMENT ";
    if (where !== "") {
      sql += " WHERE " + where;
    }
    return sql;
  }
  all(): TDepts {
    // renvoie le tableau d’objets contenant tous les départements
    return this.load(APIpageWeb.SQLloadData(this.prepare(""), []));
  }

  byCodeDept(code_dept: string): UnDept {
    // renvoie l’objet correspondant au département code_dept
    let dept = new UnDept();
    const depts: TDepts = this.load(
      APIpageWeb.SQLloadData(this.prepare("code_dept = ?"), [code_dept])
    );
    const lesCles: string[] = Object.keys(depts);
    // affecte les clés du tableau associatif « depts » dans le tableau de chaines « lesCles »
    if (lesCles.length > 0) {
      dept = depts[lesCles[0]]; // récupérer le 1er élément du tableau associatif « depts »
    }
    return dept;
  }
  toArray(depts: TDepts): TdataSet {
    // renvoie le tableau d’objets sous la forme d’un tableau de tableaux associatifs
    // pour un affichage dans un tableau HTML
    let T: TdataSet = [];
    for (let id in depts) {
      T.push(depts[id].toArray());
    }
    return T;
  }
}
