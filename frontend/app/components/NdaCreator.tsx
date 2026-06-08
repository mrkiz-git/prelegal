"use client";

import { useState, useCallback, useRef, useMemo, Fragment } from "react";

interface Party {
  name: string;
  title: string;
  company: string;
  noticeAddress: string;
}

interface NdaFormData {
  purpose: string;
  effectiveDate: string;
  mndaTermType: "expires" | "continues";
  mndaTermYears: string;
  confidentialityTermType: "years" | "perpetuity";
  confidentialityTermYears: string;
  governingLaw: string;
  jurisdiction: string;
  modifications: string;
  party1: Party;
  party2: Party;
}

function today(): string {
  return new Date().toISOString().split("T")[0];
}

function formatDate(iso: string): string {
  if (!iso) return "[Today's date]";
  const [y, m, d] = iso.split("-");
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];
  return `${months[parseInt(m) - 1]} ${parseInt(d)}, ${y}`;
}

function generateCoverPage(data: NdaFormData): string {
  const p1 = data.party1;
  const p2 = data.party2;

  const purposeText = data.purpose.trim() || "Evaluating whether to enter into a business relationship with the other party.";
  const effectiveDateText = data.effectiveDate ? formatDate(data.effectiveDate) : "[Today's date]";

  const mndaTermText =
    data.mndaTermType === "expires"
      ? `Expires ${data.mndaTermYears || "1"} year(s) from Effective Date.`
      : "Continues until terminated in accordance with the terms of the MNDA.";

  const confTermText =
    data.confidentialityTermType === "years"
      ? `${data.confidentialityTermYears || "1"} year(s) from Effective Date, but in the case of trade secrets until Confidential Information is no longer considered a trade secret under applicable laws.`
      : "In perpetuity.";

  const governingLawText = data.governingLaw.trim() || "[Fill in state]";
  const jurisdictionText = data.jurisdiction.trim() || "[Fill in city or county and state]";
  const modificationsText = data.modifications.trim() || "None.";

  return `# Mutual Non-Disclosure Agreement

## USING THIS MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement (the "MNDA") consists of: (1) this Cover Page ("**Cover Page**") and (2) the Common Paper Mutual NDA Standard Terms Version 1.0 ("**Standard Terms**") identical to those posted at [commonpaper.com/standards/mutual-nda/1.0](https://commonpaper.com/standards/mutual-nda/1.0). Any modifications of the Standard Terms should be made on the Cover Page, which will control over conflicts with the Standard Terms.

### Purpose
*How Confidential Information may be used*

${purposeText}

### Effective Date
${effectiveDateText}

### MNDA Term
*The length of this MNDA*

${mndaTermText}

### Term of Confidentiality
*How long Confidential Information is protected*

${confTermText}

### Governing Law & Jurisdiction
Governing Law: ${governingLawText}

Jurisdiction: ${jurisdictionText}

### MNDA Modifications

${modificationsText}

By signing this Cover Page, each party agrees to enter into this MNDA as of the Effective Date.

| | PARTY 1 | PARTY 2 |
|:--- | :----: | :----: |
| Signature | | |
| Print Name | ${p1.name || " "} | ${p2.name || " "} |
| Title | ${p1.title || " "} | ${p2.title || " "} |
| Company | ${p1.company || " "} | ${p2.company || " "} |
| Notice Address | ${p1.noticeAddress || " "} | ${p2.noticeAddress || " "} |
| Date | | |

Common Paper Mutual Non-Disclosure Agreement (Version 1.0) free to use under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).`;
}

const STANDARD_TERMS = `---

# Standard Terms

1. **Introduction**. This Mutual Non-Disclosure Agreement (which incorporates these Standard Terms and the Cover Page (defined below)) ("**MNDA**") allows each party ("**Disclosing Party**") to disclose or make available information in connection with the Purpose which (1) the Disclosing Party identifies to the receiving party ("**Receiving Party**") as "confidential", "proprietary", or the like or (2) should be reasonably understood as confidential or proprietary due to its nature and the circumstances of its disclosure ("**Confidential Information**"). Each party's Confidential Information also includes the existence and status of the parties' discussions and information on the Cover Page. Confidential Information includes technical or business information, product designs or roadmaps, requirements, pricing, security and compliance documentation, technology, inventions and know-how. To use this MNDA, the parties must complete and sign a cover page incorporating these Standard Terms ("**Cover Page**"). Each party is identified on the Cover Page and capitalized terms have the meanings given herein or on the Cover Page.

2. **Use and Protection of Confidential Information**. The Receiving Party shall: (a) use Confidential Information solely for the Purpose; (b) not disclose Confidential Information to third parties without the Disclosing Party's prior written approval, except that the Receiving Party may disclose Confidential Information to its employees, agents, advisors, contractors and other representatives having a reasonable need to know for the Purpose, provided these representatives are bound by confidentiality obligations no less protective of the Disclosing Party than the applicable terms in this MNDA and the Receiving Party remains responsible for their compliance with this MNDA; and (c) protect Confidential Information using at least the same protections the Receiving Party uses for its own similar information but no less than a reasonable standard of care.

3. **Exceptions**. The Receiving Party's obligations in this MNDA do not apply to information that it can demonstrate: (a) is or becomes publicly available through no fault of the Receiving Party; (b) it rightfully knew or possessed prior to receipt from the Disclosing Party without confidentiality restrictions; (c) it rightfully obtained from a third party without confidentiality restrictions; or (d) it independently developed without using or referencing the Confidential Information.

4. **Disclosures Required by Law**. The Receiving Party may disclose Confidential Information to the extent required by law, regulation or regulatory authority, subpoena or court order, provided (to the extent legally permitted) it provides the Disclosing Party reasonable advance notice of the required disclosure and reasonably cooperates, at the Disclosing Party's expense, with the Disclosing Party's efforts to obtain confidential treatment for the Confidential Information.

5. **Term and Termination**. This MNDA commences on the Effective Date and expires at the end of the MNDA Term. Either party may terminate this MNDA for any or no reason upon written notice to the other party. The Receiving Party's obligations relating to Confidential Information will survive for the Term of Confidentiality, despite any expiration or termination of this MNDA.

6. **Return or Destruction of Confidential Information**. Upon expiration or termination of this MNDA or upon the Disclosing Party's earlier request, the Receiving Party will: (a) cease using Confidential Information; (b) promptly after the Disclosing Party's written request, destroy all Confidential Information in the Receiving Party's possession or control or return it to the Disclosing Party; and (c) if requested by the Disclosing Party, confirm its compliance with these obligations in writing. As an exception to subsection (b), the Receiving Party may retain Confidential Information in accordance with its standard backup or record retention policies or as required by law, but the terms of this MNDA will continue to apply to the retained Confidential Information.

7. **Proprietary Rights**. The Disclosing Party retains all of its intellectual property and other rights in its Confidential Information and its disclosure to the Receiving Party grants no license under such rights.

8. **Disclaimer**. ALL CONFIDENTIAL INFORMATION IS PROVIDED "AS IS", WITH ALL FAULTS, AND WITHOUT WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF TITLE, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.

9. **Governing Law and Jurisdiction**. This MNDA and all matters relating hereto are governed by, and construed in accordance with, the laws of the State of [Governing Law], without regard to the conflict of laws provisions of such [Governing Law]. Any legal suit, action, or proceeding relating to this MNDA must be instituted in the federal or state courts located in [Jurisdiction]. Each party irrevocably submits to the exclusive jurisdiction of such [Jurisdiction] in any such suit, action, or proceeding.

10. **Equitable Relief**. A breach of this MNDA may cause irreparable harm for which monetary damages are an insufficient remedy. Upon a breach of this MNDA, the Disclosing Party is entitled to seek appropriate equitable relief, including an injunction, in addition to its other remedies.

11. **General**. Neither party has an obligation under this MNDA to disclose Confidential Information to the other or proceed with any proposed transaction. Neither party may assign this MNDA without the prior written consent of the other party, except that either party may assign this MNDA in connection with a merger, reorganization, acquisition or other transfer of all or substantially all its assets or voting securities. Any assignment in violation of this Section is null and void. This MNDA will bind and inure to the benefit of each party's permitted successors and assigns. Waivers must be signed by the waiving party's authorized representative and cannot be implied from conduct. If any provision of this MNDA is held unenforceable, it will be limited to the minimum extent necessary so the rest of this MNDA remains in effect. This MNDA (including the Cover Page) constitutes the entire agreement of the parties with respect to its subject matter, and supersedes all prior and contemporaneous understandings, agreements, representations, and warranties, whether written or oral, regarding such subject matter. This MNDA may only be amended, modified, waived, or supplemented by an agreement in writing signed by both parties. Notices, requests and approvals under this MNDA must be sent in writing to the email or postal addresses on the Cover Page and are deemed delivered on receipt. This MNDA may be executed in counterparts, including electronic copies, each of which is deemed an original and which together form the same agreement.

Common Paper Mutual Non-Disclosure Agreement [Version 1.0](https://commonpaper.com/standards/mutual-nda/1.0/) free to use under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).`;

const defaultData: NdaFormData = {
  purpose: "Evaluating whether to enter into a business relationship with the other party.",
  effectiveDate: "",
  mndaTermType: "expires",
  mndaTermYears: "1",
  confidentialityTermType: "years",
  confidentialityTermYears: "1",
  governingLaw: "",
  jurisdiction: "",
  modifications: "",
  party1: { name: "", title: "", company: "", noticeAddress: "" },
  party2: { name: "", title: "", company: "", noticeAddress: "" },
};

function InputField({
  label,
  hint,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {hint && <span className="ml-1 text-xs font-normal text-gray-400">({hint})</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

function TextareaField({
  label,
  hint,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {hint && <span className="ml-1 text-xs font-normal text-gray-400">({hint})</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
      />
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 border-b border-gray-200 pb-1 mt-6 mb-3">
      {children}
    </h3>
  );
}

function PartyFields({
  label,
  party,
  onChange,
}: {
  label: string;
  party: Party;
  onChange: (updated: Party) => void;
}) {
  const update = (field: keyof Party) => (v: string) =>
    onChange({ ...party, [field]: v });

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-gray-800">{label}</p>
      <InputField label="Print Name" value={party.name} onChange={update("name")} placeholder="Full name" />
      <InputField label="Title" value={party.title} onChange={update("title")} placeholder="e.g. CEO" />
      <InputField label="Company" value={party.company} onChange={update("company")} placeholder="Company name" />
      <InputField
        label="Notice Address"
        hint="email or postal"
        value={party.noticeAddress}
        onChange={update("noticeAddress")}
        placeholder="email@example.com"
      />
    </div>
  );
}

function DocumentPreview({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <div className="text-sm text-gray-800 leading-relaxed space-y-1 font-mono whitespace-pre-wrap break-words">
      {lines.map((line, i) => {
        if (line.startsWith("# ")) {
          return <h1 key={i} className="text-xl font-bold text-gray-900 mt-0 mb-2">{line.slice(2)}</h1>;
        }
        if (line.startsWith("## ")) {
          return <h2 key={i} className="text-base font-semibold text-gray-800 mt-4 mb-1">{line.slice(3)}</h2>;
        }
        if (line.startsWith("### ")) {
          return <h3 key={i} className="text-sm font-semibold text-gray-700 mt-3 mb-0.5">{line.slice(4)}</h3>;
        }
        if (line.startsWith("---")) {
          return <hr key={i} className="border-gray-300 my-4" />;
        }
        if (line.startsWith("| ")) {
          return <TableRow key={i} line={line} />;
        }
        if (line.startsWith("*") && line.endsWith("*")) {
          return <p key={i} className="text-xs text-gray-500 italic">{line.slice(1, -1)}</p>;
        }
        return <p key={i} className="text-sm text-gray-700">{renderInline(line)}</p>;
      })}
    </div>
  );
}

function TableRow({ line }: { line: string }) {
  const cells = line.split("|").filter((_, i, arr) => i > 0 && i < arr.length - 1);
  const isSeparator = cells.every((c) => /^[\s:-]+$/.test(c));
  if (isSeparator) return null;
  return (
    <div className="flex text-xs border-b border-gray-200 py-1">
      {cells.map((cell, i) => (
        <div key={i} className={`${i === 0 ? "w-32 font-medium text-gray-600" : "flex-1 text-gray-700"} px-1`}>
          {cell.trim()}
        </div>
      ))}
    </div>
  );
}

function buildFilename(data: NdaFormData, ext: string): string {
  const p1 = data.party1.company || data.party1.name || "Party1";
  const p2 = data.party2.company || data.party2.name || "Party2";
  return `MNDA_${p1}_${p2}_${data.effectiveDate || today()}.${ext}`.replace(/\s+/g, "_");
}

function renderInline(text: string): React.ReactNode {
  if (!text.includes("**") && !text.includes("[")) return text;
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return <span key={i} className="text-blue-600 underline">{linkMatch[1]}</span>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export default function NdaCreator() {
  const [data, setData] = useState<NdaFormData>(() => ({ ...defaultData, effectiveDate: today() }));
  const [copied, setCopied] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const updateField = useCallback(
    <K extends keyof NdaFormData>(field: K) =>
      (value: NdaFormData[K]) =>
        setData((prev) => ({ ...prev, [field]: value })),
    []
  );

  const updateParty = useCallback(
    (party: "party1" | "party2") => (updated: Party) =>
      setData((prev) => ({ ...prev, [party]: updated })),
    []
  );

  const fullDocument = useMemo(
    () => generateCoverPage(data) + "\n\n" + STANDARD_TERMS,
    [data]
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullDocument);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard write failed (e.g. permission denied)
    }
  };

  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;
    setPdfLoading(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const element = previewRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const usableW = pageW - margin * 2;
      const imgH = (canvas.height * usableW) / canvas.width;

      let remaining = imgH;
      let srcY = 0;

      while (remaining > 0) {
        const sliceH = Math.min(remaining, pageH - margin * 2);
        const sliceCanvas = document.createElement("canvas");
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = (sliceH / usableW) * canvas.width;
        const ctx = sliceCanvas.getContext("2d")!;
        ctx.drawImage(canvas, 0, srcY * (canvas.width / usableW), canvas.width, sliceCanvas.height, 0, 0, sliceCanvas.width, sliceCanvas.height);
        pdf.addImage(sliceCanvas.toDataURL("image/png"), "PNG", margin, margin, usableW, sliceH);
        remaining -= sliceH;
        srcY += sliceH;
        if (remaining > 0) pdf.addPage();
      }

      pdf.save(buildFilename(data, "pdf"));
    } finally {
      setPdfLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([fullDocument], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = buildFilename(data, "md");
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Form panel */}
      <div className="w-[420px] flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
        <div className="px-6 py-5 border-b border-gray-200 flex-shrink-0">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-0.5">KAN-3</p>
          <h1 className="text-lg font-bold text-gray-900">Mutual NDA Creator</h1>
          <p className="text-xs text-gray-500 mt-0.5">Fill in the cover page to generate your MNDA</p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-8">
          <SectionHeading>Agreement Details</SectionHeading>

          <div className="space-y-4">
            <TextareaField
              label="Purpose"
              hint="how confidential information may be used"
              value={data.purpose}
              onChange={updateField("purpose")}
              placeholder="Evaluating whether to enter into a business relationship..."
              rows={2}
            />

            <InputField
              label="Effective Date"
              value={data.effectiveDate}
              onChange={updateField("effectiveDate")}
              type="date"
            />
          </div>

          <SectionHeading>MNDA Term</SectionHeading>
          <div className="space-y-2">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="radio"
                name="mndaTerm"
                checked={data.mndaTermType === "expires"}
                onChange={() => updateField("mndaTermType")("expires")}
                className="mt-0.5"
              />
              <div className="flex-1">
                <span className="text-sm text-gray-700">Expires after </span>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={data.mndaTermYears}
                  onChange={(e) => updateField("mndaTermYears")(e.target.value)}
                  onClick={() => updateField("mndaTermType")("expires")}
                  className="w-14 rounded border border-gray-300 px-2 py-0.5 text-sm text-center focus:border-blue-500 focus:outline-none"
                />
                <span className="text-sm text-gray-700"> year(s) from Effective Date</span>
              </div>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="mndaTerm"
                checked={data.mndaTermType === "continues"}
                onChange={() => updateField("mndaTermType")("continues")}
              />
              <span className="text-sm text-gray-700">Continues until terminated</span>
            </label>
          </div>

          <SectionHeading>Term of Confidentiality</SectionHeading>
          <div className="space-y-2">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="radio"
                name="confTerm"
                checked={data.confidentialityTermType === "years"}
                onChange={() => updateField("confidentialityTermType")("years")}
                className="mt-0.5"
              />
              <div className="flex-1">
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={data.confidentialityTermYears}
                  onChange={(e) => updateField("confidentialityTermYears")(e.target.value)}
                  onClick={() => updateField("confidentialityTermType")("years")}
                  className="w-14 rounded border border-gray-300 px-2 py-0.5 text-sm text-center focus:border-blue-500 focus:outline-none"
                />
                <span className="text-sm text-gray-700"> year(s) from Effective Date (trade secrets protected until no longer a trade secret)</span>
              </div>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="confTerm"
                checked={data.confidentialityTermType === "perpetuity"}
                onChange={() => updateField("confidentialityTermType")("perpetuity")}
              />
              <span className="text-sm text-gray-700">In perpetuity</span>
            </label>
          </div>

          <SectionHeading>Governing Law & Jurisdiction</SectionHeading>
          <div className="space-y-4">
            <InputField
              label="Governing Law"
              hint="state"
              value={data.governingLaw}
              onChange={updateField("governingLaw")}
              placeholder="e.g. Delaware"
            />
            <InputField
              label="Jurisdiction"
              hint='e.g. "courts located in New Castle, DE"'
              value={data.jurisdiction}
              onChange={updateField("jurisdiction")}
              placeholder="courts located in New Castle, DE"
            />
          </div>

          <SectionHeading>Modifications</SectionHeading>
          <TextareaField
            label="MNDA Modifications"
            hint="any changes to the Standard Terms"
            value={data.modifications}
            onChange={updateField("modifications")}
            placeholder="None."
            rows={2}
          />

          <SectionHeading>Party 1</SectionHeading>
          <PartyFields label="Party 1" party={data.party1} onChange={updateParty("party1")} />

          <SectionHeading>Party 2</SectionHeading>
          <PartyFields label="Party 2" party={data.party2} onChange={updateParty("party2")} />
        </div>
      </div>

      {/* Preview panel */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="px-6 py-4 border-b border-gray-200 bg-white flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Document Preview</h2>
            <p className="text-xs text-gray-500">Updates live as you type</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
            <button
              onClick={handleDownloadPdf}
              disabled={pdfLoading}
              className="flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {pdfLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Generating…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Download PDF
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download .md
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div ref={previewRef} className="max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 shadow-sm p-8">
            <DocumentPreview content={fullDocument} />
          </div>
        </div>
      </div>
    </div>
  );
}
