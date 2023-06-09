function add(){    
    let op, aufgabe, loesung, help, help1, help2, explainer
    let op1 = getRandomInt(20) - 10;
    if (op1 === 0) op1++
    let op2 = getRandomInt(30) + 1;  
    if (op1 === op2) op2++
    if (op1 === 0) op1 = 4;
    if (op2 === 0) op2 = 5;
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
    if (op2 > 0) {                      // Zahlenstrahl-Tip
        help2 = `Auf dem Zahlenstrahl Pfeil von "0" nach ${op1<0 ? "links" : "rechts" } mit der Länge ${Math.abs(op1)}, also zum Punkt ${op1}, von dort Pfeil nach ${zahlenstrahlop2} mit der Länge ${Math.abs(op2)}`
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
    help = help1 + help2;
    explainer = `Wenn es keine Klammern gibt, dann: für jeden Term mit <b>Plus "+"</b> eine Bewegung nach <b>rechts</b> und für jeden Termin mit <b>Minus "-"</b> eine Bewegung nach <b>links</b>. Am besten mit Pfeilen: die Länge des Pfeils ist die Größe der Zahl.
    Also von "0" nach ${op1<0 ? "links" : "rechts" }, dann nach ${Math.abs(op2)} Schritte nach ${zahlenstrahlop2} und du landest bei ${loesungtxt}. <br>`
    explainer = explainer + `${ op1 > 0 ? "(Beim ersten Term wird kein Vorzeichen angezeigt, also hat er Plus)" : ""}`
    return [aufgabe, loesung, help, explainer];
}

export default add;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
}