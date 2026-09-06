# Araphor Website Implementation Review

This guide covers the Araphor marketing website in this directory. The website
explains how Araphor stops harmful AI-agent actions. It also shows the current
console design fixture without importing the console application.

## Intended end state

A visitor can understand the Araphor protection model, inspect a prevention
example, view the product, identify protected action types and applicable
workloads, and inspect sourced public cases. The visitor can request early access
with one email address or book a demo through Cal.com. A production contact
service receives the access request.

The current implementation does not send the access form. The form validates
local input only. The Cal.com action moves to the booking section until the event
URL is configured.

## Review flow

[index.html](index.html) The browser loads the landing page and its content
  -> [styles.css](styles.css) the stylesheet applies the responsive design
  -> [script.js](script.js) the browser enables navigation and page interactions
  -> [Pretext dependency](package.json) the build includes the optional text-layout enhancement

[brand identity](index.html) The visitor sees the Araphor name in the page metadata, navigation, product copy, calls to action, and footer
  -> [Araphor mark](assets/araphor-mark.svg) the header, footer, and browser icon use the crown-and-fortress mark
  -> [console captures](assets/product) the product views show the Araphor console brand
  -> [canonical URL](index.html) search and social metadata identify `https://araphor.com/` as the primary website

[hero message](index.html) The visitor sees that Araphor stops AI agents before they do harm
  -> [product scope](index.html) the page states that Araphor controls agents and workloads
  -> [adoption summary](index.html) the page separates Observe, Suggest, Approve, and Protect
  -> [policy statement](index.html) the page states that enforcement starts only after policy approval

[scheme selection](index.html) The root element selects one Forged Silver scheme
  -> [scheme tokens](color-schemes.css) the scheme defines the silver, graphite, forge-violet, and semantic colors
  -> [semantic token consumers](styles.css) components use denied, verified, warning, and information tokens
  -> [dark-section tokens](styles.css) dark sections use contrast-adjusted values for each state
  -> [color theme record](COLOR-THEMES.md) the design record defines the scheme values and their permitted uses

[protection tabs](index.html) The visitor selects secret access, shell execution, or node-root access
  -> [selectHfCase](script.js) the browser loads the matching published events and Araphor decisions
  -> [incident graph](index.html) the graph shows one shared event chain and two visible branches
  -> [incident sources](index.html) the page links the flow to the OpenAI report and the Hugging Face technical timeline

[path toggle](index.html) The visitor changes the highlighted graph branch
  -> [togglePath](script.js) the browser selects the published or Araphor branch
  -> [runPath](script.js) the browser starts one traversal from the shared source nodes
  -> [graph state](styles.css) the event token follows the selected edge path and highlights its result nodes
  -> [renderDecisionTrace](script.js) the lower trace shows the request, policy decision, result, and verified effect for the selected branch

[product tabs](index.html) The visitor selects an operator view
  -> [selectProductView](script.js) the page exposes one accessible tab panel
  -> [console captures](assets/product) the selected panel shows the current console design fixture

[protection section](index.html) The visitor reviews the file, process, network, and Kubernetes action classes that Araphor can control
  -> [protection statements](index.html) each action class states the denied request and protected result

[Why Araphor section](index.html) The visitor sees the product name mapped to the defense of Fornost and pre-effect enforcement

[workload section](index.html) The visitor identifies applicable agent and workload deployments
  -> [workload statements](index.html) the page maps Araphor to evaluation agents, coding and operations agents, AI-platform workloads, and Kubernetes platforms

[public cases](index.html) The visitor reviews the broader agent-risk record
  -> [Hugging Face timeline](https://huggingface.co/blog/agent-intrusion-technical-timeline) the page links to the confirmed intrusion record
  -> [Anthropic investigation](https://www.anthropic.com/news/investigating-incidents-cybersecurity-evals) the page links to three confirmed intrusion records
  -> [AISI incident report](https://www.aisi.gov.uk/blog/incident-report-unsanctioned-agent-behaviour-during-cyber-testing) the page links to confirmed unsanctioned live-internet actions
  -> [Replit disclosure](https://replit.com/blog/doubling-down-on-our-commitment-to-secure-vibe-coding) the page links to the confirmed data-deletion record
  -> [CVE research](https://embracethered.com/blog/posts/2025/github-copilot-remote-code-execution-via-prompt-injection/) the page labels the patched prompt-injection path as a CVE
  -> [MCP research](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks) the page labels the tool-poisoning path as a reproduced attack

[early-access call to action](index.html) The visitor moves to the access section
  -> [early-access form](index.html) the visitor enters one work email address
  -> [form validation](script.js) the browser checks the email address
  -> Not implemented: a contact service receives and stores the request

[demo call to action](index.html) The visitor selects the demo action
  -> [Cal.com configuration](script.js) the page opens the configured Cal.com event in a new tab
  -> Partial: the page moves to the booking section until the event URL is configured

[build command](package.json) The developer runs `npm run build`
  -> [Vite inputs](vite.config.js) Vite builds the landing page
  -> [dist output](dist) Vite writes the deployable static website

## Ownership

| Owner | State and input | Output | Limit |
| --- | --- | --- | --- |
| `index.html` | Marketing content, semantic document structure, and the active color-scheme name | Landing page | No server rendering |
| `color-schemes.css` | Forged Silver scheme values | Brand and semantic color tokens | The file defines the Forged Silver family only |
| `styles.css` | Typography, components, and responsive layout | Visual presentation that consumes color tokens | Google Fonts remain a remote asset |
| `script.js` | Page-local interaction state | Navigation, incident-flow state, tabs, form feedback, and Cal.com link activation | No durable state or access-form network request |
| `vite.config.js` | Build entry point | `index.html` in `dist/` | Static build only |
| `assets/araphor-mark.svg` | Crown-and-fortress geometry | Theme-aware vector mark and browser icon | The standalone file uses Forged Silver 6 light-surface colors |
| `assets/product/` | Console-fixture captures | Product views in the landing page | Images do not prove product integration |

## Verification

The review covers the website working tree on 2026-09-06. The website is an
independent Git repository. The parent repository ignores the `.gstack`
directory.

- `npm run check` completed the JavaScript syntax check and the Vite 8.2.2 build.
- Playwright read the AI-agent attack category, the agent-and-workload scope,
  the Observe-to-Protect policy statement, and the 30-minute demo label from
  the rendered page.
- Playwright showed the four operating facts in one row at 1440 pixels, two
  rows at 768 pixels, and one column at 390 pixels.
- Playwright captured the revised hero at 1440, 768, and 390 pixels. It also
  captured the proof, deployment, and conversion sections at 1440 pixels.
- `xmllint` accepted the favicon, logo, and color-theme SVG files.
- `xmllint` accepted `assets/araphor-mark.svg`.
- Playwright displayed the selected mark in the header and dark footer.
- A source scan found no reference to the removed logo study or old logo assets.
- A complete source and build scan found no previous product or company name in the website directory.
- The browser read `Araphor | Stop AI agents before they do harm` as the page
  title.
- The browser read `https://araphor.com/` as the canonical URL.
- The browser found no old product or company name in the rendered page text.
- The Forged Silver 6 violet pair measured `6.07:1` on paper and `8.35:1`
  on carbon.
- The Forged Silver 5 denied pair measured `5.82:1` on paper and `9.29:1` on carbon.
- The denied, verified, and information text pairings met the WCAG AA `4.5:1` threshold on their assigned light and dark surfaces.
- Playwright opened the landing page.
- Playwright read `#6D4D8D` and `#C39CDF` as the active Forged Silver 6
  violet pair. It read `#954735` and `#F2A08A` as the denied pair.
- Playwright changed the root scheme to Forged Silver 4 and read `#B4232D` and
  `#FF7A83`. It then restored Forged Silver 6 without a page reload.
- Playwright captured the page and the active protected incident path with
  Forged Silver 6.
- Playwright captured Forged Silver 2 at 1440 by 1000 pixels and 390 by 844 pixels.
- Playwright found the three protection tabs and the two-state path toggle in the top graph toolbar.
- Playwright selected the Araphor path. The token followed the shared events and then the denied branch. The lower trace changed to `POLICY`, `DECISION`, `RESULT`, and `VERIFIED` records.
- Playwright selected the shell case. The graph and trace ended at process denial before a child process started.
- Playwright selected the node-root case. The graph and trace ended at `EACCES` before a service-account token descriptor or bytes were returned.
- The current checks at 390, 768, and 1440 pixels reported no document
  overflow. The incident graph scrolls inside its mobile viewport.
- At 375 px, the proof-section anchor leaves its content below the sticky header.
- The header and hero use `Request early access` as the primary commercial action.
- The early-access form has one work-email field and one submit action.
- The early-access copy asks the visitor to start with one agent or workload in
  Observe and review the suggested policy before Protect is enabled.
- Demo actions use one `data-calcom` path. They move to the booking section until the Cal.com event URL is configured.
- The access request includes product updates. The page has no second subscription form.
- The page has dedicated product, protection, rollout, workload, incident, and FAQ sections.
- Playwright selected the causal-replay product view. The workload view became hidden, and the causal-replay view became visible.
- The browser accepted one valid work email and returned the inactive-endpoint status.
- The production build contains the landing page only.
- A source scan found no public price or internal design instruction in the landing page.
- The browser console reported no runtime error or warning on the landing page.

The checks do not cover a deployed host, form delivery, a configured Cal.com
event, a privacy policy,
assistive-technology testing, or product API integration.
