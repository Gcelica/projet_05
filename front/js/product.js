let searchParams = new URLSearchParams(window.location.search);

if (searchParams.has("id")) {
  var productId = searchParams.get("id");
  console.log(productId);
} else {
  window.location.pathname = "product.html";
}
var product = [];

fetch("http://localhost:3000/api/products/" + productId)
  .then((response) => response.json()) //renvoi promesse en .json
  .then((canapes) => {
    product = canapes;
    console.log(product);

    for (var item of Object.entries(product)) {
      console.log();

      const imgContainer = document.getElementsByClassName("item__img");
      const imageKanap = document.createElement("img");
      imageKanap.src = product.imageUrl;
      imageKanap.alt = document.createTextNode("Photographie d'un canapé");
      imgContainer[0].appendChild(imageKanap);

      const titlePrice = document.getElementsByClassName(
        "item__content__titlePrice"
      );
      const title = document.getElementById("title");
      title.textContent = product.name;
      titlePrice[0].prepend(title);

      const displayPrice = document.getElementsByName("p");
      const price = document.getElementById("price");
      price.textContent = product.price;
      displayPrice[0].appendChild(price);
    }
  });

/*var map = new Map(Object.entries(product));
    console.log(map);*/

/*for (let article of product) {
      console.log();

      const productContainer = document.getElementsByTagName("article");
      const imageKanap = document.createElement("img");
      imageKanap.src = product.imageUrl;
      imageKanap.alt = document.createTextNode("Photographie d'un canapé");
      productContainer.appendChild(imageKanap);

      const title = document.getElementsById("title");
      const productTitle = document.createTextNode + product.name;
    }

    /*const productTitle = document.createTextNode + article.name,
      title = document.getElementsById("title");
   title.appendChild(productTitle);*/
