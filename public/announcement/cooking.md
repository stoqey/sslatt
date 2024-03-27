### Cooking an Open source marketplace for Tor/Monero

What's up hackers, i know there's a lot of marketplaces scamming / seized by LE, so i decided to start an open source marketplace where anyone can sell digitals goods securely on and off the clearnet (supports TOR).

I initially wanted to create this marketplace as a hidden market on Tor but the implications and legalities involved are a lot, not just LE, but maintenance, bug fixes e.t.c...  would be a lot for a solo developer. so i decided to make it open, where i'd get contributions from amazing hackers and anyone who is tried of exit scams can also start their own marketplace without a lot of moving parts.

TLDR;
As chef, i'm cooking with all the modern recipes  / spices.

API 
 - framework: RoadmanJS (built by yours truly, it's like ReactJS but for backend components)
 - database: Couchbase (its like mongodb and postgres had a kid) + Redis 

UI:
 - framework: NextJS 14 App router (modern PHP that can spit HTML-only with zero js, noscript)
 - components: Styled-components with a framework-like Twitch UI.

Here is a list of all features i'll be working on, open to anyone who'd want to contribute as i'm in the early stages, lot's of features and bug fixes missing.


| Name                    | Description |
| ----------------------- | ----------- |
| PGP 2FA                 | ✅          |
| Autowithdraw            | ✅          |
| BTC, XMR                | ✅          |
| Escrow / FE             | ✅          |
| Multisig support        | 🔄          |
| Jabberbot               | 🔄          |
| FE disputes             | 🔄          |
| Auto dispute resolution | 🔄          |
| Walletless pay          | 🔄          |

- github: https://github.com/stoqey/sslatt 
- demo: https://sslatt.com