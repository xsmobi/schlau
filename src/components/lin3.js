function lin3(max, min) {
    let aufgabe, loesung, help, explainer, explainer1, explainer2
    let a = getRandomInt(max-min) + min; // > 0
    let b = getRandomInt(max-min) + min; // > 0
    if (b === a) b++
    const casex = getRandomInt(8)
    //const casex = 8
    explainer1 = `Ziel: das unbekannte <b>x</b> soll alleine stehen. Du formst die Gleichung so um, dass sie mit "x =" beginnt. `
    explainer2 = ""
    //explainer2a = ""
    switch(casex) {
        case 0:
            aufgabe = `\\[${a} \\cdot x = ${b}\\]`                       // a * x = b
            loesung = `\\[x = \\frac{${b}}{${a}} = ${(b/a).toFixed(2)}\\]`;
            help = `Dividiere die Gleichung durch ${a}, dann steht x alleine und du musst es nur noch ausrechnen \\[${a} \\cdot x / ${a} = ${b} / ${a}\\] \\[x = ${b} / ${a}\\]`
            explainer2 = `Dazu dividierst du auf beiden Seiten durch <b>${a}</b> und erhältst
            <br>${a} &middot; x <b>/ ${a}</b> = ${b} <b>/ ${a}</b>
            <br>x = ${b} / ${a}
            <br><br>
            Oder: statt "die Gleichung durch ${a} zu dividieren" kannst du sagen: "${a} auf die andere Seite bringen. Dabei wechselt es unter den Bruchstrich"
            <br><b>${a} &middot;</b> x = ${b}
            <br>x = ${b} <b> / ${a}</b>`
        break;
        case 1:
            aufgabe = `\\[${-a} \\cdot x = ${b}\\]`                       // - a * x = b
            loesung = `\\[x = - \\frac{${b}}{${a}} = ${(-b/a).toFixed(2)}\\]`;
            help = `Dividiere die Gleichung durch (${-a}), dann steht x alleine und du musst es nur noch ausrechnen \\[${a} \\cdot x / (${-a}) = ${b} / (${-a})\\] \\[x = - (${b} / ${a})\\]`
            explainer2 = `Dazu dividierst du auf beiden Seiten durch <b>${-a}</b> und erhältst
            <br>${-a} &middot; x <b>/ (${-a})</b> = ${b} <b>/ (${-a})</b>
            <br>x = ${b} / (${-a})
            <br>x = - ${b}/${a}
            <br><br>
            Oder: statt "die Gleichung durch ${-a} zu dividieren" kannst du sagen: "${-a} auf die andere Seite bringen. Dabei wechselt (${-a}) unter den Bruchstrich"
            <br><b>( ${-a} ) &middot;</b> x = ${b}
            <br>x = ${b} <b> / (${-a})</b>`
        break;
        case 2:
            aufgabe = `\\[${a} \\cdot x = ${-b}\\]`                       // a * x = -b
            loesung = `\\[x = - \\frac{${b}}{${a}} = ${(-b/a).toFixed(2)}\\]`;
            help = `Dividiere die Gleichung durch (${a}), dann steht x alleine und du musst es nur noch ausrechnen \\[${a} \\cdot x / ${a} = (${-b}) / ${a}\\] \\[x = - (${b} / ${a})\\]`
            explainer2 = `Dazu dividierst du auf beiden Seiten durch <b>${a}</b> und erhältst
            <br>${a} &middot; x <b>/ (${a})</b> = (${-b}) <b>/ ${a}</b>
            <br>x = (${-b}) / ${a}
            <br>x = - ${b}/${a}
            <br><br>
            Oder: statt "die Gleichung durch ${a} zu dividieren" kannst du sagen: "${a} auf die andere Seite bringen. Dabei wechselt die ${a} unter den Bruchstrich"
            <br><b>${a} &middot;</b> x = ${-b}
            <br>x = (${-b}) <b> / ${a}</b>`
        break;
        case 3:
            aufgabe = `\\[\\frac{${a}}{x} = ${b}\\]`                       //  a / x = b
            loesung = `\\[x = \\frac{${a}}{${b}} = ${(a/b).toFixed(2)}\\]`;
            help = `Multipliziere die Gleichung mit x, damit x im Zähler ist \\[\\frac{${a}}{x} \\cdot x = ${b} \\cdot x\\] Links kürzt sich das x weg! Dividiere jetzt durch ${b}, damit x alleine steht.`
            explainer1 = "Du formst die Gleichung so um, dass erst x über den Bruchstrich kommt und dann alleine steht.";
            explainer2 = ` Multipliziere die Gleichung mit x:
            <br>${a}/x <b>&middot; x</b> = ${b} <b>&middot; x</b>
            <br>${a} = ${b} &middot; x;
            <br>Jetzt die Gleichung durch ${b} dividieren: ${a}/${b} = x; ... und ausrechnen
            <br><br>
            <b>Trick:</b> bei diesem Aufgabentyp lässt du einfach x und ${b} die Plätze tauschen und hast sofort das Ergebnis:
            <br>${a} / x = ${b}
            <br>${a} / ${b} = x`
        break;
        case 4:
            aufgabe = `\\[\\frac{${-a}}{x} = ${b}\\]`                       //  - a / x = b
            loesung = `\\[x = \\frac{${-a}}{${b}} = ${(-a/b).toFixed(2)}\\]`;
            help = `Multipliziere die Gleichung mit x, damit x im Zähler ist \\[\\frac{${-a}}{x} \\cdot x = ${b} \\cdot x\\] Links kürzt sich das x weg! Dividiere jetzt durch ${b}, damit x alleine steht.`
            explainer1 = "Du formst die Gleichung so um, dass erst x über den Bruchstrich kommt und dann alleine steht.";
            explainer2 = ` Multipliziere die Gleichung mit x:
            <br>( ${-a}/x ) &middot; x = ${b} &middot; x
            <br>${-a} = ${b} &middot; x;
            <br>Jetzt die Gleichung durch ${b} dividieren: ${-a}/${b} = x; ... und ausrechnen
            <br><br>
            <b>Trick:</b> bei diesem Aufgabentyp lässt du einfach x und ${b} die Plätze tauschen und hast sofort das Ergebnis:
            <br>( ${-a} ) / x = ${b}
            <br>( ${-a} ) / ${b} = x`
        break;
        case 5:
            aufgabe = `\\[\\frac{${a}}{x} = ${-b}\\]`                       //  a / x = - b
            loesung = `\\[x = \\frac{${a}}{${-b}} = ${(-a/b).toFixed(2)}\\]`;
            help = `Multipliziere die Gleichung mit x, damit x im Zähler ist \\[\\frac{${a}}{x} \\cdot x = (${-b}) \\cdot x\\] Links kürzt sich das x weg! Dividiere jetzt durch ${-b}, damit x alleine steht.`
            explainer1 = "Du formst die Gleichung so um, dass erst x über den Bruchstrich kommt und dann alleine steht.";
            explainer2 = ` Multipliziere die Gleichung mit x:
            <br>${a}/x &middot; x = (${-b}) &middot; x
            <br>${a} = ${-b} &middot; x;
            <br>Jetzt die Gleichung durch ${-b} dividieren: ${a}/(${-b}) = x; ... und ausrechnen
            <br><br>
            <b>Trick:</b> bei diesem Aufgabentyp lässt du einfach x und ${b} die Plätze tauschen und hast sofort das Ergebnis:
            <br>${a} / x = ${-b}
            <br>${a} / (${-b}) = x`
        break;
        case 6:
            aufgabe = `\\[\\frac{x}{${a}} = ${b}\\]`                       //  x / a = b
            loesung = `\\[x = ${(a*b)}\\]`;
            help = `Multipliziere die Gleichung mit ${a}, dann steht x alleine und du musst es nur noch ausrechnen \\[\\frac{x}{${a}} \\cdot ${a} = ${b} \\cdot ${a}\\] \\[x = ${b} \\cdot ${a}\\]`
            explainer2 = ` Dazu multiplizierst du die Gleichung mit ${a}:
            <br>x / ${a} <b>&middot; ${a}</b> = ${b} <b>&middot; ${a}</b>
            <br>x = ${b} &middot; ${a};`
        break;
        case 7:
            aufgabe = `\\[\\frac{-x}{${a}} = ${b}\\]`                       //  - x / a = b
            loesung = `\\[x = ${(-a*b)}\\]`;
            help = `Multipliziere die Gleichung mit ${a}, dann steht -x alleine und du kannst x ausrechnen \\[\\frac{-x}{${a}} \\cdot ${a} = ${b} \\cdot ${a}\\] \\[-x = ${b} \\cdot ${a}\\] \\[x = - ${b} \\cdot ${a}\\]`
            explainer2 = ` Dazu multiplizierst du die Gleichung mit ${a}:
            <br>-x / ${a} <b>&middot; ${a}</b> = ${b} <b>&middot; ${a}</b>
            <br>-x = ${b} &middot; ${a};
            <br>x = - ${b} &middot; ${a};`
        break;
        case 8:
            aufgabe = `\\[\\frac{x}{${a}} = ${-b}\\]`                       //  x / a = -b
            loesung = `\\[x = ${(-a*b)}\\]`;
            help = `Multipliziere die Gleichung mit ${a}, dann steht x alleine und du musst es nur noch ausrechnen \\[\\frac{x}{${a}} \\cdot ${a} = ${-b} \\cdot ${a}\\] \\[x = - ${b} \\cdot ${a}\\]`
            explainer2 = ` Dazu multiplizierst du die Gleichung mit ${a}:
            <br>x / ${a} <b>&middot; ${a}</b> = ${-b} <b>&middot; ${a}</b>
            <br>x = ${-b} &middot; ${a};`
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

export default lin3;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
}