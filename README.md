# SUI PROGRAMMABLE MONEY

Premium frontend web app for **Sui Overflow 2026 Hackathon** submission, focused on the **DeFi & Payments** track.

## Overview

This project showcases a luxury dark-and-gold Web3 financial interface built around Sui-native concepts:

- **Programmable Money**
- **Native Composability**
- **Move Objects**
- **Programmable Transaction Blocks (PTBs)**
- **Wallet / zkLogin simulation**
- **Premium financial utilities UI**

The app is designed to present a polished product vision for programmable payments, capital routing, escrow, and intelligent financial execution flows on Sui.

## Features

### Hero Section
- Title: **SUI PROGRAMMABLE MONEY**
- Subtitle: **Intelligent Financial Flows & Capital Management on Sui**
- CTA buttons:
  - **Launch App**
  - **View Documentation**

### Native Composability Section
- Explains Sui Move object model
- Explains PTB atomic flows such as:
  - `Pay -> Swap -> Deposit`
- Includes a visual **PTB Previewer Layer**

### Programmable Financial Utilities
Four premium cards:
1. **Automated Salary Streaming**
2. **Intelligent Routing Vault**
3. **Payment-Linked Credit**
4. **Milestone-Based Escrow**

### Footer
- Sui Overflow 2026 Hackathon Submission
- Track: **DeFi & Payments**
- GitHub and Telegram links

## Tech Stack

- **React**
- **Vite**
- **Tailwind CSS**
- **Lucide React**

## Project Structure

```text
src/
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── Primitives.jsx
│   └── FinancialTools.jsx
├── hooks/
│   ├── useSuiWallet.js
│   └── usePtbBuilder.js
├── styles/
│   └── globals.css
├── App.jsx
└── main.jsx
```

Additional files:

```text
package.json
vite.config.js
postcss.config.js
tailwind.config.js
index.html
move/
└── sources/
    └── escrow.move
```

## Local Development

### 1. Open terminal in project folder

```text
C:\Users\HP\Desktop\Code\DU AN WEB
```

### 2. Install dependencies

If PowerShell blocks npm scripts, use:

```bash
cmd /c "npm install"
```

### 3. Start development server

```bash
cmd /c "npm run dev"
```

### 4. Open in browser

```text
http://localhost:3000
```

## Build for Production

```bash
cmd /c "npm run build"
```

## Preview Production Build

```bash
cmd /c "npm run preview"
```

## Notes

- Wallet connection and zkLogin are currently **mocked** for demo purposes.
- PTB generation and execution are currently **simulated** in frontend hooks.
- A sample Move module for escrow is included under `move/sources/escrow.move`.

## Suggested Next Steps

- Integrate real **Sui wallet connection**
- Add **zkLogin** flow
- Implement real **PTB building and submission**
- Connect to **Sui testnet/mainnet**
- Expand Move modules for:
  - salary streaming
  - escrow logic
  - vault automation
  - payment-linked credit

## Hackathon Context

Built for:
- **Sui Overflow 2026 Hackathon**
- **Track: DeFi & Payments**

## Authoring Note

This project was generated and structured as a clean modular frontend prototype for rapid hackathon iteration and demo readiness.
