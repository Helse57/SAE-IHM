/* eslint-disable @typescript-eslint/no-unused-vars */
type TtabAsso = {	// tableau "associatif" : clé/indice du tableau est une chaîne de caractères
	[key:string] : string;
}
type TdataSet  = TtabAsso[];	// tableau de tableau associatif 
type TtabGrille = {				// tableau associatif d'objets du type "GrilleTabulaire"
	[key:string] : GrilleTabulaire;
}

type Tpile = { fichier : string, id : string, param : Tparams, modal : boolean, arbreAffi : string[]};	
// pile utilisée ppour la gestion interne des affichages successifs
type TtabPile = {	// tableau associatif de piles
	[key:string] : Tpile[];
}

type TeditStatut = 'affi' | 'modif' | 'ajout';	// énumération des statuts possibles du mode d'édition d'une page  

type Tparams = { statut : string, id : string, elts : string[] };	
// type contenant les paramètres passés d'une page HTML à une autre :
// statut (rien, ou TeditSatut), iddentifiant, tableau de valeurs sous forme de chaînes de caractères 

type Telt = { data : TdataSet; cleId : string; valeurId : string; ligneSelect :undefined; cleVisible : boolean };
// type interne pour la gestion des données gérées par une grille tabulaire


class GrilleTabulaire {
	// gestion de l'affichage d'une grille tabulaire
	dataSet 	: Telt = {data:[], cleId:"", valeurId:"", ligneSelect:undefined, cleVisible:true };
	tableSelect	: "";

	show(tableId : string, dataSet : TdataSet, cleId : string, cleVisible : boolean):void {
		// afficher une liste sous la forme d'une table : balise <TABLE> en HTML
	}
	
	getIdSelect():string {
		// renvoie l'identifiant de la ligne sélectionnée dans le tableau
		return "";
	}
	
	getData(): TdataSet {
		return this.dataSet['data'];
		// renvoie le tableau de données affichées
	}

	addLine(tab2 : TdataSet):void	{
		// ajouter des lignes complètes dans la liste
	}

	delSelectLine():void	{
		// supprimer la ligne sélectionnée de la liste
	}
	count() : number {
		return this.dataSet['data'].length;
		// renovie le nombre de lignes de la liste
	}
}

class PageWeb {	
	fichierAPI  : string;	
	spExec		: string;		 
	cheminHTML  : string;	
	http		: string;
	css		 	: string;
	pile		: TtabPile;
	bd			: {host:"", port:"", bdname:"", user:"", pwd:"", charset:"", driver:"" };
	grille		: TtabGrille;
	params		: Tparams;
	constructor(cheminHTML : string, fichier : string, http : string, css : string) {
		this.fichierAPI  = http +'loadHTML.php';	
		this.spExec		 = http +'spExec.php';		 
		this.cheminHTML  = cheminHTML;	
		this.http		 = http;
		this.css		 = css;
		this.pile		 = {};
		this.grille		 = {};
		this.params		 = { statut : "", id : "", elts : []}
		this.show(fichier, "body");
	}
	

	showArray(tableId : string, dataSet : TdataSet, cleId : string, cleVisible = true):GrilleTabulaire	{
	// instanciation d'un nouvel objet de la table "grille", appel de la méthode show de "grille" et retour de l'objet grille créé
		return this.grille[tableId];
	}

	show(fichier : string, id : string , modal = false ):void {
	// affichage de la page HTML de nom "fichier" dans la balise identifie par "id" en mode "modal" ou pas
	}
	
	showModal(fichier : string, id : string):void {	
	// affichage de la page HTML de nom "fichier" dans la balise identifié par la valeur de "id" en mode "modal"
	}             
	
	hide(id : string):void {
	// cache la fenêtre "id" 
	}

	close():void {
	// ferme l'application
	}

	SQLexec(sp : string, params : string[]):boolean {
	// exécute une requête de manipulation (insert, update, delete)
		return true;
	}
	
	SQLloadData(sp : string, params : string[], req ='interrogation'):TdataSet  {
	// exécute une requête d'interrogation et retourne le résultat soit un tableau d'objets, soit un tableau de tableaux associatifs
		let resultat	: TdataSet = [];
		return resultat;
	}
	
	bdOpen(host : string, port : string, bdname : string, user : string, pwd : string, charset ='utf8', driver ='mysql'):void {
	// ouvrir une base de données
	}
	
}
// eslint-disable-next-line no-var
var APIpageWeb : PageWeb;

