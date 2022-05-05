//selection du panier dans le local storage
var arrayOfProducts = JSON.parse(localStorage.getItem("produit"));
console.table(arrayOfProducts);

/*async function getInfoByApi(id) {
  await fetch("http://localhost:3000/api/products")
  .then((response) => response.json()) //renvoi promesse en .json
  .then((canapes) =>{
    product = canapes;
    console.log(product);
  })};*/

  for (let i=0; i < arrayOfProducts.length; i++){
// creation <article>
const cartItems = document.getElementById("cart_items");
const baliseArticle = document.createElement("article");
baliseArticle.classList.add("cart__item");
baliseArticle.setAttribute("data-id",arrayOfProducts[i].idProduct);
baliseArticle.setAttribute("data-color",arrayOfProducts[i].colorProduct);


//creation <div>
const cartItemImg = document.createElement("div");
cartItemImg.classList.add("cart__item__img");
baliseArticle.appendChild(cartItemImg);

//creation <img>
const imageKanap = document.createElement("img");
//imageKanap.src = imageUrl; A faire !!
imageKanap.alt = document.createTextNode("Photographie d'un canapé");

//creation <div> container 
const cartItemContent = document.createElement ("div");
cartItemContent.classList.add("cart__item__content");
baliseArticle.appendChild(cartItemContent);

//creation <div> description produit
const cartItemContentDescription = document.createElement ("div");
  cartItemContentDescription.classList.add("cart__item__content__description");

//creation <h2>
const nameKanap = document.createElement("h2");
//nameKanap.textContent = name; A faire !!
cartItemContentDescription.appendChild(nameKanap);

//creation <p> 
const colorKanap = document.createElement("p")
colorKanap.textContent = arrayOfProducts[i].colorProduct;
cartItemContentDescription.append(colorKanap);

//creation <p>
const priceKanap = document.createElement("p");
//priceKanap.textContent = price; A faire !!
cartItemContentDescription.append(priceKanap);

//creation <div>
const cartItemContentSettings = document.createElement("div");
cartItemContentSettings.classList.add("cart__item__content__settings");
cartItemContent.appendChild(cartItemContentSettings);

//creation <div>
const cartItemContentSettingsQuantity = document.createElement("div")
cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

//creation <p>
const quantityKanap = document.createElement("p")
quantityKanap.textContent = arrayOfProducts[i].quantityProduct + "€";
cartItemContentSettingsQuantity.appendChild(quantityKanap);

//creation <input>
const quantityKanapDetails = document.createElement("input");
quantityKanapDetails.setAttribute("type", "number");
quantityKanapDetails.classList.add("itemQuantity");
quantityKanapDetails.setAttribute("name", "itemQuantity");
quantityKanapDetails.setAttribute("min", "1");
quantityKanapDetails.setAttribute("max", "100");
cartItemContentSettingsQuantity.append(quantityKanapDetails);

//creation <div>
const cartItemContentSettingsDelete = document.createElement("div");
cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
cartItemContentSettings.append(cartItemContentSettingsDelete);

const btnDeleteItem = document.createElement("p");
    btnDeleteItem.classList.add("deleteItem");
btnDeleteItem.textContent = "supprimer";
cartItemContentSettings.append(btnDeleteItem);

  };

//ecouter evenement bouton supprimer
//btnDeleteItem.addEventListener("click",() =>{})







/*localStorage.setItem(key, value); //enregistre une valeur dans le storage
localStorage.getItem(key); //recupere la valeur de la clé
localStorage.clear(); //efface le storage

bouton.onclick = () => {
  localStorage.setItem(key, value);
};*/