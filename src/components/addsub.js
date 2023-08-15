function addsub(){
    const v1 = 10
    const v2 = 20
    let aufgabe, loesung, help, explainer, op1, op2
    let plusminuscase = getRandomInt(4);
    //console.log(plusminuscase)
    //plusminuscase = 1 // test, später plusminuscase weg und switch direkt
    //plusminuscase = 3
    switch(plusminuscase) { 
        case 1:  // 3 - 5, Zahl minus größere Zahl
            op1 = getRandomInt(v1);
            op2 = v1 + getRandomInt(v2) + 1; // v1, v2 = 20
            //aufgabe = `${op1} - ${op2} = `
            aufgabe = `\\[${op1}-${op2}=\\]`
            loesung = op1 - op2;
            help = `(${op1} - ${op2}) ist das Negative von (${op2} - ${op1})!`
            explainer= `Das Ergebnis ist kleiner als Null (< 0), weil du eine größere Zahl, ${op2}, von einer kleineren Zahl, ${op1}, abziehst.
            <br><br>Der umgekehrte Fall wäre ${op2} - ${op1} = ${op2 - op1}
            <br><br>Trick: siehe <kbd>&nbsp; ? &nbsp;</kbd>
            <br>${help}
            <br>Und wenn ${op2} - ${op1} = ${-loesung},
            <br>dann ist ${op1} - ${op2} = ${loesung}
            <br><br>Auf dem Zahlenstrahl: Pfeil nach rechts von Null nach ${op1}, dann Pfeil der Länge ${op2} von dort aus nach links - und du kommst bei ${op1 - op2} raus.
            `//!
        break;
        case 2:  // -3 - 5, minus neg Zahl minus neg Zahl
            op1 = getRandomInt(v1);
            op2 = getRandomInt(v2); // v1, v2 = 20
            //aufgabe = `- ${op1} - ${op2} = `
            aufgabe = `\\[-${op1}-${op2}=\\]`
            loesung = - op1 - op2;
            help = `(- ${op1} - ${op2}) ist das Negative von (+${op1} + ${op2})!`
            explainer= `<ul>
                <li>Keine Klammer, also 1 Schritt gespart!</li>
                <li>Starte bei 0</li>
                <li>Gehe ${op1} Schritte nach links</li>
                <li>Gehe ${op2} Schritte weiter nach links</li>
                <li>Bis du bei ${loesung} gelandet?</li>
            </ul>
            Wenn du lieber an Pfeile auf dem Zahlenstrahl denkst: die ${op1} ist ein Pfeil nach links ins Minus. Die ${op2} ebenfalls. Also bist du insgesamt bei ${loesung} angekommen.
            <br><br>Es geht auch einfacher, siehe <kbd>&nbsp; ? &nbsp;</kbd>
            <br>${help}
            <br>und (+${op1} + ${op2}) = ${-loesung} easy!
            <br>Davon das Negative = ${loesung}
            `//!
        break;
        case 3:  // ... +(-5)
            op1 = getRandomInt(v1) - getRandomInt(2*v1);
            if (op1 === 0) op1++
            op2 = getRandomInt(v2); // v1, v2 = 20
            //aufgabe = `${op1} + (-${op2}) = `
            aufgabe = `\\[${op1}+(-${op2})=\\]`
            loesung = op1 - op2;
            
            help = `Für das (-${op2}) gilt die Regel:
            <br>+(-x) = -x also:
            <br>${op1} + (-${op2}) = ${op1} - ${op2}`
            
            explainer= `<ul>
                <li>Starte bei 0</li>
                <li>Gehe zu ${op1}</li>
                <li>Gehe um ${op2} nach links</li>
                <li>Du kommst bei ${loesung} raus</li>
            </ul>
            Tipp: schreibe immer einen Extraschritt für das Auflösen der Klammer, erst dann das Ergebnis!
            <br>${op1} + (-${op2}) = ${op1} - ${op2}
            <br>
            <br>Auf dem Zahlenstrahl: Pfeil zur Zahl ${op1}, dann Pfeil der Länge ${op2}, und zwar nach links, weil minus.
            <br><br>Oder: du addiert etwas Negatives, nämlich -${op2}, und das ist so, wie wenn du das Positive, nämlich ${op2}, abziehst.
            <br>Deshalb heißt ja der Zwischenschritt:
            <br>= ${op1} - ${op2}
            `//!
        break;
        case 4: // -(-5)
            op1 = getRandomInt(v1) - getRandomInt(2*v1);
            if (op1 === 0) op1++
            op2 = getRandomInt(v2); // v1, v2 = 20
            //aufgabe = `${op1} - (-${op2}) = `
            aufgabe = `\\[${op1}-(-${op2})=\\]`
            loesung = op1 + op2;
            help = `Für das (-${op2}) gilt die Regel:
            <br>-(-x) = +x also:
            <br>${op1} - (-${op2}) = ${op1} + ${op2}`
            explainer= `Die Regel -(-x) = +x also:
            <br>${op1} - (-${op2}) = ${op1} + ${op2}
            <br>kannst du auch so merken:
            <br>"Eine Zahl subtrahieren heißt, die Gegenzahl addieren"
            <br>Die Gegenzahl zu (-${op2}) ist (+${op2})!
            <br>Also: statt (-${op2}) zu subtrahieren, die ${op2} addieren!
            <br>${op1} + ${op2} = ${op1 + op2}` 
        break;
        default:
    }
    loesung = `\\[${loesung}\\]`
    return [aufgabe, loesung, help, explainer];
}

export default addsub;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n) + 1;
}