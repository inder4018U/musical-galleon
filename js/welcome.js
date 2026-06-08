/* =============================================================
   welcome.js — Welcome page interactions
   The Musical Galleon
   ============================================================= */

const GENRES = [
  { name: 'Pop',          file: 'genres/pop.html'        },
  { name: 'Rap / Hip-Hop',file: 'genres/rap.html'        },
  { name: 'R&B',          file: 'genres/rnb.html'        },
  { name: 'Rock',         file: 'genres/rock.html'       },
  { name: 'Lo-Fi',        file: 'genres/lofi.html'       },
  { name: 'Jazz',         file: 'genres/jazz.html'       },
  { name: 'Blues',        file: 'genres/blues.html'      },
  { name: 'Phonk',        file: 'genres/phonk.html'      },
  { name: 'Electronic',   file: 'genres/elec.html'       },
  { name: 'Indie Pop',    file: 'genres/indiepop.html'   },
  { name: 'Classical',    file: 'genres/classical.html'  },
  { name: 'Psychedelic',  file: 'genres/psychedelic.html'},
  { name: 'Reggae',       file: 'genres/reggae.html'     },
  { name: 'Funk',         file: 'genres/funk.html'       },
  { name: 'Ambient',      file: 'genres/ambient.html'    },
  { name: 'Country',      file: 'genres/country.html'    },
  { name: 'Emo / Punk',   file: 'genres/emopunk.html'    },
];

function randomGenre() {
  const pick   = GENRES[Math.floor(Math.random() * GENRES.length)];
  const result = document.getElementById('random-result');

  result.style.display = 'block';
  result.textContent   = 'The sea has spoken: ' + pick.name;

  setTimeout(() => {
    window.location.href = pick.file;
  }, 1400);
}
