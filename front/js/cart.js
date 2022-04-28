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
baliseArticle.setAttribute("data-id", arrayOfProducts[0].idProduit);
baliseArticle.setAttribute("data-color", arrayOfProducts[0].productColor);
console.log(baliseArticle);
//creation <div>
const cartItemImg = document.createElement("div");
cartItemImg.classList.add("cart__item__img");

//creation <img>
const imageKanap = document.createElement("img");
imageKanap.src = arrayOfProducts[0].imgProduct;
imageKanap.alt = document.createTextNode("Photographie d'un canapé");


//creation div
const cartItemContent = document.createElement("div");
cartItemContent.classList.add("cart__item__content")

const cartItemContentDescription = document.createElement ("div");
cartItemContentDescription.classList.add("cart__item__content__description");

//creation <h2>
 const nameKanap = document.createElement("h2");
 nameKanap.textContent = arrayOfProducts[0].name;
 


