"""
audit-cm12-maturity.py
MCP Server: SOC Maturity Scorecard — MTTD/MTTR Calculation and Maturity Model Scoring
Lesson: Measuring your security operations center effectiveness — from alert to containment.

BACKGROUND — MGM Resorts International (2023):
  In September 2023, ALPHV/BlackCat ransomware encrypted MGM Resorts' casino operations.
  The attack started with a 10-minute vishing call to the IT help desk (social engineering).
  MGM's systems were down for 10 days. Estimated cost: $100M+ in lost revenue.
  Caesars Entertainment was hit the same week — paid $15M ransom silently, no disclosure.
  MGM's MTTD (time to detect): near-zero — the ransomware announced itself.
  MGM's MTTR (time to recover): 10 days — the catastrophic metric.
  A mature SOC (Level 4+) has tested recovery playbooks and offline backups ready to activate.
  MGM apparently had neither at sufficient scale for their casino floor dependency.

SOC MATURITY MODEL (CMM-inspired):
  Level 1 — Initial: Reactive. No defined processes. Heroic individual effort.
  Level 2 — Managed: Incident response plan exists. Basic SIEM deployed. Alert fatigue is high.
  Level 3 — Defined: Playbooks, SOAR, 24/7 monitoring. MTTD < 24h for most threats.
  Level 4 — Quantitatively Managed: Metrics-driven. MTTD/MTTR tracked and improving.
  Level 5 — Optimizing: Threat hunting, purple teaming, continuous improvement loop.

KEY METRICS:
  MTTD (Mean Time to Detect): How long between breach and detection?
  MTTR (Mean Time to Respond): How long to contain after detection?
  MTTC (Mean Time to Contain): Subset of MTTR — isolation/blocking.
  Alert-to-ticket rate: % of alerts that produce real tickets (not noise).
  False positive rate: % of P1 alerts that are benign.

SETUP:
  pip install anthropic

USAGE:
  python audit-cm12-maturity.py
  python audit-cm12-maturity.py --org "Acme Corp"
"""

import json
import argparse
from datetime import datetime, timezone, timedelta
import anthropic

MATURITY_TOOLS = [
    {
        "name": "collect_soc_metrics",
        "description": (
            "Collects SOC operational metrics from ticketing and SIEM: "
            "MTTD, MTTR, alert volume, false positive rate, analyst capacity."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "period_days": {"type": "integer", "default": 90, "description": "Lookback period for metrics."},
                "organization": {"type": "string"},
            },
            "required": [],
        },
    },
    {
        "name": "score_soc_maturity_pillar",
        "description": (
            "Scores a specific SOC maturity pillar (1-5): "
            "People, Process, Technology, Detection, Response, or Recovery."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "pillar": {
                    "type": "string",
                    "enum": ["people", "process", "technology", "detection", "response", "recovery"],
                },
            },
            "required": ["pillar"],
        },
    },
    {
        "name": "calculate_maturity_score",
        "description": "Calculates the composite SOC maturity score (Level 1-5) from all pillar scores.",
        "input_schema": {
            "type": "object",
            "properties": {
                "pillar_scores": {"type": "object", "description": "Dict of pillar → score (1-5)."},
            },
            "required": ["pillar_scores"],
        },
    },
    {
        "name": "benchmark_against_industry",
        "description": (
            "Benchmarks the organization's MTTD/MTTR/maturity against industry averages "
            "from IBM Cost of a Data Breach report and Mandiant M-Trends."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "metrics": {"type": "object", "description": "Organization's metrics from collect_soc_metrics."},
                "industry": {"type": "string", "enum": ["hospitality", "finance", "healthcare", "tech", "retail", "energy"], "default": "tech"},
            },
            "required": ["metrics"],
        },
    },
    {
        "name": "identify_maturity_gaps",
        "description": "Identifies the top gaps preventing advancement to the next maturity level. Returns a targeted improvement roadmap.",
        "input_schema": {
            "type": "object",
            "properties": {
                "current_level": {"type": "integer", "minimum": 1, "maximum": 5},
                "pillar_scores": {"type": "object"},
            },
            "required": ["current_level"],
        },
    },
    {
        "name": "generate_maturity_roadmap",
        "description": "Generates a 12-month SOC maturity improvement roadmap with quarterly milestones, investment estimates, and expected MTTD/MTTR improvements.",
        "input_schema": {
            "type": "object",
            "properties": {
                "current_level": {"type": "integer"},
                "target_level": {"type": "integer"},
                "budget_tier": {"type": "string", "enum": ["startup", "smb", "enterprise"], "default": "smb"},
            },
            "required": ["current_level", "target_level"],
        },
    },
]

SOC_METRICS_DATA = {
    "mttd_hours": 18.4,
    "mttr_hours": 72.0,
    "mttc_hours": 4.2,
    "alert_volume_daily": 2847,
    "true_positive_rate": 0.12,
    "false_positive_rate": 0.88,
    "p1_alerts_monthly": 23,
    "analyst_headcount": 4,
    "analyst_coverage": "8x5",
    "siem_deployed": True,
    "soar_deployed": False,
    "edr_deployed": True,
    "threat_hunting_program": False,
    "purple_team_exercises": 0,
    "tabletop_exercises_annual": 1,
    "backup_restore_tested": True,
    "incident_playbooks": 8,
    "mean_breach_cost_usd": 4880000,
}

PILLAR_DATA = {
    "people": {
        "score": 2, "level": "Managed",
        "strengths": ["Dedicated security team (4 FTEs)", "Incident response on-call rotation"],
        "weaknesses": ["8x5 coverage only — no 24/7 SOC", "No threat hunting analysts", "High analyst burnout from alert fatigue (88% FPR)"],
    },
    "process": {
        "score": 3, "level": "Defined",
        "strengths": ["8 documented IR playbooks", "Annual tabletop exercise", "Change management process"],
        "weaknesses": ["No SOAR automation — manual triage", "Playbooks not tested with real-time simulations", "No purple team program"],
    },
    "technology": {
        "score": 2, "level": "Managed",
        "strengths": ["SIEM deployed (Splunk)", "EDR on 98% of endpoints"],
        "weaknesses": ["No SOAR", "No NDR", "No XDR cross-source correlation", "SIEM rules outdated — high FPR"],
    },
    "detection": {
        "score": 2, "level": "Managed",
        "strengths": ["Known IOC matching via threat intel feed", "Basic anomaly detection in SIEM"],
        "weaknesses": ["MTTD: 18.4h (industry target: <1h for P1)", "No behavioral detection (UEBA)", "No deception/honeytoken layer"],
    },
    "response": {
        "score": 3, "level": "Defined",
        "strengths": ["MTTR < 72h for most incidents", "Documented escalation path", "Legal/comms notification process"],
        "weaknesses": ["MTTR still 3x industry median for P1 (72h vs 24h)", "No automated containment — all manual", "No IR retainer"],
    },
    "recovery": {
        "score": 2, "level": "Managed",
        "strengths": ["Backups configured", "RTO documented"],
        "weaknesses": ["Backup restore NOT tested under load", "No offline/immutable backups (ransomware risk)", "RTO: 72h — insufficient for casino/hospitality operations"],
    },
}

INDUSTRY_BENCHMARKS = {
    "hospitality": {"mttd_hours": 197, "mttr_hours": 70, "maturity_level": 2.1, "breach_cost_usd": 3400000},
    "finance": {"mttd_hours": 162, "mttr_hours": 53, "maturity_level": 3.2, "breach_cost_usd": 5900000},
    "healthcare": {"mttd_hours": 214, "mttr_hours": 75, "maturity_level": 2.3, "breach_cost_usd": 10930000},
    "tech": {"mttd_hours": 118, "mttr_hours": 45, "maturity_level": 3.4, "breach_cost_usd": 4660000},
    "retail": {"mttd_hours": 197, "mttr_hours": 72, "maturity_level": 2.2, "breach_cost_usd": 2960000},
    "energy": {"mttd_hours": 207, "mttr_hours": 85, "maturity_level": 2.5, "breach_cost_usd": 4720000},
}


def collect_soc_metrics(period_days: int = 90, organization: str = "Acme Corp") -> dict:
    return {
        "organization": organization,
        "period_days": period_days,
        "collected_at": datetime.now(timezone.utc).isoformat(),
        "metrics": SOC_METRICS_DATA,
        "alert_to_ticket_rate": round(SOC_METRICS_DATA["true_positive_rate"] * 100, 1),
        "analyst_alerts_per_day": round(SOC_METRICS_DATA["alert_volume_daily"] / SOC_METRICS_DATA["analyst_headcount"]),
        "estimated_annual_breach_exposure": SOC_METRICS_DATA["mean_breach_cost_usd"],
    }


def score_soc_maturity_pillar(pillar: str) -> dict:
    data = PILLAR_DATA.get(pillar, {})
    return {
        "pillar": pillar,
        "score": data.get("score", 1),
        "level": data.get("level", "Initial"),
        "strengths": data.get("strengths", []),
        "weaknesses": data.get("weaknesses", []),
        "next_level_requirement": {
            1: "Establish basic incident response plan and deploy SIEM",
            2: "Deploy SOAR, reduce FPR below 50%, achieve 24/7 coverage",
            3: "Implement MTTD tracking, threat hunting program, automated playbooks",
            4: "Purple team quarterly, MTTD < 1h P1, continuous improvement loop",
        }.get(data.get("score", 1), "Maintain optimization and continuous improvement"),
    }


def calculate_maturity_score(pillar_scores: dict) -> dict:
    if not pillar_scores:
        pillar_scores = {p: PILLAR_DATA[p]["score"] for p in PILLAR_DATA}

    avg = sum(pillar_scores.values()) / len(pillar_scores)
    level = round(avg * 2) / 2  # Round to nearest 0.5

    labels = {1: "Initial", 1.5: "Initial+", 2: "Managed", 2.5: "Managed+",
              3: "Defined", 3.5: "Defined+", 4: "Quantitatively Managed", 4.5: "Optimizing-", 5: "Optimizing"}

    weakest_pillar = min(pillar_scores, key=pillar_scores.get)
    return {
        "composite_score": round(avg, 2),
        "maturity_level": round(level, 1),
        "maturity_label": labels.get(round(level * 2) / 2, f"Level {level}"),
        "pillar_scores": pillar_scores,
        "weakest_pillar": weakest_pillar,
        "mttd_at_this_level": {1: ">200h", 2: "18-200h", 3: "4-18h", 4: "1-4h", 5: "<1h"}.get(int(avg), "Unknown"),
        "mttr_at_this_level": {1: ">7 days", 2: "3-7 days", 3: "24-72h", 4: "4-24h", 5: "<4h"}.get(int(avg), "Unknown"),
    }


def benchmark_against_industry(metrics: dict, industry: str = "tech") -> dict:
    org_metrics = metrics.get("metrics", SOC_METRICS_DATA)
    benchmark = INDUSTRY_BENCHMARKS.get(industry, INDUSTRY_BENCHMARKS["tech"])

    mttd_vs_industry = round((org_metrics["mttd_hours"] / benchmark["mttd_hours"] - 1) * 100, 1)
    mttr_vs_industry = round((org_metrics["mttr_hours"] / benchmark["mttr_hours"] - 1) * 100, 1)

    return {
        "industry": industry,
        "organization": {
            "mttd_hours": org_metrics["mttd_hours"],
            "mttr_hours": org_metrics["mttr_hours"],
        },
        "industry_median": {
            "mttd_hours": benchmark["mttd_hours"],
            "mttr_hours": benchmark["mttr_hours"],
            "maturity_level": benchmark["maturity_level"],
            "breach_cost_usd": benchmark["breach_cost_usd"],
        },
        "comparison": {
            "mttd": f"{abs(mttd_vs_industry)}% {'FASTER' if mttd_vs_industry < 0 else 'SLOWER'} than industry median",
            "mttr": f"{abs(mttr_vs_industry)}% {'FASTER' if mttr_vs_industry < 0 else 'SLOWER'} than industry median",
        },
        "mgm_reference": {
            "mttd_hours": 0.1,
            "mttr_hours": 240,
            "note": "MGM Resorts: near-instant detection (ransomware self-announced), 10-day recovery. MTTD is irrelevant if MTTR is catastrophic.",
        },
        "ibm_industry_average_breach_cost_usd": 4880000,
        "cost_per_hour_breach": round(benchmark["breach_cost_usd"] / benchmark["mttr_hours"]),
    }


def identify_maturity_gaps(current_level: int, pillar_scores: dict = None) -> dict:
    if not pillar_scores:
        pillar_scores = {p: PILLAR_DATA[p]["score"] for p in PILLAR_DATA}

    target_level = min(current_level + 1, 5)
    gaps = []

    level_requirements = {
        2: {
            "technology": "Deploy SOAR for automated playbook execution",
            "detection": "Implement UEBA for behavioral anomaly detection",
            "people": "Establish 24/7 SOC coverage (MDR or internal)",
            "recovery": "Test backup restore monthly under simulated failure",
        },
        3: {
            "process": "Implement weekly purple team exercises",
            "detection": "Achieve MTTD < 4h for P1 threats",
            "response": "Automate containment actions (EDR isolate, IdP revoke) via SOAR",
            "technology": "Deploy XDR for cross-source correlation",
        },
        4: {
            "detection": "MTTD < 1h P1 via ML-based detection",
            "people": "Dedicated threat hunting team",
            "process": "Quarterly red team engagements",
            "recovery": "Immutable backups with <4h RTO tested quarterly",
        },
    }

    reqs = level_requirements.get(target_level, {})
    for pillar, requirement in reqs.items():
        if pillar_scores.get(pillar, 1) < target_level:
            gaps.append({
                "pillar": pillar,
                "current_score": pillar_scores.get(pillar, 1),
                "target_score": target_level,
                "requirement": requirement,
                "priority": "HIGH" if pillar in ["detection", "response", "recovery"] else "MEDIUM",
            })

    return {
        "current_level": current_level,
        "target_level": target_level,
        "gaps": sorted(gaps, key=lambda x: {"HIGH": 0, "MEDIUM": 1}.get(x["priority"], 2)),
        "estimated_investment_usd": {2: 120000, 3: 380000, 4: 950000, 5: 2000000}.get(target_level, 0),
        "estimated_time_months": {2: 3, 3: 6, 4: 12, 5: 18}.get(target_level, 12),
    }


def generate_maturity_roadmap(current_level: int, target_level: int, budget_tier: str = "smb") -> dict:
    quarters = []
    budget_multipliers = {"startup": 0.4, "smb": 1.0, "enterprise": 3.5}
    bm = budget_multipliers.get(budget_tier, 1.0)

    if current_level <= 2 and target_level >= 3:
        quarters.append({
            "quarter": "Q1",
            "theme": "Automation Foundation",
            "initiatives": ["Deploy SOAR (Splunk SOAR or Tines)", "Tune SIEM rules — reduce FPR from 88% to 50%", "Implement 24/7 monitoring via MDR partner"],
            "investment_usd": round(85000 * bm),
            "expected_mttd_improvement": "18.4h → 8h",
            "expected_mttr_improvement": "72h → 48h",
        })
        quarters.append({
            "quarter": "Q2",
            "theme": "Detection Depth",
            "initiatives": ["Deploy NDR (network visibility)", "Implement UEBA (behavioral baselines)", "Deploy honeytoken program (10 canary credentials)"],
            "investment_usd": round(65000 * bm),
            "expected_mttd_improvement": "8h → 3h",
            "expected_mttr_improvement": "48h → 24h",
        })
    if current_level <= 3 and target_level >= 4:
        quarters.append({
            "quarter": "Q3",
            "theme": "Validation & Hunting",
            "initiatives": ["Launch threat hunting program (1 dedicated FTE)", "First purple team exercise", "XDR deployment for cross-source correlation"],
            "investment_usd": round(120000 * bm),
            "expected_mttd_improvement": "3h → 1h",
            "expected_mttr_improvement": "24h → 8h",
        })
        quarters.append({
            "quarter": "Q4",
            "theme": "Recovery Resilience",
            "initiatives": ["Deploy immutable backups (Veeam Object Lock)", "Quarterly DR test with full casino/ops simulation", "IR retainer with Mandiant/CrowdStrike"],
            "investment_usd": round(90000 * bm),
            "expected_mttd_improvement": "1h → <1h",
            "expected_mttr_improvement": "8h → 4h",
            "mgm_lesson": "MGM's 10-day MTTR was a recovery failure, not a detection failure. Immutable backups are the ransomware answer.",
        })

    total_investment = sum(q["investment_usd"] for q in quarters)
    return {
        "current_level": current_level,
        "target_level": target_level,
        "budget_tier": budget_tier,
        "total_investment_usd": total_investment,
        "roi_estimate": f"${round(total_investment * 3.2 / 1000)}K in avoided breach cost (IBM: $4.88M avg breach × {round(1 - target_level/5, 1)} reduction factor)",
        "quarterly_roadmap": quarters,
        "final_mttd_target": "<1 hour (P1 threats)",
        "final_mttr_target": "<4 hours (full containment)",
    }


def execute_tool(tool_name: str, tool_input: dict) -> str:
    dispatch = {
        "collect_soc_metrics": collect_soc_metrics,
        "score_soc_maturity_pillar": score_soc_maturity_pillar,
        "calculate_maturity_score": calculate_maturity_score,
        "benchmark_against_industry": benchmark_against_industry,
        "identify_maturity_gaps": identify_maturity_gaps,
        "generate_maturity_roadmap": generate_maturity_roadmap,
    }
    fn = dispatch.get(tool_name)
    result = fn(**tool_input) if fn else {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result, indent=2, default=str)


def run_maturity_assessment(organization: str = "Acme Corp"):
    client = anthropic.Anthropic()

    messages = [
        {
            "role": "user",
            "content": (
                f"You are a SOC maturity assessment specialist. Evaluate the security operations center for {organization}.\n\n"
                "Execute the full maturity scoring workflow:\n"
                "1. Collect SOC operational metrics (MTTD, MTTR, alert volume, analyst capacity).\n"
                "2. Score each maturity pillar: People, Process, Technology, Detection, Response, Recovery.\n"
                "3. Calculate the composite maturity score and overall level (1-5).\n"
                "4. Benchmark metrics against industry peers.\n"
                "5. Identify the top gaps preventing advancement to the next maturity level.\n"
                "6. Generate a 12-month maturity improvement roadmap with quarterly milestones.\n"
                "7. Produce a SOC Maturity Scorecard:\n"
                "   - Overall maturity level with pillar breakdown\n"
                "   - MTTD/MTTR vs. industry benchmarks\n"
                "   - Top 3 investments that would have the highest MTTD/MTTR impact\n"
                "   - Reference: What specific SOC capabilities did MGM Resorts lack that caused $100M+ in damage?\n"
                "   - If MGM had a Level 4 SOC, which step in the vishing → ransomware chain would have been stopped?"
            ),
        }
    ]

    print(f"Running SOC maturity assessment for {organization}...\n")

    while True:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=4096,
            tools=MATURITY_TOOLS,
            messages=messages,
        )
        messages.append({"role": "assistant", "content": response.content})

        if response.stop_reason == "tool_use":
            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    print(f"  → {block.name}")
                    result = execute_tool(block.name, block.input)
                    tool_results.append({"type": "tool_result", "tool_use_id": block.id, "content": result})
            messages.append({"role": "user", "content": tool_results})
        else:
            for block in response.content:
                if hasattr(block, "text"):
                    print("\n── SOC MATURITY SCORECARD ─────────────────────────────")
                    print(block.text)
            break


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--org", default="Acme Corp")
    args = parser.parse_args()
    run_maturity_assessment(args.org)
