# IMAGE PROCESSING PROTOCOL v1.4

**Purpose:** Prevent API context window errors when reading multiple images
**API Constraint:** Max 2000px longest dimension for multi-image requests
**Trigger:** BEFORE using Read tool on image files (.jpg .jpeg .png .webp .gif .bmp .tiff)

---

## Execution

**Execute in subshell (auto-returns to original directory):**
```bash
(
cd <image_directory>

bash << 'EOF'
set -euo pipefail

T1=1920 T2=1024 Q=90
mkdir -p resized

c=$(find . -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" -o -iname "*.gif" -o -iname "*.bmp" -o -iname "*.tiff" \) | wc -l | tr -d ' ')
if [[ $c -le 5 ]]; then t=$T1; else t=$T2; fi

proc() {
  local f=$1 b=${1%.*}
  [[ $f =~ ^[a-zA-Z0-9._-]+$ ]] || return 1
  [[ -f "resized/$b.webp" && -s "resized/$b.webp" ]] && return 0

  local d=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$f" 2>/dev/null) || return 1
  [[ $d =~ ^[0-9]+x[0-9]+$ ]] || return 1
  local w=${d%x*} h=${d#*x}
  [[ $w -gt 0 && $h -gt 0 ]] || return 1

  if [[ $w -gt $t || $h -gt $t ]]; then
    ffmpeg -hide_banner -loglevel error -i "$f" -vf "scale='min($t,iw)':'min($t,ih)':force_original_aspect_ratio=decrease" -c:v libwebp -quality $Q "resized/$b.webp" -y 2>/dev/null || { rm -f "resized/$b.webp"; return 1; }
  else
    ffmpeg -hide_banner -loglevel error -i "$f" -c:v libwebp -quality $Q "resized/$b.webp" -y 2>/dev/null || { rm -f "resized/$b.webp"; return 1; }
  fi

  [[ -s "resized/$b.webp" ]] || { rm -f "resized/$b.webp"; return 1; }
}

if command -v parallel &>/dev/null && [[ $c -gt 10 ]]; then
  export -f proc
  export t Q
  find . -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" -o -iname "*.gif" -o -iname "*.bmp" -o -iname "*.tiff" \) -print0 | parallel -0 -j 8 proc {} 2>/dev/null
else
  for f in *.jpg *.jpeg *.png *.webp *.gif *.bmp *.tiff; do
    [[ -f "$f" ]] && proc "$f"
  done
fi
EOF
)
```

---

## Read Processed Images

**Use absolute or project-relative paths:**
```
Read("<image_directory>/resized/photo.webp")
```

**Example from project root:**
```
Read("tmp/photos/resized/photo.webp")
```

---

## Behavior

**Adaptive threshold:**
- ≤5 images: 1920px (moderate compression)
- >5 images: 1024px (aggressive compression)

**Processing:**
- Resizes only if needed (preserves aspect ratio)
- Converts to WebP (quality 90)
- Skips already processed files
- Validates filenames (security)
- Parallel processing for >10 images (8 jobs)
- Sequential fallback if GNU parallel unavailable

**Scope:**
- Subshell auto-returns to original directory
- No temporary files created (heredoc in-memory execution)
- Output stored in resized/ subdirectory
