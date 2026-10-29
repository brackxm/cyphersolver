# Coverage, Vatican sweep, 28 Oct 2026

## Unreachable
- digi.vatlib.it/search?k_v=... and opac.vatlib.it/mss/search?... : HTTP 403 for curl (browser UA) and the built-in browser
  (both with correct form parameters k_f/k_v/sm). Not worked around. Home pages and IIIF manifests respond 200.
- iris.vatlib.it, archivio.vatican.va, archiviostorico.vatican.va: timeouts / connection failure.
- cryptiana.web.fc2.com/code/papal.htm: 404 (redirect to fc2 error page).
- DECODE itself (login/JWT): not used; only the local list.json and view dumps.
- The HistoCrypt 2022 PDF (401) was read: no list of remaining open Vatican items.

## Queries and results
Local: DECODE list filtered by holder (about 560 Vatican records, 10 groups unknown to the repo before checking);
known.py terms: Vatican, Segreteria di Stato, Fondo Borghese, Barb. lat, Ross., Urb. lat, Chig, Vatican Challenge, Vat. lat,
Reg. lat, Borgh, Archivio Concistoriale, Misc. Arm, Arm. XLIV, Cifre, Fondo Pio, Camera Apostolica, Francia 346/173/32,
Spagna 22, Ranuzzi, R-numbers for ids 4-5686 listed in the group scan (all hit except R205-207, R5612-5621, R5624, R5626-5686).
Web (WebSearch, ~10): Vatican cipher digitised unsolved (0 new); AAV online inventories (0, PDF only); cryptiana Vatican
(Vatican Challenges only); DigiVatLib cifra/cifrario (0); Barb. lat. cifre (0 new beyond 6956/6960); Segreteria di Stato Cifre
series, Fondo Borghese (0 new); Lasry papal ciphers (only the 1721 challenge). Fetched: archivioapostolicovaticano.va home and
patrimonio page; mysterytwister Vatican Part 3 page; HistoCrypt 401 PDF; Cryptoole snapshot filtered for Vatican (all already in repo).
Candidates kept: 4; access=online: 4 (DECODE-hosted scans, unverified); access=archive: 0.
