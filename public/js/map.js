const pins = [
    {
        left: 8.5,
        top: 14.2,
        type: 'sight',
        category: 1,
        name: 'Kladno',
        photo: 'kladno.png'
    },
    {
        left: 5.6,
        top: 56.4,
        type: 'golf',
        category: 2,
        name: 'Golf Botanika',
        photo: 'golf.png'
    },
    {
        left: 14.6,
        top: 42.3,
        type: 'restaurant',
        category: 3,
        name: 'Restaurace U slovana',
        photo: 'slovan.png'
    },
    {
        left: 56.2,
        top: 44.9,
        type: 'school',
        category: 4,
        name: 'Mateřská škola',
        photo: 'materska.png'
    },
    {
        left: 40.4,
        top: 65.2,
        type: 'school',
        category: 4,
        name: 'Mateřská škola',
        photo: 'materska.png'
    },
    {
        left: 26.2,
        top: 34.6,
        type: 'school',
        category: 4,
        name: 'Základní škola',
        photo: 'zakladni.png'
    },
    {
        left: 34.7,
        top: 47,
        type: 'school',
        category: 4,
        name: 'Základní škola',
        photo: 'zakladni.png'
    },
    {
        left: 38.8,
        top: 59.6,
        type: 'school',
        category: 4,
        name: 'Základní škola',
        photo: 'zakladni.png'
    },
    {
        left: 61.6,
        top: 55.6,
        type: 'shop',
        category: 4,
        name: 'Supermarket Penny',
        photo: 'penny.png'
    },
    {
        left: 15.5,
        top: 53.1,
        type: 'bus',
        category: 4,
        name: 'Zastávka MHD',
        photo: 'mhd.png'
    },
    {
        left: 39,
        top: 54.1,
        type: 'bus',
        category: 4,
        name: 'Zastávka MHD',
        photo: 'mhd.png'
    },
    {
        left: 54,
        top: 51.6,
        type: 'bus',
        category: 4,
        name: 'Zastávka MHD',
        photo: 'mhd.png'
    },
    {
        left: 51,
        top: 52,
        type: 'shop',
        category: 4,
        name: 'Supermarket Penny',
        photo: 'coop.png'
    },
    {
        left: 50,
        top: 67,
        type: 'hall',
        category: 4,
        name: 'Městský úřad',
        photo: 'urad.png'
    },
    {
        left: 47,
        top: 61,
        type: 'hairdresser',
        category: 4,
        name: 'Kadeřnictví',
        photo: 'kadernictvi.png'
    },
    {
        left: 45,
        top: 65,
        type: 'tools',
        category: 4,
        name: 'Autoservis',
        photo: 'autoservis.png'
    },
    {
        left: 57.7,
        top: 51,
        type: 'medical',
        category: 4,
        name: 'Lékárna',
        photo: 'lekarna.png'
    },
    {
        left: 43.8,
        top: 51.1,
        type: 'flowers',
        category: 4,
        name: 'Květinářství',
        photo: 'kvetinarstvi.png'
    },
    {
        left: 47.2,
        top: 51,
        type: 'church',
        category: 4,
        name: 'Kostel sv. Petra a Pavla',
        photo: 'kostel.png'
    },
    {
        left: 25.6,
        top: 48,
        type: 'restaurant',
        category: 3,
        name: 'Restaurace Stará studna',
        photo: 'studna.png'
    },
    {
        left: 68.5,
        top: 48.4,
        type: 'restaurant',
        category: 3,
        name: 'Restaurace Asia',
        photo: 'asia.png'
    },
    {
        left: 27.9,
        top: 64.7,
        type: 'coffee',
        category: 3,
        name: 'Café S radostí',
        photo: 'radost.png'
    },
    {
        left: 47.9,
        top: 56,
        type: 'restaurant',
        category: 3,
        name: 'Restaurace Square',
        photo: 'square.png'
    },
    {
        left: 52.2,
        top: 58.3,
        type: 'restaurant',
        category: 3,
        name: 'Pizzeria',
        photo: 'pizzeria.png'
    },
    {
        left: 36.2,
        top: 56,
        type: 'sweet',
        category: 3,
        name: 'Cukrárna Mima',
        photo: 'mima.png'
    },
    {
        left: 53.2,
        top: 43.3,
        type: 'coffee',
        category: 3,
        name: 'Kavárna Slunce všem',
        photo: 'slunce.png'
    },
    {
        left: 40.8,
        top: 49.8,
        type: 'meat',
        category: 3,
        name: 'Řeznictví',
        photo: 'reznictvi.png'
    },
    {
        left: 37.6,
        top: 48.5,
        type: 'bakery',
        category: 3,
        name: 'Unhošťská pekárna',
        photo: 'pekarstvi.png'
    },
    {
        left: 21.1,
        top: 74.2,
        type: 'water',
        category: 2,
        name: 'Rybník Bulhar',
        photo: 'bulhar.png'
    },
    {
        left: 25.9,
        top: 27.3,
        type: 'football',
        category: 2,
        name: 'Fotbalové hřiště',
        photo: 'fotbal.png'
    },
    {
        left: 54.5,
        top: 64.8,
        type: 'play',
        category: 2,
        name: 'Dětské hřiště',
        photo: 'hriste.png'
    },
    {
        left: 48,
        top: 95,
        type: 'horse',
        category: 2,
        name: 'Stáj Tara',
        photo: 'staj.png'
    },
    {
        left: 5.6,
        top: 56.4,
        type: 'golf',
        category: 1,
        name: 'Golf Botanika',
        photo: 'golf.png'
    },
    {
        left: 1.9,
        top: 57.9,
        type: 'sight',
        category: 1,
        name: 'Křivoklát',
        photo: 'krivoklat.png'
    },
    {
        left: 82.4,
        top: 87,
        type: 'sight',
        category: 1,
        name: 'Červený újezd',
        photo: 'ujezd.png'
    },
    {
        left: 83,
        top: 6,
        type: 'airport',
        category: 1,
        name: 'Letiště Praha',
        photo: 'letiste.png'
    },
    {
        left: 22,
        top: 98,
        type: 'sight',
        category: 1,
        name: 'Karlštejn',
        photo: 'karlstejn.png'
    },
];

function initMap() {
    for(pin in pins) {
        let pinData = pins[pin];

        let pinHtml = '<div class="pin category-'+ pinData.category +' '+ pinData.type +'" style="top: '+ pinData.top +'%; left: '+ pinData.left +'%;" data-name="'+ pinData.name +'" ><img src="./images/pins-images/'+ pinData.photo +'" alt=""><span class="text">'+ pinData.name +'</span></div>';

        $(".unhost-pins").append(pinHtml);

        $(".unhost-pins .pin:first").addClass("active");


    }
}