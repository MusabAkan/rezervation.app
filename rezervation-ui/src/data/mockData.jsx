export const CATEGORIES = [
    {
        id: 'auto',
        name: 'Oto Tamirci',
        subs: ['Motor Ustası', 'Şanzıman', 'Elektrik', 'Kaporta', 'Lastik', 'Fren & Balata'],
        icon: 'la-car-crash'
    },
    {id: 'barber', name: 'Berber', subs: ['Saç', 'Sakal', 'Bakım'], icon: 'la-cut'},
    {id: 'hair', name: 'Kadın Kuaförü', subs: ['Kesim', 'Boya', 'Bakım', 'Manikür'], icon: 'la-female'},
    {id: 'arch', name: 'Mimarlık Ofisi', subs: ['İç Mimari', 'Proje', 'Danışmanlık'], icon: 'la-drafting-compass'},
    {id: 'dent', name: 'Diş Doktoru', subs: ['Dolgu', 'Kanal', 'Ortodonti'], icon: 'la-tooth'},
    {id: 'beauty', name: 'Güzellik Salonu', subs: ['Cilt Bakımı', 'Lazer', 'Masaj'], icon: 'la-spa'},
    {id: 'pest', name: 'Böcek İlaçlama', subs: ['Ev', 'İşyeri', 'Bahçe'], icon: 'la-bug'},
    {id: 'carpet', name: 'Halı Temizleme', subs: ['Evden Alım', 'Yerinde'], icon: 'la-broom'},
    {id: 'clinic', name: 'Küçük Klinik', subs: ['Aile Hekimi', 'Laboratuvar'], icon: 'la-clinic-medical'},
    {id: 'law', name: 'Avukatlık Ofisi', subs: ['Dava', 'Sözleşme', 'Danışmanlık'], icon: 'la-gavel'},
    {id: 'homefix', name: 'Eve Gelen Usta', subs: ['Kombi', 'Beyaz Eşya', 'Elektrik', 'Su'], icon: 'la-tools'},
];

export const INITIAL_BUSINESSES_DATA = [
    {
        id: 'b1',
        name: 'Usta Ali Oto',
        category: 'auto',
        subs: ['Motor Ustası', 'Elektrik'],
        rating: 4.7,
        priceLevel: '$$',
        distanceKm: 2.4,
        phone: '+90 555 000 0001',
        email: 'iletisim@ustaalioto.com',
        address: 'İstoç Sanayi 5. Blok No:12, İstanbul',
        photos: 12,
        reviews: 128,
        description: 'Motor, elektrik arızaları ve periyodik bakımda uzman ekip.',
        slots: ['09:30', '10:00', '11:30', '14:00', '16:30'],
        photo: 'https://i.pravatar.cc/150?u=b1'
    },
    {
        id: 'b2',
        name: 'Mavi Berber',
        category: 'barber',
        subs: ['Saç', 'Sakal'],
        rating: 4.4,
        priceLevel: '$',
        distanceKm: 1.1,
        phone: '+90 555 000 0002',
        email: 'musteri@maviberber.com',
        address: 'Bağdat Cad. No:45, İstanbul',
        photos: 34,
        reviews: 342,
        description: 'Hızlı randevu, modern kesimler, steril ortam.',
        slots: ['09:00', '09:30', '13:00', '15:00'],
        photo: 'https://i.pravatar.cc/150?u=b2'
    },
    {
        id: 'b3',
        name: 'DentCare Ağız ve Diş',
        category: 'dent',
        subs: ['Dolgu', 'Ortodonti'],
        rating: 4.9,
        priceLevel: '$$$',
        distanceKm: 5.8,
        phone: '+90 555 000 0003',
        email: 'info@dentcare.com',
        address: 'Levent Mah. Çelik Sk. No:2, İstanbul',
        photos: 18,
        reviews: 512,
        description: 'Güler yüzlü ekip, gelişmiş görüntüleme ve tedavi.',
        slots: ['10:00', '11:00', '14:30', '17:30'],
        photo: 'https://i.pravatar.cc/150?u=b3'
    },
    {
        id: 'b4',
        name: 'ArchDesign Mimarlık',
        category: 'arch',
        subs: ['İç Mimari'],
        rating: 5.0,
        priceLevel: '$$$',
        distanceKm: 8.2,
        phone: '+90 555 000 0004',
        email: 'proje@archdesign.com',
        address: 'Maslak No:1, İstanbul',
        photos: 55,
        reviews: 98,
        description: 'Modern ve fonksiyonel yaşam alanları tasarlıyoruz.',
        slots: ['10:00', '14:00'],
        photo: 'https://i.pravatar.cc/150?u=b4'
    },
];

export const MOCK_SERVICES = {
    b1: [
        {
            id: 's4',
            name: 'Periyodik Bakım (Yağ + Filtreler)',
            price: 2500,
            unit: 'Adet',
            status: 'normal',
            icon: 'Wrench',
            currency: '₺',
            active: true,
            isRemote: false,
            subCategory: 'Motor Ustası',
            images: [
                { src: 'https://placehold.co/600x400/e2e8f0/64748b?text=Yag+Degisimi', alt: 'Yağ Değişimi', title: 'Sentetik Yağ Kullanımı' },
                { src: 'https://placehold.co/600x400/e2e8f0/64748b?text=Filtre+Kontrolu', alt: 'Filtre Kontrolü', title: 'Hava Filtresi Değişimi' }
            ]
        },
        {
            id: 's5',
            name: 'Fren Balatası Değişimi (Ön)',
            price: 1800,
            unit: 'Adet',
            status: 'normal',
            icon: 'Car',
            currency: '₺',
            active: true,
            isRemote: false,
            subCategory: 'Fren & Balata',
            images: [
                { src: 'https://placehold.co/600x400/e2e8f0/64748b?text=Fren+Diskleri', alt: 'Fren Diskleri', title: 'Ön Fren Diski' },
            ]
        },
        {
            id: 's6',
            name: 'Şanzıman Yağı Değişimi',
            price: 3500,
            unit: 'Adet',
            status: 'yeni',
            icon: 'Package',
            currency: '₺',
            active: true,
            isRemote: false,
            subCategory: 'Şanzıman'
        },
        {
            id: 's7',
            name: 'Diagnostik Arıza Tespiti',
            price: 750,
            unit: 'Saat',
            status: 'normal',
            icon: 'Search',
            currency: '₺',
            active: true,
            isRemote: true,
            subCategory: 'Elektrik'
        },
        {
            id: 's10',
            name: 'Lastik Değişimi',
            price: 500,
            unit: 'Adet',
            status: 'normal',
            icon: 'Car',
            currency: '₺',
            active: true,
            isRemote: false,
            subCategory: 'Lastik'
        },
        {
            id: 's11',
            name: 'Far Temizliği',
            price: 600,
            unit: 'Adet',
            status: 'indirim',
            icon: 'Sparkles',
            currency: '₺',
            active: true,
            isRemote: false,
            subCategory: 'Kaporta',
            oldPrice: 750
        },
        {
            id: 's12',
            name: 'Pasta Cila',
            price: 2000,
            unit: 'Adet',
            status: 'normal',
            icon: 'Award',
            currency: '₺',
            active: false,
            isRemote: false,
            subCategory: 'Kaporta'
        },
    ],
    b2: [
        {
            id: 's1',
            name: 'Saç Kesimi',
            price: 400,
            unit: 'Adet',
            status: 'zam',
            icon: 'User',
            currency: '₺',
            active: true,
            oldPrice: 350,
            isRemote: false,
            subCategory: 'Saç',
            images: [
                { src: 'https://placehold.co/600x400/e2e8f0/64748b?text=Modern+Sac+Kesimi', alt: 'Modern Saç Kesimi', title: '2024 Trendleri' },
                { src: 'https://placehold.co/600x400/e2e8f0/64748b?text=Klasik+Sac+Kesimi', alt: 'Klasik Saç Kesimi', title: 'Her Zaman Şık' }
            ]
        },
        {
            id: 's2',
            name: 'Sakal Tıraşı',
            price: 250,
            unit: 'Adet',
            status: 'indirim',
            icon: 'User',
            currency: '₺',
            active: true,
            oldPrice: 300,
            isRemote: false,
            subCategory: 'Sakal'
        },
        {
            id: 's3',
            name: 'Saç + Sakal',
            price: 600,
            unit: 'Adet',
            status: 'normal',
            icon: 'User',
            currency: '₺',
            active: true,
            isRemote: false,
            subCategory: 'Saç'
        },
    ],
    b3: [
        {
            id: 's8',
            name: 'Diş Taşı Temizliği',
            price: 1500,
            unit: 'Adet',
            status: 'normal',
            icon: 'Sparkles',
            currency: '₺',
            active: true,
            isRemote: false
        },
        {
            id: 's9',
            name: 'Beyazlatma',
            price: 4000,
            unit: 'Adet',
            status: 'yeni',
            icon: 'Award',
            currency: '₺',
            active: true,
            isRemote: false
        },
    ],
    b4: [],
};

export const MOCK_USERS = {
    customer: {
        id: 'c1',
        type: 'customer',
        name: 'Ayşe Kaya',
        email: 'ayse@mail.com',
        rating: 4.8,
        photo: 'https://i.pravatar.cc/150?u=ayse'
    },
    business: {
        id: 'b1',
        type: 'business',
        name: 'Usta Ali Oto',
        email: 'iletisim@ustaalioto.com',
        photo: 'https://i.pravatar.cc/150?u=ali'
    }
};

export const INITIAL_APPOINTMENTS = [
    {
        id: 'a1',
        customerId: 'c1',
        businessId: 'b1',
        customerName: 'Ayşe Kaya',
        businessName: 'Usta Ali Oto',
        services: [{id: 's4', name: 'Periyodik Bakım (Yağ + Filtreler)', quantity: 1, price: 2500}],
        totalPrice: 2500,
        date: '2025-10-22',
        time: '10:00',
        status: 'confirmed',
        rated: true,
        address: null,
        notes: null
    },
    {
        id: 'a2',
        customerId: 'c1',
        businessId: 'b3',
        customerName: 'Ayşe Kaya',
        businessName: 'DentCare Ağız ve Diş',
        services: [{id: 's8', name: 'Diş Taşı Temizliği', quantity: 1, price: 1500}],
        totalPrice: 1500,
        date: '2025-09-28',
        time: '16:00',
        status: 'completed',
        rated: false,
        address: null,
        notes: null
    }
];

export const INITIAL_FORUM_POSTS = [
    {
        id: 'p1',
        type: 'business',
        author: 'Usta Ali Oto',
        businessId: 'b1',
        text: 'Periyodik bakımda sentetik yağ kullanmanın avantajları nelerdir?',
        replies: 2,
        likes: 15
    },
    {
        id: 'p2',
        type: 'customer',
        author: 'Can Yılmaz',
        text: 'Kadıköy civarında güvenilir bir lastikçi önerisi olan var mı?',
        replies: 5,
        likes: 8
    },
    {
        id: 'p3',
        type: 'business',
        author: 'Mavi Berber',
        businessId: 'b2',
        text: 'Yeni sezon saç trendleri için salonumuza bekleriz!',
        replies: 0,
        likes: 22
    },
];

export const INITIAL_NOTIFICATIONS = {
    c1: [ // Notifications for customer 'Ayşe Kaya'
        {
            id: 'n1',
            type: 'appointmentConfirmed',
            read: false,
            text: 'Usta Ali Oto randevunuzu onayladı.',
            timestamp: '2 saat önce',
            link: '#profile'
        },
        {
            id: 'n2',
            type: 'newChatMessage',
            read: false,
            text: 'Mavi Berber size bir mesaj gönderdi.',
            timestamp: '1 gün önce',
            link: '#messages/b2'
        },
        {
            id: 'n3',
            type: 'appointmentCancelled',
            read: true,
            text: 'DentCare randevunuz iptal edildi.',
            timestamp: '3 gün önce',
            link: '#profile'
        },
        {
            id: 'n6',
            type: 'rateServiceRequest',
            read: false,
            text: 'DentCare hizmetini değerlendirin.',
            timestamp: '1 gün önce',
            link: '#profile'
        },
    ],
    b1: [ // Notifications for business 'Usta Ali Oto'
        {
            id: 'n4',
            type: 'newAppointmentRequest',
            read: false,
            text: 'Can Yılmaz\'dan yeni randevu talebi.',
            timestamp: '5 dakika önce',
            link: '#dashboard'
        },
        {
            id: 'n5',
            type: 'newChatMessage',
            read: false,
            text: 'Ayşe Kaya size bir mesaj gönderdi.',
            timestamp: '2 saat önce',
            link: '#messages/c1'
        },
        {
            id: 'n7',
            type: 'appointmentToday',
            read: false,
            text: 'Ayşe Kaya randevusu bugün 10:00\'da. Müşterinin gelip gelmediğini işaretleyin.',
            timestamp: 'Az önce',
            link: '#dashboard'
        }
    ]
};

export const INITIAL_MESSAGES = {
    'c1-b2': [{from: 'c1', text: 'Merhaba, yarın için randevu alabilir miyim?', time: '14:30'}, {
        from: 'b2',
        text: 'Elbette Ayşe Hanım, sistem üzerinden müsait saatlerimize bakabilirsiniz.',
        time: '14:32'
    },],
    'c1-b1': [{from: 'c1', text: 'Periyodik bakım için ne kadar sürer acaba?', time: 'Dün'}]
};

export const MOCK_AVAILABILITY = {
    'b1': {'2025-10-27': 'partial', '2025-10-28': 'full', '2025-10-29': 'available'},
    'b2': {
        '2025-10-27': 'full',
        '2025-10-28': 'full',
        '2025-10-29': 'partial',
        '2025-10-30': 'available',
        '2025-10-31': 'available'
    },
    'b3': {'2025-11-10': 'available', '2025-11-11': 'partial'}
};
