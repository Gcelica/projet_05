//recuperation du numero de commande dans l'URL

let searchParams = new URLSearchParams(window.location.search);

if (searchParams.has("id")) {
  var orderId = searchParams.get("id");
  console.log(orderId);
} else {
  window.location.pathname = "confirmation.html";
}

//affichage du numero de commande sur la page
function confirmation() {
  const idConfirmation = document.getElementById("orderId");
  idConfirmation.textContent = orderId;
  console.log(idConfirmation);
  localStorage.clear();
}
confirmation();
