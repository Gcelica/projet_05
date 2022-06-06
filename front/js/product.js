let searchParams = new URLSearchParams(window.location.search);

if (searchParams.has("id")) {
  var productId = searchParams.get("id");
  console.log(productId);
} else {
  window.location.pathname = "product.html";
}

//array
var product = [];

fetch("http://localhost:3000/api/products/" + productId)
  .then((response) => response.json()) //renvoi promesse en .json
  .then((canapes) => {
    product = canapes;
    console.log(product);

    //creation <img>
    const imgContainer = document.getElementsByClassName("item__img");
    const imageKanap = document.createElement("img");
    imageKanap.src = product.imageUrl;
    imageKanap.alt = document.createTextNode("Photographie d'un canapé");
    imgContainer[0].appendChild(imageKanap);

    //creation <h3>nom du produit</h3>
    const titlePrice = document.getElementsByClassName(
      "item__content__titlePrice"
    );
    const title = document.getElementById("title");
    title.textContent = product.name;
    titlePrice[0].prepend(title);

    //creation <span>price<span>
    const price = document.getElementById("price");
    price.textContent = product.price;

    //creation <description>
    const description = document.getElementById("description");
    description.textContent = product.description;

    //creation <option>colors
    const contentSelect = document.getElementById("colors");
    for (let i = 0; i < product.colors.length; i++) {
      let color = document.createElement("option");
      color.setAttribute("value", product.colors[i]);
      color.textContent = product.colors[i];
      contentSelect.appendChild(color);
    }
    addToCart(product);
  });

const colorSelect = document.getElementById("colors");
const quantitySelect = document.getElementById("quantity");

//gestion du panier
function addToCart() {
  const btnAddToCart = document.getElementById("addToCart");

  //ecoute de l'evenement "click" bouton ajout panier
  btnAddToCart.addEventListener("click", () => {
    if (
      quantitySelect.value > 0 &&
      quantitySelect.value <= 150 &&
      colorSelect.value != 0
    ) {
      //local storage
      let arrayOfProducts = JSON.parse(localStorage.getItem("produit"));
      console.log(arrayOfProducts);

      let selectColor = colorSelect.value;
      let selectQuantity = quantitySelect.value;

      //option des articles du panier
      let productOptions = {
        idProduct: productId,
        colorProduct: selectColor,
        quantityProduct: Number(selectQuantity),
      };

      //verification du panier
      if (arrayOfProducts) {
        const findResult = arrayOfProducts.find(
          (choice) =>
            choice.idProduct === productId &&
            choice.colorProduct === selectColor
        );

        //ajout meme produit
        if (findResult) {
          let newQuantity =
            parseInt(productOptions.quantityProduct) +
            parseInt(findResult.quantityProduct);
          findResult.quantityProduct = newQuantity;

          localStorage.setItem("produit", JSON.stringify(arrayOfProducts));
          console.log(arrayOfProducts);

          // ajout nouveau produit
        } else {
          arrayOfProducts.push(productOptions);
          localStorage.setItem("produit", JSON.stringify(arrayOfProducts));
          console.log(arrayOfProducts);
        }
        //panier vide
      } else {
        arrayOfProducts = [];
        arrayOfProducts.push(productOptions);
        localStorage.setItem("produit", JSON.stringify(arrayOfProducts));
        console.log(arrayOfProducts);
      }
      alert("Et hop ! Dans le panier !");
    }
  });
}
