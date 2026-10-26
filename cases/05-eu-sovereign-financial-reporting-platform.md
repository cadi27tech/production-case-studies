# 05 / An EU-sovereign, multi-tenant financial reporting platform for the education sector

> An EU-sovereign financial reporting platform with no US-owned service in the stack: self-hosted in the Netherlands, Microsoft sign-in, Exact Online ledgers turned into board-ready reports for education organisations, and tenant isolation proven by tests.

**5/5** &nbsp; isolation policies caught by mutation tests

<picture>
  <source media="(max-width: 600px)" srcset="../drawings/eu-sovereign-financial-reporting-platform-m.svg">
  <img src="../drawings/eu-sovereign-financial-reporting-platform.svg" alt="System drawing: Ledger data read from Exact Online. Synced into each tenant's isolated space. Structured by the client's chart-of-accounts workbook. Reports with drill-down to transactions. Plain-language explanation for the board.">
</picture>

<sub>Dashed frame: outside the system. Double frame: a person or a hard check. Bright frame: a result. Orange with a lamp: live in production. Dotted boundary: a zone.</sub>

| Fact | Detail |
|---|---|
| Client | Dutch education-sector finance platform |
| Role | Architect and builder. Hourly and fixed-price phases. |
| Timeline | Infrastructure from August 2026, reporting checked live 16 October 2026, collaboration workspace in build |
| Status | Reporting checked live on demo data; next module in build |

## Context

A Dutch client serving education organisations needed a platform to replace manual reporting: profit and loss, balance sheet and cash flow from each organisation's ledger, explained in plain language for board members who are not accountants.

## What was broken

Board reporting was manual: profit and loss, balance sheet and cash flow assembled from each organisation's ledger, for board members who are not accountants. There was no shared platform, and any platform had to keep every organisation's numbers apart.

## What it cost

- Manual reporting for every organisation, every period.
- Reports shaped for accountants, read by boards without that background.
- A data leak between tenants would end the product before it started.

## The brief

Many organisations on one platform, each seeing only its own numbers, with infrastructure that stays in the EU and under the client's control. A data leak between tenants would end the product.

## Constraints

- Self-hosted in the Netherlands, on infrastructure the client controls, with no US-owned service anywhere in the stack.
- Strict tenant isolation, enforced in the database rather than the application.
- Sign-in with the organisations' existing Microsoft accounts.
- Fixed budgets per phase.

## Stakes

Many organisations on one platform, each allowed to see only its own numbers. One cross-tenant leak would end the product, and a single US-owned service anywhere in the stack would break the sovereignty requirement.

## Role and team

- Architect and builder, on hourly and fixed-price phases.
- Designed the pilot across three organisation types: a bookkeeping firm, an audit firm and school boards. Both firms approved.
- Raised the need for a data processing agreement with each participating firm before the pilot, before anyone asked.
- Wrote a security overview for the pilot firms' IT and security teams.

## What was built

- **A regulated pilot, designed up front.** Adrian designed the pilot across three organisation types (a bookkeeping firm, an audit firm and school boards), raised the need for a data processing agreement per firm before anyone asked, and wrote the security brief for their IT teams. Both firms approved.
- **Self-hosted core** on a Dutch VPS with Docker Compose: Supabase (PostgreSQL with row-level security), n8n, Caddy for TLS, encrypted off-site backups, ledger tokens encrypted at rest and secrets kept encrypted.
- **Microsoft Entra ID single sign-on** bridged into the database's own session tokens, so the isolation rules apply to every query.
- **Exact Online sync** (read-only) on a schedule, and a report builder driven by the client's own chart-of-accounts workbook, so finance stays the source of truth for structure.
- **Reporting**: profit and loss, balance sheet and cash flow with drill-down to ledger transactions, per-tenant branding, and a plain-language AI explainer clearly labelled as beta.

## How it runs

1. Ledger data read from Exact Online
2. Synced into each tenant's isolated space
3. Structured by the client's chart-of-accounts workbook
4. Reports with drill-down to transactions
5. Plain-language explanation for the board

## Timeline

| When | What happened |
|---|---|
| Before | Manual board reporting, and a requirement that no US-owned service appears anywhere in the stack. |
| Aug 2026 | Infrastructure phase: a Dutch VPS the client controls, self-hosted Supabase and n8n, Caddy for TLS, encrypted off-site backups. Closed at 19.0 hours, inside its 15 to 22 hour band. |
| Sign-in | Microsoft Entra ID single sign-on bridged into the database's own session tokens, so the isolation rules apply to every query. 52 of 52 end-to-end sign-in tests. |
| Isolation | 26 migrations and 16 SQL test files, including cross-tenant leak tests that must fail. 5 of 5 row-level security policies caught when deliberately broken. |
| Reporting | Read-only Exact Online sync and a report builder driven by the client's own chart-of-accounts workbook. Fixed price of 16.0 hours against a 22.5 hour estimate. |
| 16 Oct 2026 | Reporting checked live on demo data, with drill-down to ledger transactions. |
| 19 Oct 2026 | The next module, a collaboration workspace, won at a fixed price. In build. |

## Safeguards and controls

- No US-owned service anywhere in the stack, on infrastructure the client controls.
- Tenant isolation enforced in the database with row-level security, not in the application, and proven by tests that try to read another tenant's rows.
- Ledger tokens encrypted at rest, secrets kept encrypted, encrypted nightly off-site backups.
- Exact Online is read-only, and nothing writes to the ledger without human approval.
- A data processing agreement raised with each participating firm before the pilot.
- The AI explainer is clearly labelled as beta, and 137 production lessons are logged so the next engineer inherits them.

## Results

| Figure | What it measures |
|---|---|
| **52/52** | sign-in end-to-end tests, including link reuse, expiry, replay and a five-strike lockout |
| **5/5** | row-level security policies caught when deliberately broken (mutation tests) |
| **19.0 h** | for the infrastructure phase, inside its 15 to 22 hour band |
| **16.0 h** | fixed price for the reporting phase against a 22.5 hour estimate |

## Before and after

| Area | Before | After |
|---|---|---|
| Board reporting | Manual, per organisation | P&L, balance sheet and cash flow with drill-down, per tenant |
| Infrastructure phase | 15 to 22 hour band | 19.0 hours |
| Reporting phase | 22.5 hour estimate | 16.0 hours, fixed price |

## Reliability

Twenty-six migrations and 16 SQL test files, including cross-tenant leak tests that try to read another tenant's rows and must fail. Production lessons are written down as they happen (137 so far), so the next engineer inherits them. Each phase came in at or under budget, and the next module was won at a fixed price.

## What the client owns

- The servers, the database and the backups, in its own EU accounts.
- The architecture document, migrations, test suites and the numbered lessons log.

## Stack

Next.js 15, Supabase (self-hosted PostgreSQL, RLS), n8n (self-hosted), Docker Compose, Caddy, Microsoft Entra ID, Exact Online API

## What was said

> The Prompt Optimizer workflow is solid... By unifying the architecture, you've stopped the AI from getting 'identity confusion' between different PLC vendors. It's now perfectly modular... That's why I gave him a bonus because he exceeded... Clean, professional, and future-proof.
>
> <sub>Danish industrial-automation team, Self-improving LLM pipeline for PLC code, Upwork</sub>

---

[Read it on the site](https://cadi27tech.github.io/work/eu-sovereign-financial-reporting-platform/)
