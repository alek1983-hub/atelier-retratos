fetch("./data/noticias.json")
  .then(res => res.json())
  .then(data => {

    const contenedor = document.getElementById("contenedorNoticias");

    data.forEach(noticia => {

      // Crear tarjeta
      const card = document.createElement("div");
      card.classList.add("cardNoticia");

      // Crear imagen
      const img = document.createElement("img");
      img.src = noticia.imagen;
      img.alt = noticia.titulo;

      // Contenido
      const contenido = document.createElement("div");
      contenido.classList.add("contenidoCard");

      // Título
      const titulo = document.createElement("h3");
      titulo.textContent = noticia.titulo;

      // Texto
      const texto = document.createElement("p");
      texto.textContent = noticia.texto;

      // Fecha
      const fecha = document.createElement("span");
      fecha.classList.add("fecha");
      fecha.textContent = noticia.fecha;

      // Insertar elementos
      contenido.appendChild(titulo);
      contenido.appendChild(texto);
      contenido.appendChild(fecha);

      card.appendChild(img);
      card.appendChild(contenido);

      contenedor.appendChild(card);

    });

  })
  .catch(error => console.log(error));