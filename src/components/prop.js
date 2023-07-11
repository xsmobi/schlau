function prop() {
    const preis = ((getRandomInt(8) + 2)/2); // [1 - 4]
    const anzahl = getRandomInt(4) + 2; // [2 - 6]
    const mult = getRandomInt(4) + 2; // [2 - 6]
    //const i = aufgaben[Math.floor(Math.random()*aufgaben.length)];
    const i = 0 // Test
    const speisen = ["Döner", "Pizza Salami", "Pizza vetegarisch", "Burger", "Cheeseburger", "Gemüseburger", "Veggie Burger", "Große Pommes", "California Roll", "Nigiri", "Hähnchen Wrap", "Gemüse-Wrap", "Thunfisch-Wrap", "Hähnchensalat", "Thunfisch-Salat", "Feta-Käse-Salat", "Frühlingsrollen", "Currywurst", "Falafel-Wrap"]
    const speise = speisen[Math.floor(Math.random()*speisen.length)];
    //const speise = speisen[j];

    const reisen = [
        {stadt: 'Berlin', zusatz: '', ziel: 'Leipzig', km: 182, zeit: 80, ziel2: 'Nürnberg', km2: 448},
        {stadt: '', zusatz: '', ziel: '', km: 0, zeit: 0, ziel2: '', km2: 0}
    ]
    let reisentab = reisen.map((item)=>[item.stadt, item.zusatz, item.ziel, item.km, item.zeit, item.ziel2, item.km2])

    //const j = Math.floor(Math.random()*laender.length)
    const j = 0
    const [stadt, zusatz, ziel, km, zeit, ziel2, km2] = reisentab[0]

    //const zeith = Math.floor(zeit / 60 )+':'+Math.floor( zeit % 60 )
    function zeith(zeit) {
        return Math.floor(zeit / 60 )+':'+Math.floor( zeit % 60 )
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
            title: "ICE-Fahrten in Deutschland",
            description: "", 
            aufgabe: `Von ${stadt}${zusatz} nach ${ziel} sind es ${km} km und die Fahrzeit mit dem ICE beträgt ${zeith(zeit)} Std. Wie lange würde, bei gleicher mittlerer Geschwindigkeit des ICE, die Fahrt von Berlin ins ${km2} km entfernte ${ziel2} dauern?`,
            loesung: `${zeith(Math.round(km2*zeit/km))} Std.`,
            help: ``,
            explainer: ``
        },
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
    ]
    
    //return [aufgabe, loesung, help, explainer];
    return [aufgaben[i].aufgabe,aufgaben[i].loesung,aufgaben[i].help,aufgaben[i].explainer]
}

export default prop;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
}