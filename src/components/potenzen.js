function potenzen(filter) {
    let headerclass = "subheader2"

    let a = 2 + getRandomInt(8)
    let b = 3 + getRandomInt(7)
    if (a === b) b=9
    let m = 2 + getRandomInt(8) 
    let n = 2 + getRandomInt(7) 
    if (m === n) n=9

    //console.log(a, n, m)

    const aufgaben = [
        {
            nr:1,
            title: "Multiplizieren, gleiche Basis",
            description: "", 
            aufgabe: `\\[${a}^${n} \\cdot ${a}^${m} =\\]`,
            loesung: ``,
            help: ``,
            explainer: ``,
        },
        {
            nr:2,
            title: "Positive und negative Exponenten",
            description: "", 
            aufgabe: `\\[${a}^-${n} =\\]`,
            loesung: ``,
            help: ``,
            explainer: ``,
        },
        {
            nr:3,
            title: "Dividieren, gleiche Basis",
            description: "", 
            aufgabe: `\\[\\frac{${a}^${n}}{${a}^${m}} =\\]`,
            loesung: ``,
            help: ``,
            explainer: ``,
        },
        {
            nr:4,
            title: "Multiplizieren, gleicher Exponent",
            description: "", 
            aufgabe: `\\[${a}^${n} \\cdot ${b}^${n} =\\]`,
            loesung: ``,
            help: ``,
            explainer: ``,
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
        // return h + "/" + k;
       
           // (format === "jax") ? `\\[\\frac{${h}}{${k}}\\]` : h + "/" + k
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