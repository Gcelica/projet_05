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

  const colorSelect = document.getElementById("colors");
  const quantitySelect = document.getElementById("quantity");

  //Panier
  function addToCart(){
  const btnAddToCart = document.getElementById("addToCart");
  
  //ecoute de l'evenement "click"
  btnAddToCart.addEventListener("click", () => {
    if (quantitySelect.value > 0 && quantitySelect.value <=100 && colorSelect.value != 0){

    let arrayOfProducts = JSON.parse(localStorage.getItem("produit"));
    console.log(arrayOfProducts);

    let selectColor = colorSelect.value;
    let selectQuantity = quantitySelect.value;
    
    let productOptions = {
      idProduct : productId,
      colorProduct : selectColor,
      quantityProduct : Number(selectQuantity)
    };
    
    //verification du panier
    if (arrayOfProducts) {
      const findResult = arrayOfProducts.find(
          (choice) => choice.idProduct === productId && choice.colorProduct === selectColor);
          
         //ajout meme produit 
          if (findResult) {
              let newQuantity =
              parseInt(productOptions.quantityProduct) + parseInt(findResult.quantityProduct);
              findResult.quantityProduct = newQuantity;

              localStorage.setItem("produit", JSON.stringify(arrayOfProducts));
              console.log(arrayOfProducts);
              
          

          } else {
              arrayOfProducts.push(productOptions);
              localStorage.setItem("produit", JSON.stringify(arrayOfProducts));
              console.log(arrayOfProducts);
              
          }
      //panier vide
      } else {
          arrayOfProducts =[];
          arrayOfProducts.push(productOptions);
          localStorage.setItem("produit", JSON.stringify(arrayOfProducts));
          console.log(arrayOfProducts);
          
      }
    
    }}   
  )};

  
    
 
/*if( arrayOfProducts == null) {
      arrayOfProducts = [];
      arrayOfProducts.push()
      localStorage.setItem("produit",JSON.stringify(arrayOfProducts));*/
      

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
