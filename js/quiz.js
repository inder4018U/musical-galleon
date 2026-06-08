/* =============================================================
   quiz.js — Quiz engine: questions, scoring, routing
   The Musical Galleon

   Scoring system:
     Each answer awards points to one or more genre keys.
     After all 8 questions the genre with the highest total wins.
     Ties are broken by the order genres appear in GENRE_FILES.
   ============================================================= */

/* ── Genre file map ────────────────────────────────────────── */
const GENRE_FILES = {
  pop:          'genres/pop.html',
  rap:          'genres/rap.html',
  rnb:          'genres/rnb.html',
  rock:         'genres/rock.html',
  lofi:         'genres/lofi.html',
  jazz:         'genres/jazz.html',
  blues:        'genres/blues.html',
  phonk:        'genres/phonk.html',
  elec:         'genres/elec.html',
  indiepop:     'genres/indiepop.html',
  classical:    'genres/classical.html',
  psychedelic:  'genres/psychedelic.html',
  reggae:       'genres/reggae.html',
  funk:         'genres/funk.html',
  ambient:      'genres/ambient.html',
  country:      'genres/country.html',
  emopunk:      'genres/emopunk.html',
};

/* ── Questions ─────────────────────────────────────────────── */
/*
   Each question has:
     q    — question text
     sub  — italic subtext shown beneath the question
     opts — array of answer objects, each with:
       t  — display text
       s  — score map { genreKey: points, ... }
*/
const QUESTIONS = [
  {
    q: "It's 2 AM. You can't sleep. What do you reach for?",
    sub: "Trust yer instinct — answer from the gut, not the head.",
    opts: [
      { t: "Your phone — scrolling through memes and videos",          s: { pop: 2, rap: 2, elec: 1 } },
      { t: "A book or a film — something to disappear into",            s: { lofi: 3, indiepop: 2, classical: 1, ambient: 2 } },
      { t: "Music — loud, to match the thoughts racing around",         s: { emopunk: 3, rock: 2, phonk: 2, blues: 1 } },
      { t: "Nothing. You sit in the silence and let it breathe",        s: { ambient: 3, jazz: 2, classical: 2, blues: 1 } },
      { t: "Someone to talk to — you hate being alone at 2 AM",        s: { rnb: 3, funk: 2, reggae: 2, pop: 1 } },
    ],
  },
  {
    q: "Which of these scenes feels most like home to you?",
    sub: "Close yer eyes and pick the one that pulls ye in.",
    opts: [
      { t: "A crowded rooftop party, city lights below, music too loud to talk over", s: { pop: 2, elec: 3, phonk: 2, rap: 1 } },
      { t: "A dimly lit jazz bar — strangers, cigarette smoke, a trumpet",             s: { jazz: 3, blues: 2, rnb: 2, funk: 1 } },
      { t: "A forest trail at golden hour, headphones in, completely alone",           s: { ambient: 3, indiepop: 2, lofi: 2, psychedelic: 1 } },
      { t: "A basement show — sweaty, screaming, everyone knows every word",          s: { emopunk: 3, rock: 3, rap: 1 } },
      { t: "Your bedroom at dusk, half-lit, doing something creative",                s: { lofi: 3, indiepop: 2, rnb: 1, classical: 1 } },
    ],
  },
  {
    q: "Someone asks what kind of person you are. You instinctively say...",
    sub: "No right answers. No wrong ones either.",
    opts: [
      { t: "Laid back. I just let things happen",                          s: { reggae: 3, lofi: 2, ambient: 2, country: 1 } },
      { t: "Intense. I feel everything too deeply",                        s: { emopunk: 3, blues: 3, rock: 2, psychedelic: 1 } },
      { t: "Curious. I question everything, always digging deeper",        s: { psychedelic: 3, jazz: 2, classical: 2, indiepop: 1 } },
      { t: "Energetic. I'm the one who makes things happen",               s: { pop: 2, rap: 3, funk: 3, elec: 1 } },
      { t: "Nostalgic. I live for vibes, memories, feelings",              s: { rnb: 3, lofi: 2, country: 2, blues: 1 } },
    ],
  },
  {
    q: "You have a completely free Saturday — no plans, no obligations. How does it unfold?",
    sub: "Be honest. What actually happens.",
    opts: [
      { t: "You go out looking for something — a new place, a new face",         s: { pop: 2, funk: 2, reggae: 2, rap: 1 } },
      { t: "You create something — write, draw, make, build",                    s: { indiepop: 3, lofi: 2, classical: 2, psychedelic: 1 } },
      { t: "You spiral into deep dives — documentaries, Wikipedia, rabbit holes",s: { psychedelic: 2, jazz: 2, classical: 3, ambient: 1 } },
      { t: "You work out, train, get after it — movement is therapy",            s: { phonk: 3, rock: 2, rap: 2, elec: 1 } },
      { t: "You do absolutely nothing and feel zero guilt about it",             s: { lofi: 3, ambient: 3, reggae: 2 } },
    ],
  },
  {
    q: "Pick the emotional texture that best describes yer inner world right now.",
    sub: "Not how ye want to feel — how ye actually feel.",
    opts: [
      { t: "Warm and steady — things are good, you're content",           s: { pop: 2, rnb: 2, reggae: 3, country: 2 } },
      { t: "Electric — something is building, you can feel it",           s: { elec: 3, phonk: 2, rap: 2, rock: 1 } },
      { t: "Clouded — heavy thoughts, something unsaid",                  s: { blues: 3, emopunk: 3, lofi: 2, ambient: 1 } },
      { t: "Floating — detached, observing, strangely peaceful",          s: { ambient: 3, psychedelic: 3, lofi: 2, jazz: 1 } },
      { t: "Sharp — focused, driven, like something's at stake",          s: { classical: 2, rap: 3, rock: 2, phonk: 1 } },
    ],
  },
  {
    q: "You're in a film. Which moment are ye in right now?",
    sub: "Yer life, directed cinematically.",
    opts: [
      { t: "The montage — things are moving fast, everything is vivid",          s: { pop: 2, elec: 2, rap: 2, funk: 2 } },
      { t: "The quiet scene — the character stares out a window, no dialogue",   s: { ambient: 3, lofi: 3, blues: 2, indiepop: 1 } },
      { t: "The climax — confrontation, revelation, something breaks open",      s: { rock: 3, emopunk: 3, rap: 2, classical: 1 } },
      { t: "The road trip — windows down, destination unclear",                  s: { country: 3, indiepop: 2, reggae: 2, rock: 1 } },
      { t: "The flashback — you're somewhere in the past, soft and saturated",   s: { rnb: 3, blues: 2, lofi: 2, country: 1 } },
    ],
  },
  {
    q: "What do ye want music to do for ye?",
    sub: "The truest question of them all.",
    opts: [
      { t: "Move my body — I want to feel it physically",                      s: { funk: 3, elec: 3, phonk: 2, pop: 1, rap: 1 } },
      { t: "Understand me — I want to feel less alone in what I feel",         s: { rnb: 3, blues: 3, emopunk: 2, indiepop: 1 } },
      { t: "Expand my mind — take me somewhere I've never been",               s: { psychedelic: 3, classical: 3, jazz: 2, ambient: 2 } },
      { t: "Hype me up — I need fire, energy, momentum",                       s: { rap: 3, phonk: 3, rock: 2, elec: 1 } },
      { t: "Leave me alone — background texture, presence without demand",     s: { lofi: 3, ambient: 3, classical: 2, jazz: 1 } },
    ],
  },
  {
    q: "Last one. Which of these do ye feel in yer chest?",
    sub: "The one that hits — not the one that sounds smart.",
    opts: [
      { t: '"I want to forget everything and just dance."',                              s: { funk: 3, pop: 3, elec: 2, reggae: 1 } },
      { t: '"I\'ve been trying to say something and I don\'t know how."',                s: { blues: 3, emopunk: 3, indiepop: 2, rnb: 1 } },
      { t: '"There\'s something beautiful about how temporary everything is."',          s: { lofi: 3, ambient: 2, jazz: 2, psychedelic: 2, country: 1 } },
      { t: '"I am capable of so much more than anyone can see."',                        s: { rap: 3, rock: 3, classical: 2, phonk: 1 } },
      { t: '"I just want to feel good. That\'s enough."',                                s: { reggae: 3, rnb: 2, pop: 2, country: 2 } },
    ],
  },
];

/* ── State ─────────────────────────────────────────────────── */
let currentIndex = 0;
let answers      = new Array(QUESTIONS.length).fill(null); // index of selected option per question

/* ── Render ────────────────────────────────────────────────── */
function render() {
  const q      = QUESTIONS[currentIndex];
  const card   = document.getElementById('quiz-card');
  const total  = QUESTIONS.length;
  const labels = ['A', 'B', 'C', 'D', 'E'];

  // Update nav
  document.getElementById('nav-label').textContent =
    'Question ' + (currentIndex + 1) + ' of ' + total;
  document.getElementById('progress-fill').style.width =
    (((currentIndex + 1) / total) * 100) + '%';

  // Re-trigger animation
  card.style.animation = 'none';
  void card.offsetWidth;
  card.style.animation = 'cardIn 0.45s ease both';

  // Build options HTML
  const optionsHTML = q.opts.map((opt, i) => {
    const isSelected = answers[currentIndex] === i ? 'selected' : '';
    return (
      '<div class="option ' + isSelected + '" onclick="selectOption(' + i + ')">' +
        '<span class="opt-letter">' + labels[i] + '</span>' +
        '<span>' + opt.t + '</span>' +
      '</div>'
    );
  }).join('');

  const backBtn = currentIndex > 0
    ? '<button class="btn btn-ghost" onclick="goBack()">Back</button>'
    : '<div></div>';

  const nextLabel = currentIndex < total - 1 ? 'Next' : 'See My Genre';

  card.innerHTML =
    '<div class="q-number">Question ' + (currentIndex + 1) + ' / ' + total + '</div>' +
    '<div class="q-text">' + q.q + '</div>' +
    '<div class="q-sub">' + q.sub + '</div>' +
    '<div class="divider q-divider"></div>' +
    '<div class="options">' + optionsHTML + '</div>' +
    '<div class="btn-row">' +
      backBtn +
      '<button class="btn btn-next" onclick="goNext()">' + nextLabel + ' &rarr;</button>' +
    '</div>';
}

function selectOption(index) {
  answers[currentIndex] = index;
  render();
}

function goBack() {
  if (currentIndex > 0) {
    currentIndex--;
    render();
  }
}

function goNext() {
  if (answers[currentIndex] === null) {
    shakeCard();
    return;
  }

  if (currentIndex < QUESTIONS.length - 1) {
    currentIndex++;
    render();
  } else {
    computeResult();
  }
}

function shakeCard() {
  const card = document.getElementById('quiz-card');
  const steps = [-8, 8, -4, 4, 0];
  steps.forEach((x, i) => {
    setTimeout(() => { card.style.transform = 'translateX(' + x + 'px)'; }, i * 70);
  });
}

/* ── Result computation ────────────────────────────────────── */
function computeResult() {
  const totals = {};

  QUESTIONS.forEach(function (q, qi) {
    const selectedIndex = answers[qi];
    if (selectedIndex === null) return;

    const scoreMap = q.opts[selectedIndex].s;
    Object.keys(scoreMap).forEach(function (genre) {
      totals[genre] = (totals[genre] || 0) + scoreMap[genre];
    });
  });

  // Sort by score descending; ties broken by key order in GENRE_FILES
  const sorted = Object.entries(totals).sort(function (a, b) { return b[1] - a[1]; });
  const topGenre = sorted[0][0];

  window.location.href = GENRE_FILES[topGenre];
}

/* ── Init ──────────────────────────────────────────────────── */
render();
