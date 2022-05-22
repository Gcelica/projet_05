//array
var product = [];

//requete fetch vers Api 
fetch("http://localhost:3000/api/products")
  .then((response) => response.json()) //renvoi promesse en .json
  .then((canapes) => {
    product = canapes;
    console.log(product);
    for (let article of product) {
      console.log();

      //creation <a>
      const productLink = document.createElement("a");
      productLink.href = "./product.html?id=" + article._id;
      console.log(productLink);
      const productContainer = document.getElementById("items");
      productContainer.appendChild(productLink);

      // creation <article>
      const baliseArticle = document.createElement("article");
      productContainer.appendChild(baliseArticle);
      productLink.appendChild(baliseArticle);

      //creation <img>
      const imageKanap = document.createElement("img");
      imageKanap.src = article.imageUrl;
      imageKanap.alt = article.altTxt;
      baliseArticle.appendChild(imageKanap);

      //creation <h3>
      const nameKanap = document.createElement("h3");
      nameKanap.classList.add("productName");
      nameKanap.textContent = article.name;
      baliseArticle.appendChild(nameKanap);

      //creation <p>
      const descriptionKanap = document.createElement("p");
      descriptionKanap.classList.add("productDescription");
      descriptionKanap.textContent = article.description;
      baliseArticle.appendChild(descriptionKanap);
    }
  });