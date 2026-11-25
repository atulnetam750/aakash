#!/usr/bin/env python3
"""Auto-sync script for Aakash Singh Thakur portfolio: updates live YouTube views & likes in data/stories.json."""

import concurrent.futures
import html as html_lib
import json
import re
import urllib.request
from datetime import datetime, timezone

CHANNEL_ID = "UCHplyeGVrLsVLnoaLn8w0dg"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9,hi;q=0.8",
}


def parse_compact_number(val):
    if not val:
        return None
    s = str(val).strip().replace(",", "").upper()
    if s in ("LIKE", "DISLIKE", ""):
        return None
    mult = 1
    if s.endswith("K"):
        mult = 1000
        s = s[:-1]
    elif s.endswith("M"):
        mult = 1_000_000
        s = s[:-1]
    try:
        return int(float(s) * mult)
    except ValueError:
        return None


def fetch_url(url, timeout=12):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read().decode("utf-8", "ignore")


def infer_category(title):
    t = title.lower()
    if any(k in t for k in ["नक्सल", "अबूझमाड़", "कुतुल", "हथियार", "माड़"]):
        return "naxal"
    if any(k in t for k in ["दशहरा", "परंपरा", "उत्सव", "ट्रेन", "गोंडी", "भंगाराम", "विदाई", "मेला"]):
        return "culture"
    return "public"


def fetch_video_stats(video):
    vid = video["id"]
    entry = dict(video)
    try:
        page = fetch_url(f"https://www.youtube.com/watch?v={vid}")
        vm = re.search(r'"viewCount":"(\d+)"', page)
        if vm:
            entry["views"] = int(vm.group(1))
        likes_val = None
        idx = page.find('"segmentedLikeDislikeButtonViewModel":{')
        if idx != -1:
            sub = page[idx:idx + 2800]
            lm = re.search(r'"likeButtonViewModel".*?"title":"([^"]+)"', sub)
            if lm:
                likes_val = parse_compact_number(lm.group(1))
        if likes_val is None:
            m2 = re.search(r'"likeCount":(\d+)', page)
            if m2:
                likes_val = int(m2.group(1))
        if likes_val is not None:
            entry["likes"] = likes_val
            entry["likes_display"] = f"{likes_val:,}"
    except Exception:
        pass
    return entry


def main():
    with open("data/stories.json", "r", encoding="utf-8") as f:
        existing = json.load(f)

    by_id = {v["id"]: v for v in existing.get("videos", []) if v.get("id")}
    try:
        rss = fetch_url(f"https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL_ID}")
        entries = re.findall(r"<yt:videoId>(.*?)</yt:videoId>.*?<title>(.*?)</title>.*?<published>(.*?)</published>", rss, re.S)
        for vid, raw_title, pub in entries:
            title = html_lib.unescape(raw_title).strip()
            if vid not in by_id:
                by_id[vid] = {
                    "id": vid,
                    "title": title,
                    "channel": "आदर्श वाणी समाचार नारायणपुर",
                    "date": pub[:10],
                    "category": infer_category(title),
                    "views": 0,
                    "likes": None,
                    "likes_display": "—",
                    "thumbnail": f"https://i.ytimg.com/vi/{vid}/hqdefault.jpg",
                    "url": f"https://www.youtube.com/watch?v={vid}",
                }
    except Exception:
        pass

    videos_list = list(by_id.values())
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as ex:
        updated = list(ex.map(fetch_video_stats, videos_list))

    updated.sort(key=lambda v: int(v.get("views") or 0), reverse=True)
    total_views = sum(int(v.get("views") or 0) for v in updated)
    total_likes = sum(int(v.get("likes") or 0) for v in updated if v.get("likes") is not None)
    top_id = updated[0]["id"] if updated else ""

    payload = {
        "updated_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "summary": {
            "total_videos": len(updated),
            "total_views": total_views,
            "total_likes": total_likes,
            "top_video_id": top_id,
        },
        "videos": updated,
    }
    with open("data/stories.json", "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    print(f"Synced {len(updated)} videos: {total_views} views, {total_likes} likes, top={top_id}")


if __name__ == "__main__":
    main()
