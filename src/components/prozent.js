function prozent() {
    const headerclass = "subheader"
    const personen = ["Adonis", "Angelina", "Leon", "Rogheyeh", "Justin", "Marta", "Vagid", "Rabia", "Jerome", "Ömer", "Gina", "Geraldine", "Finja", "Tabea", "Sophie", "Angelos", "Tariq", "Ola"]
    const person = personen[Math.floor(Math.random()*personen.length)];
    const grundwert = 1028;
    const verdienstplus = 1050 + getRandomInt(6)*50;
    const mehrverdienst = verdienstplus - grundwert;
    const verdienstminus = 1010 - getRandomInt(4)*50;
    const minderverdienst = grundwert - verdienstminus;
    const stromanteile = [0.8,0.85,0.9,1.1,1.2,1.3]
    const stromanteil = stromanteile[Math.floor(Math.random()*stromanteile.length)];
    const strommengen = [["1-Person","2400"],["2-Personen","3000"],["3-Personen","3600"],["4-Personen","4000"]]
    const strommenge = strommengen[Math.floor(Math.random()*strommengen.length)];
    let stromtext
    stromanteil > 1 ? stromtext = `${Math.round((stromanteil-1)*100)} Prozent über dem Durchschnittsverbrauch` : stromtext = `${Math.round(stromanteil*100)} Prozent des Durchschnittsverbrauchs`

    const aufgaben = [
        {
            aufgabe: `${person} erhält im ersten Lehrjahr ${verdienstplus} Euro. Wie hoch liegt dieses Einkommen prozentual über dem Durchschnitt (2022: ${grundwert} Euro)?`,
            loesung: `Das Einkommen liegt ${((verdienstplus/1028 - 1) * 100).toFixed(1)} % über dem Durchschnitt.`,
            help: `Mehrverdienst: ${mehrverdienst}. Dies durch die ${grundwert} teilen. Das Ergebnis mal 100 gibt den Prozentsatz!`,
            explainer: `Berechne den prozentualen Unterschied zwischen ${person}s Einkommen und dem Durchschnitt von ${grundwert}:
            <br><b>1 </b>Differenz (Mehrverdienst) = ${verdienstplus} Euro - ${grundwert} Euro = ${mehrverdienst} Euro.
            <br><b>2 </b>Setze diese Differenz ins Verhältnis zum Grundwert, das gibt den Anteil: ${mehrverdienst}/${grundwert} = ${(mehrverdienst/grundwert).toFixed(3)}. Dieser Anteil ist eine praktische Größe, nämlich der Mehrverdienst im Verhältnis zum Grundwert.
            <br><b>2 </b>Drücke diesen Anteil in Prozent aus, indem du ihn einfach mit 100 multiplizierst: ${(mehrverdienst/grundwert).toFixed(3)} &middot; 100 = ${(100*mehrverdienst/grundwert).toFixed(1)}
            <br>Formal noch schöner schreibst du ${(mehrverdienst/grundwert).toFixed(3)} &middot; 100% = ${(100*mehrverdienst/grundwert).toFixed(1)}%.
            `
        },
        {
            aufgabe: `${person} erhält im ersten Lehrjahr ${verdienstminus} Euro. Um wie viel liegt dieses Einkommen prozentual unter dem Durchschnitt (2022: ${grundwert} Euro)?`,
            loesung: `Das Einkommen liegt ${((1 - verdienstminus/1028) * 100).toFixed(1)} % unter dem Durchschnitt.`,
            help: `Minderverdienst: ${minderverdienst}. Dies durch die ${grundwert} teilen. Das Ergebnis mal 100 gibt den Prozentsatz!`,
            explainer: `Berechne den prozentualen Unterschied zwischen ${person}s Einkommen und dem Durchschnitt von ${grundwert}:
            <br><b>1 </b>Differenz (Minderverdienst) = ${grundwert} Euro - ${verdienstminus} Euro = ${minderverdienst} Euro.
            <br><b>2 </b>Setze diese Differenz ins Verhältnis zum Grundwert, das gibt den Anteil: ${minderverdienst}/${grundwert} = ${(minderverdienst/grundwert).toFixed(3)}. Dieser Anteil ist eine praktische Größe, nämlich der Minderverdienst im Verhältnis zum Grundwert.
            <br><b>2 </b>Drücke diesen Anteil in Prozent aus, indem du ihn einfach mit 100 multiplizierst: ${(minderverdienst/grundwert).toFixed(3)} &middot; 100 = ${(100*minderverdienst/grundwert).toFixed(1)}
            <br>Formal noch schöner schreibst du ${(minderverdienst/grundwert).toFixed(3)} &middot; 100% = ${(100*minderverdienst/grundwert).toFixed(1)}%.
            `
        },
        {
            aufgabe: `Ein ${strommenge[0]}-Haushalt verbraucht im Jahr durchschnittlich ca. ${Math.round(stromanteil*strommenge[1])} kWh Strom. Das sind ${stromtext}. Wie groß ist dieser? Gib die Energie in kWh an.`,
            loesung: `Der durchschnittliche Stromverbrauch beträgt ${strommenge[1]} kWh`,
            help: `An einen Faktor(!) denken, nicht an eine Differenz. Durchschnitt ${strommenge[1]} kWh mal wieviel gibt ${Math.round(stromanteil*strommenge[1])} kWh? Der Faktor ist ${stromanteil}! Also umstellen und ${Math.round(stromanteil*strommenge[1])} / ${stromanteil} rechnen und du hast den Durchschnitt.`,
            explainer: `<b>1 </b>Von Prozent auf Dezimal "umschalten", dann ist es ganz übersichtlich.
            <br><b>2 </b>Verbrauch = ${stromanteil} &middot; Durchschnitt bzw. umgestellt
            <br><b>3 </b>Durchschnitt = Verbrauch / ${stromanteil} =  ${Math.round(stromanteil*strommenge[1])} / ${stromanteil}`
        },
    ]
    const i = Math.floor(Math.random()*aufgaben.length);
    //const i = 2
    return [aufgaben[i].aufgabe,aufgaben[i].loesung,aufgaben[i].help,aufgaben[i].explainer,headerclass]
}

export default prozent;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
}