function add(){    
    let op, aufgabe, loesung, help, help1, help2, explainer, tutor
    let op1 = getRandomInt(20) - 10;
    if (op1 === 0) op1++
    let op2 = getRandomInt(30) + 1;  
    if (op1 === op2) op2++
    if (op1 === 0) op1 = 4;
    if (op2 === 0) op2 = 5;
    
       //Test
       //op1 = -3
       //op2 = 11
    
    
    
    if (Math.random() < 0.5){
        op = "+";
        loesung = op1 + op2;
    } else {
        op = "-";
        loesung = op1 - op2;
    }
    const loesungtxt = loesung
    loesung = `\\[${loesung}\\]`
    if (op2 < 0) {
        aufgabe = `\\[${op1}${op}(${op2})=\\]`
    } else {
        aufgabe = `\\[${op1}${op}${op2}=\\]`
    }
    help1 = "";
    help2 = "";

    const zahlenstrahlop2 = ((op2<0 && op==="+") || (op2>0 && op==="-")) ? "links" : "rechts" 
    //if (op2 > 0) {    
        /*                  // Zahlenstrahl-Tip NEU 20230814: op IMMER > 0
        help2 = `Auf dem Zahlenstrahl:
        <br>Minus (-) heißt nach links
        <br>Plus (+) heißt nach rechts
        <br>Also in dieser Aufgabe:
        <br>1. Pfeil von <b>0</b> nach ${op1<0 ? "links" : "rechts" } mit Länge ${Math.abs(op1)} zum Punkt <b>${op1}</b>
        <br>2. Pfeil von <b>${op1}</b> nach ${zahlenstrahlop2} mit Länge ${Math.abs(op2)}
        `//!
        */
        help2 = `<ul>
            <li> Starte bei 0
            <li>Gehe ${Math.abs(op1)} ${Math.abs(op1)===1 ? "Schritt" : "Schritte"} nach ${op1<0 ? "links" : "rechts" }</li>
            <li>Gehe ${Math.abs(op2)} ${Math.abs(op2)===1 ? "Schritt" : "Schritte"} nach ${op === "-" ? "links" : "rechts" }</li>
            <li>Wo bist du?</li>
        </ul>
        `//!

    help = help1 + help2;
    
    let op22 = op === "+" ? op2 : -op2;
    help = `${op1}/a/${op22}`

    explainer = `Jede Zahl ist Plus (+) oder Minus (-). Kein Vorzeichen? Dann Plus.
    <br>
    <br>Plus: auf Zahlenstrahl nach rechts
    <br>Minus: auf Zahlenstrahl nach links
    <br>
    <br>Klick auf Hilfe <kbd>&nbsp;?&nbsp;</kbd> für die Zahlenstrahl-Grafik!
    <br>
    <br>Die wichtigen Punkte auf dem Zahlenstrahl sind: <b>0</b>, <b>${op1}</b> und <b>${loesungtxt}</b>
    <br>
    <br>Ablauf: von 0 gehe ${Math.abs(op1)} Schritte nach ${op1<0 ? "links" : "rechts" }, dann ${Math.abs(op2)} Schritte nach ${zahlenstrahlop2} und du landest bei ${loesungtxt}.`
    
    explainer = explainer + `${ op1 > 0 ? "<br><br>(Beim ersten Term wird kein Vorzeichen angezeigt, also hat er Plus)" : ""}`
    
    let max12 = Math.max(Math.abs(op1), Math.abs(op2), loesungtxt)
    max12 = Math.ceil(max12/5)*5
    tutor = [[`Zeichne einen Zahlenstrahl von minus ${max12} bis plus ${max12}. Dann hören &#x1F508`, `Zeichne einen Zahlenstrahl von minus ${max12} bis plus ${max12}`],[`<br>Mit Schritten: von <b>0</b> gehe ${Math.abs(op1)} ${Math.abs(op1)>1?"Schritte":"Schritt"} nach ${op1<0 ? "links" : "rechts" }, dann ${Math.abs(op2)} ${Math.abs(op2)>1?"Schritte":"Schritt"} nach ${zahlenstrahlop2} und du erreichst die <b>${loesungtxt}</b>.`,`Mit Schritten: von 0 gehe ${Math.abs(op1)} ${Math.abs(op1)>1?"Schritte":"Schritt"} nach ${op1<0 ? "links" : "rechts" }, dann ${Math.abs(op2)} ${Math.abs(op2)>1?"Schritte":"Schritt"} nach ${zahlenstrahlop2} und du erreichst die ${loesungtxt} .`]]

    //return [aufgabe, loesung, help, explainer];
    return [aufgabe,loesung,help,explainer,undefined,undefined, undefined, undefined, undefined, tutor]
}

export default add;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
}