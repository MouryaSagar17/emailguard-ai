import matplotlib.pyplot as plt
import pandas as pd

# Data from the user request
systems = [
    "Bountakas 2021",
    "Zhang 2024",
    "Magdy 2022",
    "EPVME 2025",
    "EmailGuard AI (Ours)"
]
scores = [49, 49, 49, 50, 73]

# Create a color list to highlight "EmailGuard AI (Ours)"
colors = ['#B2BABB', '#B2BABB', '#B2BABB', '#7FB3D5', '#1F618D']

# Create the plot
plt.figure(figsize=(10, 6))
bars = plt.bar(systems, scores, color=colors)

# Adding labels and title
plt.title("Fig. X. Performance vs. Practicality Trade-off of Phishing Detection Systems", fontsize=14, fontweight='bold', pad=20)
plt.ylabel("Practical Impact Score (0–100)", fontsize=12)
plt.xlabel("Detection Systems", fontsize=12)
plt.ylim(0, 100)

# Add value labels on top of the bars
for bar in bars:
    yval = bar.get_height()
    plt.text(bar.get_x() + bar.get_width()/2, yval + 1, yval, ha='center', va='bottom', fontsize=11, fontweight='bold')

# Rotating x-axis labels for readability
plt.xticks(rotation=15, ha='right')

# Adjust layout to prevent clipping
plt.tight_layout()

# Save the plot
plt.savefig('practicality_comparison_chart.png')