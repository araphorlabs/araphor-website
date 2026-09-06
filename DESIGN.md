# Araphor Website Design System

## Product context

- **Product:** Protection that controls what AI agents and workloads can do.
  Araphor suggests policy from recorded actions and stops forbidden effects.
- **Audience:** CISOs, cloud-security leaders, infrastructure leaders, and
  technical founders.
- **Page type:** Founder-led marketing and technical evaluation page.
- **Memorable idea:** Araphor holds the system boundary. The agent can try a
  different path, but a forbidden action cannot cross the boundary.

## Aesthetic direction

- **Direction:** Industrial evidence.
- **Decoration:** Intentional. Rules, counters, event records, and one hard stop
  line support the product story.
- **Mood:** Precise, calm, and physical. The design must feel like an engineering
  control, not an AI application or a threat-intelligence dashboard.
- **Avoid:** Neon green, blue or violet gradients, glowing shields, generic
  circuit patterns, stock photography, and soft card grids.

## Typography

- **Display:** IBM Plex Sans Condensed, weights 600 and 700. The narrow forms
  create force without using oversized decorative graphics.
- **Body and UI:** Source Sans 3, weights 400, 500, 600, and 700. It stays clear
  in technical copy and small labels.
- **Data and code:** IBM Plex Mono, weights 400, 500, and 600.
- **Fallbacks:** `Arial Narrow` for display, `Arial` for body, and `monospace`
  for data.
- **Scale:** 12, 14, 16, 18, 22, 30, 44, 68, and 104 pixels. Responsive rules
  use `clamp()` between these anchors.

## Color

- **Paper:** `#F1F3EF` for the primary background.
- **White:** `#FAFBF8` for raised light surfaces.
- **Ink:** `#101512` for text and primary actions.
- **Carbon:** `#0B100E` for the deepest section background.
- **Dark surface:** `#151C19` for raised dark fields.
- **Dark text:** `#F1F3EF` for text on dark surfaces.
- **Dark muted:** `#A8B6B0` for supporting text on dark surfaces.
- **Iron:** `#515D57` for supporting text on light surfaces.
- **Brand metal:** `#BCC8C3` for logo fields and large decoration.
- **Brand metal, dark:** `#80938D` for borders and diagrams on dark surfaces.
- **Rule:** `#BCC8C3` for structural borders.
- **Soft rule:** `#DCE2DF` for quiet separators.
- **Forge violet:** `#6D4D8D` on light surfaces and `#C39CDF` on dark
  surfaces. Use it for brand details, focus, selection, and product paths.
- **Denied:** `#954735` on light surfaces and `#F2A08A` on dark surfaces.
- **Verified:** `#17654C` on light surfaces and `#63D0A0` on dark surfaces.
- **Warning:** `#76520D` on light surfaces and `#E1B35A` on dark surfaces.
- **Information:** `#2B6075` on light surfaces and `#82BED6` on dark surfaces.

Color is scarce. Forge violet identifies Araphor and interactive states.
Denied fired clay identifies a stopped prohibited effect. Green identifies a
verified positive result. Blue identifies neutral information. Ochre identifies
an unsupported, uncertain, or degraded state. Use labels and shapes with every
semantic color.

## Spacing

- **Base unit:** 4 pixels.
- **Density:** Comfortable in marketing copy and compact in evidence views.
- **Scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96, and 128 pixels.

## Layout

- **Approach:** A disciplined 12-column grid with controlled editorial breaks.
- **Maximum width:** 1,440 pixels.
- **Desktop:** 12 columns and 24-pixel gutters.
- **Tablet:** 8 columns and 20-pixel gutters.
- **Mobile:** 4 columns and 16-pixel gutters.
- **Corners:** 0 pixels for structural fields, 4 pixels for controls, and 999
  pixels only for status labels.
- **Borders:** One-pixel rules group content. A three-pixel violet rule marks
  product structure. A three-pixel denied rule marks a stopped effect.

## Motion

- **Approach:** Minimal and functional.
- **Timing:** 90 milliseconds for control feedback, 140 milliseconds for graph
  state changes, and 2.5 seconds for one path traversal.
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` for entry and `ease-in-out` for
  state changes.
- **Reduced motion:** Remove movement and show the final state immediately.

## Logo direction

Use **Gate** as the initial site mark. Its open brackets defend the A. The A
remains recognizable at favicon size. The forge-violet bar marks the
enforcement boundary before the protected system.

Keep **The Cut** as the alternate. It explains the product more literally. An
incoming action hits the boundary before it can reach the protected A.

Both marks use simple geometry, one color accent, and no shield silhouette.

## Content rules

- Lead with the protected result, not the mechanism.
- State the product promise as `Stop AI agents before they do harm`.
- Keep AI-agent attacks as the primary threat and buyer motivation.
- State that Araphor can protect an agent, a workload, or both.
- Name the harm: secret access, process execution, or a forbidden connection.
- Explain the `Observe → Suggest → Protect` workflow.
- Say `real activity` or `recorded actions`, not `normal behavior`. The product
  proposes policy from recorded actions. It does not claim opaque anomaly
  detection.
- Present Araphor at the execution boundary around the agent or workload.
- Use Hugging Face as the detailed case, not as the only proof of demand.
- Label confirmed incidents, disclosed vulnerabilities, and reproduced attacks accurately.
- Use `covered`, `prevented`, `observed`, `verified`, `unsupported`, and
  `unknown` with their exact meanings.
- Do not claim AI attribution, complete attack prevention, application intent,
  full production readiness, or replacement of existing security controls.
- Put the current evaluation boundary beside the evaluation call to action.
- Do not publish a price until customer discovery establishes the offer.
- Do not expose design notes, research prompts, implementation limits, or other
  internal instructions in customer-facing copy.

## Decisions log

| Date | Decision | Reason |
| --- | --- | --- |
| 2026-09-02 | Use an industrial evidence direction | Araphor sells a physical enforcement result and proof, not an AI experience |
| 2026-09-02 | Use one orange enforcement accent; superseded on 2026-09-03 | A scarce signal color made the stopped boundary easy to scan, but it also made sales actions look like denied results |
| 2026-09-02 | Use the Gate logo on the site | It remains distinct and legible without a generic security shield |
| 2026-09-02 | Show the attack path as the main visual | The visual explains the product boundary faster than an architecture diagram |
| 2026-09-03 | Lead with stopping harm before it succeeds | Customers need the protected result before they need the enforcement vocabulary |
| 2026-09-03 | Make Observe, Suggest, and Protect the product workflow | The console and implementation use this adoption path |
| 2026-09-03 | Show a broader public evidence set | Hugging Face is the detailed case, but harmful and exploitable agent actions are not isolated to one event |
| 2026-09-03 | Use one directed acyclic graph for the Hugging Face incident | Shared event nodes lead to two visible branches. The published branch can continue after harm. The shorter Araphor branch stops at the protected result. A toggle animates and highlights one branch. |
| 2026-09-03 | Keep the path toggle in the graph toolbar | The control must be visible before the visitor inspects the graph. The control has no outer container and uses a large switch target. |
| 2026-09-03 | Put a decision trace below the graph | The trace shows the request, policy, decision, returned result, and verified physical effect for the selected path. |
| 2026-09-03 | Remove public pricing and internal process copy | Early YC security companies use a direct product claim and a demo or access request before the offer is repeatable. |
| 2026-09-03 | Exclude the logo study from the production build | Brand-review notes are internal material. They do not belong in the customer website. |
| 2026-09-04 | Map the product name to Tolkien's Araphor | Araphor repelled an invading force from Fornost and the North Downs. The product maps this defense to pre-effect enforcement at the system boundary. |
| 2026-09-03 | Remove the runtime-protection category label | The page now names the protected result and the system boundary. |
| 2026-09-03 | Use the standard early-stage security-site sequence | The page now leads with the product, shows protection surfaces and rollout, identifies applicable workloads, and ends with one conversion section. |
| 2026-09-03 | Lead with early access and keep demo booking separate | The access form asks for one email. The demo action opens one Cal.com event after its URL is configured. |
| 2026-09-03 | Fold updates and design partnership into early access | An access request includes product updates. Selected teams can receive a design-partner invitation after the first qualification review. |
| 2026-09-03 | Select the Forged Silver color system | Silver and graphite support the industrial identity. Separate brand and result colors prevent sales actions from looking like security events. |
| 2026-09-03 | Refine the palette as Forged Silver 2 | A muted violet gives Araphor a distinct brand signal. Denial, verification, warning, and information retain separate meanings. |
| 2026-09-03 | Add Forged Silver 3, 4, and 5 as denied-color studies | The studies compare iron oxide, signal red, and fired clay. Forged Silver 2 remains applied until one study is selected. |
| 2026-09-03 | Try Forged Silver 5 on the website | Fired clay provides a quieter denied state. One root attribute now selects a Forged Silver scheme. |
| 2026-09-05 | Use the system-boundary category; superseded later on 2026-09-05 | The phrase identified the protected layer, but it did not explain the agent-and-workload product clearly enough. |
| 2026-09-05 | Make human approval explicit in the first screen | The copy now separates observation, policy proposal, approval, and enforcement. |
| 2026-09-05 | Present agent and workload protection as one product | Araphor controls actions at the execution boundary. Agent context can improve policy, but workload enforcement does not require agent attribution. |
| 2026-09-05 | Restore the outcome-led hero promise | `Stop AI agents before they do harm` states the customer result. The supporting copy explains agent and workload coverage. |
| 2026-09-05 | Trial Forged Silver 6 on the website | The variant increases violet chroma while it preserves hue, lightness, contrast, and the Forged Silver 5 semantic colors. |

## Acquisition references

- [Trava](https://www.usetrava.com/) uses an early-access action and a separate
  calendar action.
- [Cyberdesk](https://www.cyberdesk.io/) uses one demo action and one waitlist
  action. Its demo action opens Cal.com.
- [Arga Labs](https://www.argalabs.com/) uses one product action and one Cal.com
  demo action.
- [Asymptote](https://asymptotelabs.ai/) explains the problem, the product,
  supported systems, common questions, and one final action.

Araphor uses the same acquisition pattern. It does not copy the product claims
or visual identity from these websites.
