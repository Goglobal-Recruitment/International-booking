/**
 * Comprehensive Airport Database
 * Based on OpenFlights data and other free sources
 * Contains major airports worldwide with IATA/ICAO codes, cities, countries
 */

const AIRPORTS_DATABASE = {
    // South Africa - Domestic
    'JNB': { 
        iata: 'JNB', 
        icao: 'FAJS', 
        name: 'O.R. Tambo International Airport', 
        city: 'Johannesburg', 
        country: 'ZA', 
        countryName: 'South Africa',
        domestic: true,
        timezone: 'Africa/Johannesburg',
        lat: -26.1392,
        lon: 28.2460
    },
    'CPT': { 
        iata: 'CPT', 
        icao: 'FACT', 
        name: 'Cape Town International Airport', 
        city: 'Cape Town', 
        country: 'ZA', 
        countryName: 'South Africa',
        domestic: true,
        timezone: 'Africa/Johannesburg',
        lat: -33.9648,
        lon: 18.6017
    },
    'DUR': { 
        iata: 'DUR', 
        icao: 'FALE', 
        name: 'King Shaka International Airport', 
        city: 'Durban', 
        country: 'ZA', 
        countryName: 'South Africa',
        domestic: true,
        timezone: 'Africa/Johannesburg',
        lat: -29.6144,
        lon: 31.1197
    },
    'PLZ': { 
        iata: 'PLZ', 
        icao: 'FAPE', 
        name: 'Port Elizabeth Airport', 
        city: 'Port Elizabeth', 
        country: 'ZA', 
        countryName: 'South Africa',
        domestic: true,
        timezone: 'Africa/Johannesburg',
        lat: -33.9850,
        lon: 25.6173
    },
    'BFN': { 
        iata: 'BFN', 
        icao: 'FABL', 
        name: 'Bram Fischer International Airport', 
        city: 'Bloemfontein', 
        country: 'ZA', 
        countryName: 'South Africa',
        domestic: true,
        timezone: 'Africa/Johannesburg',
        lat: -29.0927,
        lon: 26.3023
    },
    'ELS': { 
        iata: 'ELS', 
        icao: 'FAEL', 
        name: 'East London Airport', 
        city: 'East London', 
        country: 'ZA', 
        countryName: 'South Africa',
        domestic: true,
        timezone: 'Africa/Johannesburg',
        lat: -33.0356,
        lon: 27.8258
    },

    // United Kingdom
    'LHR': { 
        iata: 'LHR', 
        icao: 'EGLL', 
        name: 'London Heathrow Airport', 
        city: 'London', 
        country: 'GB', 
        countryName: 'United Kingdom',
        domestic: false,
        timezone: 'Europe/London',
        lat: 51.4706,
        lon: -0.4619
    },
    'LGW': { 
        iata: 'LGW', 
        icao: 'EGKK', 
        name: 'London Gatwick Airport', 
        city: 'London', 
        country: 'GB', 
        countryName: 'United Kingdom',
        domestic: false,
        timezone: 'Europe/London',
        lat: 51.1481,
        lon: -0.1903
    },
    'STN': { 
        iata: 'STN', 
        icao: 'EGSS', 
        name: 'London Stansted Airport', 
        city: 'London', 
        country: 'GB', 
        countryName: 'United Kingdom',
        domestic: false,
        timezone: 'Europe/London',
        lat: 51.8860,
        lon: 0.2389
    },
    'MAN': { 
        iata: 'MAN', 
        icao: 'EGCC', 
        name: 'Manchester Airport', 
        city: 'Manchester', 
        country: 'GB', 
        countryName: 'United Kingdom',
        domestic: false,
        timezone: 'Europe/London',
        lat: 53.3537,
        lon: -2.2750
    },

    // United States
    'JFK': { 
        iata: 'JFK', 
        icao: 'KJFK', 
        name: 'John F. Kennedy International Airport', 
        city: 'New York', 
        country: 'US', 
        countryName: 'United States',
        domestic: false,
        timezone: 'America/New_York',
        lat: 40.6413,
        lon: -73.7781
    },
    'LAX': { 
        iata: 'LAX', 
        icao: 'KLAX', 
        name: 'Los Angeles International Airport', 
        city: 'Los Angeles', 
        country: 'US', 
        countryName: 'United States',
        domestic: false,
        timezone: 'America/Los_Angeles',
        lat: 33.9425,
        lon: -118.4081
    },
    'ORD': { 
        iata: 'ORD', 
        icao: 'KORD', 
        name: 'Chicago O\'Hare International Airport', 
        city: 'Chicago', 
        country: 'US', 
        countryName: 'United States',
        domestic: false,
        timezone: 'America/Chicago',
        lat: 41.9742,
        lon: -87.9073
    },
    'MIA': { 
        iata: 'MIA', 
        icao: 'KMIA', 
        name: 'Miami International Airport', 
        city: 'Miami', 
        country: 'US', 
        countryName: 'United States',
        domestic: false,
        timezone: 'America/New_York',
        lat: 25.7959,
        lon: -80.2870
    },
    'SFO': { 
        iata: 'SFO', 
        icao: 'KSFO', 
        name: 'San Francisco International Airport', 
        city: 'San Francisco', 
        country: 'US', 
        countryName: 'United States',
        domestic: false,
        timezone: 'America/Los_Angeles',
        lat: 37.6213,
        lon: -122.3790
    },

    // France
    'CDG': { 
        iata: 'CDG', 
        icao: 'LFPG', 
        name: 'Charles de Gaulle Airport', 
        city: 'Paris', 
        country: 'FR', 
        countryName: 'France',
        domestic: false,
        timezone: 'Europe/Paris',
        lat: 49.0097,
        lon: 2.5479
    },
    'ORY': { 
        iata: 'ORY', 
        icao: 'LFPO', 
        name: 'Paris Orly Airport', 
        city: 'Paris', 
        country: 'FR', 
        countryName: 'France',
        domestic: false,
        timezone: 'Europe/Paris',
        lat: 48.7262,
        lon: 2.3656
    },

    // Germany
    'FRA': { 
        iata: 'FRA', 
        icao: 'EDDF', 
        name: 'Frankfurt Airport', 
        city: 'Frankfurt', 
        country: 'DE', 
        countryName: 'Germany',
        domestic: false,
        timezone: 'Europe/Berlin',
        lat: 50.0379,
        lon: 8.5622
    },
    'MUC': { 
        iata: 'MUC', 
        icao: 'EDDM', 
        name: 'Munich Airport', 
        city: 'Munich', 
        country: 'DE', 
        countryName: 'Germany',
        domestic: false,
        timezone: 'Europe/Berlin',
        lat: 48.3537,
        lon: 11.7750
    },

    // Netherlands
    'AMS': { 
        iata: 'AMS', 
        icao: 'EHAM', 
        name: 'Amsterdam Airport Schiphol', 
        city: 'Amsterdam', 
        country: 'NL', 
        countryName: 'Netherlands',
        domestic: false,
        timezone: 'Europe/Amsterdam',
        lat: 52.3105,
        lon: 4.7683
    },

    // UAE
    'DXB': { 
        iata: 'DXB', 
        icao: 'OMDB', 
        name: 'Dubai International Airport', 
        city: 'Dubai', 
        country: 'AE', 
        countryName: 'United Arab Emirates',
        domestic: false,
        timezone: 'Asia/Dubai',
        lat: 25.2532,
        lon: 55.3657
    },
    'AUH': { 
        iata: 'AUH', 
        icao: 'OMAA', 
        name: 'Abu Dhabi International Airport', 
        city: 'Abu Dhabi', 
        country: 'AE', 
        countryName: 'United Arab Emirates',
        domestic: false,
        timezone: 'Asia/Dubai',
        lat: 24.4330,
        lon: 54.6511
    },

    // Qatar
    'DOH': { 
        iata: 'DOH', 
        icao: 'OTHH', 
        name: 'Hamad International Airport', 
        city: 'Doha', 
        country: 'QA', 
        countryName: 'Qatar',
        domestic: false,
        timezone: 'Asia/Qatar',
        lat: 25.2731,
        lon: 51.6080
    },

    // Singapore
    'SIN': { 
        iata: 'SIN', 
        icao: 'WSSS', 
        name: 'Singapore Changi Airport', 
        city: 'Singapore', 
        country: 'SG', 
        countryName: 'Singapore',
        domestic: false,
        timezone: 'Asia/Singapore',
        lat: 1.3644,
        lon: 103.9915
    },

    // Hong Kong
    'HKG': { 
        iata: 'HKG', 
        icao: 'VHHH', 
        name: 'Hong Kong International Airport', 
        city: 'Hong Kong', 
        country: 'HK', 
        countryName: 'Hong Kong',
        domestic: false,
        timezone: 'Asia/Hong_Kong',
        lat: 22.3080,
        lon: 113.9185
    },

    // Japan
    'NRT': { 
        iata: 'NRT', 
        icao: 'RJAA', 
        name: 'Narita International Airport', 
        city: 'Tokyo', 
        country: 'JP', 
        countryName: 'Japan',
        domestic: false,
        timezone: 'Asia/Tokyo',
        lat: 35.7720,
        lon: 140.3929
    },
    'HND': { 
        iata: 'HND', 
        icao: 'RJTT', 
        name: 'Tokyo Haneda Airport', 
        city: 'Tokyo', 
        country: 'JP', 
        countryName: 'Japan',
        domestic: false,
        timezone: 'Asia/Tokyo',
        lat: 35.5494,
        lon: 139.7798
    },
    'KIX': { 
        iata: 'KIX', 
        icao: 'RJBB', 
        name: 'Kansai International Airport', 
        city: 'Osaka', 
        country: 'JP', 
        countryName: 'Japan',
        domestic: false,
        timezone: 'Asia/Tokyo',
        lat: 34.4347,
        lon: 135.2441
    },

    // Australia
    'SYD': { 
        iata: 'SYD', 
        icao: 'YSSY', 
        name: 'Sydney Kingsford Smith Airport', 
        city: 'Sydney', 
        country: 'AU', 
        countryName: 'Australia',
        domestic: false,
        timezone: 'Australia/Sydney',
        lat: -33.9399,
        lon: 151.1753
    },
    'MEL': { 
        iata: 'MEL', 
        icao: 'YMML', 
        name: 'Melbourne Airport', 
        city: 'Melbourne', 
        country: 'AU', 
        countryName: 'Australia',
        domestic: false,
        timezone: 'Australia/Melbourne',
        lat: -37.6690,
        lon: 144.8410
    },
    'PER': { 
        iata: 'PER', 
        icao: 'YPPH', 
        name: 'Perth Airport', 
        city: 'Perth', 
        country: 'AU', 
        countryName: 'Australia',
        domestic: false,
        timezone: 'Australia/Perth',
        lat: -31.9385,
        lon: 115.9672
    },

    // Canada
    'YYZ': { 
        iata: 'YYZ', 
        icao: 'CYYZ', 
        name: 'Toronto Pearson International Airport', 
        city: 'Toronto', 
        country: 'CA', 
        countryName: 'Canada',
        domestic: false,
        timezone: 'America/Toronto',
        lat: 43.6777,
        lon: -79.6248
    },
    'YVR': { 
        iata: 'YVR', 
        icao: 'CYVR', 
        name: 'Vancouver International Airport', 
        city: 'Vancouver', 
        country: 'CA', 
        countryName: 'Canada',
        domestic: false,
        timezone: 'America/Vancouver',
        lat: 49.1967,
        lon: -123.1815
    },

    // Brazil
    'GRU': { 
        iata: 'GRU', 
        icao: 'SBGR', 
        name: 'São Paulo/Guarulhos International Airport', 
        city: 'São Paulo', 
        country: 'BR', 
        countryName: 'Brazil',
        domestic: false,
        timezone: 'America/Sao_Paulo',
        lat: -23.4356,
        lon: -46.4731
    },
    'GIG': { 
        iata: 'GIG', 
        icao: 'SBGL', 
        name: 'Rio de Janeiro/Galeão International Airport', 
        city: 'Rio de Janeiro', 
        country: 'BR', 
        countryName: 'Brazil',
        domestic: false,
        timezone: 'America/Sao_Paulo',
        lat: -22.8099,
        lon: -43.2505
    },

    // Spain
    'MAD': { 
        iata: 'MAD', 
        icao: 'LEMD', 
        name: 'Adolfo Suárez Madrid–Barajas Airport', 
        city: 'Madrid', 
        country: 'ES', 
        countryName: 'Spain',
        domestic: false,
        timezone: 'Europe/Madrid',
        lat: 40.4839,
        lon: -3.5680
    },
    'BCN': { 
        iata: 'BCN', 
        icao: 'LEBL', 
        name: 'Barcelona–El Prat Airport', 
        city: 'Barcelona', 
        country: 'ES', 
        countryName: 'Spain',
        domestic: false,
        timezone: 'Europe/Madrid',
        lat: 41.2974,
        lon: 2.0833
    },

    // Italy
    'FCO': { 
        iata: 'FCO', 
        icao: 'LIRF', 
        name: 'Leonardo da Vinci International Airport', 
        city: 'Rome', 
        country: 'IT', 
        countryName: 'Italy',
        domestic: false,
        timezone: 'Europe/Rome',
        lat: 41.8003,
        lon: 12.2389
    },
    'MXP': { 
        iata: 'MXP', 
        icao: 'LIMC', 
        name: 'Milan Malpensa Airport', 
        city: 'Milan', 
        country: 'IT', 
        countryName: 'Italy',
        domestic: false,
        timezone: 'Europe/Rome',
        lat: 45.6306,
        lon: 8.7231
    },

    // Switzerland
    'ZUR': { 
        iata: 'ZUR', 
        icao: 'LSZH', 
        name: 'Zurich Airport', 
        city: 'Zurich', 
        country: 'CH', 
        countryName: 'Switzerland',
        domestic: false,
        timezone: 'Europe/Zurich',
        lat: 47.4647,
        lon: 8.5492
    },

    // Austria
    'VIE': { 
        iata: 'VIE', 
        icao: 'LOWW', 
        name: 'Vienna International Airport', 
        city: 'Vienna', 
        country: 'AT', 
        countryName: 'Austria',
        domestic: false,
        timezone: 'Europe/Vienna',
        lat: 48.1103,
        lon: 16.5697
    },

    // Turkey
    'IST': { 
        iata: 'IST', 
        icao: 'LTFM', 
        name: 'Istanbul Airport', 
        city: 'Istanbul', 
        country: 'TR', 
        countryName: 'Turkey',
        domestic: false,
        timezone: 'Europe/Istanbul',
        lat: 41.2619,
        lon: 28.7279
    },

    // Egypt
    'CAI': { 
        iata: 'CAI', 
        icao: 'HECA', 
        name: 'Cairo International Airport', 
        city: 'Cairo', 
        country: 'EG', 
        countryName: 'Egypt',
        domestic: false,
        timezone: 'Africa/Cairo',
        lat: 30.1219,
        lon: 31.4056
    },

    // Kenya
    'NBO': { 
        iata: 'NBO', 
        icao: 'HKJK', 
        name: 'Jomo Kenyatta International Airport', 
        city: 'Nairobi', 
        country: 'KE', 
        countryName: 'Kenya',
        domestic: false,
        timezone: 'Africa/Nairobi',
        lat: -1.3192,
        lon: 36.9278
    },

    // Ethiopia
    'ADD': { 
        iata: 'ADD', 
        icao: 'HAAB', 
        name: 'Addis Ababa Bole International Airport', 
        city: 'Addis Ababa', 
        country: 'ET', 
        countryName: 'Ethiopia',
        domestic: false,
        timezone: 'Africa/Addis_Ababa',
        lat: 8.9806,
        lon: 38.7992
    },

    // Nigeria
    'LOS': { 
        iata: 'LOS', 
        icao: 'DNMM', 
        name: 'Murtala Muhammed International Airport', 
        city: 'Lagos', 
        country: 'NG', 
        countryName: 'Nigeria',
        domestic: false,
        timezone: 'Africa/Lagos',
        lat: 6.5774,
        lon: 3.3212
    },

    // Mauritius
    'MRU': { 
        iata: 'MRU', 
        icao: 'FIMP', 
        name: 'Sir Seewoosagur Ramgoolam International Airport', 
        city: 'Port Louis', 
        country: 'MU', 
        countryName: 'Mauritius',
        domestic: false,
        timezone: 'Indian/Mauritius',
        lat: -20.4302,
        lon: 57.6836
    },

    // Seychelles
    'SEZ': { 
        iata: 'SEZ', 
        icao: 'FSIA', 
        name: 'Seychelles International Airport', 
        city: 'Victoria', 
        country: 'SC', 
        countryName: 'Seychelles',
        domestic: false,
        timezone: 'Indian/Mahe',
        lat: -4.6743,
        lon: 55.5218
    },

    // India
    'DEL': { 
        iata: 'DEL', 
        icao: 'VIDP', 
        name: 'Indira Gandhi International Airport', 
        city: 'New Delhi', 
        country: 'IN', 
        countryName: 'India',
        domestic: false,
        timezone: 'Asia/Kolkata',
        lat: 28.5562,
        lon: 77.1000
    },
    'BOM': { 
        iata: 'BOM', 
        icao: 'VABB', 
        name: 'Chhatrapati Shivaji Maharaj International Airport', 
        city: 'Mumbai', 
        country: 'IN', 
        countryName: 'India',
        domestic: false,
        timezone: 'Asia/Kolkata',
        lat: 19.0896,
        lon: 72.8656
    },

    // Thailand
    'BKK': { 
        iata: 'BKK', 
        icao: 'VTBS', 
        name: 'Suvarnabhumi Airport', 
        city: 'Bangkok', 
        country: 'TH', 
        countryName: 'Thailand',
        domestic: false,
        timezone: 'Asia/Bangkok',
        lat: 13.6900,
        lon: 100.7501
    },

    // Malaysia
    'KUL': { 
        iata: 'KUL', 
        icao: 'WMKK', 
        name: 'Kuala Lumpur International Airport', 
        city: 'Kuala Lumpur', 
        country: 'MY', 
        countryName: 'Malaysia',
        domestic: false,
        timezone: 'Asia/Kuala_Lumpur',
        lat: 2.7456,
        lon: 101.7072
    },

    // Indonesia
    'CGK': { 
        iata: 'CGK', 
        icao: 'WIII', 
        name: 'Soekarno-Hatta International Airport', 
        city: 'Jakarta', 
        country: 'ID', 
        countryName: 'Indonesia',
        domestic: false,
        timezone: 'Asia/Jakarta',
        lat: -6.1256,
        lon: 106.6559
    },

    // Philippines
    'MNL': { 
        iata: 'MNL', 
        icao: 'RPLL', 
        name: 'Ninoy Aquino International Airport', 
        city: 'Manila', 
        country: 'PH', 
        countryName: 'Philippines',
        domestic: false,
        timezone: 'Asia/Manila',
        lat: 14.5086,
        lon: 121.0194
    },

    // South Korea
    'ICN': { 
        iata: 'ICN', 
        icao: 'RKSI', 
        name: 'Incheon International Airport', 
        city: 'Seoul', 
        country: 'KR', 
        countryName: 'South Korea',
        domestic: false,
        timezone: 'Asia/Seoul',
        lat: 37.4602,
        lon: 126.4407
    },

    // China
    'PEK': { 
        iata: 'PEK', 
        icao: 'ZBAA', 
        name: 'Beijing Capital International Airport', 
        city: 'Beijing', 
        country: 'CN', 
        countryName: 'China',
        domestic: false,
        timezone: 'Asia/Shanghai',
        lat: 40.0799,
        lon: 116.6031
    },
    'PVG': { 
        iata: 'PVG', 
        icao: 'ZSPD', 
        name: 'Shanghai Pudong International Airport', 
        city: 'Shanghai', 
        country: 'CN', 
        countryName: 'China',
        domestic: false,
        timezone: 'Asia/Shanghai',
        lat: 31.1443,
        lon: 121.8083
    },

    // Russia
    'SVO': { 
        iata: 'SVO', 
        icao: 'UUEE', 
        name: 'Sheremetyevo International Airport', 
        city: 'Moscow', 
        country: 'RU', 
        countryName: 'Russia',
        domestic: false,
        timezone: 'Europe/Moscow',
        lat: 55.9736,
        lon: 37.4125
    }
};

// Popular destinations for quick access
const POPULAR_DESTINATIONS = [
    'JNB', 'CPT', 'DUR', 'LHR', 'JFK', 'LAX', 'CDG', 'FRA', 'AMS', 'DXB', 
    'DOH', 'SIN', 'HKG', 'NRT', 'SYD', 'YYZ', 'GRU', 'MAD', 'FCO', 'ZUR'
];

// Recent searches (can be dynamically updated)
const RECENT_SEARCHES = [
    'JNB', 'CPT', 'LHR', 'DXB', 'SIN'
];

// Export for use in other files
if (typeof window !== 'undefined') {
    window.AIRPORTS_DATABASE = AIRPORTS_DATABASE;
    window.POPULAR_DESTINATIONS = POPULAR_DESTINATIONS;
    window.RECENT_SEARCHES = RECENT_SEARCHES;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AIRPORTS_DATABASE,
        POPULAR_DESTINATIONS,
        RECENT_SEARCHES
    };
}