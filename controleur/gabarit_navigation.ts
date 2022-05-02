// test pour ne définir que la classe et l'objet une seule fois sinon redéclaration ==> erreur
if (vueNavigation === undefined)
{
  class VueNavigation {
      constructor() {
		  // rien
      }
    
      itemClick(event : Event):void {
        // Les variables définies avec var ont une portée liée à la fonction entière
        // Les variables définies avec let ont une portée liée au bloc de code.
          const cible = <HTMLInputElement>event.target; // quelle est la cible cliquée ? ==> quel est l'item de menu cliqué 
		    // traitement sur un choix (balise <a>) et name du noeud parent = 'menu_item'
		      let noeud = <HTMLInputElement>cible.parentNode;
		      if  ( noeud.getAttribute('name') === 'menu_item' ) {		
            // construction du fil d'ariane
				let chemin = '';	
			        // tant que le noeud est différent de la racine du menu alors on remonte au noeud père
				while (noeud.id !== 'navigation_menu') {
				      // si name du noeud = 'menu_item'
				      if (noeud.tagName === 'LI') {
					          chemin = ' >' + noeud.childNodes[0].textContent + chemin;
                  }
                  noeud = <HTMLInputElement>noeud.parentNode;
              }
			        // affichage du fil d'ariane 
              (<HTMLDivElement>document.querySelector('[id=navigation_fil]')).textContent = chemin;

			        if (cible.id === 'quitter') {
                  APIpageWeb.close();
			        }
			        else {
                (<HTMLDivElement>document.querySelector('[id=gabarit_travail]')).innerHTML = '';
				          APIpageWeb.show(cible.id, 'gabarit_filtre');	  
                  // cible.id est l'id de l'item cliqué du menu, par exemple "infraction_liste_filtre" 
                  // le fichier HTML à afficher doit porter ce nom "infraction_liste_filtre" 
			        }
          }
      }
  }
 // eslint-disable-next-line no-var  
  var vueNavigation = new VueNavigation;
}

// définition des événements
(<HTMLDivElement>document.querySelector('[id=navigation_menu]')).addEventListener('click', function () { vueNavigation.itemClick(event); });
