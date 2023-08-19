function times(filter){    
    let aufgabe, loesung, help, explainer, speak
    
    let op1 = 2 + getRandomInt(8)
    let op2 = 2 + getRandomInt(8)
    let op10, op20, mult1, mult2, mult1fac, mult2fac, mult12fac, loesungval

    //op1 = 4
    //op2 = 6

    if (typeof filter !== 'number') filter = getRandomInt(4) 
    //filter = 1
    //console.log("Filter2: " + filter + typeof filter)

    loesungval = op1*op2
    loesung = `\\[${op1} \\cdot ${op2} = ${loesungval}\\]`
    speak = `${op1} mal ${op2} = ${loesungval}`

    help = `
    (Graphik folgt)
    `//!

    //filter = undefined;

    if (typeof filter !== 'number' || filter === 0) {  // Filter: 0, Plain Vanilla
        aufgabe = `\\[${op1} \\cdot ${op2} = ?\\]`
        loesungval = op1*op2
        loesung = `\\[${op1} \\cdot ${op2} = ${loesungval}\\]`
        speak = `${op1} mal ${op2} = ${loesungval}`
        explainer =
        op1 === 2 ?
        `\\[2 \\cdot ${op2} = ${op2} + ${op2} = ${loesungval}\\]`
        :
        op2 === 2 ?
        `\\[${op1} \\cdot 2 = ${op1} + ${op1} = ${loesungval}\\]`
        :
        op1 === 5 ?
        `\\[10 \\cdot ${op2} = ${10*op2}\\] \\[5 \\cdot ${op2} = \\frac{${10*op2}}{2} = ${loesungval}\\]`
        :
        op2 === 5 ?
        `\\[${op1} \\cdot 10 = ${10*op1}\\]\\[${op1} \\cdot 5 = \\frac{${10*op1}}{2} = ${loesungval}\\]`
        :
        op1 === 9 ?
        `\\[10 \\cdot ${op2} = ${10*op2}\\] \\[9 \\cdot ${op2} = ${10*op2} - ${op2} = ${loesungval}\\]`
        :
        op2 === 9 ? 
        `\\[${op1} \\cdot 10 = ${10*op1}\\] \\[${op1} \\cdot 9 = ${10*op1} - ${op1} = ${loesungval}\\]`
        : 
        op1 === 4 ?
        `\\[4 \\cdot ${op2} = 2 \\cdot 2 \\cdot ${op2}\\] \\[2 \\cdot ${2*op2} = ${loesungval}\\]<q>Zweimal das Doppelte von ${op2}  ist zweimal ${2*op2}, ist ${loesungval}</q>`
        :
        op2 === 4 ? 
        `\\[${op1} \\cdot 4 = ${op1} \\cdot 2 \\cdot 2\\] \\[${op1*2} \\cdot 2 = ${loesungval}\\]<q>Zweimal das Doppelte von ${op1}  ist zweimal ${2*op1}, ist ${loesungval}</q>`
        : 
        op1 === 3 ?
        `\\[3 \\cdot ${op2} = ${op2} + ${op2} + ${op2} = ${2*op2} + ${op2} = ${loesungval}\\]`
        :
        op2 === 3 ?
        `\\[${op1} \\cdot 3 = ${op1} + ${op1} + ${op1} = ${2*op1} + ${op1} = ${loesungval}\\]`
        :
        op1 === 8 ?
        `\\[8 \\cdot ${op2} = ${op2} \\cdot 2 \\cdot 2 \\cdot 2 = ${loesungval}\\]<q>Die ${op2} dreimal verdoppeln: ${op2} &rarr; ${2*op2} &rarr; ${4*op2} &rarr; ${loesungval}</q>`
        :
        op2 === 8 ? 
        `\\[${op1} \\cdot 8 = ${op1} \\cdot 2 \\cdot 2 \\cdot 2 = ${loesungval}\\]<q><q>Die ${op1} dreimal verdoppeln: ${op1} &rarr; ${2*op1} &rarr; ${1*op2} &rarr; ${loesungval}</q>`
        : 
        op1 === 6 ?
        `\\[6 \\cdot ${op2} = ${op2} \\cdot 3 \\cdot 2 = ${3*op2} \\cdot 2 = ${loesungval}\\]<q>Die ${op2} erst mal 3, dann mal 2, also ${op2} &rarr; ${3*op2} &rarr; ${loesungval}</q>`
        :
        op2 === 6 ? 
        `\\[${op1} \\cdot 8 = ${op1} \\cdot 3 \\cdot 2 = ${3*op1} \\cdot 2 = ${loesungval}\\]<q>Die ${op1} erst mal 3, dann mal 2, also ${op1} &rarr; ${3*op1} &rarr; ${loesungval}</q>`
        : 
        "";
    } else if (typeof filter !== 'number' || filter === 1) {  // Filter: 1, mit 10, 100, 1000
        op10 = op1
        op20 = op2
        let mult = [1,10,100,1000]
        mult1 = mult[Math.floor(Math.random()*mult.length)]
        mult2 = mult[Math.floor(Math.random()*mult.length)]
        if (mult1 === 1 && mult2 === 1) mult1 = 10
        op1 = op1 * mult1
        op2 = op2 * mult2
        mult1fac = mult1 !==1 ? `\\cdot ${mult1}` : ""
        mult2fac = mult2 !==1 ? `\\cdot ${mult2}` : ""
        mult12fac = mult1*mult2 !== 1 ? `\\cdot ${mult1*mult2}`: ""
        aufgabe = `\\[${op1} \\cdot ${op2} = \\]`
        loesungval = op1*op2
        loesung = `\\[${op1} \\cdot ${op2} = ${loesungval}\\]`
        help = `\\[= ${op10} ${mult1fac} \\cdot ${op20} ${mult2fac}\\]
        \\[= ${op10} \\cdot ${op20} ${mult1fac} ${mult2fac}\\]
        \\[= ${op10} \\cdot ${op20} \\cdot ${mult12fac}\\]
        `//!
        help = mult1 === 1 || mult2 === 1 ? // einer = 1 (dass beide = 1, ist bereits ausgeschl., s.o.)
            `\\[= ${op10} \\cdot ${op20} ${mult12fac}\\]` 
        :
            `\\[= ${op10} ${mult1fac} \\cdot ${op20} ${mult2fac}\\]
            \\[= ${op10} \\cdot ${op20} ${mult1fac} ${mult2fac}\\]
            \\[= ${op10} \\cdot ${op20} ${mult12fac}\\]
            `//!
        //console.log(mult1, mult2, mult1*mult2)
        explainer = help + `
        \\[= ${op10 * op20} \\cdot ${mult1*mult2}\\]
        \\[= ${loesungval}\\]
        `//!
        speak = `${op1} mal ${op2} = ${loesungval}`
    
    } else if (typeof filter !== 'number' || filter === 2) {  // Filter: 2, mit 0.1, 0.01, 0.001
        op10 = op1
        op20 = op2
        let mult = [1,0.1,0.01,0.001]
        mult1 = mult[Math.floor(Math.random()*mult.length)]
        mult2 = mult[Math.floor(Math.random()*mult.length)]
        if (mult1 === 1 && mult2 === 1) mult1 = 0.1
        op1 = Math.round(op1 * mult1*1000)/1000
        op2 = Math.round(op2 * mult2*1000)/1000
        mult1fac = mult1 !==1 ? `\\cdot ${mult1}` : ""
        mult2fac = mult2 !==1 ? `\\cdot ${mult2}` : ""
        //mult12fac = mult1*mult2 !== 1 ? `\\cdot ${mult1*mult2}`: ""
        mult12fac = mult1*mult2 !== 1 ? `\\cdot ${Math.round(mult1*mult2*1000000)/1000000}`: ""
        aufgabe = `\\[${op1} \\cdot ${op2} = ?\\]`
        loesungval = Math.round(op1*op2*1000000)/1000000
        //loesungval = op1*op2
        loesung = `\\[${op1} \\cdot ${op2} = ${loesungval}\\]`
        help = `\\[= ${op10} ${mult1fac} \\cdot ${op20} ${mult2fac}\\]
        \\[= ${op10} \\cdot ${op20} ${mult1fac} ${mult2fac}\\]
        \\[= ${op10} \\cdot ${op20} \\cdot ${mult12fac}\\]
        `//!
        help = mult1 === 1 || mult2 === 1 ? // einer = 1 (dass beide = 1, ist bereits ausgeschl., s.o.)
            `\\[= ${op10} \\cdot ${op20} ${mult12fac}\\]` 
        :
            `\\[= ${op10} ${mult1fac} \\cdot ${op20} ${mult2fac}\\]
            \\[= ${op10} \\cdot ${op20} ${mult1fac} ${mult2fac}\\]
            \\[= ${op10} \\cdot ${op20} ${mult12fac}\\]
            `//!
        //console.log(mult1, mult2, mult1*mult2)
        explainer = help + `
        \\[= ${op10 * op20} ${mult12fac}\\]
        \\[= ${loesungval}\\]
        `//!
        speak = `${op1} mal ${op2} = ${loesungval}`
    } else if(typeof filter !== 'number' || filter === 3) {  // Filter: 3, (-a) * (-b)
        if (Math.random() < 0.5) op1 = -op1
        if (Math.random() < 0.5) op2 = -op2
        let abs1 = Math.abs(op1)
        let abs2 = Math.abs(op2)
        aufgabe = `\\[${brac(op1)} \\cdot ${brac(op2)} = ?\\]`
        loesungval = op1*op2
        loesung = `\\[${brac(op1)} \\cdot ${brac(op2)} = ${loesungval}\\]`
        help = `Welcher der 4 Fälle ist es?
        \\[${abs1} \\cdot ${abs2} \\Rightarrow \\oplus \\]
        \\[${brac(-abs1)} \\cdot ${abs2} \\Rightarrow \\ominus \\]
        \\[${abs1} \\cdot ${brac(-abs2)} \\Rightarrow \\ominus \\]
        \\[${brac(-abs1)} \\cdot ${brac(-abs2)} \\Rightarrow \\oplus \\]
        `
        speak = `${op1} mal ${op2} = ${loesungval}`
        explainer = `Erinnere dich an die Plus- und Minus- Regeln beim Mal-Rechnen:
        <ul>
            <li>${op1 > 0 && op2 > 0 ? "&#9746;" : "&#9744;"} \\(${abs1} \\cdot ${abs2} = ${Math.abs(loesungval)} \\)</li>
            <li>${op1 > 0 && op2 < 0 ? "&#9746;" : "&#9744;"} \\(${abs1} \\cdot ${brac(-abs2)} = ${-Math.abs(loesungval)} \\) </li>
            <li>${op1 < 0 && op2 > 0 ? "&#9746;" : "&#9744;"} \\(${brac(-abs1)} \\cdot ${abs2} = ${-Math.abs(loesungval)} \\)</li>
            <li>${op1 < 0 && op2 < 0 ? "&#9746;" : "&#9744;"} \\(${brac(-abs1)} \\cdot ${brac(-abs2)} = ${Math.abs(loesungval)} \\)</li>
        </ul>
        `//!
    }

    const aufgaben = 
    [
        {
            nr:1, // filter 0
            title: "Kleines Einmaleins Plain Vanilla",
            description: "",
                aufgabe: aufgabe,
                loesung: loesung,
                help: help,
                explainer: explainer,//!
                speak: speak
        },
        {
            nr:2, // filter 1
            title: "10 x 100, 100 x 1000",
            description: "",
                aufgabe: aufgabe,
                loesung: loesung,
                help: help,
                explainer: explainer,//!
                speak: speak
        },
        {
            nr:3, // filter 2
            title: "0.1 x 0.001, 0.01 x 0.01",
            description: "",
                aufgabe: aufgabe,
                loesung: loesung,
                help: help,
                explainer: explainer,//!
                speak: speak
        },
        {
            nr:4, // filter 3
            title: "(-1) x 1, (-1) x (-1)",
            description: "",
                aufgabe: aufgabe,
                loesung: loesung,
                help: help,
                explainer: explainer,
                speak: speak
        },
        /*
        {
            nr:5,
            title: "1000 x 0,001, ... 1000000",
            description: "",
                aufgabe: ``,
                loesung: ``,
                help: ``,
                explainer: `
                `//!
        },
        {
            nr:6,
            title: "11 x 19",
            description: "",
                aufgabe: ``,
                loesung: ``,
                help: ``,
                explainer: `
                `//!
        },
        {
            nr:7,
            title: "Binomische Formeln",
            description: "",
                aufgabe: ``,
                loesung: ``,
                help: ``,
                explainer: `
                `//!
        },
        {
            nr:8,
            title: "Flächen berechnen",
            description: "",
                aufgabe: ``,
                loesung: ``,
                help: ``,
                explainer: `
                `//!
        },
        {
            nr:9,
            title: "Weg, Zeit, Geschwindigkeit",
            description: "",
                aufgabe: ``,
                loesung: ``,
                help: ``,
                explainer: `
                `//!
        },
        {
            nr:10,
            title: "Energie und Leistung",
            description: "",
                aufgabe: ``,
                loesung: ``,
                help: ``,
                explainer: `
                `//!
        },
        {
            nr:11,
            title: "Einkaufen",
            description: "",
                aufgabe: ``,
                loesung: ``,
                help: ``,
                explainer: `
                `//!
        },
        */

    ]

    const i = ( typeof filter === 'number' ? filter : Math.floor(Math.random() * aufgaben.length))
    //console.log("i = " + i)

    const [aufgabe_,loesung_,help_,explainer_] = [aufgaben[i].aufgabe,aufgaben[i].loesung,aufgaben[i].help,aufgaben[i].explainer]
    
    let menu = "Das Sub-Menü in kommt Kürze"
    menu = aufgaben.filter(item => item.nr !== 0); // die nr:0 elemente nur in der Gesamtauswahl
    menu = menu.map(({ nr, title, description }) => ({
        nr,
        title,
        description,
      }));
   

    
    //return [aufgabe, loesung, help, explainer,,,speak];
    return [aufgabe_,loesung_,help_,explainer_,,menu, speak]
 }

export default times;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
}

function brac(n) {
    return n < 0 ? n = "("+n+")" : n.toString()
  }