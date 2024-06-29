/**
 * Dieser Code definiert eine React-Komponente namens `CreateHeader`, die für die Erstellung eines neuen Boards
 * in einer Anwendung zuständig ist. Die Komponente nutzt mehrere Hooks von React, wie `useState` und `useEffect`,
 * um den Zustand zu verwalten und Nebeneffekte zu handhaben. Sie interagiert auch mit dem Browser-Cookie, um
 * eine Benutzersitzung zu verifizieren, und sendet Daten an einen Server über eine POST-Anfrage, um ein neues
 * Board zu erstellen. Bei Erfolg wird der Benutzer zur Startseite umgeleitet.
 */

// Importieren der notwendigen Abhängigkeiten und Komponenten.
import { FormEvent, useEffect, useState } from "react";
import Header from "../components/Header";
import router, { useRouter } from "next/router";
import { Cookies } from "@/types/cookie";
import cookie from "cookie";

/**
 * Die `CreateHeader`-Komponente, die das Formular zum Erstellen eines neuen Boards rendert.
 * Sie verwendet den `useState`-Hook, um den Zustand der Cookies zu verwalten, und den `useEffect`-Hook,
 * um die Cookies beim Laden der Komponente zu überprüfen und zu setzen.
 */
const CreateHeader = () => {
  // Verwenden des `useState`-Hooks, um den Zustand der Cookies zu verwalten.
  const [cookies, setCookies] = useState<Cookies | null>(null);

  // Der `useEffect`-Hook wird verwendet, um die Cookies beim Laden der Komponente zu überprüfen.
  useEffect(() => {
    // Parsen der Cookies aus `document.cookie`.
    const cookies = cookie.parse(document.cookie);

    // Überprüfen, ob das Cookie `session` existiert. Wenn nicht, wird die Funktion frühzeitig beendet.
    if (!cookies.session) {
      return;
    }

    // Setzen des Cookie-Zustands, wenn das `session`-Cookie vorhanden ist.
    setCookies({ session: JSON.parse(cookies.session) });
  }, []);

  /**
   * Die `handleSubmit`-Funktion wird aufgerufen, wenn das Formular abgesendet wird.
   * Sie verhindert die Standardformularaktion, extrahiert die Daten aus dem Formular und sendet diese
   * Daten in einem POST-Request an den Server. Bei Erfolg wird der Benutzer zur Startseite umgeleitet,
   * andernfalls wird eine Fehlermeldung angezeigt.
   *
   * @param {FormEvent} e - Das Event-Objekt, das vom Formular-Submit-Event übergeben wird.
   */
  const handleSubmit = async (e: FormEvent) => {
    // Verhindern der Standardformularaktion.
    e.preventDefault();

    // Extrahieren der Formulardaten.
    // @ts-ignore
    const name = (e.target as HTMLFormElement).name.value;
    const slug = (e.target as HTMLFormElement).slug.value;
    const description = (e.target as HTMLFormElement).description.value;

    // Senden einer POST-Anfrage an den Server mit den extrahierten Daten.
    const response = await fetch("http://localhost:3002/api/board", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.session.token}`,
      },
      body: JSON.stringify({
        name,
        slug,
        description,
      }),
    });

    // Überprüfen des Antwortstatus. Bei Erfolg wird der Benutzer umgeleitet, sonst wird eine Fehlermeldung angezeigt.
    if (response.ok) {
      router.push("/");
    } else {
      alert("An error occurred. Please try again.");
    }
  };

  // Rendern des Formulars zum Erstellen eines neuen Boards.
  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Create Board</h1>
        <form onSubmit={handleSubmit} className="mt-4">
          {/* Formularfelder für Name, Slug und Beschreibung des Boards. */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              id="slug"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          {/* Absendebutton für das Formular. */}
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Create Board
          </button>
        </form>
      </div>
    </>
  );
};

// Exportieren der `CreateHeader`-Komponente, damit sie in anderen Teilen der Anwendung verwendet werden kann.
export default CreateHeader;
