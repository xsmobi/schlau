function addsub(v1, v2){
    let aufgabe, loesung, help, explainer, op1, op2
    let plusminuscase = getRandomInt(4);
    plusminuscase = 4 // test, später plusminuscase weg und switch direkt
    switch(plusminuscase) {
        case 1:                                                 // 3 - 5
            op1 = getRandomInt(v1);
            op2 = v1 + getRandomInt(v2) + 1; // v1, v2 = 20
            //aufgabe = `${op1} - ${op2} = `
            aufgabe = `\\[${op1}-${op2}=\\]`
            loesung = op1 - op2;
            help = `(${op1} - ${op2}) ist das Negative von (${op2} - ${op1})!`
            explainer= `Das Ergebnis ist kleiner als Null (< 0), weil du eine größere Zahl, ${op2}, von einer kleineren Zahl, ${op1}, abziehst.<br>Der umgekehrte Fall wäre ${op2} - ${op1} = ${op1 - op2}.<br>Also: die Zahl (${op1} - ${op2}) ist genau das Negative der Zahl (${op2} - ${op1}).<br>Auf dem Zahlenstrahl: Pfeil nach rechts von Null nach ${op1}, dann Pfeil der Länge ${op2} von dort aus nach links - und du kommst bei ${op1 - op2} raus.`
        break;
        case 2:
            op1 = getRandomInt(v1);
            op2 = getRandomInt(v2); // v1, v2 = 20
            //aufgabe = `- ${op1} - ${op2} = `
            aufgabe = `\\[-${op1}-${op2}=\\]`
            loesung = - op1 - op2;
            help = `(- ${op1} - ${op2}) ist das Negative von (+${op1} + ${op2})!`
            explainer= `Da (${op1} + ${op2}) = ${op1 + op2}, muss -(${op1} + ${op2}) = -${op1 + op2} sein!<br>Denke auch an die Klammer-Regel: -(${op1} + ${op1}) = -${op1} - ${op2}<br>Auf dem Zahlenstrahl: gehe ab Null um ${op1} nach links ins Minus, von dort Pfeil der Länge ${op2} weiter ins Minus, so kommst du bei -${op1 + op2} raus.`
        break;
        case 3:
            op1 = getRandomInt(v1) - getRandomInt(2*v1);
            if (op1 === 0) op1++
            op2 = getRandomInt(v2); // v1, v2 = 20
            //aufgabe = `${op1} + (-${op2}) = `
            aufgabe = `\\[${op1}+(-${op2})=\\]`
            loesung = op1 - op2;
            help = `Plus vor der Klammer: einfach die Klammer weglassen: ${op1} + (-${op2}) = ${op1} - ${op2}`
            explainer= `Auf dem Zahlenstrahl: Pfeil zur Zahl ${op1}, von weiterer Pfeil der Länge ${op2}, und zwar nach links, weil minus.<br>Oder: du addiert etwas Negatives, nämlich -${op2}, und das ist so, wie wenn du das Positive, nämlich ${op2}, abziehst.`
        break;
        case 4:
            op1 = getRandomInt(v1) - getRandomInt(2*v1);
            if (op1 === 0) op1++
            op2 = getRandomInt(v2); // v1, v2 = 20
            //aufgabe = `${op1} - (-${op2}) = `
            aufgabe = `\\[${op1}-(-${op2})=\\]`
            loesung = op1 + op2;
            help = `Minus vor der Klammer: daraus wird Plus und gleichzeitig verschwindet die Klammer! ${op1} - (-${op2}) = ${op1} + ${op2}`
            explainer= `Das ist ein Fall für die Klammer-Regel: "Steht ein Minus vor der Klammer, dreht sich um der ganze Jammer".<br>Zum Beispiel a - (b - c + d) = a - b + c - d. Probiere das mal aus: setze für a, b, c, d irgendwelche Zahlen ein, z.B. 4, 6, 7, 11, und du wirst sehen, es stimmt immer!`
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