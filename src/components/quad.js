function prop() {
    let aufgabe, loesung, help, explainer
    //let a = getRandomInt(max-min) + min; // > 0
    //let b = getRandomInt(max-min) + min; // > 0
    

    aufgabe = aufgaben[0].aufgabe

   

    return [aufgabe, loesung, help, explainer];
}

export default prop;

const aufgaben = [
    {
     aufgabe: "erste quad",
     loesung: "",
     help: "",
     explainer: ""
    },
    {
        aufgabe: "",
        loesung: "",
        help: "",
        explainer: ""
    },
    {
        aufgabe: "",
        loesung: "",
        help: "",
        explainer: ""
    },
    {
        aufgabe: "",
        loesung: "",
        help: "",
        explainer: ""
    },
    {
        aufgabe: "",
        loesung: "",
        help: "",
        explainer: ""
       },
       {
           aufgabe: "",
           loesung: "",
           help: "",
           explainer: ""
       },
       {
           aufgabe: "",
           loesung: "",
           help: "",
           explainer: ""
       },
       {
           aufgabe: "",
           loesung: "",
           help: "",
           explainer: ""
       },
       {
        aufgabe: "",
        loesung: "",
        help: "",
        explainer: ""
       },
       {
           aufgabe: "",
           loesung: "",
           help: "",
           explainer: ""
       },
       {
           aufgabe: "",
           loesung: "",
           help: "",
           explainer: ""
       },
       {
           aufgabe: "",
           loesung: "",
           help: "",
           explainer: ""
       }, 

]

function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
}