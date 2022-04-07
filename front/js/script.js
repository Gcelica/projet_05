function lesKanaps(index) {
  // variable zone des articles
  let positionArticle = document.querySelector("#items");

  // boucle pour chaque 'article' a afficher dans index
  for (let article of index) {
    positionArticle.innerHTML += `<a href=./product.html?_id=${article._id}" >
    <article>
      <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">'${article.descritption}'</p>
    </article>
  </a>`;
  }
}

fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((canapes) => {
    console.table(canapes);
    //  fonction d'affichage des produits
    lesKanaps(canapes);
  })

  //si il y a une erreur afficher une erreur 404 dans la zone des articles
  .catch((e) => {});
