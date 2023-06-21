function linfun() {
    let aufgabe, loesung, help, explainer
    // Zufallsgerade
    const aa1 = [2, 3, 4, -2, -3, -4]
    const a1 = aa1[Math.floor(Math.random()*aa1.length)]
    const bb1 = [1, 2, 3, 4, -1, -2, -3, -4]
    const b1 = bb1[Math.floor(Math.random()*bb1.length)]
    let op = b1>0 ? "+" : "-";
    const x0 = -b1/a1
    const y0 = b1
    const xx1 = [2, 3, 4, 5, -2, -3, -4, -5]
    const x1 = xx1[Math.floor(Math.random()*xx1.length)]
    const y1 = a1*x1+b1
    
    //let plusminuscase = getRandomInt(4);
    //plusminuscase = 6
    const plusminuscases = [7,8,9,10]
    const plusminuscase = plusminuscases[Math.floor(Math.random()*plusminuscases.length)]
    switch(plusminuscase) {
        case 1: // Nullstelle


            aufgabe = `Bestimme die Nullstelle der Funktion \\[y = ${a1} \\cdot x ${op} ${Math.abs(b1)}\\]`
            help = `` 
            loesung = `` 
            loesung = Number.isInteger(x0) ? `\\[${x0}\\]` : getLowestFractionPlusDec(x0, "jax")
            explainer = `` 

        break;
        case 2: // verschieben vertikal oder horizontal
            
            if (Math.random() < 0.5) {
                aufgabe = `` 
                help = `` 
                loesung = `` 
                explainer = `` 

            } else {
                aufgabe = `` 
                help = `` 
                loesung = `` 
                explainer = `` 

            }

        break;
        case 3: // durch x0|0 oder 0|y0, Steigung gegeben
            
            if (Math.random() < 0.5) {
                aufgabe = `` 
                help = `` 
                loesung = `` 
                explainer = `` 

            } else {
                aufgabe = `` 
                help = `` 
                loesung = `` 
                explainer = `` 

            } 
        
        break;
        case 4: // durch x0 und y0

            aufgabe = `` 
            help = `` 
            loesung = `` 
            explainer = `` 
        
        break;
        case 5: // durch einen Punkt, Steigung gegeben "Punktsteigungsform"

            aufgabe = `` 
            help = `` 
            loesung = `` 
            explainer = `` 
        
        break;
        case 6: // senkrecht, selber Achsenabschnitt

            aufgabe = `Gib eine Senkrechte an zur Geraden \\[y = ${a1} \\cdot x ${op} ${Math.abs(b1)}\\] mit demselben Achsenabschnitt` 
            help = `Wenn m die Steigung einer Geraden ist, dann ist -(1/m) die Steigung der Senkrechten. Aus ${brac(a1)} wird ${brac(-1/a1)}` 
            loesung = `\\[y = ${-a1} \\cdot x ${op} ${Math.abs(b1)}\\]` 
            explainer = `` 
        
        break;
   
        case 7: // Spiegelung an y oder x Achsen

            if (Math.random() < 0.5) { // x-Achse
                aufgabe = `Gegeben ist die Gerade \\[y = ${a1} \\cdot x ${op} ${Math.abs(b1)}\\] Welche Gerade spiegelt diese an der x-Achse?` 
                help = `Gerade und Spiegelgerade haben entgegengesetzte Achsenabschnitte, also ${brac(b1)} und ${brac(-b1)} und dieselbe Nullstelle. Mache dir eine Planfigur!` 
                loesung = `\\[y = ${-a1} \\cdot x ${op === "+" ? "-" : "+"} ${Math.abs(b1)}\\]` 
                explainer = `Spiegelung an der x-Achse: in allen Formeln werden y-Werte durch ihre Gegenzahl ersetzt.
                <br>Damit in der Gleichung y zu -y wird, und zwar für alle x-Werte, müssen beide x-Terme rechts zu ihrem Minus werden.
                Die Gleichung y = ${a1} &middot; x ${op} ${Math.abs(b1)} wird also zu y = ${-a1} &middot; x ${op === "+" ? "-" : "+"} ${Math.abs(b1)}.
                <br>Egal, welches x du einsetzt, der y-Wert ist jetzt die Gegenzahl zu vorher.
                <br>Z.B. x = 0: der Achsenabschnitt ${brac(b1)} wird durch ${brac(-b1)} ersetzt.
                <br>Z.B. die Nullstelle: sie ist für beide Geraden gleich. Rechne es nach: y = 0, dann ist x = ...
                <br>Die Steigung ${brac(a1)} wird zu ${brac(-a1)}, weil im Steigungsdreieck das Vorzeichen der y-Kathete sich umdreht!
                `//!

            } else {
                aufgabe = `Gegeben ist die Gerade \\[y = ${a1} \\cdot x ${op} ${Math.abs(b1)}\\] Welche Gerade spiegelt diese an der y-Achse?`  
                help = `Gerade und Spiegelgerade haben denselben Achsenabschnitt ${brac(b1)} und entgegengesetzte Steigungen ${brac(a1)} und ${brac(-a1)}. Mache dir eine Planfigur!` 
                loesung = `\\[y = ${-a1} \\cdot x ${op} ${Math.abs(b1)}\\]` 
                explainer = `Spiegelung an der y-Achse heißt: gleicher Achsenabschnitt. Die Steigung ${brac(a1)} wird zu ${brac(-a1)}, weil im Steigungsdreieck das Vorzeichen der x-Kathete sich umdreht!` 

            } 

        break;
        case 8: // liegt Punkt auf der Geraden?

            aufgabe = `Gegeben: Gerade y = f(x) und Punkt P \\[P=(${x1}|${y1}), y = ${a1} \\cdot x ${op} ${Math.abs(b1)}\\] Liegt der Punkt auf der Geraden?` 
            help = `Setze den x-Wert des Punktes, ${x1}, als x in die Geradengleichung ein. Kommt y = ${y1} raus?`
            loesung = `Ja, da f(${x1}) = ${y1} ist!` 
            explainer = `Alle Punkte (x|y) der Geraden haben die Eigenschaft f(x) = y. Wenn also z.B. f(${x1}) = ${y1} ist, dann liegt der entsprechende Punkt (${x1}|${y1}) auf der Geraden.` 

        break;
        case 9: // a und b gegeben, gib Formal an

            aufgabe = `Gib eine Geradengleichung y = f(x) an mit Steigung ${a1} und y-Achsenabschnitt ${b1}?` 
            help = `Die Form ist y = "Steigung" mal x + "Achsenabschnitt"` 
            loesung = `\\[y = ${a1} \\cdot x ${op} ${Math.abs(b1)}\\]` 
            explainer = `Die allgemeine Geradengleichung heißt
            <br>y = a&middot;x + b, manchmal auch m&middot;x + n.
            ${b1<0 ? "Da b negativ ist, wird aus dem Plus- ein Minuszeichen." : ""} Du kannst a=${a1} und b=${b1} direkt einsetzen.
            `// 

        break;   
        case 10: // Formel gegeben, Steigung und Achsenabschnitt

            aufgabe = `Gegeben ist die lineare Funktion \\[y = ${a1} \\cdot x ${op} ${Math.abs(b1)}\\] gib Steigung und Achsenabschnitt an` 
            help = `Wenn du in der Gleichung x = 0 setzt, muss der Achsenabschnitt rauskommen, oder?` 
            loesung = `Steigung: ${a1}, Achsenabschnitt: ${y0}` 
            explainer = `Die allgemeine Geradengleichung heißt
            <br>y = a&middot;x + b, manchmal auch m&middot;x + n.
            ${b1<0 ? "Wenn in der Formel mit Zahlenwerten ein Minuszeichen  steht, dann ist der Achsenschnitt negativ" : "Du kannst Steigung und Achsenabschnitt direkt ablesen."}
            `//!

        break;          
        default:
        
            aufgabe = `Fehler, wähle eine andere Aufgabe` 
            help = `Fehler, wähle eine andere Aufgabe` 
            loesung = `Fehler, wähle eine andere Aufgabe` 
            explainer = `Fehler, wähle eine andere Aufgabe`
    }

    return [aufgabe, loesung, help, explainer];
}

export default linfun;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n + 1);
}

function brac(n) {
    return n < 0 ? n = "("+n+")" : n.toString()
}

/*
function even(n) {
    return n % 2 === 0 ? 1 : 0 
}
*/

function getLowestFractionPlusDec(x0,format) {
    let eps = 1.0E-15;
    let h, h1, h2, k, k1, k2, a, x;
    let sign;
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
    h/k < 0 ? sign = "-" : sign = "";
    h = Math.abs(h);
    k = Math.abs(k);
    if (format === "jax"){
        return k === 1 ? `\\[${sign}${h}\\]` : `\\[${sign} \\frac{${h}}{${k}} = ${sign}${(h/k).toFixed(2)}\\]`
        //return `\\[\\frac{${h}}{${k}}\\]`
    } else if (format === "text") {
        return `${h} geteilt durch ${k}`;
    } else {
        return h + "/" + k + " = " + (h/k).toFixed(2);
    }
}
