function quad() {
    let aufgabe, loesung, help, explainer
    
    let x1 = -5 + getRandomInt(9)       // 2 relle Nullstellen
    let x2 = -4 + getRandomInt(9)
    if (x1 === 0) x1 = 5
    if (x2 === 0) x2 = -5
    if (x1 === -x2) x1 = -x2 + 2
    
    let p = -(x1+x2)
    let q = x1*x2
    
    //let q2 = x1**2
    //let x0 = -5 + getRandomInt(13)      // einfache oder doppelte Nullstelle
    function quadfunction(p,q) {
        return `x^2 ${add(p)} x ${addc(q)}`
    }
    function quadfunction1(p) {
        return `x^2 ${add(p)} x`
    }
    function quadfunction2(q) {
        return `x^2 ${addc(q)}`
    }

    let plusminuscase = getRandomInt(2);
    //plusminuscase = 1
    switch(plusminuscase) {
        case 1: // Normalform  - 2 Nullstellen, keine = 0
            p = 2 * p
            q = 4 * q
            aufgabe = `Berechne die Nullstellen der Funktion \\[y = ${quadfunction(p, q)}\\]` 
            if (Math.random() < 0.5) {
                help = `Lösung mit p-q-Formel:
                \\[x^2 + px + q = 0\\]
                \\[x_{1,2} = -\\frac{p}{2} \\pm \\sqrt{(\\frac{p}{2})^2 - q}\\]
                \\[-\\frac{p}{2} = ${-p/2}; (\\frac{p}{2})^2 = ${p**2/4}; q = ${q}\\]
                \\[x_{1,2} = ${-p/2} \\pm \\sqrt{${p**2/4} ${add(-q)}} \\]
                `//!
                explainer = `Folgt! Schau dir vorerst die Hilfe <kbd>&nbsp; ? &nbsp;</kbd> genau an!` 
            } else {
                let pp = Math.abs(p)
                //p = -4
                //q = 4
                help = `\\[${quadfunction(p, q)} = 0\\]
                Mit quadratischer Ergänzung: ergänzt wird mit
                \\[(\\frac{${pp}}{2})^2 = ${brac(pp/2)}^2 = ${p**2/4} \\]
                \\[${quadfunction(p, q)} + ${p**2/4} = 0 + ${p**2/4} \\]
                \\[${quadfunction1(p)} + ${p**2/4} = ${-q} + ${p**2/4} \\]
                \\[(x ${addc(p/2)})^2 = ${-q + p**2/4} \\]
                `//A
                explainer = `Betrachte die x-Terme der Gleichung
                \\[x^2 ${add(p)} x\\]
                Wir hängen einen Term dran:
                \\[x^2 ${add(p)} x + (\\frac{${pp}}{2})^2\\]
                Das ist ein vollständiges Quadrat:
                \\[(x ${add(p/2)})^2\\]
                (binomische Formel!). Klick jetzt nochmals auf <kbd>&nbsp; ? &nbsp;</kbd>für die ganze Rechnung.
                `//A
            }
            loesung = x1===x2 ? `\\[x_{1,2}=${2*x1}\\]` : `\\[x_{1}=${2*x1}, x_{2}=${2*x2}\\]`

        break;

        case 2: //  Normalform, q = 0  - 1 Nullstelle ist x = 0
            if (Math.random() < 0.5) {
                p = -x1
                // Normalform  - homogen, 1 Nullstelle ist x = 0
                aufgabe = `Berechne die Nullstellen der Funktion \\[y = ${quadfunction1(-p)}\\]` 
                help = `Ausmultiplizieren (Distributivgesetz) \\[${quadfunction1(-p)} = 0 \\Longleftrightarrow x \\cdot (x${add(-p)}) = 0\\]` 
                loesung = `\\[x_{1} = 0, x_{2} = ${p}\\]` 
                explainer = `(kommt)`
            } else {
                q = x1**2
                // Normalform, p=0  - reines Quadrat
                aufgabe = `Berechne die Nullstelle(n) der Funktion \\[y = ${quadfunction2(-q)}\\]` 
                help = `Allgemeine Regel: \\[x^2 = a \\Longleftrightarrow  x = \\pm \\sqrt{a} \\]` 
                loesung = `\\[x_{1,2} = \\pm \\sqrt{${q}} = \\pm ${x1}\\]`
                explainer = `(kommt)`

            }
 
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

function addc(s) {  // bei const kein Ausblenden, falls = 1!)
    return `${s>0 ? "+" : "-"}${Math.abs(s)}`
}

function adotx(a) {
    let sgn = a > 0 ? "" : "-"
    return Math.abs(a)===1 ? `${sgn}x` : `${sgn}${Math.abs(a)}x`
}
