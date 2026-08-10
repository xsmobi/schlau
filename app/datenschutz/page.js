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

        <h2>1. Verantwortlicher</h2>
        <p>
          Dr. Eckard Ritter<br />
          Urbanstr. 93<br />
          10967 Berlin<br />
          E-Mail: eckard.ritter@googlemail.com<br />
          Telefon/WhatsApp: +49 173 1618248
        </p>

        <h2>2. Allgemeines zur Datenverarbeitung</h2>
        <p>
          Wir verarbeiten personenbezogene Daten der Nutzer von schlau.app grundsätzlich nur, soweit dies zur
          Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist.
          Die Verarbeitung personenbezogener Daten erfolgt regelmäßig nur nach Einwilligung des Nutzers bzw.
          im Rahmen der Nutzung der Anwendung durch registrierte Nutzer (Art. 6 Abs. 1 lit. b DSGVO).
        </p>

        <h2>3. Welche Daten wir verarbeiten</h2>
        <p>Bei der Nutzung von schlau.app verarbeiten wir folgende Daten:</p>
        <ul>
          <li>E-Mail-Adresse (zur Anmeldung und Authentifizierung, per Anmeldecode per E-Mail oder optional per Google-Anmeldung)</li>
          <li>Klassenzugehörigkeit (welcher Klasse ein Nutzer beigetreten ist)</li>
          <li>Fortschrittsdaten innerhalb der App (bearbeitete Aufgaben, erreichte Punktestände/Abzeichen)</li>
          <li>Ein rotierendes, anonymes Pseudonym zur Anzeige auf klasseninternen Bestenlisten (kein Klarname)</li>
        </ul>
        <p>
          Es werden keine weiteren Daten (z. B. keine IP-Adress-Protokollierung zu Analysezwecken, keine
          Werbe-Cookies, keine Tracking-Tools Dritter) erhoben.
        </p>

        <h2>4. Zweck der Datenverarbeitung</h2>
        <p>
          Die genannten Daten werden ausschließlich zur Bereitstellung der Kernfunktionen der App verwendet:
          Anmeldung, Zuordnung zu einer Klasse durch die Lehrkraft, Speicherung des individuellen
          Lernfortschritts sowie Anzeige anonymisierter, klasseninterner Bestenlisten zur Motivation.
        </p>

        <h2>5. Hosting und Auftragsverarbeitung</h2>
        <p>
          Die Daten werden über den Dienst Supabase gespeichert und verarbeitet, dessen Infrastruktur bei AWS
          in der Region eu-west-1 (Irland, EU) gehostet wird. Es findet somit keine Datenübermittlung
          außerhalb der Europäischen Union statt. Mit Supabase besteht ein Vertrag zur Auftragsverarbeitung
          gemäß Art. 28 DSGVO (Data Processing Addendum), der automatisch Bestandteil der Nutzungsbedingungen
          von Supabase ist.
        </p>

        <h2>6. Speicherdauer</h2>
        <p>
          Daten werden gespeichert, solange ein Nutzerkonto besteht bzw. solange dies zur Erfüllung der oben
          genannten Zwecke erforderlich ist. Beim Verlassen einer Klasse werden Fortschrittsdaten nicht
          gelöscht, um bei erneutem Beitritt weiterhin zur Verfügung zu stehen. Auf Wunsch kann ein Nutzer
          bzw. dessen Erziehungsberechtigte/r die vollständige Löschung des Kontos beim Verantwortlichen
          beantragen.
        </p>

        <h2>7. Minderjährige Nutzer</h2>
        <p>
          schlau.app wird im schulischen Kontext von Schülerinnen und Schülern genutzt, auch von
          Minderjährigen. Die Nutzung erfolgt im Rahmen des regulären Unterrichts unter Aufsicht und
          Verantwortung der jeweiligen Lehrkraft bzw. Schule.
        </p>

        <h2>8. Rechte der betroffenen Person</h2>
        <p>
          Nutzer bzw. deren Erziehungsberechtigte haben jederzeit das Recht auf Auskunft über die zu ihrer
          Person gespeicherten Daten, deren Berichtigung, Löschung sowie Einschränkung der Verarbeitung, ein
          Widerspruchsrecht gegen die Verarbeitung sowie das Recht auf Datenübertragbarkeit. Zur Ausübung
          dieser Rechte genügt eine formlose Mitteilung an den oben genannten Verantwortlichen. Zudem besteht
          ein Beschwerderecht bei der zuständigen Datenschutzaufsichtsbehörde.
        </p>

        <h2>9. Kontakt für Datenschutzanliegen</h2>
        <p>Bei Fragen zum Datenschutz wenden Sie sich bitte an: eckard.ritter@googlemail.com</p>
      </div>
    </div>
  );
}
