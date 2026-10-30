# Bubble-Math
A relaxing mental-math game set on a cartoon beach. Bubbles with equations fall toward the sand. Type the answer to pop each one before it lands. You have 5 lives.

**Play it:** https://YOUR-USERNAME.github.io/bubble-math-beach/

## How to play

- Type the answer to an equation bubble. It pops as soon as your number matches.
- A bubble that lands on the sand costs one life.
- Move up a level by popping 6 bubbles in a row after at least 25 seconds in the level.
- Press **M** to mute or unmute the sound. Use the **Quit** button to end a round.

## Levels

| Level | Add / subtract (up to) | Multiply | Divide |
|---|---|---|---|
| 1 | 9 | none | none |
| 2 | 9 | 2–5 × 2–5 | none |
| 3 | 15 | 2–5 × 2–5 | 2–5 |
| 4 | 25 | 2–9 × 2–9 | 2–9 |
| 5 | 50 | 2–12 × 2–9 | up to 12 answers |
| 6 | 100 | 2–15 × 2–9 | divisor up to 12 |
| 7 | 300 | 2–25 × 2–9 | answers up to 15 |
| 8 | 600 | 2–40 × 2–9 | answers up to 20 |
| 9 | 999 | 2–60 × 2–9 | answers up to 25 |

## Tech

A single `index.html` with no build step and no dependencies. Graphics are drawn on a canvas, and all sounds are synthesized with the Web Audio API. The only external request is the Baloo 2 font from Google Fonts. Your best score is saved in your browser.

Built for desktop with a keyboard. Mobile support is planned.
