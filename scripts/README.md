# Zillow ↔ HasData integration

`zillow.py` pulls real-time Zillow data through the [HasData Zillow Scraper API](https://docs.hasdata.com/apis/zillow/property).
Claude can run it on demand to fetch live listings or property details.

## Setup

The API key is read from `HASDATA_API_KEY` (environment variable) or, as a
fallback, from `.claude/settings.local.json` (gitignored). It's already
configured in this repo.

## Usage

```bash
# Search active listings
python3 scripts/zillow.py search "New York, NY" --type forSale \
    --min-price 400000 --max-price 900000 --beds 2

# Full details for one property
python3 scripts/zillow.py property "https://www.zillow.com/homedetails/.../12345_zpid/"
```

`--type` accepts `forSale`, `forRent`, or `sold`. Output is JSON on stdout.
Each successful request consumes HasData credits.

## Network requirement

`api.hasdata.com` must be reachable. In a restricted Claude Code environment
the egress proxy may block it (`403 Forbidden` / "Tunnel connection failed").
To allow it, configure the environment's network policy to permit
`api.hasdata.com` — see the Claude Code on the web docs:
https://code.claude.com/docs/en/claude-code-on-the-web
