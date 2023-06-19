function linfun() {
    let aufgabe, loesung, help, explainer
    
    const aa = [1/4,1/3,1/2,3/4,3/5,4/5,1,3/2,2]
    const a = aa[Math.floor(Math.random()*aa.length)];
    console.log(a)
    
    
    
    
    let plusminuscase = getRandomInt(4);
    plusminuscase = 1
    switch(plusminuscase) {
        case 1: 
            aufgabe = `` 
            help = `` 
            loesung = `` 
            explainer = `` 

        break;
        case 2: 

        aufgabe = `` 
        help = `` 
        loesung = `` 
        explainer = `` 
        break;
        case 3: 

        aufgabe = `` 
        help = `` 
        loesung = `` 
        explainer = `` 

        break;
        case 4: 

        aufgabe = `` 
        help = `` 
        loesung = `` 
        explainer = `` 

        break;
        default:
        
        aufgabe = `` 
        help = `` 
        loesung = `` 
        explainer = ``
    }

    return [aufgabe, loesung, help, explainer];
}

export default linfun;

function getRandomInt(n) { 
    return Math.floor(Math.random() * n + 1);
}
