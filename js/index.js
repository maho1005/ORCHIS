const endpoint = "https://dummyjson.com/products/category/fragrances?limit=0";

const produktliste = document.querySelector("#popularProducts");

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

  const populaereProdukter = json.products.slice(0, 3);

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
