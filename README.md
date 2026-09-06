# Araphor Website

This folder contains the Araphor marketing website. It presents Araphor as a
system boundary that stops harmful AI-agent actions on Linux and Kubernetes.

## Contents

- `index.html`: responsive landing page;
- `color-schemes.css`: selectable Forged Silver color schemes;
- `styles.css`: typography, components, and responsive layout;
- `script.js`: navigation, the interactive incident graph, console-view tabs,
  early-access form feedback, Cal.com link configuration, and text layout support;
- `package.json`: development and production build commands;
- `vite.config.js`: build configuration for the website;
- `DESIGN.md`: visual and content system;
- `COLOR-THEMES.md`: researched color directions and visible theme previews;
- `IMPLEMENTATION_REVIEW.md`: source review route and current limits;
- `assets/`: selected SVG mark and current console-fixture images.

## Develop

Run these commands from this folder:

```sh
npm install
npm run dev
```

Vite prints the local website address. Open `/` at that address.

Add `?edit=1` to the landing-page URL to edit the primary text blocks in the
browser.

## Change the color scheme

Change the `data-color-scheme` value on the root `html` element in
`index.html`. The website currently uses:

```html
<html lang="en" data-color-scheme="forged-silver-6">
```

The available values are `forged-silver`, `forged-silver-2`,
`forged-silver-3`, `forged-silver-4`, `forged-silver-5`, and
`forged-silver-6`. Forged Silver 3 through 5 change the denied color. Forged
Silver 6 keeps the Forged Silver 5 semantic colors and increases the violet
brand signal.

## Build

Run these commands:

```sh
npm run build
npm run preview
```

The production website is in `dist/`. Deploy that directory to a static host.
Use `https://araphor.com/` as the canonical URL. Redirect `https://araphor.ai/`
to the canonical URL.

## Before publication

1. Connect the early-access form to the chosen customer relationship system or
   email service.
2. Set `calcomEventUrl` in `script.js` to the published Araphor event URL.
3. Add the privacy-policy URL and company contact details.
4. Replace the demonstration event data only after a retained qualification
   record proves the new data.
5. Run accessibility, browser, link, and performance checks on the deployed
   site.

The early-access form stores no data and sends no request until you connect its
endpoint. A demo link moves to the booking section until `calcomEventUrl` is set.
The console images come from the local console design fixture. They do not
prove a connected production system.

## Public evidence sources

The landing page distinguishes confirmed incidents from security research.
Use the source labels when you change the incident text.

- [Hugging Face technical timeline](https://huggingface.co/blog/agent-intrusion-technical-timeline): confirmed intrusion;
- [Anthropic evaluation investigation](https://www.anthropic.com/news/investigating-incidents-cybersecurity-evals): three confirmed intrusions;
- [UK AI Security Institute incident report](https://www.aisi.gov.uk/blog/incident-report-unsanctioned-agent-behaviour-during-cyber-testing): confirmed unsanctioned actions;
- [Replit disclosure](https://replit.com/blog/doubling-down-on-our-commitment-to-secure-vibe-coding): confirmed data deletion;
- [CVE-2025-53773 research](https://embracethered.com/blog/posts/2025/github-copilot-remote-code-execution-via-prompt-injection/): patched vulnerability; and
- [MCP tool-poisoning research](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks): reproduced attack.
