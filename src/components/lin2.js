function lin2(min, max){
    let problem, solution, help, explainer, a, b, c, linpart

    a = getRandomInt(-10,10);
    if (a === 0) a-- 
    b = getRandomInt(-10,10);
    c = getRandomInt(-10,10);
    if (c === 0) c++ 

    //a = -1 // test

    if (a === 1) {
      linpart = `\\[x`
    } else if (a === -1) {
      linpart = `\\[-x`
    } else {
      //linpart = `\\[${a} \\cdot x` // Mal-Punkt weg!
      linpart = `\\[${a} x`
    }

   

    if (b < 0) {
      problem =     `${linpart} - ${-b} = ${c} \\]`
      help =        `${linpart} - ${-b} + ${-b} = ${c} + ${-b} \\]`
      if (Math.abs(a) !== 1) help = help + `${linpart} = ${c-b} \\]`
      help = `Addiere auf beiden Seiten ${-b}` + help
    } else if (b === 0){
      problem =      `${linpart} = ${c} \\]`
      if (a === 1) {
        help = `Die Lösung steht bereits da!`
      } else if (a === -1) {
        help = `Die Lösung für -x steht bereits da: multipliziere die Gleichung mit -1`
      } else {
        help = `Löse nach x auf: dividiere durch ${a}`
      }
    } else {
      problem =     `${linpart} + ${b} = ${c} \\]`
      help =        `${linpart} + ${b} - ${b} = ${c} - ${b} \\]`
      if (Math.abs(a) !== 1) help = help + `${linpart} = ${c-b} \\]`
      help = `Subtrahiere auf beiden Seiten ${b}` + help
    }


    let solutionval = (c - b) / a;
    if (Number.isInteger(solutionval)) {
      if (Math.abs(solutionval) === 1) {
        solution = `\\[x = ${solutionval}\\]`
      } else {
        solution =`\\[x = ${solutionval}\\]`
      }
    } else {
      if (c === b) {
        solution = `\\[x = 0\\]`
      } else {
        solution =`\\[x = \\frac{${c-b}}{${a}} = ${solutionval.toFixed(2)}\\]`
      }
    }
    
    explainer = `Was ist zu tun?
    <br>&#x1F50A;<q>Die Gleichung ist vom Typ a&middot;x + b = c</q>
    <br>&#x1F50A;<q>Ich löse die Gleichung nach <var>x</var> auf </q>
    <ul>
      <li>Erst plus-minus rechnen:</li>
      <li>&rarr; das b wechselt Seite und Vorzeichen</li>
      <li>Dann mal-geteilt rechnen</li>
      <li>&rarr; das a wechselt Seite und wird 1/a</li>
      <li>Damit: x = (c-b)/a</li>
    </ul>
    Beispiele:
    <ul>
      <li>\\(x + 4 = 10 \\Rightarrow x = 10 - 4\\)</li>
      <li>\\(x - 4 = 10 \\Rightarrow x = 10 + 4\\)</li>
      <li>\\(2x + 4 = 10 \\Rightarrow x = \\frac{1}{2}(10-4)\\)</li>
      <li>\\(3x + 4 = 10 \\Rightarrow x = \\frac{1}{3}(10-4)\\)</li>
      <li>\\(3x - 4 = 10 \\Rightarrow x = \\frac{1}{3}(10+4)\\)</li>   
      <li>\\(-3x + 4 = -10 \\Rightarrow x = -\\frac{1}{3}(-10-4)\\)</li>
      <li>\\(-x = 7 \\Rightarrow x = -7\\)</li>
      <li>\\(-x -2 = -7 \\Rightarrow x + 2 = 7 \\Rightarrow x = 7 - 2\\)</li>
    </ul>
    &#x1F4A1; Letztes Beispiel: du kannst auch alle Vorzeichen ändern, um nicht mit doppeltem Minus etc. zu arbeiten.
    <br>
    <br>Ergänzung:
    Eine Gleichung wie \\(\\frac{1}{3}x + 5 = -4\\) ist auch vom Typ ax + b = c!
    <ul>
    <li>\\(\\frac{1}{3}x + 5 = -4 \\Rightarrow x = 3 \\cdot (-4 -5)\\)</li>
    <li>(denn 1 geteilt duch 1/3 ist ja wieder 3)</li>
    </ul>
    <br>&#x1F4A1; Spezialfall: <q>Die Lösung der Gleichung ax + b = 0 ist die Nullstelle der linearen Funktion y = ax + b</q>
    
    
    `//!
    
    //console.log(b)

    return [problem, solution, help, explainer];
}

export default lin2;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function brac(n) {
  return n < 0 ? n = "("+n+")" : n.toString()
}


/*
function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
}
*/

/*
function lin2() {
    let problem, solution, help, a, b, c
    // Generate random coefficients if not provided

     // a = getRandomInt(10);
      //b = getRandomInt(10);
      //c = getRandomInt(10);

    a = 1
    b = 2
    c = 3

    

    problem = `${a} * x + ${b} = ${c}`
    solution = (c - b) / a;
    help = "... help ..."

    // Example usage
    console.log(lin2()); // Generates a random problem and solves for x
    console.log(lin2(2, 4, 10)); // Solves the provided problem directl
  
    // Return the problem and solution
    return [problem, solution, help]
  }
  
export default lin2;
*/


// Helper function to generate random integers
/*
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomInt(n) { 
    return Math.floor(Math.random() * n) + 1;
}
*/


  
 

  