function prozent(filter) {
      
    let headerclass = "subheader"
    const personen = ["Adonis", "Kenan", "Leon", "Rogheyeh", "Justin", "Marta", "Vagid", "Rabia", "Jerome", "Ömer", "Gina", "Geraldine", "Finja", "Tabea", "Sophie", "Angelos", "Tariq", "Ola"]
    let person = personen[Math.floor(Math.random()*personen.length)];
    const popWeltMrd = 8.04
    const popDeMio = 84.3

    let grundwert, verdienstplus, mehrverdienst, stromanteile, stromanteil, strommengen, strommenge, 
    smartWeltMrd, smartDeMio, autosWeltMrd, autosDeMio, preis1, rabatt1,
    kleinUmsMio, kleinUmsPlus, kleinPlusRel, grossUmsMio, grossUmsMioPlus, grossPlusRel
    // 0
    grundwert = 1028;
    verdienstplus = 1050 + getRandomInt(6)*50;
    mehrverdienst = verdienstplus - grundwert;
    // 1
    stromanteile = [0.8,0.85,0.9,1.1,1.2,1.3]
    stromanteil = stromanteile[Math.floor(Math.random()*stromanteile.length)];
    strommengen = [["1-Person","2400"],["2-Personen","3000"],["3-Personen","3600"],["4-Personen","4000"]]
    strommenge = strommengen[Math.floor(Math.random()*strommengen.length)];
    let stromtext
    stromanteil > 1 ? stromtext = `${Math.round((stromanteil-1)*100)} Prozent über dem Durchschnittsverbrauch` : stromtext = `${Math.round(stromanteil*100)} Prozent des Durchschnittsverbrauchs`
    // 2
    smartWeltMrd = 6.92
    smartDeMio = 62.6
    // 3
    autosWeltMrd = 1.4
    autosDeMio = 42
    // 4
    kleinUmsMio = 0.7 + 0.1*getRandomInt(13)
    kleinUmsPlus = 100000 + getRandomInt(5)*14000
    kleinPlusRel = kleinUmsPlus/(kleinUmsMio*1000000)
    grossUmsMio = 50 + 1.1*getRandomInt(4)*10
    grossUmsMioPlus = 5 + 0.8*getRandomInt(6)
    grossPlusRel = grossUmsMioPlus/grossUmsMio
    // 5
    preis1 = 40 + 10*getRandomInt(8)
    rabatt1 = 5 + 5*getRandomInt(6)

    

    const aufgaben = 
    [
    {       
        nr:0,
        title: "",
        description: "",
            aufgabe: `${person} erhält im ersten Lehrjahr ${verdienstplus} Euro. Wie hoch liegt dieses Einkommen prozentual über dem Durchschnitt (2022: ${grundwert} Euro)?`,
            loesung: `Das Einkommen liegt ${((verdienstplus/1028 - 1) * 100).toFixed(1)} % über dem Durchschnitt.`,
            help: `Mehrverdienst: ${mehrverdienst}. Dies durch die ${grundwert} teilen. Das Ergebnis mal 100 gibt den Prozentsatz!`,
            explainer: `Berechne den prozentualen Unterschied zwischen ${person}s Einkommen und dem Durchschnitt von ${grundwert}:
            <br><b>1 </b>Differenz (Mehrverdienst) = ${verdienstplus} Euro - ${grundwert} Euro = ${mehrverdienst} Euro.
            <br><b>2 </b>Setze diese Differenz ins Verhältnis zum Grundwert, das gibt den Anteil: ${mehrverdienst}/${grundwert} = ${(mehrverdienst/grundwert).toFixed(3)}. Dieser Anteil ist eine praktische Größe, nämlich der Mehrverdienst im Verhältnis zum Grundwert.
            <br><b>2 </b>Drücke diesen Anteil in Prozent aus, indem du ihn einfach mit 100 multiplizierst: ${(mehrverdienst/grundwert).toFixed(3)} &middot; 100 = ${(100*mehrverdienst/grundwert).toFixed(1)}
            <br>Formal noch schöner schreibst du ${(mehrverdienst/grundwert).toFixed(3)} &middot; 100% = ${(100*mehrverdienst/grundwert).toFixed(1)}%.
            `//!
    },
    {
        nr:1,
        title: "Stromverbrauch",
        description: "",
            aufgabe: `Ein ${strommenge[0]}-Haushalt verbraucht im Jahr durchschnittlich ca. ${Math.round(stromanteil*strommenge[1])} kWh Strom. Das sind ${stromtext}. Wie groß ist dieser? Gib die Energie in kWh an.`,
            loesung: `Der durchschnittliche Stromverbrauch beträgt ${strommenge[1]} kWh`,
            help: `Gesuchter Durchschnitt mal ${stromanteil.toFixed(2)} (= ${Math.round(stromanteil*100)}%) gibt ${Math.round(stromanteil*strommenge[1])}kWh! Umstellen und ${Math.round(stromanteil*strommenge[1])}kWh / ${stromanteil.toFixed(2)} rechnen!`,
            explainer: `<b>1 </b>Von Prozent auf Dezimal "umschalten", dann ist es ganz übersichtlich.
            <br><b>2 </b>Verbrauch = ${stromanteil} &middot; Durchschnitt bzw. umgestellt
            <br><b>3 </b>Durchschnitt = Verbrauch / ${stromanteil} =  ${Math.round(stromanteil*strommenge[1])}kWh / ${stromanteil}
            `//!
    },
    {
        nr:2,
        title: "",
        description: "",
            aufgabe: `Verbreitung von Smartphones: weltweit (${popWeltMrd} Mrd. Menschen) gibt es ${smartWeltMrd} Mrd. Smartphones, in Deutschland (${popDeMio} Mio) gibt es ${smartDeMio} Mio. Smartphones. Liegt Deutschland über oder unter dem Welt-Durchschnitt?`,
            loesung: `Welt ${(smartWeltMrd/popWeltMrd).toFixed(2)}, Deutschland ${(smartDeMio/popDeMio).toFixed(2)} Smartphones pro Person. Deutschland liegt ${smartDeMio/popDeMio > smartWeltMrd/popWeltMrd ? "über" : "unter"} dem Durchschnitt.`,
            help: `Die Quoten erhältst du, indem du die Zahl der Smartphones durch die Zahl der Einwohner teilst.`,
            explainer: `Quote Welt = ${smartWeltMrd}/${popWeltMrd} = ${(smartWeltMrd/popWeltMrd).toFixed(2)}, Quote Deutschland = ${smartDeMio}/${popDeMio} = ${(smartDeMio/popDeMio).toFixed(2)}
            <br>Bei der Berechnung von Quoten teilst du zwei Zahlen, du bildest ein Verhältnis. Es kommt nicht darauf an, welche Einheit die Zahlen haben (z.b. Milliarden, Mrd. oder Millionen, Mio.), aber die Zahlen müssen jeweils dieselbe Einheit haben. Also Mrd./Mrd. und Mio./Mio. Andernfalls kann man sie nicht vergleichen.
            <br>Das Verhältnis kannst du auch in Prozent angeben:
            <br>Also statt Dezimalbrüche ${(smartWeltMrd/popWeltMrd).toFixed(2)} vs. ${(smartDeMio/popDeMio).toFixed(2)} in Prozent: ${Math.round(100*smartWeltMrd/popWeltMrd)}% vs. ${Math.round(100*smartDeMio/popDeMio)}%
            `//!
    },
    {
        nr:3,
        title: "",
        description: "",        
            aufgabe: `Wie viele haben ein Auto? Weltweit (${popWeltMrd} Mrd. Menschen) gibt es ${autosWeltMrd} Mrd. Autos, in Deutschland (${popDeMio} Mio.) gibt es ${autosDeMio} Mio. Autos. Liegt Deutschland über oder unter dem Welt-Durchschnitt?`,
            loesung: `Welt ${(autosWeltMrd/popWeltMrd).toFixed(2)}, Deutschland ${(autosDeMio/popDeMio).toFixed(2)} Autos pro Person. Deutschland liegt ${autosDeMio/popDeMio > autosWeltMrd/popWeltMrd ? "über" : "unter"} dem Durchschnitt.`,
            help: `Es geht hier nicht um absolute Zahlen, sondern um anteilige Zahlen, also "Quoten". Die Quoten erhältst du, indem du die Zahl der Autos durch die Zahl der Einwohner teilst.`,
            explainer: `Quote Welt = ${autosWeltMrd}/${popWeltMrd} = ${(autosWeltMrd/popWeltMrd).toFixed(2)}, Quote Deutschland = ${autosDeMio}/${popDeMio} = ${(autosDeMio/popDeMio).toFixed(2)}
            <br>Bei der Berechnung von Quoten teilst du zwei Zahlen, du bildest ein Verhältnis. Es kommt nicht darauf an, welche Einheit die Zahlen haben (z.b. Milliarden, Mrd. oder Millionen, Mio.), aber die Zahlen müssen jeweils dieselbe Einheit haben. Also Mrd./Mrd. und Mio./Mio. Andernfalls kann man sie nicht vergleichen.
            <br>Das Verhältnis kannst du auch in Prozent angeben:
            <br>Also statt Dezimalbrüche ${(autosWeltMrd/popWeltMrd).toFixed(2)} vs. ${(autosDeMio/popDeMio).toFixed(2)} in Prozent: ${Math.round(100*autosWeltMrd/popWeltMrd)}% vs. ${Math.round(100*autosDeMio/popDeMio)}%
            `//!
    },
    {
        nr:4,
        title: "",
        description: "",        
            aufgabe: `Die Firma Klein hatte 2021 einen Jahresumsatz von ${kleinUmsMio.toFixed(1)} Mio. und konnte diesen 2022 um ${kleinUmsPlus} steigern. Die Firma Gross erzielte ${grossUmsMio} Mio. und verzeichnete 2022 ein Plus von ${grossUmsMioPlus} Mio. Welches Unternehmen hat prozentual mehr zugelegt?`,
            loesung: `Klein: Plus von ${(kleinPlusRel*100).toFixed(1)}%. Gross: Plus von ${(grossPlusRel*100).toFixed(1)}%. Firma ${kleinPlusRel > grossPlusRel ? "Klein" : "Gross"} gewinnt!`,
            help: `Die relative Änderung für jedes Unternehmen ist: Umsatzdifferenz geteilt durch früheren Umsatz.`,
            explainer: `Wie wird der relative bzw. prozentuale Zuwachs berechnet? Z.B. Fa. Klein
            <br><b>1 </b>2021: ${kleinUmsMio.toFixed(1)} Mio. 2022: Steigerung, (auf Millionen umgerechnet!): ${(kleinUmsPlus/1000000).toFixed(3)} Mio.
            <br><b>2 </b>Vom absoluten zum relativen Zuwachs. Dieser ist ${(kleinUmsPlus/1000000).toFixed(3)} / ${kleinUmsMio.toFixed(1)} = ${((kleinUmsPlus/1000000)/kleinUmsMio).toFixed(3)}
            <br><b>2 </b>In Prozent: ${((kleinUmsPlus/1000000)/kleinUmsMio).toFixed(3)} = ${((100*kleinUmsPlus/1000000)/kleinUmsMio).toFixed(1)}%
            `//!
    },
    {
        nr:5,
        title: "",
        description: "",        
            aufgabe: `Ein Produkt kostet ${preis1.toFixed(2)} Euro und wird um ${rabatt1}% reduziert. Wie viel kostet das Produkt nach der Reduzierung?`,
            loesung: `${(preis1*(1-rabatt1/100)).toFixed(2)} Euro`,
            help: ` Der Rabatt ist ${rabatt1}% von ${preis1.toFixed(2)} oder auch  ${preis1.toFixed(2)} * ${(rabatt1/100).toFixed(2)} `,
            explainer: `<b>1 </b>Das Produkt wird um ${rabatt1}%, also um den Anteil ${(rabatt1/100).toFixed(2)} herabgesetzt.
            <br><b>2 </b>Der Nachlass bzw. Rabatt (das, was du einsparst) beträgt also
            ${preis1.toFixed(2)} Euro * ${rabatt1}% = ${preis1.toFixed(2)} Euro * ${(rabatt1/100).toFixed(2)} = ${(preis1*rabatt1/100).toFixed(2)} Euro.
            (Du siehst: zum Rechnen mit % wird das %-Zeichen durch 1/100 oder durch 0.01 ersetzt)
            <br><b>3 </b>Der reduzierte Preis (das, was du zahlst), ist also
            <br>${preis1.toFixed(2)} Euro - ${(preis1*rabatt1/100).toFixed(2)} Euro = ${(preis1*(100-rabatt1)/100).toFixed(2)} Euro.
            <br><b>4 </b>Alternative für Geübte: den Preis gleich mit ${100-rabatt1}% oder mit ${(1-rabatt1/100).toFixed(2)} multiplizieren:
            <br>${preis1.toFixed(2)} Euro * ${100-rabatt1}% = ${preis1.toFixed(2)} Euro * ${(1-rabatt1/100).toFixed(2)} = ${(preis1*(1-rabatt1/100)).toFixed(2)} Euro
            `//!
    },
    ]

    

    //const i = getRandomInt(aufgaben.length)-1
    //const i = Math.floor(Math.random() * aufgaben.length);
    
    const i = typeof filter === 'undefined' ? Math.floor(Math.random() * aufgaben.length) : filter
    
    
    



        
    const [aufgabe_,loesung_,help_,explainer_] = [aufgaben[i].aufgabe,aufgaben[i].loesung,aufgaben[i].help,aufgaben[i].explainer]
    
    let menu = "(Sub-Menü in Kürze)"

    /*
    let menu = aufgaben.map(({ nr, title, description }) => ({
        nr,
        title,
        description,
      }));
    */
    //let menu = aufgaben.map(({ nr, title }) => ({ nr, title }));
    //menu = Object.keys(menu)
    //console.log(menu)

    //return [aufgabe_,loesung_,help_,explainer_,headerclass]
    return [aufgabe_,loesung_,help_,explainer_,headerclass,menu]


}

export default prozent;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
}

