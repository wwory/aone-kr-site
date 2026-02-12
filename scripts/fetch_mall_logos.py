# -*- coding: utf-8 -*-
"""
온라인 매장 로고 다운로드 스크립트
Google Favicon API 사용 (128x128 PNG)
"""
import os
import urllib.request

# (도메인, 저장파일명)
MALLS = [
    ("cjmall.com", "cjmall_logo.png"),
    ("ssg.com", "ssg_logo.png"),
    ("lotteon.com", "lotteon_logo.png"),
    ("gmarket.co.kr", "gmarket_logo.png"),
    ("auction.co.kr", "auction_logo.png"),
    ("11st.co.kr", "11st_logo.png"),
    ("coupang.com", "coupang_logo.png"),
    ("gsshop.com", "gsshop_logo.png"),
]

BEBE_FAIRS = [
    ("cobe.co.kr", "cobe_logo.png"),
    ("momsholic-babyfair.com", "momsholic_logo.png"),
]

OFFLINE_STORES = [
    ("lotte.com", "lotte_dept_logo.png"),
    ("galleria.co.kr", "galleria_logo.png"),
    ("costco.co.kr", "costco_logo.png"),
    ("starfield.co.kr", "starfield_logo.png"),
]

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "app", "static", "img", "pr")
FAVICON_URL = "https://www.google.com/s2/favicons?domain={}&sz=128"

def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    for domain, filename in MALLS + BEBE_FAIRS + OFFLINE_STORES:
        url = FAVICON_URL.format(domain)
        out_path = os.path.join(OUT_DIR, filename)
        try:
            urllib.request.urlretrieve(url, out_path)
            print(f"OK: {domain} -> {filename}")
        except Exception as e:
            print(f"FAIL: {domain} - {e}")

if __name__ == "__main__":
    main()
