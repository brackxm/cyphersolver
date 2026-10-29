import json
D = "https://discovery.nationalarchives.gov.uk/details/r/"
O = "open (checked 28 Oct 2026: known.py, Discovery catalogue text; no web decipherment found)"


def row(year, date, title, corr, place, lang, region, period, sm, folio, cls, status, why, imp, sol, dif, verify, link,
        prior=O, decode=None, label="TNA Discovery record"):
    d = dict(year=year, date=date, title=title, correspondents=corr, place=place, language=lang, region=region,
             period=period, shelfmark=sm, folio_note=folio, cls=cls, status=status, why=why, importance=imp,
             solvability=sol, difficulty=dif,
             score_note="Scored from the archive description during the Oct 2026 UK archives sweep (research/uk_tna/); not viewed",
             verify=verify, links=[{"label": label, "href": link}], seen="catalogue",
             source="UK archives sweep (TNA Discovery)", prior_art=prior, access="archive")
    if decode:
        d["decode_ids"] = decode
    return d


C = []
C.append(row(1780, "10 Oct 1780", "Cornwallis papers: Charlotte Town, money to Major Wemyss, number cipher not deciphered",
             "unknown (Cornwallis circle) to Major James Wemyss", "Charlotte Town (Charlotte, NC)", "English", "Americas", "1701-1800",
             "TNA PRO 30/11/3/207-209 (Cornwallis Papers, Packet 3)", "3 items (ff. 207-209); catalogue: 'In number cipher, not deciphered'", "C",
             "Catalogue: 'In number cipher, not deciphered'. Not digitised at TNA (Discovery digitised=false); microfilm of PRO 30/11 exists (UNB Loyalist collection). Not on DECODE (known.py). Related to targets/balfour1781 and the Saberton/Lovell southern British ciphers.",
             "Number cipher of the Carolina campaign; the known British southern keys may fit.", 4, 2, 3,
             "Get a TNA copy or the microfilm; test the balfour1781 'Common cipher' key against the numbers.", D + "C6671059",
             O + "; Saberton 2019 not read in full"))
C.append(row(1781, "26 Apr - 5 May 1781", "Cornwallis papers: Balfour, Rawdon and Craig letters left in cipher and undeciphered",
             "Balfour / Rawdon / J. H. Craig to Cornwallis", "Charles Town, Camden, Wilmington", "English", "Americas", "1701-1800",
             "TNA PRO 30/11/6/23, 6/25-26, 6/54; PRO 30/11/69/16-18", "about 6 items; catalogue: 'Mostly in cipher and not deciphered', 'In cipher and undeciphered'", "B",
             "Catalogue marks each undeciphered. Neighbours were read in targets/balfour1781 (confirm which of these are already inside it). Not digitised. Not on DECODE.",
             "Southern campaign 1781 despatches; a key family already exists.", 4, 3, 2,
             "Compare PRO 30/11/6/23, /25, /54 with targets/balfour1781/NOTES.md; then get copies.", D + "C6671501"))
C.append(row(1662, "May 1662 (ff. 187-317)", "Holland 1662 intercepts: about nine folios of 'Undecoded cipher', one a Spanish king to the Marques de la Fuente",
             "King of Spain / unknown to Marques de la Fuente / Williamson", "Netherlands", "Spanish", "Low Countries", "1651-1700",
             "TNA SP 84/165/112, /131, /134, /141, /148, /151, /177, /181, /182, /183 (ff. 187-317)", "9 or 10 folios; f. 187 'Mainly undecoded cipher, one decoded paragraph in Spanish'", "C",
             "Catalogue says 'Undecoded cipher' for each. f. 187 has one decoded paragraph, a crib. Not digitised; not on DECODE. Chauran / de Bacquoy letters to Williamson in the same volume send ciphers (SP 84/165/36, /54, /75): key leads.",
             "Restoration-era intercepts and spy ciphers to Williamson; f. 187 gives a crib.", 3, 2, 3,
             "Obtain f. 187 with its decoded paragraph; check CSP for a calendared reading.", D + "C7306704"))
C.append(row(1745, "7 Mar - 5 Jun 1745", "Jacobite letters found on Blair and Maclean at arrest, partly in undecoded cipher (Sheridan, 'Burnet', Barclay)",
             "Thomas Sheridan; 'Burnet'; J. Barclay to Sir Hector Maclean ('Cleland') / George Blair", "Paris, Versailles", "unknown", "Other", "1701-1800",
             "TNA SP 36/66/100-109, 115, 119", "about 10 folios, each 'partly in undecoded cipher'; enclosed in f. 115 'for deciphering'", "C",
             "Catalogue says undecoded for each folio. Decipherers' reply not seen. Not digitised; not on DECODE.",
             "Letters of the eve of the '45 between the Jacobite court and Scottish supporters.", 4, 2, 4,
             "Check SP 36/66 for a decipher sheet and the Decipherers' papers in BL Add MS.", D + "C7768884"))
C.append(row(1645, "30 Jun 1645", "George Digby to William Legge, explanations of defeat (coded part not deciphered)",
             "George Digby to William Legge", "unknown", "English", "England", "1611-1650",
             "Staffordshire Record Office, D(W)1778/I/i/56 (Dartmouth/Legge papers)", "one letter; 'Coded part not deciphered'; 'Not Digby's hand'", "B",
             "Catalogue says not deciphered. The 1645 Digby/Nicholas/Goring keys are in BL Add MS 32256 (see catalogue.json). Not on DECODE.",
             "Naseby aftermath; Royalist 1645 key family exists.", 3, 3, 2,
             "Get an image from Staffordshire RO; try the SP 106/3 and BL 32256 keys.", D + "750f061a-d5f1-41d0-b7dd-c099644253b7", label="Discovery record (Staffordshire RO)"))
C.append(row(1645, "9 Aug 1645", "Prince Rupert to unknown, in code (not deciphered)",
             "Prince Rupert to unknown", "unknown", "English", "England", "1611-1650",
             "Staffordshire Record Office, D(W)1778/I/i/59 (Dartmouth/Legge papers)", "one letter 'In code. Not deciphered'", "B",
             "Catalogue says not deciphered. Rupert 1645 letters were read with Lasry's SP 106 keys (targets/rupert1645). Not on DECODE.",
             "Rupert before Bristol; same 1645 key family.", 3, 3, 2,
             "Get an image; try the keys of targets/rupert1645.", D + "ae899592-63ec-4920-a91b-4ddd0c5f9620", label="Discovery record (Staffordshire RO)"))
C.append(row(1884, "19 Oct 1884", "Wolseley to Gordon, telegram in code annotated 'cipher unknown (Gordon unable to decipher it)'",
             "Lord Wolseley to General Gordon", "Wadi Halfa", "English", "Other", "1801-1900",
             "TNA PRO 30/57/4/119 (Kitchener papers)", "one telegram", "C",
             "Annotation says Gordon could not read it. The Kitchener papers also hold decodes of Gordon-relief telegrams (PRO 30/57/4/134-135). Not on DECODE.",
             "Khartoum relief; the cipher Gordon could not read (Hansard 27 Feb 1885).", 3, 2, 3,
             "View the Discovery item; look for the matching decode in PRO 30/57/4.", D + "C6686796",
             "open (checked 28 Oct 2026: web search found a Hansard question only, no solution)"))
C.append(row(1743, "2 Sep 1743", "Newcastle to Carteret, enclosing a letter to '101' [undeciphered]",
             "Duke of Newcastle to Lord Carteret", "Whitehall", "English", "England", "1701-1800",
             "TNA SP 87/13/85", "ff. 174-175; enclosure to '101' undeciphered", "C",
             "Calendar says undeciphered; original in cipher. Not digitised. Not on DECODE.", "Dettingen campaign politics.", 3, 2, 3,
             "Check SP 87/13 for a key in the volume.", D + "C9188928"))
C.append(row(1580, "8 Feb 1580", "Sir Henry Wallop to Walsingham, cipher partly deciphered and partly obliterated",
             "Sir Henry Wallop to Francis Walsingham", "Dublin", "English", "England", "1560-1589",
             "TNA SP 63/71/52", "ff. 106-107; cipher part about the lord justice", "B",
             "Catalogue: 'Cipher, partly deciphered and partly obliterated'. The Pelham cipher of Nov 1579 (Carew MSS, Lambeth Palace Library) is a key lead. Not on DECODE.",
             "Desmond rebellion; the Carew keys may finish it.", 3, 3, 2,
             "Compare with Pelham's cipher in the Calendar of Carew MSS (20 Nov 1579).", D + "C10245605"))
C.append(row(1779, "8 Jul 1779", "Bouille, governor of Martinique, to Sartine, letter 'partly deciphered'",
             "Marquis de Bouille to Antoine de Sartine", "Martinique", "French", "Americas", "1701-1800",
             "TNA CO 166/1/31", "pp. 194-202", "B",
             "Duplicate of a captured letter, partly deciphered by the British. Not digitised. Not on DECODE.",
             "Intelligence from the American war in the West Indies.", 3, 3, 3,
             "Check CO 166/1 neighbours for a French key.", D + "C9120273"))
C.append(row(1709, "1709-1713", "Jacobite intrigues for the Restoration written with substituted words (partly deciphered)",
             "Earl of Middleton, Sir David Nairne and others", "unknown", "unknown", "England", "1701-1800",
             "Bodleian Library, MS. Carte 212", "volume of copies and breviates", "B",
             "Bodleian description: 'partly deciphered'. Bodleian Archives site is behind an Anubis bot wall; record read via Discovery only. Not on DECODE.",
             "Stuart court correspondence in a substitution code.", 3, 2, 3,
             "Check Bodleian Digital; ask Special Collections.", D + "42efe2bc-7d8f-4c5e-b26c-763ce81b1bcb", label="Discovery record (Bodleian)"))
C.append(row(1693, "19 Apr 1693 - 28 Mar 1695", "Nairne collection: several ciphers among the papers (fols. 3, 10v, 21, 25)",
             "Jacobite correspondents (Nairne collection)", "unknown", "unknown", "England", "1651-1700",
             "Bodleian Library, MS. Carte 256 fols. 3, 10v, 21, 25", "4 cipher passages", "C",
             "Bodleian description only. Not on DECODE.", "Jacobite cipher traffic 1693-95.", 3, 2, 3,
             "View the volume; compare with Carte 212.", D + "6fa8ff66-4e65-40c7-a901-1b9fd2f1fd0f", label="Discovery record (Bodleian)"))
C.append(row(1666, "Oct 1666 - 27 Feb 1667", "Arlington to Sandwich (Madrid), almost entirely in cypher on the Treaty with Spain",
             "Lord Arlington to Earl of Sandwich", "Whitehall to Madrid", "English", "England", "1651-1700",
             "Bodleian Library, MS. Carte 75 fols. 493, 498-499", "2 letters, mostly cipher", "B",
             "The Bodleian summary gives the content, so a decipherment is probably attached; not confirmed. Likely already read.",
             "Anglo-Spanish treaty of 1667.", 3, 3, 2,
             "Check whether the volume has interlinear decipherment.", D + "e3f1f349-1d78-44e7-a01b-1ccc43ead567",
             "unclear (the summary suggests it was read)", label="Discovery record (Bodleian)"))
C.append(row(1642, "20/30 Sep 1642", "French letter entirely in cipher", "unknown", "France", "French", "France", "1611-1650",
             "TNA SP 78/111/93 (f. 212)", "1 letter, entirely cipher", "C",
             "Catalogue: 'Letter entirely in cipher'. Flagged in research/oldest/hard_targets.md but not in catalogue.json. Not digitised.",
             "Civil War year French letter.", 2, 2, 4, "Obtain image.", D + "C7327886"))
C.append(row(1723, "Nov 1723", "Atterbury plot: cipher papers obtained by Shortiss; decipherers say 'cannot be decyphered without vast trouble'; 'Undecyphered paper'",
             "J. Shortiss; Mr Ward; Willes and Ashfield (decipherers)", "Paris", "English", "England", "1701-1800",
             "TNA SP 35/46 (SP 35/46/4, /9, /18, /47, /59)", "several enclosed cipher papers", "B",
             "Catalogue: decipherers could not read it without more text. Neighbouring SP 35 ciphers exist. Not on DECODE.",
             "Atterbury plot (1722-23) Jacobite cipher correspondence.", 4, 3, 3,
             "Open SP 35/46/59 'Undecyphered paper'; search the Decipherers' papers in BL Add MS.", D + "C17214530"))
C.append(row(1600, "21 Nov / 1 Dec 1600", "George Kendall to Cecil, in cipher", "George Kendall to Robert Cecil", "Flanders", "English", "England", "1598-1610",
             "TNA SP 77/6/229", "f. 229", "C", "Catalogue: '(in cipher)'; no decipherment noted. Not digitised.",
             "Cecil's Flemish intelligence at the Nieuport time.", 3, 2, 3, "Compare with Cecil keys (Hatfield CP).", D + "C7966108"))
C.append(row(1708, "1708-1709", "Whitworth's Russia despatches, copies 'partly in undecoded cipher'",
             "Charles Whitworth to Boyle / Harley", "Moscow", "English", "Other", "1701-1800",
             "TNA SP 91/6/9, /99, /144, /210, /213, /222, /225; SP 91/5/298", "about 8 folios; SP 91/5/298 is an 'undeciphered duplicate of f. 294 (deciphered version)'", "A",
             "Deciphered versions exist in the same volume for the duplicates, giving paired plaintext and ciphertext. Not digitised.",
             "Great Northern War despatches with ready cribs.", 3, 4, 2, "Match SP 91/5/298 with SP 91/5/294.", D + "C6719693"))
C.append(row(1656, "18 Jul 1656", "Letter in cipher (or shorthand), Holland", "unknown", "Holland", "unknown", "Low Countries", "1651-1700",
             "TNA SP 84/161/66 (f. 169)", "1 folio", "C", "Catalogue only. Not digitised.", "Commonwealth-period intercept.", 2, 2, 4, "Obtain image.", D + "C7306137"))
C.append(row(1648, "28 Oct 1648", "Copy of cipher letter from Charles I at Newport to the Duke of Ormonde",
             "Charles I to James Butler, Duke of Ormonde", "Newport, Isle of Wight", "unknown", "England", "1611-1650",
             "Northumberland Archives, ZSW/554/1 (Swinburne of Capheaton)", "copy of cipher letter", "B",
             "Contemporary copy; the Newport-period cipher letters are partly read in print (Carte). Not on DECODE.",
             "Charles I's last cipher letter to Ormonde.", 4, 3, 2, "Compare with Carte's Ormonde Papers.",
             D + "2a186a49-aafd-4561-beff-4f4c43d80828", label="Discovery record (Northumberland Archives)"))
C.append(row(1803, "1803-1804", "Drake of Colyton papers: letters in cypher (Jackson, Wynne, Hill enclosure) to Francis Drake",
             "Jackson / Henry Wynne / W. Hill to Francis Drake (envoy at Munich)", "Karlsbad and elsewhere", "unknown", "Central Europe", "1801-1900",
             "Devon Archives (South West Heritage Trust), 1700m-0/C/P/661, /674, /701", "3 letters; /83 is a c.1709 copy 'Cypher letters' to Godolphin", "C",
             "Catalogue only; no decipherment noted. Not on DECODE.", "Drake's Munich intrigue of 1804.", 3, 2, 3,
             "Ask Devon Heritage Centre for images.", D + "4f11b618-bde5-4575-a9e9-98c1374a288d", label="Discovery record (Devon)"))
C.append(row(1794, "1794-1795", "Simcoe papers: cipher letters relating to North America", "unknown (Simcoe circle)", "unknown", "English", "Americas", "1701-1800",
             "Devon Archives, 1038 M/O/5/1-3", "3 items", "C",
             "Catalogue: 'Cipher letters relating to North America'. Not on DECODE. The Clements Library also holds Simcoe papers.",
             "Upper Canada governor's secret traffic.", 3, 2, 3, "Request images.", D + "4461f498-2047-4d13-8384-7d515a215310", label="Discovery record (Devon)"))
C.append(row(1795, "1795-1797", "Wickham papers: Foreign Affairs letters, some in cipher", "William Wickham and correspondents", "Switzerland / Germany", "English", "Central Europe", "1701-1800",
             "Hampshire Archives, 38M49/1/3/1-9; 38M49/1/10/1-51", "about 60 items, 'some in cipher'", "B",
             "Wickham's correspondence was printed in 1870, which may decode some. Not on DECODE.", "British secret service in Switzerland in the Revolution.", 3, 3, 3,
             "Compare with the 1870 edition.", D + "9910114e-671a-40ae-a4a7-e524c261afb5", label="Discovery record (Hampshire Archives)"))
C.append(row(1791, "28 Mar 1791", "Boulton family: letter 'entirely in secret writing' (No. 11)", "Matthew Boulton circle", "Birmingham", "unknown", "England", "1701-1800",
             "Birmingham Archives, MS 3782/12/91/127", "1 letter", "C",
             "Catalogue only; a letter of 1765 (MS 3782/12/60/19) explains a vowel-number cipher, possibly the same habit.", "French coinage business; low value.", 1, 3, 1,
             "Check the 1765 letter for the key.", D + "ddcb34b0-9d75-4409-9d40-2a558a8b7187", label="Discovery record (Birmingham)"))
C.append(row(1879, "May-Jun 1879", "Zulu War cipher telegrams (Fort Pearson, Crealock) in the Templer Study Centre; one Boer War telegram 'not deciphered'",
             "Pearson, Crealock to Military Secretary", "Fort Pearson, Natal", "English", "Other", "1801-1900",
             "National Army Museum, 6807/386/13/42, 6807/386/15/9, 6807/386/15/16; 6807/386/7/53", "several telegrams", "C",
             "Catalogue only; field codes. 7/53 is 'not deciphered'.", "Prince Imperial's death week.", 2, 2, 3, "Ask the NAM.",
             "https://discovery.nationalarchives.gov.uk/results/r?_q=cipher%20telegram%20Fort%20Pearson", label="Discovery search"))
json.dump(C, open("candidates.json", "w"), indent=1, ensure_ascii=False)
print(len(C), sum(c["access"] == "online" for c in C))
