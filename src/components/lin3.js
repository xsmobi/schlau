function lin3(max, min) {
    let aufgabe, loesung, help, explainer, explainer1, explainer2
    let a = getRandomInt(max-min) + min; // > 0
    let b = getRandomInt(max-min) + min; // > 0
    if (b === a) b++
    const casex = getRandomInt(8)
    //const casex = 8
    explainer1 = `1. Das <var>x</var> alleine stellen ("nach x auflösen")
    <br>2. Das x ausrechnen
    `//!
    explainer2 = ""
    //explainer2a = ""
    switch(casex) {
        case 0:  // a * x = b
            aufgabe = `\\[${a} \\cdot x = ${b}\\]`                       // a * x = b
            loesung = `\\[x = \\frac{${b}}{${a}} = ${(b/a).toFixed(2)}\\]`;
            help = `Dividiere die Gleichung durch ${a}
            <br><br>
                <em>\\(\\frac{${a} \\cdot x}{${a}} = \\frac{${b}}{${a}}\\)</em>
            <br>
            &#x1F4A1; mit \\(\\frac{1}{${a}}\\) malnehmen oder durch ${a} teilen ist das gleiche!
            `//!
            explainer2 = `<ul>
                <li>Dividiere die Gleichung durch ${a}</li>
                <li>\\(\\frac{${a} \\cdot x}{${a}} = \\frac{${b}}{${a}}\\)</li>
                <li>\\(\\frac{${a}}{${a}} \\cdot x = \\frac{${b}}{${a}}\\)</li>
                <li>\\(1 \\cdot x = \\frac{${b}}{${a}}\\) das x steht alleine!</li>
                <li>Ausrechnen: \\(\\frac{${b}}{${a}}\\) = ${(b/a).toFixed(2)}</li>
            </ul>
            &#x1F50A;<q>Ich löse die Gleichung nach <var>x</var> auf, dann rechne ich das <var>x</var> aus.</q>
            <br>&#x1F50A;<q>Ich stelle die Gleichung um, damit <var>x</var> alleine steht.</q>
            <br>&#x1F50A;<q>Ich teile ${b} durch ${a} und erhalte <var>x</var> als Dezimalzahl.</q>
            <br>&#x1F4A1;Das Ergebnis als Bruch ist auch ok: ${getlowestfraction(b/a, "jax")} 
        `//!
        break;
        case 1:
            aufgabe = `\\[${-a} \\cdot x = ${b}\\]`                       // - a * x = b
            loesung = `\\[x = - \\frac{${b}}{${a}} = ${(-b/a).toFixed(2)}\\]`;

            help = `Dividiere die Gleichung durch ${-a}
            <br><br>
                <em>\\(\\frac{${-a} \\cdot x}{${-a}} = \\frac{${b}}{${-a}}\\)</em>
            <br>
            &#x1F4A1; mit \\(\\frac{1}{${-a}}\\) malnehmen oder durch ${-a} teilen ist das gleiche!
            `//!
            explainer2 = `<ul>
                <li>Dividiere die Gleichung durch ${-a}</li>
                <li>\\(\\frac{${-a} \\cdot x}{${-a}} = \\frac{${b}}{${-a}}\\)</li>
                <li>\\(\\frac{${-a}}{${-a}} \\cdot x = \\frac{${b}}{${-a}}\\)</li>
                <li>\\(1 \\cdot x = - \\frac{${b}}{${a}}\\) das x steht alleine!</li>
                <li>Ausrechnen: \\(- \\frac{${b}}{${a}}\\) = -${(b/a).toFixed(2)}</li>
            </ul>
            &#x1F50A;<q>Ich löse die Gleichung nach <var>x</var> auf, dann rechne ich das <var>x</var> aus.</q>
            <br>&#x1F50A;<q>Ich stelle die Gleichung um, damit <var>x</var> alleine steht.</q>
            <br>&#x1F50A;<q>Ich teile ${b} durch ${a} und erhalte <var>x</var> als Dezimalzahl.</q>
            <br>&#x1F4A1;Das Ergebnis als Bruch ist auch ok: -${getlowestfraction(b/a, "jax")} 
        `//!
        break;
        case 2:
            aufgabe = `\\[${a} \\cdot x = ${-b}\\]`                       // a * x = -b
            loesung = `\\[x = - \\frac{${b}}{${a}} = ${(-b/a).toFixed(2)}\\]`;
            help = `Dividiere die Gleichung durch ${a}
            <br><br>
                <em>\\(\\frac{${a} \\cdot x}{${a}} = \\frac{${-b}}{${a}}\\)</em>
            <br>
            &#x1F4A1; mit \\(\\frac{1}{${a}}\\) malnehmen oder durch ${a} teilen ist das gleiche!
            `//!
            explainer2 = `<ul>
                <li>Dividiere die Gleichung durch ${a}</li>
                <li>\\(\\frac{${a} \\cdot x}{${a}} = \\frac{${-b}}{${a}}\\)</li>
                <li>\\(\\frac{${a}}{${a}} \\cdot x = \\frac{${-b}}{${a}}\\)</li>
                <li>\\(1 \\cdot x = -\\frac{${b}}{${a}}\\) das x steht alleine!</li>
                <li>Ausrechnen: \\(-\\frac{${b}}{${a}}\\) = -${(b/a).toFixed(2)}</li>
            </ul>
            &#x1F50A;<q>Ich löse die Gleichung nach <var>x</var> auf, dann rechne ich das <var>x</var> aus.</q>
            <br>&#x1F50A;<q>Ich stelle die Gleichung um, damit <var>x</var> alleine steht.</q>
            <br>&#x1F50A;<q>Ich teile ${-b} durch ${a} und erhalte <var>x</var> als Dezimalzahl.</q>
            <br>&#x1F4A1;Das Ergebnis als Bruch ist auch ok: -${getlowestfraction(b/a, "jax")} 
        `//!
        break;
        case 3:
            aufgabe = `\\[\\frac{${a}}{x} = ${b}\\]`                       //  a / x = b
            loesung = `\\[x = \\frac{${a}}{${b}} = ${(a/b).toFixed(2)}\\]`;
            explainer1 = "1 das <var>x</var> muss in den Zähler<br>2 das <var>x</var> alleine stellen<br>3 das <var>x</var> ausrechnen";
            help = `Multipliziere die Gleichung mit <var>x</var>,
            <br><br>
                <em>\\(\\frac{${a}}{x} \\cdot x = ${b} \\cdot x \\)</em>
            <br>
            `//!
            explainer2 = `<ul>
                <li>Multipliziere die Gleichung mit <var>x</var></li>
                <li>\\(\\frac{${a}}{x} \\cdot x = ${b} \\cdot x \\)</li>
                <li>\\(\\frac{${a} \\cdot x}{x} = ${b} \\cdot x \\)</li>
                <li>\\(${a} = ${b} \\cdot x \\) &nbsp;  &nbsp; jetzt durch ${b} teilen</li>
                <li>\\(\\frac{${a}}{${b}} =  x \\) &nbsp;  &nbsp; Seiten tauschen und ...</li>
                <li>...ausrechnen: x = ${(a/b).toFixed(2)}</li>
            </ul>
            &#x1F50A;<q>Das <var>x</var> muss auf jeden Fall Zähler werden!</q>
            <br><br>&#x1F4A1; Profi-Trick: lass einfach <var>x</var> und ${b} die Plätze tauschen und du hast sofort das Ergebnis:
            <br><br><em>\\(\\frac{${a}}{x} = ${b}\\) &nbsp; &hArr; &nbsp; \\(\\frac{${a}}{${b}} = x\\)</em>
            <br>&nbsp;
        `//!
        break;
        case 4:
            aufgabe = `\\[\\frac{${-a}}{x} = ${b}\\]`                       //  - a / x = b
            loesung = `\\[x = \\frac{${-a}}{${b}} = ${(-a/b).toFixed(2)}\\]`;
            explainer1 = "1 das <var>x</var> muss in den Zähler<br>2 das <var>x</var> alleine stellen<br>3 das <var>x</var> ausrechnen";
            help = `Multipliziere die Gleichung mit <var>x</var>,
            <br><br>
                <em>\\(\\frac{${-a}}{x} \\cdot x = ${b} \\cdot x \\)</em>
            <br>
            `//!
            explainer2 = `<ul>
                <li>Multipliziere die Gleichung mit <var>x</var></li>
                <li>\\(\\frac{${-a}}{x} \\cdot x = ${b} \\cdot x \\)</li>
                <li>\\(\\frac{${-a} \\cdot x}{x} = ${b} \\cdot x \\)</li>
                <li>\\(${-a} = ${b} \\cdot x \\) &nbsp;  &nbsp; jetzt durch ${b} teilen</li>
                <li>\\(\\frac{${-a}}{${b}} =  x \\) &nbsp;  &nbsp; Seiten tauschen und ...</li>
                <li>...ausrechnen: x = -${(a/b).toFixed(2)}</li>
            </ul>
            &#x1F50A;<q>Das <var>x</var> muss auf jeden Fall Zähler werden!</q>
            <br><br>&#x1F4A1; Profi-Trick: lass einfach <var>x</var> und ${b} die Plätze tauschen und du hast sofort das Ergebnis:
            <br><br><em>\\(\\frac{${-a}}{x} = ${b}\\) &nbsp; &hArr; &nbsp; \\(\\frac{${-a}}{${b}} = x\\)</em>
            <br>&nbsp;
        `//!
        break;
        case 5:
            aufgabe = `\\[\\frac{${a}}{x} = ${-b}\\]`                       //  a / x = - b
            loesung = `\\[x = \\frac{${a}}{${-b}} = ${(-a/b).toFixed(2)}\\]`;
            explainer1 = "1 das <var>x</var> muss in den Zähler<br>2 das <var>x</var> alleine stellen<br>3 das <var>x</var> ausrechnen";
            help = `Multipliziere die Gleichung mit <var>x</var>,
            <br><br>
                <em>\\(\\frac{${a}}{x} \\cdot x = ${-b} \\cdot x \\)</em>
            <br>
            `//!
            explainer2 = `<ul>
                <li>Multipliziere die Gleichung mit <var>x</var></li>
                <li>\\(\\frac{${a}}{x} \\cdot x = ${-b} \\cdot x \\)</li>
                <li>\\(\\frac{${a} \\cdot x}{x} = ${-b} \\cdot x \\)</li>
                <li>\\(${a} = ${-b} \\cdot x \\) &nbsp;  &nbsp; jetzt durch ${-b} teilen</li>
                <li>\\(\\frac{${a}}{${-b}} =  x \\) &nbsp;  &nbsp; Seiten tauschen und ...</li>
                <li>...ausrechnen: x = -${(a/b).toFixed(2)}</li>
            </ul>
            &#x1F50A;<q>Das <var>x</var> muss auf jeden Fall Zähler werden!</q>
            <br><br>&#x1F9F0;<q>Mache dir 100% klar, wie du ${a} geteilt durch (${-b}) mit dem Taschenrechner rechnest!</q>
            <br><br>&#x1F4A1; Profi-Trick: lass einfach <var>x</var> und ${-b} die Plätze tauschen und du hast sofort das Ergebnis:
            <br><br><em>\\(\\frac{${a}}{x} = ${-b}\\) &nbsp; &hArr; &nbsp; \\(\\frac{${a}}{${-b}} = x\\)</em>
            <br>&nbsp;
        `//!
        break;
        case 6:
            aufgabe = `\\[\\frac{x}{${a}} = ${b}\\]`                       //  x / a = b
            loesung = `\\[x = ${(a*b)}\\]`;
            explainer1 = `1. Das <var>x</var> alleine stellen ("nach x auflösen")
            <br>2. Das x ausrechnen
            `//!
            help = `Multipliziere die Gleichung mit ${a},
            <br><br>
                <em>\\(\\frac{x}{${a}} \\cdot ${a} = ${b} \\cdot ${a} \\)</em>
            <br>
            `//!
            explainer2 = `<ul>
                <li>Multipliziere die Gleichung mit ${a}</li>
                <li>\\(\\frac{x}{${a}} \\cdot ${a} = ${b} \\cdot ${a} \\)</li>
                <li>\\(\\frac{x \\cdot ${a}}{${a}} = ${b} \\cdot ${a} \\)</li>
                <li>\\(x = ${b} \\cdot ${a} \\) &nbsp;  &nbsp; jetzt nur noch ...</li>
                <li>...ausrechnen: x = ${a*b}</li>
            </ul>
            &#x1F4A1; Profi-Trick: die ${a} wandert von der linken auf die rechte Seite. Dabei wechselt sie bruchmäßig von unten nach oben.<br>&nbsp;
            <br><em>\\(\\frac{x}{${a}} = ${b}\\) &nbsp; &hArr; &nbsp; \\(x = ${b} \\cdot ${a}\\)</em>
            <br>&nbsp;
            `//!
        break;
        case 7:
            aufgabe = `\\[\\frac{-x}{${a}} = ${b}\\]`                       //  - x / a = b
            loesung = `\\[x = ${(-a*b)}\\]`;
            explainer1 = `1. Das <var>-x</var> alleine stellen ("nach x auflösen")
            <br>2. Das -x ausrechnen
            <br>3. Vorzeichen tauschen x = ...
            `//!
            help = `Multipliziere die Gleichung mit ${a},
            <br><br>
                <em>\\(\\frac{-x}{${a}} \\cdot ${a} = ${b} \\cdot ${a} \\)</em>
            <br>
            `//!
            explainer2 = `<ul>
                <li>Multipliziere die Gleichung mit ${a}</li>
                <li>\\(\\frac{-x}{${a}} \\cdot ${a} = ${b} \\cdot ${a} \\)</li>
                <li>\\(\\frac{-x \\cdot ${a}}{${a}} = ${b} \\cdot ${a} \\)</li>
                <li>\\(-x = ${b} \\cdot ${a} \\) </li>
                <li>\\(x = -${b} \\cdot ${a} \\) &nbsp;  &nbsp; jetzt nur noch ...</li>
                <li>...ausrechnen: x = -${a*b}</li>
            </ul>
            &#x1F4A1; Profi-Trick: die ${a} wandert von der linken auf die rechte Seite. Dabei wechselt sie bruchmäßig von unten nach oben.<br>&nbsp;
            <br><em>\\(\\frac{-x}{${a}} = ${b}\\) &nbsp; &hArr; &nbsp; \\(-x = ${b} \\cdot ${a}\\)</em>
            <br>&nbsp;
            `//!
        break;
        case 8:
            aufgabe = `\\[\\frac{x}{${a}} = ${-b}\\]`                       //  x / a = -b
            loesung = `\\[x = ${(-a*b)}\\]`;
            explainer1 = `1. Das <var>x</var> alleine stellen ("nach x auflösen")
            <br>2. Das x ausrechnen
            `//!
            help = `Multipliziere die Gleichung mit ${a},
            <br><br>
                <em>\\(\\frac{x}{${a}} \\cdot ${a} = ${-b} \\cdot ${a} \\)</em>
            <br>
            `//!
            explainer2 = `<ul>
                <li>Multipliziere die Gleichung mit ${a}</li>
                <li>\\(\\frac{x}{${a}} \\cdot ${a} = ${-b} \\cdot ${a} \\)</li>
                <li>\\(\\frac{x \\cdot ${a}}{${a}} = ${-b} \\cdot ${a} \\)</li>
                <li>\\(x = (-${b}) \\cdot ${a} \\) &nbsp;  &nbsp; jetzt nur noch ...</li>
                <li>...ausrechnen: x = -${a*b}</li>
            </ul>
            &#x1F4A1; Profi-Trick: die ${a} wandert von der linken auf die rechte Seite. Dabei wechselt sie bruchmäßig von unten nach oben.<br>&nbsp;
            <br><em>\\(\\frac{x}{${a}} = ${-b}\\) &nbsp; &hArr; &nbsp; \\(x = (-${b}) \\cdot ${a}\\)</em>
            <br>&nbsp;
            `//!
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
    return {
        text: aufgabe,
        answer: loesung,
        help,
        explainer,
        headerclass: undefined,
        menu: undefined,
        speak: undefined,
        speakhelp: undefined,
        speakexplainer: undefined,
        tutor: undefined
    }
}

export default lin3;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
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
        return k === 1 ? `\\({${h}}\\)` : `\\(\\frac{${h}}{${k}}\\)`
        //return `\\[\\frac{${h}}{${k}}\\]`
    } else if (format === "text") {
        return `${h} geteilt durch ${k}`;
    } else {
        return h + "/" + k;
    }
}