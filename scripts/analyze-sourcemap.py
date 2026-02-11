#!/usr/bin/env python3
"""Analyze the ESM bundle source map to identify heavy dependencies."""

import json
from collections import defaultdict
from pathlib import Path

map_file = Path("/home/ubuntu/manus-markdown-editor/dist-lib/manus-editor.js.map")
if not map_file.exists():
    print("No source map found at", map_file)
    exit(1)

with open(map_file) as f:
    smap = json.load(f)

sources = smap.get("sources", [])
contents = smap.get("sourcesContent", [])

print(f"Total sources: {len(sources)}")
print(f"Total sourcesContent: {len(contents)}")

# Aggregate sizes by package
pkg_sizes = defaultdict(int)
pkg_files = defaultdict(int)

for i, src in enumerate(sources):
    content = contents[i] if i < len(contents) and contents[i] else ""
    size = len(content.encode("utf-8"))
    
    if "node_modules" in src:
        parts = src.split("node_modules/")[-1].split("/")
        if parts[0].startswith("@"):
            pkg = parts[0] + "/" + parts[1]
        else:
            pkg = parts[0]
        pkg_sizes[pkg] += size
        pkg_files[pkg] += 1
    else:
        pkg_sizes["[app code]"] += size
        pkg_files["[app code]"] += 1

# Sort by size descending
sorted_pkgs = sorted(pkg_sizes.items(), key=lambda x: -x[1])
total = sum(s for _, s in sorted_pkgs)

print(f"\nTotal source size: {total / 1024:.1f} KB ({total / 1024 / 1024:.2f} MB)")
print(f"\n{'Package':<45} {'Files':>5} {'Size':>10} {'%':>6}")
print("=" * 70)
for pkg, size in sorted_pkgs[:40]:
    pct = size / total * 100
    files = pkg_files[pkg]
    print(f"{pkg:<45} {files:>5} {size/1024:>8.1f}KB {pct:>5.1f}%")

print(f"\n{'TOTAL':<45} {'':<5} {total/1024:>8.1f}KB {100.0:>5.1f}%")

# Show top 5 biggest individual files
print("\n\nTop 20 Biggest Individual Files:")
print("=" * 80)
file_sizes = []
for i, src in enumerate(sources):
    content = contents[i] if i < len(contents) and contents[i] else ""
    size = len(content.encode("utf-8"))
    if size > 0:
        file_sizes.append((src, size))

file_sizes.sort(key=lambda x: -x[1])
for src, size in file_sizes[:20]:
    # Shorten the path
    short = src.split("node_modules/")[-1] if "node_modules" in src else src
    print(f"  {size/1024:>8.1f}KB  {short}")
