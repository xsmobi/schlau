function potenzen(filter) {
    let headerclass = "subheader2"

    let a = 2 + getRandomInt(8)
    let b = 3 + getRandomInt(7)
    if (a === b) b=9
    let m = 2 + getRandomInt(8) 
    let n = 2 + getRandomInt(7) 
    if (m === n) n=9

    function digits(num) {
        return num<1 ? num.toFixed(Math.floor(Math.log10(1/num))+3) : num
    }
    
    function powerDiv(a, n, m) {
        if (n === 0 || m === 0) {
            throw new Error("Exponent muss !=0 sein")
        } else if (a <= 0) {
            throw new Error("Basis muss positiv sein");
        } else if ( n === m ) {
            return '\\[=1\\]'
        }
        if (n > m) {
            return `\\[\\frac{${a}^${n}}{${a}^${m}} = ${a}^{${n}-${m}} = ${a}^${n-m} = ${a**(n-m)}\\]`
        } else {                // n < m
            return `\\[\\frac{${a}^${n}}{${a}^${m}} = ${a}^{${n}-${m}} = ${a}^{${n-m}} = \\frac{1}{${a}^${m-n}} = \\frac{1}{${a**(m-n)}}\\]`
        }
    }
    
    
    //console.log(a, n, digits(a**n))
    //console.log(powerFrac(2, -6))

    const aufgaben = [
        {
            nr:1,
            title: "Multiplizieren, gleiche Basis",
            description: "", 
            aufgabe: `\\[${a}^${n} \\cdot ${a}^${m} =\\]`,
            loesung: `\\[= ${a}^{${n+m}} = ${a**(n+m)}\\]`,
            help: `\\[a^n \\cdot a^m = a^{n + m}\\]`,
            explainer: `\\[${a}^${n} \\cdot ${a}^${m} = ${a}^{${n}+${m}}\\]
            \\[(${powerString(a, n)}) \\cdot (${powerString(a, m)}) = \\]
            \\[${powerString(a, n+m)} \\]
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
            loesung: ``,
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
            aufgabe: `\\[(\\frac{${a}}{${a}})^-${n} =\\]`,
            loesung: ``,
            help: ``,
            explainer: ``,
        },
        {
            nr:6,
            title: "Dividieren, gleicher Exponent",
            description: "", 
            aufgabe: `\\[\\frac{${a}^${n}}{${b}^${n}} =\\]`,
            loesung: ``,
            help: ``,
            explainer: ``,
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
    return num<1 ? num.toFixed(Math.floor(Math.log10(1/num))+3) : num
}



  /*
  function powerFrac(a, n) {
    if (n === 0) {
        return "1"; // Any number to the power of 0 is 1
    } else if (a <= 0) {
        throw new Error("Basis muss positiv sein");
    }
    if (n > 0) {
        return a**n
    } else { // n < 0
        return '\\[\\frac{1}{${a**n}\\]'
    }
    } 
    */