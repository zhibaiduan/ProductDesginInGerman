# Product Spec: Germany Compliance Learning Cards

## 1. Product Definition

A scenario-based, card-driven learning product that helps users understand
what they can and cannot do when building digital products in the German market.

The product is NOT:
- A legal documentation tool
- A comprehensive law database
- A free-form chatbot

The product IS:
- A structured learning experience
- A guided cognitive journey
- A constraint-based knowledge system

---

## 2. Design Principles (STRICT)

### 2.1 One Card = One Idea

Each card MUST:
- Contain exactly ONE core concept
- Be understandable within 10 seconds
- Be actionable without external context

DO NOT:
- Combine multiple concepts
- Write long explanations
- Add unnecessary background

---

### 2.2 Action-Oriented, Not Knowledge-Oriented

Each card MUST answer at least one:

- What you cannot do
- What you should do instead
- Why this matters in product design

DO NOT:
- Explain laws in abstract terms
- Use academic/legal language

---

### 2.3 Product Language Only

All content MUST be translated into product context:

Use:
- "Sign-up flow"
- "User data"
- "Tracking"
- "AI automation"

DO NOT use:
- Pure legal descriptions
- Untranslated legal jargon

---

### 2.4 Cognitive Load Control

Each card MUST:

- Max 6 bullet points
- Max 120 words
- 1 key takeaway sentence

Goal:
User should NOT feel like "studying"

---

### 2.5 Consistent Structure (MANDATORY)

Every card MUST follow this structure:

[LEVEL ICON] Title

📍 Scenario
🚫 What you cannot do
✅ What to do instead
📜 Source
💡 Key takeaway

NO deviation allowed.

---

### 2.6 Progressive Narrative (CRITICAL)

Cards MUST follow a learning progression:

1. Mindset (why this matters)
2. Red lines (what breaks)
3. Risk areas (what to be careful about)
4. Best practices (how to do better)
5. Integration (how to apply)

DO NOT:
- Randomize order
- Mix levels without logic

---

## 3. Card Level System

### 🧱 Red Line (Illegal)
- Must NOT be violated
- Clear "cannot do"
- High risk

### 🟧 Orange Line (Risky)
- Context-dependent
- Requires careful design

### ✨ Bonus (Best Practice)
- Improves trust and UX
- Not legally required

---

## 4. Writing Rules (STRICT)

### 4.1 Language

- Default: English
- Tone: Direct, neutral, practical
- No emotional tone
- No marketing language
- Using german termnology when necessary, please check related rules.

---

### 4.2 German Terminology Usage Rules

    1. Default language: English
    2. German terms are used ONLY when:
    - It is a legal concept defined in German law
    - It appears in real UI / documents in Germany
    - It is commonly used by local professionals

       3. Format (MANDATORY):
    English term (German term)

       Example:
    Consent (Einwilligung)

       4. Do NOT:
    - Translate entire sentences into German
    - Overuse German terms
    - Add German if it does not add clarity

       5. Max usage:
    - 1–2 German terms per card

---

### 4.3 Sentence Style

Use:
- Short sentences
- Imperative statements

Example:
- "Do not pre-select consent"
- "Only collect necessary data"

Avoid:
- "It is recommended that..."
- "In many cases..."

---

### 4.4 Forbidden Content

DO NOT include:
- Long paragraphs
- Legal citations beyond reference
- Vague terms like "may", "could", "sometimes"

---

## 5. Card Template (FINAL)
🧱 Red Card Template

🧱 Title

📍 Scenario
	•	…

🚫 What you cannot do
	•	…

✅ What to do instead
	•	…

📜 Source (optional)
	•	…

💥 Case (optional)
	•	…

💡 Key takeaway
	•	One sentence only

⸻

🟧 Orange Card Template

🟧 Title

📍 Scenario
	•	…

⚠️ Why this is risky
	•	…

✅ What to consider
	•	…

📜 Source (optional)
	•	…

💥 Case (optional)
	•	…

💡 Key takeaway
	•	One sentence only

⸻

✨ Green Card Template

✨ Title

📍 Scenario
	•	…

❌ Common mistake
	•	…

✅ Better approach
	•	…

📜 Source (optional)
	•	…

💥 Case (optional)
	•	…

💡 Key takeaway
	•	One sentence only

---


### 5.1 Source (Flexible)

Source is OPTIONAL.

It can be:
- Law (e.g. GDPR)
- Guideline / principle (e.g. UX / industry practice)
- Internal best practice
- Empty (if not necessary)

Format:
📜 Source
- ...

If no meaningful source → REMOVE this section

---

### 5.2 Case (MANDATORY but minimal)

Each card SHOULD include one case, but it can be skipped if not helpful.

Format:
💥 Case
- One-line title only

Structure:
[Entity] — [reason], [consequence]

Examples:
- Google — improper cookie consent, fined €150M
- H&M — excessive employee data collection, fined €35.3M

Rules:
- ≤ 15 words
- No link required
- No explanation
- Focus on clarity, not completeness



## 6. Quiz Design Rules (MANDATORY)

1. Trigger
- Insert 1 quiz after every 1–2 cards
- Always based on the PREVIOUS card

2. Purpose
- Reinforce one concept only
- Simulate real product decision

3. Format
- Keep it ≤ 30 seconds to answer
- No explanation before answering

4. Types (allowed)
- Scenario judgment (primary)
- Case reflection
- Quick choice (A/B)

5. Feedback (CRITICAL)
After answer, MUST show:
- Correct / Incorrect
- One-line explanation
- Link back to card concept

6. Tone
- Practical, not academic
- Sounds like real product situation
  

## 7. Learning Flow (v1)

### Phase 1: Mindset

Card 1 — Why Germany is different  
Card 2 — Red/Orange/Bonus system  

---

### Phase 2: Red Lines (Core)

Card 3 — Consent (no pre-ticked)  
Card 4 — Data minimization  
Card 5 — Tracking without consent  

---

### Phase 3: Risk Areas

Card 6 — AI automated decisions  
Card 7 — Data transparency  

---

### Phase 4: Best Practices

Card 8 — Explain why data is collected  

---

### Phase 5: Integration

Card 9 — Compliance framework  
Card 10 — Pre-launch checklist  

---

## 8. Output Constraints (FOR AI / DOWNSTREAM)

When generating cards:

MUST:
- Follow exact template
- Use bullet points
- Keep within word limit
- Stay within one concept

MUST NOT:
- Add explanations outside template
- Change structure
- Add extra sections

---

## 9. Quality Check (REQUIRED)

Before output, verify:

- [ ] One card = one idea
- [ ] Clear "cannot do"
- [ ] Clear "what to do"
- [ ] Product context present
- [ ] ≤120 words
- [ ] Structure correct

If any fails → REWRITE

