# ⚡ Intern Alert
> *"JEE se lekar Job tak, hum saath denge."*

Hey there! Welcome to Intern Alert. 

I built this high-converting, single-page web app for an APM assignment. It's a fun proof-of-concept designed to see if students actually want an internship alerting service. I went with a sleek dark theme because, let's be real, we all love that early-stage stealth startup vibe, and it instantly builds trust with developers and students.

---

## The "Why" Behind Intern Alert

**The problem we've all faced:** Scrolling through fragmented job boards, applying to "ghost jobs," and finding out about that dream internship right after the deadline passed. It's exhausting. 
**The fix:** "Never miss an internship again. Curated roles delivered straight to your inbox."

### Product Decisions I Made:
1. **Keeping it Simple vs. Asking for Everything:** 
   Nobody likes filling out a 10-page form just to join a waitlist. To get as many people on board as possible, I kept it to Name, Email, and **Target Role** (like SDE or APM). It's the bare minimum needed to actually send relevant alerts without scaring people away.
2. **Building Trust from the Get-Go:** 
   Since this is a brand new project without a big name behind it, the UI has to do the heavy lifting to look legit. 
   - There's a cool animated "Live" pulse showing waitlist numbers.
   - A smooth marquee showcasing top universities.
   - Clear privacy text right by the submit button so nobody worries about getting spammed.
3. **Speed to Market:** 
   Instead of spinning up a heavy SQL or Postgres database, I decided to prove the concept fast using Express and a simple CSV file backend. It mimics how you'd hook up Google Sheets, keeps cloud costs at absolute zero, and lets me test the waters instantly.

---

## Cool Features & What I'm Tracking

| Feature | What it does | Why it matters (APM Metric) |
|---------|-------------|------------------|
| **Sleek Dark UI** | Uses the `Inter` font, glassmorphism, and neon glows to catch the eye of software students. | Session Duration & Bounce Rate |
| **Instant Feedback** | Form submissions are handled via DOM manipulation—no jarring page reloads, just an instant "You're on the list!" | Conversion Rate |
| **Admin Dashboard** | A secret route (`/admin`) that acts like an internal Google Sheets viewer. Polls the database to show leads rolling in live. | Pipeline Visibility |
| **CSV Export** | A quick `Download CSV` button on the backend so I can grab the lead list and actually send out those email campaigns! | Execution Speed |

---

## Want to Run It Locally?

If you want to poke around the code or run it yourself, here's how:

**Make sure you have [Node.js](https://nodejs.org/) installed first!**

### Installation Steps

1. **Clone it and dive in:**
   ```bash
   cd intern-alert
   ```

2. **Install the goodies:**
   This grabs standard stuff like `express` for the server, and some CSV utilities to manage our "database".
   ```bash
   npm install
   ```

3. **Fire it up:**
   ```bash
   node server.js
   ```

### Checking it out

Once your terminal yells `🚀 Server running locally!`, you're good to go:

- **1. Experience it as a User:**
  Head over to `http://localhost:3000`
  *Try it out:* Put in a test name, email, and role to see the smooth, instant submission flow.

- **2. See the APM Side:**
  Go to `http://localhost:3000/admin`
  *Try it out:* Watch your test submission pop up automatically on the dashboard. Click **"Download CSV"** to grab the active list!

---
*Built from scratch with Vanilla HTML/CSS/JS and Node.js to validate an idea fast.*