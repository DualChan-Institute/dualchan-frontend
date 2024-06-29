/**
 * Dieses Modul implementiert die Hauptseite der Anwendung, die eine Liste von Boards anzeigt.
 * Es verwendet Next.js-Funktionen wie `getServerSideProps` für serverseitiges Rendering und
 * React Hooks für den Zustandsmanagement. Die Seite ermöglicht es Benutzern, vorhandene Boards
 * zu sehen, neue Boards zu erstellen und bestehende Boards zu löschen, abhängig von den
 * Berechtigungen, die durch Cookies gesteuert werden.
 */

// Importieren notwendiger Bibliotheken und Komponenten
import { useEffect, useState } from "react"; // React Hooks für Zustandsmanagement und Nebeneffekte
import { GetServerSideProps } from "next"; // Typdefinition für serverseitiges Rendering in Next.js
import Link from "next/link"; // Komponente für clientseitige Navigation
import { Board } from "../types/board"; // Typdefinition für Board-Objekte
import Header from "./components/Header"; // Wiederverwendbare Header-Komponente
import { Cookies } from "@/types/cookie"; // Typdefinition für Cookie-Objekte
import cookie from "cookie"; // Bibliothek zum Parsen von Cookies

/**
 * `getServerSideProps` ist eine spezielle Funktion in Next.js, die serverseitiges Rendering ermöglicht.
 * Sie wird vor dem Rendern der Seite auf dem Server aufgerufen und kann asynchrone Operationen ausführen,
 * wie z.B. das Abrufen von Daten von einer API. Die zurückgegebenen Props werden dann der Seite als
 * Eingabeparameter übergeben.
 */
export const getServerSideProps: GetServerSideProps = async () => {
  // Abrufen der Boards von der API
  const res = await fetch("http://localhost:3002/api/boards");
  const boards: Board[] = await res.json();

  // Rückgabe der Boards als Props für die Seite
  return {
    props: {
      boards,
    },
  };
};

/**
 * Die Hauptkomponente der Seite, die die Liste der Boards anzeigt und Interaktionen ermöglicht.
 * @param initialBoards - Die anfängliche Liste der Boards, die vom Server geladen wurde.
 */
export default function Home({ boards: initialBoards }: { boards: Board[] }) {
  // Zustandsvariablen für die Boards und Cookies
  const [boards, setBoards] = useState<Board[]>(initialBoards);
  const [cookies, setCookies] = useState<Cookies | null>(null);

  // Effekt zum Parsen der Cookies beim ersten Laden der Seite
  useEffect(() => {
    const cookies = cookie.parse(document.cookie);

    if (!cookies.session) {
      return;
    }

    setCookies({ session: JSON.parse(cookies.session) });
  }, []);

  /**
   * Funktion zum Hinzufügen eines neuen Boards.
   * Aktualisiert den Zustand, um das neue Board in der Liste anzuzeigen.
   * In einer realen Anwendung würde hier eine API-Anfrage zum Erstellen eines neuen Boards erfolgen.
   */
  const handleAddBoard = () => {
    const newBoard: Board = {
      id: new Date().toISOString(), // Platzhalter-ID, sollte durch eine echte ID ersetzt werden
      name: "New Board",
      description: "New Board Description",
      slug: "new-board",
    };
    setBoards([...boards, newBoard]);
  };

  /**
   * Funktion zum Löschen eines Boards.
   * Sendet eine DELETE-Anfrage an die Server-API und aktualisiert den Zustand, um das Board zu entfernen.
   * @param id - Die ID des zu löschenden Boards.
   */
  const handleDeleteBoard = async (id: string) => {
    console.log("Deleting board with ID: ", id);

    // Senden der DELETE-Anfrage zum Server
    const response = await fetch(`http://localhost:3002/api/board/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookies?.session.token}`,
      },
    });

    // Aktualisieren des Zustands, wenn das Löschen erfolgreich war
    if (response.ok) {
      setBoards(boards.filter((board) => board.id !== id));
    } else {
      alert("An error occurred. Please try again.");
    }
  };

  // Rendern der Seite
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Boards</h1>
          {cookies?.session.token && (
            <div>
              <Link href="/create-board" legacyBehavior>
                <a className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  Create Board
                </a>
              </Link>
            </div>
          )}
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {boards.map((board) => (
            <li
              key={board.id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <Link href={`/board/${board.slug}`} passHref legacyBehavior>
                  <a className="flex-grow">
                    <h2 className="text-xl font-bold">{board.name}</h2>
                    <p className="text-gray-600">{board.description}</p>
                    <p className="text-gray-400">{board.slug}</p>
                  </a>
                </Link>
                {cookies?.session.token && (
                  <button
                    onClick={() => handleDeleteBoard(board.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
                    title={`Delete "${board.name}" board`}
                  >
                    -
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
