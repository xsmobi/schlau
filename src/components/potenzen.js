function potenzen(filter) {
    let headerclass = "subheader2"

    let a = 2 + getRandomInt(7)
    let b = 3 + getRandomInt(6)
    if (a === b) b=9
    let m = 2 + getRandomInt(8) 
    let n = 2 + getRandomInt(7) 
    if (m === n) n=9

    const bin = Math.random()
    let kwaufgabe, kwhelp, kwloesung, kwexplainer
    if (bin < 0.2) {                           // a
        kwaufgabe =     `\\[${a}\\]`
        kwhelp =        `\\[${a}^{-1}\\]`
        kwloesung =     `\\[=\\frac{1}{${a}} = ${a}^{-1} = ${digits(1/a)}\\]`
        kwexplainer =   `Die Zahl ${a} kann als Bruch mit dem Nenner 1 aufgefasst werden
                        \\[${a} = \\frac{${a}}{1}\\]
                        Der Kehrbruch ist daher
                        \\[\\frac{1}{${a}}\\]
                        Sein Wert
                        \\(\\frac{1}{${a}} = ${digits(1/a)}\\)
                        heißt Kehrwert der Zahl ${a}.
                        `
    } else if (bin < 0.4) {                    // 1/a
        kwaufgabe =     `\\[\\frac{1}{${a}}\\]`
        kwhelp =        `\\[(\\frac{1}{${a}})^{-1} = ${a}\\]`
        kwloesung =     `\\[=${a}\\]`
        kwexplainer =   `Der Kehrbruch eines Stammbruchs \\(\\frac{1}{${a}}\\) (d.h. Zähler = 1) ist einfach eine Zahl, nämlich der Nenner ${a} dieses Bruchs.`
    } else {                                    // a/b
        //kwaufgabe =     `\\[\\frac{${a}}{${b}}\\]`
        kwaufgabe =     `\\[${getlowestfraction(a/b, "injax")}\\]`
        kwhelp =        `\\[(\\frac{${a}}{${b}})^{-1}\\]`
        kwloesung =     `\\[=${getlowestfraction(b/a, "injax")} = ${digits2(b/a)}\\]`
        kwexplainer =   `\\[\\]`
    }

    //let intab = a/b
    //console.log(intab,Number.isInteger(intab))
    
    //console.log(a, b, digits(b/a))
    //console.log(powerFrac(2, -6))

    const aufgaben = [
        {
            nr:1,
            title: "Multiplizieren, gleiche Basis",
            description: "", 
            aufgabe: `\\[${a}^${n} \\cdot ${a}^${m} =\\]`,
            loesung: `\\[= ${a}^{${n+m}} = ${a**(n+m)}\\]`,
            help: `\\[a^n \\cdot a^m = a^{n + m}\\]`,
            explainer: `\\[${a}^${n} \\cdot ${a}^${m} =\\]
            \\[(${powerString(a, n)}) \\cdot (${powerString(a, m)}) = \\]
            \\[${powerString(a, n+m)} =\\]
            \\[= ${a}^{${n+m}}\\]
            \\[= ${a}^{${n}+${m}}\\]
            `,//!
        },
        {
            nr:2,
            title: "Negative Exponenten",
            description: "", 
            aufgabe: `\\[${a}^{-${n}} = \\]`,
            loesung: `\\[=\\frac{1}{${a**n}} = ${digits(1/a**n)}\\]`,
            help: `\\[a^{-n} = \\frac{1}{a^n}\\]`,
            explainer: `\\[a^{-n} = \\frac{1}{a^n}\\]
            \\[\\frac{1}{${a}^${n}} = \\frac{1}{${powerString(a, n)}} = \\frac{1}{${a**n}}\\]
            \\[= ${digits(1/a**n)}\\]
            Auf dem TR ausprobieren: tippe
            \\[${powerString(a, n)} = \\]
            und dann die 1/x Taste. Vergleiche mit dem Ergebnis!
            `,//!
        },
        {
            nr:3,
            title: "Dividieren, gleiche Basis",
            description: "", 
            aufgabe: `\\[\\frac{${a}^${n}}{${a}^${m}} =\\]`,
            //loesung: `\\[${digits(a**(n-m))}\\]`,
            //loesung: `\\[=\\frac{${a**m}}{${a**n}} = ${digits(1/a**n)}\\]`,
            loesung: `${powerDiv(a, n, m, "short")}`,
            help: `\\[\\frac{a^n}{a^m} = a^{n - m}\\]`,
            explainer: `${powerDiv(a, n, m)}`
        },
        {
            nr:4,
            title: "Multiplizieren, gleicher Exponent",
            description: "", 
            aufgabe: `\\[${a}^${n} \\cdot ${b}^${n} =\\]`,
            loesung: `\\[${(a*b)**n}\\]`,
            help: `\\[a^n \\cdot b^n = (a \\cdot b)^n\\]`,
            explainer: `\\[(${a} \\cdot ${b})^${n} = ${a*b}^${n} = \\]
            \\[${(a*b)**n}\\]`,
        },
        {
            nr:5,
            title: "Kehrwerte",
            description: "", 
            aufgabe: "Bestimme den Kehrwert von" + kwaufgabe,
            loesung: "Der Kehrwert ist" + kwloesung,
            help: kwhelp,
            explainer: kwexplainer,
        },
        {
            nr:6,
            title: "Dividieren, gleicher Exponent",
            description: "", 
            aufgabe: `\\[\\frac{${a}^${n}}{${b}^${n}} =\\]`,
            //loesung: `\\[(\\frac{${a}}{${b}})^${n} \\]`,
            loesung: Number.isInteger(a/b) ?
                `\\[${getlowestfraction(a/b, "injax")}^${n} \\]` :
                `\\[(${getlowestfraction(a/b, "injax")})^${n} \\]`,
            help: `\\[\\frac{a^n}{b^n} = (\\frac{a}{b})^n\\]`,
            explainer: `\\[\\frac{${a}^${n}}{${b}^${n}} =\\]
            \\[\\frac{${powerString(a, n)}}{${powerString(b, n)}} =\\]
            Diesen Bruch erhältst du auch, wenn du
            \\[\\frac{${a}}{${b}}\\]
            ${n}-mal multiplizierst und das entspricht der Lösung
            \\[(\\frac{${a}}{${b}})^${n} \\]
            `//!
        },
        {
            nr:7,
            title: "Potenzen von Potenzen",
            description: "", 
            aufgabe: `\\[(${a}^${n})^${m} =\\]`,
            loesung: ``,
            help: ``,
            explainer: ``,
        },
        /*
        {
            nr:6,
            title: "Gebrochene Exponenten",
            description: "", 
            aufgabe: `\\[${a}^\\frac{${n}}{${m}} =\\]`,
            loesung: ``,
            help: ``,
            explainer: ``,
        },
        */
        
    ]

    
    
    //const i = 4 //test
    const i = ( typeof filter == 'number' ? filter : Math.floor(Math.random() * aufgaben.length))
    

    const [aufgabe_,loesung_,help_,explainer_] = [aufgaben[i].aufgabe,aufgaben[i].loesung,aufgaben[i].help,aufgaben[i].explainer]

    let menu = "Das Sub-Menü in kommt Kürze"
    menu = aufgaben.filter(item => item.nr !== 0); // die nr:0 elemente nur in der Gesamtauswahl
    menu = menu.map(({ nr, title, description }) => ({
        nr,
        title,
        description,
      }));

      return [aufgabe_,loesung_,help_,explainer_,headerclass,menu]
}

export default potenzen;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
}

function powerString(a, n) {
    if (n === 0) {
      return "1"; // Any number to the power of 0 is 1
    } else if (n < 0) {
      throw new Error("Exponent (n) should be a non-negative integer.");
    }
    let powerString = `${a}`;
    for (let i = 1; i < n; i++) {
      powerString += ` \\cdot ${a}`;
    }
    return powerString;
  }

function digits(num) {
    //return num<1 ? num.toFixed(Math.floor(Math.log10(1/num))+3).replace(/\.0+$/, '') : num
    return num<1 ? parseFloat(num).toFixed(Math.floor(Math.log10(1/num))+3) : num
}
function digits2(num) {
    return parseFloat(num).toFixed(Math.floor(Math.log10(1/num))+3)
}

function powerDiv(a, n, m, mode) {
    if (n === 0 || m === 0) {
        throw new Error("Exponent muss !=0 sein")
    } else if (a <= 0) {
        throw new Error("Basis muss positiv sein");
    } else if ( n === m ) {
        return '\\[=1\\]'
    }
    if (mode === "short") {
        if (n > m) {
            return `\\[= ${a}^${n-m} = ${a**(n-m)}\\]`
        } else {                // n < m
            return `\\[= \\frac{1}{${a}^${m-n}} = \\frac{1}{${a**(m-n)}} = ${digits(a**(n-m))}\\]`
        }
    } else {
        if (n > m) {
            return `\\[\\frac{${a}^${n}}{${a}^${m}} = ${a}^{${n}-${m}} = ${a}^${n-m} = ${a**(n-m)}\\]`
        } else {                // n < m
            return `\\[\\frac{${a}^${n}}{${a}^${m}} = ${a}^{${n}-${m}} = ${a}^{${n-m}} = \\frac{1}{${a}^${m-n}} = \\frac{1}{${a**(m-n)}}\\]`
        }
    }
}

function getlowestfraction(x0,format) {
    let eps = 1.0E-15;
    let h, h1, h2, k, k1, k2, a, x;
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
    if (format === "jax"){
        return k === 1 ? `\\[{${h}}\\]` : `\\[\\frac{${h}}{${k}}\\]`
    } else if (format === "injax") {
        return k === 1 ? `{${h}}` : `\\frac{${h}}{${k}}`
    } else if (format === "text") {
        return `${h} geteilt durch ${k}`;
    } else {
        return h + "/" + k;
    }
}


