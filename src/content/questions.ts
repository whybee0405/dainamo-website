/**
 * Answer-engine content.
 *
 * Each answer opens with a complete, quotable sentence so an assistant can lift
 * it without inventing the rest. Nothing here promises a price, a warranty
 * period or a certification, because none of those have been confirmed.
 */

export type Question = {
  question: string
  answer: string
  topic: 'general' | 'commercial' | 'site' | 'technical' | 'contracts'
  onHome?: boolean
}

export const questions: Question[] = [
  {
    question: 'What areas does Dainamo Holdings cover?',
    answer:
      'Dainamo Holdings works across Johannesburg and the wider Gauteng region, including Sandton, Midrand, Randburg, Roodepoort, Germiston, Boksburg, Benoni, Kempton Park, Edenvale, Alberton, Centurion and Pretoria. The yard and offices are in City Deep, Johannesburg. Larger contracts are taken elsewhere in South Africa by arrangement.',
    topic: 'general',
    onHome: true,
  },
  {
    question: 'How long does an epoxy floor take before it can be used?',
    answer:
      'Most epoxy systems accept foot traffic around 24 hours after the final coat and full mechanical traffic after about seven days, but the actual time depends on the system, the thickness and the temperature on site. Dainamo confirms cure times for the specified system in writing before the programme is agreed.',
    topic: 'technical',
    onHome: true,
  },
  {
    question: 'Can the work happen without closing the building?',
    answer:
      'Yes, in most cases. Shopping centres, hospitals, warehouses and offices are normally done in phases, at night or over weekends, with each section barriered, completed and handed back before the next one opens. The phasing plan is agreed with the facilities manager before work starts.',
    topic: 'site',
    onHome: true,
  },
  {
    question: 'How do you decide whether damp is rising damp or a leak?',
    answer:
      'By taking moisture readings at different heights and looking at where the staining actually starts. Rising damp shows a tide mark that stops at a consistent height and carries salt deposits. Penetrating damp and plumbing leaks show a pattern that follows the source instead. Dainamo diagnoses the source before quoting a treatment. An injected damp-proof course will not help a wall that is wet from a leaking downpipe.',
    topic: 'technical',
    onHome: true,
  },
  {
    question: 'What does a Dainamo quotation include?',
    answer:
      'Quotations set out the measured project areas, an itemised materials list with quantities and rates, the full labour scope written as a checklist, equipment hire, additional costs, category subtotals and a grand total. Exclusions are listed. Trustees or procurement can compare it line by line with a quote from another contractor.',
    topic: 'commercial',
    onHome: true,
  },
  {
    question: 'What are the payment terms?',
    answer:
      'Dainamo normally works on a deposit against acceptance of the quotation, with the balance payable on completion. The deposit percentage is stated on each quotation and agreed before any material is ordered. Banking details are printed on the quotation and the invoice. Always confirm banking details directly with the office by phone before paying.',
    topic: 'commercial',
    onHome: true,
  },
  {
    question: 'Is Dainamo Holdings VAT registered?',
    answer:
      'Confirm the current VAT registration status with the office before issuing a purchase order, and the correct tax details will be provided in writing. Quotations state clearly whether prices are VAT inclusive, VAT exclusive, or issued without VAT.',
    topic: 'commercial',
  },
  {
    question: 'Do you take on maintenance contracts as well as one-off jobs?',
    answer:
      'Yes. Planned and reactive maintenance contracts are a large part of the business, covering building fabric, plumbing, electrical, HVAC, solar and specialist coatings under one contractor. A contract starts with a baseline condition survey, then an agreed schedule of planned visits and response times for reactive call outs, with photographed reports after each attendance.',
    topic: 'contracts',
  },
  {
    question: 'Why did our previous waterproofing fail so quickly?',
    answer:
      'Flat roofs usually fail at upstands, outlets, penetrations and movement joints, often because the detail was only sealed at the surface. A membrane laid on a wet substrate, or on a roof where water ponds, can also lift. Dainamo surveys and photographs every failed detail before quoting, so the repair deals with the cause.',
    topic: 'technical',
  },
  {
    question: 'Do you work in occupied hospitals and clinics?',
    answer:
      'Yes. Clinical work is phased section by section with sealed hoardings and dust containment, low-odour systems where the area is sensitive, and jointless finishes coved into the wall line for infection control. Each section is returned to service before the next one is opened. Cure times are given in writing up front, since they decide when an area can be used again.',
    topic: 'site',
  },
  {
    question: 'How does Dainamo handle safety and site cleanliness?',
    answer:
      'Site establishment and protection are priced as part of the scope. That covers barriers and signage in public areas, protection of nearby finishes, daily cleaning, and rubble removal. Final inspection and touch up are included before handover.',
    topic: 'site',
  },
  {
    question: 'What does Dainamo specialise in?',
    answer:
      'Specialist protective and finishing systems: epoxy and resin flooring, waterproofing, damp proofing, industrial and protective coatings, and planned maintenance contracts. The company started in general handyman work and has grown into these systems, which need specific training, equipment and product knowledge. General repairs are still available, and commercial clients get a contractor who documents what was done.',
    topic: 'general',
  },
]

export const homeQuestions = questions.filter((item) => item.onHome)
