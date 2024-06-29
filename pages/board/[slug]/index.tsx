/**
 * Dies ist die Hauptkomponente für die Anzeige eines spezifischen Boards basierend auf seinem Slug.
 * Sie verwendet Next.js Router für die Navigation und Zustandsverwaltung für das Laden und Anzeigen der Board-Daten.
 * Die Komponente prüft zunächst, ob ein gültiger Slug vorhanden ist, und ruft dann Daten von einer API ab.
 * Wenn keine Daten gefunden werden, leitet sie den Benutzer zur Startseite um.
 * Bei erfolgreicher Datenabfrage wird das Board mit seinem Namen, seiner Beschreibung und einer Liste von Kommentaren angezeigt.
 */

// Importiert notwendige Abhängigkeiten und Typdefinitionen
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { Board } from "@/types/board";
import Header from "../../components/Header";
import CommentList from "@/pages/components/CommentList";

// Die Hauptfunktionskomponente für die Board-Ansicht
export default function Board() {
  // Initialisiert den Router von Next.js für die Navigation
  const router = useRouter();
  // Zustandsvariable für das Board, initialisiert mit null
  const [board, setBoard] = useState<Board | null>(null);

  // useEffect-Hook, der beim Laden der Komponente und bei Änderungen der Router-Query ausgeführt wird
  useEffect(() => {
    // Extrahiert den Slug aus der Router-Query
    const slug = router.query.slug;
    // Überprüft, ob der Slug ein String ist, und bricht ab, wenn dies nicht der Fall ist
    if (typeof slug !== "string") {
      return;
    }
    // Ruft die API auf, um Daten basierend auf dem Slug zu erhalten
    fetch(`http://localhost:3002/api/boards?slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        // Überprüft, ob Daten vorhanden sind, und leitet andernfalls zur Startseite um
        if (data.length === 0) {
          router.push("/");
        }
        // Setzt das Board auf das erste Element der Antwortdaten
        setBoard(data[0]);
      });
  }, [router, router.query.slug]); // Abhängigkeiten für den useEffect-Hook

  // Zeigt einen Ladebildschirm an, während das Board null ist
  if (!board) {
    return <div>Loading...</div>;
  }

  // Die Hauptrendermethode der Komponente
  return (
    <>
      <Header /> {/* Einbinden der Header-Komponente */}
      <div className="container mx-auto p-4">
        {" "}
        {/* Container für die Board-Ansicht */}
        <div className="flex justify-between items-center">
          {" "}
          {/* Kopfbereich mit Titel und Zurück-Button */}
          <h1 className="text-3xl font-bold">
            {board.name} {/* Anzeige des Board-Namens */}
            <i className="text-sm text-gray-500">/: {board.slug} :/</i>{" "}
            {/* Anzeige des Board-Slugs */}
          </h1>
          <button
            onClick={() => router.push("/")}
            className="border rounded px-2 py-1"
          >
            Back {/* Zurück-Button */}
          </button>
        </div>
        <p className="text-gray-500">{board.description}</p>{" "}
        {/* Anzeige der Board-Beschreibung */}
        <CommentList /> {/* Einbinden der Kommentarliste */}
      </div>
    </>
  );
}
