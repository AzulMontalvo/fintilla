export default function Footer() {
  return (
    <>
      <p>
        © {new Date().getFullYear()} Fintilla. Todos los derechos reservados.
      </p>
      <nav className="footer-nav">
        <a href="/about">Acerca</a>
        <a href="/terms">Términos</a>
        <a href="/privacy">Privacidad</a>
      </nav>
    </>
  );
}
