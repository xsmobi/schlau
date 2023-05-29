function frac(min, max){
    let aufgabe, loesung, help, num, den
    const divisors = [2,3,5,7,9]
    const randomDivisor = divisors[Math.floor(Math.random() * divisors.length)];
    num = getRandomInt2(20, randomDivisor);
    den = getRandomInt2(40, randomDivisor);
    //aufgabe = num/den;
    aufgabe = `\\[\\frac{${num}}{${den}}\\]`;
    loesung = getlowestfraction(num/den);
    let numdiv = findDivisors(num).toString()
    //numdiv = numdiv.substring(0,numdiv.length-1);
    let dendiv = findDivisors(den).toString();
    //dendiv = dendiv.substring(0,dendiv.length-1);
    let numprime = primeFactors(num).toString()
    //numprime = numprime.substring(0,numprime.length-1);
    let denprime = primeFactors(den).toString();
    //denprime = denprime.substring(0,denprime.length-1);



    help = `Der Zähler ist das zusammengesetzt aus den möglichen Teilern: ${numdiv}, der Nenner aus ${dendiv}. Der Zähler ist das Produkt ${numprime}, der Nenner aus ${denprime}. `
    
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
    // return h + "/" + k;
   return `\\[\\frac{${h}}{${k}}\\]`; 
}

function findDivisors(integer) { //https://dev.to/cesar__dlr/32-find-the-divisors-codewars-kata-7-kyu-5f7n
    let r = []
    for(let i = 2; i<integer; i++){
      if(integer%i === 0) r.push(i)
    }
    let res = r.length !== 0 ? r : `${integer} is prime`
    return res
  }

  
  function primeFactors(num) {
    function is_prime(num) {
      for (let i = 2; i <= Math.sqrt(num); i++)
      {
        if (num % i === 0) return false;
      }
      return true;
    }
    const result = [];
    for (let i = 2; i <= num; i++)
    {
      while (is_prime(i) && num % i === 0) 
      {
        if (!result.includes(i)) result.push(i);
        num /= i;
      }
    }
    return result;
  }