function times(filter){    
    let aufgabe, loesung, help, explainer, speak

    let op1 = 2 + getRandomInt(8)
    let op2 = 2 + getRandomInt(8)

    //aufgabe = `\\[${op1} \\cdot ${op2} = ?\\]`

    op2 = 4
    filter = 0

    const loesungval = op1*op2
    loesung = `\\[${op1} \\cdot ${op2} = ${loesungval}\\]`
    
    //loesung = `${op1} &middot; ${op2} = ${op1*op2}`
    speak = `${op1} mal ${op2} = ${loesungval}`

    help = `
    
    `//!

    /*
    if (op1 === 9){
        explainer = `
            \\[10 \\cdot ${op2} = ${10*op2}\\]
            \\[9 \\cdot ${op2} = ${10*op2} - ${op2}\\]
    `} else if (op2 === 9) {
        explainer = `
            \\[${op1} \\cdot 10 = ${10*op1}\\]
            \\[${op1} \\cdot 9 = ${10*op1} - ${op1}\\]
    `}
    */
//filter = undefined;

if (typeof filter !== 'number' || filter === 0) {
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
        `\\[${op1} \\cdot 4 = ${op2} \\cdot 2 \\cdot 2\\] \\[${op1*2} \\cdot 2 = ${loesungval}\\]<q>Zweimal das Doppelte von ${op1}  ist zweimal ${2*op1}, ist ${loesungval}</q>`
        : 

        "";

    }

    const aufgaben = 
    [
     
        {
            nr:1,
            title: "Kleines Einmaleins Plain Vanilla",
            description: "",
                aufgabe: `\\[${op1} \\cdot ${op2} = ?\\]`,
                loesung: `\\[${op1} \\cdot ${op2} = ${op1*op2}\\]`,
                help: ``,
                explainer: explainer,//!
                speak: `${op1} mal ${op2} = ${op1*op2}`
        },
        {
            nr:2,
            title: "Kleines Einmaleins mit Teilen",
            description: "",
                aufgabe: ``,
                loesung: ``,
                help: ``,
                explainer: `
                `//!
        },
        /*
        {
            nr:3,
            title: "10 x 100, 100 x 1000",
            description: "",
                aufgabe: ``,
                loesung: ``,
                help: ``,
                explainer: `
                `//!
        },
        {
            nr:4,
            title: "0,1 x 0,01",
            description: "",
                aufgabe: ``,
                loesung: ``,
                help: ``,
                explainer: `
                `//!
        },
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