// dans les outils de développement, désactiver le cache pour forcer le chargement des fichiers js et css 
// sur Firefox : cocher la case "Désactiver le cache"
// test pour ne définir que la classe et l'objet une seule fois sinon redéclaration ==> erreur
if (vueInventaire === undefined)
{
  // définition de la classe 
  class VueInventaire {
    constructor() {
		// rien
    }
    init():void {
        APIpageWeb.show('gabarit.html', 'appli');  // affichage page
    }
  }
// eslint-disable-next-line no-var  
  var vueInventaire = new VueInventaire; 
}

vueInventaire.init();
// définition des événements