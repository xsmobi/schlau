function prozent() {
    const headerclass = "subheader"
    //const personen = ["Adonis", "Angelina", "Leon", "Rogheyeh", "Justin", "Marta", "Vagid", "Rabia", "Jerome", "Ömer", "Gina", "Geraldine", "Finja", "Tabea", "Sophie", "Angelos", "Tariq", "Ola"]
    //const person = personen[Math.floor(Math.random()*personen.length)];

    const faktoren = [2,3,5,7,11]
    const faktor1 = faktoren[Math.floor(Math.random()*faktoren.length)]
    const faktor2 = faktoren[Math.floor(Math.random()*faktoren.length)]   
    //const menge = faktor1*faktor2
    //const anteil = 1/faktor2
    //const farben = ["rot", "blau", "grau", "gruen", "gelb"]
    //const altersverteilung = [[12,124], [13,138], [14, 110], [15, 96], []]
    //console.log(getlowestfraction(anteil))


    //const grossMa = 200 + getRandomInt(4)*10
    //const grossUmsMio = 50 + 1.1*getRandomInt(4)*10
    //const grossUmsMioPlus = 5 + 0.8*getRandomInt(6)
    //const grossPlusRel = grossUmsMioPlus/grossUmsMio

    const aufgaben = [
        {
            aufgabe: `In einer Schale befinden sich 24 Kugeln. Von diesen sind 6 rot und der Rest ist in einer faszinierenden Mischung aus pink, lila und türkis gehalten. Du greifst blind in die Schale, ziehst eine eine Kugel herauszuziehen`,
            loesung: ``,
            help: ``,
            explainer: ``
        },
    ]
    //const i = Math.floor(Math.random()*aufgaben.length);
    const i = 0
    return [aufgaben[i].aufgabe,aufgaben[i].loesung,aufgaben[i].help,aufgaben[i].explainer,headerclass]
}

export default prozent;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
}

function findDivisors(integer) { //https://dev.to/cesar__dlr/32-find-the-divisors-codewars-kata-7-kyu-5f7n
    let r = []
    for(let i = 2; i<integer; i++){
      if(integer%i === 0) r.push(i)
    }
    //let res = r.length !== 0 ? r : `${integer} is prime`
    let res = r.length !== 0 ? r : `${integer}`
    //res = `${res} und die ${integer} selbst`
    //console.log(res)
    return res
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
    // return h + "/" + k;
   
       // (format === "jax") ? `\\[\\frac{${h}}{${k}}\\]` : h + "/" + k
    if (format === "jax"){
        return k === 1 ? `\\[{${h}}\\]` : `\\[\\frac{${h}}{${k}}\\]`
        //return `\\[\\frac{${h}}{${k}}\\]`
    } else if (format === "text") {
        return `${h} geteilt durch ${k}`;
    } else {
        return h + "/" + k;
    }
}