//selection du panier dans le local storage

function getInfoByApi(id) {
  return fetch("http://localhost:3000/api/products/" + id)
    .then((response) => response.json()) //renvoi promesse en .json
    .then((canapes) => {
      return canapes;
    });
}

async function showItemCart() {
  var arrayOfProducts = JSON.parse(localStorage.getItem("produit"));

  for (let i = 0; i < arrayOfProducts.length; i++) {
    var infoKanap = await getInfoByApi(arrayOfProducts[i].idProduct);
    console.log(infoKanap);

    // creation <article>
    const cartItems = document.getElementById("cart__items");
    const baliseArticle = document.createElement("article");
    baliseArticle.classList.add("cart__item");
    baliseArticle.setAttribute("data-id", arrayOfProducts[i].idProduct);
    baliseArticle.setAttribute("data-color", arrayOfProducts[i].colorProduct);

    //creation <div>
    const cartItemImg = document.createElement("div");
    cartItemImg.classList.add("cart__item__img");
    baliseArticle.appendChild(cartItemImg);

    //creation <img>
    const imageKanap = document.createElement("img");
    imageKanap.src = infoKanap.imageUrl;
    imageKanap.alt = infoKanap.altTxt;
    cartItemImg.appendChild(imageKanap);

    //creation <div> container
    const cartItemContent = document.createElement("div");
    cartItemContent.classList.add("cart__item__content");
    baliseArticle.appendChild(cartItemContent);

    //creation <div> description produit
    const cartItemContentDescription = document.createElement("div");
    cartItemContentDescription.classList.add(
      "cart__item__content__description"
    );
    cartItemContent.appendChild(cartItemContentDescription);

    //creation <h2> nom du produit
    const nameKanap = document.createElement("h2");
    nameKanap.textContent = infoKanap.name;
    cartItemContentDescription.appendChild(nameKanap);

    //creation <p> couleur du produit
    const colorKanap = document.createElement("p");
    colorKanap.textContent = arrayOfProducts[i].colorProduct;
    cartItemContentDescription.append(colorKanap);

    //creation <p> prix du produit
    const priceKanap = document.createElement("p");
    priceKanap.textContent = infoKanap.price + " €";
    cartItemContentDescription.append(priceKanap);

    //creation <div>
    const cartItemContentSettings = document.createElement("div");
    cartItemContentSettings.classList.add("cart__item__content__settings");
    cartItemContent.appendChild(cartItemContentSettings);

    //creation <div>
    const cartItemContentSettingsQuantity = document.createElement("div");
    cartItemContentSettingsQuantity.classList.add(
      "cart__item__content__settings__quantity"
    );
    cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

    //creation <p> quantité produit
    const quantityKanap = document.createElement("p");
    quantityKanap.textContent = "Qté:";
    cartItemContentSettingsQuantity.appendChild(quantityKanap);

    //creation <input>
    const quantityKanapDetails = document.createElement("input");
    quantityKanapDetails.setAttribute("type", "number");
    quantityKanapDetails.classList.add("itemQuantity");
    quantityKanapDetails.setAttribute("name", "itemQuantity");
    quantityKanapDetails.setAttribute("min", "1");
    quantityKanapDetails.setAttribute("max", "100");
    quantityKanapDetails.setAttribute("value",arrayOfProducts[i].quantityProduct);
    cartItemContentSettingsQuantity.append(quantityKanapDetails);

    //creation <div>
    const cartItemContentSettingsDelete = document.createElement("div");
    cartItemContentSettingsDelete.classList.add(
      "cart__item__content__settings__delete"
    );
    cartItemContentSettings.append(cartItemContentSettingsDelete);


// creation <p> lien pour supprimer article
    const btnDeleteItem = document.createElement("p");
    btnDeleteItem.classList.add("deleteItem");
    btnDeleteItem.textContent = "supprimer";
    cartItemContentSettings.append(btnDeleteItem);
    cartItems.appendChild(baliseArticle);

    // evenement "click" suppression article
    btnDeleteItem.addEventListener("click", (del) => {
      del.preventDefault;

      let deleteIdProduct = arrayOfProducts[i].idProduct;
      let deleteColorProduct = arrayOfProducts[i].colorProduct;

      arrayOfProducts = arrayOfProducts.filter(elt => elt.idProduct !== deleteIdProduct || elt.colorProduct !== deleteColorProduct);
      localStorage.setItem("panier", JSON.stringify(arrayOfProducts));

      location.reload();
    })

  }

  //quantité total des articles dans le panier
  function totalProduct(){
    
    var itemQuantity = document.getElementsByClassName('itemQuantity');
    var quantityCart = itemQuantity.length,
    totalProduct = 0;
 
    for (var i = 0; i < quantityCart; ++i) {
        totalProduct += itemQuantity[i].valueAsNumber;
    }
    
    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.textContent = totalProduct;
 
 }
 totalProduct();

 //montant total du panier
function cartPrice() {
  
  var itemQuantity = document.getElementsByClassName('itemQuantity');
  var quantityCart = itemQuantity.length,
  totalPrice = 0;
  for (var i = 0; i < quantityCart; ++i) {
      totalPrice += (itemQuantity[i].valueAsNumber * arrayOfProducts[i].priceKanap);
  }
  
  let totalPriceProduct = document.getElementById('totalPrice');
  totalPriceProduct.textContent = totalPrice;
  
  };
  cartPrice();

 //modification des quantités dans le panier
 function cartQuantityModif() {
  let cartModif = document.querySelectorAll(".itemQuantity");

  for (let i = 0; i < cartModif.length; i++){
      cartModif[i].addEventListener("change" , (event) => {
          event.preventDefault();

          
          let quantityModif = arrayOfProducts[i].quantityProduct;
          let qtyModifValue = cartModif[i].valueAsNumber;
          
          const findResult = arrayOfProducts.find((elt) => elt.qtyModifValue !== quantityModif);

          findResult.quantityProduct = qtyModifValue;
          arrayOfProducts[i].quantityProduct = findResult.quantityProduct;

          localStorage.setItem("produit", JSON.stringify(arrayOfProducts));
      
          // refresh de la page panier
          location.reload();
      })
  }
}
cartQuantityModif();

}
showItemCart();



  





//ecouter evenement bouton supprimer
//btnDeleteItem.addEventListener("click",() =>{})
//creer fonction pour modifier quantité
//creer fonction pour le total


