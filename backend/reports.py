import io
import datetime

# Flag to check if ReportLab is installed
REPORTLAB_AVAILABLE = False
try:
    from reportlab.lib.pagesizes import letter
    from reportlab.lib import colors
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    REPORTLAB_AVAILABLE = True
except ImportError:
    print("ReportLab not installed. PDF export will fall back to printable HTML report.")

def generate_report_pdf(user, logs):
    """
    Generates a PDF using ReportLab and returns it as bytes.
    """
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )
    
    styles = getSampleStyleSheet()
    
    # Custom Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#2e7d32'), # Eco Green
        spaceAfter=15,
        alignment=1 # Centered
    )
    
    heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.HexColor('#1b5e20'),
        spaceAfter=10,
        spaceBefore=15
    )
    
    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.HexColor('#333333'),
        spaceAfter=6
    )
    
    th_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontSize=10,
        fontName='Helvetica-Bold',
        textColor=colors.white
    )
    
    # Calculate stats
    total_scans = len(logs)
    total_carbon = sum(log["carbon_saved"] for log in logs)
    total_points = user["points"]
    
    categories = {"Wet Waste": 0, "Dry Waste": 0, "Recyclable Waste": 0, "Hazardous Waste": 0, "E-Waste": 0}
    for log in logs:
        cat = log["category"]
        if cat in categories:
            categories[cat] += 1
            
    story = []
    
    # Document Header
    story.append(Paragraph("EcoSort AI - Sustainability Report", title_style))
    story.append(Paragraph(f"Generated on: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", body_style))
    story.append(Spacer(1, 10))
    
    # Profile Summary Section
    story.append(Paragraph("User Profile Summary", heading_style))
    summary_data = [
        [Paragraph("<b>Username:</b>", body_style), Paragraph(user["username"], body_style),
         Paragraph("<b>Email:</b>", body_style), Paragraph(user["email"], body_style)],
        [Paragraph("<b>Current Level:</b>", body_style), Paragraph(str(user["level"]), body_style),
         Paragraph("<b>Total Green Points:</b>", body_style), Paragraph(f"{total_points} GP", body_style)],
        [Paragraph("<b>Total Items Scanned:</b>", body_style), Paragraph(str(total_scans), body_style),
         Paragraph("<b>Carbon Footprint Saved:</b>", body_style), Paragraph(f"{total_carbon:.2f} kg CO2", body_style)]
    ]
    summary_table = Table(summary_data, colWidths=[120, 140, 120, 140])
    summary_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LINEBELOW', (0,-1), (-1,-1), 0.5, colors.HexColor('#e0e0e0')),
    ]))
    story.append(summary_table)
    story.append(Spacer(1, 15))
    
    # Waste Category Breakdown Section
    story.append(Paragraph("Waste Segregation Breakdown", heading_style))
    breakdown_data = [
        [Paragraph("<b>Category</b>", th_style), Paragraph("<b>Items Logged</b>", th_style), Paragraph("<b>Status</b>", th_style)]
    ]
    for cat, count in categories.items():
        breakdown_data.append([
            Paragraph(cat, body_style),
            Paragraph(str(count), body_style),
            Paragraph("Excellent" if count > 0 else "No Activity", body_style)
        ])
    breakdown_table = Table(breakdown_data, colWidths=[180, 120, 220])
    breakdown_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#2e7d32')),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#f5f5f5'), colors.white]),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e0e0e0')),
    ]))
    story.append(breakdown_table)
    story.append(Spacer(1, 15))
    
    # Recent Log Table
    story.append(Paragraph("Recent Waste Log History (Last 10 Scans)", heading_style))
    log_data = [
        [Paragraph("<b>Timestamp</b>", th_style), 
         Paragraph("<b>Item Name</b>", th_style), 
         Paragraph("<b>Category</b>", th_style), 
         Paragraph("<b>Carbon Saved</b>", th_style), 
         Paragraph("<b>Points</b>", th_style)]
    ]
    for log in logs[:10]:
        time_str = datetime.datetime.fromisoformat(log["timestamp"]).strftime("%Y-%m-%d %H:%M")
        log_data.append([
            Paragraph(time_str, body_style),
            Paragraph(log["item_name"], body_style),
            Paragraph(log["category"], body_style),
            Paragraph(f"{log['carbon_saved']:.2f} kg", body_style),
            Paragraph(f"+{log['points_earned']}", body_style)
        ])
    
    # If no logs
    if len(logs) == 0:
        log_data.append([Paragraph("No items classified yet.", body_style), "", "", "", ""])
        
    log_table = Table(log_data, colWidths=[110, 130, 120, 90, 70])
    log_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#1b5e20')),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.HexColor('#f9f9f9'), colors.white]),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e0e0e0')),
    ]))
    story.append(log_table)
    story.append(Spacer(1, 20))
    
    # Footer Note
    story.append(Paragraph("<i>Thank you for your active participation in sustainability! Keep separating waste correctly to support UN SDGs 11, 12, and 13.</i>", body_style))
    
    doc.build(story)
    buffer.seek(0)
    return buffer.getvalue(), "application/pdf", "ecosort_report.pdf"

def generate_report_html(user, logs):
    """
    Generates a printable, responsive HTML report.
    """
    total_scans = len(logs)
    total_carbon = sum(log["carbon_saved"] for log in logs)
    total_points = user["points"]
    
    categories = {"Wet Waste": 0, "Dry Waste": 0, "Recyclable Waste": 0, "Hazardous Waste": 0, "E-Waste": 0}
    for log in logs:
        cat = log["category"]
        if cat in categories:
            categories[cat] += 1
            
    log_rows = ""
    for log in logs[:15]:
        time_str = datetime.datetime.fromisoformat(log["timestamp"]).strftime("%Y-%m-%d %H:%M")
        log_rows += f"""
        <tr>
            <td>{time_str}</td>
            <td>{log["item_name"]}</td>
            <td class="badge badge-{log["category"].split()[0].lower()}">{log["category"]}</td>
            <td>{log["carbon_saved"]:.2f} kg</td>
            <td>+{log["points_earned"]} GP</td>
        </tr>
        """
        
    if len(logs) == 0:
        log_rows = '<tr><td colspan="5" style="text-align:center;">No items classified yet.</td></tr>'
        
    breakdown_rows = ""
    for cat, count in categories.items():
        breakdown_rows += f"""
        <tr>
            <td><strong>{cat}</strong></td>
            <td>{count} items</td>
            <td>{"Active" if count > 0 else "Inactive"}</td>
        </tr>
        """

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>EcoSort AI - Sustainability Report</title>
    <style>
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
            line-height: 1.5;
            padding: 30px;
            max-width: 800px;
            margin: 0 auto;
            background-color: #fff;
        }}
        .header {{
            text-align: center;
            border-bottom: 3px solid #2e7d32;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }}
        .header h1 {{
            color: #2e7d32;
            margin: 0;
            font-size: 28px;
        }}
        .header p {{
            color: #666;
            margin: 5px 0 0 0;
        }}
        .section-title {{
            color: #1b5e20;
            border-left: 4px solid #2e7d32;
            padding-left: 10px;
            margin-top: 25px;
            margin-bottom: 15px;
            font-size: 18px;
        }}
        .grid {{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 25px;
        }}
        .card {{
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 15px;
            background-color: #f9f9f9;
        }}
        .card p {{
            margin: 5px 0;
        }}
        table {{
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
        }}
        th, td {{
            border: 1px solid #e0e0e0;
            padding: 10px;
            text-align: left;
        }}
        th {{
            background-color: #2e7d32;
            color: white;
            font-weight: 600;
        }}
        tr:nth-child(even) td {{
            background-color: #fcfcfc;
        }}
        .badge {{
            display: inline-block;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: bold;
            color: white;
        }}
        .badge-wet {{ background-color: #2e7d32; }}
        .badge-dry {{ background-color: #78909c; }}
        .badge-recyclable {{ background-color: #1e88e5; }}
        .badge-hazardous {{ background-color: #e53935; }}
        .badge-e-waste {{ background-color: #fb8c00; }}
        .footer {{
            text-align: center;
            margin-top: 40px;
            font-style: italic;
            color: #666;
            font-size: 12px;
            border-top: 1px solid #e0e0e0;
            padding-top: 20px;
        }}
        .print-btn {{
            display: block;
            width: 150px;
            margin: 20px auto;
            padding: 10px;
            background-color: #2e7d32;
            color: white;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }}
        @media print {{
            .print-btn {{
                display: none;
            }}
            body {{
                padding: 0;
            }}
        }}
    </style>
</head>
<body>
    <div class="header">
        <h1>EcoSort AI - Sustainability Report</h1>
        <p>Generated on: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
    </div>
    
    <a href="#" class="print-btn" onclick="window.print(); return false;">Print / Save as PDF</a>
    
    <div class="section-title">User Profile Summary</div>
    <div class="grid">
        <div class="card">
            <p><strong>Username:</strong> {user["username"]}</p>
            <p><strong>Email:</strong> {user["email"]}</p>
            <p><strong>Language Preference:</strong> {user["language"].upper()}</p>
        </div>
        <div class="card">
            <p><strong>Current Level:</strong> Level {user["level"]}</p>
            <p><strong>Total Green Points:</strong> {total_points} GP</p>
            <p><strong>Carbon Saved:</strong> {total_carbon:.2f} kg CO2</p>
        </div>
    </div>
    
    <div class="section-title">Waste Segregation Breakdown</div>
    <table>
        <thead>
            <tr>
                <th>Category</th>
                <th>Items Logged</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {breakdown_rows}
        </tbody>
    </table>
    
    <div class="section-title">Recent Waste Log History</div>
    <table>
        <thead>
            <tr>
                <th>Timestamp</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Carbon Saved</th>
                <th>Points Earned</th>
            </tr>
        </thead>
        <tbody>
            {log_rows}
        </tbody>
    </table>
    
    <div class="footer">
        Thank you for your active participation in sustainability! Keep separating waste correctly to support UN SDGs 11, 12, and 13.
    </div>
</body>
</html>
"""
    return html_content.encode("utf-8"), "text/html", "ecosort_report.html"

def generate_report(user, logs):
    """
    Primary interface for generating reports. Returns (bytes, content_type, filename).
    """
    if REPORTLAB_AVAILABLE:
        try:
            return generate_report_pdf(user, logs)
        except Exception as e:
            print(f"Error generating PDF: {e}, falling back to HTML")
            return generate_report_html(user, logs)
    else:
        return generate_report_html(user, logs)
