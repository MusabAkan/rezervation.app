
// Bu dosya, dinamik filtreleme yapısını simüle eder.
// Gelecekte bu veri backend API'ından alınabilir.

export const filterStructure = [
    {
        key: 'category',
        displayName: 'Kategori',
        type: 'checkbox',
        options: ['Elektronik', 'Giyim', 'Ev & Yaşam', 'Kozmetik']
    },
    {
        key: 'brand',
        displayName: 'Marka',
        type: 'checkbox',
        options: ['Apple', 'Samsung', 'Nike', 'Adidas', 'Paşabahçe']
    },
    {
        key: 'price',
        displayName: 'Fiyat Aralığı',
        type: 'range',
        min: 0,
        max: 50000
    },
    {
        key: 'rating',
        displayName: 'Ürün Puanı',
        type: 'rating',
        max: 5
    }
];
