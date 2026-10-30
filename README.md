# Bubble-Math

A relaxing mental-math game set on a cartoon beach. Bubbles with equations fall toward the sand. Type the answer to pop each one before it lands. You have 5 lives.

**Play it:** [https://ekta-bhoraniya.github.io/Bubble-Math/](https://ekta-bhoraniya.github.io/Bubble-Math/)

## How to play

- Type the answer to an equation bubble. It pops as soon as your number matches.
- A bubble that lands on the sand costs one life, and the game ends when all 5 lives are gone.
- Press **M** to mute or unmute the sound. Use the **Quit** button to end a round.
- Only bubbles that are fully on screen can be answered.
- If your number could be the start of a longer answer on another bubble (for example 1 and 12), the game waits 0.65 seconds before popping the shorter one. A bubble that reaches the sand during that wait is held until the wait ends, so you still get the point.

## Level-up logic

The game has 9 levels. You move up to the next level when **both** of these are true:

1. You have popped **6 bubbles in a row** in the current level.
2. You have spent at least **25 seconds** in the current level.

Details:

- The streak breaks only when an equation bubble lands on the sand (a lost life). Typing a wrong number does not break it.
- If you reach 6 in a row before 25 seconds have passed, the streak keeps counting and the level-up happens as soon as the 25 seconds are over.
- The streak and the 25-second timer both reset to 0 when a new level starts.
- Levels only go up, never down. Level 9 is the last one.
- Points per pop are 10 plus 5 for each level above the first, so a pop is worth 10 on level 1 and 50 on level 9.
- Each level-up plays applause and shows a "Level N" banner.

## What the equations look like

| Level | Add / subtract (numbers up to) | Multiply | Divide (divisor × answer) |
|---|---|---|---|
| 1 | 9 | none | none |
| 2 | 9 | 2–5 × 2–5 | none |
| 3 | 15 | 2–5 × 2–5 | 2–5 × 2–5 |
| 4 | 25 | 2–9 × 2–9 | 2–9 × 2–9 |
| 5 | 50 | 2–12 × 2–9 | 2–9 × 2–12 |
| 6 | 100 | 2–15 × 2–9 | 2–12 × 2–12 |
| 7 | 300 | 2–25 × 2–9 | 2–12 × 2–15 |
| 8 | 600 | 2–40 × 2–9 | 2–12 × 2–20 |
| 9 | 999 | 2–60 × 2–9 | 2–12 × 2–25 |

- Subtraction never gives a negative answer.
- Division always comes out even, with no remainders. The game picks the divisor and the answer first, then shows their product.
- Whenever a multiplication has a number above 50, the other number is a single digit.
- Question mix: level 1 is 50% addition and 50% subtraction. Level 2 is 40% addition, 40% subtraction and 20% multiplication. From level 3 on it is 30% addition, 30% subtraction, 20% multiplication and 20% division.
- No two bubbles on screen ever have the same answer.

## How many bubbles, and how fast

At most 6 equation bubbles are on screen at once, alongside 100 plain decorative bubbles.

| Time into the game | Equation bubbles allowed |
|---|---|
| 0 to 3 s | 2 |
| 3 to 4 s | 3 |
| 4 to 5 s | 4 |
| 5 s onward | 6 |

A new equation bubble appears whenever there are fewer than the allowed number, with at least 0.7 seconds between spawns. The count and the fall speed never change after the first few seconds. Only the equations get harder.

## Time to answer a bubble

Every equation bubble gets a random fall speed when it appears:

```
speed = screen height x (0.0525 to 0.0725) per second
```

The time you have is counted from the moment the bubble is fully on screen (when it can first be answered) until it touches the sand:

```
time to answer = distance to the sand / speed
```

For a typical 800-pixel-tall window the distance is about 600 pixels, so:

| Bubble | Speed | Time to answer |
|---|---|---|
| Slowest | about 42 px/s | about 14.3 s |
| Average | about 50 px/s | about 12 s |
| Fastest | about 58 px/s | about 10.3 s |

Because the speed scales with the screen height, taller and shorter windows give almost the same time. The time is the same for every bubble and every level. Longer equations make slightly larger bubbles, which become fully visible a little later and cost a fraction of a second.

## Tech

A single `index.html` with no build step and no dependencies. Graphics are drawn on a canvas, and all sounds (ocean ambience, pop, wrong answer, applause) are synthesized with the Web Audio API. The only external request is the Baloo 2 font from Google Fonts. Your best score is saved in your browser.

Built for desktop with a keyboard. Mobile support is planned.
