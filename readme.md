# Teknisk dokumentation – ORCHIS

## Om projektet

Dette projekt er lavet som en del af Tema 8.
Vi har lavet et dynamisk website med HTML, CSS og JavaScript, hvor indholdet bliver hentet fra et Rest API (dummyJSON).
Vores casevirksomhed kaldes ORCHIS og er en parfume webshop.

Sitet består af flere sider, hvor brugeren kan:

- Se udvalgte parfumer på forsiden
- Se en liste over parfumer fra API'et.
- bruge filtrering efter mærke
- sortere efter pris
- se detaljeside om individuelle produkter
- tilføje til kurv og se varer i kurv

## Links

- GitHub repository: https://github.com/maho1005/ORCHIS
- GitHub Pages: https://maho1005.github.io/ORCHIS/
- Figma dokumentation: https://www.figma.com/board/PA85XGeqCogQ1qNrgGLU06/T8?node-id=0-1&t=9MB1QsZpyZZ2QHUj-1
- Figma Wireframe og Prototype: https://www.figma.com/design/3VEzaDltRaiYAQjbRCqbeI/ORCHIS?node-id=0-1&t=xRN8geiyHh55WbOH-1
- Trello: https://trello.com/invite/b/6ac387745fda169bcbd75d41/ATTIa37e1a91dfbcf82f7b4e8c5c337766360CEB60EB/t8-beauty

---

## Projektstruktur

Projektet er opdelt i HTML, CSS og JavaScript-filer.

```
ORCHIS/
├── index.html
├── productlist.html
├── productdetails.html
├── basket.html
├── css/
│   └── index.css
│   └── productlist.css
│   └── productdetails.css
│   └── basket.css
├── js/
│   ├── index.js
│   ├── productlist.js
│   ├── productdetails.js
│   └── basket.js
└── images
└── README.md
```

### Filbeskrivelser

- **index.html** – forsiden med hero-sektion og udvalgte produkter.
- **productlist.html** – produktoversigt med filtrering og sortering.
- **productdetails.html** – viser oplysninger om den valgte parfume og knappen til at lægge den i kurven.
- **basket.html** – viser indkøbskurven og den samlede pris.
- **css-filer** – indeholder design og styling til siderne.
- **JavaScript-filer** – styrer det dynamiske indhold på de forskellige sider og indeholder JavaScript til API-kald,

---

## Hvordan koden fungerer

Vi har opdelt JavaScript, så hver side har sin egen fil. Produktdata hentes med `fetch()`, omdannes fra JSON med `res.json()` og bruges derefter til at vise indhold dynamisk på siden.

### index.js

Bruges på forsiden, `index.html`.
Forsiden henter parfumer fra DummyJSONs kategori fragrances.

Efter at data er hentet, bruger vi `json.products.slice(0, 3)` til at udvælge tre produkter. Produkterne bliver derefter gennemgået med `forEach()` og indsat i elementet #popularProducts som produktkort. Hvert kort har et link til den tilhørende detaljeside.

### productlist.js

Denne fil henter alle parfumer i kategorien og viser dem som en produktliste. Vi gemmer produkterne i variablen produkter, så filtrering og sortering kan foregå i browseren uden at hente data igen ved hvert valg.

**Flow:**

1. Siden indlæses, og JavaScript starter.
2. `fetch()` henter parfumernes data fra DummyJSON.
3. De tilgængelige mærker findes og tilføjes til mærkefilteret.
4. Funktionen `opdaterListe()` anvender den valgte filtrering og sortering.
5. Funktionen `visData()` opretter produktkort.
6. Brugeren kan klikke på et produkt/kort og gå til detaljesiden.

Vi anvender `filter()` til at vælge produkter fra et bestemt mærke og `sort()` til at sortere efter pris eller navn i stigende eller faldende rækkefølge. Vi viser også antallet af matchende parfumer og markerer udsolgte produkter.

### productdetails.js

Bruges til productdetails.hmtl. Detaljesiden læser produktets id fra URL'en med `URLSearchParams`

`const id = new URLSearchParams(window.location.search).get("id");`
`const endpoint = `https://dummyjson.com/products/${encodeURIComponent(id)}`;`

Det gør det muligt at genbruge den samme HTML-side til mange produkter. I stedet for at lave én side per produkt, bruger vi ét id i URL'en til at vise det rigtige indhold.

### basket.js

Vi har også lavet js til vores sidens kurv, for at gøre den funktionel. Det er ikke noget vi har lært i undervisningen, men fordi vi havde lavet et udkast til det i prototypen, og fordi vi gerne ville udfordre os selv, arbejdede vi med at gøre det funktionelt.

Kurvsiden læser produkterne fra `localStorage`. Vi bruger `JSON.parse()` til at omdanne den gemte tekst til et JavaScript-array.

Funktionen `visData()` gennemgår produkterne, viser dem i kurven og beregner den samlede pris. Brugeren kan fjerne et produkt med knappen _Fjern fra kurv_, som kalder `fjernProdukt()`.

Når et produkt bliver fjernet, opdateres både arrayet, localStorage og visningen på siden. Hvis kurven er tom, vises en besked om dette.

---

## Navngivning

Vi har navngivet vores filer, variabler og funktioner så de så tydeligt som muligt er selvforklarende.

### Eksempler på variabler

```javascript
const produktliste = document.querySelector("#produktliste");
const maerkeFilter = document.querySelector("#brandFilter");
const sortering = document.querySelector("#sortering");
let produkter = [];
```

### Eksempler på funktioner

```javascript
opdaterListe();
visData();
```

Vi bruger overvejende camelCase i JavaScript, eksempelvis `maerkeFilter`, `statusTekst` og `fjernProdukt`. Filnavnene beskriver deres tilhørende sider, eksempelvis `productlist.js` og `productdetails.js`.

---

## Kommentarer i koden

Vi har kommenteret de steder i koden, hvor det giver mening. Vi har fokuseret på at lave mere beskrivende kommentarer i js. I HTML har vi ikke følt behov for at lave kommentarer, fordi det ikke har været særligt kompliceret. I CSS har vi lavet kommentarer som fungerer mere som overskrifter, der markerer forskellige 'afsnit'.

**Eksempel:**

```javascript
// Sorterer produkterne efter pris eller navn
if (sortering.value === "pris-op") {
  udsnit.sort((a, b) => a.price - b.price);
} else if (sortering.value === "pris-ned") {
  udsnit.sort((a, b) => b.price - a.price);
} else if (sortering.value === "navn-op") {
  udsnit.sort((a, b) => a.title.localeCompare(b.title, "da"));
} else if (sortering.value === "navn-ned") {
  udsnit.sort((a, b) => b.title.localeCompare(a.title, "da"));
}
```

---

## Data og JSON-struktur

Vi henter data fra et API i JSON-format fra DummyJSON. Vi bruger endpoint `https://dummyjson.com/products/category/fragrances?limit=0`

**Et objekt kan fx se sådan ud:**

```json
{
  "id": 6,
  "title": "Calvin Klein CK One",
  "description": "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
  "category": "fragrances",
  "price": 49.99,
  "brand": "Calvin Klein",
  "reviews": [
    {
      "rating": 2,
      "comment": "Very disappointed!",
      "date": "2025-04-30T09:41:02.053Z",
      "reviewerName": "Layla Young",
      "reviewerEmail": "layla.young@x.dummyjson.com"
    },
    {
      "rating": 4,
      "comment": "Fast shipping!",
      "date": "2025-04-30T09:41:02.053Z",
      "reviewerName": "Daniel Cook",
      "reviewerEmail": "daniel.cook@x.dummyjson.com"
    },
    {
      "rating": 3,
      "comment": "Not as described!",
      "date": "2025-04-30T09:41:02.053Z",
      "reviewerName": "Jacob Cooper",
      "reviewerEmail": "jacob.cooper@x.dummyjson.com"
    }
  ],
  "images": [
    "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp",
    "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/2.webp",
    "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/3.webp"
  ],
  "thumbnail": "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp"
}
```

### Felter vi bruger

- **id** – bruges til at sende brugeren videre til detaljesiden
- **title** – produktnavn
- **description** – beskrivelse af produktet
- **category** – produktkategori
- **price** – produktets pris
- **brand** – produktets mærke
- **reviews** – liste over kundeanmeldelser med bedømmelse og kommentarer
- **images** – produktbilleder
- **thumbnail** – produktets miniaturebillede, som bruges til at vise produktet i en oversigt

---

## Git og branches

Vi har brugt GitHub til at samarbejde om projektet, men har ikke brugt det så meget og så systematisk som vi gerne ville. Årsagen er, at primært én person stod for at skrive kode og gjorde dette primært lokalt på sin computer. Der var derfor ikke så stort brug for branches og Github som samarbejdsværktøj i starten. Dog anvendte vi det mere og mere i den sidste fase af projektet, hvor vi arbejdede med branches, commits og versionstyring.

Vi er bevidste om, at Git og Github er godt til versionsstyring og samarbejde. Løbende commits gør det lettere at følge ændringer, finde fejl og vende tilbage til tidligere versioner. Det er derfor en af de ting, vi gerne vil blive bedre til og mere selvsikre omkring, og vi øver os derfor i at bruge det mere og mere fremadrettet.

### Eksempler på branches

- `readme.md`

### Workflow

1. Lave en branch med let forståeligt navn
2. Kode en feature - eller skrive i readme.md
3. Committe ændringer
4. Pushe til GitHub
5. Merge til main når det virkede

---

## Bæredygtighed

Vi har tænkt bæredygtighed ind i projektet ved at holde page weight under 250 kb samt en enkel informationasarkitektur.

**Tiltag:**

- Ingen videoer
- Produktkort bruger loading="lazy" på billederne, så billeder kan indlæses efter behov.
- Produktdata genbruges ved filtrering og sortering uden nye API-kald for hvert valg.
- Billeder omfatter blandt andet WebP-filer.
- Den samme HTML genbruges til alle sider med produktdetaljer

---

## Udfordringer undervejs

Det var en udfordring at få sitet til at ligne prototypen helt præcist. Derfor arbejdede vi med iterationer af sitet undervejs, og prøvede os frem med forskellige css stylinger. Desuden var der funktioner, vi havde foreslået i prototypen, men som vi ikke havde ressourcer til at få med i det endelige site - bl.a. nævnt under **mulige forbedringer**. Løsningen her var at afstemme ressourceforbrug, og prioritere vigtige arbejdsopgaver.

Nogle gange drillede js. Vi brugte slides fra undervisningen til at huske og forstå hvordan koden virkede. Nogle gange brugte vi også AI til at finde fejl, som vi ikke selv kunne identificere. Baseret på det har vi fået kodeforslag, som vi efterfølgende har tilpasset vores konkrete case og design. Vi har også brugt AI til at forklare kode, når vi nogle gange havde svært ved at identificere hvad særlige stykker kode gjorde.

**Løsninger:**

- Arbejde med flere iterationer og prøve sig frem med styling.
- Afstemme ressourceforbrug og prioritere arbejdsopgaver og kode
- Anvende undervisningsmateriale og AI
- Fejlfinde med HTML og CSS validering samt AI til js.

---

## Mulige forbedringer

Hvis vi skulle arbejde videre med projektet, kunne vi:

- Gennemføre flere brugertests på det færdigkodede website.
- Arbejde videre med mere detaljerede produktinformationer. For eksempel inkludere noget data om størrelser eller ml-indhold på parfumerne. Denne information fandtes dog ikke direkte i produktdataet fra DummyJSON'et - men man kunne evt arbejde videre med at 'oversætte' noget data.
- vi ville gerne arbejde med en funktionel søgefunktion, men vurderede det ville være for ressourcekrævende
- Liste med 'relevante produkter' f.eks. efter kurv-oversigten eller efter produktinformation på productdetails.html.

---

## Gruppemedlemmer

- Line Bøgh
- Laura Dinsen
- Mona Taherzadeh
- Maja Holgersen
