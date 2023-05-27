function lin1(max, min) {
    let aufgabe, loesung, help, help1, help2, help2a
    let a = getRandomInt(max-min) + min; // > 0
    let b = getRandomInt(max-min) + min; // > 0
    if (b === a) b++
    //const casex = getRandomInt(8)
    const casex = 3
    help1 = `Ziel: das unbekannte <b>x</b> soll alleine stehen.`
    help2 = ""
    help2a = ""
    switch(casex) {
        case 0:
            aufgabe = `x + ${a} = ${b}`;   // x + a = b
            loesung = `Die Lösung ist x = ${b-a}`;
            help2 = `<br>Dazu subtrahierst du auf beiden Seiten <b>${a}</b> und erhältst
            <br>x + ${a} <b>- ${a}</b> = ${b} <b>- ${a}</b>
            <br>x + 0 = ${b} - ${a}
            <br>x = ${b} - ${a}`
        break;
        case 1:
            aufgabe = "x - " + a + " = " + b;   // x - a = b
            loesung = `Die Lösung ist x = ${a+b}`;
            help2 = `<br>Dazu addierst du auf beiden Seiten <b>${a}</b> und erhältst
            <br>x + ${a} <b>- ${a}</b> = ${b} <b>- ${a}</b>
            <br>x + 0 = ${b} + ${a}
            <br>x = ${b} + ${a}`
            help2a = `Ich ziehe von einer Zahl ${a} ab und erhalte ${b}. Wie heißt die Zahl?`
        break;
        case 2:
            aufgabe = "-x + " + a + " = " + b;  // -x + a = b
            loesung = `Die Lösung ist x = ${a-b}`;
            help2 = `<br>Dazu muss erstmal das <b>- x</b> alleine stehen:
            <br>Du subtrahierst auf beiden Seiten <b>${a}</b> und erhältst
            <br>-x + ${a} <b>- ${a}</b> = ${b} <b>- ${a}</b>
            <br>-x + 0 = ${b} - ${a}. Jetzt alle Vorzeichen wechseln!
            <br>x = ${a} - ${b}`
        break;
        case 3:
            aufgabe = "-x - " + a + " = " + b;  // -x - a = b
            loesung = `Die Lösung ist x = ${-a-b}`;
            help2 = `<br>Dazu muss erstmal das <b>- x</b> alleine stehen:
            <br>Du addierst auf beiden Seiten <b>${a}</b> und erhältst
            <br>-x - ${a} <b>+ ${a}</b> = ${b} <b>+ ${a}</b>
            <br>-x + 0 = ${b} + ${a}. Jetzt alle Vorzeichen wechseln!
            <br>x = -${b} - ${a}`
        break;
        case 4:
            aufgabe = a + " + x = " + b;        // a + x = b
            loesung = b - a;

        break;
        case 5:
            aufgabe = a + " - x = " + b;        // a - x = b
            loesung = a - b;

        break;
        case 6:
            aufgabe = "- " + a + " + x = " + b;        // -a + x = b
            loesung = a + b;

        break;
        case 7:
            aufgabe = "- "  +a + " - x = " + b;        // -a - x = b
            loesung = -a -b

        break;


        default:

    }
    if (help2a && Math.random()<.5){
        help = help2a;
    } else {
        help = help1 + help2;
    }
    return [aufgabe, loesung, help];
}

export default lin1;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
}