# Office Hours Review: Germany Compliance Learning Cards

Generated on 2026-04-16
Source document: `Markdown.md`
Status: REVIEWED

## What This Spec Already Gets Right

- It has a clear content philosophy: one card, one idea, low cognitive load, product-language only.
- It avoids a common trap in compliance products: becoming a law encyclopedia instead of a decision aid.
- The red/orange/bonus system gives the product a usable mental model.
- The progressive narrative is directionally strong. It suggests a course, not a pile of facts.

## The Core Problem

This is currently a strong **content writing spec**, but not yet a full **product requirements doc**.

Right now it defines:
- how cards should be written
- how information should be structured
- a rough curriculum order

It does not yet fully define:
- who the primary user is
- what real decision they are trying to make
- what product surface this lives in
- how the user moves from card to card
- what outcome means the product worked

My read: the document is very clear about **format quality**, but still under-specified on **product behavior**.

## Highest-Leverage Findings

### 1. The target user is still abstract

The phrase "users understand what they can and cannot do when building digital products in the German market" is too broad.

Possible users here are very different:
- an indie founder shipping their first SaaS
- a product designer localizing for Germany
- a PM at an international company
- a junior operator trying not to make a compliance mistake

These people do not need the same examples, tone, or depth. Until one primary user is chosen, the cards risk sounding correct but generic.

### 2. The spec defines content structure better than user outcome

The current spec tells me how to write a good card, but not what the user should be able to do after finishing the flow.

For example, should the user be able to:
- review a signup flow and spot red flags
- decide whether a tracking pattern is allowed
- explain German compliance risk to a teammate
- ship a launch checklist with confidence

These are different products. A learning product without an explicit post-learning capability usually feels polished but weak.

### 3. "Learning product" and "decision support tool" are currently mixed together

The document says this is not a chatbot or law database, which is good. But the card rules push toward learning, while many examples push toward real product decisions.

That creates a hidden fork:
- If this is a course, optimize for progression and retention.
- If this is a just-in-time decision tool, optimize for lookup speed and scenario coverage.

Right now it sits in the middle. That middle is dangerous because it can feel too shallow for real decisions and too fragmented for deep learning.

### 4. The structure rules contain contradictions

The doc says "NO deviation allowed" for card structure, but the actual templates vary by card type.

Examples:
- Section names differ across red, orange, and green cards.
- `📜 Source` is optional, but compliance content without traceable grounding may weaken trust.
- `💥 Case` is labeled "MANDATORY but minimal," then immediately described as skippable.

These contradictions matter because downstream generation will drift.

### 5. The progression is promising, but some card topics are too broad for the "one card = one idea" rule

Potentially overloaded topics:
- "Why Germany is different"
- "Data transparency"
- "Compliance framework"
- "Pre-launch checklist"

Each of these could easily require multiple concepts. If kept as single cards, they may become vague. If expanded silently, they will violate the core rule.

### 6. The quiz system is underspecified

The quiz section defines cadence and format, but not enough runtime behavior.

Missing decisions:
- Is there one correct answer or partial credit?
- Can a user retry immediately?
- Does wrong-answer feedback link to the previous card or restate the rule?
- Are quiz results saved, ignored, or used to unlock later cards?
- What happens if a card has no natural A/B judgment scenario?

Without these choices, the quiz layer is an instruction, not a product mechanic.

### 7. Trust and legal-boundary language is missing

Because this product teaches compliance, users may over-trust it. The document says what the product is not, but it does not define the user-facing trust boundary.

You likely need explicit product rules for:
- educational only vs legal advice
- jurisdiction scope
- content freshness expectations
- what happens when rules are nuanced or disputed

This is not legal boilerplate. It is product trust design.

## Premise Challenge

These are the premises I think the spec is currently relying on:

1. A tightly structured card format is enough to create a valuable product.
2. Users primarily need guided learning, not just-in-time decision support.
3. Ten cards are enough to give a coherent first version of German compliance understanding.
4. Optional sourcing will not reduce trust in a compliance-oriented product.
5. A single spec can serve both content generation and product behavior design.

My position:
- Premise 1 is only partly true. Format discipline improves clarity, but it does not define value.
- Premise 2 is still unproven. This is the biggest product choice in the document.
- Premise 3 is plausible for a teaser or v0, but not yet for confident decision-making.
- Premise 4 is weak. In this category, trust usually beats brevity.
- Premise 5 is making the document do too much. It should likely be split.

## Approaches Considered

### Approach A: Keep It As A Content Spec

Summary: Treat this document as a writing system only. Use it to generate the first 10 cards and validate whether the format feels useful.

Effort: S
Risk: Medium

Pros:
- Fastest path to something tangible
- Preserves the strongest part of the current spec
- Good for testing tone, density, and scenario quality

Cons:
- Still not a full product spec
- User flow and quiz behavior remain ambiguous
- Risk of building polished content with unclear product value

Best for:
- A quick prototype or internal content exploration

### Approach B: Split Into Two Docs

Summary: Keep this file as the content style guide, then create a second PRD for product behavior, user flow, success metrics, and trust boundaries.

Effort: M
Risk: Low

Pros:
- Cleanest structure
- Prevents content rules and product rules from colliding
- Makes downstream generation and implementation much easier

Cons:
- Requires one more round of specification work
- Slightly slower than immediately generating cards

Best for:
- Building a real product rather than a content experiment

### Approach C: Reframe The Product Around Decisions, Not Cards

Summary: Make the core unit a product decision scenario, with cards as the explanation layer. The user is not "studying compliance"; they are deciding whether a design move is safe.

Effort: L
Risk: Medium

Pros:
- Stronger product differentiation
- Closer to real user pain
- Makes quizzes, scenarios, and card structure feel naturally connected

Cons:
- Requires reframing the whole experience
- More work up front
- Harder if the real goal is simply educational content

Best for:
- A product that wants to be used in actual design or PM workflows

## Recommendation

Choose **Approach B**.

Reason: the strongest part of the current document is its writing discipline, but the biggest missing piece is product definition. Splitting the content system from the actual product requirements gives you the cleanest next move without discarding the good work already here.

## What The Next PRD Must Answer

If you take Approach B, the second document should answer these exactly:

1. Who is the primary user for v1?
2. What job are they hiring this product to do?
3. When do they open it: before design, during design, or during review?
4. Is the main mode sequential learning, scenario lookup, or both?
5. What does the user complete in one session?
6. What outcome proves success for v1?
7. What trust/disclaimer model does the product show?
8. How are quizzes scored and used?
9. What content gets updated when rules change?
10. What is out of scope for v1?

## Suggested Success Criteria

For the product:
- A target user can describe when to use the product in one sentence.
- A first-time user can finish a session without feeling they are "studying law."
- After the session, the user can correctly judge at least 3 common product decisions.

For the spec itself:
- No contradictions in template rules
- Every card topic passes the "one card = one idea" test
- Quiz behavior is fully specified
- Trust boundaries are explicit

## Concrete Assignment

Do this next:

Write a second document called `prd-v1.md` with only four sections:
- Primary user
- Core job-to-be-done
- User flow
- Success metrics

Keep it under one page. If a statement does not change product behavior, cut it.

## What I Noticed In The Spec

- You have unusually strong instinct for cognitive load control. "User should NOT feel like studying" is one of the most valuable lines in the whole document.
- You are already protecting against scope creep. Saying the product is not a chatbot or law database is a smart boundary.
- Your taste is strongest when you talk about interaction discipline, not legal detail. That is a clue: the product may win on learning design more than on legal completeness.
- The current weak point is not quality. It is specificity about who this is for and what outcome counts as success.
