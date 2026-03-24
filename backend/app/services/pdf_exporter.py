"""PDF Exporter Service — generates ATS-friendly resume PDF files.

Converts structured resume JSON from the rewriter into a clean,
professional PDF optimized for ATS readability using reportlab.
"""

import io
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, ListFlowable, ListItem,
)


def _build_styles() -> dict:
    """Creates custom paragraph styles for the resume."""
    base = getSampleStyleSheet()
    styles = {}

    styles["name"] = ParagraphStyle(
        "name", parent=base["Title"],
        fontName="Helvetica-Bold", fontSize=18, leading=22,
        alignment=TA_CENTER, textColor=HexColor("#0a0a0a"),
        spaceAfter=2,
    )
    styles["contact"] = ParagraphStyle(
        "contact", parent=base["Normal"],
        fontName="Helvetica", fontSize=9, leading=12,
        alignment=TA_CENTER, textColor=HexColor("#666666"),
        spaceAfter=8,
    )
    styles["section_heading"] = ParagraphStyle(
        "section_heading", parent=base["Heading2"],
        fontName="Helvetica-Bold", fontSize=12, leading=15,
        textColor=HexColor("#0a0a0a"), spaceBefore=10, spaceAfter=4,
    )
    styles["job_title"] = ParagraphStyle(
        "job_title", parent=base["Normal"],
        fontName="Helvetica-Bold", fontSize=10.5, leading=13,
        textColor=HexColor("#0a0a0a"), spaceAfter=1,
    )
    styles["job_meta"] = ParagraphStyle(
        "job_meta", parent=base["Normal"],
        fontName="Helvetica", fontSize=9, leading=11,
        textColor=HexColor("#888888"), spaceAfter=3,
    )
    styles["body"] = ParagraphStyle(
        "body", parent=base["Normal"],
        fontName="Helvetica", fontSize=10, leading=13,
        textColor=HexColor("#333333"), spaceAfter=4,
    )
    styles["bullet"] = ParagraphStyle(
        "bullet", parent=base["Normal"],
        fontName="Helvetica", fontSize=9.5, leading=12.5,
        textColor=HexColor("#333333"), leftIndent=12,
        spaceAfter=2,
    )
    styles["skill_line"] = ParagraphStyle(
        "skill_line", parent=base["Normal"],
        fontName="Helvetica", fontSize=10, leading=13,
        textColor=HexColor("#333333"), spaceAfter=3,
    )
    return styles


def _add_divider(elements: list) -> None:
    """Adds a thin horizontal rule."""
    elements.append(Spacer(1, 4))
    elements.append(HRFlowable(
        width="100%", thickness=0.5, color=HexColor("#CCCCCC"),
        spaceBefore=2, spaceAfter=6,
    ))


def generate_pdf(structured_resume: dict) -> io.BytesIO:
    """Renders structured resume data into an ATS-friendly PDF.

    Args:
        structured_resume: Dict with keys: contact_info, summary,
            experience, education, skills, projects.

    Returns:
        BytesIO buffer containing the PDF file bytes.
    """
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer, pagesize=letter,
        topMargin=0.5 * inch, bottomMargin=0.5 * inch,
        leftMargin=0.7 * inch, rightMargin=0.7 * inch,
    )

    styles = _build_styles()
    elements: list = []

    # --- Contact Header ---
    contact = structured_resume.get("contact_info", {})
    name = contact.get("name", "Candidate")
    elements.append(Paragraph(name, styles["name"]))

    contact_parts = []
    for key in ["email", "phone", "linkedin", "location"]:
        val = contact.get(key)
        if val:
            contact_parts.append(val)
    if contact_parts:
        elements.append(Paragraph(" • ".join(contact_parts), styles["contact"]))

    # --- Professional Summary ---
    summary = structured_resume.get("summary")
    if summary:
        _add_divider(elements)
        elements.append(Paragraph("PROFESSIONAL SUMMARY", styles["section_heading"]))
        elements.append(Paragraph(summary, styles["body"]))

    # --- Experience ---
    experience = structured_resume.get("experience", [])
    if experience:
        _add_divider(elements)
        elements.append(Paragraph("EXPERIENCE", styles["section_heading"]))
        for exp in experience:
            title = exp.get("title", "")
            company = exp.get("company", "")
            dates = f"{exp.get('start_date', '')} – {exp.get('end_date', '')}"
            elements.append(Paragraph(f"{title} — {company}", styles["job_title"]))
            elements.append(Paragraph(dates, styles["job_meta"]))

            bullets = exp.get("bullets", [])
            if bullets:
                items = [ListItem(Paragraph(b, styles["bullet"])) for b in bullets]
                elements.append(ListFlowable(
                    items, bulletType="bullet", bulletFontSize=6,
                    leftIndent=12, bulletOffsetY=-2,
                ))
            elements.append(Spacer(1, 4))

    # --- Education ---
    education = structured_resume.get("education", [])
    if education:
        _add_divider(elements)
        elements.append(Paragraph("EDUCATION", styles["section_heading"]))
        for edu in education:
            degree = edu.get("degree", "")
            institution = edu.get("institution", "")
            years = f"{edu.get('start_year', '')} – {edu.get('end_year', '')}"
            elements.append(Paragraph(f"{degree} — {institution}", styles["job_title"]))
            elements.append(Paragraph(years, styles["job_meta"]))
            details = edu.get("details")
            if details:
                elements.append(Paragraph(details, styles["body"]))
            elements.append(Spacer(1, 2))

    # --- Skills ---
    skills = structured_resume.get("skills", [])
    if skills:
        _add_divider(elements)
        elements.append(Paragraph("SKILLS", styles["section_heading"]))
        for skill_group in skills:
            elements.append(Paragraph(skill_group, styles["skill_line"]))

    # --- Projects ---
    projects = structured_resume.get("projects", [])
    if projects:
        _add_divider(elements)
        elements.append(Paragraph("PROJECTS", styles["section_heading"]))
        for proj in projects:
            proj_name = proj.get("name", "")
            url = proj.get("url")
            label = f"{proj_name} — {url}" if url else proj_name
            elements.append(Paragraph(label, styles["job_title"]))
            desc = proj.get("description")
            if desc:
                elements.append(Paragraph(desc, styles["body"]))
            elements.append(Spacer(1, 2))

    doc.build(elements)
    buffer.seek(0)
    return buffer


def structured_to_plain_text(structured_resume: dict) -> str:
    """Converts structured resume JSON to plain text for ATS re-grading."""
    lines = []
    contact = structured_resume.get("contact_info", {})
    if contact.get("name"):
        lines.append(contact["name"])
    parts = [contact.get(k, "") for k in ["email", "phone", "linkedin", "location"] if contact.get(k)]
    if parts:
        lines.append(" | ".join(parts))
    lines.append("")

    summary = structured_resume.get("summary")
    if summary:
        lines.append("PROFESSIONAL SUMMARY")
        lines.append(summary)
        lines.append("")

    for exp in structured_resume.get("experience", []):
        lines.append(f"{exp.get('title', '')} at {exp.get('company', '')}")
        lines.append(f"{exp.get('start_date', '')} - {exp.get('end_date', '')}")
        for b in exp.get("bullets", []):
            lines.append(f"  • {b}")
        lines.append("")

    for edu in structured_resume.get("education", []):
        lines.append(f"{edu.get('degree', '')} - {edu.get('institution', '')}")
        lines.append(f"{edu.get('start_year', '')} - {edu.get('end_year', '')}")
        if edu.get("details"):
            lines.append(edu["details"])
        lines.append("")

    skills = structured_resume.get("skills", [])
    if skills:
        lines.append("SKILLS")
        for s in skills:
            lines.append(s)
        lines.append("")

    for proj in structured_resume.get("projects", []):
        lines.append(proj.get("name", ""))
        if proj.get("description"):
            lines.append(proj["description"])
        lines.append("")

    return "\n".join(lines)
