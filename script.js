const data = {
  Mutlu: [
    {
      name: "The Grand Budapest Hotel",
      genre: "Komedi",
      description: "Renkli ve hız dolu bir macera; neşeni ikiye katlar.",
      rating: "8.1",
    },
    {
      name: "Ted Lasso",
      genre: "Dizi / Komedi",
      description: "İyimser bir koçun saha dışı sürprizleriyle sıcacık bir hikaye.",
      rating: "8.8",
    },
    {
      name: "Paddington 2",
      genre: "Aile",
      description: "Pozitif enerji ve tatlı bir mizah arıyorsan doğru yer.",
      rating: "7.8",
    },
    {
      name: "The Intern",
      genre: "Dram / Komedi",
      description: "Ofis dinamikleri ve samimi karakterlerle keyifli bir tempo.",
      rating: "7.1",
    },
    {
      name: "Chef",
      genre: "Dram",
      description: "Yemek, yolculuk ve yeniden başlama hissiyle iyi gelir.",
      rating: "7.3",
    },
  ],
  Üzgün: [
    {
      name: "Before Sunrise",
      genre: "Romantik",
      description: "Duygusal derinlik ve sakin bir tempo için ideal.",
      rating: "8.1",
    },
    {
      name: "This Is Us",
      genre: "Dizi / Dram",
      description: "Aile bağlarına dair samimi bir anlatı.",
      rating: "8.7",
    },
    {
      name: "The Pursuit of Happyness",
      genre: "Dram",
      description: "Zor zamanlarda umut ve direnç aşılayan bir hikaye.",
      rating: "8.0",
    },
    {
      name: "Her",
      genre: "Bilim Kurgu / Dram",
      description: "Yalnızlık ve bağ kurma üzerine sakin bir yolculuk.",
      rating: "8.0",
    },
    {
      name: "Little Women",
      genre: "Dram",
      description: "İlişkiler ve aile üzerine nostaljik, içten bir öykü.",
      rating: "7.8",
    },
  ],
  Stresli: [
    {
      name: "Chef's Table",
      genre: "Dizi / Belgesel",
      description: "Yavaş ve estetik bir anlatımla sakinleştirici içerik.",
      rating: "8.5",
    },
    {
      name: "Soul",
      genre: "Animasyon",
      description: "Hayatın küçük detaylarına odaklanmak için hafif bir dokunuş.",
      rating: "8.0",
    },
    {
      name: "Midnight Diner",
      genre: "Dizi / Dram",
      description: "Sıcak bir mekanda geçen sakin hikayeler.",
      rating: "7.6",
    },
    {
      name: "The Secret Life of Walter Mitty",
      genre: "Macera",
      description: "Günlük stresten kaçmak için ilham verici.",
      rating: "7.3",
    },
    {
      name: "Blue Planet II",
      genre: "Belgesel",
      description: "Doğanın ritmiyle zihnini dinlendir.",
      rating: "9.3",
    },
  ],
  Romantik: [
    {
      name: "La La Land",
      genre: "Müzikal",
      description: "Aşk ve hayallerin kesiştiği büyülü bir hikaye.",
      rating: "8.0",
    },
    {
      name: "Normal People",
      genre: "Dizi / Dram",
      description: "Yoğun duygularla örülü modern bir aşk hikayesi.",
      rating: "8.4",
    },
    {
      name: "Pride & Prejudice",
      genre: "Romantik",
      description: "Klasik bir aşk anlatısı, şık ve zarif.",
      rating: "7.8",
    },
    {
      name: "Call Me by Your Name",
      genre: "Dram",
      description: "Yaz akşamı romantizmi arayanlara.",
      rating: "7.8",
    },
    {
      name: "Palm Springs",
      genre: "Komedi",
      description: "Zamanda sıkışmış eğlenceli bir ilişki hikayesi.",
      rating: "7.4",
    },
  ],
  "Aksiyon Modu": [
    {
      name: "Mad Max: Fury Road",
      genre: "Aksiyon",
      description: "Kesintisiz tempo ve görsel şölen.",
      rating: "8.1",
    },
    {
      name: "Extraction",
      genre: "Aksiyon",
      description: "Yüksek riskli bir kurtarma görevi.",
      rating: "6.7",
    },
    {
      name: "The Night Agent",
      genre: "Dizi / Gerilim",
      description: "Komplo ve kovalamaca dolu hızlı bir seri.",
      rating: "7.5",
    },
    {
      name: "John Wick",
      genre: "Aksiyon",
      description: "Stilize dövüş sahneleri ve durmayan aksiyon.",
      rating: "7.4",
    },
    {
      name: "Mission: Impossible - Fallout",
      genre: "Aksiyon",
      description: "Adrenalin seviyesi yüksek bir ajan macerası.",
      rating: "7.7",
    },
  ],
};

const moodSelect = document.getElementById("moodSelect");
const recommendBtn = document.getElementById("recommendBtn");
const refreshBtn = document.getElementById("refreshBtn");
const results = document.getElementById("results");
const modeToggle = document.getElementById("modeToggle");

const getRandomRecommendations = (items, count = 4) => {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, items.length));
};

const renderCards = (items) => {
  if (!items.length) {
    results.innerHTML =
      '<p class="empty">Bu ruh hali için öneri bulunamadı.</p>';
    return;
  }

  results.innerHTML = items
    .map(
      (item) => `
        <article class="card">
          <span class="tag">${item.genre}</span>
          <h3>${item.name}</h3>
          <p class="description">${item.description}</p>
          <span class="rating">IMDb ${item.rating}</span>
        </article>
      `
    )
    .join("");
};

const handleRecommend = () => {
  const mood = moodSelect.value;
  const items = data[mood] ?? [];
  const recommendations = getRandomRecommendations(items);
  renderCards(recommendations);
};

const toggleMode = () => {
  const isDark = document.body.classList.toggle("dark");
  modeToggle.textContent = isDark ? "☀️ Aydınlık Mod" : "🌙 Karanlık Mod";
};

recommendBtn.addEventListener("click", handleRecommend);
refreshBtn.addEventListener("click", handleRecommend);
modeToggle.addEventListener("click", toggleMode);

handleRecommend();
