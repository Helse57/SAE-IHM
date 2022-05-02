class UneSalle {
  private _numSalle: string;
  private _libSalle: string;
  private _etage: string;
  private _codeDept: string;
  constructor(num_salle = "", lib_salle = "", etage = "", code_dept = "") {
    this._numSalle = num_salle;
    this._libSalle = lib_salle;
    this._etage = etage;
    this._codeDept = code_dept;
  }
  // définition des « getters » et des « setters » pour les attributs privés de la classe
  get numSalle(): string {
    return this._numSalle;
  }
  set numSalle(num_salle: string) {
    this._numSalle = num_salle;
  }
  get libSalle(): string {
    return this._libSalle;
  }
  set libSalle(lib_salle: string) {
    this._libSalle = lib_salle;
  }
  get etage(): string {
    return this._etage;
  }
  set etage(etage: string) {
    this._etage = etage;
  }
  get codeDept(): string {
    return this._codeDept;
  }
  set codeDept(code_dept: string) {
    this._codeDept = code_dept;
  }
  toArray(): TtabAsso {
    // renvoie l’objet sous la forme d’un tableau associatif
    // pour un affichage dans une ligne d’un tableau HTML
    const tableau: TtabAsso = {
      numSalle: this._numSalle,
      libSalle: this._libSalle,
      etage: this.etage,
      codeDept: this._codeDept,
    };
    return tableau;
  }
}

type TSalles = { [key: string]: UneSalle }; // tableau d’objets UneSalle
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesSalles {
  // définition de la classe gérant les données de la table SALLE
  constructor() {
    // rien
  }
  // les méthodes commençant par « list » traitent les données filtrées (toutes les salles, salles d’un
  // étage, salles d’un département) afin de renvoyer le résultat dans un tableau de tableaux associatifs
  // pour un affichage dans un tableau HTML
  private listPrepare(where: string): string {
    // préparation de la requête avec ou sans restriction (WHERE)
    // pour une liste avec des données venant de tables liées
    let sql: string;
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
  listAll(): TdataSet {
    // renvoie un tableau de tableaux associatifs de toutes les salles
    // pour un affichage dans un tableau HTML
    return APIpageWeb.SQLloadData(this.listPrepare(""), []);
  }
  listByEtage(etage: string): TdataSet {
    // renvoie un tableau de tableaux associatifs des salles d’un étage
    // pour un affichage dans un tableau HTML
    return APIpageWeb.SQLloadData(this.listPrepare("etage = ?"), [etage]);
  }
  listByDepartement(code_dept: string, nom_dept: string): TdataSet {
    // renvoie un tableau de tableaux associatifs des salles d’un département
    // par le code partiel ou le nom partiel d’un département pour un affichage dans un tableau HTML
    return APIpageWeb.SQLloadData(
      this.listPrepare(
        "SALLE.code_dept LIKE CONCAT('%',?,'%') OR nom_dept LIKE CONCAT('%',?,'%') "
      ),
      [code_dept, nom_dept]
    );
  }
  idExiste(num_salle: string): boolean {
    // renvoie le test d’existence d’une salle dans la table
    // sert pour l’ajout d’une nouvelle salle
    return (
      APIpageWeb.SQLloadData("SELECT num_salle FROM SALLE WHERE num_salle=?", [
        num_salle,
      ]).length > 0
    );
  }
  private load(result: TdataSet): TSalles {
    // à partir d’un TdataSet, conversion en tableau d’objets UneSalle
    let salles: TSalles = {};
    for (let i = 0; i < result.length; i++) {
      const item: TtabAsso = result[i];
      const salle = new UneSalle(
        item["num_salle"],
        item["lib_salle"],
        item["etage"],
        item["code_dept"]
      );
      salles[salle.numSalle] = salle; // clé d’un élément du tableau : num salle
    }
    return salles;
  }

  private prepare(where: string): string {
    // préparation de la requête avec ou sans restriction (WHERE)
    let sql: string;
    sql = "SELECT num_salle, lib_salle, etage, code_dept ";
    sql += " FROM SALLE";
    if (where !== "") {
      sql += " WHERE " + where;
    }
    return sql;
  }
  all(): TSalles {
    // renvoie le tableau d’objets contenant toutes les salles
    return this.load(APIpageWeb.SQLloadData(this.prepare(""), []));
  }
  byNumSalle(num_salle: string): UneSalle {
    // renvoie l’objet correspondant à la salle num_salle
    let salle = new UneSalle();
    const salles: TSalles = this.load(
      APIpageWeb.SQLloadData(this.prepare("num_salle = ?"), [num_salle])
    );
    const lesCles: string[] = Object.keys(salles);
    // affecte les clés du tableau associatif « salles » dans le tableau de chaines « lesCles »
    if (lesCles.length > 0) {
      salle = salles[lesCles[0]]; // récupérer le 1er élément du tableau associatif « salles »
    }
    return salle;
  }
  toArray(salles: TSalles): TdataSet {
    // renvoie le tableau d’objets sous la forme
    // d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
    let T: TdataSet = [];
    for (let id in salles) {
      T.push(salles[id].toArray());
    }
    return T;
  }
  delete(num_salle: string): boolean {
    // requête de suppression d’une salle dans la table
    let sql: string;
    sql = "DELETE FROM SALLE WHERE num_salle = ?";
    return APIpageWeb.SQLexec(sql, [num_salle]); // requête de manipulation : utiliser SQLexec
  }
  insert(salle: UneSalle): boolean {
    // requête d’ajout d’une salle dans la table
    let sql: string; // requête de manipulation : utiliser SQLexec
    sql =
      "INSERT INTO SALLE(num_salle, lib_salle, etage, code_dept ) VALUES (?, ?, ?, ?)";
    return APIpageWeb.SQLexec(sql, [
      salle.numSalle,
      salle.libSalle,
      salle.etage,
      salle.codeDept,
    ]);
  }
  update(salle: UneSalle): boolean {
    // requête de modification d’une salle dans la table
    let sql: string;
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
