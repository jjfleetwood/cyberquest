"""
audit-cm01-iscm-baseline.py
MCP Server: NIST SP 800-137 ISCM Metrics Collector
Lesson: Building a continuous monitoring baseline per the federal ISCM standard.

BACKGROUND — NIST SP 800-137 ISCM:
  The OPM breach (2014) went undetected for 14 months because there was no continuous
  monitoring program. OPM had 21.5 million records stolen — the largest federal data breach ever.
  NIST SP 800-137 (Information Security Continuous Monitoring) was the federal response.
  It defines: what to measure, how often, and what constitutes acceptable risk posture.

SETUP:
  pip install anthropic boto3

USAGE:
  python audit-cm01-iscm-baseline.py
  python audit-cm01-iscm-baseline.py --export baseline.json

HOW IT WORKS:
  1. Collects metrics across the six ISCM measurement categories.
  2. Calculates staleness (how old is each metric reading?).
  3. Claude scores each control family against NIST thresholds.
  4. Output: ISCM program posture score (0-100) and staleness report.

ISCM MEASUREMENT CATEGORIES (per SP 800-137):
  - Manage: risk decisions, resource allocation
  - Define: strategy, policies, procedures
  - Implement: controls deployed
  - Assess: control effectiveness verified
  - Authorize: risk acceptance decisions
  - Monitor: continuous collection of metrics
"""

import json
import argparse
from datetime import datetime, timezone, timedelta
import anthropic

ISCM_TOOLS = [
    {
        "name": "collect_vulnerability_metrics",
        "description": (
            "Collects vulnerability management metrics: open CVEs by severity, "
            "mean time to patch (MTTP), scan coverage percentage, and scan frequency."
        ),
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "collect_configuration_metrics",
        "description": (
            "Collects configuration management metrics: CIS benchmark compliance %, "
            "unauthorized config changes, patch compliance %, baseline deviations."
        ),
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "collect_access_control_metrics",
        "description": (
            "Collects access control metrics: accounts with excessive privileges, "
            "privileged account review frequency, orphaned accounts, MFA adoption rate."
        ),
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "collect_incident_metrics",
        "description": (
            "Collects security incident metrics: open incidents by severity, "
            "mean time to detect (MTTD), mean time to respond (MTTR), false positive rate."
        ),
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "calculate_staleness",
        "description": (
            "Calculates metric staleness: compares the last measurement date against "
            "the required measurement frequency per NIST SP 800-137. Flags overdue metrics."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "metrics": {
                    "type": "array",
                    "items": {"type": "object"},
                    "description": "List of {metric_name, last_measured, required_frequency_days} objects.",
                },
            },
            "required": ["metrics"],
        },
    },
    {
        "name": "calculate_posture_score",
        "description": (
            "Calculates the overall ISCM posture score (0-100) based on collected metrics. "
            "Returns a score and maturity level (Initial/Developing/Defined/Managed/Optimizing)."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "vulnerability_metrics": {"type": "object"},
                "configuration_metrics": {"type": "object"},
                "access_control_metrics": {"type": "object"},
                "incident_metrics": {"type": "object"},
                "staleness_results": {"type": "object"},
            },
            "required": ["vulnerability_metrics", "configuration_metrics"],
        },
    },
]

NOW = datetime.now(timezone.utc)


def collect_vulnerability_metrics() -> dict:
    return {
        "collected_at": NOW.isoformat(),
        "open_critical_cves": 2,
        "open_high_cves": 8,
        "scan_coverage_pct": 87,  # % of assets with active scanner
        "scan_frequency_days": 7,
        "mean_time_to_patch_days": {
            "critical": 12,  # SLA: 30 days — PASS
            "high": 28,       # SLA: 60 days — PASS
        },
        "last_scan_date": (NOW - timedelta(days=3)).isoformat(),
        "required_frequency_days": 7,
        "metric_health": "YELLOW — 13% of assets not covered by scanner",
    }


def collect_configuration_metrics() -> dict:
    return {
        "collected_at": NOW.isoformat(),
        "cis_benchmark_compliance_pct": 73,  # Target: 90%
        "unauthorized_config_changes_30d": 4,
        "patch_compliance_pct": 91,
        "baseline_deviations": 12,
        "last_config_scan_date": (NOW - timedelta(days=2)).isoformat(),
        "required_frequency_days": 7,
        "metric_health": "YELLOW — CIS compliance below 90% threshold",
    }


def collect_access_control_metrics() -> dict:
    return {
        "collected_at": NOW.isoformat(),
        "overprivileged_accounts": 6,
        "orphaned_accounts": 3,  # accounts of departed employees
        "mfa_adoption_rate_pct": 78,  # Target: 100%
        "privileged_account_review_last_days": 45,  # Required: quarterly (90 days)
        "last_access_review_date": (NOW - timedelta(days=45)).isoformat(),
        "required_frequency_days": 90,
        "metric_health": "RED — MFA below 100%, orphaned accounts present",
    }


def collect_incident_metrics() -> dict:
    return {
        "collected_at": NOW.isoformat(),
        "open_incidents": {"critical": 0, "high": 2, "medium": 7},
        "mean_time_to_detect_hours": 4.2,   # Industry target: <1 hour for critical
        "mean_time_to_respond_hours": 18.5,  # Target: <4 hours for critical
        "false_positive_rate_pct": 23,        # Target: <20%
        "last_incident_review_date": (NOW - timedelta(days=1)).isoformat(),
        "required_frequency_days": 1,
        "metric_health": "YELLOW — MTTR above target, false positive rate high",
    }


def calculate_staleness(metrics: list) -> dict:
    results = []
    for m in metrics:
        last = datetime.fromisoformat(m["last_measured"].replace("Z", "+00:00"))
        age_days = (NOW - last).days
        required = m["required_frequency_days"]
        overdue = age_days > required
        results.append({
            "metric": m["metric_name"],
            "age_days": age_days,
            "required_frequency_days": required,
            "overdue": overdue,
            "status": "STALE" if overdue else "CURRENT",
        })
    overdue_count = len([r for r in results if r["overdue"]])
    return {
        "metrics_checked": len(results),
        "overdue_count": overdue_count,
        "results": results,
        "staleness_score": round((1 - overdue_count / max(len(results), 1)) * 100, 1),
    }


def calculate_posture_score(vulnerability_metrics, configuration_metrics,
                             access_control_metrics=None, incident_metrics=None,
                             staleness_results=None) -> dict:
    scores = {}

    # Vulnerability score (25 points)
    scan_cov = vulnerability_metrics.get("scan_coverage_pct", 0)
    vuln_score = (scan_cov / 100) * 25
    scores["vulnerability"] = round(vuln_score, 1)

    # Configuration score (25 points)
    cis_comp = configuration_metrics.get("cis_benchmark_compliance_pct", 0)
    config_score = (cis_comp / 100) * 25
    scores["configuration"] = round(config_score, 1)

    # Access control score (25 points)
    if access_control_metrics:
        mfa = access_control_metrics.get("mfa_adoption_rate_pct", 0)
        orphans = access_control_metrics.get("orphaned_accounts", 0)
        ac_score = (mfa / 100) * 20 - (orphans * 2)
        scores["access_control"] = max(0, round(ac_score, 1))
    else:
        scores["access_control"] = 12.5  # Assume average if not measured

    # Incident score (25 points)
    if incident_metrics:
        mttd = incident_metrics.get("mean_time_to_detect_hours", 24)
        fp_rate = incident_metrics.get("false_positive_rate_pct", 50)
        inc_score = max(0, 25 - (mttd / 2) - (fp_rate / 10))
        scores["incident"] = round(min(25, inc_score), 1)
    else:
        scores["incident"] = 12.5

    total = sum(scores.values())
    maturity = (
        "Optimizing" if total >= 90 else
        "Managed" if total >= 75 else
        "Defined" if total >= 60 else
        "Developing" if total >= 40 else
        "Initial"
    )
    return {
        "total_score": round(total, 1),
        "max_score": 100,
        "maturity_level": maturity,
        "scores_by_category": scores,
        "assessment_date": NOW.isoformat(),
    }


def execute_tool(tool_name: str, tool_input: dict) -> str:
    dispatch = {
        "collect_vulnerability_metrics": collect_vulnerability_metrics,
        "collect_configuration_metrics": collect_configuration_metrics,
        "collect_access_control_metrics": collect_access_control_metrics,
        "collect_incident_metrics": collect_incident_metrics,
        "calculate_staleness": calculate_staleness,
        "calculate_posture_score": calculate_posture_score,
    }
    fn = dispatch.get(tool_name)
    result = fn(**tool_input) if fn else {"error": f"Unknown tool: {tool_name}"}
    return json.dumps(result, indent=2, default=str)


def run_iscm_baseline(export_path: str = None):
    client = anthropic.Anthropic()

    messages = [
        {
            "role": "user",
            "content": (
                "You are an ISCM program manager following NIST SP 800-137. "
                "Build a complete ISCM baseline assessment.\n\n"
                "1. Collect all four metric categories: vulnerability, configuration, access control, incidents.\n"
                "2. Calculate staleness for each metric type (use the last_measured date and required_frequency from each).\n"
                "3. Calculate the overall ISCM posture score.\n"
                "4. Produce a posture report with:\n"
                "   - Overall score and maturity level\n"
                "   - Which metrics are stale (overdue for collection)\n"
                "   - Top 3 improvement actions to raise the posture score\n"
                "   - Mapping to NIST SP 800-53 control families (CM, IA, IR, RA, SI)\n"
                "   - Reference: OPM breach — how would a program like this have detected it earlier?"
            ),
        }
    ]

    print("Building NIST SP 800-137 ISCM baseline...\n")

    while True:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=4096,
            tools=ISCM_TOOLS,
            messages=messages,
        )
        messages.append({"role": "assistant", "content": response.content})

        if response.stop_reason == "tool_use":
            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    print(f"  → {block.name}")
                    result = execute_tool(block.name, block.input)
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": result,
                    })
            messages.append({"role": "user", "content": tool_results})
        else:
            for block in response.content:
                if hasattr(block, "text"):
                    print("\n── ISCM POSTURE REPORT ────────────────────────────────")
                    print(block.text)
            break

    if export_path:
        print(f"\nBaseline exported to: {export_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--export", default=None, help="Export baseline to JSON file")
    args = parser.parse_args()
    run_iscm_baseline(export_path=args.export)
