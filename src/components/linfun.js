function linfun() {
    let aufgabe, loesung, help, explainer
    //const aa1 = [2, 3, 4, -2, -3, -4]
    //const a1 = aa1[Math.floor(Math.random()*aa1.length)]
    let a1 = -5 + getRandomInt(9)
    if (a1 === 0) a1 = 5
    //const bb1 = [1, 2, 3, 4, -1, -2, -3, -4]
    //const b1 = bb1[Math.floor(Math.random()*bb1.length)]
    let b1 = -5 + getRandomInt(9)
    if (b1 === 0) b1 = 5
    let op = b1>0 ? "+" : "-";
    const x0 = -b1/a1
    const y0 = b1
    const xx1 = [2, 3, 4, 5, -2, -3, -4, -5]
    const x1 = xx1[Math.floor(Math.random()*xx1.length)]
    const y1 = a1*x1+b1
    const xx2 = [2, 3, 4, 5, -2, -3, -4, -5] //x2, y2 beliebiger Punkt
    const x2 = xx2[Math.floor(Math.random()*xx2.length)]
    const yy2 = [2, 3, 4, 5, -2, -3, -4, -5]
    const y2 = yy2[Math.floor(Math.random()*yy2.length)]

    let linfunction
    if (Math.abs(a1) === 1) {
        linfunction = `y = ${Math.sign(a1)===1 ? "x" : "-x"} ${op} ${Math.abs(b1)}` 
    } else {
        linfunction = `y = ${a1} \\cdot x ${op} ${Math.abs(b1)}` 
    }
    
    //let plusminuscase = getRandomInt(4);
    //plusminuscase = 6
    const plusminuscases = [1,2,3,4,5,6,7,8,9,10]
    const plusminuscase = plusminuscases[Math.floor(Math.random()*plusminuscases.length)]
    
    switch(plusminuscase) {
        case 1: // Nullstelle
            aufgabe = `Berechne die Nullstelle der Funktion \\[${linfunction}\\]`
            help = `Löse die Gleichung  nach x auf: \\[${a1} \\cdot x ${op} ${Math.abs(b1)} = 0\\] \\[x = \\frac{${b1>0 ? "-" : "+"}${Math.abs(b1)}}{${a1}}\\]`  
            loesung = Number.isInteger(x0) ? `\\[x = ${x0}\\]` : getLowestFractionPlusDec(x0, "jax", true, true)
            explainer = `Ein x-Wert heißt Nullstelle, wenn für dieses x gilt y = 0, wenn also an dieser Stelle x die Gerade die x-Achse schneidet. Das ist für den Wert ${loesung} erfüllt. Mache die Probe, indem du diesen Wert als x in die Gleichung \\[y = ${a1} \\cdot x ${op} ${Math.abs(b1)}\\] einsetzt.
            `//!
        break;
        
        case 2: // verschieben horizontal und vertikal
            let shift = -5 + getRandomInt(9)
            if (shift === 0) shift = 5
            //shift = b1/a1 //Test
            let shiftsgn
            shift > 0 ? shiftsgn = "+" : shiftsgn = "-"
            if (Math.random() < 0.5) {
                // x-Shift, horizontal
                aufgabe = `Verschiebe die Gerade \\[${linfunction}\\] horizontal um den Wert ${shift}` 
                help = `Nach ${shift>0 ? "rechts" : "links"} (${shiftsgn}${Math.abs(shift)}) verschieben heißt: in der Funktion
                    <br>x durch (x ${shift>0 ? "-" : "+"} ${Math.abs(shift)}) ersetzen:
                    \\[y = ${a1} \\cdot (x ${shift>0 ? "-" : "+"} ${Math.abs(shift)}) ${op} ${Math.abs(b1)}\\]
                    `//!
                if (-a1*shift + b1 === 0) {
                    loesung = `\\[y = ${linfunc1(a1)}\\]`
                } else {
                    loesung = `\\[y = ${linfunc1(a1)} ${Math.sign(-a1*shift + b1)===1 ? "+" : "-"}${Math.abs(-a1*shift + b1)}\\]`
                }
                explainer = `<p>Eine Gerade verschieben heißt: am verschobenen Ort - wenn also der Nullpunkt des Koordinatensystems um ${shift} nach ${shift>0 ? "rechts" : "links"} verschoben wäre - gilt dieselbe Geradengleichung, mit eben diesen verschobenen Koordinaten.
                    </p><p>Die x-Werte am verschobenen Ort sind aber um die Verschiebung um ${Math.abs(shift)} ${shift>0 ? "größer" : "kleiner"} geworden!
                    </p><p>Damit also die Geradengleichung weiter funktiert, müssen diese um ${Math.abs(shift)} ${shift>0 ? "größeren" : "kleineren"} wieder ausgegleichen werden, nämlich mit einer Korrektur von ${shift>0 ? "Minus" : "Plus"} ${Math.abs(shift)}.
                    </p><p>Daher wird in der neuen Geradengleichen aus dem x ein (x ${shift>0 ? "-" : "+"}${Math.abs(shift)})
                    </p>
                    `//!
            } else {
                // y-Shift, vertikal
                aufgabe = `Verschiebe die Gerade \\[${linfunction}\\] vertikal um den Wert ${shift}`  
                help = `Wie muss sich die Gleichung ändern, dass für jedes beliebige x das y um den Wert ${Math.abs(shift)} ${shift>0 ? "größer" : "kleiner"} wird?
                `//!
                if (shift + b1 === 0) {
                    loesung = `\\[y = ${linfunc1(a1)}\\]`
                } else {
                    loesung = `\\[y = ${linfunc1(a1)} ${shift + b1 > 0 ? "+" : "-"} ${Math.abs(shift+b1)}\\]`
                }
                explainer = `<p>Für die Verschiebung einer Geraden nach oben oder nach unten einfach in der Formel einen konstanten Wert hinzufügen:
                    </p><p>Aus dem Achsenabschnitt ${b1} in der Geradengleichung wird ${b1}${shift>0 ? "+" : "-"}${Math.abs(shift)} = ${b1+shift}
                    </p>
                    `//!
            }
        break;

        case 3: // durch x0|0 oder 0|y0, Steigung gegeben   
            if (Math.random() < 0.5) {
                // (0|y0)
                aufgabe = `Gib die Gleichung einer Geraden mit Steigung ${a1} durch den Punkt P(0|${b1}) an!` 
                help = `Es gibt nichts zu rechnen: denke an die allgemeine Form der Geradengleichung!` 
                loesung = `\\[${linfunction}\\]` 
                explainer = `<p>Die allgemeine Form der Geradengleichung ist
                </p><p>y = a &middot; x + b.
                </p><p>Die Steigung a=${a1} ist gegeben und mit dem Punkt P(0|${b1}) auch der y-Achsenabschnitt b=${b1}.
                </p>
                `//!
            } else {
                // (x0|0)
                const zero = b1
                const yzero = a1 * zero
                aufgabe = `Gib die Gleichung einer Geraden mit Steigung ${a1} durch den Punkt P(${zero}|0) an!` 
                help = `Die Gerade mit Steigung ${a1} durch den Nullpunkt (0|0) wird beschrieben durch
                \\[y = ${linfunc1(a1)}\\] Verschiebe diese Gerade an die Stelle P(${zero}|0), indem du x durch x ${zero > 0 ? "-" : "+"} ${Math.abs(zero)} ersetzt.
                `//A!
                loesung = `\\[y = ${linfunc1(a1)} ${yzero > 0 ? "-" : "+"} ${Math.abs(yzero)}\\]` 
                explainer = `Die Ursprungsgerade \\[y = ${linfunc1(a1)}\\] entlang der x-Achse an den Punkt P(${zero}|0) zu verschieben heißt, sie um <i>${zero > 0 ? "plus " : "minus "} ${Math.abs(zero)}</i> zu verschieben. Deshalb muss x in der Formel durch <i>x ${zero > 0 ? "minus " : "plus "} ${Math.abs(zero)}</i> ersetzt werden.
                \\[y = ${linfunc2(a1, -zero)}\\]
                `// !
            } 
        break;

        case 4: // durch x0 und y0
            aufgabe = `Gib die Gerade mit den Achsenabschnitten (${x2}|0) und (0|${y2}) an` 
            help = `Die Steigung ist ${getLowestFractionPlusDec(-y2/x2, "jax", true)}` 
            loesung = `\\[y = ${getLowestFractionPlusDec(-y2/x2, "jaxinline")} \\cdot x ${y2>0 ? "+" : "-"} ${Math.abs(y2)} \\]` 
            explainer = `<p>Die allgemeine Form der Geradengleichung ist
                <br>y = ax + b oder y = mx + n
                </p><p>Die Punkte (${x2}|0) und (0|${y2}) ergeben zusammen mit dem Nullpunt (0|0) ein Steigungsdreieck mit dem du dir die Steigung der Geraden veranschaulichen kannst:
                </p><p>Der Achsenabschnitt ist durch den Punkt (0|${y2}) gegeben.
                </p><p>Eine alternative Darstellung ist die Achsenabschnittsform der Geradengleichung
                \\[\\frac{x}{${x2}} + \\frac{y}{${y2}} = 1\\]
                Diese Form kannst du direkt hinschreiben ohne erst die Steigung zu berechnen. Du kannst sie nach x oder y auflösen. Wenn du sie nach y auflöst, erhältst du dieselbe lineare Funktion wie vorher.
                </p>
                `//!
        break;

        case 5: // durch einen Punkt, Steigung gegeben "Punktsteigungsform"
            aufgabe = `Gib die Gleichung einer Geraden durch den Punkt (${x2}|${y2})) mit der Steigung ${a1} an` 
            help = `Die Punktsteigungsform für den Punkt \\((x_{0}|y_{0})\\) und die Steigung m lautet 
                \\[y = m \\cdot (x - x_{0}) + y_{0}\\]
                `//!
            loesung = `\\[y = ${a1} \\cdot x ${add(-a1*x2 + y2)}\\]` 
            explainer = `\\[y = m \\cdot (x - x_{0}) + y_{0}\\]
                \\[m = ${a1}; x_{0} = ${x2}; y_{0} = ${y2};\\]
                \\[y = ${a1} \\cdot (x ${add(-x2)}) ${add(y2)}\\]
                Multipliziere das aus. d.h. fasse die Zahlen zusammen, so dass du eine Geradengleichung der Form
                \\[y = m \\cdot x + y_{0}\\] erhältst
                `//A!
        break;

        case 6: // Ursprungsgerade senkrecht zu gegebener Geraden
            aufgabe = `Gib zur Geraden \\[y = ${adotx(a1)} ${add(b1)}\\] eine senkrechte Gerade an, die durch den Ursprung (0|0) geht.` 
            help = `Wenn m die Steigung einer Geraden ist, dann ist \\[-\\frac{1}{m}\\] die Steigung der Senkrechten.` 
            loesung = `\\[y = ${getLowestFractionPlusDec(-1/a1,"jaxinline")} \\cdot x\\]` 
            explainer = `Die gesuchte Gerade hat die Form
            \\[y = f(x) = n \\cdot x\\]
            da sie durch den Ursprung (Nullpunkt) geht: f(0) = 0.
            Ihre Steigung n berechnet sich aus der gegebenen Geraden mit der Steigung m = ${a1}:
            \\[n = -\\frac{1}{m}\\ = ${getLowestFractionPlusDec(-1/a1,"jaxinline")} \\]
            `//!
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
                explainer = `Spiegelung an der y-Achse heißt: gleicher Achsenabschnitt. Die Steigung ${brac(a1)} wird zu ${brac(-a1)}, weil im Steigungsdreieck das Vorzeichen der x-Kathete sich umdreht!
                `//!
            } 
        break;

        case 8: // liegt Punkt auf der Geraden?
            aufgabe = `Gegeben: Gerade y = f(x) und Punkt P \\[P=(${x1}|${y1}), y = ${a1} \\cdot x ${op} ${Math.abs(b1)}\\] Liegt der Punkt auf der Geraden?` 
            help = `Setze den x-Wert des Punktes, ${x1}, als x in die Geradengleichung ein. Kommt y = ${y1} raus?`
            loesung = `Ja, da f(${x1}) = ${y1} ist!` 
            explainer = `Alle Punkte (x|y) der Geraden haben die Eigenschaft f(x) = y. Wenn also z.B. f(${x1}) = ${y1} ist, dann liegt der entsprechende Punkt (${x1}|${y1}) auf der Geraden.
            `//!
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

        case 11: // Gerade parallel x-Achse oder y-Achse
            if (Math.random() < 0.5) {
                // parallel x-Achse
                aufgabe = `` 
                help = `` 
                loesung = `` 
                explainer = `` 
            } else {
                // parallel x-Achse
                aufgabe = `` 
                help = `` 
                loesung = `` 
                explainer = `` 
            }
       
    
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

function linfunc1(n) {
    if (n===1) return "x"
    else if (n===-1) return "-x"
    else return `${n} \\cdot x`
}
function linfunc2(n,m) {
    if (n===1) return `x ${m>0 ? "+" : "-"} ${Math.abs(m)}`
    else if (n===-1) return `-x ${m>0 ? "+" : "-"} ${Math.abs(m)}`
    else return `${n} \\cdot (x ${m>0 ? "+" : "-"} ${Math.abs(m)})`
}

function getLowestFractionPlusDec(x0,format, dec, result) {
    let eps = 1.0E-15;
    let h, h1, h2, k, k1, k2, a, x;
    let sign;
    a = Math.floor(x0);
    x = x0;
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
    if (format === "jax" || format === "jaxinline"){
        let showx = result ? "x = " : ""
        let showdec = dec ? `= ${sign}${(h/k).toFixed(2)}` : ``
        let ergebnis_int = `${showx}${sign}${h}`
        let jaxbra = format === "jaxinline" ? `` : `\\[`
        let jaxket = format === "jaxinline" ? `` : `\\]`
        let ergebnis_frac = `${jaxbra}${showx}${sign}\\frac{${h}}{${k}}${showdec}${jaxket}`
        return k === 1 ? ergebnis_int : ergebnis_frac
    } else if (format === "text") {
        return `${h} geteilt durch ${k}`;
    } else {
        return h + "/" + k + " = " + (h/k).toFixed(2);
    }
}

function add(x) {
    return `${x>0 ? "+" : "-"}${Math.abs(x)}`
}

function adotx(a) {
    let sgn = a > 0 ? "" : "-"
    return Math.abs(a)===1 ? `${sgn}x` : `${sgn}${Math.abs(a)}x`
}



