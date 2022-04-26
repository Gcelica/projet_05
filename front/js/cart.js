/*localStorage.setItem(key, value); //enregistre une valeur dans le storage
localStorage.getItem(key); //recupere la valeur de la clé
localStorage.clear(); //efface le storage

bouton.onclick = () => {
  localStorage.setItem(key, value);
};*/

let arrayOfProducts = JSON.parse(localStorage.getItem("produit"));
console.table(arrayOfProducts);

// creation <article>
const cartItems = document.getElementById("cart_items");
const baliseArticle = document.createElement("article");
baliseArticle.classList.add("cart__item");
baliseArticle.setAttribute("data-id", arrayOfProducts.idProduit);
baliseArticle.setAttribute("data-color", arrayOfProducts.productColor);

//creation <div>
const cartItemImg = document.createElement("div");
cartItemImg.classList.add("cart__item__img");

//creation <img>
const imageKanap = document.createElement("img");
imageKanap.src = arrayOfProducts.imgProduct;
imageKanap.alt = document.createTextNode("Photographie d'un canapé");
console.log(imageKanap);
