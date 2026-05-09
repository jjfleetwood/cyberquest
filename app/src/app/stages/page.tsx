import Link from "next/link";

const stages = [
  {
    id: "stage-01",
    order: 1,
    title: "Cybersecurity Foundations",
    description: "CIA Triad, core security principles, and your first challenges.",
    category: "cybersecurity",
    xp: 100,
    unlocked: true,
    completed: false,
    activities: 3,
  },
  {
    id: "stage-02",
    order: 2,
    title: "AI Basics & Threat Detection",
    description: "How AI is used to detect and respond to cyber threats.",
    category: "ai",
    xp: 150,
    unlocked: true,
    completed: false,
    activities: 3,
  },
  {
    id: "stage-03",
    order: 3,
    title: "Social Engineering & Phishing",
    description: "Recognize and defend against human-based attack vectors.",
    category: "cybersecurity",
    xp: 200,
    unlocked: false,
    completed: false,
    activities: 2,
  },
  {
    id: "stage-04",
    order: 4,
    title: "Network Security",
    description: "Firewalls, VPNs, intrusion detection, and packet analysis.",
    category: "cybersecurity",
    xp: 250,
    unlocked: false,
    completed: false,
    activities: 4,
  },
  {
    id: "stage-05",
    order: 5,
    title: "AI Adversarial Attacks",
    description: "Understand and defend against attacks targeting AI systems.",
    category: "ai",
    xp: 300,
    unlocked: false,
    completed: false,
    activities: 3,
  },
];

const categoryColors: Record<string, string> = {
  cybersecurity: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
  ai: "text-purple-400 bg-purple-400/10 border-purple-400/30",
};

export default function StagesPage() {
  return (
    <div
      className="min-h-screen px-4 py-16"
      style={{ background: "linear-gradient(135deg, #0d1117 0%, #0f2027 50%, #1a1a2e 100%)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-gray-500 hover:text-cyan-400 text-sm mb-4 inline-block transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Training Stage Map</h1>
          <p className="text-gray-400">Complete stages in order to unlock new challenges and earn XP.</p>

          {/* XP bar placeholder */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 bg-white/5 rounded-full h-3">
              <div className="bg-cyan-500 h-3 rounded-full" style={{ width: "0%" }} />
            </div>
            <span className="text-cyan-400 font-mono text-sm">0 XP</span>
          </div>
        </div>

        {/* Stage list */}
        <div className="flex flex-col gap-4">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className={`relative border rounded-xl p-6 transition-all ${
                stage.unlocked
                  ? "border-cyan-500/40 bg-white/5 hover:border-cyan-400"
                  : "border-white/5 bg-white/2 opacity-50"
              }`}
            >
              {/* Stage number */}
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 ${
                    stage.unlocked ? "bg-cyan-500 text-black" : "bg-white/10 text-gray-600"
                  }`}
                >
                  {stage.unlocked ? stage.order : "🔒"}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-white font-semibold text-lg">{stage.title}</h2>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[stage.category]}`}
                    >
                      {stage.category === "ai" ? "AI" : "Cybersecurity"}
                    </span>
                    {stage.id === "stage-02" && (
                      <span className="text-xs px-2 py-0.5 rounded-full border text-purple-400 bg-purple-400/10 border-purple-400/30">
                        🚩 CTF
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{stage.description}</p>

                  <div className="flex items-center gap-6 text-xs text-gray-500">
                    <span>{stage.activities} activities</span>
                    <span className="text-cyan-600">+{stage.xp} XP</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex-shrink-0">
                  {stage.unlocked ? (
                    <Link
                      href={`/stages/${stage.id}`}
                      className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg text-sm transition-colors"
                    >
                      Start →
                    </Link>
                  ) : (
                    <div className="px-5 py-2 bg-white/5 text-gray-600 rounded-lg text-sm cursor-not-allowed">
                      Locked
                    </div>
                  )}
                </div>
              </div>

              {/* Connector line */}
              {stage.order < stages.length && (
                <div className="absolute left-10 -bottom-4 w-0.5 h-4 bg-white/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
