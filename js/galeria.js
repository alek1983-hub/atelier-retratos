
// tomamos los elementos
const principal = document.getElementById("principal");
const miniaturas = document.querySelectorAll(".mini");
  
miniaturas.forEach(img => {
  
     img.addEventListener("click", () => {
  
     // Cambiar imagen principal
     principal.src = img.src;
     principal.alt = img.alt;
  
     // Quitar clase activa de todas
      miniaturas.forEach(i => i.classList.remove("activa"));
  
       // Añadir clase a la seleccionada
      img.classList.add("activa");
  
  });
   
});
  
