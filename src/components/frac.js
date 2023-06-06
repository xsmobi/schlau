function frac(){
    let aufgabe, loesung, help, num, den, explainer
    const divisors = [2,3,5,7,9]
    const randomDivisor = divisors[Math.floor(Math.random() * divisors.length)];
    num = getRandomInt2(5, randomDivisor);
    den = getRandomInt2(8, randomDivisor);
    // den = 1 //Test
    // num = 20
    // den = 10
    if(num === den) den = den + randomDivisor;
    aufgabe = `\\[\\frac{${num}}{${den}}\\]`;
    loesung = getlowestfraction(num/den, "jax");
    let numdiv = findDivisors(num).toString() 
    let dendiv = findDivisors(den).toString();
    let gcd = gcdTwoNumbers(num, den)
    help = `\\[\\frac{${num}}{${den}} = \\frac{${num}:${gcd}}{${den}:${gcd}}\\]`
    explainer = `Den Zähler kannst du teilen durch ${numdiv}, den Nenner durch ${dendiv}. Vergleiche diese Teiler von den beiden Brüchen! Haben die Brüche Teiler gemeinsam? Der größte <i>gemeinsame</i> Teiler der Zahlen ${num} und ${den} ist ${gcd}. Wenn du den Zähler ${num} und den Nenner ${den} durch diese Zahl ${gcd} teilst, erhältst du den gekürzten Bruch.
    ${gcd === den ? "Da der Nenner des Ergebnisbruchs = 1 ist, hat der Bruch einfach den Wert des Zählers." : ""}`
    /*
    help = `Den Zähler kannst du teilen durch ${numdiv}, den Nenner durch ${dendiv}. Vergleiche diese Teiler von den beiden Brüchen! Haben die Brüche Teiler gemeinsam? Der größte <i>gemeinsame</i> Teiler der Zahlen ${num} und ${den} ist ${gcd}. Wenn du den Zähler ${num} und den Nenner ${den} durch diese Zahl ${gcd} teilst, erhältst du den gekürzten Bruch.`
    explainer = `
        <b>1.</b> Was willst du mit dem Bruch ${num}/${den} machen?<br>
        * Den Wert ausrechnen?: teile ${num} durch ${den}, das ergibt ${loesungdec} - fertig.<br>
        *) kürzen. D.h. einen <i>einfacheren</i> Bruch machen mit dem <i>gleichen</i> Wert ${loesungdec}. So ein Bruch ist  ${loesungstring}. Rechne es aus: ${loesungtext} ist ebenfalls ${loesungdec}.<br>
        <b>2.</b> Du willst kürzen. <i>Wie</i> machst du den einfachen Bruch?<br>
        So geht es: du teilst den Zähler ${num} und den Nenner ${den} durch dieselbe Zahl. Diese Zahl muss also ein Teiler von ${num} und auch von ${den} sein, klar?<br>
        Der Zähler ${num} hat die Teiler ${numdiv}${num}<br>
        Der Nenner ${den} hat die Teiler ${dendiv}${den}<br>
        Wir suchen jetzt den <i>größten</i> Teiler, den ${num} und ${den} <i>gemeinsam</i> haben. Dieser ist die Zahl ${gcd}!<br>
        Wenn du jetzt den Zähler ${num} durch ${gcd} teilst und auch den Nenner ${den} durch ${gcd} teilst, dann erhältst du den gesuchten vereinfachten Bruch ${loesungstring}.
    `;
    */
 
    return [aufgabe, loesung, help, explainer];
}
export default frac;

function getRandomInt2(max, n) { // n = Teiler = 2, 3, 5, 7
    return Math.floor(Math.random() * max) * n + n; // +n die Null ausschl.
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
        return k === 1 ? `\\[{${h}}\\]` : `\\[\\frac{${h}}{${k}}\\]`
        //return `\\[\\frac{${h}}{${k}}\\]`
    } else if (format === "text") {
        return `${h} geteilt durch ${k}`;
    } else {
        return h + "/" + k;
    }
}

function findDivisors(integer) { //https://dev.to/cesar__dlr/32-find-the-divisors-codewars-kata-7-kyu-5f7n
    let r = []
    for(let i = 2; i<integer; i++){
      if(integer%i === 0) r.push(i)
    }
    //let res = r.length !== 0 ? r : `${integer} is prime`
    let res = r.length !== 0 ? r : `${integer}`
    //res = `${res} und die ${integer} selbst`
    //console.log(res)
    return res
  }



  function gcdTwoNumbers(x, y) {
    if ((typeof x !== 'number') || (typeof y !== 'number')) 
      return false;
    x = Math.abs(x);
    y = Math.abs(y);
    while(y) {
      var t = y;
      y = x % y;
      x = t;
    }
    return x;
  }

  /*
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
  */