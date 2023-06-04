function prozent() {
    const headerclass = "subheader"
    const preis = ((getRandomInt(8) + 2)/2); // [1 - 4]
    const anzahl = getRandomInt(4) + 2; // [2 - 6]
    const mult = getRandomInt(4) + 2; // [2 - 6]
    //const i = aufgaben[Math.floor(Math.random()*aufgaben.length)];
    const i = 0 // Test
    const speisen = ["Spaghetti"]
    const speise = speisen[Math.floor(Math.random()*speisen.length)];
    //const speise = speisen[j];
    const aufgaben = [
        {
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
        {
            aufgabe: ``,
            loesung: ``,
            help: ``,
            explainer: ``
        },
    ]
    
   
    
    
    //console.log("header in prozent " + headerclass)
    //return [aufgabe, loesung, help, explainer];
    return [aufgaben[i].aufgabe,aufgaben[i].loesung,aufgaben[i].help,aufgaben[i].explainer,headerclass]
}

export default prozent;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
}