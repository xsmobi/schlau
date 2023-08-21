function addtxt(){    
    let aufgabe, loesung, help, explainer, speak, speakhelp, speakexplainer
    let vorher, zahlung1, stand1, zahlung2abb, stand2, zahlung3ein, loesungnum

    vorher = 1200 + 10*getRandomInt(20)
    zahlung1 = 10 * getRandomInt(20)
    if (!zahlung1) zahlung1 = zahlung1 + 200      // Zahlung 1 pos od negativ
   
    stand1 = vorher + zahlung1          
    zahlung2abb = - stand1 - 100 - 10 * getRandomInt(20)  // Abb bringt Stand ins Minus

    stand2 = stand1 + zahlung2abb
    zahlung3ein = Math.abs(stand2) + 50*(1 + getRandomInt(10))
    loesungnum = stand2 + zahlung3ein

   
    const test = [
        ["Start", "", vorher],
        [`${zahlung1 > 0 ? "Einzahlung" : "Auszahlung"}`, zahlung1, stand1],
        ["Auszahlung, Überziehung", zahlung2abb, stand2],
        ["Einzahlung, Endstand", zahlung3ein, loesungnum]
    ]

    //console.table(test)
    //console.log(test)
    

    
    aufgabe = `Kontostand: &euro; ${vorher}
    <br>${zahlung1 > 0 ? "Einzahlung" : "Auszahlung"} &euro; ${zahlung1}
    <br>Auszahlung &euro; ${-zahlung2abb}
    <br>Einzahlung &euro; ${zahlung3ein}
    <br>Kontostand = ?
    `//!
    loesung =`<b>Kontostand: &euro; ${loesungnum}</b>`

    help = `Tipp: mache dir eine Tabelle
        <table>
        <tr>
            <td>&nbsp;</td>
            <td><b>Zahlung +/-</b></td>
            <td><b>Stand</b></td>
        </tr>
        <tr>
            <td>Start</td>
            <td>&nbsp;</td>
            <td class="text-end">${vorher}</td>
        </tr> 
        <tr>
            <td class="text-end">${zahlung1 > 0 ? "Einzahlung" : "Auszahlung"}</td>
            <td class="text-end">${zahlung1}</td>
            <td>&nbsp;</td>
        </tr> 
        <tr>
            <td>Auszahlung</td>
            <td class="text-end">${zahlung2abb}</td>
            <td>&nbsp;</td>
        </tr> 
        <tr>
            <td>Einzahlung</td>
            <td class="text-end">${zahlung3ein}</td>
            <td>&nbsp;</td>
        </tr>
        </table>
        Rechne im Kopf, gutes Training fürs Gehirn!
    `//!

explainer = `1. <u>Übersichtliche Methode</u>
        <table class="mt-0">
            <tr>
                <td>&nbsp;</td>
                <td class="text-end"><b>Zahlung +/-</b></td>
                <td class="text-end"><b>Stand</b></td>
            </tr>
            <tr>
                <td>Start</td>
                <td>&nbsp;</td>
                <td class="text-end">${vorher}</td>
        </tr> 
        <tr>
                <td>${zahlung1 > 0 ? "Einzahlung" : "Auszahlung"}</td>
                <td class="text-end">${zahlung1}</td>
                <td class="text-end">${stand1}</td>
        </tr> 
        <tr>
                <td>Auszahlung, Überziehung</td>
                <td class="text-end">${zahlung2abb}</td>
                <td class="text-end">${stand2}</td>
        </tr> 
        <tr>
                <td>Einzahlung, Endstand</td>
                <td class="text-end">${zahlung3ein}</td>
                <td class="text-end">${loesungnum}</td>
        </tr>
        </table>

        2. <u>Schnelle Methode, direkt</u>
        <br>Summe = ${vorher} ${zahlung1 > 0 ? " + " : " - "}${Math.abs(zahlung1)} - ${-zahlung2abb} + ${zahlung3ein}
        = ${loesungnum}
        <br>
        <br>
        <u>Welche Methode ist besser?</u>
        <br>Methode 1 ist übersichtlich. Du siehst auch, ab das Konto mal im Minus war. Du kannst die Zwischensummen leichter im Kopf berechnen. Ohne Taschenrechner ist Methode 1 ideal, sie ist schnell und ziemlich fehlersicher.
        <br>Methode 2 gibt dir mit Taschenrechner das schnelle Ergebnis.
 `//!

speak = undefined
speakhelp = `Der Kontostand beträgt anfangs ${vorher} Euro und es gibt drei Vorgänge. ${zahlung1} Euro werden eingezahlt, also plus.
${-zahlung2abb} Euro werden abgehoben also minus.
${zahlung3ein} werden eingezahlt.
`//
//speakexplainer =  ``
    


    

    return [aufgabe, loesung, help, explainer,undefined,undefined,speak,speakhelp];
}

export default addtxt;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
}