/* ==================================================================
   NIDHA'S — i18n (English / Hindi)

   Scope, by design:
   - Product names, category names (Bridal/Chikankari/...), and fabric
     names are NEVER translated — they're catalogue data, not UI copy,
     and Nidha's was explicit that product names must stay in English
     even with the page in Hindi. They simply never get a data-i18n
     attribute or pass through t().
   - Everything else — nav, hero, section copy, buttons, forms, badges,
     footer, testimonials, filters, product-detail chrome — does.

   How it's wired:
   - Static text: add data-i18n="key" to the element. applyI18n() sets
     its textContent.
   - Static text that must contain markup (only the hero heading, which
     needs a <br> line-break): data-i18n-html="key" sets innerHTML instead.
   - Dynamic text generated in JS (product cards, drawer, toasts, the
     WhatsApp message): call the global t(key, vars) directly.
   - Language choice persists via localStorage and is re-applied on
     every page load, so it carries across navigation.
   ================================================================== */

const I18N = {
  en: {
    "announce.text": "Complimentary styling advice on WhatsApp · Handcrafted across India",
    "nav.home": "Home",
    "nav.collections": "Collections",
    "nav.about": "About",
    "nav.contact": "Contact",
    "mobileNav.whatsapp": "Chat with us on WhatsApp",

    "hero.eyebrow": "The New Edit — 2026",
    "hero.headline": "Where tradition<br>meets tomorrow.",
    "hero.subtitle": "Chikankari, festive and bridal fabric, hand-finished and sold as complete 4-colour design sets — ready for your tailor to stitch into the piece you have in mind.",
    "hero.ctaPrimary": "Explore The Collection",
    "hero.ctaWhatsapp": "Chat on WhatsApp",

    "policy.title": "Please note before you order",
    "policy.body": "We sell unstitched fabric only — not ready-made kurtis. Every design is sold as a complete set of all 4 colourways together; we don't split sets or sell single colours.",

    "collections.heading": "Featured Collections",
    "collections.subtitle": "Three edits, one standard of finishing — start wherever the occasion calls you.",
    "collections.viewAll": "View All Collections",
    "collections.bridalTitle": "The Bridal Edit",
    "collections.bridalCta": "Shop Bridal",
    "collections.chikankariTitle": "Chikankari Story",
    "collections.chikankariCta": "Shop Chikankari",
    "collections.festiveTitle": "Festive Wear",
    "collections.festiveCta": "Shop Festive",

    "arrivals.heading": "New Arrivals",
    "arrivals.subtitle": "Fresh off the design table this month.",
    "arrivals.cta": "Shop All New",

    "bestsellers.heading": "Best Sellers",
    "bestsellers.subtitle": "The designs our customers keep coming back for.",
    "bestsellers.cta": "Shop Bestsellers",

    "story.eyebrow": "Our Story",
    "story.quote": "\u201CWe didn\u2019t want a brand that photographs well and wears badly. So we built the other kind.\u201D",
    "story.body": "Nidha's began at a small cutting table and a stubborn belief: that Indian ethnic fabric could be chosen as carefully as the garment it becomes. Every design is checked by hand, cut in small batches rather than mass runs, and sold complete — as the full set it was designed in, not split apart.",
    "story.founderTitle": "Founder & Head of Design",

    "why.heading": "Why Choose Nidha's",
    "why.item1Title": "Handcrafted Detailing",
    "why.item1Body": "Hand embroidery and finishing checked piece by piece, not batch-sampled.",
    "why.item2Title": "Premium Fabrics",
    "why.item2Body": "Pure cotton, Chanderi, Georgette and silk blends, sourced for how they wear, not just how they photograph.",
    "why.item3Title": "Personal Guidance on WhatsApp",
    "why.item3Body": "Fabric questions, stitching guidance and set details — a real person replies, not a chatbot script.",
    "why.item4Title": "Pan-India Delivery",
    "why.item4Body": "Once your order is confirmed on WhatsApp, your fabric is cut, packed and shipped to your door.",

    "testimonials.heading": "What Customers Say",
    "testi1.quote": "\u201CThe Chikankari fabric was even richer than the photos, and the full set of 4 colours meant I could pick exactly which one to stitch first. Ordering over WhatsApp with a real person made it easy.\u201D",
    "testi2.quote": "\u201CBought my sister's bridal fabric set from Nidha's. The team walked us through the fabric and colours over calls before we committed to anything. Worth every rupee.\u201D",
    "testi3.quote": "\u201CI've reordered three times now. The finishing on the fabric is a level above what I've bought at this price elsewhere.\u201D",

    "instagram.heading": "Follow @nidhas.official",
    "instagram.subtitle": "Styling notes, fabric close-ups, and new drops first.",
    "instagram.cta": "Follow on Instagram",

    "newsletter.eyebrow": "Stay Close",
    "newsletter.heading": "Join the Nidha's Circle",
    "newsletter.subtitle": "New arrivals, restocks and styling notes — no spam, just the good pieces first.",
    "newsletter.button": "Subscribe",
    "newsletter.success": "You're on the list — welcome to the Nidha's circle.",

    "footer.tagline": "Unstitched Chikankari, festive and bridal fabric sets, handcrafted in small batches across India.",
    "footer.shop": "Shop",
    "footer.company": "Company",
    "footer.getInTouch": "Get In Touch",
    "footer.hours": "Mon\u2013Sat, 10am\u20137pm IST",
    "footer.whatsapp": "Chat on WhatsApp",
    "footer.copyright": "\u00A9 2026 Nidha's. All rights reserved.",
    "footer.paymentNote": "Orders are confirmed personally over WhatsApp \u2014 no online payment required.",
    "footer.linkAbout": "About Us",
    "footer.linkContact": "Contact",
    "footer.linkPrivacy": "Privacy Policy",
    "footer.linkTerms": "Terms & Conditions",

    "drawer.title": "Your Favourites",
    "drawer.empty": "No favourites yet.<br>Tap the heart on any design to save it here, then send them all to us on WhatsApp in one go.",
    "drawer.remove": "Remove",
    "drawer.footNote": "{count} design(s) saved \u2014 each ships as its complete set of 4 colourways. We'll help with fabric and pricing over WhatsApp.",

    "card.viewDetails": "View details",
    "card.setOf4": "Set of 4 colourways",

    "media.sampleImage": "Sample image",
    "badge.new": "New",
    "badge.bestseller": "Bestseller",

    "toast.added": "Added \u201C{name}\u201D to favourites",
    "toast.removed": "Removed \u201C{name}\u201D from favourites",

    "cta.whatsappEnquire": "Enquire on WhatsApp",
    "wa.savedIntro": "I'd love more details on these saved designs (each sold as a complete set of 4 colourways):",
    "wa.closing": "Could you share availability and next steps?",
    "wa.productIntro": "I'm interested in the \u201C{name}\u201D design ({category}) \u2014 the complete set of 4 colourways, {price}. This is unstitched fabric for stitching; could you share fabric details and next steps?",

    "breadcrumb.home": "Home",
    "breadcrumb.collections": "Collections",

    "shop.pageTitle": "All Collections",
    "shop.pageIntro": "Unstitched Chikankari, festive and bridal fabric \u2014 filter by what the occasion needs, save what you love, and we'll take it from there on WhatsApp. Every design ships as a complete set of 4 colourways.",
    "shop.noResults": "No designs match those filters yet. Try clearing one or two.",
    "shop.countPieces": "{count} design(s)",
    "shop.sortNewest": "Sort: Newest",
    "shop.sortPriceAsc": "Price: Low to High",
    "shop.sortPriceDesc": "Price: High to Low",
    "shop.sortRating": "Top Rated",
    "filters.title": "Filters",
    "filters.category": "Category",
    "filters.fabric": "Fabric",
    "filters.clearAll": "Clear all filters",
    "filters.toggleBtn": "Filters",

    "pd.colourLabel": "This Design's Colours",
    "pd.colourNote": "All 4 colourways included \u2014 sold as a complete set only.",
    "pd.policyNote": "Sold as a complete set of all 4 colourways shown above \u2014 not available as a single piece or single colour.",
    "pd.addFavourite": "Add to Favourites",
    "pd.savedFavourite": "Saved to Favourites",
    "pd.trust1": "Hand-finished fabric",
    "pd.trust2": "Pan-India delivery",
    "pd.trust3": "Fabric queries on WhatsApp",
    "pd.descriptionBody": "A {fabric} design from our {category} edit, hand-checked before it leaves the atelier. Sold unstitched, as the complete set of all 4 colourways shown above \u2014 ready for your tailor.",
    "accordion.description": "Description",
    "accordion.fabricCare": "Fabric & Care",
    "accordion.shipping": "Shipping & Returns",
    "pd.fabricLabel": "Fabric:",
    "pd.careItem1": "Dry clean recommended for first wash",
    "pd.careItem2": "Iron on reverse at medium heat",
    "pd.careItem3": "Store folded, away from direct sunlight",
    "pd.careItem4": "Fabric is cut fresh for your order once confirmed",
    "pd.shippingBody": "We don't run an online checkout \u2014 once you confirm the design and set on WhatsApp, our team cuts your fabric to order and shares delivery timelines directly with you.",
    "pd.relatedHeading": "You May Also Like",
  },

  hi: {
    "announce.text": "व्हाट्सएप पर मुफ़्त स्टाइलिंग सलाह \u00B7 पूरे भारत में हस्तनिर्मित",
    "nav.home": "होम",
    "nav.collections": "कलेक्शन",
    "nav.about": "हमारे बारे में",
    "nav.contact": "संपर्क करें",
    "mobileNav.whatsapp": "व्हाट्सएप पर हमसे बात करें",

    "hero.eyebrow": "नई कलेक्शन \u2014 2026",
    "hero.headline": "जहाँ विरासत मिलती है<br>नए दौर से।",
    "hero.subtitle": "चिकनकारी, उत्सव और दुल्हन के लिए तैयार कपड़ा \u2014 हाथ से तैयार और 4 रंगों के पूरे सेट में उपलब्ध, आपके दर्जी के लिए बिल्कुल तैयार।",
    "hero.ctaPrimary": "कलेक्शन देखें",
    "hero.ctaWhatsapp": "व्हाट्सएप पर बात करें",

    "policy.title": "ऑर्डर से पहले कृपया ध्यान दें",
    "policy.body": "हम केवल बिना सिला हुआ कपड़ा बेचते हैं \u2014 तैयार कुर्ती नहीं। हर डिज़ाइन के सभी 4 रंग एक साथ पूरे सेट में ही बेचे जाते हैं; हम सेट अलग करके या एक रंग अलग से नहीं बेचते।",

    "collections.heading": "मुख्य कलेक्शन",
    "collections.subtitle": "तीन कलेक्शन, फिनिशिंग का एक ही स्तर \u2014 जो भी मौका हो, यहीं से शुरू करें।",
    "collections.viewAll": "सभी कलेक्शन देखें",
    "collections.bridalTitle": "ब्राइडल एडिट",
    "collections.bridalCta": "ब्राइडल देखें",
    "collections.chikankariTitle": "चिकनकारी स्टोरी",
    "collections.chikankariCta": "चिकनकारी देखें",
    "collections.festiveTitle": "उत्सव परिधान",
    "collections.festiveCta": "उत्सव कलेक्शन देखें",

    "arrivals.heading": "नई आमद",
    "arrivals.subtitle": "इस महीने की ताज़ा डिज़ाइनें।",
    "arrivals.cta": "सभी नई डिज़ाइनें देखें",

    "bestsellers.heading": "सबसे पसंदीदा",
    "bestsellers.subtitle": "वे डिज़ाइनें जिनके लिए ग्राहक बार-बार लौटते हैं।",
    "bestsellers.cta": "बेस्टसेलर देखें",

    "story.eyebrow": "हमारी कहानी",
    "story.quote": "\u201Cहम एक ऐसा ब्रांड नहीं बनाना चाहते थे जो तस्वीरों में अच्छा लगे पर पहनने में नहीं। इसलिए हमने दूसरी तरह का ब्रांड बनाया।\u201D",
    "story.body": "निधाज़ की शुरुआत एक छोटी कटिंग टेबल और एक ज़िद से हुई \u2014 कि भारतीय परिधान का कपड़ा भी उतनी ही सावधानी से चुना जाए जितना तैयार पोशाक। हर डिज़ाइन हाथ से जाँचा जाता है, छोटे बैचों में काटा जाता है, और उसी पूरे सेट में बेचा जाता है जिसके लिए वह बनाया गया था।",
    "story.founderTitle": "संस्थापक एवं डिज़ाइन प्रमुख",

    "why.heading": "निधाज़ को क्यों चुनें",
    "why.item1Title": "हस्तनिर्मित बारीकी",
    "why.item1Body": "हाथ से की गई कढ़ाई और फिनिशिंग \u2014 हर टुकड़े की अलग से जाँच।",
    "why.item2Title": "प्रीमियम कपड़ा",
    "why.item2Body": "शुद्ध कॉटन, चंदेरी, जॉर्जेट और सिल्क \u2014 जो पहनने में उतने ही अच्छे हों जितने देखने में।",
    "why.item3Title": "व्हाट्सएप पर व्यक्तिगत सहायता",
    "why.item3Body": "कपड़े से जुड़े सवाल, सिलाई का सुझाव और सेट की जानकारी \u2014 जवाब एक असली व्यक्ति देता है, कोई चैटबॉट नहीं।",
    "why.item4Title": "पूरे भारत में डिलीवरी",
    "why.item4Body": "व्हाट्सएप पर ऑर्डर पक्का होते ही, कपड़ा काटकर पैक किया जाता है और आपके घर भेजा जाता है।",

    "testimonials.heading": "ग्राहक क्या कहते हैं",
    "testi1.quote": "\u201Cचिकनकारी का कपड़ा तस्वीरों से भी बेहतर निकला, और 4 रंगों का पूरा सेट मिलने से मैं तय कर पाई कि पहले कौन सा सिलवाना है। व्हाट्सएप पर असली व्यक्ति से बात करके ऑर्डर करना बहुत आसान रहा।\u201D",
    "testi2.quote": "\u201Cअपनी बहन के लिए निधाज़ से ब्राइडल कपड़े का सेट लिया। टीम ने ऑर्डर से पहले फोन पर कपड़े और रंगों के बारे में पूरी जानकारी दी। पैसा वसूल।\u201D",
    "testi3.quote": "\u201Cमैंने अब तक तीन बार दोबारा ऑर्डर किया है। इस दाम में कपड़े की फिनिशिंग कहीं और नहीं मिली।\u201D",

    "instagram.heading": "@nidhas.official को फॉलो करें",
    "instagram.subtitle": "स्टाइलिंग टिप्स, कपड़े की झलक और नई डिज़ाइनें सबसे पहले।",
    "instagram.cta": "इंस्टाग्राम पर फॉलो करें",

    "newsletter.eyebrow": "जुड़े रहें",
    "newsletter.heading": "निधाज़ सर्कल से जुड़ें",
    "newsletter.subtitle": "नई डिज़ाइनें, स्टॉक अपडेट और स्टाइलिंग टिप्स \u2014 कोई स्पैम नहीं, बस अच्छी चीज़ें सबसे पहले।",
    "newsletter.button": "सब्सक्राइब करें",
    "newsletter.success": "आप सूची में जुड़ गए \u2014 निधाज़ सर्कल में स्वागत है।",

    "footer.tagline": "बिना सिला हुआ चिकनकारी, उत्सव और ब्राइडल कपड़ा, पूरे भारत में छोटे बैचों में हस्तनिर्मित।",
    "footer.shop": "शॉप",
    "footer.company": "कंपनी",
    "footer.getInTouch": "संपर्क करें",
    "footer.hours": "सोम\u2013शनि, सुबह 10 \u2013 शाम 7 बजे",
    "footer.whatsapp": "व्हाट्सएप पर बात करें",
    "footer.copyright": "\u00A9 2026 निधाज़। सर्वाधिकार सुरक्षित।",
    "footer.paymentNote": "ऑर्डर व्हाट्सएप पर व्यक्तिगत रूप से पक्का किया जाता है \u2014 ऑनलाइन भुगतान की ज़रूरत नहीं।",
    "footer.linkAbout": "हमारे बारे में",
    "footer.linkContact": "संपर्क करें",
    "footer.linkPrivacy": "गोपनीयता नीति",
    "footer.linkTerms": "नियम एवं शर्तें",

    "drawer.title": "आपकी पसंदीदा",
    "drawer.empty": "अभी कोई पसंदीदा नहीं।<br>किसी भी डिज़ाइन पर दिल के निशान को दबाकर उसे यहाँ सेव करें, फिर सबको एक साथ व्हाट्सएप पर भेजें।",
    "drawer.remove": "हटाएं",
    "drawer.footNote": "{count} डिज़ाइन सेव \u2014 हर एक अपने पूरे 4-रंग सेट में भेजी जाती है। कपड़े और कीमत में मदद व्हाट्सएप पर करेंगे।",

    "card.viewDetails": "विवरण देखें",
    "card.setOf4": "4 रंगों का सेट",

    "media.sampleImage": "नमूना छवि",
    "badge.new": "नया",
    "badge.bestseller": "बेस्टसेलर",

    "toast.added": "\u201C{name}\u201D को पसंदीदा में जोड़ा गया",
    "toast.removed": "\u201C{name}\u201D को पसंदीदा से हटाया गया",

    "cta.whatsappEnquire": "व्हाट्सएप पर पूछें",
    "wa.savedIntro": "मुझे इन सेव की गई डिज़ाइनों की जानकारी चाहिए (हर एक अपने पूरे 4-रंग सेट में):",
    "wa.closing": "कृपया उपलब्धता और आगे की प्रक्रिया बताएं।",
    "wa.productIntro": "मुझे \u201C{name}\u201D डिज़ाइन ({category}) में दिलचस्पी है \u2014 पूरा 4-रंग सेट, {price}। यह बिना सिला हुआ कपड़ा है; कृपया कपड़े की जानकारी और आगे की प्रक्रिया बताएं।",

    "breadcrumb.home": "होम",
    "breadcrumb.collections": "कलेक्शन",

    "shop.pageTitle": "सभी कलेक्शन",
    "shop.pageIntro": "बिना सिला चिकनकारी, उत्सव और ब्राइडल कपड़ा \u2014 मौके के हिसाब से फ़िल्टर करें, पसंदीदा डिज़ाइन सेव करें, बाकी बात व्हाट्सएप पर। हर डिज़ाइन 4 रंगों के पूरे सेट में भेजी जाती है।",
    "shop.noResults": "इन फ़िल्टर से कोई डिज़ाइन नहीं मिली। एक-दो फ़िल्टर हटाकर देखें।",
    "shop.countPieces": "{count} डिज़ाइन",
    "shop.sortNewest": "क्रम: नई पहले",
    "shop.sortPriceAsc": "कीमत: कम से ज़्यादा",
    "shop.sortPriceDesc": "कीमत: ज़्यादा से कम",
    "shop.sortRating": "सबसे बेहतर रेटिंग",
    "filters.title": "फ़िल्टर",
    "filters.category": "श्रेणी",
    "filters.fabric": "कपड़े का प्रकार",
    "filters.clearAll": "सभी फ़िल्टर हटाएं",
    "filters.toggleBtn": "फ़िल्टर",

    "pd.colourLabel": "इस डिज़ाइन के रंग",
    "pd.colourNote": "सभी 4 रंग शामिल \u2014 केवल पूरे सेट में उपलब्ध।",
    "pd.policyNote": "ऊपर दिखाए गए सभी 4 रंगों के पूरे सेट में बेचा जाता है \u2014 एक टुकड़ा या एक रंग अलग से उपलब्ध नहीं।",
    "pd.addFavourite": "पसंदीदा में जोड़ें",
    "pd.savedFavourite": "पसंदीदा में सेव किया गया",
    "pd.trust1": "हाथ से तैयार कपड़ा",
    "pd.trust2": "पूरे भारत में डिलीवरी",
    "pd.trust3": "व्हाट्सएप पर कपड़े से जुड़ी सहायता",
    "pd.descriptionBody": "हमारी {category} कलेक्शन से {fabric} डिज़ाइन, एटलियर से भेजने से पहले हाथ से जाँची गई। बिना सिली हुई, ऊपर दिखाए गए सभी 4 रंगों के पूरे सेट में \u2014 आपके दर्जी के लिए तैयार।",
    "accordion.description": "विवरण",
    "accordion.fabricCare": "कपड़ा एवं देखभाल",
    "accordion.shipping": "शिपिंग एवं वापसी",
    "pd.fabricLabel": "कपड़ा:",
    "pd.careItem1": "पहली धुलाई के लिए ड्राई क्लीन की सलाह",
    "pd.careItem2": "उल्टी तरफ से मध्यम आँच पर इस्त्री करें",
    "pd.careItem3": "मोड़कर रखें, सीधी धूप से दूर",
    "pd.careItem4": "ऑर्डर पक्का होने पर कपड़ा ताज़ा काटा जाता है",
    "pd.shippingBody": "हमारे पास ऑनलाइन चेकआउट नहीं है \u2014 व्हाट्सएप पर डिज़ाइन और सेट पक्का करते ही, हमारी टीम आपका कपड़ा ऑर्डर अनुसार काटती है और डिलीवरी का समय सीधे आपको बताती है।",
    "pd.relatedHeading": "आपको ये भी पसंद आ सकते हैं",
  },
};

const LANG_KEY = "nidhas_lang";
function getLang() {
  return localStorage.getItem(LANG_KEY) === "hi" ? "hi" : "en";
}
function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang === "hi" ? "hi" : "en";
  applyI18n();
  document.dispatchEvent(new CustomEvent("lang:change", { detail: { lang } }));
}

/** t(key, vars) — used directly by JS-generated content (product cards,
 *  toasts, the WhatsApp message builder). Falls back to English, then
 *  to the raw key, so a missing translation never renders blank. */
function t(key, vars) {
  const lang = getLang();
  let str = (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
  if (vars) {
    Object.keys(vars).forEach((k) => {
      str = str.replace(new RegExp("\\{" + k + "\\}", "g"), vars[k]);
    });
  }
  return str;
}

/** Applies the current language to every [data-i18n] / [data-i18n-html]
 *  element already in the DOM. Safe to call repeatedly — e.g. after a
 *  product grid re-renders — since it only touches tagged elements. */
function applyI18n() {
  const lang = getLang();
  document.documentElement.lang = lang === "hi" ? "hi" : "en";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    el.innerHTML = t(el.getAttribute("data-i18n-html"));
  });
  document.querySelectorAll("[data-lang-toggle] button").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === lang));
  });
}

function initLangToggle() {
  document.querySelectorAll("[data-lang-toggle]").forEach((group) => {
    group.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyI18n();
  initLangToggle();
});
