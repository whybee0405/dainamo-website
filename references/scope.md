# Dainamo Holdings Business and Product Scope

## 1. Executive summary

Dainamo Holdings (Pty) Ltd is a Johannesburg-based, multi-disciplinary construction, engineering, specialist finishes, and maintenance contractor. The company began in general handyman work, but deliberately repositioned after finding that market highly competitive. Its growth strategy is now centred on higher-value, skill-dependent work for businesses, shopping centres, hospitals, warehouses, residential complexes, and other managed properties.

The immediate software need is a very simple, phone-first system that lets the owner prepare professional quotations and invoices while on site, preserve the structure and identity of Dainamo's current document template, save customer and project details for reuse, calculate totals without spreadsheet work, generate a PDF, and share it through the phone's native share sheet or WhatsApp workflow.

The broader opportunity is a lightweight field-service and contract-maintenance operating system. It can later grow into enquiry handling, an AI company-information assistant, site inspections, job costing, maintenance contracts, project progress, and payment tracking. The first release should remain intentionally narrow: documents, customers, reusable work items, and company settings.

## 2. Sources analysed

This scope is based on:

- `dainamo holdings profile.jpeg`, the company profile and service catalogue.
- `dainamo sample invoice.jpeg`, the current branded commercial-document template and a complete real-world example.
- `information.txt`, messages from the owner describing the company's positioning and requested systems.
- The neighbouring `cloudia-erp` project, especially its client, quote, invoice, document-numbering, PDF, status, and organisation-settings patterns.

Facts below are separated from recommendations and assumptions where necessary. No registration number or VAT number appears in the supplied material, so neither should be invented.

## 3. Business identity

**Legal/trading name:** Dainamo Holdings (Pty) Ltd  
**Taglines used in supplied material:** "Building solutions. Powering futures." and "Building · Renovating · Protecting"  
**Primary location:** 301 Greenfields, Heidelberg Road, City Deep, Johannesburg, 2049  
**Telephone numbers:** 063 432 9337 and 072 349 6482  
**Email:** dainamoholdings@gmail.com  
**Geographic ambition:** Become a leading provider in construction, maintenance, and specialised coating systems across South Africa.

The visual identity is strongly corporate and construction-oriented. Navy/royal blue is the dominant colour, gold is used as a premium accent in the document identity, and white carries most information. The logo combines a building/roof form with the letter D, signalling both property and construction.

## 4. Positioning and strategic direction

Dainamo is no longer positioning itself as a general handyman company. The owner has explicitly identified a more defensible niche:

- Specialised work requires training, equipment, product knowledge, and reliable execution.
- Commercial and institutional clients value compliance, continuity, documentation, and accountable delivery.
- Contract and project work creates larger engagements and the possibility of repeat revenue.
- Specialist finishes and protective systems face less commodity competition than general handyman services.

The practical market position is therefore: **a reliable specialist contractor for protecting, maintaining, and upgrading commercial and managed properties**.

## 5. Customers and buying context

### Primary customer segments

- Businesses and commercial property occupiers.
- Shopping centres and retail property managers.
- Hospitals and healthcare facilities.
- Warehouses, factories, and industrial facilities.
- Townhouse complexes, body corporates, and managing agents.
- Residential and commercial developers.
- Facilities-management and property-management companies.

### Named or displayed client signals

The company profile displays Specialised Coating Systems, Anaprop, Family Dental, Sasol Garages, Engine, Sanlam, and DVI. These are useful credibility signals but should only be presented as clients or completed work where Dainamo has permission and evidence to do so.

### Typical stakeholders

- Property or facility manager.
- Body corporate or trustees.
- Procurement/accounts department.
- Project manager, architect, engineer, or quantity surveyor.
- Site manager or operational manager.
- Owner or executive decision-maker.

### Buying concerns inferred from the material

- Can the supplier execute specialist work correctly and safely?
- Is the quotation complete enough to prevent later disputes?
- Are labour, material, access, and equipment assumptions explicit?
- Will the work be delivered on time and within budget?
- Is the contractor credible, reachable, and accountable?
- Are exclusions, VAT treatment, deposit requirements, and completion payments clear?

## 6. Services

### Strategic core services

These align most closely with the owner's stated repositioning and should receive priority in the system's reusable catalogue and future marketing:

- Epoxy flooring for hospitals, food facilities, warehouses, and industrial environments.
- Industrial and specialised coating systems.
- Waterproofing, including torch-on systems, membranes, roof sealing, and repairs.
- Damp proofing and remedial damp treatment.
- Commercial and industrial maintenance contracts.
- Newer protective and performance coating systems requiring specialist application knowledge.

### Full service capability shown in the company profile

1. **Architecture and construction**
   - Architectural design and planning.
   - New building construction.
   - Renovations and structural improvements.
2. **Plumbing**
   - Full installations.
   - Repairs and maintenance.
   - Pipework, valves, and fittings.
3. **Electrical**
   - Electrical installations.
   - Fault finding and repairs.
   - Maintenance and upgrades.
4. **Solar systems**
   - Solar installations.
   - Backup and energy solutions.
   - Maintenance and servicing.
5. **Interior and finishes**
   - Skimming and plastering.
   - Ceiling installations.
   - Drywall partitioning.
   - Painting and spray painting.
6. **Flooring and coating systems**
   - Epoxy flooring.
   - Industrial and specialised coatings.
7. **Thermoplastic and outdoor works**
   - Thermoplastic road marking and demarcation.
   - Playground surfacing and installations.
8. **Waterproofing and damp proofing**
   - Torch-on waterproofing.
   - Damp-proofing solutions.
   - Roof sealing and repairs.
9. **HVAC**
   - Air-conditioning installation.
   - Servicing and maintenance.
10. **Maintenance services**
    - General building maintenance.
    - Commercial property maintenance.
    - Industrial maintenance solutions.

The broad capability should be retained, but the product and future website should foreground specialist coatings, waterproofing, damp proofing, and maintenance contracts so Dainamo does not drift back into commodity handyman positioning.

## 7. Mission, vision, and values

**Mission:** Provide high-quality, reliable, innovative construction and maintenance services while maintaining strong client relationships based on trust and professionalism.

**Vision:** Become a leading service provider in construction, maintenance, and specialised coating systems across South Africa.

**Values stated in the company profile:** integrity, quality, safety, reliability, innovation, and customer satisfaction.

The system should express those values operationally: accurate calculations support integrity; explicit scopes and exclusions support trust; consistent documents support quality; quick mobile use supports reliability; and reusable specialist templates support professional execution.

## 8. Current commercial-document workflow

The supplied sample is a detailed project document for exterior refurbishment, waterproofing, and painting. Although its heading says "Invoice", parts of the wording say "quotation" and request a 70% deposit upon acceptance. This suggests the same manual template is currently adapted for more than one document type. The software should make quotation and invoice semantics explicit while preserving a shared visual template.

The current template contains:

- Branded logo and property imagery.
- Company phone, email, and physical address.
- Document title.
- Customer company, site address, contact person, and phone.
- Project title.
- Work method or specification narrative.
- Date and custom document number.
- Project description.
- Measured/estimated project areas.
- A materials table with description, quantity, unit, unit price, and amount.
- A labour scope checklist plus a labour total.
- Equipment-hire items and total.
- Additional costs and total.
- VAT-inclusive summary by category and grand total.
- Deposit percentage and balance terms.
- Exclusions.
- Banking details.
- Acceptance/payment callout.

### Supplied banking details

**Account name:** Dainamo Holdings (Pty) Ltd  
**Bank:** Standard Bank  
**Account number:** 10119429479  
**Branch code:** 012042  
**Account type:** Biz

These details are sensitive operational data and should be editable only in company settings. They must be verified by the owner before production use.

## 9. Immediate product objective

The first product should let the owner complete the following workflow on a phone in a few minutes:

1. Tap **New document**.
2. Choose **Quotation** or **Invoice**.
3. Select an existing customer or enter a new one.
4. Enter the site/project details.
5. Add materials, labour, equipment, and additional costs using simple category-specific editors.
6. Confirm VAT treatment, deposit, terms, and exclusions.
7. Review a branded live preview.
8. Save a draft.
9. Generate a PDF.
10. Share the PDF using the phone's native share sheet, including WhatsApp where supported.
11. Later update the status to sent, accepted, paid, declined, or overdue as appropriate.

## 10. MVP functional scope

### Documents

- Create quotations and invoices from the same consistent data model.
- Draft autosave on the current device.
- Sequential document numbering with an editable number for legacy/reference compatibility.
- Duplicate an existing document for repeat or revised work.
- Convert an accepted quotation into an invoice without retyping.
- Search and filter by customer, project, number, type, or status.
- Statuses:
  - Quotation: draft, sent, accepted, declined, expired, converted.
  - Invoice: draft, sent, part paid, paid, overdue, cancelled.
- Correct South African rand formatting.
- Dates displayed in day-month-year form.
- Download a branded PDF.
- Use the Web Share API on supported phones to share the generated PDF.
- Print/save through the browser as a fallback.

### Project-commercial structure

- Customer and site details.
- Project name and description.
- Method/specification narrative.
- Estimated areas or measurements with units such as m², linear metre, item, or lot.
- Materials with quantity, unit, rate, and amount.
- Labour scope checklist and labour price.
- Equipment-hire line items.
- Additional-cost line items.
- Category subtotals and grand total.
- VAT mode: inclusive, exclusive, or no VAT, with a configurable rate.
- Deposit percentage and calculated deposit amount.
- Balance/payment wording.
- Exclusions.
- Notes.

### Customers

- Save legal/trading name, site address, contact person, phone, and email.
- Reuse customer details in new documents.
- See customer-specific document history.

### Company settings

- Company/contact details.
- Logo.
- Banking details.
- Default VAT handling.
- Default deposit percentage.
- Default payment terms and exclusions.
- Document-number prefixes.
- Local data export for backup.

### Mobile and field usability

- Touch targets of at least 44 px.
- Single-column editing below tablet widths.
- Sticky bottom action bar for save, preview, and PDF/share.
- Labels above fields and numeric keyboards for quantities/prices.
- Minimal navigation and no dense desktop-only tables on phones.
- Works in modern mobile browsers and can be added to the home screen.
- Local-first operation so a draft is not lost when site connectivity is poor.

## 11. Calculation rules

- A material/equipment/additional line amount is `quantity × unit price`.
- Category totals are the sum of their line amounts.
- Labour can be a fixed complete-scope amount in the first release, matching the sample.
- Subtotal is materials + labour + equipment + additional costs.
- Exclusive VAT: VAT is added to the subtotal.
- Inclusive VAT: the entered prices already include VAT; the VAT portion is disclosed but not added again.
- No VAT: VAT is zero and tax wording is removed.
- Deposit amount is `grand total × deposit percentage`.
- Balance amount is `grand total − deposit amount`.
- Currency calculations should be rounded to two decimal places and production persistence should use decimal values, not binary floating-point.

## 12. Recommended information architecture

- **Home:** recent documents, outstanding value, accepted/unpaid work, and one dominant New document action.
- **Documents:** combined quote/invoice list with simple filters.
- **Customers:** reusable contacts and their history.
- **Settings:** company identity, payment defaults, document defaults, and backups.
- **Document editor:** Details, Pricing, Terms, and Preview as a short guided flow.

The owner should not have to understand accounting software terminology to use the product. Labels should use the language in the current template: Project, Materials, Labour, Equipment hire, Additional costs, Payment terms, and Exclusions.

## 13. Architecture decision for this first build

The Cloudia ERP project is a useful conceptual reference, but copying its full stack would import many unrelated marketing-agency, AI-agent, multi-tenant, outreach, and infrastructure concerns. The first Dainamo build therefore reuses its proven domain ideas while using a smaller architecture:

- Next.js and TypeScript for an installable responsive web application.
- A typed local-first store for immediate use and offline resilience.
- Branded client-side PDF generation.
- Native file sharing where the mobile platform supports it.
- Structured data designed so the storage adapter can later be swapped for a hosted API/database without redesigning the UI.

This is appropriate for rapid validation with one owner. Before multiple staff or multiple devices rely on it, persistence should move to an authenticated hosted database with encrypted backups and an audit trail.

## 14. Data entities

### Company settings

Identity, address, contacts, tax status, bank details, defaults, logo, numbering rules.

### Customer

Name, site/billing address, contact name, mobile, email, notes, created/updated dates.

### Document

Type, number, status, customer snapshot, project fields, dates, VAT settings, deposit settings, notes, timestamps, and optional source quotation ID.

### Area item

Description, quantity/value, unit.

### Cost item

Category, description, quantity, unit, unit price, sort order.

### Labour scope item

Description, included flag, sort order.

### Payment record (next phase)

Invoice, amount, date, method, reference, note.

## 15. Security, compliance, and operational considerations

- Company bank information and customer contact information must not be exposed publicly.
- Production must use HTTPS, authenticated access, strong passwords/passkeys, and server-side backups.
- If more than one staff member uses the system, records need user attribution and an audit history.
- POPIA principles apply to stored customer contacts: collect only what is needed, secure it, and support correction/deletion.
- VAT wording and tax-invoice requirements must be confirmed against Dainamo's actual VAT registration status. The supplied documents do not prove VAT registration.
- Document numbers should be unique and not silently reused after deletion.
- PDFs should snapshot customer/company details so historical documents do not change when settings are edited.
- Banking details should be verified before every production template rollout to reduce payment-redirection risk.

## 16. Out of scope for the first release

- Full accounting ledger, reconciliation, or financial statements.
- Payroll and staff scheduling.
- Inventory/warehouse management.
- Supplier purchase orders.
- Automated recurring billing.
- Payment gateway integration.
- Multi-company tenancy.
- Complex role-based permissions.
- AI-generated prices or technical specifications without human approval.
- A public customer portal.
- The enquiry chatbot requested by the owner.

## 17. Recommended roadmap

### Phase 1: Field quotations and invoices

The MVP defined above, validated with the owner against several real historical documents.

### Phase 2: Hosted operational reliability

Authentication, cloud database, multi-device sync, backups, staff accounts, audit trail, email delivery, payment records, automatic overdue state, and reusable service/material templates.

### Phase 3: Maintenance-contract operations

Contract register, recurring visits, site assets, job cards, before/after photos, signatures, safety documents, progress claims, snag lists, and contract renewal reminders.

### Phase 4: Customer enquiries and AI assistant

A website/WhatsApp assistant grounded only in approved company information. It should answer service-area and capability questions, collect lead details, ask for site photos/location, and hand qualified enquiries to a person. It must not invent pricing, guarantees, compliance claims, or technical recommendations.

### Phase 5: Management insight

Pipeline value, quote acceptance rate, gross margin by project type, debtor ageing, contract revenue, repeat customers, material/labour variance, and service-line profitability.

## 18. Acceptance criteria for the MVP

- A first-time user can create and share a basic quotation from a phone without instruction.
- The generated PDF visibly belongs to Dainamo and retains the major sections of the supplied template.
- The same project data can produce either a quotation or an invoice with correct wording.
- All line and category totals are calculated automatically and match test calculations.
- Inclusive VAT is not added a second time.
- A 70% deposit and 30% balance are calculated correctly.
- Drafts persist after refreshing or closing the browser on the same device.
- An accepted quote can be converted to an invoice without re-entry.
- The interface has no horizontal scrolling at 360 px width.
- Keyboard focus, labels, contrast, and touch sizes meet practical WCAG 2.2 AA expectations.
- PDF download works on desktop; native share is offered on compatible mobile browsers with a safe download fallback.

## 19. Known unknowns to verify before production

- Company registration number.
- VAT registration status and VAT number.
- Whether each displayed client logo may be used publicly.
- Exact legal wording for deposits, cancellation, variation orders, warranties, and late payment.
- Preferred numbering convention for quotes versus invoices.
- Whether Dainamo prices primarily VAT-inclusive, VAT-exclusive, or is not VAT registered.
- Which staff need access and whether documents must sync across devices.
- Whether email sending should originate from Gmail, a business domain, or another provider.
- Whether customer acceptance requires an e-signature or signed PDF.

