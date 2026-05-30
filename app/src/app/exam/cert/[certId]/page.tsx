import Link from "next/link";
import ExamRunner from "@/components/ExamRunner";

type CertMeta = { name: string; code: string; hex: string; text: string; btn: string; border: string };

// Accent colors mirror the cards on /certs.
const CERT_META: Record<string, CertMeta> = {
  "comptia-secplus": { name: "CompTIA Security+", code: "SY0-701", hex: "#818cf8", text: "text-indigo-400", btn: "bg-indigo-500 hover:bg-indigo-400", border: "border-indigo-500/40" },
  "isc2-cc": { name: "ISC² CC", code: "Certified in Cybersecurity", hex: "#2dd4bf", text: "text-teal-400", btn: "bg-teal-500 hover:bg-teal-400", border: "border-teal-500/40" },
  "comptia-netplus": { name: "CompTIA Network+", code: "N10-009", hex: "#60a5fa", text: "text-blue-400", btn: "bg-blue-500 hover:bg-blue-400", border: "border-blue-500/40" },
  "comptia-cysa": { name: "CompTIA CySA+", code: "CS0-003", hex: "#f472b6", text: "text-pink-400", btn: "bg-pink-500 hover:bg-pink-400", border: "border-pink-500/40" },
  "isaca-cisa": { name: "ISACA CISA", code: "Certified Information Systems Auditor", hex: "#facc15", text: "text-yellow-400", btn: "bg-yellow-500 hover:bg-yellow-400", border: "border-yellow-500/40" },
  "isaca-cism": { name: "ISACA CISM", code: "Certified Information Security Manager", hex: "#a78bfa", text: "text-purple-400", btn: "bg-purple-500 hover:bg-purple-400", border: "border-purple-500/40" },
  "isaca-crisc": { name: "ISACA CRISC", code: "Risk and Information Systems Control", hex: "#2dd4bf", text: "text-teal-400", btn: "bg-teal-500 hover:bg-teal-400", border: "border-teal-500/40" },
  "comptia-aiplus": { name: "CompTIA AI+", code: "2024 blueprint", hex: "#38bdf8", text: "text-sky-400", btn: "bg-sky-500 hover:bg-sky-400", border: "border-sky-500/40" },
};

export default async function CertExamPage({ params }: { params: Promise<{ certId: string }> }) {
  const { certId } = await params;
  const meta = CERT_META[certId];

  if (!meta) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(135deg, #0d1117 0%, #0f2027 50%, #1a1a2e 100%)" }}>
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-black text-white mb-2">Exam not found</h2>
          <Link href="/certs" className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors">← Back to Certificate Paths</Link>
        </div>
      </div>
    );
  }

  return (
    <ExamRunner
      mode="cert"
      certId={certId}
      title={`${meta.name} — Practice Exam`}
      subtitle={`${meta.code} · randomized every attempt`}
      backHref="/certs"
      accentHex={meta.hex}
      accentText={meta.text}
      accentBtn={meta.btn}
      accentBorder={meta.border}
    />
  );
}
