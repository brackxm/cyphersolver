# UK archives sweep, Oct 2026

Method: Discovery's open JSON API (see `coverage.md`) with about 20 cipher-related search terms; 11,568 unique
records pulled to `all_records.json.gz`, filtered locally for "undeciphered / undecoded / not
deciphered" and for "in cipher" records with no sign of a decipherment. 24 candidate rows were kept in
`candidates.json` (`build.py` regenerates it). All 24 are `access: "archive"`: Discovery reports `digitised=false`
for every shortlisted record, and the portals that might hold images (Bodleian, Cambridge, Hatfield, NLS) were
bot-walled or unreachable. So there is no digitised, unsolved UK cipher in this list.

## Ranked leads

1. TNA PRO 30/11/3/207-209, number cipher "not deciphered", Cornwallis papers 1780 (importance 4). Plus PRO 30/11/6/23, /25-26, /54 and 69/16-18 (1781), the neighbours of targets/balfour1781 (a key family exists).
2. TNA SP 36/66 (ff. 100-119), 1745 Jacobite letters found on Blair and Maclean, "partly in undecoded cipher".
3. TNA SP 35/46, Atterbury plot cipher papers 1723 ("cannot be decyphered without vast trouble").
4. Northumberland Archives ZSW/554/1, copy of Charles I's cipher letter to Ormonde, 28 Oct 1648.
5. TNA SP 91/6 and 91/5/298, Whitworth (Moscow) 1708-09, undecoded copies with deciphered twins in the same volume (best solvability, cls A).
6. Staffordshire RO D(W)1778/I/i/56 and /59, Digby and Rupert 1645, "not deciphered", usable with the 1645 Royalist keys.
7. TNA PRO 30/57/4/119, Wolseley to Gordon, 19 Oct 1884, the cipher Gordon could not read.
8. TNA SP 84/165, nine "Undecoded cipher" folios, Holland 1662.

Also: SP 87/13/85, SP 63/71/52, CO 166/1/31, Bodleian Carte 212 and 256, Devon (Drake 1803-04, Simcoe 1794-95),
Wickham (Hampshire), SP 77/6/229, SP 78/111/93, SP 84/161/66.

Note on the catalogue wording: "undeciphered" in TNA catalogue entries usually means the clerk did not decipher it,
not that nobody ever did. Calendars (CSP) often supply the decipherment; each row's `prior_art` says what was checked
(Discovery text only, plus two web searches for PRO 30/57/4/119 and PRO 30/11). Nothing was checked against Saberton
(2019) or the printed Calendar of State Papers; do that before spending time.

## Key leads (bare keys, no ciphertext)

- Lambeth Palace Library, Carew MSS (calendared; copies of Pelham's cipher of 20 Nov 1579, the 25 Dec 1579 alphabet, the 15 Jun 1580 cipher): key leads for SP 63 Ireland 1579-80 (e.g. SP 63/71/52).
- TNA SP 35/36/34-37 (c. 1722), copies of French cipher keys for the Atterbury circle; SP 35/71/62 (1719-22) cipher key; SP 90/7/126 (1716) cipher alterations.
- TNA SP 84/164/48 and SP 84/165/36, /54, /75: ciphers sent to Williamson from Holland in 1661-62.
- Longleat House, Coventry Papers vol. LXXIX: "Keys to political ciphers of Henry Coventry ... 1664-1679" (record seen via Discovery, not on TNA shelves).
- BL Mss Eur D654 (Madras 1785 cipher), IOR/G/17 Ainslie cipher copies: outside this sweep's scope but seen.
- PRO 30/11 (Cornwallis) 6/55: "Cipher phrases of letter at 6/54 en clair" is a ready crib.
- SP 97/2, SP 105/60, SP 87/36-44 (Prince Ferdinand, Clavering 1759-61 "partly in cipher"): many partly-ciphered letters in volumes that also hold keys; most were read at the time.

## Dead ends and noise

- "cypher" gives 18,726 hits because of fuzzy matching, mostly royal cyphers and school ciphering books; "in code" is useless.
- Series dominated by cipher mentions but 20th century (ADM 137 Room 40, HW 15/19 GC&CS, FCO 141, HO 144 royal cypher, YLG): out of scope.
- WO 37, IOR, L 30/15 (Grantham), L 29 (Bedfordshire, Grantham-Eden decoded in text): letters carry decoded text.

## What was not reached

Bodleian, Cambridge, Lambeth, Hatfield, NLS, Parliamentary Archives, NLW, NAI, NRS Jacobite catalogue, PRONI: see
`coverage.md` (bot walls, 403, or not tried). They should be reached via the built-in browser in a person-driven
session. The TNA State Papers volumes themselves were only touched through catalogue text; none was viewed.
