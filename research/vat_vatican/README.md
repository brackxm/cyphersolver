# Vatican sweep, 28 Oct 2026

Result: 4 candidates (all four are DECODE-listed Segreteria di Stato records, `access` = "online" via DECODE images,
unverified). The Vatican portals' search endpoints returned HTTP 403 to scripts and to the built-in browser, so the
sweep of DigiVatLib/OPAC by keyword could not be done. See coverage.md.

## Method
1. DECODE list (`research/catalogue_harvest/decode/list.json`, 10,106 records, holder strings) and the partial view
   dumps were filtered for Vatican holders (ASV/AAV, BAV): about 560 records. Each id range was run through the
   repo ledgers (the same logic as known.py). Nearly all are already in the repo (Pallotto 1628/1629, Damiata/Naro,
   Morosini, Alessandrino, Ormanetto, Windischgratz no, Spagna 364C/D, Colonia 1721, Vatican Challenge 1-5, Ceva R74-R84,
   Bagno R5622, Borg.lat. 898 solved, Avignon keys R23/R202-204, Urb.lat. 998 keys).
2. What was left: DECODE "N/A" (status 4) ciphertext records of Segr. Stato Francia 32, Francia 173, Francia 346, Spagna 22.
3. Web searches (about 10) for other Vatican cipher items, BAV manuscripts, and published inventories: nothing new.

## Ranked leads (candidates.json)
1. Francia 346, R5625-R5686: 62 records, Rome to Paris nuncio Ceva 1632-34, key family already known (Lasry key on
   R74-R84). Best value: many letters, probable quick key test. Check first whether the "N/A" records are ciphertext.
2. Francia 32, R5612-R5621: Sega, Paris, Nov-Dec 1590, ten records.
3. Spagna 22, R5624: Sega, Madrid 1579, test the Ormanetto key.
4. Francia 173, R5623: Ranuzzi 1684-85; probably printed in Neveu, ANG 10, so check the edition first.

## Key leads (no ciphertext)
- DECODE R205, R206: AAV Arm. XLIV 7, 1566 (record_type 2 = key; Italian). Not in the repo. Pius V period.
- DECODE R207: AAV Arch. Nunz. Colonia 12 (key record). Not in the repo; may read other Cologne despatches.
- Already in the repo: Urb.lat. 998 (R1413-R1468, Montefeltro keys), Avignon keys (R23, R202-R204).

## Dead ends
- Vatican Challenge Parts 1-5: all solved (Part 3 = Colonia 1721 solved 2022; Part 5 by Klee Sept 2026; Part 4 July 2026).
- Borg.lat. 898 solved 2016. Vat. lat. 5961 (Gruter 1424) is an acrostic, read.
- Benigni R4933-R4957 are Romanian National Archives (Sibiu), not Vatican.
- AAV site (archivioapostolicovaticano.va) has no online searchable inventories or images; only a PDF "Indice dei Fondi".
  Any AAV item without a DECODE record is access "archive" and has no findable cipher description.

## Ideas not done
- Probe BAV manifests `https://digi.vatlib.it/iiif/MSS_<shelfmark>/manifest.json` (works with plain GET, 200 for digitised
  volumes, 404 otherwise) for Barb.lat. neighbours of 6956/6960 (6957-6959, 6961 are not digitised). Needs a shelfmark list.
- Meister, Die Geheimschrift im Dienste der papstlichen Kurie (1906) and Lasry/Megyesi/Kopal, Cryptologia 45 (2021) for
  the full list of Vatican cipher series; not available online here.
