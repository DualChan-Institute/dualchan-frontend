/**
 * Dieses Dokument definiert die Struktur des HTML-Dokuments, das von der Next.js-Anwendung gerendert wird.
 * Es ist ein spezielles Next.js-Dokument, das es ermöglicht, die Struktur des HTML-Dokuments zu
 * personalisieren, das an den Client gesendet wird. Dies ist nützlich für das Hinzufügen von globalen
 * Attributen, Schriftarten, Meta-Tags oder anderen Ressourcen, die auf allen Seiten der Anwendung
 * vorhanden sein sollen. Die Verwendung dieses speziellen Dokuments ist für fortgeschrittene Anpassungen
 * gedacht und sollte mit Vorsicht verwendet werden, da Änderungen hier die gesamte Anwendung betreffen.
 */

// Importieren der notwendigen Komponenten aus next/document
// Diese speziellen Next.js-Komponenten sind nur für die _document.tsx-Datei bestimmt.
import { Html, Head, Main, NextScript } from "next/document";
// Importieren einer Header-Komponente, die in diesem Beispiel nicht verwendet wird,
// aber demonstriert, wie man eigene Komponenten einbinden könnte.
import Header from "./components/Header";

/**
 * Die Hauptkomponente `Document` definiert die Struktur des HTML-Dokuments.
 * Diese Komponente wird serverseitig gerendert und sollte nicht für clientseitige
 * Interaktivität verwendet werden. Sie dient ausschließlich dazu, die Struktur des
 * HTML-Dokuments zu definieren, das an den Browser gesendet wird.
 */
export default function Document() {
  return (
    // Das <Html>-Element erlaubt es, globale Attribute für das gesamte Dokument festzulegen,
    // wie z.B. das `lang`-Attribut, das die primäre Sprache des Dokuments angibt.
    <Html lang="en">
      {/* Das <Head>-Element wird verwendet, um Meta-Tags, Schriftarten, Stylesheets und andere
          Ressourcen im <head>-Bereich des Dokuments zu platzieren. */}
      <Head />
      {/* Der <body>-Bereich des Dokuments, in dem der Hauptinhalt der Seite gerendert wird. */}
      <body>
        {/* Die <Main />-Komponente ist ein Platzhalter, der durch den Inhalt der jeweiligen Seite ersetzt wird,
            die gerade gerendert wird. Es ist der Hauptteil der Anwendung. */}
        <Main />
        {/* Die <NextScript />-Komponente fügt die notwendigen Skripte für die Next.js-Anwendung ein.
            Dies umfasst Skripte für die Navigation, das Laden von Seiten und andere Funktionen der Next.js-Framework. */}
        <NextScript />
      </body>
    </Html>
  );
}
