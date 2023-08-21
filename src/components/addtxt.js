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

    console.table(test)
    console.log(test)
    

    
    aufgabe = `Kontostand: &euro; ${vorher}

    `//!
    loesung =`Endstand: &euro; ${loesungnum} `


   
    /* 
    help = ``
    explainer = ``
    speak = ``
    speakhelp = ``
    speakexplainer  ``
    */


    

    return [aufgabe, loesung, help, explainer];
}

export default addtxt;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
}