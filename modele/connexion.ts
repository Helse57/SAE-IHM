if (connexion === undefined) {
  class Connexion {
    constructor() {
      this.init();
    }
    init() {
      // à adapter avec voter nom de base et vos identifiants de connexion
      APIpageWeb.bdOpen(
        "devbdd.iutmetz.univ-lorraine.fr",
        "3306",
        "thieba218u_bdinventaire",
        "thieba218u_appli",
        " ",
        "utf8"
      );
    }
  }
  var connexion = new Connexion();
}
