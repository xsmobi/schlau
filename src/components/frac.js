import React from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

/*
export default function App() {
  return (
      <MathJaxContext>
            <h2>Basic MathJax example with Latex</h2>
            <MathJax>{"\\(\\frac{10}{4x} \\approx 2^{12}\\)"}</MathJax>
      </MathJaxContext>
  );
}
*/

function frac(min, max){
    let aufgabe, loesung, help, num, den
    num = getRandomInt2(20, 2);
    den = getRandomInt2(40, 2);
    aufgabe = num/den;
    <MathJaxContext>
        aufgabe = <MathJax>{"\\(\\frac{10}{4x} \\approx 2^{12}\\)"}</MathJax>;
        console.log(aufgabe)
    </MathJaxContext>
    // aufgabe = "...aufgabe"
    loesung = ""
    help = ""
    return [aufgabe, loesung, help];
}
export default frac;

function getRandomInt2(max, n) { // n = Teiler = 2, 3, 5, 7
    return Math.floor(Math.random() * max) * n + n; // +n die Null ausschl.
  }

function getlowestfraction(x0) {
    var eps = 1.0E-15;
    var h, h1, h2, k, k1, k2, a, x;

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

    return h + "/" + k;
}