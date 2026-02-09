const form = document.querySelector("#prayer-form");
const statusEl = document.querySelector("#status");
const resultsEl = document.querySelector("#results");

const prayerLabels = [
  { key: "Fajr", label: "İmsak" },
  { key: "Sunrise", label: "Güneş" },
  { key: "Dhuhr", label: "Öğle" },
  { key: "Asr", label: "İkindi" },
  { key: "Maghrib", label: "Akşam" },
  { key: "Isha", label: "Yatsı" },
];

const formatLocation = (city, district) =>
  `${city.trim()} / ${district.trim()}`;

const renderTiles = (timings) => {
  resultsEl.innerHTML = "";
  prayerLabels.forEach(({ key, label }) => {
    const tile = document.createElement("div");
    tile.className = "tile";

    const title = document.createElement("h3");
    title.textContent = label;

    const time = document.createElement("p");
    time.textContent = timings[key] || "-";

    tile.append(title, time);
    resultsEl.appendChild(tile);
  });
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const city = formData.get("city");
  const district = formData.get("district");

  if (!city || !district) {
    statusEl.textContent = "Lütfen şehir ve ilçe bilgilerini doldurun.";
    resultsEl.innerHTML = "";
    return;
  }

  statusEl.textContent = "Vakitler getiriliyor...";
  resultsEl.innerHTML = "";

  try {
    const url = new URL("https://api.aladhan.com/v1/timingsByCity");
    url.searchParams.set("city", city);
    url.searchParams.set("state", district);
    url.searchParams.set("country", "Turkey");
    url.searchParams.set("method", "13");

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Vakitler alınamadı.");
    }

    const data = await response.json();
    if (data.code !== 200) {
      throw new Error(data.status || "Beklenmeyen hata oluştu.");
    }

    statusEl.textContent = `Bugün (${formatLocation(city, district)})`;
    renderTiles(data.data.timings);
  } catch (error) {
    statusEl.textContent =
      "Vakitler alınamadı. Bilgileri kontrol edip tekrar deneyin.";
  }
});
