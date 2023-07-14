function prop(filter) {
    let headerclass = "subheader"

    const preis = ((getRandomInt(8) + 2)/2); // [1 - 4]
    const anzahl = getRandomInt(4) + 2; // [2 - 6]
    const mult = getRandomInt(4) + 2; // [2 - 6]
    
    const speisen = ["Döner", "Pizza Salami", "Pizza vetegarisch", "Burger", "Cheeseburger", "Gemüseburger", "Veggie Burger", "Große Pommes", "California Roll", "Nigiri", "Hähnchen Wrap", "Gemüse-Wrap", "Thunfisch-Wrap", "Hähnchensalat", "Thunfisch-Salat", "Feta-Käse-Salat", "Frühlingsrollen", "Currywurst", "Falafel-Wrap"]
    const speise = speisen[Math.floor(Math.random()*speisen.length)];
    //const speise = speisen[j];

    const reisen = [
        {stadt: 'Berlin',       zusatz: '',                                         ziel: 'Leipzig',        km: 172, zeit: 297, ziel2: 'Nürnberg',      km2: 441},
        {stadt: 'Berlin',       zusatz: '',                                         ziel: 'Hannover',       km: 285, zeit: 199, ziel2: 'Köln',          km2: 316},
        {stadt: 'Bremen',       zusatz: '',                                         ziel: 'Münster',        km: 172, zeit: 127, ziel2: 'Köln',          km2: 316},
        {stadt: 'Dresden',      zusatz: ' ("Elbflorenz")',                          ziel: 'Leipzig',        km: 115, zeit: 83,  ziel2: 'Hannover',      km2: 367},
        {stadt: 'Düsseldorf',   zusatz: ', der Hauptstadt von Nordrhein-Westfalen,', ziel: 'Frankfurt',     km: 228, zeit: 153, ziel2: 'Heidelberg',    km2: 289},
        {stadt: 'Erfurt',       zusatz: ', der Hauptstadt von Thüringen,',          ziel: 'Bamberg',        km: 173, zeit: 117, ziel2: 'Nürnberg',      km2: 230},
        {stadt: 'Hamburg',      zusatz: '',                                         ziel: 'Hannover',       km: 159, zeit: 109, ziel2: 'Kassel',        km2: 310},
        {stadt: 'Hannover',     zusatz: ', der Hauptstadt von Niedersachsen,',      ziel: 'Magdeburg',      km: 148, zeit: 94,  ziel2: 'Halle (Saale)', km2: 199},
        {stadt: 'Kiel',         zusatz: ', der Hauptstadt von Schleswig-Holstein',  ziel: 'Lübeck',         km: 88,  zeit: 73,  ziel2: 'Schwerin',      km2: 151},
        {stadt: 'Magdeburg',    zusatz: ', der Hauptstadt von Sachsen-Anhalt',      ziel: 'Leipzig',        km: 125, zeit: 80,  ziel2: 'Dresden',       km2: 231},
        {stadt: 'Mainz',        zusatz: ', der Hauptstadt von Rheinland-Pfalz',     ziel: 'Koblenz',        km: 98,  zeit: 62,  ziel2: 'Bonn',          km2: 168},
        {stadt: 'München',      zusatz: ', der bayerischen Landeshauptstadt',       ziel: 'Ulm',            km: 152, zeit: 110, ziel2: 'Stuttgart',     km2: 233},
        {stadt: 'Potsdam',      zusatz: ', der Landeshauptstadt von Brandenburg',   ziel: 'Brandenburg an der Havel', km: 54, zeit: 43, ziel2: 'Magdeburg', km2: 127},
        {stadt: 'Saarbrücken',  zusatz: ', der Hauptstadt des Saarlands',            ziel: 'Kaiserslautern', km: 69,  zeit: 47,  ziel2: 'Mannheim',      km2: 35},
        {stadt: 'Schwerin',     zusatz: ', der Hauptstadt von Mecklenburg-Vorpommern', ziel: 'Wismar',      km: 32,  zeit: 32,  ziel2: 'Rostock',       km2: 92},
        /*
        {stadt: 'Stuttgart',    zusatz: ', der Hauptstadt von Baden-Württemberg',   ziel: '',               km: 0,   zeit: 0,   ziel2: '', km2: 0},
        
        {stadt: 'Wiesbaden',    zusatz: '',                                         ziel: '',           km: 0,   zeit: 0,   ziel2: '', km2: 0},
        {stadt: 'Dortmund',     zusatz: '',                                         ziel: 'Essen',      km: 37,  zeit: 31,  ziel2: 'Duisburg',   km2: 59},
        {stadt: 'Frankfurt',    zusatz: ' ("Mainhattan")',                          ziel: '',           km: 0,   zeit: 0,   ziel2: '', km2: 0},
        {stadt: '',             zusatz: '',                                         ziel: '',           km: 0,   zeit: 0,   ziel2: '', km2: 0},
        */
    ]
    let reisentab = reisen.map((item)=>[item.stadt, item.zusatz, item.ziel, item.km, item.zeit, item.ziel2, item.km2])

    const j = Math.floor(Math.random()*reisentab.length)
    const [stadt, zusatz, ziel, km, zeit, ziel2, km2] = reisentab[j]
    const zeit2 = zeit*km2/km

    const apersonen2 = 3 + getRandomInt(5)
    const apersonen1 = apersonen2 * (getRandomInt(3)+1)
    const astund1 = 2 + getRandomInt(3)
    const astund2 = astund1 * (getRandomInt(2)+1)
    const atage1 = getRandomInt(11) + 2
    const atage2 =  (apersonen1 * astund1 * atage1) / (apersonen2 * astund2)
    const atodo = [
        "Um eine Grube für einen riesigen Pool auszuheben",
        "Um den Grünstreifen auf der Autobahn umzugraben",
        "Um die Leitungen des Bürokomplexes zu verlegen",
        "Um neue Fliesen in sämtlichen Bädern des Hotels zu verlegen",
        "Um sämtliche ESt-Bescheide von 1998 zu digitalisieren",
        "Um alle Schallplatten des insolventen Musikhauses zu digitalisieren"
    ]
    const k = Math.floor(Math.random()*atodo.length)

    const kuchen = {kpersonen: 5, butter: 200, zucker: 200, eier: 4, mehl: 400}
    let {kpersonen, butter, zucker, eier, mehl} = kuchen
    const nku1 = 1 + getRandomInt(6)
    let nku2 = [4, 6].includes(nku1) ? nku1/2 : nku1 * (2*(getRandomInt(3)+1))
    
    function zutatstring(num) {
        return num >= 1000 ? (num/1000).toFixed(1) + " kg" : num + " g"
    }
    //console.log(zutatstring(nku2*butter))
    
    function zeith(zeit) {
        return Math.floor(zeit / 60 )+':'+(String(Math.floor( zeit % 60 )).padStart('2',0))
    }

    const aufgaben = [
        {
            nr:1,
            title: "Döner, Burger, Pizza, Falafel",
            description: "", 
            aufgabe: `${anzahl} ${speise} kosten ${(anzahl*preis).toFixed(2)} Euro, wieviel kosten ${anzahl*mult} ${speise}?`,
            loesung: `${(anzahl*mult*preis).toFixed(2)} Euro!`,
            help: `2 Tipps:
            <br>1. Rechne erst den Preis von 1 ${speise} aus!
            <br>2. Überlege, wieviel mal mehr die ${anzahl*mult} ${speise} sind, als die ${anzahl}! (Spoiler: es sind ${mult}mal so viel)`,
            explainer: `Hier die beiden Möglichkeiten:
            <br>1. Teile die ${(anzahl*preis).toFixed(2)} Euro durch ${anzahl}, dann hast du den Einzelpreis. Diesen kannst du mit ${anzahl*mult} multiplizieren, um das Ergebnis zu erhalten.
            <br>2. Profi-Tipp: ${anzahl*mult} ${speise} sind ${mult}-mal soviel wie ${anzahl}. Der Preis von ${anzahl*mult} ${speise} muss also auch ${mult}mal soviel wie ${(anzahl*preis).toFixed(2)} Euro sein.
            <br><br>
            Methode 1 geht immer, auch wenn die Zahlen nicht so passend sind. Wenn aber die Zahlen passen, dann ist Methode 2 cooler.`,
        },
        {
            nr:2,
            title: "Reisen in Deutschland", 
            description: "", 
            aufgabe: `Von ${stadt}${zusatz} nach ${ziel} sind es ${km} km und die Fahrzeit mit PKW beträgt ${zeith(zeit)} Std. Wie lange würde, bei gleicher mittlerer Geschwindigkeit, die Fahrt von Berlin ins ${km2} km entfernte ${ziel2} dauern?`,
            //loesung: `${zeith(Math.round(km2*zeit/km))} Std. ---- ${zeith(zeit2)}`,
            loesung: `${zeith(zeit2)}`,
            help: `Die Strecken verhalten sich wie die Zeiten, da die Geschwindigkeit immer gleich ist:
            \\[\\frac{${km}\\text{ km}}{${zeit}\\text{ min}} = \\frac{${km2}\\text{ km}}{\\text{gesuchte Zeit}}\\]
            (zum Rechnen müssen alle Zeiten in derselben Einheit, also hier in Minuten angegeben werden!)
            `,
            explainer: `Die Gleichung unter "?" wird umgestellt, also nach der gesuchten Zeit aufgelöst:
            \\[\\text{Gesuchte Zeit = } \\frac{${km2}\\text{ km}}{${km}\\text{ km}} \\cdot ${zeit}\\text{ min}\\]
            `//!
        },
        {
            nr:3,
            title: "Doppelter Dreisatz: Arbeitsleistung", 
            description: "",  
            aufgabe: `${atodo[k]}, arbeiten ${apersonen1} Personen ${atage1} Tage zusammen, ${astund1} Stunden pro Tag.
            Wie viele Tage bräuchte ein anderes Team mit ${apersonen2} Personen bei einer täglichen Arbeitszeit von ${astund2} Stunden?`,
            loesung: `${atage2} Tage`,
            help: `Die Arbeitsmenge ist gegeben durch
            Personen mal Tage mal Stunden pro Tag - für beide Teams. Es sind also 6 Größen gegeben, eine davon ist unbekannt. Nach dieser musst du auflösen.`,
            explainer: `Arbeitsumfang der Teams 1 und 2 ist (p: Personen, t: Tage, s: Stunden pro Tag): 
            \\[p2 \\cdot t2 \\cdot s2 = p1 \\cdot t1 \\cdot s1\\]
            \\[t2 = \\frac{p1 \\cdot t1 \\cdot s1}{p2 \\cdot s2}\\]
            \\[t2 = \\frac{${apersonen1} \\cdot ${atage1} \\cdot ${astund1}}{${apersonen2} \\cdot ${astund2}}\\]
            `//
        },
        {
            nr:4,
            title: "Backe backe Kuchen", 
            description: "", 
            aufgabe: `Kuchenparty: ihr backt ${nku1} Rührkuchen für ${nku1*kpersonen} Personen und braucht dafür ${zutatstring(nku1*butter)} Butter, ${zutatstring(nku1*zucker)} Zucker, ${nku1*eier} Eier und ${zutatstring(nku1*mehl)} Mehl. Wieviel von allen Zutaten wären für ${nku2*kpersonen} Personen nötig?`,
            loesung: `${zutatstring(butter*nku2)} Butter, ${zutatstring(zucker*nku2)} Zucker, ${eier*nku2} Eier, ${zutatstring(mehl*nku2)} Mehl`,
            help: `Für alle Zutaten gilt
            \\[\\frac{\\text{Menge für ${nku2*kpersonen}}}{\\text{Menge für ${nku1*kpersonen}}}=\\frac{${nku2*kpersonen}}{${nku1*kpersonen}} = ${getlowestfraction(nku2/nku1, "injax")}\\]
            `,//!
            explainer: `\\[\\frac{\\text{Menge für ${nku2*kpersonen}}}{\\text{Menge für ${nku1*kpersonen}}}= ${getlowestfraction(nku2/nku1, "injax")}\\]
            Also z.B. \\[\\frac{\\text{Eier für ${nku2*kpersonen}}}{\\text{Eier für ${nku1*kpersonen}}}= ${getlowestfraction(nku2/nku1, "injax")}\\]
            \\[\\text{Eier für ${nku2*kpersonen}} = ${getlowestfraction(nku2/nku1, "injax")} \\cdot \\text{(Eier für }${nku1*kpersonen})\\]
            \\[\\text{Eier für ${nku2*kpersonen}} = ${getlowestfraction(nku2/nku1, "injax")} \\cdot ${nku1*eier} \\text{ Eier}\\]
            Du musst also alle Zutaten mit \\(${getlowestfraction(nku2/nku1, "injax")}\\) multiplizieren!
            `//!
        },
    ]

    function getlowestfraction(x0,format) {
        let eps = 1.0E-15;
        let h, h1, h2, k, k1, k2, a, x;
        //let format = "jax"
        x = x0;
        a = Math.floor(x);
        h1 = 1;
        k1 = 0;
        h = a;
        k = 1;
        while (x-a > eps*k*k) {
            x = 1/(x-a);
            a = Math.floor(x);
            h2 = h1; h1 = h;
            k2 = k1; k1 = k;
            h = h2 + a*h1;
            k = k2 + a*k1;
        }
        // return h + "/" + k;
       
           // (format === "jax") ? `\\[\\frac{${h}}{${k}}\\]` : h + "/" + k
        if (format === "jax"){
            return k === 1 ? `\\[{${h}}\\]` : `\\[\\frac{${h}}{${k}}\\]`
        } else if (format === "injax") {
            return k === 1 ? `{${h}}` : `\\frac{${h}}{${k}}`
        } else if (format === "text") {
            return `${h} geteilt durch ${k}`;
        } else {
            return h + "/" + k;
        }
    }
    
    //const i = 3 //test
    const i = ( typeof filter == 'number' ? filter : Math.floor(Math.random() * aufgaben.length))
    

    const [aufgabe_,loesung_,help_,explainer_] = [aufgaben[i].aufgabe,aufgaben[i].loesung,aufgaben[i].help,aufgaben[i].explainer]

    let menu = "Das Sub-Menü in kommt Kürze"
    menu = aufgaben.filter(item => item.nr !== 0); // die nr:0 elemente nur in der Gesamtauswahl
    menu = menu.map(({ nr, title, description }) => ({
        nr,
        title,
        description,
      }));

      return [aufgabe_,loesung_,help_,explainer_,headerclass,menu]
}

export default prop;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
}