function add(){    
    let aufgabe, loesung, explainer

    const op1 = 2 + getRandomInt(8)
    const op2 = 2 + getRandomInt(8)

    aufgabe = `\\[${op1} \\cdot ${op2} = ?\\]`

    loesung = `\\[${op1} \\cdot ${op2} = ${op1*op2}\\]`

    help = `
    
    `//!

    explainer = `
    `//!
    
    return [aufgabe, loesung, help, explainer];
}

export default times;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n);
}