// addsub: Rechenart "Plus Minus & Klammern".
// Option-based (menu/route/icon) generator, following the pattern used by
// prop.js/prozent.js/potenzen.js/times.js: one exported dispatch function
// per Rechenart, branching on the selected option.
//
// Option 1 (addsub1) = the original addsub generator, unchanged. Its
// internal `plusminuscase` randomization (which sign-presentation variant
// of "a - (-b)" style tasks gets shown) is NOT a Rechenart-Option - it's
// invisible-to-the-user randomization, same category as randomizing op1/op2,
// and stays entirely inside this branch, untouched by which option was
// selected.
//
// Option 2 (addsub2) = "Klammern auflösen", a port of the klammern-aufloesen.html
// prototype: lead ± (atom1 sign atom2 sign ... atomN), N = 2..7 atoms drawn
// from numbers and variables - a separate, independent randomization from
// option 1's plusminuscase, and unrelated to it.
function addsub(filter) {
    const menu = [
        { nr: 1, title: "Vorzeichen bei einer Klammer", description: "" },
        { nr: 2, title: "Klammern auflösen", description: "" },
    ];

    // filter arrives as a 0-based index (see CreateTask.js: filter = subtype - 1).
    // Convert to the 1-based option number and dispatch by nr rather than by
    // array position, so a future reordering/edit of `menu` above can't
    // silently desync option numbers from generator branches (see the
    // nr-vs-index drift already present in prop.js/prozent.js/potenzen.js).
    const nr = typeof filter === 'number' ? filter + 1 : getRandomInt(2);

    const result = nr === 2 ? addsubKlammern() : addsubClassic();

    return {
        ...result,
        menu,
    };
}

export default addsub;

// Option 1: original addsub logic, verbatim.
function addsubClassic() {
    const v1 = 10
    const v2 = 20
    let aufgabe, loesung, help, explainer, op1, op2
    // let plusminuscase = getRandomInt(4);
    // neu 15.10.: die ersten beiden Fälle (die ohne Klammern) werden auskommentiert:
    let plusminuscase = 2 + getRandomInt(2);
    switch(plusminuscase) {
        /*
        case 1:  // 3 - 5, Zahl minus größere Zahl
            op1 = getRandomInt(v1);
            op2 = v1 + getRandomInt(v2) + 1; // v1, v2 = 20
            aufgabe = `\\[${op1}-${op2}=\\]`
            loesung = op1 - op2;
            help = `(${op1} - ${op2}) ist das Negative von (${op2} - ${op1})!`
            explainer= `Das Ergebnis ist kleiner als Null (< 0), weil du eine größere Zahl, ${op2}, von einer kleineren Zahl, ${op1}, abziehst.
            <br><br>Der umgekehrte Fall wäre ${op2} - ${op1} = ${op2 - op1}
            <br><br>Trick: siehe <kbd>&nbsp; ? &nbsp;</kbd>
            <br>${help}
            <br>Und wenn ${op2} - ${op1} = ${-loesung},
            <br>dann ist ${op1} - ${op2} = ${loesung}
            <br><br>Auf dem Zahlenstrahl: Pfeil nach rechts von Null nach ${op1}, dann Pfeil der Länge ${op2} von dort aus nach links - und du kommst bei ${op1 - op2} raus.
            `//!
        break;
        case 2:  // -3 - 5, minus neg Zahl minus neg Zahl
            op1 = getRandomInt(v1);
            op2 = getRandomInt(v2); // v1, v2 = 20
            aufgabe = `\\[-${op1}-${op2}=\\]`
            loesung = - op1 - op2;
            help = `(- ${op1} - ${op2}) ist das Negative von (+${op1} + ${op2})!`
            explainer= `<ul>
                <li>Keine Klammer, also 1 Schritt gespart!</li>
                <li>Starte bei 0</li>
                <li>Gehe ${op1} Schritte nach links</li>
                <li>Gehe ${op2} Schritte weiter nach links</li>
                <li>Bis du bei ${loesung} gelandet?</li>
            </ul>
            Wenn du lieber an Pfeile auf dem Zahlenstrahl denkst: die ${op1} ist ein Pfeil nach links ins Minus. Die ${op2} ebenfalls. Also bist du insgesamt bei ${loesung} angekommen.
            <br><br>Es geht auch einfacher, siehe <kbd>&nbsp; ? &nbsp;</kbd>
            <br>${help}
            <br>und (+${op1} + ${op2}) = ${-loesung} easy!
            <br>Davon das Negative = ${loesung}
            `//!
        break;
        */
        case 3:  // ... +(-5)
            op1 = getRandomInt(v1) - getRandomInt(2*v1);
            if (op1 === 0) op1++
            op2 = getRandomInt(v2); // v1, v2 = 20
            //aufgabe = `${op1} + (-${op2}) = `
            aufgabe = `\\[${op1}+(-${op2})=\\]`
            loesung = op1 - op2;

            help = `Für das (-${op2}) gilt die Regel:
            <br>+(-x) = -x also:
            <br>${op1} + (-${op2}) = ${op1} - ${op2}`

            explainer= `<ul>
                <li>Starte bei 0</li>
                <li>Gehe zu ${op1}</li>
                <li>Gehe um ${op2} nach links</li>
                <li>Du kommst bei ${loesung} raus</li>
            </ul>
            Tipp: schreibe immer einen Extraschritt für das Auflösen der Klammer, erst dann das Ergebnis!
            <br>${op1} + (-${op2}) = ${op1} - ${op2}
            <br>
            <br>Auf dem Zahlenstrahl: Pfeil zur Zahl ${op1}, dann Pfeil der Länge ${op2}, und zwar nach links, weil minus.
            <br><br>Oder: du addiert etwas Negatives, nämlich -${op2}, und das ist so, wie wenn du das Positive, nämlich ${op2}, abziehst.
            <br>Deshalb heißt ja der Zwischenschritt:
            <br>= ${op1} - ${op2}
            `//!
        break;
        case 4: // -(-5)
            op1 = getRandomInt(v1) - getRandomInt(2*v1);
            if (op1 === 0) op1++
            op2 = getRandomInt(v2); // v1, v2 = 20
            //aufgabe = `${op1} - (-${op2}) = `
            aufgabe = `\\[${op1}-(-${op2})=\\]`
            loesung = op1 + op2;
            help = `Für das (-${op2}) gilt die Regel:
            <br>-(-x) = +x also:
            <br>${op1} - (-${op2}) = ${op1} + ${op2}`
            explainer= `Die Regel -(-x) = +x also:
            <br>${op1} - (-${op2}) = ${op1} + ${op2}
            <br>kannst du auch so merken:
            <br>"Eine Zahl subtrahieren heißt, die Gegenzahl addieren"
            <br>Die Gegenzahl zu (-${op2}) ist (+${op2})!
            <br>Also: statt (-${op2}) zu subtrahieren, die ${op2} addieren!
            <br>${op1} + ${op2} = ${op1 + op2}`
        break;
        default:
    }
    loesung = `\\[${loesung}\\]`
    return {
        text: aufgabe,
        answer: loesung,
        help,
        explainer,
        headerclass: undefined,
        menu: undefined,
        speak: undefined,
        speakhelp: undefined,
        speakexplainer: undefined,
        tutor: undefined
    }
}

// Option 2: "Klammern auflösen" - ported from the klammern-aufloesen.html
// prototype's generateTask()/buildSteps(). Task shape: lead ± (atom1 sign
// atom2 sign ... atomN), N = 2..7, atoms drawn from numbers 2-20 and the
// variable pool below. Kept as close to the reference as this file's
// architecture allows (see helpers below, each named after its reference
// counterpart) - not a redesign.
function addsubKlammern() {
    const VARS = ['a', 'b', 'c', 'x', 'y', 'xy', 'ab']
    const isNum = (s) => /^\d+$/.test(s)

    function randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    function pick(arr) {
        return arr[randInt(0, arr.length - 1)]
    }
    function randomAtom() {
        return Math.random() < 0.55 ? String(randInt(2, 20)) : pick(VARS)
    }
    function randomSign() {
        return Math.random() < 0.5 ? '+' : '-'
    }
    function flipSign(s) {
        return s === '+' ? '-' : '+'
    }
    function weightedInnerCount() {
        const r = Math.random()
        if (r < 0.40) return randInt(2, 3)
        if (r < 0.75) return randInt(4, 5)
        return randInt(6, 7)
    }

    // Two adjacent atoms both being plain numbers (e.g. -14 - 5), or the
    // same variable repeated (e.g. ab ... ab), lets a student mentally
    // combine them - defeating the point of practicing bracket/sign rules
    // rather than arithmetic. Different variables adjacent (x next to y)
    // are fine.
    //
    // Type (numeric vs. variable) and value are decided in two separate
    // passes because coupling them in one rejection-sampling pass can get
    // stuck: e.g. for a 3-slot chain [lead, atom0, atom1], if the single
    // numeric slot that emerges lands in the middle, BOTH remaining slots
    // are adjacent to it and neither can become numeric without a
    // violation - there is no valid "just add one more" move, only
    // "reconsider the pattern" (this was caught by generating 200 samples
    // and checking the >=2-numeric guard explicitly, not just adjacency).
    //
    // buildNumericPattern decides which of the `length` slots (lead +
    // atoms) are numeric, guaranteeing no two adjacent and at least 2
    // overall - always possible for length >= 3 (weightedInnerCount's
    // minimum of 2 inner atoms means length is never less than 3): the
    // first and last slots are never adjacent to each other, so forcing
    // those two is always a valid fallback.
    function buildNumericPattern(length) {
        const isNumSlot = new Array(length).fill(false)
        const order = Array.from({ length }, (_, i) => i)
        for (let i = order.length - 1; i > 0; i--) {
            const j = randInt(0, i)
            const tmp = order[i]
            order[i] = order[j]
            order[j] = tmp
        }
        for (const i of order) {
            const leftIsNum = i > 0 && isNumSlot[i - 1]
            const rightIsNum = i < length - 1 && isNumSlot[i + 1]
            if (!leftIsNum && !rightIsNum && Math.random() < 0.55) {
                isNumSlot[i] = true
            }
        }
        if (isNumSlot.filter(Boolean).length < 2) {
            isNumSlot[1] = false
            isNumSlot[length - 2] = false
            isNumSlot[0] = true
            isNumSlot[length - 1] = true
        }
        return isNumSlot
    }

    // Fills in actual values left-to-right: numeric slots get an
    // independent random int, variable slots reroll only against their
    // already-filled left neighbor (the right neighbor isn't decided yet -
    // it will do the same check when its own turn comes), which is enough
    // to guarantee every adjacent variable-variable pair differs.
    function fillValues(isNumSlot) {
        const seq = []
        for (let i = 0; i < isNumSlot.length; i++) {
            if (isNumSlot[i]) {
                seq.push(String(randInt(2, 20)))
                continue
            }
            const leftVar = i > 0 && !isNumSlot[i - 1] ? seq[i - 1] : null
            let candidate = pick(VARS)
            let guard = 0
            while (candidate === leftVar && guard < 30) {
                candidate = pick(VARS)
                guard++
            }
            seq.push(candidate)
        }
        return seq
    }

    function generateTask() {
        const innerCount = weightedInnerCount()
        const length = innerCount + 1 // lead + inner atoms, as one chain

        const isNumSlot = buildNumericPattern(length)
        const seq = fillValues(isNumSlot)

        const [lead, ...atoms] = seq
        const signs = atoms.map(() => randomSign())
        const outerSign = Math.random() < 0.78 ? '-' : '+'

        return { lead, outerSign, atoms, signs }
    }

    function flippedSigns(t) {
        return t.outerSign === '-' ? t.signs.map(flipSign) : t.signs.slice()
    }

    // Sign/atom sequence formatting. suppressLeadingPlus mirrors the
    // reference's task-string convention (nobody writes "(+3 - x)"); the
    // Explainer's "Vorzeichen sichtbar machen" step deliberately turns that
    // implicit leading "+" into a visible one, so it's passed false there.
    // highlightIndex optionally colors one term's sign red - used by the
    // Explainer's Reveal step to call out the newly-visible leading sign.
    //
    // Coloring uses MathJax's "switch" color form wrapped in an explicit
    // TeX group - {\color{red}...} - not the two-argument \color{red}{...}.
    // Verified empirically (MathJax 3.2.2, this app's version): the
    // two-argument form does NOT reliably end its own scope, so anything
    // typeset after it keeps inheriting red until the next \color command,
    // regardless of that command's own closing brace. {\color{red}...}
    // (switch set inside an explicit group) correctly reverts to the
    // inherited color as soon as that group's "}" is reached.
    function formatTerms(atoms, signs, suppressLeadingPlus, highlightIndex = -1) {
        return atoms
            .map((atom, i) => {
                if (i === 0 && suppressLeadingPlus && signs[i] === '+') return atom
                const signStr = i === highlightIndex ? `{\\color{red}${signs[i]}}` : signs[i]
                return `${signStr} ${atom}`
            })
            .join(' ')
    }

    const t = generateTask()
    const { lead, outerSign, atoms, signs } = t
    const flipped = flippedSigns(t)

    // Task string: lead outerSign (inner, natural/suppressed-leading-plus notation).
    const aufgabe = `\\[${lead} ${outerSign} (${formatTerms(atoms, signs, true)})\\]`

    // Solution string: lead followed by each atom with its flipped-or-unchanged
    // sign, space-separated, no brackets.
    const solutionLine = `${lead} ${formatTerms(atoms, flipped, false)}`
    const loesung = `\\[${solutionLine}\\]`

    // buildSteps(), ported: three-step sign-resolution progression. Feeds
    // Help only - the Explainer has its own, more granular step sequence
    // below (Aufgabe / Reveal / Sign-flip / Mark-for-removal / Result).
    const step1 = `${lead} ${outerSign} (${formatTerms(atoms, signs, false)})`
    const step2 = `${lead} + (${formatTerms(atoms, flipped, false)})`
    const step3 = solutionLine

    // Help: same three steps, bare (no labels). step1 and step2 are
    // textually identical whenever no flip was needed (outer sign already
    // "+", so flipped === signs) - showing that line twice tells the
    // student nothing, so collapse a step that repeats the immediately
    // preceding one.
    const helpSteps = [step1, step2, step3].filter((step, i, arr) => i === 0 || step !== arr[i - 1])
    const help = helpSteps.map((step) => `\\[${step}\\]`).join('\n    <br>')

    // Explainer: 5-step sequence. Reveal and Sign-flip are each
    // independently conditional (0, 1, or both may apply, depending on the
    // leading inner sign and the outer sign) - the remaining steps are
    // renumbered dynamically so the displayed sequence always reads 1..N
    // with no gaps. Highlighted tokens use MathJax's \color{red}{} rather
    // than raw HTML spans: a <span> inside \[...\] becomes its own DOM
    // node, splitting the delimiters across nodes, so MathJax never
    // typesets it (verified live - it's left as literal, un-rendered text).
    const revealNeeded = signs[0] === '+'
    const flipNeeded = outerSign === '-'

    const aufgabeExpr = `${lead} ${outerSign} (${formatTerms(atoms, signs, true)})`
    const revealExpr = `${lead} ${outerSign} (${formatTerms(atoms, signs, false, 0)})`
    const flipExpr = `${lead} + (${formatTerms(atoms, flipped, false)})`
    // Exactly three red tokens: the connector "+", the opening "(", and the
    // closing ")" - everything inside the brackets stays the inherited
    // color, unchanged from the previous step. "+" and "(" are one
    // {\color{red}...} group (see formatTerms above for why the two-arg
    // \color{red}{...} form can't be used here).
    const markExpr = `${lead} {\\color{red}+ (}${formatTerms(atoms, flipped, false)}{\\color{red})}`
    const resultExpr = solutionLine

    const explainerSteps = [{ label: 'Aufgabe', expr: aufgabeExpr }]
    if (revealNeeded) explainerSteps.push({ label: 'Vorzeichen sichtbar machen', expr: revealExpr })
    if (flipNeeded) explainerSteps.push({ label: 'Vorzeichen in und vor der Klammer umdrehen', expr: flipExpr })
    explainerSteps.push({ label: 'Klammer und Vorzeichen davor markieren', expr: markExpr })
    explainerSteps.push({ label: 'Ergebnis', expr: resultExpr })

    // Each step is its own block: label above its own expression (mt-1
    // between them), a visibly larger gap before the next block's label
    // (mt-8) so a skim never misattributes one block's (possibly red)
    // expression to the label above the PREVIOUS block. Whitespace only,
    // no background band, per review. Scoped to this Explainer only - Help
    // stays exactly as it was, and addsub's option 1 explainer is untouched.
    const explainer = explainerSteps
        .map(
            (s, i) => `<div class="${i === 0 ? '' : 'mt-8'}">
        <b>${i + 1}. ${s.label}</b>
        <div class="mt-1">\\[${s.expr}\\]</div>
    </div>`
        )
        .join('')

    return {
        text: aufgabe,
        answer: loesung,
        help,
        explainer,
        headerclass: undefined,
        menu: undefined,
        speak: undefined,
        speakhelp: undefined,
        speakexplainer: undefined,
        tutor: undefined
    }
}

function getRandomInt(n) {
    return Math.floor(Math.random() * n) + 1;
}
