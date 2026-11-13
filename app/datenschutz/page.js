import Link from 'next/link';

const style = {
  bg: `min-h-screen w-full bg-white px-4 py-12`,
  container: `mx-auto max-w-2xl prose prose-slate`,
  back: `no-underline text-sm text-blue-700`,
};

export const metadata = {
  title: 'Datenschutzerklärung – schlau.app',
};

export default function DatenschutzPage() {
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <Link href="/" className={style.back}>&larr; Back to schlau.app</Link>

        <h1>Datenschutzerklärung</h1>
        <p>Stand: 13.11.2026</p>

        <h2>1. Verantwortlicher</h2>
        <p>
          Dr. Eckard Ritter, Urbanstr. 93, 10967 Berlin<br />
          E-Mail: eckard.ritter@googlemail.com · Telefon/WhatsApp: +49 173 1618248
        </p>

        <h2>2. Grundsatz</h2>
        <p>
          schlau.app ist eine kostenlose Übungsplattform für Mathematik (Klasse 7–10). Es gibt keine Werbung,
          keine Analyse- oder Tracking-Dienste von Drittanbietern und keine Weitergabe von Daten zu
          Werbezwecken. Schriften und Rechenformeln (MathJax) werden von unserem eigenen Server geladen, nicht
          von externen Anbietern.
        </p>

        <h2>3. Hosting und Server-Logfiles</h2>
        <p>
          Die App wird bei Vercel Inc. (USA) gehostet. Beim Aufruf der Seite verarbeitet der Hoster technisch
          notwendige Verbindungsdaten, insbesondere die IP-Adresse, Datum und Uhrzeit sowie die aufgerufene
          Seite. Das ist für die Auslieferung und Sicherheit der Seite erforderlich (Art. 6 Abs. 1 lit. f
          DSGVO).
        </p>

        <h2>4. Anmeldung, Konto und E-Mail-Versand</h2>
        <p>
          Die Nutzung der Übungsaufgaben ist ohne Konto möglich. Für Klassenfunktionen, Fortschritt und
          Abzeichen ist ein Konto nötig. Anmeldung ist möglich:
        </p>
        <ul>
          <li>
            <strong>per E-Mail-Code:</strong> Wir speichern deine E-Mail-Adresse und senden dir einen
            Einmalcode. Der Versand läuft über den Dienst Resend (Resend, Inc., USA).
          </li>
          <li>
            <strong>per Google-Konto (optional):</strong> Dabei übermittelt Google uns deine E-Mail-Adresse und
            deinen Anzeigenamen (ggf. Profilbild). Die Verarbeitung durch Google richtet sich nach den
            Datenschutzhinweisen von Google. Die Anmeldung erfolgt nur, wenn du den Button „Sign in with
            Google“ benutzt.
          </li>
        </ul>
        <p>
          Konto- und Nutzungsdaten werden bei Supabase gespeichert (Server in der EU, Irland, AWS eu-west-1).
          Supabase Inc. hat seinen Sitz in den USA; der Auftragsverarbeitungsvertrag ist Bestandteil der
          Nutzungsbedingungen von Supabase.
        </p>

        <h2>5. Welche Daten gespeichert werden</h2>
        <ul>
          <li>E-Mail-Adresse, ggf. Anzeigename (bei Google-Anmeldung), interne Nutzer-ID</li>
          <li>Rolle (Schüler/in oder Lehrkraft)</li>
          <li>Klassenzugehörigkeit (falls du einer Klasse beigetreten bist)</li>
          <li>
            Fortschrittsdaten: <strong>nur tägliche Zähler</strong> pro Aufgabenthema und pro Schaltfläche (neue
            Aufgabe, Hilfe, Lösung, Erklärung). Einzelne Aufgaben oder deine Antworten werden nicht
            gespeichert.
          </li>
          <li>Abzeichen, die du dir erarbeitet hast</li>
          <li>ein täglich wechselndes Pseudonym für die Klassen-Rangliste (siehe 6)</li>
        </ul>
        <p>
          Nicht gespeichert werden: Klarnamen (sofern du sie nicht selbst in deine E-Mail-Adresse oder dein
          Google-Konto schreibst), Standortdaten, Geräte-Kennungen zu Werbezwecken.
        </p>

        <h2>6. Klassen, Lehrkräfte und Rangliste</h2>
        <ul>
          <li>
            Schüler/innen treten einer Klasse selbst mit einem Klassen-Code bei und können sie jederzeit wieder
            verlassen. Lehrkräfte können Mitglieder aus ihrer Klasse entfernen.
          </li>
          <li>
            <strong>Lehrkräfte sehen die E-Mail-Adressen der Mitglieder ihrer Klasse</strong> und die
            Klassen-Rangliste.
          </li>
          <li>
            In der Rangliste sehen Mitschüler/innen <strong>nur Pseudonyme</strong>, die täglich wechseln. Die
            Zuordnung zwischen Pseudonym und Konto wird in der Datenbank gespeichert; die Daten sind daher{' '}
            <strong>pseudonymisiert, nicht anonym</strong>.
          </li>
          <li>
            Lehrkräfte erhalten ihre Rolle über einen Einladungscode, den wir auf Anfrage an
            Schul-E-Mail-Adressen vergeben.
          </li>
        </ul>

        <h2>7. Cookies und lokale Speicherung</h2>
        <p>
          Wir setzen keine Werbe- oder Analyse-Cookies. Für die Anmeldung speichert die App im Browser
          technisch notwendige Sitzungsdaten (Supabase). Diese sind erforderlich, um dich angemeldet zu halten
          (§ 25 Abs. 2 Nr. 2 TDDDG). Ein Cookie-Banner ist deshalb nicht erforderlich.
        </p>

        <h2>8. Dokumentationsseite und Newsletter</h2>
        <p>
          Die Dokumentationsseite docs.schlau.app wird über Cloudflare Pages (Cloudflare, Inc., USA)
          ausgeliefert; dabei werden technisch notwendige Verbindungsdaten wie die IP-Adresse verarbeitet.
        </p>
        <p>
          Für den optionalen Newsletter nutzen wir MailerLite (MailerLite Limited, Irland/Litauen). Wir senden
          den Newsletter nur nach deiner ausdrücklichen Anmeldung im Double-Opt-in-Verfahren (Art. 6 Abs. 1
          lit. a DSGVO). Du kannst dich jederzeit über den Link in jeder E-Mail abmelden.
        </p>

        <h2>9. Rechtsgrundlagen</h2>
        <ul>
          <li>Bereitstellung der App und des Kontos: Art. 6 Abs. 1 lit. b DSGVO (Nutzungsverhältnis)</li>
          <li>Sicherheit und Betrieb (Logfiles): Art. 6 Abs. 1 lit. f DSGVO</li>
          <li>Google-Anmeldung und Newsletter: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</li>
        </ul>

        <h2>10. Nutzung durch Schülerinnen und Schüler</h2>
        <p>
          schlau.app richtet sich an Schüler/innen der Klassen 7–10, häufig unter Anleitung einer Lehrkraft.
          Für Kinder und Jugendliche unter 16 Jahren ist für die Verarbeitung auf Grundlage einer Einwilligung
          die Zustimmung der Erziehungsberechtigten erforderlich (Art. 8 DSGVO).
        </p>

        <h2>11. Speicherdauer und Löschung</h2>
        <p>
          Wir speichern deine Daten, solange dein Konto besteht. Auf Wunsch per E-Mail löschen wir dein Konto
          und die dazugehörigen Daten.
        </p>

        <h2>12. Datenübermittlung in Drittländer</h2>
        <p>
          Einige Dienstleister (Vercel, Resend, Cloudflare, Supabase Inc., Google) haben ihren Sitz in den USA.
          Soweit Daten dorthin übermittelt werden, geschieht dies auf Grundlage der von den Anbietern
          bereitgestellten Garantien (Standardvertragsklauseln oder Zertifizierung unter dem EU-US Data Privacy
          Framework).
        </p>

        <h2>13. Deine Rechte</h2>
        <p>
          Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
          Datenübertragbarkeit und Widerspruch. Erteilte Einwilligungen kannst du jederzeit mit Wirkung für die
          Zukunft widerrufen. Schreibe dazu an die oben genannte E-Mail-Adresse.
        </p>
        <p>
          Du kannst dich bei der zuständigen Aufsichtsbehörde beschweren: Berliner Beauftragte für Datenschutz
          und Informationsfreiheit, Alt-Moabit 59–61, 10555 Berlin, mail@datenschutz-berlin.de.
        </p>
      </div>
    </div>
  );
}
