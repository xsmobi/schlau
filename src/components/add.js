function add(min, max){
    let op, aufgabe, loesung, help, help1, help2
    let op1 = getRandomInt(max-min) + min;
    let op2 = getRandomInt(max-min) + min;
    if (op1 === 0) op1 = 4; // Null ausschließen
    if (op2 === 0) op2 = 5; // Null ausschließen
    if (Math.random() < 0.5){
        op = "+";
        loesung = op1 + op2;
    } else {
        op = "-";
        loesung = op1 - op2;
    }
    if (op2 < 0) {
        aufgabe = op1 + " " + op + " (" + op2 + ") =";
    } else {
        aufgabe = op1 + " "  + op + " " + op2 + " =";
    }
    help1 = "";
    help2 = "";
    if (op2 > 0) {                      // Zahlenstrahl-Tip
        help2 = "Zahlenstrahl-Tip"
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
    return [aufgabe, loesung, help];
}

export default add;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
}