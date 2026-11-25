#!/usr/bin/env python3
"""Auto-sync script for Aakash Singh Thakur portal:
1. Syncs latest posts & thumbnails directly from https://aadarshvanisamachar.com/wp-json/wp/v2/posts (plus /feed/ XML & rss2json fallback) into data/stories.json ("articles").
2. Syncs latest videos & live views/likes from YouTube channel UCHplyeGVrLsVLnoaLn8w0dg into data/stories.json ("videos").
"""

import concurrent.futures
import email.utils
import html as html_lib
import json
import re
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone

CHANNEL_ID = "UCHplyeGVrLsVLnoaLn8w0dg"
WP_API_URL = "https://aadarshvanisamachar.com/wp-json/wp/v2/posts?per_page=15&_embed"
AVS_RSS_DIRECT = "https://aadarshvanisamachar.com/feed/"
AVS_RSS2JSON = "https://api.rss2json.com/v1/api.json?rss_url=" + urllib.parse.quote(AVS_RSS_DIRECT, safe="")
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/125.0.0.0 Mobile Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8",
    "Accept-Language": "hi-IN,hi;q=0.9,en-US;q=0.8,en;q=0.7",
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


def fetch_url(url, timeout=15):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read().decode("utf-8", "ignore")


def upgrade_avs_https(url):
    if not url or not isinstance(url, str):
        return ""
    u = url.strip()
    if u.startswith("http://aadarshvanisamachar.com"):
        u = "https://" + u[len("http://"):]
    elif u.startswith("http://www.aadarshvanisamachar.com"):
        u = "https://" + u[len("http://"):]
    return u if u.startswith("https://") else ""


def strip_html(raw):
    text = re.sub(r"<[^>]+>", " ", str(raw or ""))
    text = html_lib.unescape(text)
    text = re.sub(r"\s*The post\b.*?appeared first on.*$", "", text, flags=re.I | re.S)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def extract_first_img(raw_html):
    for m in re.finditer(r'<img[^>]+src=["\']([^"\']+)["\']', str(raw_html or ""), re.I):
        cand = upgrade_avs_https(m.group(1))
        if cand:
            return cand
    return ""


def fetch_og_image(article_url):
    try:
        page = fetch_url(article_url, timeout=10)
        m = re.search(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']', page, re.I)
        if not m:
            m = re.search(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+property=["\']og:image["\']', page, re.I)
        if m:
            return upgrade_avs_https(m.group(1))
    except Exception:
        pass
    return ""


def infer_category(title):
    t = title.lower()
    if any(k in t for k in ["नक्सल", "अबूझमाड़", "कुतुल", "हथियार", "माड़"]):
        return "naxal"
    if any(k in t for k in ["दशहरा", "परंपरा", "उत्सव", "ट्रेन", "गोंडी", "भंगाराम", "विदाई", "मेला"]):
        return "culture"
    return "public"


def article_key(item):
    url = item.get("url", "")
    if url:
        try:
            path = urllib.parse.urlparse(url).path.rstrip("/")
            if path:
                return f"path:{path}"
        except Exception:
            pass
    return "title:" + item.get("title", "").strip()[:60]


def make_article_entry(title, url, pub_dt, summary_raw, img_raw, author="आकाश सिंह ठाकुर"):
    summary_full = strip_html(summary_raw)
    summary = (summary_full[:157] + "...") if len(summary_full) > 160 else summary_full
    date_only = pub_dt[:10] if len(pub_dt) >= 10 else datetime.now(timezone.utc).strftime("%Y-%m-%d")
    tags = ["avs"]
    if any(k in title for k in ("नक्सल", "अबूझमाड़", "कुतुल", "माड़", "हथियार")):
        tags.append("naxal")
    return {
        "title": title,
        "source": "आदर्श वाणी समाचार",
        "sourceKey": "avs",
        "tags": tags,
        "date": date_only,
        "pub_datetime": pub_dt or date_only,
        "author": author or "आकाश सिंह ठाकुर",
        "summary": summary,
        "url": url,
        "image": img_raw,
    }


def fetch_avs_from_wp_api():
    raw = fetch_url(WP_API_URL, timeout=15)
    posts = json.loads(raw)
    out = []
    for p in posts:
        title = strip_html((p.get("title") or {}).get("rendered", ""))
        url = upgrade_avs_https(p.get("link", ""))
        if not title or not url:
            continue
        pub_dt = (p.get("date_gmt") or p.get("date") or "").strip()
        if pub_dt and not pub_dt.endswith("Z"):
            pub_dt += "Z"
        emb = p.get("_embedded") or {}
        media = emb.get("wp:featuredmedia") or []
        img = upgrade_avs_https(media[0].get("source_url", "")) if media and isinstance(media[0], dict) else ""
        if not img:
            img = extract_first_img((p.get("content") or {}).get("rendered", ""))
        authors = emb.get("author") or []
        author = strip_html(authors[0].get("name", "")) if authors and isinstance(authors[0], dict) else "आकाश सिंह ठाकुर"
        summary_raw = (p.get("excerpt") or {}).get("rendered", "") or (p.get("content") or {}).get("rendered", "")
        out.append(make_article_entry(title, url, pub_dt, summary_raw, img, author))
    return out


def fetch_avs_from_xml():
    xml_raw = fetch_url(AVS_RSS_DIRECT, timeout=15)
    root = ET.fromstring(xml_raw)
    ns = {"content": "http://purl.org/rss/1.0/modules/content/", "dc": "http://purl.org/dc/elements/1.1/"}
    out = []
    for item in root.findall("./channel/item"):
        title = strip_html(item.findtext("title", ""))
        url = upgrade_avs_https(item.findtext("link", ""))
        if not title or not url:
            continue
        pub_raw = item.findtext("pubDate", "")
        try:
            dt = email.utils.parsedate_to_datetime(pub_raw)
            pub_dt = dt.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
        except Exception:
            pub_dt = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
        content_html = item.findtext("content:encoded", "", ns) or item.findtext("description", "")
        img = extract_first_img(content_html)
        author = strip_html(item.findtext("dc:creator", "", ns)) or "आकाश सिंह ठाकुर"
        out.append(make_article_entry(title, url, pub_dt, item.findtext("description", "") or content_html, img, author))
    return out


def fetch_avs_from_rss2json():
    raw = fetch_url(AVS_RSS2JSON, timeout=15)
    data = json.loads(raw)
    if data.get("status") != "ok":
        return []
    out = []
    for it in data.get("items", []):
        title = strip_html(it.get("title", ""))
        url = upgrade_avs_https(it.get("link", ""))
        if not title or not url:
            continue
        pub_dt = str(it.get("pubDate", "")).strip().replace(" ", "T")
        if pub_dt and not pub_dt.endswith("Z"):
            pub_dt += "Z"
        enc = it.get("enclosure") if isinstance(it.get("enclosure"), dict) else {}
        img = (
            upgrade_avs_https(it.get("thumbnail", ""))
            or upgrade_avs_https(enc.get("link", ""))
            or extract_first_img(it.get("content") or it.get("description") or "")
        )
        out.append(make_article_entry(
            title, url, pub_dt,
            it.get("description") or it.get("content") or "",
            img, strip_html(it.get("author", "")) or "आकाश सिंह ठाकुर"
        ))
    return out


def sync_avs_articles(existing_articles):
    by_key = {article_key(art): dict(art) for art in existing_articles}
    fetched_entries = []

    for fetcher in (fetch_avs_from_wp_api, fetch_avs_from_xml, fetch_avs_from_rss2json):
        try:
            items = fetcher()
            if items:
                fetched_entries = items
                break
        except Exception:
            continue

    for entry in fetched_entries:
        k = article_key(entry)
        prev = by_key.get(k)
        if prev:
            if not entry["image"] and prev.get("image"):
                entry["image"] = upgrade_avs_https(prev["image"])
            if not entry["summary"] and prev.get("summary"):
                entry["summary"] = prev["summary"]
        if not entry["image"]:
            entry["image"] = fetch_og_image(entry["url"])
        by_key[k] = entry

    articles = list(by_key.values())
    articles.sort(key=lambda a: str(a.get("pub_datetime") or a.get("date") or ""), reverse=True)
    return articles


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
    try:
        with open("data/stories.json", "r", encoding="utf-8") as f:
            existing = json.load(f)
    except FileNotFoundError:
        existing = {}

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
        updated_videos = list(ex.map(fetch_video_stats, videos_list))

    updated_videos.sort(key=lambda v: int(v.get("views") or 0), reverse=True)
    updated_articles = sync_avs_articles(existing.get("articles", []))

    total_views = sum(int(v.get("views") or 0) for v in updated_videos)
    total_likes = sum(int(v.get("likes") or 0) for v in updated_videos if v.get("likes") is not None)
    top_id = updated_videos[0]["id"] if updated_videos else ""
    latest_art_date = updated_articles[0]["date"] if updated_articles else ""

    payload = {
        "updated_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "summary": {
            "total_videos": len(updated_videos),
            "total_articles": len(updated_articles),
            "total_views": total_views,
            "total_likes": total_likes,
            "top_video_id": top_id,
            "latest_article_date": latest_art_date,
        },
        "articles": updated_articles,
        "videos": updated_videos,
    }
    with open("data/stories.json", "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    print(f"Synced {len(updated_articles)} AVS articles (latest={latest_art_date}) + {len(updated_videos)} videos: {total_views} views, {total_likes} likes, top={top_id}")


if __name__ == "__main__":
    main()
