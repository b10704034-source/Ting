const rawNames = `
王芮安 (WANG,RUEI-AN)
王倩茵
王紹名 (SHAOMING WANG)
王紹宇 (WANG SHAO YU)
王鳴謙 (WANG, MING-CHIEN)
朱家瑤
江芸庭 (chiang yunting)
江詠忻 (JIANG, YONG-SHIN)
何咪娜
吳諺松 (WU, YEN-SUNG)
呂丞胤
呂欣倢 (LU,HSIN-CHIEH)
呂紹綸 (LU SHAO-LUN)
宋凱翔 (SUNG, KAI-SIANG)
李孟珊
李勇志
李政翰
李祖儀
周心慈 (CHOU, HSIN-TZU)
林位青
林季寰
林冠廷
林宣佑
林恒生
林柏儒 (LIN,PO-JU)
林湘庭 (LIN,HSIANG-TING)
林睿霖 (LIN, RUEI-LIN)
林燕玟 (LIN, YAN WEN)
侯碩喬 (HOU, SHOU-CHIAO)
張哲瑜 (JHANG, JHE-YU)
張宴煣 (CHANG,YEN-JOU)
張家倫
張新力 (CHANG HSIN-LI)
莊凱翔
莊馨予 (CHUANG,HSIN-YU)
郭子豪 (KUO ,ZIH-HAO)
郭玟慧
郭前程 (KUO, CHIEN-CHENG)
郭品均
陳沛樺 (CHEN,PEI-HUA)
陳欣妘 (CHEN, HSIN-YUN)
陳玟萱 (CHEN, WEN-XUAN)
陳品頤 (CHEN, PIN-YI)
陳威宙
陳彥菁
陳思群 (SI-QUN CHEN)
陳昱仁
陳柏承 (chen po-cheng)
陳懷璞 (CHEN, HUAI-PU)
陳麗如 (CHEN, LI-JU)
彭翌凱 (PENG, I-KAI)
黃心蓉
黃主亨
楊東韋 (YANG, TUNG WEI)
熊崇安
劉 曦 (LIU,HSI)
劉亦中
劉亮
劉品彣 (LIU,PIN-WEN)
劉家齊 (Liu, chia-chi)
劉霈涵 (PEI HAN LIU)
蔡子翎 (CAI,ZI-LING)
蔡唯杉 (WEI-SHAN TSAI)
蔡舒姍 未接受
蔡舒姍
蔡蕙薏 (CHUA HUI YUE)
蔣朋展 (CHIANG, PENG-CHAN)
鄧芳璉 (deng, fang-lian)
鄭睿宇 (JENG RUEI YU)
蕭葦倫 (HSIAO, WEI-LUN)
賴建辰
賴麗雪
駱俐芹 (LUO, LI-CHIN)
戴瑋姍 (TAI, WEI-SHAN)
謝沛馨
鍾奇
簡玉秀 (CHIEN, YU-HSIU)
顏竫綺 (YAN, JING-CI)
羅國平 (LO,KUO-PING)
`;

export const classmateNames: string[] = Array.from(new Set(rawNames
  .split('\n')
  .map(name => name.trim())
  .filter(name => name.length > 0)
  .map(name => {
    // Remove content in parentheses
    let cleanedName = name.replace(/\s*\(.*\)/, '');
    // Remove specific trailing text
    cleanedName = cleanedName.replace(/\s*未接受$/, '');
    // Handle special cases like '劉 曦'
    cleanedName = cleanedName.replace(/\s+/, '');
    return cleanedName.trim();
  })
  .filter(Boolean)
));
