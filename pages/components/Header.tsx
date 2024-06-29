/**
 * Der Header.tsx ist eine React-Komponente, die den oberen Teil der Webseite darstellt. Diese Komponente ist verantwortlich
 * für die Anzeige des Logos der Webseite (DualChan) und der Authentifizierungsoptionen für den Benutzer. Abhängig vom
 * Authentifizierungsstatus des Benutzers (ob ein Benutzer eingeloggt ist oder nicht), zeigt der Header entweder einen
 * Logout-Button zusammen mit dem Benutzernamen oder einen Login-Button an. Die Komponente nutzt React Hooks, um den
 * Zustand zu verwalten, und interagiert mit Browser-Cookies, um den Authentifizierungsstatus des Benutzers zu überprüfen.
 */

// Importieren der notwendigen Abhängigkeiten und Typdefinitionen.
import { useEffect, useState } from "react";
import cookie from "cookie";
import { Cookies } from "@/types/cookie";
import Link from "next/link";

/**
 * Die Header-Komponente, die den oberen Teil der Webseite darstellt.
 * Sie verwendet den useState-Hook, um den Zustand der Cookies zu verwalten, und den useEffect-Hook,
 * um die Cookies beim Laden der Komponente zu überprüfen und zu setzen.
 */
const Header = () => {
  // Verwenden des useState-Hooks, um den Zustand der Cookies zu verwalten.
  const [cookies, setCookies] = useState<Cookies | null>(null);

  // Der useEffect-Hook wird verwendet, um die Cookies beim Laden der Komponente zu überprüfen.
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
   * Rendern des Headers, der das Logo der Webseite und die Authentifizierungsoptionen enthält.
   * Wenn ein Benutzer eingeloggt ist (überprüft durch das Vorhandensein eines Tokens im `session`-Cookie),
   * wird der Benutzername und ein Logout-Button angezeigt. Andernfalls wird ein Login-Button angezeigt.
   */
  return (
    <div className="flex justify-between items-center p-4">
      {/* Link zum Home-Verzeichnis mit dem Namen der Webseite. */}
      <Link href="/" className="text-3xl font-bold" legacyBehavior>
        DualChan
      </Link>
      {/* Überprüfen, ob ein Benutzer eingeloggt ist, und entsprechende Optionen anzeigen. */}
      {cookies?.session.token ? (
        <div>
          {/* Anzeigen des Benutzernamens und eines Logout-Buttons, wenn ein Benutzer eingeloggt ist. */}
          <span className="mr-4">{cookies.session.decodedToken.username}</span>
          <button
            onClick={() => {
              // Löschen des `session`-Cookies und Weiterleitung zur Startseite beim Klick auf Logout.
              document.cookie = cookie.serialize("session", "", {
                maxAge: -1, // Setzt das Ablaufdatum des Cookies in der Vergangenheit, um es zu löschen.
              });
              window.location.href = "/";
            }}
            className="border rounded px-2 py-1"
          >
            Logout
          </button>
        </div>
      ) : (
        // Anzeigen eines Login-Buttons, wenn kein Benutzer eingeloggt ist.
        <Link
          href="/authenticate"
          className="border rounded px-2 py-1"
          legacyBehavior
        >
          Login
        </Link>
      )}
    </div>
  );
};

// Exportieren der Header-Komponente, damit sie in anderen Teilen der Anwendung verwendet werden kann.
export default Header;
