# Sach Batao Na 🎤

A playful, teasing single‑page web experiment that pretends to “listen” to your voice and then exposes your **“innocent”** claim with a dramatic **jhoot detected** moment.

Built as a lightweight, fun CS project — no backend, no real voice analysis, just vibes.

---

## 📌 Description

**Sach Batao Na 🎤** asks for microphone permission, shows a fake listening animation, and guides the user through a short “innocence test”. After making them say:

> “Main bilkul innocent hoon” 😇

…the site calmly declares:

> **❌ Jhoot detected**  
> Innocent log itna hesitate nahi karte 😌

All in a light, teasing, non‑creepy tone — inspired by Instagram / Reels style humor.

---

## 🚀 Features

- Mic permission handling using the browser’s `getUserMedia`
- Fake “listening” sequence with animated sound wave
- Timed, playful text transitions:
  - “Hmm… sun rahi hoon 👂”
  - “Acha… interesting 😏”
  - “Tum thori zyada cute awaaz mein baat karti ho ya mujhe lag raha hai?”
  - “Bas aik sentence bolo: ‘Main bilkul innocent hoon’ 😇”
- Punchline screen:
  - **❌ Jhoot detected**
  - Teasing but friendly follow‑up messages
- Clean, pastel, mobile‑friendly UI
- Fully client‑side — no audio is stored or processed

---

## 🛠️ Tech Used

- **HTML** – Structure and content
- **CSS** – Pastel UI, rounded buttons, animations
- **JavaScript (Vanilla)** – Screen flow, mic permission, fake listening logic

No frameworks. No libraries. No backend.

---

## 🎤 How It Works (High Level)

1. **Landing Screen**  
   - Introduces the “innocent test” with playful text.  
   - Button: **Start (I’m not scared)**

2. **Microphone Permission**  
   - Explains that audio is not recorded or saved.  
   - Button: **Allow Microphone**  
   - Calls `navigator.mediaDevices.getUserMedia({ audio: true })`.

3. **Fake Listening Phase**  
   - Shows an animated sound wave.
   - Cycles through fun messages every ~1.5 seconds.
   - Ends by asking the user to say:  
     _“Main bilkul innocent hoon”_ 😇  
   - No real audio is analyzed — just `setInterval` + `setTimeout`.

4. **Funny Twist**  
   - After a short delay:  
     - Big text: **❌ Jhoot detected**  
     - “Innocent log itna hesitate nahi karte 😌”  
     - “Relax, mazaaq tha 😄 Tumhari reaction bohot cute thi.”

5. **End Screen**  
   - “Project complete ✔️ Marks milne chahiye ya nahi? 😜”  
   - Buttons:
     - **Restart**
     - **Take Screenshot 📸** (purely visual, no functionality)

If the user **denies mic permission**, the app shows:

> Mic ke bina maza nahi aata 😔  
> Retry karo?

and lets them try again.

---

## ⚠️ Disclaimer

This project **does not record, store, or upload any audio.**

- Microphone access is requested only via the browser’s native API.
- The stream is immediately **stopped** after permission is granted.
- All effects are purely **simulated** for fun and interaction.

---

## 📂 Project Structure

```text
sach-batao-na/
├── index.html    # Main single-page app
├── style.css     # Styles / layout / animations
├── script.js     # Screen flow + mic permission + fake listening
├── README.md     # Project docs
└── assets/       # (Optional) icons or images