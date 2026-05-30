import ExamRunner from "@/components/ExamRunner";

export default function DmvExamPage() {
  return (
    <ExamRunner
      mode="dmv"
      title="DMV Practice Test"
      subtitle="California knowledge exam · randomized every attempt"
      backHref="/stages/epoch/driving-1"
      accentHex="#facc15"
      accentText="text-yellow-400"
      accentBtn="bg-yellow-500 hover:bg-yellow-400"
      accentBorder="border-yellow-500/40"
    />
  );
}
