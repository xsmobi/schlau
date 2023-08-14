function add(){    
    let op, aufgabe, loesung, help, help1, help2, explainer
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


    /* //20230814
    } else {                            // Fälle mit Klammern
        if (op === "+"){  
            //help1 = `<b>Eine Zahl addieren heißt, die Gegenzahl subtrahieren.</b>`                  // Fall +(-6)
            help2 = `<br>Du addierst eine negative Zahl, nämlich <b>${op2}.</b> Das ist so, wie wenn du die positive Zahl <b>${-op2}</b> subtrahierst!
            <br><b>+ (${op2})</b> ist dasselbe wie <b>- ${-op2}</b>. Oder, auf dem Zahlenstrahl betrachtet: etwas Negatives addieren heißt, du musst nach links.
            <br>Mache den Zwischenschritt schriftlich: <b>${op1} + (${op2}) = ${op1} - ${-op2} =</b>`
        } else {    
            help1 = `<b>Eine Zahl subtrahieren heißt, die Gegenzahl addieren.</b>`                         // Fall -(-6)
            help2 = `<br>Du subtrahierst eine negative Zahl, nämlich <b>${op2}.</b> Das ist so, wie wenn du die positive Zahl <b>${-op2}</b> addierst!
            <br><b>- (${op2})</b> ist dasselbe wie <b>+ ${-op2}</b>. Oder, etwas Negatives minus rechnen (das Gegenteil vom Gegenteil!) ist wie einfach das Positive plus rechnen. Auf dem Zahlenstrahl geht es nach rechts.
            <br>Mache den Zwischenschritt schriftlich: <b>${op1} - (${op2}) = ${op1} + ${-op2} =</b>`
        }
    }
    */ //20230814
    help = help1 + help2;

    explainer = `Jede Zahl hat ein Plus (+) oder ein Minus (-).
    <br>Kein Vorzeichen? Dann Plus.
    <br>Plus: auf Zahlenstrahl nach rechts &rarr;
    <br>Minus: auf Zahlenstrahl nach links &larr;
    <br>
    <br>Mit Pfeilen (s. Hilfe): die Länge des Pfeils ist die Größe (Betrag) der Zahl.
    <br>
    <br>Mit Schritten: von <b>0</b> gehe ${Math.abs(op1)} Schritte nach ${op1<0 ? "links" : "rechts" }, dann ${Math.abs(op2)} Schritte nach ${zahlenstrahlop2} und du landest bei <b>${loesungtxt}</b>.`
    explainer = explainer + `${ op1 > 0 ? "<br><br>(Beim ersten Term wird kein Vorzeichen angezeigt, also hat er Plus)" : ""}`
    
    return [aufgabe, loesung, help, explainer];
}

export default add;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
}