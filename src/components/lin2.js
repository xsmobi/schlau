function lin2(min, max){
    let problem, solution, help, explainer, a, b, c, linpart

    a = getRandomInt(-10,10);
    if (a === 0) a-- 
    b = getRandomInt(-10,10);
    c = getRandomInt(-10,10);
    if (c === 0) c++ 

    if (a === 1) {
      linpart = `\\[x`
    } else if (a === -1) {
      linpart = `\\[-x`
    } else {
      linpart = `\\[${a} \\cdot x`
    }

    if (b < 0) {
      problem =     `${linpart} - ${-b} = ${c} \\]`
      help =        `${linpart} - ${-b} + ${-b} = ${c} + ${-b} \\]`
      help = help + `${linpart} = ${c-b} \\]`
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
      help = help + `${linpart} = ${c-b} \\]`
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
    
   
    explainer = "... explainer ..."
    
    //console.log(b)

    return [problem, solution, help, explainer];
}

export default lin2;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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


  
 

  