function linfun() {
    let aufgabe, loesung, help, explainer
    let op, loe
    
   

    
    
    
    
    let plusminuscase = getRandomInt(4);
    plusminuscase = 1
    switch(plusminuscase) {
        case 1: // a = 2, 3, 4
            const aa1 = [2, 3, 4, -2, -3, -4]
            const a1 = aa1[Math.floor(Math.random()*aa1.length)];
            const bb1 = [1, 2, 3, 4, -1, -2, -3, -4]
            const b1 = bb1[Math.floor(Math.random()*bb1.length)];

            op = b1>0 ? "+" : "-"
            loe = -b1/a1

            aufgabe = `Bestimme die Nullstelle der Funktion \\[y = ${a1} \\cdot x ${op} ${Math.abs(b1)}\\]`
            help = `` 
            loesung = `` 
            loesung = Number.isInteger(loe) ? `\\[${loe}\\]` : getLowestFractionPlusDec(loe, "jax")
            explainer = `` 

        break;
        case 2: // verschieben vertikal oder horizontal

        aufgabe = `` 
        help = `` 
        loesung = `` 
        explainer = `` 
        break;
        case 3: // verschieben an Punkt

        aufgabe = `` 
        help = `` 
        loesung = `` 
        explainer = `` 

        break;
        case 4: // liegt Punkt auf der Geraden?

        aufgabe = `` 
        help = `` 
        loesung = `` 
        explainer = `` 

        break;
        case 5: // geht Gerade durch einen Punkt?

        aufgabe = `` 
        help = `` 
        loesung = `` 
        explainer = `` 

        break;
        case 6: // spiegeln an x oder y Achse

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

export default linfun;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n + 1);
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
        return h + "/" + k;
    }
}
