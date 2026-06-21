"use strict";

const PLAYLIST_MAP = {
  "로파이": "lofi cafe study playlist",
  "재즈": "jazz cafe study background music",
  "비 오는 카페": "rainy cafe jazz study ambience",
  "도서관 같은 조용함": "library ambient quiet study music",
  "밤샘 마감": "dark academia study playlist",
  "산뜻한 아침 카공": "morning cafe chill study playlist",
  "감성 과몰입": "aesthetic emotional study playlist"
};

const MISSIONS = {
  "감상평 쓰기": "인상 깊은 문장 하나를 먼저 적어두기.",
  "발표 준비": "슬라이드 제목 세 개만 먼저 만들기.",
  "시험 공부": "오늘 볼 단원 하나만 정하고 첫 페이지를 펼치기.",
  "코딩 과제": "함수 시그니처 하나만 먼저 만들어두기.",
  "독서": "첫 문단을 읽고 키워드 하나만 메모하기.",
  "자료 조사": "검색 키워드 세 개를 먼저 정하기.",
  "팀플 정리": "오늘 결정해야 할 것 하나만 먼저 적기."
};

const WEATHER = {
  "막막함": "안개 낀 오전. 앞은 흐리지만, 첫 문장을 쓰면 조금씩 맑아집니다.",
  "졸림": "흐린 하늘. 커피 한 모금과 작은 미션 하나로 시작해봐요.",
  "불안함": "바람 부는 흐린 날. 불안은 이 일이 중요하다는 신호예요.",
  "의욕 없음": "잔잔한 흐림. 의욕이 없어도 앉아 있는 것부터 시작입니다.",
  "차분함": "맑고 선선한 오후. 오늘의 집중력은 안정권이에요.",
  "마감 직전 각성": "번개 직전의 긴장감. 이 에너지, 지금 써야 할 때예요.",
  "그냥 카페에 있고 싶음": "따뜻한 흐림. 카페에 나온 것 자체가 이미 시작입니다."
};

const QUOTES = {
  "막막함": "완성은 나중의 일이고, 오늘은 첫 문장만 책임집니다.",
  "졸림": "졸린 채로도 시작하는 사람은 이미 반쯤 이긴 거예요.",
  "불안함": "불안한 마음을 없애려 하지 말고, 딱 10분만 집중력으로 바꿔봐요.",
  "의욕 없음": "의욕이 생기길 기다리지 말고, 시작으로 의욕을 만들어봐요.",
  "차분함": "차분한 지금이 가장 좋은 집중의 시작입니다.",
  "마감 직전 각성": "이 각성 상태, 낭비하지 마세요. 지금이 피크예요.",
  "그냥 카페에 있고 싶음": "괜찮아요. 가끔은 자리에 앉는 일이 먼저입니다."
};

const BLEND_PREFIX = {
  "로파이": "Slow",
  "재즈": "Velvet",
  "비 오는 카페": "Rainy",
  "도서관 같은 조용함": "Silent",
  "밤샘 마감": "Dark",
  "산뜻한 아침 카공": "Fresh",
  "감성 과몰입": "Dreamy"
};

const DRINK_WORD = {
  "아이스 아메리카노": "Americano",
  "아이스 라떼": "Latte",
  "말차 라떼": "Green",
  "바닐라 라떼": "Vanilla",
  "티": "Tea",
  "디카페인": "Calm",
  "오늘은 디저트가 본체": "Sugar"
};

const TASK_WORD = {
  "감상평 쓰기": "Draft",
  "발표 준비": "Prep",
  "시험 공부": "Study",
  "코딩 과제": "Code",
  "독서": "Reading",
  "자료 조사": "Research",
  "팀플 정리": "Sync"
};

const STORE_KEY = "brew_your_focus_logs";

function getVal(name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : null;
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatTimestamp(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${y}.${m}.${d} ${h}:${min}`;
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) {
    alert(message);
    return;
  }
  toast.textContent = message;
  toast.classList.remove("hidden");
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hidden");
  }, 2000);
}

function generateBlend(task, mood, seat, drink, vibe) {
  const prefix = BLEND_PREFIX[vibe] || "Cafe";
  const middle = DRINK_WORD[drink] || "Brew";
  const suffix = TASK_WORD[task] || "Focus";
  const playlist = PLAYLIST_MAP[vibe] || "cafe study playlist";

  return {
    blendName: `${prefix} ${middle} ${suffix}`,
    playlist,
    playlistUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(playlist)}`,
    spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(playlist)}`,
    mission: MISSIONS[task] || "파일을 열고 오늘 할 일 하나만 적기.",
    weather: WEATHER[mood] || "오늘도 천천히 시작할 수 있어요.",
    quote: QUOTES[mood] || "오늘의 시작은 작은 선택에서 옵니다.",
    checkItems: [
      "작업한 내용 저장하기",
      "다음에 할 일 한 줄 남기기",
      "오늘 한 일 하나 이상 기록하기",
      "충전기 / 짐 챙기기",
      "빈 잔 반납하기",
      "의자 제자리에 밀어 넣기"
    ]
  };
}

function brewBlend() {
  const task = getVal("task");
  const mood = getVal("mood");
  const seat = getVal("seat");
  const drink = getVal("drink");
  const vibe = getVal("vibe");

  if (!task || !mood || !seat || !drink || !vibe) {
    showToast("모든 항목을 선택해주세요.");
    return;
  }

  const blend = generateBlend(task, mood, seat, drink, vibe);

  window._currentBlend = {
    task,
    mood,
    seat,
    drink,
    vibe,
    blend,
    createdAt: new Date().toISOString()
  };

  setText("result-blend-name", blend.blendName);
  setText("playlist-query", `"${blend.playlist}"`);
  setText("first-mission", blend.mission);
  setText("focus-weather", blend.weather);
  setText("motivation-text", blend.quote);
  setText("card-timestamp", formatTimestamp(new Date()));

  const yt = document.getElementById("playlist-yt");
  if (yt) yt.href = blend.playlistUrl;

  const sp = document.getElementById("playlist-sp");
  if (sp) sp.href = blend.spotifyUrl;

  const selections = document.getElementById("result-selections");
  if (selections) {
    selections.innerHTML = "";
    [task, mood, seat, drink, vibe].forEach(value => {
      const chip = document.createElement("span");
      chip.className = "result-chip-tag";
      chip.textContent = value;
      selections.appendChild(chip);
    });
  }

  const sceneLabel = document.getElementById("scene-label");
  if (sceneLabel) sceneLabel.textContent = `${seat} · ${drink}`;

  const checklist = document.getElementById("checklist");
  if (checklist) {
    checklist.innerHTML = "";
    blend.checkItems.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      li.addEventListener("click", () => li.classList.toggle("done"));
      checklist.appendChild(li);
    });
  }

  const resultSection = document.getElementById("result-section");
  if (resultSection) {
    resultSection.classList.remove("hidden");
    resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function getLogs() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveLogs(logs) {
  localStorage.setItem(STORE_KEY, JSON.stringify(logs));
}

function saveLog() {
  if (!window._currentBlend) {
    showToast("먼저 블렌드를 만들어주세요.");
    return;
  }

  const logs = getLogs();
  const entry = {
    id: Date.now().toString(),
    blendName: window._currentBlend.blend.blendName,
    task: window._currentBlend.task,
    mood: window._currentBlend.mood,
    seat: window._currentBlend.seat,
    drink: window._currentBlend.drink,
    vibe: window._currentBlend.vibe,
    playlist: window._currentBlend.blend.playlist,
    mission: window._currentBlend.blend.mission,
    createdAt: window._currentBlend.createdAt
  };

  logs.unshift(entry);
  saveLogs(logs);
  updateLogBadge();
  renderLogs();
  showToast("Saved to Café Log.");
}

function renderLogs() {
  const logs = getLogs();
  const container = document.getElementById("logs-container");
  const empty = document.getElementById("logs-empty");
  const clearWrap = document.getElementById("logs-clear-wrap");

  if (!container) return;

  if (logs.length === 0) {
    container.innerHTML = "";
    if (empty) empty.style.display = "block";
    if (clearWrap) clearWrap.style.display = "none";
    return;
  }

  if (empty) empty.style.display = "none";
  if (clearWrap) clearWrap.style.display = "block";

  container.innerHTML = logs.map(log => `
    <div class="log-card">
      <h3>${escapeHtml(log.blendName)}</h3>
      <p>${escapeHtml(formatTimestamp(new Date(log.createdAt)))}</p>
      <p>${escapeHtml([log.task, log.mood, log.seat, log.drink, log.vibe].join(" · "))}</p>
      <p>${escapeHtml(log.mission)}</p>
      <p>♪ ${escapeHtml(log.playlist)}</p>
      <button onclick="deleteLog('${log.id}')">삭제</button>
    </div>
  `).join("");
}

function deleteLog(id) {
  const logs = getLogs().filter(log => log.id !== id);
  saveLogs(logs);
  updateLogBadge();
  renderLogs();
  showToast("기록이 삭제됐어요.");
}

function clearAllLogs() {
  if (!confirm("저장된 기록을 모두 지울까요?")) return;
  saveLogs([]);
  updateLogBadge();
  renderLogs();
}

function updateLogBadge() {
  const badge = document.getElementById("log-count-badge");
  if (badge) {
    const count = getLogs().length;
    badge.textContent = count > 0 ? String(count) : "";
  }
}

function resetForm() {
  document.querySelectorAll("input[type='radio']").forEach(input => {
    input.checked = false;
  });
  const resultSection = document.getElementById("result-section");
  if (resultSection) resultSection.classList.add("hidden");
  window._currentBlend = null;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showSection(name) {
  document.querySelectorAll(".section-content").forEach(section => {
    section.classList.remove("active");
    section.classList.add("hidden");
  });

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  const section = document.getElementById(`section-${name}`);
  if (section) {
    section.classList.remove("hidden");
    section.classList.add("active");
  }

  const nav = document.getElementById(`nav-${name}`);
  if (nav) nav.classList.add("active");

  if (name === "logs") renderLogs();
}

function downloadCardAsPNG() {
  showToast("이미지 저장은 제출용 버전에서 제외했어요. Café Log 저장을 사용해주세요.");
}

function timerSetPreset() {}
function timerStart() {}
function timerPause() {}
function timerReset() {}

document.addEventListener("DOMContentLoaded", () => {
  const dateEl = document.getElementById("receipt-date");
  if (dateEl) dateEl.textContent = formatTimestamp(new Date()).slice(0, 10);

  updateLogBadge();
  renderLogs();
});
