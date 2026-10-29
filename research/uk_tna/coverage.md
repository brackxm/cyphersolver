# UK sweep coverage (28 Oct 2026)

Endpoint: `https://discovery.nationalarchives.gov.uk/API/search/records` (open JSON API, 3.5 s between calls, descriptive
User-Agent). Script: `harvest.py` (results saved as `raw_*.json`, merged into `all_records.json` by `merge_raw.py`).
Discovery aggregates catalogue records of many other UK archives (Bodleian, Lambeth, record offices), so the one
API covered those catalogues as well. The `sps.department` and `sps.digitisedOnly` filters did NOT filter (counts
unchanged), so every query was run unfiltered and filtered locally.

| Query | Hits | Retrieved |
|---|---|---|
| cipher / ciphers | 2247 | 2247 |
| cypher / cyphers | 18726 (fuzzy, matches many other words) | 4000 cap |
| decipher | 651 | 651 |
| deciphered | (see raw file) | all |
| undeciphered | 54 | 54 |
| undeciphered cipher | 7 | 7 |
| in cipher | 1295 | 1295 |
| in cypher | 1754 | 1754 |
| not deciphered | 143 | 143 |
| cipher letter | 382 | 382 |
| cypher letter | 397 | 397 |
| key to the cipher | 68 | 68 |
| nomenclator | 7 | 7 |
| secret writing | 563 | 563 |
| partly deciphered | 22 | 22 |
| undecoded | 54 | 54 |
| cipher not deciphered | 27 | 27 |
| in code | 85822 (too loose) | 4000 cap |
| numerical cipher | 7 | 7 |
| ciphered, no key (loose) | small | all |

Merged unique records: 11,568; with cipher/cyphers/undecoded/nomenclator wording: 4,353. Local filters: explicit
"undeciphered / not deciphered / undecoded" (98 records), and "in cipher" with no decipher/key/translation wording,
dated to 1900 (568 records, reviewed by series). SP 106 deliberately skipped (about 69 hits seen, not reviewed).
Many hits are noise: royal cyphers (monograms), school "ciphering" books, "cannot decipher handwriting".

Digitised check: Discovery `details` call (`digitised` field) on 16 shortlisted records: all false. No TNA State
Papers cipher record is viewable online free (SP is on Gale/SPO behind subscription), so every candidate has
`access: "archive"`. None of the 24 candidates is `online`.

Unreachable or blocked (not worked around):

- Bodleian Archives & Manuscripts (archives.bodleian.ox.ac.uk): Anubis proof-of-work bot wall on search.
- Cambridge University Library digital (digital.library.cam.ac.uk): connection failed; ArchiveSearch (archivesearch.lib.cam.ac.uk): HTTP 403.
- Lambeth Palace Library archive catalogue: HTTP 403 (Carew MSS records came via Discovery).
- Hatfield House / Cecil Papers (cecilpapers.org): Cloudflare "Just a moment" wall.
- National Library of Scotland manuscripts (manuscripts.nls.uk): Cloudflare 403.
- Parliamentary Archives: Cloudflare redirect (301 + Cloudflare).
- Trinity College Cambridge archive, Hertfordshire CalmView: Cloudflare wall / no connection.
- National Library of Wales search: no connection. National Archives of Ireland: redirected, not searched.
- NRS (Jacobite ciphers) and PRONI: not searched; only the front page of NRS was fetched (200). Their catalogues
  are partly in Discovery, but no NRS/PRONI cipher hits turned up in the Discovery queries.
- ADM 137, HW, FO 366/1093, WO 106: seen in the broad results (HW 19 and ADM 137 are 20th-century Room 40 / GC&CS files,
  mostly outside the "unsolved classical" scope); not reviewed item by item.
