const endpoint = "https://dummyjson.com/products/category/fragrances?limit=0";

const produktliste = document.querySelector("#popularProducts");

// Henter produkter (parfumer) fra dummyJSON
fetch(endpoint)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Parfumerne kunne ikke hentes.");
    }

    return res.json();
  })
  .then(visData)
  .catch(() => {
    produktliste.textContent = "Parfumerne kunne ikke hentes. Prøv at genindlæse siden.";
  });

function visData(json) {
  console.log(json);

  produktliste.innerHTML = "";

  // Vælger de 3 første parfumer fra listen
  const populaereProdukter = json.products.slice(0, 3);

  // Viser parfumerne på hjemmesiden. Bruger innerHTML til at skrive indholdet i produktkortene, og bruger det data der er hentet tidligere.

  populaereProdukter.forEach((element) => {
    produktliste.innerHTML += `
      <article class="product-card">
        <a href="productdetails.html?id=${element.id}">
          <img
            src="${element.thumbnail}"
            alt="${element.title}"
            loading="lazy"
          />

          <p class="brand">${element.brand || ""}</p>

          <h3>${element.title}</h3>

          <p class="price">
            ${Number(element.price).toLocaleString("da-DK", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </a>
      </article>
    `;
  });
}
