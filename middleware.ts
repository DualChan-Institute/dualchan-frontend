import type { NextRequest, NextResponse } from "next/server";

/**
 * Eine Liste von Pfaden, die nur für authentifizierte Benutzer zugänglich sind.
 * Diese Routen erfordern, dass der Benutzer eingeloggt ist, um Zugriff zu erhalten.
 * Zum Beispiel: "/create-board" ist eine geschützte Route, die eine Authentifizierung erfordert.
 */
const protectedRoutes = ["/create-board"];

/**
 * Middleware-Funktion, die für jede Seite aufgerufen wird, um Authentifizierungschecks durchzuführen.
 * Diese Funktion überprüft, ob der Benutzer authentifiziert ist, und leitet ihn entsprechend um.
 *
 * @param request Das NextRequest-Objekt, das Informationen über die eingehende Anfrage enthält.
 * @returns Eine NextResponse, die entweder den Zugriff gewährt oder den Benutzer umleitet.
 */
export function middleware(request: NextRequest) {
  // Versucht, den aktuellen Benutzer aus den Cookies zu extrahieren.
  const currentUser = request.cookies.get("session")?.value;

  // Wenn ein Benutzer eingeloggt ist und versucht, die Authentifizierungsseite zu besuchen,
  // wird er zur Startseite umgeleitet, um eine Schleife der Umleitung zu vermeiden.
  if (currentUser && request.nextUrl.pathname.startsWith("/authenticate")) {
    return Response.redirect(new URL("/", request.url));
  }

  // Wenn kein Benutzer eingeloggt ist und versucht, auf eine geschützte Route zuzugreifen,
  // wird er zur Authentifizierungsseite umgeleitet.
  if (!currentUser && protectedRoutes.includes(request.nextUrl.pathname)) {
    return Response.redirect(new URL("/authenticate", request.url));
  }
}

/**
 * Konfiguration der Middleware, die bestimmt, auf welche Pfade die Middleware angewendet wird.
 * Die Matcher-Option schließt bestimmte Pfade aus der Middleware-Prüfung aus, wie z.B. API-Routen,
 * statische Dateien und Bilder, um die Leistung zu optimieren und unnötige Authentifizierungsprüfungen zu vermeiden.
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
