# The Musical Galleon

A music genre recommendation web app built as a 12th grade Web Applications project.

Answer 8 psychological questions and the Galleon tells you which music genre fits your personality. No algorithms, no streaming API, no frameworks — just HTML, CSS, and JavaScript.

---

## What It Does

- Login screen with a pirate-themed intro
- Welcome page with scrolling album art columns
- 8-question quiz with a weighted scoring system across 17 genres
- Individual result pages for each genre with facts, history, top artists, albums, singles, playlists, genre stats, and two Spotify embed recommendations
- About section and Google Form feedback on every result page
- Random genre picker on the welcome screen

---

## Genres Covered

Pop, Rap / Hip-Hop, R&B, Rock, Lo-Fi, Jazz, Blues, Phonk, Electronic, Indie Pop, Classical, Psychedelic, Reggae, Funk, Ambient, Country, Emo / Punk

---

## Project Structure

```
musical_galleon/
├── index.html              Login and intro screen
├── welcome.html            Home screen with album columns
├── quiz.html               8-question quiz
│
├── genres/                 One HTML file per genre result page
│   ├── pop.html
│   ├── rap.html
│   ├── rnb.html
│   ├── rock.html
│   ├── lofi.html
│   ├── jazz.html
│   ├── blues.html
│   ├── phonk.html
│   ├── elec.html
│   ├── indiepop.html
│   ├── classical.html
│   ├── psychedelic.html
│   ├── reggae.html
│   ├── funk.html
│   ├── ambient.html
│   ├── country.html
│   └── emopunk.html
│
├── css/
│   ├── base.css            Shared variables, reset, typography, buttons, nav
│   ├── login.css           Styles for index.html
│   ├── welcome.css         Styles for welcome.html
│   ├── quiz.css            Styles for quiz.html
│   └── genre.css           Shared styles for all genre result pages
│
├── js/
│   ├── login.js            Login validation and intro transition
│   ├── welcome.js          Random genre picker
│   └── quiz.js             Quiz engine: questions, scoring, result routing
│
└── assets/
    ├── backgrounds/        GIF backgrounds used across pages
    └── images/
        └── albums/         Album art shown in the welcome page columns
```

---

## How the Quiz Works

Each of the 8 questions has 5 answer options. Every option carries a score map that awards points to one or more genre keys. After all questions are answered, the genre with the highest total score wins and the user is redirected to that genre's result page.

Ties are broken by the order genres appear in the `GENRE_FILES` object in `quiz.js`.

The questions are designed to be psychological rather than direct — they ask about behaviour, emotional state, and instinct rather than music preference, to produce more accurate and surprising results.

---

## How to Run

No build step, no dependencies, no server required.

1. Download or clone the repository
2. Open `index.html` in any modern browser

Default login credentials:
- Username: `User`
- Password: `admin`

To change the credentials, edit the `validateLogin` function in `js/login.js`.

---

## Fonts

All fonts are loaded from Google Fonts:

- Cinzel Decorative — display titles
- Cinzel — headings, labels, UI text
- IM Fell English — body and intro text
- Barlow — genre page body content

---

## Feedback Form

The feedback button on every genre result page links to a Google Form. 

---

## Credits

Built by Inder as a 12th grade Web Applications project.

All artist, album, and playlist data is real and manually curated. Genre stats are approximate figures based on publicly available data and are not live.

Spotify embeds are used under Spotify's embed policy for non-commercial use.
