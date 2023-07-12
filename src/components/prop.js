function prop() {
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
    //const j = 2 // Test
    const [stadt, zusatz, ziel, km, zeit, ziel2, km2] = reisentab[j]
    
    const zeit2 = zeit*km2/km

    
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
        /*
        {
            aufgabe: ``,
            loesung: ``,
            help: ``,
            explainer: ``
        },
        {
            aufgabe: ``,
            loesung: ``,
            help: ``,
            explainer: ``
        },
        */
    ]
    
    const i = Math.floor(Math.random()*aufgaben.length);
    //const i = 1 // Test
    //console.log(aufgaben[i].aufgabe)

    //return [aufgabe, loesung, help, explainer];
    return [aufgaben[i].aufgabe,aufgaben[i].loesung,aufgaben[i].help,aufgaben[i].explainer]
}

export default prop;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
}