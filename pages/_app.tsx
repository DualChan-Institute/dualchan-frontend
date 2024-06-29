/**
 * Dieser Code definiert die Hauptkomponente der Next.js-Anwendung, die als Einstiegspunkt für alle Seiten dient.
 * Die Datei _app.tsx ist eine spezielle Datei in Next.js, die es ermöglicht, globale Einstellungen wie globale Styles,
 * Layout-Komponenten und Zustandsmanagement-Bibliotheken für die gesamte Anwendung zu konfigurieren.
 * Diese Datei wird für jede Seite der Anwendung einmal aufgerufen, wodurch sie ideal ist, um Code zu platzieren,
 * der auf allen Seiten ausgeführt werden soll.
 */

// Importieren der globalen Styles.
// Der Import von "@/styles/globals" bezieht sich auf einen Alias-Pfad, der in der Next.js-Konfiguration
// definiert wurde. Dies ermöglicht es, Pfade einfacher zu verwalten und verbessert die Lesbarkeit.
// Die globalen Styles werden einmal importiert und gelten für die gesamte Anwendung.
import "@/styles/globals.css";

// Importieren des Typs `AppProps` aus "next/app".
// `AppProps` ist ein Typ, der von Next.js bereitgestellt wird und die erwarteten Eigenschaften für die
// App-Komponente definiert. Dies umfasst `Component`, die aktuelle Seite, und `pageProps`, die von
// `getInitialProps`, `getStaticProps` oder `getServerSideProps` auf der Seite zurückgegebenen Props.
import type { AppProps } from "next/app";

/**
 * Die Hauptkomponente der Anwendung.
 * Diese Funktion nimmt die aktuelle Seite und deren Props als Argumente entgegen und rendert die Seite.
 * @param {AppProps} { Component, pageProps } - `Component` ist die aktuelle Seite, die gerendert wird,
 * und `pageProps` sind die Props, die für diese Seite spezifisch sind.
 * @returns Die gerenderte Seite zusammen mit den globalen Styles und jeglichen globalen Layout-Komponenten,
 * die in dieser Funktion hinzugefügt werden könnten.
 */
export default function App({ Component, pageProps }: AppProps) {
  // Die Komponente für die aktuelle Seite wird mit ihren spezifischen Props gerendert.
  // Dies ermöglicht es, jede Seite mit individuellen Daten zu rendern, die über serverseitiges Rendering,
  // statisches Rendering oder beim Client-Seiten-Rendering abgerufen werden können.
  return <Component {...pageProps} />;
}
