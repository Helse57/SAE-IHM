// test pour ne définir que la classe et l'objet une seule fois sinon redéclaration ==> erreur
if (vueGabarit === undefined)
{
  class VueGabarit {
    constructor() {
		// rien
    }
    init():void {
        APIpageWeb.show('gabarit_hautpage.html', 'gabarit_hautpage');     // affichage haut de page
        APIpageWeb.show('gabarit_navigation.html', 'gabarit_navigation'); // affichage menu
		    APIpageWeb.show('gabarit_baspage.html', 'gabarit_baspage');       // affichage bas de page
    }

    replierDeplierClick():void {
    // replier/déplier  la zone de filtrage
        let elt = <HTMLDivElement>document.querySelector('[id=gabarit_filtre]');
        let img = <HTMLImageElement>document.querySelector('[id=gabarit_deplirepli]');
        elt.hidden = (!elt.hidden);
        if (elt.hidden) {
            img.src = 'https://devweb.iutmetz.univ-lorraine.fr/~thieba218u/ihm/tp_inventaire/vue/css/deplier.jpg'; 
        } 
        else {
            img.src ='https://devweb.iutmetz.univ-lorraine.fr/~thieba218u/ihm/tp_inventaire/vue/css/replier.jpg';
        } 
    }
  }
// eslint-disable-next-line no-var  
  var vueGabarit = new VueGabarit;
}

vueGabarit.init();
// définition des événements
(<HTMLImageElement>document.querySelector('[id=gabarit_deplirepli]')).addEventListener('click', function () { vueGabarit.replierDeplierClick(); });
