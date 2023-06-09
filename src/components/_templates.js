const templates = [
    {
      name: "Type 3",
      type: "type3",
      val1: -100000,
      val2: 100000
    },
    {
      name: "Type 1",
      type: "type1",
      val1: -1000,
      val2: 1000
    },
    {
      name: "Type 3b",
      type: "type3",
      val1: -1000000,
      val2: 1000000
    },
    {
      name: "Add Subb 1",
      type: "addsub",
      val1: 10,
      val2: 20,
      //help: "",
      //explainer:"<p>.Eine Zahl addieren heißt, die Gegenzahl subtrahieren.</p> <ul> <li>Beispiel, addiere 2: 3 + 2 = 3 - (-2), denn -2 ist die Gegenzahl zu </li> <li>Beispiel, addiere -2: 3 + (-2) = 3 - 2, denn 2 ist die Gegenzahl zu -2</li> </ul>"
    },
    {
      name: "Add",
      type: "add",
      //val1: -10,
      //val2: 10,
      help: "",
      explainer:
        "Eine Zahl addieren heißt, die Gegenzahl subtrahieren. Beispiel, addiere 2: 3 + 2 = 3 - (-2), denn -2 ist die Gegenzahl zu 2 Beispiel, addiere -2: 3 + (-2) = 3 - 2, denn 2 ist die Gegenzahl zu -2  Eine Zahl subtrahieren heißt, die Gegenzahl addieren. Beispiel, subtrahiere 2: 3 - 2 = 3 + (-2), denn +2 ist die Gegenzahl zu -2 Beispiel, subtrahiere -2: 3 - (-2) = 3 + 2, denn -2 ist die Gegenzahl zu 2"
    },
    {
      name: "Typ 2",
      type: "type2",
      val1: -10000,
      val2: 10000
    },
    {
      name: "Brüche",
      type: "frac",
      val1: 20,
      val2: 20
    },
    {
      name: "Plus-Minus-Gleichungen",
      type: "lin1",
      val1: 3, // val1 > 0
      val2: 25 // val2 > 0
    },
    {
    name: "Lineare Gleichungen",
      type: "lin2",
      val1: 5,
      val2: 15
    },
    {
      name: "Mal-Geteilt-Gleichungen",
        type: "lin3",
        val1: 2,
        val2: 20
    },
    {
      name: "Proportionalität",
        type: "prop",
        val1: 2,
        val2: 20
    },
    {
      name: "Lineare Funktionen",
        type: "linfun",
        val1: 2,
        val2: 20
    },
    {
      name: "Quadratische Funktionen",
        type: "quad",
        val1: 2,
        val2: 20
    }, 
    {
      name: "Prozentrechnung",
        type: "prozent",
        val1: 2,
        val2: 20,
        headerclass: "subheader"
    }, 
    {
      name: "Einfache Wahrscheinlichkeit",
        type: "proba1",
        val1: 2,
        val2: 20,
        headerclass: "subheader"
    }, 

  ];

  export default templates