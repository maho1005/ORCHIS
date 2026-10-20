const endpoint = "https://dummyjson.com/products/category/fragrances?limit=0";

const produktliste = document.querySelector("#produktliste");
const maerkeFilter = document.querySelector("#brandFilter");
const sortering = document.querySelector("#sortering");
const statusTekst = document.querySelector("#status");

let produkter = [];

fetch(endpoint)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Produkterne kunne ikke hentes.");
    }

    return res.json();
  })
  .then((json) => {
    console.log(json);

    produkter = json.products;

    // Opretter en valgmulighed for hvert mærke.
    const maerker = [];

    produkter.forEach((element) => {
      const maerke = element.brand;

      if (maerke && !maerker.includes(maerke)) {
        maerker.push(maerke);
      }
    });

    maerker.sort((a, b) => a.localeCompare(b, "da"));

    maerker.forEach((maerke) => {
      maerkeFilter.add(new Option(maerke, maerke));
    });

    opdaterListe();
  })
  .catch(() => {
    statusTekst.textContent = "Parfumerne kunne ikke hentes. Prøv at genindlæse siden.";
  });

maerkeFilter.addEventListener("change", opdaterListe);
sortering.addEventListener("change", opdaterListe);

function opdaterListe() {
  let udsnit = [...produkter];

  // Filtrér efter det valgte mærke.
  if (maerkeFilter.value !== "") {
    udsnit = udsnit.filter((element) => element.brand === maerkeFilter.value);
  }

  // Sortér efter pris eller navn.
  if (sortering.value === "pris-op") {
    udsnit.sort((a, b) => a.price - b.price);
  } else if (sortering.value === "pris-ned") {
    udsnit.sort((a, b) => b.price - a.price);
  } else if (sortering.value === "navn-op") {
    udsnit.sort((a, b) => a.title.localeCompare(b.title, "da"));
  } else if (sortering.value === "navn-ned") {
    udsnit.sort((a, b) => b.title.localeCompare(a.title, "da"));
  }

  visData(udsnit);
}

function visData(json) {
  produktliste.innerHTML = "";

  statusTekst.textContent = json.length === 1 ? "1 parfume" : `${json.length} parfumer`;

  if (json.length === 0) {
    statusTekst.textContent = "Ingen parfumer matcher dit valg.";
  }

  json.forEach((element) => {
    const udsolgt = Number(element.stock) <= 0;

    produktliste.innerHTML += `
      <article class="product-card ${udsolgt ? "udsolgt" : ""}">
        <a href="productdetails.html?id=${element.id}">
          <div class="product-photo">
            <img
              src="${element.thumbnail}"
              alt="${element.title}"
              loading="lazy"
            />

            ${udsolgt ? '<span class="sold-label">Udsolgt</span>' : ""}
          </div>

          <p class="brand">${element.brand || ""}</p>
          <h2>${element.title}</h2>

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
