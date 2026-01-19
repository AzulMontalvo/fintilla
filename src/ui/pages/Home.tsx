// import React from "react";

export default function Home() {
  return (
    <>
      <article className="hero">
        <header>
          <h1>Crea plantillas para ahorrar y formar hábitos</h1>
          <p>Define un objetivo, establece un plazo y da seguimiento a tu progreso de forma clara y constante.</p>
          <button className="flat-button">Comienza ahora</button>
        </header>
        {/* <section>
          <button className="navbar-button">Explorar plantillas predefinidas</button>
          <button className="navbar-button">O crea tu propia plantilla</button>
        </section> */}
      </article>

      <section className="card">
        <h2>Alcanza tus metas este año</h2>
        <p>Este año no se queda en intención.
Visualizar tu avance día a día aumenta la constancia y te acerca, paso a paso, a la meta que te propusiste cumplir.</p>
      </section>

       <section className="card">
        <h2>¿Por qué usar una plantilla para ahorrar?</h2>
        <p>El cerebro responde mejor a sistemas claros que a la fuerza de voluntad.
Diversos estudios sobre hábitos muestran que registrar el progreso y reducir la fricción mental mejora la adherencia y la probabilidad de éxito. Una plantilla convierte tu meta en un proceso tangible y medible.</p>
      </section>

      <section className="column-card">
        <section className="card">
          <h2>Plantillas predefinidas</h2>
          <p>Explora nuestras plantillas diseñadas para diferentes objetivos de ahorro, desde vacaciones hasta emergencias.</p>
        </section>
        <section className="card">
          <h2>Crear tu propia plantilla</h2>
          <p>Personaliza tu plan de ahorro según tus necesidades y preferencias, estableciendo metas y plazos que se adapten a ti.</p>
        </section>
      </section>

      <section className="column-card">
        <h2>Explicación de los métodos de ahorro</h2>
      </section>
    </>
  );
}
