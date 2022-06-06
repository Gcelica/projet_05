//requete pour recuperer infos des produits selon l'id
function getInfoByApi(id) {
  return fetch("http://localhost:3000/api/products/" + id)
    .then((response) => response.json()) //renvoi promesse en .json
    .then((canapes) => {
      return canapes;
    });
}
//selection du panier dans le local storage
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
    quantityKanapDetails.setAttribute(
      "value",
      arrayOfProducts[i].quantityProduct
    );
    cartItemContentSettingsQuantity.append(quantityKanapDetails);

    //creation <div>
    const cartItemContentSettingsDelete = document.createElement("div");
    cartItemContentSettingsDelete.classList.add(
      "cart__item__content__settings__delete"
    );
    cartItemContentSettings.append(cartItemContentSettingsDelete);

    // creation <p> lien pour supprimer article du panier
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

      //filtre de l'element à supprimer
      arrayOfProducts = arrayOfProducts.filter(
        (elt) =>
          elt.idProduct !== deleteIdProduct ||
          elt.colorProduct !== deleteColorProduct
      );
      console.log(arrayOfProducts);
      localStorage.setItem("produit", JSON.stringify(arrayOfProducts));

      location.reload();
    });
  }

  //quantité total des articles dans le panier
  function totalProduct() {
    var itemQuantity = document.getElementsByClassName("itemQuantity");
    var quantityCart = itemQuantity.length,
      totalProduct = 0;

    for (var i = 0; i < quantityCart; ++i) {
      totalProduct += itemQuantity[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById("totalQuantity");
    productTotalQuantity.textContent = totalProduct;
  }
  totalProduct();

  //montant total du panier
  function cartPrice() {
    var itemQuantity = document.getElementsByClassName("itemQuantity");
    var quantityCart = itemQuantity.length,
      totalPrice = 0;
    for (var i = 0; i < quantityCart; ++i) {
      totalPrice += itemQuantity[i].valueAsNumber * infoKanap.price;
    }

    let totalPriceProduct = document.getElementById("totalPrice");
    totalPriceProduct.textContent = totalPrice;
  }
  cartPrice();

  //modification des quantités dans le panier
  function cartQuantityModif() {
    let cartModif = document.getElementsByClassName("itemQuantity");

    for (let i = 0; i < cartModif.length; i++) {
      cartModif[i].addEventListener("change", (event) => {
        let quantityModif = arrayOfProducts[i].quantityProduct;
        console.log(quantityModif);

        let qtyModifValue = cartModif[i].valueAsNumber;
        console.log(qtyModifValue);
        console.log(arrayOfProducts[i]);

        arrayOfProducts[i].quantityProduct = qtyModifValue;

        console.log(arrayOfProducts[i]);

        localStorage.setItem("produit", JSON.stringify(arrayOfProducts));

        // refresh de la page panier
        location.reload();
      });
    }
  }
  cartQuantityModif();
}
showItemCart();

//Formulaire
let cartOrderForm = document.querySelector(".cart__order__form");
console.log(cartOrderForm);
cartOrderForm.addEventListener("submit", function (evt) {
  console.log("coucou");
  evt.preventDefault();
  var okToSend = true;
  //champs prenom
  let firstName = document.getElementById("firstName");

  //caracteres autorisés pour remplir les champs du formulaire
  let nameRegex = /^[a-zA-Z-\s]+$/;
  let addressRegex = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;
  let emailRegex = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

  if (!nameRegex.test(firstName.value)) {
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    firstNameErrorMsg.textContent = "Veuillez entrer votre prénom";
    okToSend = false;
  }

  //champs nom de famille
  let lastName = document.getElementById("lastName");

  if (!nameRegex.test(lastName.value)) {
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    lastNameErrorMsg.textContent = "Veuillez entrer votre nom de famille";
    okToSend = false;
  }

  //champs adresse postal
  let address = document.getElementById("address");

  if (!addressRegex.test(address.value)) {
    let addressErrorMsg = document.getElementById("addressErrorMsg");
    addressErrorMsg.textContent = "Veuillez entrer une adresse postal";
    okToSend = false;
  }
  // champs ville
  let city = document.getElementById("city");

  if (!nameRegex.test(city.value)) {
    let cityErrorMsg = document.getElementById("cityErrorMsg");
    cityErrorMsg.textContent = "Veuillez entrer le nom d'une ville";
    okToSend = false;
  }

  // champs Email
  let email = document.getElementById("email");

  if (!emailRegex.test(email.value)) {
    let emailErrorMsg = document.getElementById("emailErrorMsg");
    emailErrorMsg.textContent = "Veuillez entrer une adresse email valide";
    okToSend = false;
  }
  if (okToSend) {
    sendForm();
  }
});

function sendForm() {
  var arrayOfProducts = JSON.parse(localStorage.getItem("produit"));
  console.log(arrayOfProducts);
  const order = document.getElementById("order");
  order.addEventListener("click", (evt) => {
    evt.preventDefault();

    // creation d'un objet "contact" avec les infos du formulaire
    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };

    //tableau recapitulatif du panier
    let products = [];
    for (let i = 0; i < arrayOfProducts.length; i++) {
      products.push(arrayOfProducts[i].idProduct);
    }
    console.log(products);

    //objet formulaire et panier
    const sendFormCart = {
      contact,
      products,
    };
    console.log(sendFormCart);

    //envoi du formulaire et du panier au serveur
    const data = {
      method: "POST",
      body: JSON.stringify(sendFormCart),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(data);

    fetch("http://localhost:3000/api/products/order", data)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.orderId);
        document.location.href = "confirmation.html?id=" + data.orderId;
      });
  });
}
