/**
 * /panduan, the informational layer.
 *
 * These pages exist to answer general perfume questions the product pages
 * cannot. That is what AI Overviews and LLM answer engines actually cite,
 * see .plans/P-010_ai_overviews.md.
 *
 * Indonesian only. The Indonesian market is the target and a thin machine
 * translation would be a worse citation candidate than no page at all.
 *
 * Shape rules, do not break these when editing copy:
 *   - `question` is the h1, phrased the way people type it into Google.
 *   - `answer` is the passage an answer engine lifts. It must stand alone with
 *     no pronoun pointing back at the question, and sit in 40-60 words.
 *   - Each section heading is itself a sub-question.
 *   - `updated` drives both the visible date and sitemap lastmod, so bump it
 *     when you meaningfully change the copy, not on every deploy.
 */

export type Guide = {
  slug: string;
  question: string;
  metaTitle: string;
  metaDescription: string;
  answer: string;
  sections: { heading: string; body: string[] }[];
  faq: { q: string; a: string }[];
  relatedSlugs: string[];
  published: string;
  updated: string;
};

export const guides: Guide[] = [
  {
    slug: "apa-itu-eau-de-parfum",
    question: "Apa itu Eau de Parfum (EDP)?",
    metaTitle: "Apa Itu Eau de Parfum (EDP)? Beda EDP, EDT, dan EDC",
    metaDescription:
      "Eau de Parfum adalah parfum dengan konsentrasi minyak wangi 15-20 persen. Penjelasan beda EDP, EDT, dan EDC, serta pengaruhnya ke ketahanan aroma.",
    answer:
      "Eau de Parfum (EDP) adalah parfum dengan konsentrasi minyak wangi sekitar 15-20 persen dari total cairan. Konsentrasi ini lebih tinggi daripada Eau de Toilette yang sekitar 5-15 persen, sehingga aroma EDP biasanya bertahan lebih lama di kulit dan tidak perlu disemprot sesering EDT.",
    sections: [
      {
        heading: "Apa bedanya EDP, EDT, dan EDC?",
        body: [
          "Perbedaan utama antara EDP, EDT, dan EDC ada pada konsentrasi minyak wangi di dalamnya. Semakin tinggi konsentrasinya, semakin pekat aromanya dan semakin lama bertahan di kulit.",
          "Eau de Cologne (EDC) punya konsentrasi paling rendah, sekitar 2-5 persen, dan biasanya hanya bertahan 2 jam. Eau de Toilette (EDT) ada di 5-15 persen dengan ketahanan sekitar 3-5 jam. Eau de Parfum (EDP) ada di 15-20 persen dan umumnya bertahan 6-8 jam. Di atasnya ada Parfum atau Extrait dengan konsentrasi 20-30 persen.",
          "Perlu dicatat bahwa angka ini adalah rentang industri, bukan standar yang diatur secara resmi. Dua parfum yang sama-sama berlabel EDP bisa terasa berbeda kekuatannya tergantung bahan yang dipakai.",
        ],
      },
      {
        heading: "Apakah EDP selalu lebih bagus daripada EDT?",
        body: [
          "EDP tidak otomatis lebih bagus daripada EDT. Konsentrasi yang lebih tinggi berarti aroma lebih pekat dan tahan lama, tapi itu belum tentu yang kamu butuhkan.",
          "Untuk cuaca panas seperti di Indonesia, aroma yang terlalu pekat justru bisa terasa mengganggu di ruangan tertutup. EDT sering lebih nyaman untuk pemakaian siang hari, sementara EDP lebih cocok untuk sore, malam, dan acara yang butuh kesan lebih kuat.",
        ],
      },
      {
        heading: "Berapa lama Eau de Parfum bertahan?",
        body: [
          "Eau de Parfum umumnya bertahan 6-8 jam di kulit. Angka ini sangat dipengaruhi jenis kulit: kulit berminyak menahan aroma lebih lama karena minyak alami kulit mengikat molekul wangi, sedangkan kulit kering melepasnya lebih cepat.",
          "Di pakaian, aroma bisa bertahan jauh lebih lama, hingga 12 jam atau lebih, karena serat kain melepas wangi lebih lambat daripada kulit yang terus bergerak dan berkeringat.",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah semua parfum HASERA berjenis Eau de Parfum?",
        a: "Ya, seluruh koleksi HASERA adalah Eau de Parfum (EDP) dengan isi 50 ml. Pilihan ini diambil supaya aroma bertahan 6-8 jam di kulit tanpa perlu disemprot ulang di tengah hari.",
      },
      {
        q: "Apakah EDP aman untuk kulit sensitif?",
        a: "Eau de Parfum aman untuk sebagian besar orang, tapi konsentrasi alkohol dan minyak wanginya lebih tinggi daripada EDT. Untuk kulit sensitif, semprot ke pakaian atau uji dulu di area kecil seperti pergelangan tangan bagian dalam.",
      },
      {
        q: "Kenapa harga EDP biasanya lebih mahal?",
        a: "Harga Eau de Parfum biasanya lebih tinggi karena konsentrasi minyak wanginya lebih besar per botol dibanding EDT atau EDC. Bahan wangi adalah komponen termahal dalam sebuah parfum, jadi konsentrasi berbanding lurus dengan biaya produksi.",
      },
    ],
    relatedSlugs: ["kenapa-parfum-cepat-hilang", "piramida-aroma-parfum"],
    published: "2026-08-11",
    updated: "2026-08-11",
  },
  {
    slug: "cara-pakai-parfum-biar-tahan-lama",
    question: "Bagaimana cara pakai parfum biar tahan lama?",
    metaTitle: "Cara Pakai Parfum Biar Tahan Lama",
    metaDescription:
      "Cara pakai parfum biar tahan lama: semprot setelah mandi, di titik nadi, ke kulit yang lembap, dan jangan digosok. Panduan lengkap dari HASERA.",
    answer:
      "Cara pakai parfum biar tahan lama adalah menyemprotkannya ke kulit yang bersih dan lembap tepat setelah mandi, tepat di titik nadi seperti pergelangan tangan, leher, dan belakang telinga, dari jarak sekitar 15 sentimeter. Jangan digosok setelah disemprot, karena gesekan memecah molekul wangi dan justru mempercepat aromanya hilang.",
    sections: [
      {
        heading: "Kenapa parfum harus disemprot ke kulit lembap?",
        body: [
          "Parfum bertahan lebih lama di kulit lembap karena minyak dan air pada kulit mengikat molekul wangi, sehingga penguapannya melambat. Di kulit kering, molekul wangi menguap jauh lebih cepat dan aroma hilang dalam hitungan jam.",
          "Waktu terbaik menyemprot parfum adalah beberapa menit setelah mandi, saat pori-pori masih terbuka dan kulit belum benar-benar kering. Kalau kulitmu cenderung kering, oleskan pelembap tanpa pewangi lebih dulu, lalu semprot parfum di atasnya.",
        ],
      },
      {
        heading: "Di mana titik terbaik menyemprot parfum?",
        body: [
          "Titik terbaik menyemprot parfum adalah titik nadi, yaitu area di mana pembuluh darah dekat dengan permukaan kulit sehingga suhunya sedikit lebih hangat. Panas tubuh inilah yang perlahan menguapkan aroma sepanjang hari.",
          "Titik nadi utama ada di pergelangan tangan, sisi leher, belakang telinga, lekuk siku bagian dalam, dan belakang lutut. Untuk pemakaian sehari-hari, dua sampai tiga semprotan di kombinasi titik ini sudah lebih dari cukup.",
        ],
      },
      {
        heading: "Kenapa parfum tidak boleh digosok?",
        body: [
          "Menggosok pergelangan tangan setelah menyemprot parfum adalah kebiasaan yang justru merusak aromanya. Gesekan menghasilkan panas dan memecah struktur molekul wangi, terutama aroma pembuka yang paling ringan dan mudah menguap.",
          "Akibatnya, piramida aroma yang seharusnya terbuka bertahap jadi berantakan, dan parfum terasa hilang lebih cepat. Biarkan saja parfum mengering sendiri di kulit.",
        ],
      },
      {
        heading: "Apakah menyemprot ke baju membuat parfum lebih awet?",
        body: [
          "Menyemprot parfum ke baju memang membuat aromanya bertahan lebih lama, karena serat kain melepas wangi jauh lebih lambat daripada kulit. Aroma di pakaian bisa bertahan hingga 12 jam atau bahkan sampai baju dicuci.",
          "Tapi ada dua hal yang perlu diperhatikan. Pertama, aroma di kain tidak berkembang seperti di kulit, karena tidak ada panas tubuh yang membuka lapisan aromanya secara bertahap. Kedua, parfum berbahan pekat bisa meninggalkan noda pada kain terang atau bahan halus seperti sutra. Cara paling aman adalah menggabungkan keduanya: mayoritas di kulit, satu semprotan ringan ke pakaian.",
        ],
      },
      {
        heading: "Bagaimana cara menyimpan parfum agar tidak cepat rusak?",
        body: [
          "Parfum harus disimpan di tempat sejuk, gelap, dan kering. Panas, cahaya matahari langsung, dan perubahan suhu yang ekstrem akan memecah senyawa wangi dan mengubah aromanya, biasanya membuatnya terasa lebih masam.",
          "Kamar mandi adalah tempat penyimpanan terburuk, meskipun paling umum dipakai, karena suhu dan kelembapannya naik turun setiap hari. Lemari pakaian atau laci di kamar jauh lebih baik. Simpan juga dalam kotak aslinya kalau masih ada.",
        ],
      },
    ],
    faq: [
      {
        q: "Berapa kali semprot parfum yang ideal?",
        a: "Dua sampai tiga semprotan sudah ideal untuk pemakaian sehari-hari dengan parfum jenis Eau de Parfum. Untuk ruangan ber-AC atau kantor yang padat, satu semprotan sudah cukup agar tidak mengganggu orang di sekitarmu.",
      },
      {
        q: "Kenapa saya tidak bisa mencium parfum saya sendiri setelah beberapa jam?",
        a: "Hidung manusia mengalami kelelahan penciuman, atau nose blindness, terhadap aroma yang terus-menerus dihirup. Parfum kamu kemungkinan besar masih tercium jelas oleh orang lain meskipun kamu sendiri sudah tidak menyadarinya.",
      },
      {
        q: "Apakah parfum HASERA perlu disemprot ulang di siang hari?",
        a: "Parfum HASERA bertahan 6-8 jam di kulit, jadi umumnya tidak perlu disemprot ulang untuk hari kerja normal. Kalau kamu beraktivitas di luar ruangan atau banyak berkeringat, satu semprotan tambahan di sore hari sudah cukup.",
      },
    ],
    relatedSlugs: ["kenapa-parfum-cepat-hilang", "parfum-untuk-cuaca-panas"],
    published: "2026-08-11",
    updated: "2026-08-11",
  },
  {
    slug: "kenapa-parfum-cepat-hilang",
    question: "Kenapa parfum cepat hilang di kulit?",
    metaTitle: "Kenapa Parfum Cepat Hilang di Kulit?",
    metaDescription:
      "Parfum cepat hilang biasanya karena kulit kering, cuaca panas, cara pakai yang salah, atau konsentrasi parfum yang rendah. Penjelasan dan solusinya.",
    answer:
      "Parfum cepat hilang di kulit paling sering disebabkan kulit yang kering, karena molekul wangi tidak punya minyak alami untuk menempel sehingga menguap lebih cepat. Penyebab lain adalah cuaca panas yang mempercepat penguapan, konsentrasi parfum yang rendah seperti EDT atau EDC, dan kebiasaan menggosok kulit setelah menyemprot.",
    sections: [
      {
        heading: "Apakah jenis kulit mempengaruhi ketahanan parfum?",
        body: [
          "Jenis kulit adalah faktor terbesar yang menentukan ketahanan parfum. Kulit berminyak menahan aroma paling lama karena minyak alami kulit mengikat molekul wangi dan memperlambat penguapannya.",
          "Kulit kering melakukan kebalikannya. Tanpa lapisan minyak, molekul wangi langsung terpapar udara dan menguap lebih cepat. Perbedaannya bisa mencapai dua sampai tiga jam untuk parfum yang sama persis. Kalau kulitmu kering, oleskan pelembap tanpa pewangi sebelum menyemprot parfum.",
        ],
      },
      {
        heading: "Kenapa parfum lebih cepat hilang di cuaca panas?",
        body: [
          "Cuaca panas mempercepat hilangnya parfum karena suhu tinggi mempercepat penguapan molekul wangi. Di iklim tropis seperti Indonesia, aroma terbuka lebih cepat, terasa lebih kuat di awal, lalu menghilang lebih cepat pula.",
          "Keringat memperburuk efek ini dengan mengencerkan parfum di permukaan kulit dan mengubah cara aromanya tercium. Karena itu, parfum yang terasa tahan lama di ruangan ber-AC bisa terasa jauh lebih singkat saat dipakai beraktivitas di luar.",
        ],
      },
      {
        heading: "Apakah aroma tertentu memang lebih cepat hilang?",
        body: [
          "Aroma tertentu memang secara alami lebih cepat hilang, dan ini ditentukan oleh berat molekul bahannya. Aroma citrus, buah, dan herbal ringan tersusun dari molekul kecil yang menguap paling cepat, sering hanya bertahan 15 sampai 30 menit.",
          "Sebaliknya, aroma dasar seperti vanilla, amber, musk, dan kayu tersusun dari molekul berat yang menguap paling lambat. Inilah sebabnya parfum dengan dasar amber dan kayu terasa jauh lebih tahan lama daripada parfum yang dominan segar dan citrus.",
        ],
      },
      {
        heading: "Apakah parfum yang cepat hilang berarti palsu?",
        body: [
          "Parfum yang cepat hilang belum tentu palsu. Ketahanan aroma dipengaruhi jenis kulit, cuaca, cara pakai, dan konsentrasi parfum itu sendiri, sehingga parfum asli pun bisa terasa singkat di kondisi tertentu.",
          "Tanda yang lebih bisa diandalkan untuk mengecek keaslian adalah kondisi segel dan kemasan, konsistensi aroma dari botol ke botol, dan kejelasan penjualnya. Membeli langsung dari brand atau toko resminya adalah cara paling sederhana untuk memastikan.",
        ],
      },
    ],
    faq: [
      {
        q: "Berapa lama parfum HASERA bertahan di kulit?",
        a: "Parfum HASERA bertahan 6-8 jam di kulit, tergantung jenis kulit dan aktivitas kamu, dan hingga 12 jam di pakaian. Kami menyebut angka ini apa adanya, bukan angka maksimal yang hanya tercapai di kondisi ideal.",
      },
      {
        q: "Apakah menyemprot parfum lebih banyak membuatnya lebih tahan lama?",
        a: "Menyemprot parfum lebih banyak membuat aromanya lebih kuat di awal, tapi tidak menambah ketahanan secara proporsional. Cara pakai yang benar di titik nadi dan kulit yang lembap memberi hasil lebih baik daripada sekadar menambah jumlah semprotan.",
      },
      {
        q: "Apa parfum yang paling tahan lama di koleksi HASERA?",
        a: "Croesus Gold adalah parfum HASERA dengan sisa aroma paling lama, karena dasar amber dan cedarwood-nya tersusun dari molekul berat yang menguap paling lambat. Cleopatra Noir menyusul dengan dasar vanilla dan musk.",
      },
    ],
    relatedSlugs: ["cara-pakai-parfum-biar-tahan-lama", "piramida-aroma-parfum"],
    published: "2026-08-11",
    updated: "2026-08-11",
  },
  {
    slug: "piramida-aroma-parfum",
    question: "Apa itu piramida aroma parfum?",
    metaTitle: "Piramida Aroma Parfum: Top, Middle, Base Notes",
    metaDescription:
      "Piramida aroma parfum terdiri dari top notes, middle notes, dan base notes yang terbuka bertahap. Penjelasan lengkap tiap lapisan dan durasinya.",
    answer:
      "Piramida aroma parfum adalah cara menggambarkan tiga lapisan wangi yang terbuka secara bertahap setelah parfum disemprotkan. Lapisan itu terdiri dari aroma pembuka atau top notes yang tercium dalam menit pertama, aroma tengah atau middle notes yang muncul setelahnya, dan aroma dasar atau base notes yang bertahan paling lama.",
    sections: [
      {
        heading: "Apa itu aroma pembuka (top notes)?",
        body: [
          "Aroma pembuka atau top notes adalah wangi pertama yang tercium begitu parfum disemprotkan, dan biasanya hanya bertahan 15 sampai 30 menit. Lapisan ini tersusun dari molekul paling ringan sehingga menguap paling cepat.",
          "Bahan yang umum dipakai sebagai aroma pembuka adalah citrus seperti bergamot dan lemon, buah seperti lychee dan blackcurrant, serta herbal ringan. Karena cepat hilang, aroma pembuka tidak seharusnya jadi dasar keputusan saat kamu mencoba parfum di toko.",
        ],
      },
      {
        heading: "Apa itu aroma tengah (middle notes)?",
        body: [
          "Aroma tengah atau middle notes adalah karakter utama sebuah parfum, muncul setelah aroma pembuka memudar dan bertahan sekitar dua sampai empat jam. Lapisan ini sering disebut juga heart notes karena menjadi jantung dari keseluruhan racikan.",
          "Bahan yang umum ada di lapisan ini adalah bunga seperti mawar, peony, lavender, dan orange blossom, serta rempah hangat. Inilah bagian yang paling menentukan apakah sebuah parfum terasa floral, manis, atau segar.",
        ],
      },
      {
        heading: "Apa itu aroma dasar (base notes)?",
        body: [
          "Aroma dasar atau base notes adalah lapisan yang bertahan paling lama, muncul penuh setelah beberapa jam dan bisa menempel sampai 6-8 jam di kulit. Molekulnya paling berat sehingga menguap paling lambat.",
          "Bahan yang umum dipakai adalah vanilla, amber, musk, cedarwood, dan cashmere wood. Aroma dasar juga berfungsi sebagai fiksatif, yaitu bahan yang memperlambat penguapan lapisan di atasnya, sehingga keseluruhan parfum jadi lebih tahan lama.",
        ],
      },
      {
        heading: "Kenapa parfum tercium berbeda setelah beberapa jam?",
        body: [
          "Parfum tercium berbeda setelah beberapa jam karena lapisan piramida aromanya memang terbuka bertahap, bukan sekaligus. Yang kamu cium di jam ketiga adalah campuran aroma tengah dan dasar, bukan lagi aroma pembuka.",
          "Proses ini disebut dry-down, dan inilah alasan kenapa mencoba parfum sebaiknya tidak diputuskan dalam lima menit pertama. Semprot di kulit, tunggu minimal satu jam, lalu nilai. Aroma dasar adalah yang akan kamu bawa sepanjang hari.",
        ],
      },
    ],
    faq: [
      {
        q: "Apakah semua parfum punya tiga lapisan aroma?",
        a: "Sebagian besar parfum modern dirancang dengan tiga lapisan, tapi tidak semuanya. Ada parfum linear yang sengaja dibuat tercium sama dari awal sampai akhir, biasanya untuk aroma sederhana seperti musk atau vanilla tunggal.",
      },
      {
        q: "Apa piramida aroma parfum HASERA?",
        a: "Setiap parfum HASERA mencantumkan piramida aromanya secara lengkap di halaman produk masing-masing. Cleopatra Noir berdasar vanilla dan musk, Georgia Flora berdasar white musk dan cashmere wood, dan Croesus Gold berdasar amber dan cedarwood.",
      },
      {
        q: "Bagaimana cara mencoba parfum dengan benar di toko?",
        a: "Semprotkan parfum ke kulit, bukan ke kertas tester, lalu tunggu minimal satu jam sebelum memutuskan. Kertas tester hanya menunjukkan aroma pembuka dan tidak bereaksi dengan panas tubuh yang membuka lapisan tengah dan dasar.",
      },
    ],
    relatedSlugs: ["apa-itu-eau-de-parfum", "kenapa-parfum-cepat-hilang"],
    published: "2026-08-11",
    updated: "2026-08-11",
  },
  {
    slug: "parfum-untuk-cuaca-panas",
    question: "Parfum apa yang cocok untuk cuaca panas Indonesia?",
    metaTitle: "Parfum untuk Cuaca Panas Indonesia",
    metaDescription:
      "Panduan memilih parfum untuk cuaca panas dan lembap Indonesia: keluarga aroma yang cocok, takaran semprot, dan kesalahan yang sering terjadi.",
    answer:
      "Parfum yang cocok untuk cuaca panas Indonesia adalah aroma segar dan ringan seperti citrus, floral, dan aquatic, karena panas mempercepat penguapan sehingga aroma pekat terasa berlebihan. Kurangi juga takaran menjadi satu sampai dua semprotan, sebab suhu tinggi membuat wangi menyebar lebih jauh daripada di ruangan sejuk.",
    sections: [
      {
        heading: "Kenapa parfum terasa lebih menyengat saat cuaca panas?",
        body: [
          "Parfum terasa lebih menyengat saat cuaca panas karena suhu tinggi mempercepat penguapan molekul wangi dari permukaan kulit. Aroma yang sama, dengan jumlah semprotan yang sama, akan menyebar lebih jauh dan tercium lebih kuat di udara panas.",
          "Kelembapan tinggi seperti di Indonesia menambah efek ini, karena uap air di udara membawa molekul wangi lebih efektif. Inilah kenapa parfum yang terasa pas saat dicoba di mal ber-AC bisa terasa berlebihan begitu kamu keluar ke jalan.",
        ],
      },
      {
        heading: "Keluarga aroma apa yang paling cocok untuk iklim tropis?",
        body: [
          "Keluarga aroma yang paling cocok untuk iklim tropis adalah citrus, floral ringan, aquatic, dan green. Aroma-aroma ini terasa menyegarkan justru saat panas, dan karakternya tidak menumpuk meskipun bercampur keringat.",
          "Aroma yang lebih berat seperti gourmand, amber, dan oud tidak salah untuk iklim tropis, tapi butuh takaran yang jauh lebih hati-hati. Aroma jenis ini bekerja paling baik untuk acara malam atau ruangan ber-AC, bukan untuk aktivitas siang di luar ruangan.",
        ],
      },
      {
        heading: "Berapa semprotan yang pas untuk cuaca panas?",
        body: [
          "Satu sampai dua semprotan sudah cukup untuk cuaca panas, dibandingkan dua sampai tiga semprotan di ruangan sejuk. Aturan sederhananya adalah mengurangi satu semprotan dari kebiasaan normalmu saat beraktivitas di luar ruangan.",
          "Fokuskan semprotan di titik nadi yang tertutup pakaian atau tidak terkena matahari langsung, seperti sisi leher bagian bawah atau lekuk siku. Area yang terpapar sinar matahari akan membakar aroma jauh lebih cepat.",
        ],
      },
    ],
    faq: [
      {
        q: "Parfum HASERA mana yang paling cocok untuk cuaca panas?",
        a: "Georgia Flora adalah pilihan paling nyaman untuk cuaca panas di koleksi HASERA, karena karakter floral dan buahnya terasa ringan dan segar. Cleopatra Noir dan Croesus Gold tetap bisa dipakai, tapi cukup satu sampai dua semprotan saja.",
      },
      {
        q: "Apakah parfum bisa rusak kalau disimpan di ruangan panas?",
        a: "Parfum bisa rusak kalau disimpan di ruangan panas atau terkena sinar matahari langsung, karena panas memecah senyawa wangi dan mengubah aromanya. Simpan di lemari yang sejuk dan gelap, bukan di kamar mandi atau di dalam mobil.",
      },
      {
        q: "Apakah lebih baik pakai parfum sebelum atau sesudah keluar rumah?",
        a: "Semprotkan parfum sekitar 10 sampai 15 menit sebelum keluar rumah, saat kamu masih berada di ruangan sejuk. Ini memberi waktu aroma pembuka menguap dan menetap dengan stabil sebelum kulitmu terpapar panas dan keringat.",
      },
    ],
    relatedSlugs: ["cara-pakai-parfum-biar-tahan-lama", "kenapa-parfum-cepat-hilang"],
    published: "2026-08-11",
    updated: "2026-08-11",
  },
  {
    slug: "cara-memilih-parfum-sesuai-acara",
    question: "Bagaimana cara memilih parfum sesuai acara?",
    metaTitle: "Cara Memilih Parfum Sesuai Acara",
    metaDescription:
      "Panduan memilih parfum sesuai acara: aroma untuk kerja sehari-hari, kondangan, kencan, dan olahraga, lengkap dengan takaran semprot yang pas.",
    answer:
      "Cara memilih parfum sesuai acara adalah menyesuaikan kekuatan aroma dengan jarak sosial di acara tersebut. Untuk kantor dan ruangan tertutup, pilih aroma ringan dengan satu semprotan agar tidak mengganggu orang lain. Untuk acara malam, kondangan, atau kencan, aroma yang lebih pekat dan hangat justru lebih sesuai.",
    sections: [
      {
        heading: "Parfum apa yang cocok untuk kerja sehari-hari?",
        body: [
          "Parfum untuk kerja sehari-hari sebaiknya beraroma ringan, bersih, dan tidak menuntut perhatian. Kantor umumnya ruangan tertutup ber-AC di mana aroma tidak punya ruang untuk menyebar dan menghilang, sehingga wangi yang terlalu kuat cepat terasa mengganggu.",
          "Keluarga aroma yang aman untuk kantor adalah floral ringan, citrus, dan musk bersih. Batasi di satu semprotan, dan hindari menyemprot langsung sebelum masuk ruang rapat, karena aroma pembuka adalah bagian yang paling menyengat.",
        ],
      },
      {
        heading: "Parfum apa yang cocok untuk kondangan atau acara formal?",
        body: [
          "Parfum untuk kondangan dan acara formal bisa lebih pekat dan hangat, karena acara seperti ini umumnya berlangsung di ruangan besar atau area terbuka di mana aroma punya ruang untuk menyebar.",
          "Keluarga aroma yang cocok adalah floral oriental, gourmand, dan amber. Dua semprotan sudah cukup. Kalau acaranya berlangsung dari siang sampai malam, pilih parfum dengan aroma dasar berat seperti amber atau vanilla yang tidak perlu disemprot ulang.",
        ],
      },
      {
        heading: "Parfum apa yang cocok untuk kencan?",
        body: [
          "Parfum untuk kencan sebaiknya beraroma hangat dan personal, bukan yang menyebar jauh. Jarak sosial di kencan lebih dekat, jadi aroma yang menempel dekat di kulit justru lebih efektif daripada aroma yang memenuhi ruangan.",
          "Keluarga aroma yang bekerja baik adalah vanilla, musk, amber, dan floral oriental. Semprotkan di sisi leher dan pergelangan tangan, dan cukup satu sampai dua semprotan. Aroma yang terlalu kuat justru membuat orang menjaga jarak.",
        ],
      },
      {
        heading: "Apakah perlu punya lebih dari satu parfum?",
        body: [
          "Memiliki lebih dari satu parfum berguna kalau aktivitasmu bervariasi antara kantor, acara formal, dan waktu santai. Satu aroma ringan untuk siang dan satu aroma lebih hangat untuk malam sudah menutupi hampir semua situasi.",
          "Tapi memiliki satu parfum yang benar-benar cocok juga tidak salah. Aroma yang konsisten dipakai justru lebih mudah diingat orang dan menjadi penanda personal, yang merupakan inti dari konsep signature scent.",
        ],
      },
    ],
    faq: [
      {
        q: "Parfum HASERA mana yang cocok untuk ke kantor?",
        a: "Georgia Flora adalah pilihan paling cocok untuk kantor di koleksi HASERA, karena aroma floral segarnya ringan dan tidak menuntut perhatian. Croesus Gold juga bisa dipakai ke kantor, tapi cukup satu semprotan di ruangan ber-AC.",
      },
      {
        q: "Parfum HASERA mana yang cocok untuk acara malam?",
        a: "Cleopatra Noir dan Croesus Gold adalah pilihan terbaik untuk acara malam di koleksi HASERA. Keduanya punya aroma dasar hangat, vanilla dan musk untuk Cleopatra Noir, amber dan cedarwood untuk Croesus Gold, yang terasa lebih dalam saat suhu turun.",
      },
      {
        q: "Apakah boleh mencampur dua parfum sekaligus?",
        a: "Mencampur dua parfum atau layering bisa dilakukan, tapi butuh kehati-hatian agar aromanya tidak saling bertabrakan. Cara paling aman adalah menggabungkan satu aroma sederhana seperti musk atau vanilla dengan satu aroma yang lebih kompleks.",
      },
    ],
    relatedSlugs: ["parfum-untuk-cuaca-panas", "cara-pakai-parfum-biar-tahan-lama"],
    published: "2026-08-11",
    updated: "2026-08-11",
  },
];

/**
 * UI strings for /panduan. Kept here rather than in the dictionaries because
 * the whole section is Indonesian only, and adding an id-only block to the
 * shared Dictionary type would force stub translations into en.json.
 */
export const GUIDE_UI = {
  hubTitle: "Panduan parfum",
  hubMetaTitle: "Panduan Parfum: Cara Pakai dan Cara Memilih",
  hubMetaDescription:
    "Panduan parfum dari HASERA: cara pakai parfum biar tahan lama, kenapa parfum cepat hilang, arti Eau de Parfum, dan cara memilih aroma sesuai acara.",
  hubEyebrow: "Panduan",
  hubIntro:
    "Kumpulan penjelasan singkat soal parfum: cara pakainya, kenapa aromanya hilang, dan cara memilih yang cocok buat kamu. Ditulis supaya kepakai, bukan buat jualan.",
  breadcrumb: "Panduan",
  faqTitle: "Pertanyaan lain",
  relatedTitle: "Panduan lainnya",
  updatedPrefix: "Diperbarui",
  author: "Tim HASERA",
  backToHub: "Lihat semua panduan",
  productCtaTitle: "Cari parfum yang cocok?",
  productCtaBody:
    "HASERA punya tiga aroma signature dengan piramida aroma yang kami tulis lengkap di tiap halaman produk.",
  productCtaLink: "Lihat koleksi HASERA",
} as const;

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}

export function relatedGuides(slug: string) {
  const guide = getGuide(slug);
  if (!guide) return [];
  return guide.relatedSlugs
    .map((s) => getGuide(s))
    .filter((g): g is Guide => Boolean(g));
}

/** Newest content date across all guides, for the hub page's lastmod. */
export const guidesUpdated = guides
  .map((g) => g.updated)
  .sort()
  .at(-1) as string;
