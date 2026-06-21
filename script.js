/* =============================================
   BREW YOUR FOCUS — script.js
   Pure vanilla JavaScript, no external libs
   ============================================= */

"use strict";

/* ============================================
   DATA: PLAYLISTS BY VIBE
   ============================================ */
var PLAYLIST_MAP = {
  "로파이":            "lofi cafe study playlist",
  "재즈":              "jazz cafe study background music",
  "비 오는 카페":      "rainy cafe jazz study ambience",
  "도서관 같은 조용함":"library ambient quiet study music",
  "밤샘 마감":         "dark academia study playlist",
  "산뜻한 아침 카공":  "morning cafe chill study playlist",
  "감성 과몰입":       "aesthetic emotional study playlist",
};

/* ============================================
   DATA: SCENE CARDS (seat + drink → gradient)
   ============================================ */
var SCENE_SEAT = {
  "창가 자리":             { grad: "linear-gradient(135deg,#f8f0da 0%,#edd8a8 55%,#e0c870 100%)", isDark: false },
  "콘센트 근처":           { grad: "linear-gradient(135deg,#2c1a0e 0%,#4a2c18 50%,#3b200f 100%)", isDark: true  },
  "구석 자리":             { grad: "linear-gradient(135deg,#1e2030 0%,#2a2e48 50%,#1a1e30 100%)", isDark: true  },
  "2층 조용한 자리":       { grad: "linear-gradient(135deg,#f5f0e8 0%,#ede5d4 55%,#e2d8c4 100%)", isDark: false },
  "바 테이블":             { grad: "linear-gradient(135deg,#1e2c44 0%,#2c3d5e 50%,#1a2840 100%)", isDark: true  },
  "사람 구경 가능한 자리": { grad: "linear-gradient(135deg,#f5e8d0 0%,#e8d4a8 55%,#dcc488 100%)", isDark: false },
};
var SCENE_COMBO = {
  "구석 자리|말차 라떼":            { grad: "linear-gradient(135deg,#2d3d20 0%,#4a5e32 50%,#3a4e28 100%)", isDark: true  },
  "2층 조용한 자리|티":             { grad: "linear-gradient(135deg,#f0ede4 0%,#e4ddd0 50%,#dcd4c0 100%)", isDark: false },
  "콘센트 근처|아이스 아메리카노":  { grad: "linear-gradient(135deg,#1e0e08 0%,#3b1a0a 50%,#2c1206 100%)", isDark: true  },
  "창가 자리|아이스 라떼":          { grad: "linear-gradient(135deg,#f8f0da 0%,#f0e0b8 55%,#e8d09a 100%)", isDark: false },
  "바 테이블|디카페인":             { grad: "linear-gradient(135deg,#1a2438 0%,#28364e 50%,#1a2030 100%)", isDark: true  },
  "창가 자리|말차 라떼":            { grad: "linear-gradient(135deg,#e8f0d8 0%,#d4e4b8 55%,#bcd498 100%)", isDark: false },
};
var SCENE_SEAT_LABEL = {
  "창가 자리":             "window light",
  "콘센트 근처":           "plug-in focus",
  "구석 자리":             "quiet corner",
  "2층 조용한 자리":       "second floor silence",
  "바 테이블":             "bar table",
  "사람 구경 가능한 자리": "people watching",
};
var SCENE_DRINK_LABEL = {
  "아이스 아메리카노":     "iced americano",
  "아이스 라떼":           "iced latte",
  "말차 라떼":             "matcha latte",
  "바닐라 라떼":           "vanilla latte",
  "티":                    "tea",
  "디카페인":              "decaf",
  "오늘은 디저트가 본체":  "dessert mood",
};

/* ============================================
   DATA: BLEND NAME PARTS
   ============================================ */
var BLEND_PREFIX = {
  "로파이":            ["Midnight", "Hazy", "Slow", "Quiet"],
  "재즈":              ["Golden", "Velvet", "Smoky", "Amber"],
  "비 오는 카페":      ["Rainy", "Grey", "Mellow", "Damp"],
  "도서관 같은 조용함":["Still", "Silent", "Deep", "Pale"],
  "밤샘 마감":         ["Dark", "Last", "Edge", "Crisis"],
  "산뜻한 아침 카공":  ["Bright", "Early", "Fresh", "Dawn"],
  "감성 과몰입":       ["Dreamy", "Tender", "Wistful", "Soft"],
};

var BLEND_MIDDLE = {
  "아이스 아메리카노": ["Americano", "Espresso", "Black"],
  "아이스 라떼":       ["Latte", "Milk", "Cloud"],
  "말차 라떼":         ["Matcha", "Green", "Herb"],
  "바닐라 라떼":       ["Vanilla", "Caramel", "Warm"],
  "티":                ["Tea", "Chamomile", "Oolong"],
  "디카페인":          ["Calm", "Gentle", "Serene"],
  "오늘은 디저트가 본체": ["Sugar", "Crumble", "Sweet"],
};

var BLEND_SUFFIX = {
  "감상평 쓰기": "Session",
  "발표 준비":   "Prep",
  "시험 공부":   "Study",
  "코딩 과제":   "Code",
  "독서":        "Read",
  "자료 조사":   "Dig",
  "팀플 정리":   "Sync",
};

/* ============================================
   DATA: FIRST SIP MISSIONS (by task)
   ============================================ */
var MISSIONS = {
  "감상평 쓰기": [
    "노트를 펼치고, 본 것/읽은 것 중 딱 한 장면만 적어보세요.",
    "제목 쓰고 한 줄 핵심 감상만 먼저 남겨두기.",
    "첫 문장 딱 하나만 써보기. 이어 쓰지 않아도 괜찮아요.",
  ],
  "발표 준비": [
    "슬라이드 구성을 목차 3줄로 메모해보세요.",
    "발표 핵심 메시지를 한 문장으로 적어두기.",
    "오프닝 첫 마디 두 문장만 써보세요.",
  ],
  "시험 공부": [
    "오늘 마스터할 단원 하나만 정하기.",
    "가장 헷갈리는 개념 1개를 종이에 써보기.",
    "공부 범위를 작게 쪼개 3개의 블록으로 나누기.",
  ],
  "코딩 과제": [
    "해결해야 할 문제를 자연어로 딱 3줄 써보기.",
    "함수 시그니처 하나만 먼저 만들어두기.",
    "입력과 출력이 뭔지 먼저 메모해보기.",
  ],
  "독서": [
    "오늘 읽을 페이지 목표를 정하고 책을 펼치기.",
    "첫 페이지 첫 문단만 읽고 키워드 하나 메모하기.",
    "목차를 훑어보고 오늘 읽을 챕터 하나 고르기.",
  ],
  "자료 조사": [
    "검색 키워드 3개를 먼저 정해두기.",
    "알고 있는 것과 모르는 것을 한 줄씩 써보기.",
    "탭 한 개만 열고 시작하기.",
  ],
  "팀플 정리": [
    "팀원 각자의 할 일을 빠르게 리스트로 쭉 나열해보기.",
    "오늘 결정해야 할 것 딱 하나 정하기.",
    "공유 문서에 오늘 날짜와 진행 상황 한 줄 써두기.",
  ],
};

/* ============================================
   DATA: FOCUS WEATHER (by mood)
   ============================================ */
var FOCUS_WEATHER = {
  "막막함":              "안개 낀 이른 오전. 앞이 잘 안 보이지만 그 안에 뭔가 있어요. 조금만 걸으면 맑아집니다.",
  "졸림":                "잔뜩 흐린 하늘. 커피 한 모금이면 구름이 조금씩 걷힐 거예요.",
  "불안함":              "바람 부는 흐린 날. 불안은 뭔가를 신경 쓰고 있다는 뜻이에요. 그 마음 그대로 앉아 있어도 괜찮아요.",
  "의욕 없음":           "잔잔한 흐림. 흐린 날도 시간은 흐르고, 앉아만 있어도 뭔가 하게 돼요.",
  "차분함":              "맑고 선선한 오후. 오늘 당신의 집중력은 안정권이에요.",
  "마감 직전 각성":      "번개 직전의 긴장감. 이 에너지, 지금 쏟아붓기 딱 좋아요.",
  "그냥 카페에 있고 싶음":"따뜻한 흐림. 아무것도 안 해도 이 공간에 있는 것만으로 충분해요.",
};

/* ============================================
   DATA: MOTIVATION QUOTES (by mood)
   ============================================ */
var QUOTES = {
  "막막함": [
    "막막할 때 시작하는 것이 가장 용감한 일이에요.",
    "완벽하지 않아도 돼요. 일단 노트를 펼치는 것부터.",
    "모든 완성작은 막막함에서 시작됐어요.",
  ],
  "졸림": [
    "졸린 채로도 뭔가 하고 있다는 게 대단한 거예요.",
    "커피가 효과를 발휘할 때까지, 작은 것 하나만 해봐요.",
    "지금 이 자리에 앉은 것만으로도 충분히 잘하고 있어요.",
  ],
  "불안함": [
    "불안함은 내가 이걸 중요하게 여긴다는 신호예요.",
    "완벽하게 해야 한다는 압박을 잠깐 내려놔도 괜찮아요.",
    "이 불안한 에너지를 딱 10분만 집중력으로 바꿔보세요.",
  ],
  "의욕 없음": [
    "의욕이 생기면 시작하려고 기다리지 마세요. 시작이 의욕을 만들어요.",
    "오늘은 '잘 하는 날'이 아니어도 괜찮아요. '하는 날'이면 충분해요.",
    "딱 2분만 해봐요. 2분 후에는 계속 하게 되어 있어요.",
  ],
  "차분함": [
    "오늘 컨디션, 믿어도 돼요. 이미 준비된 상태예요.",
    "차분한 지금 이 순간이 가장 좋은 집중력의 시작이에요.",
    "흔들리지 않는 오늘, 끝까지 유지해봐요.",
  ],
  "마감 직전 각성": [
    "이 각성 상태, 낭비하지 마세요. 지금이 피크예요.",
    "마감 직전의 집중력은 슈퍼파워예요. 지금 써요.",
    "압박감이 당신을 더 강하게 만들고 있어요. 믿어요.",
  ],
  "그냥 카페에 있고 싶음": [
    "아무것도 안 해도 좋은 날이 있어요. 오늘이 그런 날일 수도 있어요.",
    "카페에 나온 것 자체가 이미 뭔가를 원하는 마음이에요.",
    "그냥 있어도 괜찮아요. 뭔가 떠오르면 그때 해요.",
  ],
};

/* ============================================
   DATA: CHECKLIST ITEMS
   ============================================ */
var CHECKLIST_UNIVERSAL = [
  "오늘 한 일 중 하나 이상 기록해두기",
  "충전기 / 짐 챙기기",
  "빈 잔 반납하기",
  "의자 제자리에 밀어 넣기",
];

var CHECKLIST_BY_TASK = {
  "감상평 쓰기": [
    "쓴 내용 저장 — 파일명에 날짜 포함",
    "참고한 작품 출처 메모해두기",
    "내일 다시 읽어볼 가치가 있는지 체크",
  ],
  "발표 준비": [
    "슬라이드 저장 + 백업 확인",
    "발표 시간 다시 한 번 확인",
    "내일 복습할 파트 표시해두기",
  ],
  "시험 공부": [
    "오늘 외운 것 눈 감고 한 번 떠올려보기",
    "약한 파트 별표 표시해두기",
    "내일 시작 챕터 미리 펼쳐두기",
  ],
  "코딩 과제": [
    "작업한 코드 커밋 or 저장 확인",
    "막힌 부분 주석으로 메모해두기",
    "다음 세션에서 할 것 TODO로 남기기",
  ],
  "독서": [
    "읽은 페이지 번호 메모",
    "기억에 남는 문장 하나 기록",
    "책갈피 꽂아두기",
  ],
  "자료 조사": [
    "출처 탭 북마크 또는 링크 복사",
    "조사 내용 요약 한 줄 메모",
    "브라우저 탭 정리하기",
  ],
  "팀플 정리": [
    "오늘 결정 사항 공유 문서에 업데이트",
    "다음 미팅 날짜 캘린더 확인",
    "팀원에게 진행 상황 공유",
  ],
};

/* ============================================
   UTILITY
   ============================================ */
function simpleHash(str) {
  var h = 0;
  for (var i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

function pick(arr, seed) {
  return arr[seed % arr.length];
}

function formatDate(d) {
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var y   = d.getFullYear();
  var mo  = String(d.getMonth() + 1).padStart(2, "0");
  var day = String(d.getDate()).padStart(2, "0");
  var dow = days[d.getDay()];
  var h   = String(d.getHours()).padStart(2, "0");
  var min = String(d.getMinutes()).padStart(2, "0");
  return {
    date: y + "." + mo + "." + day + " " + dow,
    time: h + ":" + min,
  };
}

function formatTimestamp(d) {
  var f = formatDate(d);
  return f.date + "  " + f.time;
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ============================================
   BLEND GENERATION
   ============================================ */
function generateBlend(task, mood, seat, drink, vibe) {
  var seed = simpleHash(task + mood + seat + drink + vibe);

  var prefixes = BLEND_PREFIX[vibe] || ["Calm", "Still", "Quiet", "Deep"];
  var middles  = BLEND_MIDDLE[drink] || ["Brew", "Cup", "Sip"];
  var suffix   = BLEND_SUFFIX[task]  || "Mode";

  var prefix = pick(prefixes, seed);
  var middle = pick(middles, seed >>> 2);
  var blendName = prefix + " " + middle + " " + suffix;

  var query  = PLAYLIST_MAP[vibe] || "cafe study playlist";
  var ytUrl  = "https://www.youtube.com/results?search_query=" + encodeURIComponent(query);
  var spUrl  = "https://open.spotify.com/search/" + encodeURIComponent(query);

  var missions = MISSIONS[task] || ["노트를 열고 오늘 할 것 딱 하나만 써보기."];
  var mission  = pick(missions, seed);

  var weather  = FOCUS_WEATHER[mood] || "가볍게 흐림. 오늘도 잘 해낼 수 있어요.";

  var quoteArr = QUOTES[mood] || ["오늘 하루도 잘 하고 있어요."];
  var quote    = pick(quoteArr, seed >>> 3);

  var taskChecks = CHECKLIST_BY_TASK[task] || [];
  var checkItems = taskChecks.concat(CHECKLIST_UNIVERSAL);

  return { blendName: blendName, playlist: { query: query, url: ytUrl, spUrl: spUrl },
           mission: mission, weather: weather, quote: quote, checkItems: checkItems };
}

/* ============================================
   SECTION NAVIGATION
   ============================================ */
function showSection(name) {
  document.querySelectorAll(".section-content").forEach(function(el) {
    el.classList.remove("active");
  });
  document.querySelectorAll(".nav-btn").forEach(function(btn) {
    btn.classList.remove("active");
  });

  var target = document.getElementById("section-" + name);
  var navBtn = document.getElementById("nav-" + name);
  if (target) { target.classList.remove("hidden"); target.classList.add("active"); }
  if (navBtn) navBtn.classList.add("active");

  if (name === "logs") renderLogs();
}

/* ============================================
   BREW: READ FORM
   ============================================ */
function getVal(name) {
  var el = document.querySelector("input[name=\"" + name + "\"]:checked");
  return el ? el.value : null;
}

/* ============================================
   BREW: MAIN HANDLER
   ============================================ */
function brewBlend() {
  var task  = getVal("task");
  var mood  = getVal("mood");
  var seat  = getVal("seat");
  var drink = getVal("drink");
  var vibe  = getVal("vibe");

  /* --- validation --- */
  var nameMap = { task: "오늘의 작업", mood: "오늘의 감정",
                  seat: "카페 자리",   drink: "오늘의 음료", vibe: "원하는 무드" };
  var fieldOrder = ["task", "mood", "seat", "drink", "vibe"];
  var missing = fieldOrder.filter(function(f) {
    return !getVal(f);
  });

  /* Highlight missing fieldsets */
  fieldOrder.forEach(function(f) {
    var fs = document.querySelector("input[name=\"" + f + "\"]");
    if (fs) fs.closest("fieldset").classList.toggle("field-missing", !getVal(f));
  });

  var hint = document.getElementById("brew-hint");
  if (missing.length > 0) {
    var labels = missing.map(function(f) { return nameMap[f]; });
    hint.textContent = labels.join(", ") + "을(를) 선택해주세요.";
    hint.classList.add("hint-error");

    /* Scroll to first missing field */
    var firstMissing = document.querySelector("input[name=\"" + missing[0] + "\"]");
    if (firstMissing) {
      firstMissing.closest("fieldset").scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }

  /* Clear validation states */
  hint.textContent = "";
  hint.classList.remove("hint-error");
  fieldOrder.forEach(function(f) {
    var fs = document.querySelector("input[name=\"" + f + "\"]");
    if (fs) fs.closest("fieldset").classList.remove("field-missing");
  });

  var blend = generateBlend(task, mood, seat, drink, vibe);

  /* Store current blend for save / download */
  window._currentBlend = {
    blend: blend,
    task: task, mood: mood, seat: seat, drink: drink, vibe: vibe,
    createdAt: new Date().toISOString(),
  };

  renderResultCard(blend, task, mood, seat, drink, vibe);

  var resultSection = document.getElementById("result-section");
  resultSection.classList.remove("hidden");

  /* Force animation replay */
  var card = document.getElementById("result-card");
  card.classList.remove("card-animated");
  void card.offsetWidth; /* reflow trigger */
  card.classList.add("card-animated");

  setTimeout(function() {
    resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 60);
}

/* ============================================
   RENDER: RESULT CARD
   ============================================ */
function renderResultCard(blend, task, mood, seat, drink, vibe) {
  setText("result-blend-name", blend.blendName);

  /* Render selections as chip tags */
  var chipRow = document.getElementById("result-selections");
  if (chipRow) {
    chipRow.innerHTML = "";
    [task, mood, seat, drink, vibe].forEach(function(val) {
      var span = document.createElement("span");
      span.className = "result-chip-tag";
      span.textContent = val;
      chipRow.appendChild(span);
    });
  }

  setText("playlist-query", "\u201c" + blend.playlist.query + "\u201d");

  var ytLink = document.getElementById("playlist-yt");
  if (ytLink) ytLink.href = blend.playlist.url;
  var spLink = document.getElementById("playlist-sp");
  if (spLink) spLink.href = blend.playlist.spUrl || "#";

  renderSceneCard(seat, drink);
  timerReset();

  setText("first-mission",   blend.mission);
  setText("focus-weather",   blend.weather);
  setText("motivation-text", blend.quote);
  setText("card-timestamp",  formatTimestamp(new Date()));

  /* Checklist */
  var cl = document.getElementById("checklist");
  cl.innerHTML = "";
  blend.checkItems.forEach(function(item) {
    var li = document.createElement("li");
    li.innerHTML = "<span class=\"check-box\" aria-hidden=\"true\"></span><span class=\"check-label\">" + escHtml(item) + "</span>";
    li.addEventListener("click", function() { li.classList.toggle("done"); });
    cl.appendChild(li);
  });
}

function setText(id, val) {
  var el = document.getElementById(id);
  if (el) el.textContent = val;
}

/* ============================================
   RENDER: SCENE CARD
   ============================================ */
function renderSceneCard(seat, drink) {
  var card    = document.getElementById("scene-card");
  var labelEl = document.getElementById("scene-label");
  var tagEl   = document.getElementById("scene-tagline");
  if (!card) return;

  var comboKey = seat + "|" + drink;
  var scene    = SCENE_COMBO[comboKey] || SCENE_SEAT[seat] ||
                 { grad: "linear-gradient(135deg,#f5f0e8 0%,#e8d8c0 100%)", isDark: false };

  card.style.background = scene.grad;
  card.classList.toggle("scene-card--dark", !!scene.isDark);

  var sl = SCENE_SEAT_LABEL[seat]   || seat;
  var dl = SCENE_DRINK_LABEL[drink] || drink;
  if (labelEl) labelEl.textContent = sl + "  ·  " + dl;
  if (tagEl)   tagEl.textContent   = "Today's café spot";
}

/* ============================================
   RESET FORM
   ============================================ */
function resetForm() {
  document.querySelectorAll("input[type='radio']").forEach(function(r) {
    r.checked = false;
  });
  document.querySelectorAll("fieldset").forEach(function(fs) {
    fs.classList.remove("field-missing");
  });
  var hint = document.getElementById("brew-hint");
  hint.textContent = "";
  hint.classList.remove("hint-error");

  document.getElementById("result-section").classList.add("hidden");
  window._currentBlend = null;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ============================================
   PNG DOWNLOAD (Canvas-based)
   ============================================ */
function downloadCardAsPNG() {
  var data = window._currentBlend;
  if (!data) return;

  var btn = document.getElementById("download-btn");
  if (btn) { btn.disabled = true; btn.classList.add("loading"); }

  var done = function(success) {
    if (btn) { btn.disabled = false; btn.classList.remove("loading"); }
    showToast(success ? "이미지가 저장됐어요 ✦" : "이미지 저장 중 오류가 발생했어요.");
  };

  var go = function() {
    try {
      var dataURL = buildCardCanvas(data);
      var a = document.createElement("a");
      a.download = "brew-your-focus-" + data.blend.blendName.replace(/\s+/g, "-").toLowerCase() + ".png";
      a.href = dataURL;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      done(true);
    } catch (e) {
      done(false);
    }
  };

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(go).catch(go);
  } else {
    go();
  }
}

function buildCardCanvas(data) {
  var blend  = data.blend;
  var task   = data.task;
  var mood   = data.mood;
  var seat   = data.seat;
  var drink  = data.drink;
  var vibe   = data.vibe;

  var DPR = 2;
  var W   = 600;
  var PAD = 32;

  var C = {
    espresso:   "#3b2314",
    cream:      "#faf6f0",
    creamDark:  "#f2ead9",
    latte:      "#d4bc98",
    latteMid:   "#c4a880",
    brown:      "#8b5e3c",
    matcha:     "#6b7c4a",
    matchaBg:   "rgba(107,124,74,0.09)",
    textMid:    "#5c3d22",
    textMuted:  "#9a7a5a",
    cardBg:     "#fffdf8",
  };
  var SERIF = "Georgia, serif";
  var SANS  = "system-ui, sans-serif";
  var MONO  = "'Courier New', monospace";

  /* Helper: measure + wrap text */
  function wrapLines(ctx, text, maxW) {
    var words = text.split(" ");
    var lines = [];
    var cur   = "";
    for (var i = 0; i < words.length; i++) {
      var test = cur ? cur + " " + words[i] : words[i];
      if (ctx.measureText(test).width > maxW && cur) {
        lines.push(cur); cur = words[i];
      } else { cur = test; }
    }
    if (cur) lines.push(cur);
    return lines.length ? lines : [""];
  }

  function drawText(ctx, text, x, y, maxW, lineH) {
    var ls = wrapLines(ctx, text, maxW);
    ls.forEach(function(l, i) { ctx.fillText(l, x, y + i * lineH); });
    return y + ls.length * lineH;
  }

  function measureH(ctx, text, maxW, lineH) {
    return wrapLines(ctx, text, maxW).length * lineH;
  }

  function hline(ctx, x1, y, x2, dashed) {
    ctx.save();
    ctx.strokeStyle = C.latte;
    ctx.lineWidth   = 1;
    if (dashed) ctx.setLineDash([4, 7]); else ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke();
    ctx.restore();
  }

  function roundedRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y); ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r); ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h); ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r); ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }

  /* ---- Measure pass ---- */
  var tmp = document.createElement("canvas");
  tmp.width = W * DPR; tmp.height = 100;
  var mctx = tmp.getContext("2d");
  mctx.scale(DPR, DPR);

  var INNER   = W - PAD * 2;
  var BODY_W  = INNER - 64;
  var ROW_PAD = 18;
  var LH      = 22;

  var selText = [task, mood, seat, drink, vibe].join(" · ");

  mctx.font = "bold 26px " + SERIF;
  var hdrNameH = measureH(mctx, blend.blendName, INNER - 20, 34);
  mctx.font = "11px " + MONO;
  var hdrSelH  = measureH(mctx, selText, INNER - 20, 15);
  var HEADER_H = 20 + 18 + 8 + hdrNameH + 10 + hdrSelH + 20;

  mctx.font = "13px " + SANS;
  var rowPlayH    = ROW_PAD * 2 + 16 + 8 + measureH(mctx, "\u201c" + blend.playlist.query + "\u201d", BODY_W, LH);
  var rowMissH    = ROW_PAD * 2 + 16 + 8 + measureH(mctx, blend.mission, BODY_W, LH);
  var rowWeatH    = ROW_PAD * 2 + 16 + 8 + measureH(mctx, blend.weather, BODY_W, LH);

  mctx.font = "italic 14px " + SERIF;
  var rowQuoteH   = ROW_PAD * 2 + 16 + 8 + measureH(mctx, blend.quote, BODY_W, LH);

  var ITEM_H   = 26;
  var CHECK_H  = 18 + 16 + blend.checkItems.length * ITEM_H + 16;
  var FOOTER_H = 38;

  var totalH = HEADER_H + 1
             + rowPlayH + 1
             + rowMissH + 1
             + rowWeatH + 1
             + rowQuoteH + 1
             + CHECK_H  + 1
             + FOOTER_H + 40;

  /* ---- Draw pass ---- */
  var cv  = document.createElement("canvas");
  cv.width  = W * DPR;
  cv.height = Math.ceil(totalH) * DPR;
  var ctx = cv.getContext("2d");
  ctx.scale(DPR, DPR);

  var H     = cv.height / DPR;
  var CARD_H = H - 40;
  var CX    = 20;

  /* Outer bg */
  ctx.fillStyle = C.creamDark;
  ctx.fillRect(0, 0, W, H);

  /* Card shadow */
  ctx.save();
  ctx.shadowColor = "rgba(59,35,20,0.15)"; ctx.shadowBlur = 18; ctx.shadowOffsetY = 4;
  roundedRect(ctx, CX, 20, W - 40, CARD_H, 14);
  ctx.fillStyle = C.cardBg; ctx.fill();
  ctx.restore();

  /* Clip to card */
  ctx.save();
  roundedRect(ctx, CX, 20, W - 40, CARD_H, 14);
  ctx.clip();

  var y = 20;

  /* ── HEADER ────────────────────────────── */
  ctx.fillStyle = C.espresso;
  ctx.fillRect(CX, y, W - 40, HEADER_H);

  ctx.textAlign = "center";
  ctx.font = "10px " + MONO;
  ctx.fillStyle = "rgba(250,246,240,0.45)";
  ctx.fillText("BREW YOUR FOCUS", W / 2, y + 18);

  ctx.font = "10px " + MONO;
  ctx.fillStyle = "rgba(250,246,240,0.45)";
  ctx.fillText("오늘의 카공 블렌드", W / 2, y + 36);

  ctx.font = "bold 26px " + SERIF;
  ctx.fillStyle = C.cream;
  var nameLines = wrapLines(ctx, blend.blendName, INNER - 20);
  nameLines.forEach(function(l, i) { ctx.fillText(l, W / 2, y + 60 + i * 34); });
  var afterName = y + 60 + nameLines.length * 34;

  ctx.font = "10px " + MONO;
  ctx.fillStyle = "rgba(250,246,240,0.42)";
  var selLines = wrapLines(ctx, selText, INNER - 20);
  selLines.forEach(function(l, i) { ctx.fillText(l, W / 2, afterName + 10 + i * 15); });

  y += HEADER_H;
  ctx.textAlign = "left";

  /* ── ROW RENDERER ──────────────────────── */
  function drawRow(icon, label, body, bg, italic) {
    var bW  = BODY_W;
    var bX  = CX + PAD + 52;
    ctx.font = (italic ? "italic " : "") + "13px " + (italic ? SERIF : SANS);
    var rows = wrapLines(ctx, body, bW);
    var rH   = ROW_PAD * 2 + 16 + 8 + rows.length * LH;

    if (bg) { ctx.fillStyle = bg; ctx.fillRect(CX, y, W - 40, rH); }

    /* icon */
    ctx.font      = "16px " + SANS;
    ctx.fillStyle = C.brown;
    ctx.textAlign = "center";
    ctx.fillText(icon, CX + PAD + 14, y + ROW_PAD + 14);
    /* label */
    ctx.font      = "9px " + MONO;
    ctx.fillStyle = C.textMuted;
    ctx.fillText(label, CX + PAD + 14, y + ROW_PAD + 28);
    /* body */
    ctx.font      = (italic ? "italic " : "") + "13px " + (italic ? SERIF : SANS);
    ctx.fillStyle = C.textMid;
    ctx.textAlign = "left";
    rows.forEach(function(l, i) { ctx.fillText(l, bX, y + ROW_PAD + 14 + i * LH); });

    y += rH;
  }

  hline(ctx, CX, y, CX + W - 40, false); y += 1;
  drawRow("\u266a", "PLAYLIST",         "\u201c" + blend.playlist.query + "\u201d", null,         false);
  hline(ctx, CX, y, CX + W - 40, true);  y += 1;
  drawRow("\u25ce", "FIRST SIP MISSION", blend.mission,         C.matchaBg,   false);
  hline(ctx, CX, y, CX + W - 40, true);  y += 1;
  drawRow("\u26c5", "FOCUS WEATHER",     blend.weather,         null,         false);
  hline(ctx, CX, y, CX + W - 40, true);  y += 1;
  drawRow("\u275d", "TODAY'S WORDS",     blend.quote,           null,         true);

  /* ── CHECKLIST ────────────────────────── */
  hline(ctx, CX, y, CX + W - 40, false); y += 1;
  ctx.fillStyle = C.creamDark;
  ctx.fillRect(CX, y, W - 40, CHECK_H);

  ctx.font      = "10px " + MONO;
  ctx.fillStyle = C.textMuted;
  ctx.textAlign = "left";
  ctx.fillText("BEFORE YOU LEAVE  \u2713", CX + PAD, y + 16);

  blend.checkItems.forEach(function(item, i) {
    var iy = y + 34 + i * ITEM_H;
    ctx.strokeStyle = C.latteMid; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(CX + PAD + 7, iy, 6, 0, Math.PI * 2); ctx.stroke();
    ctx.font = "12px " + SANS; ctx.fillStyle = C.textMid;
    ctx.textAlign = "left";
    ctx.fillText(item, CX + PAD + 20, iy + 4);
  });

  y += CHECK_H;

  /* ── FOOTER ──────────────────────────── */
  hline(ctx, CX, y, CX + W - 40, false); y += 1;
  ctx.fillStyle = C.espresso;
  ctx.fillRect(CX, y, W - 40, FOOTER_H);
  ctx.font      = "italic 12px " + SERIF;
  ctx.fillStyle = "rgba(250,246,240,0.6)";
  ctx.textAlign = "center";
  ctx.fillText("Brew Your Focus  \u00b7  " + formatTimestamp(new Date(data.createdAt)),
               W / 2, y + FOOTER_H / 2 + 4);

  ctx.restore();
  return cv.toDataURL("image/png");
}

/* ============================================
   LOCALSTORAGE
   ============================================ */
var STORE_KEY = "brew_your_focus_logs";

function getLogs() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || "[]"); }
  catch (e) { return []; }
}

function saveLogs(logs) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(logs)); }
  catch (e) { /* quota exceeded or private mode */ }
}

function saveLog() {
  if (!window._currentBlend) { showToast("먼저 블렌드를 만들어주세요."); return; }

  var d     = window._currentBlend;
  var logs  = getLogs();
  var entry = {
    id:        Date.now().toString(),
    blendName: d.blend.blendName,
    task: d.task, mood: d.mood, seat: d.seat, drink: d.drink, vibe: d.vibe,
    playlist:  d.blend.playlist,
    mission:   d.blend.mission,
    createdAt: d.createdAt,
  };

  /* Prevent duplicate save within 2 seconds */
  var last = logs[0];
  if (last && last.blendName === entry.blendName &&
      Math.abs(Date.now() - new Date(last.createdAt).getTime()) < 2000) {
    showToast("이미 저장된 블렌드예요."); return;
  }

  logs.unshift(entry);
  saveLogs(logs);
  updateLogBadge();
  showToast("Saved to Café Log. ☕");
}

function deleteLog(id) {
  saveLogs(getLogs().filter(function(l) { return l.id !== id; }));
  updateLogBadge();
  renderLogs();
  showToast("기록이 삭제됐어요.");
}

function clearAllLogs() {
  if (!confirm("저장된 카공 기록을 모두 삭제할까요?")) return;
  saveLogs([]);
  updateLogBadge();
  renderLogs();
  showToast("모든 기록이 삭제됐어요.");
}

/* ============================================
   RENDER: LOGS SECTION
   ============================================ */
function renderLogs() {
  var logs      = getLogs();
  var emptyEl   = document.getElementById("logs-empty");
  var container = document.getElementById("logs-container");
  var clearWrap = document.getElementById("logs-clear-wrap");

  if (logs.length === 0) {
    emptyEl.style.display   = "block";
    container.innerHTML     = "";
    clearWrap.style.display = "none";
    return;
  }

  emptyEl.style.display   = "none";
  clearWrap.style.display = "block";
  container.innerHTML     = "";

  logs.forEach(function(log) {
    var card = document.createElement("div");
    card.className = "log-card";
    card.innerHTML =
      "<div class=\"log-card-header\">" +
        "<div>" +
          "<div class=\"log-blend-name\">" + escHtml(log.blendName) + "</div>" +
          "<div class=\"log-timestamp\">" + escHtml(formatTimestamp(new Date(log.createdAt))) + "</div>" +
        "</div>" +
        "<button class=\"log-delete-btn\" onclick=\"deleteLog('" + escHtml(log.id) + "')\" " +
          "aria-label=\"삭제\" title=\"삭제\">&#x2715;</button>" +
      "</div>" +
      "<div class=\"log-card-body\">" +
        "<div class=\"log-selections\">" +
          escHtml([log.task, log.mood, log.seat, log.drink, log.vibe].join("  ·  ")) +
        "</div>" +
        "<div class=\"log-mission\">" + escHtml(log.mission) + "</div>" +
        "<div class=\"log-playlist\">" +
          "<span>\u266a</span>" +
          "<a href=\"" + escHtml(log.playlist.url) + "\" target=\"_blank\" rel=\"noopener noreferrer\">" +
            escHtml(log.playlist.query) +
          "</a>" +
        "</div>" +
        (log.focusMin
          ? "<div class=\"log-focus-badge\">\u23f1 " + escHtml(String(log.focusMin)) + "min focused</div>"
          : "") +
      "</div>";
    container.appendChild(card);
  });
}

function updateLogBadge() {
  var badge = document.getElementById("log-count-badge");
  var count = getLogs().length;
  if (badge) badge.textContent = count > 0 ? String(count) : "";
}

/* ============================================
   FOCUS TIMER
   ============================================ */
var TIMER_TOTAL_SEC  = 25 * 60;
var TIMER_REMAIN_SEC = 25 * 60;
var TIMER_RUNNING    = false;
var TIMER_IV         = null;

function _timerRedraw() {
  var m      = Math.floor(TIMER_REMAIN_SEC / 60);
  var s      = TIMER_REMAIN_SEC % 60;
  var timeEl = document.getElementById("timer-time");
  var barEl  = document.getElementById("timer-bar");
  if (timeEl) timeEl.textContent = String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  if (barEl) {
    var pct = TIMER_TOTAL_SEC > 0
      ? ((TIMER_TOTAL_SEC - TIMER_REMAIN_SEC) / TIMER_TOTAL_SEC) * 100
      : 0;
    barEl.style.width = pct + "%";
  }
}

function _timerTick() {
  if (TIMER_REMAIN_SEC > 0) TIMER_REMAIN_SEC--;
  _timerRedraw();
  if (TIMER_REMAIN_SEC <= 0) {
    clearInterval(TIMER_IV);
    TIMER_IV      = null;
    TIMER_RUNNING = false;
    var startEl = document.getElementById("timer-start");
    var pauseEl = document.getElementById("timer-pause");
    var doneEl  = document.getElementById("timer-done");
    if (startEl) startEl.classList.remove("hidden");
    if (pauseEl) pauseEl.classList.add("hidden");
    if (doneEl)  doneEl.classList.remove("hidden");
    _timerAutoSave();
  }
}

function timerSetPreset(min) {
  if (TIMER_RUNNING) return;
  TIMER_TOTAL_SEC  = min * 60;
  TIMER_REMAIN_SEC = min * 60;
  document.querySelectorAll(".timer-preset").forEach(function(b) {
    b.classList.toggle("active", parseInt(b.dataset.min, 10) === min);
  });
  _timerRedraw();
}

function timerStart() {
  if (TIMER_RUNNING || TIMER_REMAIN_SEC <= 0) return;
  TIMER_RUNNING = true;
  var startEl = document.getElementById("timer-start");
  var pauseEl = document.getElementById("timer-pause");
  var doneEl  = document.getElementById("timer-done");
  if (startEl) startEl.classList.add("hidden");
  if (pauseEl) pauseEl.classList.remove("hidden");
  if (doneEl)  doneEl.classList.add("hidden");
  TIMER_IV = setInterval(_timerTick, 1000);
}

function timerPause() {
  if (!TIMER_RUNNING) return;
  clearInterval(TIMER_IV);
  TIMER_IV      = null;
  TIMER_RUNNING = false;
  var startEl = document.getElementById("timer-start");
  var pauseEl = document.getElementById("timer-pause");
  if (startEl) startEl.classList.remove("hidden");
  if (pauseEl) pauseEl.classList.add("hidden");
}

function timerReset() {
  clearInterval(TIMER_IV);
  TIMER_IV         = null;
  TIMER_RUNNING    = false;
  TIMER_REMAIN_SEC = TIMER_TOTAL_SEC;
  var startEl = document.getElementById("timer-start");
  var pauseEl = document.getElementById("timer-pause");
  var doneEl  = document.getElementById("timer-done");
  if (startEl) startEl.classList.remove("hidden");
  if (pauseEl) pauseEl.classList.add("hidden");
  if (doneEl)  doneEl.classList.add("hidden");
  _timerRedraw();
}

function _timerAutoSave() {
  if (!window._currentBlend) return;
  var d   = window._currentBlend;
  var min = Math.round(TIMER_TOTAL_SEC / 60);
  var logs  = getLogs();
  var now   = Date.now();
  var entry = {
    id:        now.toString(),
    blendName: d.blend.blendName,
    task:      d.task, mood: d.mood, seat: d.seat, drink: d.drink, vibe: d.vibe,
    playlist:  d.blend.playlist,
    mission:   d.blend.mission,
    createdAt: d.createdAt,
    focusMin:  min,
    savedAt:   new Date(now).toISOString(),
  };
  /* prevent duplicate within 5s */
  var last = logs[0];
  if (last && last.blendName === entry.blendName && last.focusMin === min &&
      Math.abs(now - new Date(last.savedAt || last.createdAt).getTime()) < 5000) {
    return;
  }
  logs.unshift(entry);
  saveLogs(logs);
  updateLogBadge();
  showToast("\u23f1 집중 완료! Café Log에 저장됐어요.");
}

/* expose to global scope so inline onclick always works */
window.timerSetPreset = timerSetPreset;
window.timerStart     = timerStart;
window.timerPause     = timerPause;
window.timerReset     = timerReset;

/* ============================================
   TOAST
   ============================================ */
var _toastTimer = null;

function showToast(msg) {
  var el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.remove("hidden");
  el.classList.add("show");
  if (_toastTimer) clearTimeout(_toastTimer);
  _toastTimer = setTimeout(function() {
    el.classList.remove("show");
    el.classList.add("hidden");
  }, 2600);
}

/* ============================================
   INIT
   ============================================ */
document.addEventListener("DOMContentLoaded", function() {
  /* Date display */
  var el = document.getElementById("receipt-date");
  if (el) el.textContent = formatDate(new Date()).date;

  /* Badge */
  updateLogBadge();

  /* Chip keyboard support */
  document.querySelectorAll(".chip").forEach(function(chip) {
    chip.setAttribute("tabindex", "0");
    chip.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        var inp = chip.querySelector("input");
        if (inp) { inp.checked = true; inp.dispatchEvent(new Event("change")); }
      }
    });
  });

  /* Clear field-missing on any selection change */
  document.querySelectorAll("input[type='radio']").forEach(function(inp) {
    inp.addEventListener("change", function() {
      var fs = inp.closest("fieldset");
      if (fs) fs.classList.remove("field-missing");
      /* If all selected, clear hint */
      var all = ["task","mood","seat","drink","vibe"].every(function(n) { return !!getVal(n); });
      if (all) {
        var hint = document.getElementById("brew-hint");
        if (hint) { hint.textContent = ""; hint.classList.remove("hint-error"); }
      }
    });
  });
});
