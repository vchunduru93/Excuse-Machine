# Activity Guide

# **AI-Assisted Development Exercise**

## **Activity Guide for Engineering Team**

---

## **Overview**

In this hands-on exercise, you'll work individually or in pairs to build and deploy a complete web application using AI coding assistants. The goal isn't just to ship something—it's to develop intuitions about how modern tools change the development process.

**What you're building:** The Excuse Machine \- a simple app where anyone can submit creative excuses for late assignments and upvote their favorites. Best excuses rise to the top.

**Time:** 45-90 minutes

Goals:

Groups:

---

## **Your Toolkit**

### **AI Coding Assistants (Pick One)**

* **Cursor** \- AI-native IDE with inline completions and chat  
* **Claude Code** \- Terminal-based agentic coding assistant

### **Recommended Stack**

* **Framework**: [Next.js](https://nextjs.org/) (App Router)  
* **Database**: PostgreSQL via [Neon](https://neon.com/) (free tier)  
* **ORM**: [Prisma](https://www.prisma.io/orm)  
* **Deployment**: [Vercel](http://vercel.com)

You're not locked into this stack—if your group has strong opinions, go for it. But this combination has the smoothest path from zero to deployed.

---

## **Timeline**

### **Phase 1: Setup (10-15 min)**

- [ ] Create GitHub repo (do this on your personal account NOT the Clever workspace)  
- [ ] Create a Vercel account (free, no credit card required); Set up Vercel project and link to your repo  
- [ ] Set up Neon database (you can do this through Vercel in the Storage tab of your project)  
- [ ] Initialize Next.js project with Prisma

### **Phase 2: Build (25-50 min)**

- [ ] Define Prisma schema (Excuse model with votes)  
- [ ] Build the single-page UI: submit form \+ excuse list  
- [ ] Implement upvote functionality  
- [ ] Basic styling (doesn't need to be pretty)  
- [ ] Test locally

### **Phase 3: Deploy & Polish (10-15 min)**

- [ ] Push to GitHub, trigger Vercel deploy  
- [ ] Run Prisma migrations on production DB (Vercel should do this automatically)  
- [ ] Verify app works at public URL  
- [ ] Fix any deployment issues

### **Phase 4: Stretch Goals (if time permits)**

- [ ] Style with Dewey3  
- [ ] Add Clever SSO to attribute excuses to students  
- [ ] Add Clever Rostering so teachers can downvote their students’ excuses  
- [ ] Add AI-powered "enhance my excuse" feature  
- [ ] Prevent vote spam (localStorage tracking)  
- [ ] Anything else you can come up with\!

---

## **Working Arrangement**

This is an **individual or paired** exercise. Work solo or pair up with someone nearby—your choice.

You'll be seated at tables with other engineers. If you get stuck, ask your tablemates for help. The goal is for everyone to get hands-on experience with AI-assisted development, so even if you're pairing, make sure both people are actively engaged.

**If pairing:** Switch who's driving periodically. Both people should experience prompting the AI and reviewing its output.

---

## **Getting Started: Quick Setup Commands**

```shell
# Create Next.js app
npx create-next-app@latest excuse-machine --typescript --tailwind --app

# Add Prisma
npm install prisma @prisma/client
npx prisma init

# Your database schema goes in prisma/schema.prisma
```

---

## **Tips for Working with AI Assistants**

### **Effective Prompting**

* **Be specific**: "Create a Prisma schema for excuses with student\_name, assignment\_name, excuse\_text, creativity\_rating, and created\_at" beats "make a database"  
* **Provide context**: Share the product spec, paste error messages, describe what you've already tried  
* **Iterate**: First attempts are rarely perfect—refine based on what you get

### **Watch For**

* **Hallucinated APIs**: AI might suggest methods that don't exist. Verify against docs.  
* **Outdated patterns**: Check if suggested code matches current Next.js App Router conventions  
* **Over-engineering**: AI loves adding features you didn't ask for. Stay focused on MVP.  
* **Copy-paste debt**: Understand what the AI wrote before moving on

### **When AI Gets Stuck**

* Try rephrasing your request  
* Break the problem into smaller pieces  
* Ask it to explain its reasoning  
* Sometimes it's faster to just write the code yourself

---

## **Clever Integration (Stretch Goal)**

If you finish early and want to add Clever SSO:

1. Go to dev.clever.com  
2. Create a sandbox application  
3. Get your Client ID and Client Secret  
4. Implement OAuth flow

The product spec has more details on how this would modify the auth flow.

---

## **Discussion Questions (For Debrief)**

Think about these as you work—we'll discuss at the end.

### **On AI-Assisted Development**

* What tasks did AI accelerate significantly?  
* Where did AI slow you down or lead you astray?  
* How did you divide work between AI and human judgment?  
* Did the AI change how you approached problem decomposition?

### **On Modern Dev Tools**

* How did the Vercel/Neon/Prisma stack compare to your usual workflow?  
* What surprised you about the deployment process?  
* Would you use these tools for a real project? Why or why not?  
* What takeaways do you have that could be applied to your day-to-day work at Clever?

---

## **Troubleshooting**

**Prisma migrations failing on Vercel?**  
 Make sure `DATABASE_URL` is set in Vercel environment variables. Run `npx prisma generate` before deploying.

**"Module not found" errors?**  
 Try `npm install` again. Check that imports match your file structure.

**Vercel build failing?**  
 Check build logs. Common issues: TypeScript errors, missing env vars, wrong Node version.

**Database connection issues?**  
 Verify connection string. Neon connections can be pooled or direct—use the pooled one for serverless.

---

## **Resources**

* [Next.js Docs](https://nextjs.org/docs)  
* [Prisma Docs](https://www.prisma.io/docs)  
* [Neon Docs](https://neon.tech/docs)  
* [Vercel Docs](https://vercel.com/docs)  
* [Dewey3 (Clever Component Library)](https://master--62fbbb0daff0aa52aea739ac.chromatic.com/?path=/story/clever-ui-introduction--page)  
* [Clever Developer Docs](https://dev.clever.com/docs)

---

**Remember:** The goal is learning, not perfection. A deployed app with rough edges teaches more than a polished local demo. Ship it\!

# Product Spec

# **Product Spec: The Excuse Machine 🐕📚**

## **Overview**

**The Excuse Machine** is a lighthearted web app where anyone can submit creative excuses for late assignments and vote on their favorites. The best excuses rise to the top. Think of it as Reddit meets "the dog ate my homework."

## **Core User Stories**

1. **As a user, I want to submit an excuse** so I can share my creative explanation for a late assignment.  
   * Required fields: Excuse text  
   * Excuses are timestamped on submission  
   * New excuses start with 0 votes

2. **As a user, I want to see all excuses ranked by votes** so I can enjoy the most creative ones.  
   * Display: Excuse text, vote count  
   * Sorted by votes (highest first)

3. **As a user, I want to upvote excuses I like** so the best ones rise to the top.  
   * One-click upvote  
   * No downvotes (keep it positive)

## **Data Model (Suggested)**

```
Excuse
├── id (primary key)
├── excuse_text (text)
├── votes (integer, default 0)
└── created_at (timestamp)
```

## **Technical Requirements**

* **Framework**: Next.js  
* **Database**: PostgreSQL via Neon  
* **ORM**: Prisma  
* **Deployment**: Vercel  
* **Auth**: None required for MVP

## **Screens (Minimum Viable)**

**Single Page App:**

* Submit form at top (excuse text)  
* List of all excuses below, sorted by votes  
* Upvote button on each excuse

## **Out of Scope for MVP**

* User accounts / authentication  
* Editing or deleting excuses  
* Downvotes  
* Preventing multiple votes from same person  
* Rich text formatting

## **Stretch Goals (Time Permitting)**

1. **Clever SSO Integration** \- Add login, track who submitted/voted  
2. **Stylings** \- Use Dewey3 components or add custom stylings to make your app pop  
3. **AI Excuse Enhancement** \- Button to "make this excuse more creative" using an LLM  
4. **Excuse Templates** \- Pre-filled excuse starters for inspiration  
5. **Vote limiting** \- Prevent spam voting (localStorage or IP-based)  
6. **Clever Data API** \- Pull actual class/assignment info if connected  
7. **Experiment with Adversarial AIs** \- Try having another agent (Claude, Copilot, etc.) review the code

## **Success Criteria**

- [ ] App is deployed and accessible via public URL  
- [ ] Users can submit excuses  
- [ ] Users can upvote excuses  
- [ ] Excuses display sorted by vote count  
- [ ] Data persists in database

## **Sample Excuses for Seeding**

* "My dog didn't eat my homework, but he did sit on my laptop and accidentally mass-deleted my files while dreaming about squirrels."  
* "I was abducted by aliens who were very interested in learning about photosynthesis. By the time I explained it, the assignment was due."  
* "I finished the homework but a rogue gust of wind blew it into a parallel dimension. I'm working with theoretical physicists to retrieve it."

# Activity Talk Track

# **2025 Engineering AI-Assisted Development Event: Curiosity, Innovation, & Connection**

This organization-wide initiative is designed to harness our collective technical strengths—which recently led to significant success with our 2025 goals — to redefine how we build. By leaning into **Curiosity, Innovation, and Connection**, our goal is to move from individual experimentation to organizational fluency.

## **1\. The Introduction: A Lab for Curiosity (2–3 Minutes)**

**Speaker Introduction:** "Team, welcome to our Curiosity Lab. This past year, we’ve achieved some of our most ambitious goals yet. We’ve seen major platform updates, accomplished an aggressive product roadmap, and we’ve executed complex, high-risk migrations with zero downtime. We’ve built the foundations for a more secure, role-based future. But those successes weren’t just about the code we shipped—they were about the curiosity we applied to difficult problems.

Today, we are looking at the next frontier of how we work. We aren’t just here to build an application; we are here to explore the intersection of human expertise and AI. Our goal today is to spark **Innovation** by getting hands-on with tools that challenge our traditional workflows, and to deepen our **Connection** by pairing up across teams.

We’re building ‘The Excuse Machine’ as a sandbox. We want to see where AI acts as a force multiplier and where it hits a wall. Today isn’t about perfection; it’s about the journey of discovery you take with your partner. Let’s get curious, let’s be bold, and let’s see what happens when we build together."

## **2\. During the Activity: Prompts for Connection**

*While the pairs are building, use these prompts to encourage them to share their internal logic and foster a culture of vulnerability.*

### **Individual Pair Reflection**

* **The "Innovation Spark":** "What is one piece of boilerplate or logic the AI generated that felt like magic? How does that change your perspective on what we can automate at scale?"  
* **The "Curiosity Check":** "Where did the AI get it wrong? Instead of just fixing it yourself, try to prompt the AI through the error. What did you learn about how the model 'thinks' versus how you do?"

### **Table Discussion (Cross-Group)**

* **The "Shared Fear":** "In your pair, discuss: which parts of your current role do you *hope* this technology masters first? Which parts are you most protective of?"  
* **The "Context Learning":** "We’ve learned that 'Context is King.' How are you helping the AI understand our specific technical constraints? Share a moment where providing more context completely changed the output."

## **3\. The Closing: Showcasing Innovation & Leadership Vision**

### **Part A: Guided Takeaways (1–2 Minutes Each)**

*Invite 3–4 pairs to share their insights based on these three pillars:*

1. **Innovation:** "What did this tool allow you to build in 45 minutes that would have been impossible a year ago?"  
2. **Connection:** "What did you learn about your partner’s approach to problem-solving while navigating the AI’s suggestions?"  
3. **Surprise:** "What was a 'hallucination' or error that actually ended up teaching you something new about the technical stack?"

### **Part B: Leadership Closing (2–3 Minutes)**

"To wrap up, look around. We have 74 engineers who just spent the afternoon redefining what it means to 'build' at this company. Today proved that while AI can generate code, it cannot generate the **Connection** and shared intuition that makes our engineering organization world-class.

The **Innovation** we saw today—from adding custom integrations to AI-powered enhancements—is just the beginning. The goal was to move us from passive observers to active explorers. As we move into our next project cycles, take this **Curiosity** with you.

We aren't just a team that follows standards; we are a team that evolves them. When we combine our deep domain expertise with these new tools, we don't just work faster—we work smarter. Thank you for being vulnerable, for teaching each other, and for helping us define the future of engineering here. Let's take this momentum forward."

