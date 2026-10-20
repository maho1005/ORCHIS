const id = new URLSearchParams(window.location.search).get("id");

const endpoint = `https://dummyjson.com/products/${encodeURIComponent(id)}`;

const product = document.querySelector("#product");

if (id && /^\d+$/.test(id)) {
  fetch(endpoint)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Parfumen kunne ikke hentes.");
      }

      return res.json();
    })
    .then(visData)
    .catch(() => {
      product.innerHTML = `
        <p>Parfumen kunne ikke hentes.</p>

        <a href="productlist.html" class="text-link">
          Tilbage til parfumer
        </a>
      `;
    });
} else {
  product.innerHTML = `
    <p>Vælg en parfume fra produktlisten.</p>

    <a href="productlist.html" class="text-link">
      Se parfumer
    </a>
  `;
}

function visData(element) {
  console.log(element);

  if (element.category !== "fragrances") {
    throw new Error("Produktet er ikke en parfume.");
  }

  const udsolgt = Number(element.stock) <= 0;

  const billede = element.images?.[0] || element.thumbnail;

  const pris = Number(element.price).toLocaleString("da-DK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  document.title = `${element.title} | ORCHIS`;

  product.innerHTML = `
    <div class="perfume-layout">
      <div class="perfume-image">
        <img
          id="perfumeImage"
          src="${billede}"
          alt=""
        />
      </div>

      <div class="perfume-copy">
        <p id="perfumeBrand" class="perfume-brand"></p>

        <h1 id="perfumeTitle"></h1>

        <p class="perfume-price">${pris}</p>

        <button
          id="addToBasket"
          class="button perfume-button"
          type="button"
          ${udsolgt ? "disabled" : ""}
        >
          ${udsolgt ? "Udsolgt" : "Læg i kurv"}
        </button>

        <p
          id="basketStatus"
          class="perfume-status"
          role="status"
        ></p>

        <div class="perfume-information">
          <details>
            <summary>Om produktet</summary>
            <p id="perfumeDescription"></p>
          </details>

          <details>
            <summary>Anmeldelser</summary>
            <div id="reviews"></div>
          </details>
        </div>
      </div>
    </div>
  `;

  // Indsætter produktets tekst i de rigtige elementer.
  document.querySelector("#perfumeBrand").textContent = element.brand || "";

  document.querySelector("#perfumeTitle").textContent = element.title;

  document.querySelector("#perfumeDescription").textContent = element.description;

  document.querySelector("#perfumeImage").alt = element.title;

  // Viser anmeldelser fra API'et.
  const anmeldelser = document.querySelector("#reviews");

  if (Array.isArray(element.reviews) && element.reviews.length > 0) {
    element.reviews.forEach((anmeldelse) => {
      const artikel = document.createElement("article");
      artikel.className = "perfume-review";

      const navn = document.createElement("p");
      navn.className = "review-name";
      navn.textContent = anmeldelse.reviewerName;

      const bedommelse = document.createElement("p");
      bedommelse.textContent = `${anmeldelse.rating} af 5 stjerner`;

      const kommentar = document.createElement("p");
      kommentar.textContent = anmeldelse.comment;

      artikel.append(navn, bedommelse, kommentar);
      anmeldelser.append(artikel);
    });
  } else {
    anmeldelser.textContent = "Der er endnu ingen anmeldelser.";
  }

  // Lægger parfumen i kurven.
  document.querySelector("#addToBasket").addEventListener("click", () => {
    if (udsolgt) {
      return;
    }

    const statusTekst = document.querySelector("#basketStatus");

    try {
      const gemtKurv = JSON.parse(localStorage.getItem("kurv") || "[]");

      const kurv = Array.isArray(gemtKurv) ? gemtKurv : [];

      const antalIKurv = kurv.filter((vare) => vare.source === "dummyjson" && vare.id === element.id).length;

      if (antalIKurv >= Number(element.stock)) {
        statusTekst.textContent = "Du har allerede lagt det tilgængelige antal i kurven.";
        return;
      }

      kurv.push({
        source: "dummyjson",
        id: element.id,
        title: element.title,
        brand: element.brand || "",
        price: Number(element.price),
        thumbnail: element.thumbnail,
      });

      localStorage.setItem("kurv", JSON.stringify(kurv));

      statusTekst.textContent = "Parfumen er lagt i kurven.";
    } catch {
      statusTekst.textContent = "Kurven kunne ikke gemmes. Prøv igen.";
    }
  });
}
