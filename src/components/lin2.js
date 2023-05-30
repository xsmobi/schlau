function lin2(min, max){
    let problem, solution, help, explainer, a, b, c

    a = getRandomInt(2,10);
    b = getRandomInt(-10,10);
    c = getRandomInt(-10,10);

    help = "... help ..."

    if (b < 0) {
      problem = `\\[${a} \\cdot x - ${-b} = ${c} \\]`
      help = `\\[${a} \\cdot x - ${-b} + ${-b} = ${c} + ${-b} \\]`
      help = help + `\\[${a} \\cdot x = ${c+b} \\]`
      help = `Addiere auf beiden Seiten ${-b}` + help
    } else if (b === 0){
      problem = `\\[${a} \\cdot x = ${c} \\]`
    } else {
      problem = `\\[${a} \\cdot x + ${b} = ${c} \\]`
    }

    //console.log(a)
    //console.log(b)
    //console.log(c)

    
    solution = (c - b) / a;
   
    explainer = "... explainer ..."
    
   

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


  
 

  