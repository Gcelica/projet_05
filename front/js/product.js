let searchParams = new URLSearchParams(window.location.search);

if (searchParams.has("id")) {
  var productId = searchParams.get("id");
  console.log(productId);
} else {
  window.location.pathname = "product.html";
}

fetch("http://localhost:3000/api/products/" + productId)
  .then((response) => response.json()) //renvoi promesse en .json
  .then((canapes) => {
    product = canapes;
    console.log(product);
  });
