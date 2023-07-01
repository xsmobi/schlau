function lin1() {
    let aufgabe, loesung, help, explainer, explainer1, explainer2
    let a = getRandomInt(30) + 1; // > 0
    let b = getRandomInt(20) - 10; // > 0
    if (b === 0) b=21
    const casex = getRandomInt(8)
    //const casex = 7
    explainer1 = `Ziel: das unbekannte <b>x</b> soll alleine stehen. Du formst die Gleichung so um, dass sie mit "x =" beginnt. `
    explainer2 = ""
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
            //explainer2a = `Ich ziehe von einer Zahl ${a} ab und erhalte ${b}. Wie heißt die Zahl?`
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
    return [aufgabe, loesung, help, explainer];
}

export default lin1;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
}