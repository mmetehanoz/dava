import { useState } from 'react';
import { X, FileText, ScrollText } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';

const vakifSenediArticles = [
  {
    title: "VAKIF",
    num: 1,
    text: "Vakfın adı Değer ve Ahlak Vakfı'dır. Kısa adı Dava'dır. İşbu resmi senette sadece vakıf denilecektir.",
  },
  {
    title: "VAKFIN MERKEZİ",
    num: 2,
    text: "Vakfın merkezi İstanbul'dur. Yazışma adresi: Maltepe M. Davutpaşa C. No:8/1 Zeytinburnu – İstanbul. Yönetim Kurulu kararıyla adres değişikliği yapılabilir. İlgili mevzuat çerçevesinde vakıf yönetim kurulu kararı ve yetkili makamlardan izin almak kaydıyla yurt içinde veya dışında şube ve temsilcilikler açılabilir.",
  },
  {
    title: "VAKFIN GAYESİ",
    num: 3,
    text: "Vakıf, varoluşunu aşağıdaki gayelere yönelik tanımlamaktadır:",
    items: [
      "Değer ve ahlak bilinci gelişmiş kişiler yetişmesine rehberlik etmek.",
      "Dini, milli ve insani değerlerin anlaşılması, korunması; bu konuda insanların bilinçlendirilmesi için eğitsel çalışmalar yapmak.",
      "Varlığı ve insanlığı ayakta tutan ahlaki değerlerin farkındalığını arttırmak için bilimsel, akademik, kültürel, sanatsal ve sportif çalışmalar yapmak.",
      "Değer ve ahlak merkezli her düzeyde (ilk – orta – yüksek) eğitim kurumları açmak ve işletmek.",
      "Farklı içerik, işlev ve düzeydeki Kur'an Kursu eğitim, öğretim ve hizmetlerine maddi, manevi, eğitsel destek olmak; bu kurumlarda ahlak ve değer bilincinin gelişmesine yönelik yapılacak faaliyetlere katkı sağlamak.",
    ],
  },
  {
    title: "VAKFIN FAALİYETLERİ",
    num: 4,
    text: "Vakıf, amaçlarını gerçekleştirmek üzere ilgili mevzuat dâhilinde;",
    items: [
      "İnanç, ahlak, bilgi ve değer alanına ilişkin nitelikli ilmi çalışmalar (konferans, panel, sempozyum, seminer vb.) ve araştırma – inceleme – geliştirme projeleri gerçekleştirir.",
      "Eğitsel, sanatsal, kültürel ve sportif faaliyetlerini gerçekleştirmek üzere eğitim, kütüphane, yayınevi, gençlik merkezi, spor kulübü, sanat, kültür ve meslek atölyeleri kurar ve yönetir. Bu amaçla taşınır, taşınmaz mal alır veya kiralar.",
      "Kuruluş amaçlarına yönelik bilimsel, eğitsel, kültürel, sosyal ve sportif gezi programları, kamp organizasyonları ve yarışmalar düzenler.",
      "Kur'an Kursu ve hafızlık eğitimini devam ettiren ve tamamlayan öğrencilerin ahlaki ve ilmi gelişimlerini desteklemek için eğitim, öğretim programları geliştirir, uygular; bu alanda hizmet veren kurum ve kuruluşlara rehberlik ve danışmanlık yapar.",
      "Farklı zeminleri ve imkânları kullanarak gayesine uygun yazılı, görsel ve işitsel yayınlar gerçekleştirir ve bu çalışmalara yönelik TV ve dijital kanallar kurar.",
      "Gayesine ve ilkelerine uygun olarak gerçekleştirilen çalışmalara, araştırma projelerine çok yönlü destek olur. Gayesi ve faaliyet alanları ile örtüşen ulusal veya uluslararası kuruluş ve federasyonlara katılabilir.",
      "Kişi ve kurumlara ihtiyaç durumuna göre maddi ve manevi katkı sağlar; bu bağlamda yardım faaliyetleri gerçekleştirir.",
      "Her öğrenim düzeyindeki öğrencileri burs, ödül, barınma ve konaklama hizmeti ile destekler. Bu amaca yönelik yurt, sosyal tesis ve misafirhane kurar ve işletir.",
      "Alanıyla ilgili yurtiçi ve yurtdışında özel destek programları ve çalışmaları yürütür, bu bağlamda ilgili kurum ve kuruluşlarla işbirliği yapar.",
      "Değerler ve ahlak eğitimi alanında rehberlik ve danışmanlık hizmetleri sunar.",
      "Faaliyetlerini gerçekleştirmeye yönelik gelir temini için iktisadi, ticari ve sınai işletmeler kurar ve işletir.",
      "Amaçlarını gerçekleştirebilmek için mevzuata uygun her türlü tasarrufta bulunur.",
    ],
  },
  {
    title: "VAKFIN GAYESİNİ GERÇEKLEŞTİRMEK İÇİN YAPABİLECEĞİ İŞ VE İŞLEMLER",
    num: 5,
    text: "Vakfın gayesine ulaşmak için yasal sınırlamalar dışında, miktar ve değeri kısıtlanmamış taşınır ve taşınmaz mallara bağış, vasiyet, satın alma ve kiralama suretiyle sahip olmaya ve kullanmaya, vakıflara ilişkin yasa hükümleri uyarınca sahip olduklarını satmaya, devir ve ferağ etmeye, gelirlerini almaya ve harcamaya, vakıf mal varlığına giren bir ya da birden çok taşınmaz mal veya gelirlerini bir ya da bir çok kez yatırımda kullanmaya, vakıf amaç ve hizmet konularına aykırı olmamak koşulu ile yapılacak bağış ve vasiyet, satın alma ve diğer yollarla mal ettiği taşınır ve taşınmaz malları ve paraları yönetim ve tasarrufa, menkul değerleri almaya ve vakfın amacı doğrultusunda bunları değerlendirip satmaya, vakfın amaçlarına benzer çalışmalarda bulunan yurt içi ve yasal izin alındığında yurt dışındaki vakıflar, gerçek ve tüzel kişiler ile işbirliği yapmaya, kamu kurum ve kuruluşları dışındakilerden yardım almaya, bu yardımı sağlamak için anlaşmalar yapmaya, taşınmaz malların irtifak, irtifa, sükna, üst, rehin, ipotek gibi mülkiyetten gayri ayni haklarını kabule, bu hakları kullanmaya, olan ya da olacak gelirleri ile kuracağı sözleşmeler için taşınır ve taşınmaz malların rehin ve ipoteği dâhil her türlü güvenceleri almaya, geçerli banka kefaletlerini kabule, vakfın amaç ve hizmet konularını gerçekleştirmek için gerektiğinde ödünç almaya, kefalet, rehin, ipotek ve diğer güvenceleri vermeye, vakfın amaç ve hizmet konularına uygun olarak yürütülen ve yürütülecek projelerden ve her türlü çalışmalardan gelir elde etmeye ve vakfa gelir sağlamak amacı ile olağan işletme ilkelerine göre çalışacak iktisadi işletmeler, ortaklıklar kurmaya, kurulu olanlara iştirake, bunları doğrudan işletmeye ya da denetimi altında bir işletmeciye işlettirmeye, vakfın amaç ve hizmet konularından birinin ya da tümünün gerçekleştirilmesi için yararlı ve gerekli görülen girişim, tasarruf, mal edinme, inşaat ve benzeri sözleşmeleri yapmaya Türk Medeni Kanununun 48. Maddesinde belirtildiği üzere izinli ve yetkilidir. Vakıf bu yetki ve gelirlerini Türk Medeni Kanunu ile yasaklanan maksatlarla kullanamaz.",
  },
  {
    title: "VAKFIN MAL VARLIĞI",
    num: 6,
    text: "Vakfın kuruluş malvarlığı, vakıf kurucusu Murat ÖZSOY tarafından Ziraat Katılım Bankası Zeytinburnu Şubesi TR48 0020 9000 0147 6778 0000 02 iban nolu hesaba yatırılan ve vakıf adına bloke edilen 500.000 (Beşyüz bin) Türk Lirası nakitten ibarettir. Kuruluş malvarlığı, vakfın kurulmasını müteakip, malvarlığına yapılacak ilavelerle arttırılabilir.",
  },
  {
    title: "VAKFIN ORGANLARI",
    num: 7,
    text: "Vakfın organları aşağıda gösterilmiştir.",
    items: ["Mütevelli Heyeti", "Yönetim Kurulu", "Denetim Kurulu"],
  },
  {
    title: "MÜTEVELLİ HEYETİ",
    num: 8,
    text: "Vakfın mütevelli heyeti, 23. Maddede adları yazılı gerçek kişilerden oluşan 8 (sekiz) kişidir. Mütevelli heyet üyeliğinin ölüm, istifa ya da başka bir nedenle boşalması halinde, boşalan üyeliklere, yönetim kurulunun veya mütevelli heyet üyelerinin teklifi ve mütevelli heyetin kararıyla seçim yapılır.",
  },
  {
    title: "MÜTEVELLİ HEYETİNİN GÖREV VE YETKİLERİ",
    num: 9,
    text: "Mütevelli Heyet vakfın en yüksek karar organıdır. Mütevelli heyetin yetkileri aşağıda gösterilmiştir.",
    items: [
      "Yönetim kurulunu seçmek,",
      "Denetim kurulunu seçmek,",
      "Vakıf yönetim kurulunca hazırlanan faaliyet raporu ile denetim kurulu raporlarını görüşüp incelemek, yönetim kurulunun ibrası konusunda karar vermek,",
      "Yönetim kurulunca hazırlanacak vakıf iç mevzuat tasarılarını aynen veya değiştirerek kabul etmek,",
      "Yönetim kurulunca hazırlanacak yıllık bütçe tasarılarını aynen veya değiştirerek kabul etmek,",
      "Kamu görevlileri dışındaki yönetim ve denetim kurulu üyelerine huzur hakkı verilip verilmeyeceğini, verilecekse miktarını belirlemek,",
      "Gerektiğinde vakıf senedinde ilave ve değişiklikler yapmak,",
      "Vakıf faaliyetleri konusunda genel politikaları belirlemek,",
      "Kendi üyeleri arasından 3 yıl süre ile bir başkan ve bir başkan vekili seçmek.",
    ],
  },
  {
    title: "MÜTEVELLİ HEYETİNİN TOPLANTI ZAMANI VE KARAR NİSABI",
    num: 10,
    text: "Mütevelli heyetinin ilk toplantısı, vakfın tescilini müteakip bir ay içinde yapılır. (a) Bilanço ve çalışma raporlarının onaylanması konularını görüşmek üzere şubat ayı içinde, (b) Bütçe ve çalışma raporlarının onaylanması ile seçimlerin yapılmasına ilişkin konuları görüşmek üzere kasım ayı içinde toplanır. Mütevelli heyeti ayrıca yönetim kurulunun gördüğü lüzum üzerine veya mütevelli heyet üyelerinin en az üçte birinin yazılı olarak yönetim kurulundan talepte bulunmaları halinde olağanüstü olarak toplanabilir. Toplantı tarihi, yeri, saati ve gündemi, toplantı gününden en az 7 (yedi) gün önce bildirilir. Mütevelli heyet üye tamsayısının yarısından bir fazlası ile toplanır. Mütevelli heyet karar yeter sayısı toplantıya katılanların yarıdan bir fazlasıdır. Vakıf senedinde yapılacak değişiklik için karar yeter sayısı üye tamsayısının üçte ikisidir.",
  },
  {
    title: "YÖNETİM KURULU",
    num: 11,
    text: "Vakıf yönetim kurulu, mütevelli heyetçe iki yıllığına seçilecek (5) üyeden oluşur. Yönetim kurulu üyelerinden çoğunluğunun mütevelli heyeti üyesi olması zorunludur. Yönetim kurulunun ilk toplantısında başkan, başkan yardımcısı, genel sekreter ve muhasip üye seçilerek görev taksimi yapılır. Yönetim kurulu ayda en az bir kere toplanır. Geçerli bir mazereti olmadan arka arkaya (6) toplantıya katılmayan yönetim kurulu üyesi, bu görevden çekilmiş sayılır. Toplantı yeter sayısı (3) olup, kararlar mevcudun çoğunluğu ile alınır.",
  },
  {
    title: "YÖNETİM KURULUNUN GÖREV, YETKİ VE SORUMLULUKLARI",
    num: 12,
    text: "Yönetim kurulu, vakfın idare ve icra organıdır. Bu sıfatla yönetim kurulu:",
    items: [
      "Vakıf gayesi doğrultusunda her türlü kararı alır ve uygular,",
      "Mütevelli heyetçe belirlenen politikalar ışığında, vakıf faaliyetlerinin düzenli ve verimli olarak yürütülmesini sağlar. Bu bağlamda gerekli iç mevzuat tasarılarını hazırlar ve mütevelli heyetin onayına sunar.",
      "Vakıf malvarlığının değerlendirilmesi ve yeni mali kaynaklara kavuşturulması hususunda gereken çalışmaları yapar.",
      "Vakıf tüzel kişiliği adına, bütün gerçek ve tüzel kişilerle hukuki, mali ve sair konularda gerekli girişimlerde bulunur ve işlemler yapar.",
      "Görev, yetki ve sorumlulukları açıkça önceden belirlenmek kaydıyla vakfa müdür atar, vakıf genel sekreterliği veya benzeri yardımcı birimler oluşturabilir, gerektiğinde görevlerine son verir.",
      "Vakıfta istihdam edilecek personeli belirler, atamasını yapar, ücretlerini tayin eder, gerektiğinde işlerine son verir.",
      "İlgili mevzuat hükümleri çerçevesinde, yurtiçinde ve yurtdışında şube ve temsilcilik açılmasına ve kapatılmasına karar verir.",
      "Vakfın muhasebe işlerini takip ve kontrol eder, hesap dönemi sonunda gelir-gider cetveli ve bilançoların düzenlenerek ilgili idareye gönderilmesini ve ilanını sağlar.",
      "Mütevelli heyetin kabul ettiği yıllık bütçeyi uygular.",
      "Mütevelli heyet toplantıları ile ilgili hazırlık işlemlerini yerine getirir.",
      "Mütevelli heyet toplantılarında, döneme ait vakıf faaliyet raporunu ibraya sunar.",
      "İlgili mevzuat ile vakıf senedi ve vakıf iç mevzuatının gerektirdiği diğer görevleri yapar.",
    ],
  },
  {
    title: "VAKFIN TEMSİLİ",
    num: 13,
    text: "Vakfı yönetim kurulu temsil eder. Yönetim kurulu bu temsil yetkisini yönetim kurulu başkanı ve başkan yardımcısına devredebilir. Yönetim kurulu, genel veya belli hal ve konularda, belirteceği esaslar dâhilinde kendi üyelerinden bir veya birkaçını, yetkili memur ve memurlarından herhangi bir veya birkaçını, temsilci veya temsilciliklerini, herhangi bir sözleşmeyi akdetmeye, mukavele, hukuki belge veya senedi vakıf nam ve hesabına tanzim ve devretmeye de yetkili kılabilir.",
  },
  {
    title: "DENETİM KURULU",
    num: 14,
    text: "Denetim kurulu mütevelli heyet adına vakfın faaliyet ve hesaplarını denetlemek için kurulmuş organdır. Denetim kurulu, mütevelli heyetçe kendi içinden veya çoğunluk oluşturmamak üzere dışarıdan iki yıl için seçilecek (3) kişiden oluşur. Denetim kurulu, incelemelerini tüm defter, kayıt ve belgeler üzerinde yapar. Hesap dönemi itibari ile düzenlenecek rapor, mütevelli heyet toplantısından en az 15 (on beş) gün önce mütevelli heyete gönderilmek üzere yönetim kuruluna verilir.",
  },
  {
    title: "YÜKSEK İSTİŞARE KURULU",
    num: 15,
    text: "Yüksek istişare kurulu, vakfın istişare organıdır. Mütevelli heyeti ile yönetim ve denetim kurulu üyeleri aynı zamanda yüksek istişare kurulunun doğal üyeleridir. Bunlara ilaveten vakfın faaliyet alanında üstün araştırma ve çalışmalarda bulunan kişiler ile vakfa maddi ve manevi katkıları bulunan kişiler arasından yönetim kurulunca seçilenler de yüksek istişare kuruluna dâhil edilir. Yönetim kurulunca toplantıya çağrılır ve tavsiye mahiyette kararlar alır.",
  },
  {
    title: "HUZUR HAKKI",
    num: 16,
    text: "Kamu görevlileri dışındaki yönetim ve denetim kurulu üyelerine huzur hakkı veya ücret verilip verilmeyeceğini, verilecekse miktarını mütevelli heyet belirler.",
  },
  {
    title: "VAKFIN GELİRLERİ",
    num: 17,
    text: "Vakfın gelirleri aşağıda gösterilmiştir.",
    items: [
      "Vakfın amacına uygun her türlü şartlı, şartsız bağışlar ile yardımlar,",
      "Vakfın faaliyetlerinden elde edilecek muhtelif gelirler,",
      "İktisadi işletmeler, iştirakler ve ortaklıklardan sağlanacak gelirler,",
      "Vakıf menkul ve gayrimenkulleri ile diğer varlık ve haklarının değerlendirilmesi ile sağlanacak gelirler.",
    ],
  },
  {
    title: "VAKIF GELİRLERİNİN TAHSİS VE SARF EDİLECEĞİ YERLER",
    num: 18,
    text: "Vakfın yıllık gelirlerinin en az üçte ikisi vakfın amaçlarına, kalanı yönetim ve idame giderleri ile ihtiyata ve vakıf malvarlığını artırıcı yatırımlara tahsis ve sarf olunur.",
  },
  {
    title: "ONURSAL ÜYELİK",
    num: 19,
    text: "Vakfa ve vakfın amaçlarına yaptığı ya da yapacağı hizmetler ve üstün katkılarından dolayı yönetim kurulunun teklifi ve mütevelli heyetin oybirliği ile aldığı karar neticesinde belirli kişilere onursal üyelik payesi verilebilir. Mütevelli heyetin oy çokluğu kararı ile onursal üyelik sona erdirilebilir. Bu üyelerin oy hakları yoktur.",
  },
  {
    title: "RESMİ SENET DEĞİŞİKLİĞİ",
    num: 20,
    text: "Vakıf senedinde yapılacak değişiklikler, yönetim kurulunun veya mütevelli heyet üyelerinin en az beşte birinin (1/5) yazılı teklifi ile, mütevelli heyet üye tam sayısının en az üçte ikisinin (2/3) onayı ile yapılır.",
  },
  {
    title: "VAKFIN SONA ERMESİ",
    num: 21,
    text: "Vakfın herhangi bir sebeple sona ermesi halinde vakfın tasfiyesinden arta kalan malvarlığı mütevelli heyet tarafından belirlenen aynı amaca hizmet eden bir vakfa devredilir. Vakfın feshi, ancak yönetim kurulunun veya mütevelli heyet üye tamsayısının en az yarısından bir fazlasının yazılı teklifi ve mütevelli heyet üye tamsayısının üçte ikisinin (2/3) onayı ile mümkündür.",
  },
  {
    title: "VAKFIN KURUCUSU",
    num: 22,
    text: "Vakfın kurucuları aşağıda adları yazılı kişilerdir.",
    items: ["Mehmet ERDOĞAN", "Murat ÖZSOY"],
  },
  {
    title: "MÜTEVELLİ HEYET ÜYELERİ",
    num: 23,
    text: "Mütevelli heyet üyeleri aşağıda adları yazılı kişilerdir.",
    items: ["Mehmet ERDOĞAN", "Murat ÖZSOY", "Fethullah KAYACI", "Eşref GÜRSÜL", "Mehmet KARATAŞ", "Enver KAYNAK", "Enes PUSMAZ", "Faruk KONUK"],
  },
  {
    title: "GEÇİCİ MADDELER",
    num: "Geçici",
    text: "Geçici Madde 1: Vakfın ilk geçici yönetim kurulu şu üyelerden oluşmuştur: Mehmet ERDOĞAN (Başkan), Murat ÖZSOY (Başkan Yardımcısı), Fethullah KAYACI (Üye), Ali BİRİNCİ (Üye), Mehmet KARATAŞ (Üye). Geçici yönetim kurulu, vakfın tescil tarihinden itibaren en geç bir ay içerisinde mütevelli heyeti toplantıya çağırmakla yükümlüdür.\n\nGeçici Madde 2: Vakfın tescili için gerekli tüm işlemleri yapmak üzere Murat ÖZSOY yetkili kılınmıştır.",
  },
];

const whoWeAreItems = [
  "Eğitim, öğretim, sağlık, sosyal, kültürel, tarihi ve dini alanlarda hizmet sunan tesisler kuruyor, aynı doğrultuda faaliyet gösteren kurum ve girişimleri destekliyoruz.",
  "Toplumun temel direği olan aileyi güçlendirmek için eğitim programları, seminerler ve etkinlikler düzenliyoruz.",
  "Fakir, muhtaç, kimsesiz ve ihtiyaç sahibi her yaştan bireye gıda, giysi ve temel ihtiyaç yardımları gerçekleştiriyoruz.",
  "Başarılı gençlerin eğitim yolculuğunda burslar veriyor, yurtiçi ve yurtdışı akademik gelişim fırsatları oluşturuyoruz.",
  "İhtiyaç sahibi gençlerin yuva kurmalarına destek oluyor, sağlam aile yapısının güçlenmesine katkıda bulunuyoruz.",
  "Türk-İslam Medeniyetinin zengin kültürünü yaşatmak adına bilimsel araştırmaları destekliyor, akademik çalışmalar yaptırıyoruz.",
  "İbadethaneler, eğitim kurumları ve külliyeler inşa ediyor; bu mekânların ihtiyaçlarını karşılıyoruz.",
  "İnsan ve çevre sağlığı konusunda ilgili kamu ve özel kuruluşlarla ortak projeler hayata geçiriyoruz.",
];

const visionItems = [
  "Toplumun her kesimini kuşatan, ahlaki değerlerle güçlendirilmiş bir gelecek inşa etmek.",
  "Gençlerin ilmi, kültürel ve sosyal yönden geliştiği; aile bağlarının güçlendiği, milli ve manevi bilincin canlı tutulduğu bir Türkiye oluşturmak.",
  "Sosyal yardım, eğitim, kültür ve çevre alanlarında örnek gösterilen, güvenilir ve sürdürülebilir bir vakıf modeli olmak.",
];

const missionItems = [
  "Gençlere eğitim desteği sunarak onları nitelikli, bilinçli ve topluma faydalı bireyler haline getirmek.",
  "Aile kurumunu güçlendiren çalışmalar yapmak; milli ve manevi değerleri toplumsal hayatta diri tutmak.",
  "İhtiyaç sahiplerine insana yakışır bir yaşam sağlayacak yardım faaliyetleri gerçekleştirmek.",
  "Türk-İslam kültür mirasını korumak, araştırmak ve literatüre kazandırmak.",
  "Toplumsal dayanışmayı ve gönüllülük kültürünü yaygınlaştıran projeler geliştirmek.",
];

const manifestoItems = [
  { label: "Biz;", text: "İyiliğin yayılmasını, adaletin kökleşmesini, ahlakın hayatın merkezine yerleşmesini ideal edinen bir topluluğuz." },
  { label: "Biz;", text: "Gençliğin bilgiyle güçlendiği, ailelerin değerle ayakta durduğu, toplumun ahlakla yükseldiği bir Türkiye hayal ediyoruz." },
  { label: "Biz;", text: "Kimsesizi yalnız bırakmayan, düşkünü gözeten, muhtaç olana el uzatan bir vicdanın örgütlü haliyiz." },
  { label: "Biz;", text: "Geçmişimizin hikmetini geleceğin vizyonuyla birleştiren bir iyilik yolculuğunun takipçileriyiz." },
  { label: "Biz;", text: "Bir tabelanın değil, bir davanın temsilcisiyiz: İnsana hizmet, değerle yaşamak ve ahlakla yükselmek." },
];

function VakifSenediModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center">
              <ScrollText className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm">Vakıf Senedi</div>
              <div className="text-xs text-gray-500">Değer ve Ahlak Vakfı Resmi Senedi</div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 md:p-6 space-y-5">
          <div className="text-center pb-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900 text-base tracking-wide">DEĞER VE AHLAK VAKFI</h2>
            <p className="text-gray-500 text-sm mt-1">RESMİ SENEDİ</p>
          </div>

          {vakifSenediArticles.map((art, i) => (
            <div key={i}>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex-shrink-0">
                  Madde {art.num}
                </span>
                <h3 className="font-bold text-gray-800 text-sm">{art.title}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{art.text}</p>
              {art.items && (
                <ol className="mt-2 space-y-1.5 list-decimal list-inside pl-1">
                  {art.items.map((item, j) => (
                    <li key={j} className="text-gray-600 text-sm leading-relaxed">{item}</li>
                  ))}
                </ol>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [senediOpen, setSenediOpen] = useState(false);

  return (
    <div className="pb-20 lg:pb-0">
      {senediOpen && <VakifSenediModal onClose={() => setSenediOpen(false)} />}
      <PageHeader
        title="Hakkımızda"
        subtitle="Değer ve Ahlak Vakfı olarak nesillere köklü değerler aktarmak için çalışıyoruz."
        emoji="🏛️"
        breadcrumb="Ana Sayfa / Hakkımızda"
      />

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 flex flex-col gap-8">

        {/* Biz Kimiz */}
        <section className="bg-white rounded-3xl shadow-md p-6 md:p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center text-xl">🤝</div>
            <h2 className="text-xl font-bold text-gray-900">Biz Kimiz?</h2>
          </div>
          <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
            <p>
              Değer ve Ahlak Vakfı olarak; Türkiye'nin ilmi, kültürel, sosyal ve ekonomik gelişimine katkı sunmak, çağın ihtiyaçlarını anlayan, sırf bilgiyle değil aynı zamanda hikmetle donanmış gençler yetiştirmek için yola çıktık.
            </p>
            <p>
              Bu toprakların mayasını oluşturan milli, manevi, ahlaki, dini ve örfi değerleri yaşatmayı; insanımızın vatanına, milletine ve tüm insanlığa faydalı bireyler olmasına öncülük etmeyi görev biliyoruz.
            </p>
            <ul className="space-y-2.5 mt-4">
              {whoWeAreItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <blockquote className="mt-6 border-l-4 border-emerald-500 pl-4 italic text-emerald-800 text-sm font-medium bg-emerald-50 py-3 pr-4 rounded-r-2xl">
            "Amacımız, yalnızca bir tabelanın arkasında durmak değil; değer üretmek, iyiliği yaymak ve hizmette öncü olmaktır."
          </blockquote>
        </section>

        {/* Tarihçe */}
        <section className="bg-white rounded-3xl shadow-md p-6 md:p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center text-xl">📜</div>
            <h2 className="text-xl font-bold text-gray-900">Tarihçemiz</h2>
          </div>
          <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
            <p>
              Değer ve Ahlak Vakfı, 2025 yılında; milli ve manevi değerleri yaşatmayı ilke edinmiş bir grup gönüllünün öncülüğüyle İstanbul'da kuruldu.
            </p>
            <p>
              Vakıf, toplumun birlik ve dayanışma ruhunu güçlendirmeyi hedefleyen, ahlaki ve insani değerleri merkeze alan bir anlayışın ürünüdür. "İnsana hizmet" prensibi üzerine inşa edilen bu yapı, yıllar içerisinde gönüllülük esasıyla güçlenerek her yaştan bireye dokunan bir iyilik hareketi haline gelecektir.
            </p>
            <p>
              "Değer" kavramını sadece söylem olarak değil, yaşamın merkezine koyan; ilim, eğitim, sosyal destek ve kültürel faaliyetleri bir bütün olarak ele alan vakfımız, topluma değer katan kalıcı projeler bırakmak için çalışmalarını sürdürmektedir.
            </p>
          </div>
        </section>

        {/* Vizyon & Misyon */}
        <div className="grid md:grid-cols-2 gap-5">
          <section className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center text-xl">🔭</div>
              <h2 className="text-lg font-bold text-gray-900">Vizyonumuz</h2>
            </div>
            <ul className="space-y-3">
              {visionItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center text-xl">🎯</div>
              <h2 className="text-lg font-bold text-gray-900">Misyonumuz</h2>
            </div>
            <ul className="space-y-3">
              {missionItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Vakıf Senedi */}
        <button
          onClick={() => setSenediOpen(true)}
          className="w-full bg-white rounded-3xl shadow-md border border-gray-100 p-5 flex items-center gap-4 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group text-left"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
            <ScrollText className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-gray-900 text-sm mb-0.5">Vakıf Senedi</div>
            <div className="text-gray-500 text-xs">Değer ve Ahlak Vakfı Resmi Senedini görüntülemek için tıklayın.</div>
          </div>
          <FileText className="w-5 h-5 text-gray-300 group-hover:text-emerald-500 transition-colors flex-shrink-0" />
        </button>

        {/* Yönetim Kurulu & Mütevelli Heyeti */}
        <div className="grid md:grid-cols-2 gap-5">
          <section className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center text-xl">🏛️</div>
              <h2 className="text-lg font-bold text-gray-900">Yönetim Kurulu</h2>
            </div>
            <ul className="space-y-3">
              {[
                { name: "Mehmet ERDOĞAN", role: "Başkan" },
                { name: "Murat ÖZSOY", role: "Başkan Yardımcısı" },
                { name: "Fethullah KAYACI", role: "Üye" },
                { name: "Ali BİRİNCİ", role: "Üye" },
                { name: "Mehmet KARATAŞ", role: "Üye" },
              ].map((p, i) => (
                <li key={i} className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-gray-800 text-sm">{p.name}</span>
                  <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-medium flex-shrink-0">{p.role}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white rounded-3xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center text-xl">👥</div>
              <h2 className="text-lg font-bold text-gray-900">Mütevelli Heyeti</h2>
            </div>
            <ul className="space-y-3">
              {[
                { name: "Mehmet ERDOĞAN", role: "Kurucu Başkan" },
                { name: "Murat ÖZSOY", role: "Kurucu Başkan" },
                { name: "Fethullah KAYACI", role: "" },
                { name: "Eşref GÜRSUL", role: "" },
                { name: "Enes PUSMAZ", role: "" },
                { name: "Faruk KONUK", role: "" },
                { name: "Mehmet KARATAŞ", role: "" },
                { name: "Enver KAYNAK", role: "" },
              ].map((p, i) => (
                <li key={i} className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-gray-800 text-sm">{p.name}</span>
                  {p.role && <span className="text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full font-medium flex-shrink-0">{p.role}</span>}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Çalışma Alanlarımız */}
        <section className="bg-white rounded-3xl shadow-md p-6 md:p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-teal-100 rounded-2xl flex items-center justify-center text-xl">🗂️</div>
            <h2 className="text-xl font-bold text-gray-900">Çalışma Alanlarımız</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                num: 1,
                title: "Eğitim ve Gençlik Gelişimi",
                color: "bg-emerald-50 border-emerald-100",
                badge: "bg-emerald-100 text-emerald-700",
                text: "Gençlerin akademik, kültürel ve ahlaki yönden gelişimini desteklemek amacıyla burs programları, eğitim projeleri, kişisel gelişim çalışmaları ve yurtiçi–yurtdışı akademik fırsatlar sunuyoruz. Öğrencilerin ilmi çalışmalar yapmasını teşvik ediyor; öğrenme süreçlerinde karşılaştıkları engelleri ortadan kaldırıyoruz.",
              },
              {
                num: 2,
                title: "Aile ve Toplumsal Değerler",
                color: "bg-blue-50 border-blue-100",
                badge: "bg-blue-100 text-blue-700",
                text: "Aile kurumunu güçlendirmek, aile içi iletişimi desteklemek ve toplumsal bağları kuvvetlendirmek için eğitimler, seminerler, danışmanlık programları ve değer odaklı etkinlikler düzenliyoruz. Toplumsal dayanışmanın artmasını ve milli-manevi bilincin canlı tutulmasını sağlıyoruz.",
              },
              {
                num: 3,
                title: "Sosyal Yardım ve Destek Hizmetleri",
                color: "bg-rose-50 border-rose-100",
                badge: "bg-rose-100 text-rose-700",
                text: "İhtiyaç sahibi, muhtaç, kimsesiz veya zor durumda olan vatandaşlara; gıda, giysi, barınma, sağlık ve temel ihtiyaç destekleri sağlıyoruz. İnsana yakışır bir yaşam standardına ulaşmaları için düzenli yardım organizasyonları yürütüyoruz.",
              },
              {
                num: 4,
                title: "Kültür, İlim ve Medeniyet Çalışmaları",
                color: "bg-amber-50 border-amber-100",
                badge: "bg-amber-100 text-amber-700",
                text: "Türk-İslam Medeniyetinin kültürel birikimini yaşatmak için araştırmalar, yayın projeleri, ilmi toplantılar ve kültürel faaliyetler gerçekleştiriyoruz. Gerektiğinde akademik çalışmalar yaptırarak bu mirası gelecek nesillere güvenle aktarıyoruz.",
              },
              {
                num: 5,
                title: "İbadethane, Eğitim Kurumları ve Külliye Hizmetleri",
                color: "bg-purple-50 border-purple-100",
                badge: "bg-purple-100 text-purple-700",
                text: "Topluma hizmet eden ibadethaneler, eğitim kurumları, kültür merkezleri ve külliyeler inşa ediyor; bu mekânların ihtiyaçlarını karşılıyor, bakım ve idame çalışmalarını sürdürüyoruz.",
              },
              {
                num: 6,
                title: "Sağlık, İnsan ve Çevre Bilinci",
                color: "bg-teal-50 border-teal-100",
                badge: "bg-teal-100 text-teal-700",
                text: "Hizmet sunduğumuz bölgelerde halkın sağlık, yaşam kalitesi ve çevre bilinci konularında bilinçlenmesi için programlar düzenliyor; ilgili kamu ve özel kurumlarla ortak projeler yürütüyoruz.",
              },
              {
                num: 7,
                title: "Gençlerin Evlilik ve Yuva Kurma Destekleri",
                color: "bg-pink-50 border-pink-100",
                badge: "bg-pink-100 text-pink-700",
                text: "İhtiyaç sahibi gençlerin yuva kurmalarına yardımcı oluyor; eşya, organizasyon ve rehberlik desteği sunarak topluma huzurlu ve sağlam aileler kazandırmayı amaçlıyoruz.",
              },
              {
                num: 8,
                title: "Proje Ortaklıkları ve Gönüllülük Faaliyetleri",
                color: "bg-indigo-50 border-indigo-100",
                badge: "bg-indigo-100 text-indigo-700",
                text: "Vakıf amaçlarına uygun çalışan tüm kurumlarla iş birliği yapıyor; sosyal, kültürel, eğitim ve yardım projelerine gönüllü katkı sağlıyoruz. Topluma hizmet etme bilincinin yaygınlaşması için gönüllülük kültürünü destekliyoruz.",
              },
              {
                num: 9,
                title: "Sosyal Etkinlikler ve Değer Odaklı Programlar",
                color: "bg-orange-50 border-orange-100",
                badge: "bg-orange-100 text-orange-700",
                text: "Toplumsal birlik, kardeşlik, dayanışma ve manevi gelişimi destekleyen konferanslar, seminerler, gençlik kampları, kültür gezileri ve bilinçlendirme programları düzenliyoruz.",
              },
            ].map((area, i) => (
              <div key={i} className={`rounded-2xl border p-4 ${area.color}`}>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${area.badge}`}>{area.num}</span>
                  <h4 className="font-bold text-gray-900 text-sm">{area.title}</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{area.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Manifesto */}
        <section className="bg-gradient-to-br from-emerald-900 to-teal-800 rounded-3xl p-6 md:p-10 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center text-xl">✊</div>
            <h2 className="text-xl font-bold">Manifestomuz</h2>
          </div>
          <div className="space-y-5">
            {manifestoItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-amber-400 font-bold text-sm flex-shrink-0 pt-0.5">{item.label}</span>
                <p className="text-emerald-100 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Banka Hesap Bilgileri */}
        <section className="bg-white rounded-3xl shadow-md p-6 md:p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center text-xl">🏦</div>
            <h2 className="text-xl font-bold text-gray-900">Banka Hesap Bilgileri</h2>
          </div>
          <p className="text-gray-500 text-sm mb-5">Bağışlarınızı aşağıdaki hesaplarımıza iletebilirsiniz.</p>
          <div className="flex flex-col gap-3">
            {[
              { currency: "TL", flag: "🇹🇷", iban: "TR20 0020 9000 0227 2150 0000 01", color: "border-emerald-200 bg-emerald-50", badge: "bg-emerald-600 text-white" },
              { currency: "USD", flag: "🇺🇸", iban: "TR09 0020 9000 0227 2150 0000 05", color: "border-blue-200 bg-blue-50", badge: "bg-blue-600 text-white" },
              { currency: "EURO", flag: "🇪🇺", iban: "TR79 0020 9000 0227 2150 0000 06", color: "border-amber-200 bg-amber-50", badge: "bg-amber-600 text-white" },
            ].map((acc, i) => (
              <div key={i} className={`rounded-2xl border p-4 ${acc.color} flex items-center gap-4`}>
                <div className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold ${acc.badge}`}>{acc.flag} {acc.currency}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-500 mb-0.5">Ziraat Katılım</div>
                  <div className="font-mono font-semibold text-gray-800 text-sm tracking-wide">{acc.iban}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
