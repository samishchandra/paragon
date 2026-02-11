#!/usr/bin/env python3
"""
Parse the Vite library bundle to identify heavy dependencies.
Uses rollup-plugin-visualizer's raw JSON output.
"""

import json
import re
import sys
from pathlib import Path

stats_file = Path(__file__).parent.parent / 'dist-lib' / 'stats.json'

if not stats_file.exists():
    print("stats.json not found, trying to parse stats.html...")
    html_file = Path(__file__).parent.parent / 'dist-lib' / 'stats.html'
    if not html_file.exists():
        print("No stats file found!")
        sys.exit(1)
    
    content = html_file.read_text()
    # The visualizer embeds data as: const data = {...}
    # Try to find the module data
    match = re.search(r'"children":\s*\[', content)
    if match:
        print(f"Found children array at position {match.start()}")
    
    # Alternative: just analyze the source map
    print("\nFalling back to source map analysis...")
    
    import subprocess
    result = subprocess.run(
        ['python3', '-c', '''
import json
from pathlib import Path
from collections import defaultdict

# Read the source map
map_file = Path("/home/ubuntu/manus-markdown-editor/dist-lib/manus-editor.js.map")
if not map_file.exists():
    print("No source map found")
    exit(1)

with open(map_file) as f:
    smap = json.load(f)

sources = smap.get("sources", [])
contents = smap.get("sourcesContent", [])

# Aggregate sizes by package
pkg_sizes = defaultdict(int)
for src, content in zip(sources, contents):
    if content is None:
        continue
    size = len(content.encode("utf-8"))
    
    # Categorize
    if "node_modules" in src:
        # Extract package name
        parts = src.split("node_modules/")[-1].split("/")
        if parts[0].startswith("@"):
            pkg = parts[0] + "/" + parts[1]
        else:
            pkg = parts[0]
        pkg_sizes[pkg] += size
    else:
        pkg_sizes["[app code]"] += size

# Sort by size descending
sorted_pkgs = sorted(pkg_sizes.items(), key=lambda x: -x[1])
total = sum(s for _, s in sorted_pkgs)

print(f"\\nTotal source size: {total / 1024:.1f} KB")
print(f"\\n{'Package':<50} {'Size':>10} {'%':>6}")
print("-" * 70)
for pkg, size in sorted_pkgs[:30]:
    pct = size / total * 100
    print(f"{pkg:<50} {size/1024:>8.1f}KB {pct:>5.1f}%")
'''],
        capture_output=True, text=True
    )
    print(result.stdout)
    if result.stderr:
        print("STDERR:", result.stderr[:500])
    sys.exit(0)

with open(stats_file) as f:
    data = json.load(f)

print(json.dumps(data, indent=2)[:2000])
