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
    /* const itemContent = document.getElementsByClassName(
        "item_content_description"
      );*/
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

//Fonctionnement bouton panier

/*const selectQuantity = document.getElementById("quantity");
let quantityChoice = selectQuantity.value;

const selectColors = document.getElementById("colors");
let colorsChoices = selectColors.value;
console.log(colorsChoices);*/

 
//evenement "click" du bouton panier
const addToCart = () => {
  let btnAddToCart = document.getElementById("addToCart");
  btnAddToCart.addEventListener("click", () => {
    
    if (quantity.value > 0 && quantity.value <=100 && colors.value != 0){
      
      //option de l'article
      var productOptions = {
        altImgProduct: product.altTxt,
        idProduit: productId,
        imgProduct: product.imageUrl,
        priceProduct: product.price,
        productColor: product.colors,
        productDescription: product.description,
        productName: product.name,
        productQuantity: product.quantity,
       
    };

    
    //local storage
    let arrayOfProducts = JSON.parse(localStorage.getItem("produit"));

    //si il y un article dans le panier
    if (arrayOfProducts){
      const findResult = arrayOfProducts.find(
        function (elt) {
          return elt.idProduct === productId && elt.productColor === product.colors;
        });

        //si le produit est dans le panier
        if (findResult) {
          let newQuantity = parseInt(productOptions.productQuantity) + parseInt(findResult.productQuantity);
          findResult.productQuantity = newQuantity;
          localStorage.setItem("produit",JSON.stringify (arrayOfProducts));
          console.log("arrayOfProduct egal :");
                    console.log(arrayOfProducts);
                    console.log("fin arrayOfProduct");

        // le produit n'est pas dans le panier
        }else {
          arrayOfProducts.push(productOptions);
          localStorage.setItem("produit", JSON.stringify(arrayOfProducts));
          console.log(arrayOfProducts);  
      }

      //  le panier est vide
    } else {
      arrayOfProducts =[];
      arrayOfProducts.push(productOptions);
      localStorage.setItem("produit", JSON.stringify(arrayOfProducts));
      console.log(arrayOfProducts);

    }}
  });
}

/*var selectQuantityNumber = parseInt(selectQuantity.value);
arrayOfProducts = [selectColors.value,selectQuantityNumber,productId];
   
if (); {
       
    console.log(arrayOfProducts);
    localStorage.setItem("savedData", JSON.stringify(arrayOfProducts));
    }
   
  });
  return arrayOfProducts =JSON.parse(localStorage.getItem("saveData"));*/


/*//fenêtre pop-up
const alerteConfirmation =() =>{
  if(window.confirm(`Votre commande de ${choixQuantite} ${article.name} ${choixCouleur} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)){
      window.location.href ="cart.html";
  }
}*/

/*//test test
const addToCart = () => {
  let btnAdd = document.getElementById("addToCart");
};
//test test
bouton.onclick = () => {
  localStorage.setItem(key, value);
};*/
/*var contentSelect = document.getElementById("colors");
      var options = [product.colors];
      options.forEach(function (colors,colors_select) {
        select = new Option(colors, product.colors);

        contentSelect.append(select);
      });*/
