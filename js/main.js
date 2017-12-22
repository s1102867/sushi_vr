window.onload = function() {

	// gebruik bar
	var bar = document.getElementById("bar");

	// klantBestelling houdt het aantal gerechten bij
	var klantBestelling = ["Nigiri"]; // Maki

	// Bestelling wordt random gekozen uit de array klantBestelling
	var bestellingRandom = klantBestelling[Math.floor(Math.random() * klantBestelling.length)];

	// bestellingRandom.watch(klantBestelling, bestellingListener());

	// Bestelling wordt aan de gebruiker getoond
	var klantTekst = document.getElementById("klanttekst");
	klantTekst.setAttribute("value", bestellingRandom);

	// gebruik snijplank om ingredienten aan te koppelen
	var snijplank = document.getElementById("snijplank");

	//Haal persoon op om het hoofd te animeren
	var persoon = document.getElementById("persoon");

	//Maak bord
	var bord = document.getElementById("bord");

	//Haal hangiri bak op
	var hangiri = document.getElementById("hangiri");

	//maak animatie voor de persoon
	var persoonAnimatie = document.createElement("a-animation");
	persoonAnimatie.setAttribute("attribute", "rotation");
	persoonAnimatie.setAttribute("to", "25 1 0");
	persoonAnimatie.setAttribute("dur", "500");
	persoonAnimatie.setAttribute("repeat", "0");

	//maak animatie voor persoon bij nee
	var persoonNeeAnimatie = document.createElement("a-animation");
	persoonNeeAnimatie.setAttribute("attribute", "rotation");
	persoonNeeAnimatie.setAttribute("to", "0.3 15 0");
	persoonNeeAnimatie.setAttribute("dur", "500");
	persoonNeeAnimatie.setAttribute("repeat", "0");

	var persoonNeeAnimatie2 = document.createElement("a-animation");
	persoonNeeAnimatie2.setAttribute("attribute", "rotation");
	persoonNeeAnimatie2.setAttribute("to", "0.3 -15 0");
	persoonNeeAnimatie2.setAttribute("dur", "500");
	persoonNeeAnimatie2.setAttribute("repeat", "0");


	// voeg rijst toe aan de hand
	var rijst = document.getElementById("rijst");
	var rijstinhand = document.createElement("a-box");
	rijstinhand.setAttribute("position", "5 -1 -3");
	rijstinhand.setAttribute("src", "images/rijst.jpg");


	//Roep ongesneden zalm objecten aan
	var zalm = document.getElementById("zalm");
	var zalm1 = document.getElementById("zalm1");
	var zalm2 = document.getElementById("zalm2");
	var zalm3 = document.getElementById("zalm3");

	//Roep zalm objecten in bakje aan
	var plakzalm = document.getElementById("plakzalm");
	var plakzalm1 = document.getElementById("plakzalm1");
	var plakzalm2 = document.getElementById("plakzalm2");
	var plakzalm3 = document.getElementById("plakzalm3");

	//Haal zalmbakje ophalen
	var zalmbak = document.getElementById("zalmbak");

	//Voeg plaaken zalm toe aan bakje
	zalmbak.appendChild(plakzalm);
	zalmbak.appendChild(plakzalm1);
	zalmbak.appendChild(plakzalm2);
	zalmbak.appendChild(plakzalm3);

	plakzalm.setAttribute("position", "-0.220 -0.110 -0.200");
	plakzalm1.setAttribute("position", "0.220 -0.120 -0.200");
	plakzalm2.setAttribute("position", "-0.220 -0.110 0.180");
	plakzalm3.setAttribute("position", "0.220 -0.110 0.180");



	var zalminhand = document.createElement("a-entity");
	zalminhand.setAttribute("position", "0.5 -0.4 0.5");
	zalminhand.setAttribute("obj-model", "obj: #plakzalm-obj; mtl: #plakzalm-mtl");

	// aanmaken cursor om de interactie controleren
	var cursor = document.getElementById("cursor");

	// oppakken rijst
	hangiri.addEventListener("mouseenter", function() {
		if (cursor.contains(rijstinhand) == false) {
			cursor.appendChild(rijstinhand);
			cursor.removeChild(zalminhand);
			cursor.removeChild(mesinhand);

		}
	});


	// oppakken zalm
	zalmbak.addEventListener("mouseenter", function() {
		if (zalmbak.hasChildNodes()) {
			if (cursor.contains(zalminhand) == false) {
				cursor.appendChild(zalminhand);
				cursor.removeChild(rijstinhand);
				cursor.removeChild(mesinhand);
			}
		}
	});


	//maak mes object voor in hand
	var mesinhand = document.createElement("a-entity");
	mesinhand.setAttribute("position", "0.5 -0.1 0.5");
	mesinhand.setAttribute("rotation", "-22.5 0 90");
	mesinhand.setAttribute("obj-model", "obj: #mes-obj; mtl: #mes-mtl");

	//maak animatie voor het snijden
	// oppakken mes
	var mes = document.getElementById("mes");
	mes.addEventListener("mouseenter", function() {
		if(cursor.contains(mesinhand) == false 	&& zalmbak.hasChildNodes() == false){
				cursor.appendChild(mesinhand);
				cursor.removeChild(zalminhand);
				cursor.removeChild(rijstinhand);
			}
	});

	let zalmAnimatieIsGedaan = false;
	function startZalmAnimatie() {
		zalmAnimatieIsGedaan = true;
		zalm.appendChild(snijanimatiezalm);
		zalm1.appendChild(snijanimatiezalm1);
		zalm2.appendChild(snijanimatiezalm2);
		zalm3.appendChild(snijanimatiezalm3);

		snijanimatiezalm3.addEventListener('animationend', () => {
			snijanimatiezalm.remove();
			snijanimatiezalm1.remove();
			snijanimatiezalm2.remove();
			snijanimatiezalm3.remove();
		});

		if(zalmbak.hasChildNodes() == false){
			//Vul bakje bij indien bakje leeg is
			zalmbak.appendChild(plakzalm);
			zalmbak.appendChild(plakzalm1);
			zalmbak.appendChild(plakzalm2);
			zalmbak.appendChild(plakzalm3);
		}
		cursor.removeChild(mesinhand);
	}
	//animatie voor zalm snijden
	var snijanimatiezalm = document.createElement("a-animation");
	snijanimatiezalm.setAttribute("attribute", "position");
	snijanimatiezalm.setAttribute("to", "2.5 0.8 -0.8");
	snijanimatiezalm.setAttribute("dur", "500");

	//zalm alleen snijden als mes in hand is
	zalm.addEventListener("mouseenter", function() {
		if (cursor.contains(mesinhand) == true && zalmAnimatieIsGedaan == false) {
			startZalmAnimatie();
		}
	});

	//animatie voor zalm snijden
	var snijanimatiezalm1 = document.createElement("a-animation");
	snijanimatiezalm1.setAttribute("attribute", "position");
	snijanimatiezalm1.setAttribute("to", "2.5 0.8 -0.5");
	snijanimatiezalm1.setAttribute("dur", "500");

	//zalm alleen snijden als mes in hand is
	zalm1.addEventListener("mouseenter", function() {
		if (cursor.contains(mesinhand) == true && zalmAnimatieIsGedaan == false) {
			startZalmAnimatie();
		}
	});

	//animatie voor zalm snijden
	var snijanimatiezalm2 = document.createElement("a-animation");
	snijanimatiezalm2.setAttribute("attribute", "position");
	snijanimatiezalm2.setAttribute("to", "2.5 0.8 -0.1");
	snijanimatiezalm2.setAttribute("dur", "500");

	//zalm alleen snijden als mes in hand is
	zalm2.addEventListener("mouseenter", function() {
		if (cursor.contains(mesinhand) == true && zalmAnimatieIsGedaan == false) {
			startZalmAnimatie();
		}
	});

	//animatie voor zalm snijden
	var snijanimatiezalm3 = document.createElement("a-animation");
	snijanimatiezalm3.setAttribute("attribute", "position");
	snijanimatiezalm3.setAttribute("to", "2.5 0.8 0.2");
	snijanimatiezalm3.setAttribute("dur", "500");

	//zalm alleen snijden als mes in hand is
	zalm3.addEventListener("mouseenter", function() {
		if (cursor.contains(mesinhand) == true && zalmAnimatieIsGedaan == false) {
			startZalmAnimatie();
		}
	});

	// aanmaken rijstingr
	var rijstingr = document.createElement("a-box");
	rijstingr.setAttribute("id", "rijstingr");
	rijstingr.setAttribute("position", "-0.5 0.15 0");
	rijstingr.setAttribute("src", "images/rijst.jpg");
	rijstingr.setAttribute("height", "0.2");
	rijstingr.setAttribute("width", "0.4");


	//aanmaken zalmingr
	var zalmingr = document.createElement("a-box");
	zalmingr.setAttribute("id", "zalmingr");
	zalmingr.setAttribute("position", "0.5 0.15 0");
	zalmingr.setAttribute("src", "images/zalm.png");
	zalmingr.setAttribute("height", "0.2");
	zalmingr.setAttribute("width", "0.3");

	// aanmaken klaarKnop
	var klaarKnop = document.createElement("a-cylinder");
	klaarKnop.setAttribute("id", "klaarKnop");
	klaarKnop.setAttribute("position", "2 2 2");
	klaarKnop.setAttribute("rotation", "0 0 90");
	klaarKnop.setAttribute("color", "#FF0000");
	klaarKnop.setAttribute("height", "0.2");
	klaarKnop.setAttribute("radius", "0.5");


	// geef text aan de klaarknop
	var klaarKnopText = document.getElementById("klaartext");
	klaarKnop.appendChild(klaarKnopText);

	//maak het bord en de sushi's

	var nigiri = document.createElement("a-entity");
	nigiri.setAttribute("position", "0 1.1 0.1");
	nigiri.setAttribute("obj-model", "obj: #tree-obj; mtl: #tree-mtl");


	// Check of de ingredienten samen het gerecht Nigiri vormen

	// variabele sushi met een naam
	var sushi = {
		naam: "",
		setNaam: function(naam) {
			this.naam = naam;
		}
	}


	//recepten boek API
	var recept = document.getElementById("recept");


	recept.onmouseenter = function() {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var response = JSON.parse(this.responseText);
				//Check het recept en geef de juiste gegevens terug van API
				if (bestellingRandom == "Nigiri") {

					$("#text").remove();
					$("#recept").append('<a-text width="0.6" wrap-count="20" height="auto" line-height="70" rotation="-38 0 0" id="text" text="value:' + response[0].ingredientLines + '; color:black" position="-0.28 1.5 0.1"></a-text>');
				} else {
					$("#text").remove();
					$("#recept").append('<a-text width="0.6" wrap-count="20" height="auto" line-height="70" rotation="-38 0 0" id="text" text="value:' + bestellingRandom + '; color:black" position="-0.28 1.5 0.1"></a-text>');
				}
			}
		}
		xhttp.open("GET", "https://api.edamam.com/search?r=http://www.edamam.com/ontologies/edamam.owl%23recipe_d753959c9804c6ed2d27dcbb29ea8f9e&app_id=0d3d708a&app_key=b08e6272291f6724469fd018f6927b3b", true);
		xhttp.send();
	}



	bord.addEventListener("mouseenter", function() {
		//Oppakken ingredienten
		if (cursor.contains(rijstinhand)) {
			bord.appendChild(rijstingr);
			cursor.removeChild(rijstinhand);

		} else if (cursor.contains(zalminhand)) {
			bord.appendChild(zalmingr);
			zalmbak.removeChild(zalmbak.firstChild);
			cursor.removeChild(zalminhand);
		}
		//Maak klaarKnop visible nadat er ingredienten op de snijplank liggen.
		bar.appendChild(klaarKnop);

		klaarKnop.addEventListener("mouseenter", function() {
			//Als de sushi bestaat uit rijst en zalm, wordt sushi naam Nigiri
			if (bord.contains(rijstingr) && bord.contains(zalmingr)) {
				sushi.setNaam("Nigiri");
			}

			//Als de sushi die gemaakt is hetzelfde als de bestelling dan goedkeuring
			if (bestellingRandom == sushi.naam) {
				klantTekst.setAttribute("value", "Dankjewel");
				bar.appendChild(nigiri);

				//maak ja animatie hier
				persoon.appendChild(persoonAnimatie);

				setTimeout(function() {
					persoonAnimatie.setAttribute("direction", "reverse");
					persoon.appendChild(persoonAnimatie);
				}, 500);
				verwijderChilds();
			}
			//Als de sushi die gemaakt is verschilt met de bestelling dan corectie
			else {
				klantTekst.setAttribute("value", "Als het goed is had ik " + bestellingRandom + " besteld");
				//Maak nee animatie hier
				persoon.appendChild(persoonNeeAnimatie);
				setTimeout(function() {
					persoonNeeAnimatie.setAttribute("direction", "reverse");
					persoon.appendChild(persoonNeeAnimatie);
				}, 500);
				setTimeout(function() {
					persoon.appendChild(persoonNeeAnimatie2);
				}, 1000);
				setTimeout(function() {
					persoonNeeAnimatie2.setAttribute("direction", "reverse");
					persoon.appendChild(persoonNeeAnimatie2);
				}, 1500);
			}
		});
	});

	//Klant neemt nieuwe bestelling op
	function verwijderChilds() {
		setTimeout(function() {
			klantTekst.setAttribute("value", bestellingRandom);
			bar.removeChild(nigiri);
			bar.removeChild(klaarKnop);
			sushi.setNaam("");

			//Verwijder alles van bord
			while (bord.firstChild) {
				bord.removeChild(bord.firstChild);
			}
		}, 3000);
	};
}
