#!/usr/bin/env python3
"""Pull real-time Zillow data through the HasData Zillow Scraper API.

Usage:
  export HASDATA_API_KEY=your_key   # or set it in .claude/settings.local.json

  # Search active listings
  python3 scripts/zillow.py search "New York, NY" --type forSale \
      --min-price 400000 --max-price 900000 --beds 2

  # Fetch one property's full details by its Zillow URL
  python3 scripts/zillow.py property "https://www.zillow.com/homedetails/.../12345_zpid/"

Docs: https://docs.hasdata.com/apis/zillow/property
Each successful request consumes HasData credits.
"""
import argparse
import json
import os
import sys
import urllib.parse
import urllib.request

BASE = "https://api.hasdata.com/scrape/zillow"


def get_api_key() -> str:
    key = os.environ.get("HASDATA_API_KEY")
    if key:
        return key
    # Fallback: read the local (gitignored) Claude settings file.
    here = os.path.dirname(os.path.abspath(__file__))
    settings = os.path.join(here, os.pardir, ".claude", "settings.local.json")
    try:
        with open(settings, encoding="utf-8") as fh:
            return json.load(fh).get("env", {}).get("HASDATA_API_KEY", "")
    except OSError:
        return ""


def call(endpoint: str, params: dict) -> dict:
    key = get_api_key()
    if not key:
        sys.exit("HASDATA_API_KEY is not set (env var or .claude/settings.local.json).")
    url = f"{BASE}/{endpoint}?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"x-api-key": key})
    try:
        with urllib.request.urlopen(req, timeout=90) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", "replace")
        sys.exit(f"HasData API error {exc.code}: {body}")
    except urllib.error.URLError as exc:
        sys.exit(f"Network error reaching HasData: {exc.reason}")


def cmd_search(args) -> dict:
    params = {"keyword": args.keyword, "type": args.type}
    if args.sort:
        params["sort"] = args.sort
    if args.min_price is not None:
        params["minPrice"] = args.min_price
    if args.max_price is not None:
        params["maxPrice"] = args.max_price
    if args.beds is not None:
        params["bedsMin"] = args.beds
    if args.baths is not None:
        params["bathsMin"] = args.baths
    return call("listing", params)


def cmd_property(args) -> dict:
    return call("property", {"url": args.url})


def main() -> None:
    parser = argparse.ArgumentParser(description="Query Zillow via the HasData API.")
    sub = parser.add_subparsers(dest="command", required=True)

    s = sub.add_parser("search", help="Search Zillow listings by location.")
    s.add_argument("keyword", help='Location, e.g. "New York, NY".')
    s.add_argument("--type", default="forSale",
                   choices=["forSale", "forRent", "sold"])
    s.add_argument("--sort")
    s.add_argument("--min-price", type=int)
    s.add_argument("--max-price", type=int)
    s.add_argument("--beds", type=int, help="Minimum bedrooms.")
    s.add_argument("--baths", type=int, help="Minimum bathrooms.")
    s.set_defaults(func=cmd_search)

    p = sub.add_parser("property", help="Fetch full details for one property URL.")
    p.add_argument("url", help="Full Zillow property page URL.")
    p.set_defaults(func=cmd_property)

    args = parser.parse_args()
    print(json.dumps(args.func(args), indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
