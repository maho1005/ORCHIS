const kurvContainer = document.querySelector("#kurvContainer");
const totalPris = document.querySelector("#totalPris");
const basketStatus = document.querySelector("#basketStatus");

let kurv = [];

try {
  const gemtKurv = JSON.parse(localStorage.getItem("kurv") || "[]");

  if (Array.isArray(gemtKurv)) {
    kurv = gemtKurv.filter((element) => element && element.source === "dummyjson" && Number.isFinite(element.price));
  }
} catch {
  basketStatus.textContent = "Kurven kunne ikke læses.";
}

function visData() {
  kurvContainer.innerHTML = "";

  let total = 0;

  if (kurv.length === 0) {
    kurvContainer.innerHTML = `
      <p class="cart-empty">
        Din kurv er tom. Gå til Shop, og vælg en parfume.
      </p>
    `;
  }

  kurv.forEach((element, index) => {
    total += element.price;

    kurvContainer.innerHTML += `
      <article class="cart-item">
        <a
          href="productdetails.html?id=${element.id}"
          class="cart-image"
        >
          <img
            src="${element.thumbnail}"
            alt="${element.title}"
          />
        </a>

        <div class="cart-copy">
          <p class="cart-brand">${element.brand}</p>

          <h2>
            <a href="productdetails.html?id=${element.id}">
              ${element.title}
            </a>
          </h2>

          <button
            type="button"
            class="cart-remove"
            data-index="${index}"
          >
            Fjern fra kurv
          </button>
        </div>

        <p class="cart-price">
          ${element.price.toLocaleString("da-DK", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </article>
    `;
  });

  totalPris.textContent = total.toLocaleString("da-DK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  document.querySelectorAll(".cart-remove").forEach((button) => {
    button.addEventListener("click", fjernProdukt);
  });
}

function fjernProdukt(e) {
  const index = Number(e.currentTarget.dataset.index);

  const nyKurv = [...kurv];

  nyKurv.splice(index, 1);

  try {
    localStorage.setItem("kurv", JSON.stringify(nyKurv));

    kurv = nyKurv;

    visData();

    basketStatus.textContent = "Parfumen er fjernet fra kurven.";
  } catch {
    basketStatus.textContent = "Ændringen kunne ikke gemmes. Prøv igen.";
  }
}

visData();
