function times(filter){    
    let aufgabe, loesung, help, explainer, speak, speakhelp, speakexplainer, rect
    
    let op1 = 2 + getRandomInt(8)
    let op2 = 2 + getRandomInt(8)
    let op10, op20, mult1, mult2, mult1fac, mult2fac, mult12fac, loesungval

    //op1 = 4
    //op2 = 6

    if (typeof filter !== 'number') filter = getRandomInt(5) 
    //filter = 4
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
        help = `${op1}///${op2}`
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
    } else if(typeof filter !== 'number' || filter === 4) {  // Filter: 4, (-a) * (-b)
        const dividend = op1 * op2
        const divisor = op1
        const quotient = op2
        aufgabe = `\\[${dividend} \\div ${divisor} = ?\\]`
        loesung = `\\[${quotient}\\]`
        help = `In welcher Reihe ist der Dividend ${dividend} zu finden? Oder gibt es die ${dividend} in mehreren Reihen?
        <br>Ist der Divisor ${divisor} auch in einer dieser Reihen drin?
        <br>
        <br>Oder:
        <br><q>Welche Zahl gibt, mit ${divisor} multipliziert, die Zahl ${dividend}?</q>
        <br>
        <br>Oder (Profi-Variante):
        \\[${divisor} \\cdot x = ${dividend}\\]
        Das x ist dann der gesuchte Quotient!
        `//!
        speak = `${dividend} geteilt durch ${divisor} = ${quotient}`
        speakhelp = `Welche Zahl gibt, mit ${divisor} multipliziert, die Zahl ${dividend}?`
        explainer = `1. "Geteilt" kann verschieden geschrieben werden:
        <ul>
        <li>mit geteilt-Zeichen &nbsp; \\(${dividend} \\div ${divisor} = \\)</li>
        <li>mit geteilt-Zeichen &nbsp; \\(${dividend}  \\text{  }\\mathbf{:}\\text{  }  ${divisor} = \\)</li>
        <li>als Bruch &nbsp; \\(\\frac{${dividend}}{${divisor}} = \\)</li>
        <li>als Bruch mit "/" &nbsp; \\(${dividend} \\mathbf{/} ${divisor} = \\)</li>
        </ul>
        2. Du kannst die Probe machen
        <br>\\(${dividend} \\div ${divisor} = ${quotient} \\text{  ist das richtig? }\\)
        <br>Probe:
        <br>\\(${quotient} \\cdot ${divisor} = ${dividend} \\text{  stimmt! }\\) &#x1F601;
        <br>
        <br>3. Bezeichnungen
        <ul>
        <li>Die ${dividend} ist der Dividend.<br>Bei Bruchschreibweise ist ${dividend} der Zähler.</li>
        <li>Die ${divisor} ist der Divisor oder der Teiler.<br>Bei Bruchschreibweise ist ${divisor} der Nenner.</li>
        <li>Das Ergebnis der Geteilt-Aufgabe, also die ${quotient}, ist der Quotient.<br><q>Der Quotient aus ${dividend} und ${divisor} ist gleich ${quotient}.</q></li>
        <li>Man kann auch sagen
            <br><q>Das Verhältnis der Zahlen ${dividend} und ${divisor} ist ${quotient} zu 1</q>
            <br>Und entsprechend
            <br><q>Die Zahlen ${divisor} und ${dividend} verhalten sie wie 1 zu ${quotient}.</q></li>
        </ul>
        `//!
        speakexplainer = `Der Quotient aus ${dividend} und ${divisor} ist gleich ${quotient}`
    } else if (typeof filter !== 'number' || filter === 5) {  // Filter: 5, Längen, Fläche
        op10 = op1
        op20 = op2
        let mult = [1,10,100]
        mult1 = mult[Math.floor(Math.random()*mult.length)]
        mult2 = mult[Math.floor(Math.random()*mult.length)]
        if (mult1 === 1 && mult2 === 1) mult1 = 10
        op1 = op1 * mult1
        op2 = op2 * mult2
        mult1fac = mult1 !==1 ? `\\cdot ${mult1}` : ""
        mult2fac = mult2 !==1 ? `\\cdot ${mult2}` : ""
        mult12fac = mult1*mult2 !== 1 ? `\\cdot ${mult1*mult2}`: ""
        //aufgabe = `\\[${op1} \\cdot ${op2} = \\]`
        aufgabe = `Berechne den Flächeninhalt! Die Fläche ist rechteckig mit der Länge ${op1} m und der Breite ${op2} m`
        loesungval = op1*op2
        loesung = `\\[${op1} \\text{ m} \\cdot ${op2} \\text{ m}  = ${loesungval} \\text{ m}^2 \\]`
        help = `\\[${op1} \\text{ m} \\cdot ${op2} \\text{ m}\\]
        \\[= ${op1} \\cdot ${op2} \\cdot \\text{ m} \\cdot \\text{ m}\\]
        \\[= ${op1} \\cdot ${op2} \\text{ m}^2\\]
        `//!
        explainer = `
        \\[\\text{1 m} \\cdot \\text{1 m} \\text{ = 1 m}^2\\]
        Die Meter (m) sind Längeneinheiten
        <br>Beim Multiplizieren von Zahlen mit Einheiten - also statt den Zahlen \\(${op1} \\cdot ${op2}\\) die Längen \\(${op1} \\text{ m} \\cdot ${op2} \\text{ m}\\)  - müssen die Einheiten ebenfalls multipliziert werden.
        <br>\\(\\text{m }\\cdot\\text{ m} = \\text{ m}^2\\)
        <br>Meter &middot; Meter = Quadratmeter
        `//!
        speak = `Ein Rechteck mit den Abmessungen ${op1} Meter und ${op2} Meter hat eine Fläche von ${loesungval} Quadratmetern`
    
    } else if (typeof filter !== 'number' || filter === 6) {  // Filter: 6, Durchfluss - Kinderplanschbecken
        op1 = 5 + getRandomInt(5)
        aufgabe = `Ein Kinderplanschbecken wird mit einem Gartenschlauch gefüllt, durch den ${op1} Liter pro Minute fließen. Wieviel Wasser ist nach ${op2} Minuten eingefüllt?`
        loesungval = op1*op2
        loesung = `\\[${op1} \\text{ l/min} \\cdot ${op2} \\text{ min}  = ${loesungval} \\text{ l} \\]`
        help = `Die Menge <i>pro</i> Minute mal die Zahl der Minuten gibt die Gesamtmenge.
        `//!
        explainer = `
        Siehe Hilfe <kbd>?</kbd>
        Die Einheiten sind Liter (l) für das Volumen und Minuten (min) für die Zeit.
        <br>Wenn du bei der Rechnung die Einheiten korrekt mitnehmen willst, kannst du schreiben:
        \\[${op1} \\frac{l}{min} \\cdot ${op2} min = ${loesungval} l\\]
        denn
        \\[\\frac{l}{min} \\cdot min  = l\\]
        `//!
        speak = `Wenn pro Minute ${op1} Liter in das Planschbecken fließen, dann sind nach ${op2} Minuten ${loesungval} Liter drin, du rechnest ${op1} mal ${op2}.`
    
    } else if (typeof filter !== 'number' || filter === 7) {  // Filter: 7, Ohmsches Gesetz
        aufgabe = `Durch einen elektrischen Widerstand von ${op1} Ohm fließt ein Strom von ${op2} Amp&#232;re. Welche Spannung wird an dem Widerstand gemessen?`
        loesungval = op1*op2
        loesung = `Das Voltmeter zeigt ${loesungval} V`
        help = `Die Formel ist das Ohmsche Gesetz
        <br>Spannung (in Volt) = Strom (in Amp&#232;re) mal Widerstand (in Ohm, &Omega;)
        <br>Die Formelzeichen sind: Spannung U, Strom I, Widerstand R
        <br>Damit lautet das Ohmsche Gesetz: U = I &middot; R
        <br>&Rarr; einfach das Produkt aus I und R ausrechnen!
        `//!
        explainer = `
        Siehe Hilfe <kbd>?</kbd>
        Wenn der Strom I in Amp&#232;re (A) und der Widerstand R in Ohm (&Omega;) gegeben sind, dann ist die anliegende Spannung in Volt (V) einfach das Produkt.
        `//!
        speak = `Wenn durch einen Widerstand von ${op1} Ohm ein Strom von ${op2} Ampere fließt, dann fällt an dem Widerstand eine Spannung von ${loesungval} Volt ab.
        `//!
    
    } else if (typeof filter !== 'number' || filter === 8) {  // Filter: 8, Leistung P = U * I
        aufgabe = `An einem elektrischen Widerstand liegt eine Spannung von ${op1} Volt an und es fließt ein Strom von ${op2} Amp&#232;re. Welche elektrische Leistung wird verbraucht?`
        loesungval = op1*op2
        loesung = `Die Leistung beträgt ${loesungval} Watt`
        help = `Die Formel:
        <br>Leistung (in Watt) = Spannung (in Volt) mal Strom (in Amp&#232;re)
        <br>Die Formelzeichen sind: Leistung P <i>wie Power</i>, Spannung U, Strom I
        <br>Damit ist die elektrische Leistung: P = U &middot; I
        <br>&Rarr; einfach das Produkt aus U und I ausrechnen!
        `//!
        explainer = `
        Siehe Hilfe <kbd>?</kbd>
        Wenn die Spannung U in Volt (V) und der Strom I in Amp&#232;re (A) gegeben sind, dann wird eine Leistung von ${op1} &middot; ${op2} Watt (W) verbraucht.
        `//!
        speak = `Wenn durch einen Verbraucher bei ${op1} Volt Anschlussspannung ein Strom von ${op2} Ampere fließt, dann verbraucht dieser eine Leistung von ${loesungval} Watt.
        `//!
    
    } else if (typeof filter !== 'number' || filter === 9) {  // Filter: 9, Energie = Leistung mal Zeit
        aufgabe = `In einem Haushalt nehmen Heizung und Geräte für ${op1} Stunden eine mittlere Leistung von ${op2} Kilowatt auf. Wieviel Energie haben sie in der Zeit verbraucht?`
        loesungval = op1*op2
        loesung = `Es wurde eine Energie ${loesungval} kWh verbraucht.`
        help = `E = P &middot; t
        <br>Formelzeichen:
        <br>Einergie E, Leistung P <i>Power</i>, Zeit t <i>time</i>
        <br>Einheiten:
        <br>Kilowatt kW, Kilowattstunde kWh, Stunde h <i>(hour)</i>
        <br>&Rarr; einfach P und t malnehmen, um E zu erhalten!
        `//!
        explainer = `
        Siehe Hilfe <kbd>?</kbd>
        <br>Die Energie wird in Kilowattstunden gemessen, egal, ob es sich im elektrische Energie oder eine andere Energieform handelt. Energie E ist Leistung P mal Zeit t.
        <br>1 Kilowattstunde (kWh) = 1 Kilowatt (kW) &middot; 1 Stunde (h)
        <br>E = ${op2} kW &middot; ${op1} h = ${op2} &middot; ${op1} kWh = ${loesungval} kWh
        `//!
        speak = `Bei einer mittleren Leistungsaufnahme von ${op2} Kilowatt über ${op1} Stunden werdenn ${loesungval} Kilowattstunden Energie verbraucht. Rechne einfach ${op2} mal ${op1}
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
            title: "Einmaleins mit negativen Faktoren",
            description: "",
                aufgabe: aufgabe,
                loesung: loesung,
                help: help,
                explainer: explainer,
                speak: speak
        },
        {
            nr:5, // filter 4
            title: "Division mit Probe",
            description: "",
            aufgabe: aufgabe,
            loesung: loesung,
            help: help,
            explainer: explainer,
            speak: speak
        },
        {
            nr:6,
            title: "Flächenberechnung, Meter, Quadratmeter",
            description: "",
            aufgabe: aufgabe,
            loesung: loesung,
            help: help,
            explainer: explainer,
            speak: speak
        },
        {
            nr:7,
            title: "Kinderplanschbecken füllen",
            description: "",
            aufgabe: aufgabe,
            loesung: loesung,
            help: help,
            explainer: explainer,
            speak: speak
        },
        {
            nr:8,
            title: "Ohmsches Gesetz",
            description: "",
            aufgabe: aufgabe,
            loesung: loesung,
            help: help,
            explainer: explainer,
            speak: speak
        },
        {
            nr:9,
            title: "Leistung = Spannung mal Strom",
            description: "",
            aufgabe: aufgabe,
            loesung: loesung,
            help: help,
            explainer: explainer,
            speak: speak
        },
        {
            nr:10,
            title: "Energie = Leistung mal Zeit",
            description: "",
            aufgabe: aufgabe,
            loesung: loesung,
            help: help,
            explainer: explainer,
            speak: speak
        },
        /*
                {
            nr:7,
            title: "11 x 19",
            description: "",
                aufgabe: ``,
                loesung: ``,
                help: ``,
                explainer: `
                `//!
        },
        {
            nr:8,
            title: "Binomische Formeln",
            description: "",
                aufgabe: ``,
                loesung: ``,
                help: ``,
                explainer: `
                `//!
        },
        {
            nr98,
            title: "Flächen berechnen",
            description: "",
                aufgabe: ``,
                loesung: ``,
                help: ``,
                explainer: `
                `//!
        },
        {
            nr:10,
            title: "Weg, Zeit, Geschwindigkeit",
            description: "",
                aufgabe: ``,
                loesung: ``,
                help: ``,
                explainer: `
                `//!
        },
        {
            nr:11,
            title: "Energie und Leistung",
            description: "",
                aufgabe: ``,
                loesung: ``,
                help: ``,
                explainer: `
                `//!
        },
        {
            nr:12,
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
    return [aufgabe_,loesung_,help_,explainer_,undefined,menu, speak, speakhelp, speakexplainer]
 }

export default times;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
}

function brac(n) {
    return n < 0 ? n = "("+n+")" : n.toString()
  }