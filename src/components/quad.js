function quad() {
    let aufgabe, loesung, help, explainer
    
    let x1 = -5 + getRandomInt(9)       // 2 relle Nullstellen
    let x2 = -4 + getRandomInt(9)
    if (x1 === 0) x1 = 5
    if (x2 === 0) x2 = -5
    console.log (x1 === -x2,x1, x2)
    if (x1 === -x2) x1 = -x2 + 2
     let p = -(x1+x2)
    console.log (x1 === -x2,x1, x2, p)
   
   

    let x0 = -5 + getRandomInt(13)      // einfache oder doppelte Nullstelle


    
    const q = x1*x2
    let op = "++"
    let a1 = 3
    let b1 = 4
    let linfunction
    if (Math.abs(a1) === 1) {
        linfunction = `y = ${Math.sign(a1)===1 ? "x" : "-x"} ${op} ${Math.abs(b1)}` 
    } else {
        linfunction = `y = ${a1} \\cdot x ${op} ${Math.abs(b1)}` 
    }
    const quadfunction =    `y = x^2 ${add(p)} x ${add(q)}`     // 2 Nullstellen
    const quadfunction_0 =  `x^2 ${add(p)} x ${add(q)} = 0`     // 2 Nullstellen
    const quadfunction1 =   `y = x^2 ${add(p)} x`                 // Eine Nullstelle = 0
    const quadfunction1_0 = `x^2 ${add(p)} x = 0`               // Eine Nullstelle = 0
    const quadfunction2 =   `y = x^2 ${add(q)}`                 // doppelte Nullstelle, q < 0
    const quadfunction2_0 = `x^2 ${add(q)} = 0`                 // doppelte Nullstelle, q < 0
    /*
    
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
    const y2 = yy2[Math.floor(Math.random()*yy2.length)]    const aa = [1/4,1/3,1/2,3/4,3/5,4/5,1,3/2,2]
    const a = aa[Math.floor(Math.random()*aa.length)];
    console.log(a)
    */
    
    
    
    let plusminuscase = getRandomInt(12);
    plusminuscase = 2
    switch(plusminuscase) {
        case 1: // Normalform  - 2 Nullstellen, keine = 0
            aufgabe = `Berechne die Nullstellen der Funktion \\[${quadfunction}\\]` 
            help = `` 
            loesung = `${x1}, ${x2}, p=${-x1-x2}, q=${x1*x2}` 
            explainer = `` 
        break;

        case 2: //  Normalform  - 1 Nullstelle x = 0
            aufgabe = `Berechne die Nullstellen der Funktion \\[${quadfunction1}\\]` 
            help = `` 
            loesung = `0, ${-p}` 
            explainer = `` 
        break;

        case 3: // Normalform  - Doppelte Nullstelle
            aufgabe = `Berechne die Nullstellen der Funktion \\[${quadfunction2}\\]` 
            help = `` 
            loesung = `` 
            explainer = `` 
        break;

        case 4: //  Normalform  - Nullstellen, rein quadratisch
            aufgabe = `Berechne die Nullstellen der Funktion \\[${quadfunction2}\\]` 
            help = `` 
            loesung = `` 
            explainer = `` 
        break;    
        
        case 5: // Allgemeine Form in Normalform (Nullst keine, 1, 2, 2 rein quad)
            aufgabe = `` 
            help = `` 
            loesung = `` 
            explainer = `` 
        break;
        
        case 6: // Allgemeine Form. Wieviele Nullstellen gibt es? (Nullst keine, 1, 2, 2 rein quad)
            aufgabe = `` 
            help = `` 
            loesung = `` 
            explainer = `` 
        break;

        case 7: // Gestaucht gestreckt
            aufgabe = `` 
            help = `` 
            loesung = `` 
            explainer = `` 
        break;

        case 8: // Scheitelpunktform (mit Vorfaktor). Scheitel finden
            aufgabe = `` 
            help = `` 
            loesung = `` 
            explainer = `` 
        break;

        case 9: // Allgemeine Form. Scheitel finden (mit u ohne Vorfaktor)
            aufgabe = `` 
            help = `` 
            loesung = `` 
            explainer = `` 
        break;

        case 10: // Normalform in Scheitelpunktform, Quad Ergänzung
            aufgabe = `` 
            help = `` 
            loesung = `` 
            explainer = `` 
        case 11: // Verschoben x, y, allgemeiner Punkt (Falluntersch.)
            aufgabe = `` 
            help = `` 
            loesung = `` 
            explainer = `` 
        break;

        case 12: // Schnittpunkt Parabel mit Gerade
            aufgabe = `` 
            help = `` 
            loesung = `` 
            explainer = `` 
        break;

        case 13: // Tangente an Gerade
            aufgabe = `` 
            help = `` 
            loesung = `` 
            explainer = `` 
        break;       

        default:
            aufgabe = `` 
            help = `` 
            loesung = `` 
            explainer = ``
    }

    return [aufgabe, loesung, help, explainer];
}

export default quad;

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

function add(s) {
    let showp
    showp = Math.abs(s) === 1 ? "" : Math.abs(s)
    return `${s>0 ? "+" : "-"}${showp}`
}

function adotx(a) {
    let sgn = a > 0 ? "" : "-"
    return Math.abs(a)===1 ? `${sgn}x` : `${sgn}${Math.abs(a)}x`
}
