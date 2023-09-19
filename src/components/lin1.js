function lin1() {
    let aufgabe, loesung, help, explainer, explainer1, explainer2
    // neu 0914
    let speak, speakhelp, speakexplainer, speakexplainer1, speakexplainer2, tutor

    /*
    tutor = [
        ["This is line one of text", "Hallo, das ist die Zeile eins"],
        ["This is line two of text", "Hier spreche ich die Gleichung 4 mal 3 = 12"],
        ["This is line three of text", "Hallo, das ist die schnelle Ansage"]
      ];
    */
      /*
    tutor = [
        ["This is line one of text", "Hallo, das ist die Zeile eins"],
        ["This is line two of text", "Hier spreche ich die Gleichung 4 mal 3 = 12"],
        ["This is line three of text", "Hallo, das ist die schnelle Ansage"]
      ];
      tutor = [...tutor, ["test is line four", "hier spreche ich Zeile4"]]
      */

    let a = getRandomInt(30) + 1; // > 0
    let b = getRandomInt(20) - 10; 
    //let b = getRandomInt(20) + 1; // > 0
    if (b === 0) b=21
    //const casex = getRandomInt(8)
    const casex = 3
    explainer1 = `<div id="t0">Ziel: das unbekannte <b>x</b> soll alleine stehen.</div>
    <div id="t1">Was heißt das? Gleichung beginnt mit "x ="</div>
    <div id="t2">Du musst also die Gleichung umformen!</div>
    <br>
    "Ich forme die Gleichung so um, dass sie mit "x =" beginnt." oder:
    <br>"Ich löse die Gleichung nach x auf"
    <br>
    `//!
    explainer2 = ""
    speakexplainer = ["Das unbekannte x soll alleine stehen", "Das heißt: die Gleichung muss mit x = beginnen", "Du musst also die Gleichung umformen"]
    //explainer2a = ""
    //console.log(casex)
   
    switch(casex) {
        case 0:
            //aufgabe = `x + ${a} = ${b}`;                      // x + a = b
            aufgabe = `\\[x + ${a} = ${b}\\]`                   // x + a = b
            loesung = `\\[x = ${b-a}\\]`;
            help = `\\[x + ${a} - ${a} = ${b} - ${a}\\]`
            explainer2 = `Dazu subtrahierst du auf beiden Seiten <b>${a}</b> und erhältst
            <br>x + ${a} <b>- ${a}</b> = ${b} <b>- ${a}</b>
            <br>x + 0 = ${b} - ${a}
            <br>x = ${b} - ${a}`
            tutor = [[`Eine Zahl plus ${a} ergibt ${b}. Wie heißt die Zahl? Klick den Sprach-Tutor an!`, `Eine Zahl plus ${a} ergibt ${b} . Wie heißt die Zahl?`],
                    [`Die Zahl ist das x. Um x zu berechnen, musst du x alleine stellen.`, `Die Zahl ist das x. Um x zu berechnen, musst du x alleine stellen.`],
                    [`x <kbd>+ ${a}</kbd> = ${b}`, `So geht es: die ${a} hat ein Plus. `], 
                    [`x = ${b} <kbd>- ${a}</kbd>`, `Sie wechselt die Seite und hat jetzt ein Minus`],                  
                    [`x = ${b} - ${a}`, `Jetzt steht x alleine und du kannst es ausrechnen!`],
                    [`x = ${b - a} `, `x ist ${b} minus ${a} und das ist ${b - a}`],
                    ]
        break;
        case 1:
            //aufgabe = "x - " + a + " = " + b;                  // x - a = b
            aufgabe = `\\[x - ${a} = ${b}\\]`
            loesung = `\\[x = ${b+a}\\]`;
            help = `\\[x - ${a} + ${a} = ${b} + ${a}\\]`
            explainer2 = `Dazu addierst du auf beiden Seiten <b>${a}</b> und erhältst
            <br>x + ${a} <b>- ${a}</b> = ${b} <b>- ${a}</b>
            <br>x + 0 = ${b} + ${a}
            <br>x = ${b} + ${a}`
            tutor = [[`Eine Zahl minus ${a} ergibt ${b}. Wie heißt die Zahl? Klick den Sprach-Tutor an!`, `Eine Zahl minus ${a} ergibt ${b} . Wie heißt die Zahl?`],
            [`Das x ist die Zahl. Um x zu berechnen, musst du x alleine stellen.`, `Das x ist die Zahl. Um x zu berechnen, musst du x alleine stellen.`],
            [`x <kbd> - ${a} </kbd> = ${b}`, `So geht es: die ${a} hat ein Minus. `], 
            [`x = ${b} <kbd> + ${a} </kbd>`, `Sie wechselt die Seite und hat jetzt ein Plus`],                  
            [`x = ${b} + ${a}`, `Jetzt steht x alleine und du kannst es ausrechnen!`],
            [`x = ${b + a} `, `x ist ${b} plus ${a} und das ist ${b + a}`],
            ]
        break;
        case 2:
            //aufgabe = "-x + " + a + " = " + b;                      // -x + a = b
            aufgabe = `\\[-x + ${a} = ${b}\\]` 
            //loesung = `Die Lösung ist x = ${a-b}`;
            loesung = `\\[x = ${a-b}\\]`
            help = `\\[-x + ${a} - ${a} = ${b} - ${a}\\]`
            explainer2 = `Dazu muss erstmal das <b>- x</b> alleine stehen:
            <br>Du subtrahierst auf beiden Seiten <b>${a}</b> und erhältst
            <br>-x + ${a} <b>- ${a}</b> = ${b} <b>- ${a}</b>
            <br>-x + 0 = ${b} - ${a}. 
            <br>-x = ${b-a} Jetzt auf beiden Seiten der Gleichung Vorzeichen wechseln. Mit anderen Worten: die Gleichung mit (-1) multiplizieren.`
            tutor = [[`Eine Zahl plus ${a} ergibt ${b}. Wie heißt die Zahl? Klick den Sprach-Tutor an!`, `Eine Zahl plus ${a} ergibt ${b} . Wie heißt die Zahl?`],
            [`Die Zahl ist erstmal das minus x. Um -x zu berechnen, musst du -x alleine stellen.`, `Die Zahl ist erstmal das minus x. Um minus x zu berechnen, musst du minus x alleine stellen.`],
            [`-x <kbd>+ ${a} </kbd> = ${b}`, `So geht es: die ${a} hat ein Plus. `], 
            [`-x = ${b} <kbd> - ${a} </kbd>`, `Sie wechselt die Seite und hat jetzt ein Minus`],                  
            [`-x = ${b} - ${a}`, `Jetzt steht minus x alleine und du kannst es ausrechnen!`],
            [`-x = ${b - a} `, `Minus x ist ${b} minus ${a} und das ist ${b - a}`],
            [`x = ${a - b} `, `x ist das Negative von ${b - a} und das ist ${a - b}`],
            ]
        break;
        case 3:
            //aufgabe = "-x - " + a + " = " + b;                          // -x - a = b
            aufgabe = `\\[-x - ${a} = ${b}\\]`
            //loesung = `Die Lösung ist x = ${-a-b}`;
            loesung = `\\[x = ${-b-a}\\]`
            help = `\\[-x - ${a} + ${a} = ${b} +  ${a}\\]`
            explainer2 = `Dazu muss erstmal das <b>- x</b> alleine stehen:
            <br>Du addierst auf beiden Seiten <b>${a}</b> und erhältst
            <br>-x - ${a} <b>+ ${a}</b> = ${b} <b>+ ${a}</b>
            <br>-x + 0 = ${b} + ${a}.
            <br>-x = ${b+a} Jetzt auf beiden Seiten der Gleichung Vorzeichen wechseln. Mit anderen Worten: die Gleichung mit (-1) multiplizieren.`
            tutor = [[`Eine Zahl minus ${a} ergibt ${b}. Wie heißt die Zahl? Klick den Sprach-Tutor an!`, `Eine Zahl minus ${a} ergibt ${b} . Wie heißt die Zahl?`],
            [`Die Zahl ist erstmal das minus x. Um -x zu berechnen, musst du -x alleine stellen.`, `Die Zahl ist erstmal das minus x. Um minus x zu berechnen, musst du minus x alleine stellen.`],
            [`-x <kbd>- ${a} </kbd> = ${b}`, `So geht es: die ${a} hat ein Minus. `], 
            [`-x = ${b} <kbd>+ ${a} </kbd>`, `Sie wechselt die Seite und hat jetzt ein Plus`],                  
            [`-x = ${b} + ${a}`, `Jetzt steht minus x alleine und du kannst es ausrechnen!`],
            [`-x = ${b + a} `, `Minus x ist ${b < 0 ? "minus " : " "}${Math.abs(b)} plus ${a} und das ist ${b + a}`],
            [`x = ${- a - b} `, `x ist das Negative von ${b + a} und das ist ${-a - b}`],
            ]
        break;
        case 4:
            //aufgabe = a + " + x = " + b;                      // a + x = b
            //loesung = b - a;
            aufgabe = `\\[${a} + x = ${b}\\]`                   // x + a = b
            loesung = `\\[x = ${b-a}\\]`;
            help = `\\[${a} + x - ${a} = ${b} - ${a}\\] \\[x + ${a} - ${a} = ${b} - ${a}\\]`
            explainer2 = `Dazu subtrahierst du auf beiden Seiten <b>${a}</b> und erhältst
            <br>${a} + x <b>- ${a}</b> = ${b} <b>- ${a}</b> ... linke Seite umordnen!
            <br>x + ${a} <b>- ${a}</b> = ${b} <b>- ${a}</b>
            <br>x + 0 = ${b} - ${a}
            <br>x = ${b} - ${a}`
            tutor = [[`${a} plus eine Zahl ergibt ${b}. Wie heißt die Zahl? Klick den Sprach-Tutor an!`, `${a} plus eine Zahl ergibt ${b} . Wie heißt die Zahl?`],
            [`Die Zahl ist das x. Um x zu berechnen, musst du x alleine stellen.`, `Die Zahl ist das x. Um x zu berechnen, musst du x alleine stellen.`],
            [`<kbd>+ ${a}</kbd> + x = ${b}`, `So geht es: die ${a} hat kein Vorzeichen, also ein Plus`], 
            [`x = ${b} <kbd>- ${a}</kbd>`, `Sie wechselt die Seite und hat jetzt ein Minus`],                  
            [`x = ${b} - ${a}`, `Jetzt steht x alleine und du kannst es ausrechnen!`],
            [`x = ${b - a} `, `x ist ${b} minus ${a} und das ist ${b - a}`],
            ]
        break;
        case 5:
            //aufgabe = "- " + a + " + x = " + b;                  // -a + x = b
            //loesung = a + b;
            aufgabe = `\\[-${a} + x = ${b}\\]`
            loesung = `\\[x = ${b+a}\\]`;
            help = `\\[-${a} + x + ${a} = ${b} + ${a}\\] \\[x - ${a} + ${a} = ${b} + ${a}\\]`
            explainer2 = `Dazu addierst du auf beiden Seiten <b>${a}</b> und erhältst
            <br>-${a} + x <b>+ ${a}</b> = ${b} <b>+ ${a}</b> ... linke Seite umordnen!
            <br>x - ${a} <b>+ ${a}</b> = ${b} <b>+ ${a}</b>
            <br>x = ${b} + ${a}`
            tutor = [[`${-a} plus eine Zahl ergibt ${b}. Wie heißt die Zahl? Klick den Sprach-Tutor an!`, `Minus ${a} plus eine Zahl ergibt ${b} . Wie heißt die Zahl?`],
            [`Das x ist die Zahl. Um x zu berechnen, musst du x alleine stellen.`, `Das x ist die Zahl. Um x zu berechnen, musst du x alleine stellen.`],
            [`<kbd>- ${a}</kbd> + x = ${b}`, `So geht es: die ${a} hat ein Minus. `], 
            [`x = ${b} <kbd> + ${a} </kbd>`, `Sie wechselt die Seite und hat jetzt ein Plus`],                  
            [`x = ${b} + ${a}`, `Jetzt steht x alleine und du kannst es ausrechnen!`],
            [`x = ${b + a} `, `x ist ${b} plus ${a} und das ist ${b + a}`],
            ]

        break;
        case 6:
            //aufgabe = a + " - x = " + b;                          // a - x = b
            //loesung = a - b;
            aufgabe = `\\[${a} - x = ${b}\\]`
            loesung = `\\[x = ${a-b}\\]`;
            help = `\\[${a} - x - ${a} = ${b} - ${a}\\] \\[- x = ${b-a}\\] `
            explainer2 = `Dazu muss erstmal das <b>- x</b> alleine stehen:
            <br>Du subtrahierst auf beiden Seiten <b>${a}</b> und erhältst
            <br>${a} - x <b>- ${a}</b> = ${b} <b>- ${a}</b>
            <br>-x + 0 = ${b} - ${a}
            <br>-x = ${b-a} ... jetzt auf beiden Seiten das Vorzeichen wechseln. Oder, mit anderen Worten: die Gleichung mit (-1) multiplzieren!
            <br>x = ${a-b}`
            tutor = [[`${a} minus eine Zahl ergibt ${b}. Wie heißt die Zahl? Klick den Sprach-Tutor an!`, `${a} minus eine Zahl ergibt ${b} . Wie heißt die Zahl?`],
            [`Die Zahl ist erstmal das minus x. Um -x zu berechnen, musst du -x alleine stellen.`, `Die Zahl ist erstmal das minus x. Um minus x zu berechnen, musst du minus x alleine stellen.`],
            [`<kbd>+ ${a}</kbd> - x  = ${b}`, `So geht es: die ${a} hat ein Plus. `], 
            [`-x = ${b} <kbd> - ${a} </kbd>`, `Sie wechselt die Seite und hat jetzt ein Minus`],                  
            [`-x = ${b} - ${a}`, `Jetzt steht minus x alleine und du kannst es ausrechnen!`],
            [`-x = ${b - a} `, `Minus x ist ${b} minus ${a} und das ist ${b - a}`],
            [`x = ${a - b} `, `x ist das Negative von ${b - a} und das ist ${a - b}`],
            ]
        break;
        case 7:
            //aufgabe = "- "  +a + " - x = " + b;                   // -a - x = b
            //loesung = -a -b;
            aufgabe = `\\[-${a} - x = ${b}\\]`
            loesung = `\\[x = ${-a-b}\\]`;
            help = `\\[-${a} - x + ${a} = ${b} + ${a}\\] \\[- x = ${b+a}\\] `
            explainer2 = `Dazu muss erstmal das <b>- x</b> alleine stehen:
            <br>Du addierst auf beiden Seiten <b>${a}</b> und erhältst
            <br>-${a} - x <b>+ ${a}</b> = ${b} <b>+ ${a}</b>
            <br>-x + 0 = ${b} + ${a}
            <br>-x = ${b+a} ... jetzt auf beiden Seiten das Vorzeichen wechseln. Oder, mit anderen Worten: die Gleichung mit (-1) multiplzieren!
            <br>x = ${-(b+a)}`
            tutor = [[`Minus ${a} minus eine Zahl ergibt ${b}. Wie heißt die Zahl? Klick den Sprach-Tutor an!`, `Minus ${a} minus eine Zahl ergibt ${b} . Wie heißt die Zahl?`],
            [`Die Zahl ist erstmal (!) das minus x. Um -x zu berechnen, musst du -x alleine stellen.`, `Die Zahl ist erstmal das minus x. Um minus x zu berechnen, musst du minus x alleine stellen.`],
            [`<kbd>- ${a}</kbd> - x = ${b}`, `So geht es: die ${a} hat ein Minus. `], 
            [`-x = ${b} <kbd>+ ${a} </kbd>`, `Sie wechselt die Seite und hat jetzt ein Plus`],                  
            [`-x = ${b} + ${a}`, `Jetzt steht minus x alleine und du kannst es ausrechnen!`],
            [`-x = ${b + a} `, `Minus x ist ${b < 0 ? "minus " : " "}${Math.abs(b)} plus ${a} und das ist ${b + a}`],
            [`x = ${- a - b} `, `x ist das Negative von ${b + a} und das ist ${-a - b}`],
            ]
        break;


        default:

    }
    /*
    if (explainer2a && Math.random()<.5){
        explainer = explainer2a;
    } else {
        explainer = explainer1 + explainer2;
    }
    */
    explainer = explainer1 + explainer2;
    //return [aufgabe, loesung, help, explainer];
    // neu 0914
    return [aufgabe,loesung,help,explainer,undefined,undefined, speak, speakhelp, speakexplainer, tutor]
}

export default lin1;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
}