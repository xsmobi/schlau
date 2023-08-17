function times(){    
    let aufgabe, loesung, help, explainer

    const op1 = 2 + getRandomInt(8)
    const op2 = 2 + getRandomInt(8)

    aufgabe = `\\[${op1} \\cdot ${op2} = ?\\]`

    loesung = `\\[${op1} \\cdot ${op2} = ${op1*op2}\\]`

    help = `
    
    `//!

    
    if (op1 === 9){
        explainer = `
            \\[10 \\cdot ${op2} = ${10*op2}\\]
            \\[9 \\cdot ${op2} = ${10*op2} - ${op2}\\]
    `} else if (op2 === 9) {
        explainer = `
            \\[${op1} \\cdot 10 = ${10*op1}\\]
            \\[${op1} \\cdot 9 = ${10*op1} - ${op1}\\]
    `}


   

    
    return [aufgabe, loesung, help, explainer];
 }

export default times;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
}