export const PROPERTY_TYPES = {
  RESIDENCE: 'Residence',
  PLOTS: 'Plots',
  COMMERCIAL: 'Commercial'
};

export const LOCATIONS = [
  {
    id: 'gurgaon',
    name: 'Gurgaon',
    state: 'Haryana',
    tagline: 'Millennium City & Luxury Corridors',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    propertyCount: 24,
    popularFor: ['Golf Course Rd', 'Cyber City', 'Southern Peripheral Rd', 'Dwarka Expressway']
  },
  {
    id: 'delhi',
    name: 'Delhi',
    state: 'NCR',
    tagline: 'Heritage, Diplomatic & Prime Enclaves',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80',
    propertyCount: 16,
    popularFor: ['South Delhi', 'Lutyens Zone', 'Chanakyapuri', 'Vasant Vihar']
  },
  {
    id: 'noida',
    name: 'Noida',
    state: 'Uttar Pradesh',
    tagline: 'Planned Infrastructure & High-Rise Living',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80',
    propertyCount: 19,
    popularFor: ['Sector 128', 'Noida Expressway', 'Sector 150', 'Greater Noida']
  },
  {
    id: 'chandigarh',
    name: 'Chandigarh',
    state: 'Punjab/Haryana',
    tagline: 'Architectural Heritage & Serene Estates',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    propertyCount: 12,
    popularFor: ['Sector 8 & 9', 'New Chandigarh', 'Zirakpur Green Belt', 'Panchkula']
  },
  {
    id: 'panipat',
    name: 'Panipat',
    state: 'Haryana',
    tagline: 'Rapid Industrial & Plotted Expansion',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    propertyCount: 8,
    popularFor: ['Grand Trunk Corridor', 'Sector 18 Hub', 'Model Town', 'Industrial Phase II']
  },
  {
    id: 'greater-noida',
    name: 'Greater Noida',
    state: 'Uttar Pradesh',
    tagline: 'Knowledge Parks & Future Aerotropolis',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    propertyCount: 14,
    popularFor: ['Yamuna Expressway', 'Pari Chowk', 'Tech Zone', 'Jewar Growth Belt']
  }
];

export const PROPERTIES_DATA = [
  {
    id: 'prop-101',
    title: 'The Solitaire Sky Villa — Golf Course Road',
    type: PROPERTY_TYPES.RESIDENCE,
    categoryKey: 'residence',
    location: 'Gurgaon',
    subLocation: 'Golf Course Road, DLF Phase 5',
    price: '₹ 8.75 Cr',
    priceRaw: 87500000,
    area: '4,650 sq.ft',
    bedrooms: '4 BHK + Servant + Family Lounge',
    badge: 'Exclusive',
    status: 'Ready to Move',
    featured: true,
    isInvestment: true,
    expectedYield: '6.2% Rental Yield',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An architectural marvel perched high above the prestigious Golf Course Road. Offering panoramic 270-degree skyline views, double-height living ceilings, imported Italian Statuario marble, a private heated splash pool, and dedicated private elevator foyer access.',
    features: [
      'Private High-Speed Elevator with Biometric Access',
      'Triple Height 22ft Living Room Ceiling',
      'Master Suite with Spa & Walk-in Wardrobe',
      'Full Home Automation by Crestron',
      'VRV Air Conditioning & Air Purification System',
      '3 Reserved Basement Parking Bays + EV Charger'
    ],
    amenities: [
      'Heated Infinity Pool',
      'Private Screening Theatre',
      'Concierge & Butler Desk',
      'Cigar Lounge & Wine Cellar',
      'State-of-the-art TechnoGym',
      'Private Helipad Access'
    ],
    developer: 'Aurelia Signature Estates',
    possession: 'Ready for Fitouts'
  },
  {
    id: 'prop-102',
    title: 'Oakwood Plotted Enclave — Sector 88A',
    type: PROPERTY_TYPES.PLOTS,
    categoryKey: 'plots',
    location: 'Gurgaon',
    subLocation: 'Dwarka Expressway & Pataudi Rd Junction',
    price: '₹ 2.40 Cr',
    priceRaw: 24000000,
    area: '250 sq.yd (2,250 sq.ft)',
    bedrooms: 'Freehold Plot (G+4 Approved)',
    badge: 'High Growth',
    status: 'Immediate Registry',
    featured: true,
    isInvestment: true,
    expectedYield: '18% Projected 2-Yr Capital Growth',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Gated, boutique plotted development along the booming Dwarka Expressway corridor. Fully DTCP approved with underground power grid, landscaped avenues, 40-foot wide tree-lined internal roads, and permission for Stilt + 4 floors construction.',
    features: [
      '100% Clear Title & DTCP Approved',
      'Stilt + 4 Floors Permitted with Independent Registry',
      'Underground Cabling & Dual Water Lines',
      'Gated Community with 24/7 RFID Boom Barriers',
      'Zero High-Tension Lines with Prime North-East Facing',
      'Immediate Demarcation & Registry Available'
    ],
    amenities: [
      'Gated Club & Tennis Court',
      'Over 2.5 Acres Central Park',
      'Children Sensory Play Zone',
      'Jogging & Cycling Boardwalk',
      'EV Charging Stations',
      'Commercial Daily Convenience Market'
    ],
    developer: 'Greenfield Land Developers',
    possession: 'Immediate Registry & Possession'
  },
  {
    id: 'prop-103',
    title: 'The Capital Apex — Cyber City Corporate Suites',
    type: PROPERTY_TYPES.COMMERCIAL,
    categoryKey: 'commercial',
    location: 'Gurgaon',
    subLocation: 'DLF Cyber City / NH-48 Corridor',
    price: '₹ 4.25 Cr',
    priceRaw: 42500000,
    area: '2,800 sq.ft Lockable Office',
    bedrooms: 'Grade-A Commercial Space',
    badge: 'Pre-Leased',
    status: 'Pre-Leased to Fortune 500',
    featured: true,
    isInvestment: true,
    expectedYield: '8.4% Guaranteed Rental Return',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A pre-leased institutional grade commercial office suite tenanted by an S&P 500 global tech firm with a 9-year lease agreement and 15% escalation every 3 years. Exceptional asset for investors seeking rock-solid regular cash flow and high capital appreciation.',
    features: [
      'Leased to Tier-1 MNC with 6-Year Lock-in Remaining',
      'IGBC Platinum Certified Green Architecture',
      'Double Glazed Acoustic Thermal Glass Façade',
      '100% Power Backup with Redundant Substation',
      'High-Speed OTIS Destination Elevators',
      'Triple Basement Automated Parking'
    ],
    amenities: [
      'Executive Dining Lounge',
      'Auditorium & Global Boardrooms',
      'Sky Atrium Coffee Roastery',
      'Multi-Tier Security & Biometric Turnstiles',
      'Valet & Chauffeur Rooms',
      'Helipad & VIP Drop-off Porch'
    ],
    developer: 'Vanguard Commercial Real Estate',
    possession: 'Immediate Revenue Generating'
  },
  {
    id: 'prop-104',
    title: 'The Grand Ambassador Manor — South Delhi',
    type: PROPERTY_TYPES.RESIDENCE,
    categoryKey: 'residence',
    location: 'Delhi',
    subLocation: 'Vasant Vihar Diplomatic Enclave',
    price: '₹ 19.50 Cr',
    priceRaw: 195000000,
    area: '6,200 sq.ft Floor Plate',
    bedrooms: '5 BHK Ultra-Luxury Independent Floor',
    badge: 'Featured',
    status: 'Ready to Move',
    featured: true,
    isInvestment: false,
    expectedYield: '4.8% Rental Yield',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An iconic address in the heart of Diplomatic South Delhi. Designed for dignitaries and connoisseurs of timeless luxury. Features a grand entry foyer, French windows looking out onto landscaped gardens, German Poggenpohl kitchen, and bespoke Dornbracht bath fixtures.',
    features: [
      'Corner Plot with 80ft Wide Frontage',
      'Private Stilt Car Parking for 4 Large Sedans',
      'Miele & Sub-Zero Fitted Show Kitchen + Wet Kitchen',
      'Soundproofed Double-Paned Fenesta Acoustic Glazing',
      'Private Terrace Garden with Gazebo & Bar',
      'Integrated Staff Quarters with Private Entry'
    ],
    amenities: [
      'Private Terrace Jacuzzi',
      'Solar Rooftop Grid',
      'Water Softener & Filtration Plant',
      '3-Tier Perimeter Laser Security',
      'Custom Wine & Spirits Tasting Room',
      'Private Otis Glass Elevator'
    ],
    developer: 'Imperial Legacy Homes',
    possession: 'Immediate Registry'
  },
  {
    id: 'prop-105',
    title: 'The Horizon Plotted Boulevard — GT Road',
    type: PROPERTY_TYPES.PLOTS,
    categoryKey: 'plots',
    location: 'Panipat',
    subLocation: 'Main GT Karnal Road Corridor',
    price: '₹ 85 Lakh',
    priceRaw: 8500000,
    area: '180 sq.yd (1,620 sq.ft)',
    bedrooms: 'Residential Villa Plot',
    badge: 'New Launch',
    status: 'Booking Open',
    featured: true,
    isInvestment: true,
    expectedYield: '22% Projected 3-Yr Return',
    images: [
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A masterplanned 50-acre integrated plotted township positioned along the National Highway 44. Ideal for high ROI plot investments or building a bespoke independent villa away from urban chaos yet connected by high-speed express corridors.',
    features: [
      'DTCP Haryana License Approved',
      'All Underground Infrastructure (No overhead wires)',
      'Wide 60ft Boulevard & 30ft Sector Roads',
      'Direct Highway Underpass Access',
      'Clear Documentation with Bank Approvals (HDFC, ICICI, SBI)',
      'Boundary Wall & Security Checkpoints'
    ],
    amenities: [
      'Clubhouse with Swimming Pool & Badminton Court',
      'Commercial High-Street Market Inside Township',
      'Temple & Community Meditation Center',
      'Solar Powered Street Lighting',
      'Rainwater Harvesting Wells',
      'Dedicated Pet Park'
    ],
    developer: 'Horizon Infrastructure Group',
    possession: 'Possession by Dec 2026'
  },
  {
    id: 'prop-106',
    title: 'Elysian Golf Residences — Sector 128',
    type: PROPERTY_TYPES.RESIDENCE,
    categoryKey: 'residence',
    location: 'Noida',
    subLocation: 'Noida-Greater Noida Expressway',
    price: '₹ 4.10 Cr',
    priceRaw: 41000000,
    area: '3,450 sq.ft',
    bedrooms: '4 BHK + Luxury Deck',
    badge: 'Exclusive',
    status: 'Ready to Move',
    featured: true,
    isInvestment: false,
    expectedYield: '5.5% Rental Yield',
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Overlooking the signature 18-hole Graham Cooke golf course on Noida Expressway. Expansive open-plan living with continuous wrap-around glass balustrades, offering soothing greens and total serenity minutes from the capital.',
    features: [
      'Uninterrupted 180° Golf Course Views',
      'Double Height Grand Lobby with Italian Marble',
      'Smart Thermostats & Keyless Entry Locks',
      '2 Large Master Suites with Hardwood Oak Flooring',
      'Zero Vehicular Movement on Ground Level',
      'Fast Connectivity to Upcoming Jewar Airport'
    ],
    amenities: [
      'Championship Golf Academy Access',
      'Olympic Size Lap Pool',
      'Squash Courts & Yoga Studio',
      'Fine Dining Clubhouse Restaurant',
      'Creche & Children Play Pavilion',
      'Doctor-on-Call & Pharmacy Station'
    ],
    developer: 'Elysian Living Group',
    possession: 'Immediate Handover'
  },
  {
    id: 'prop-107',
    title: 'Avenue 62 High-Street Retail & Dining',
    type: PROPERTY_TYPES.COMMERCIAL,
    categoryKey: 'commercial',
    location: 'Noida',
    subLocation: 'Sector 62 Institutional & Retail Hub',
    price: '₹ 1.95 Cr',
    priceRaw: 19500000,
    area: '950 sq.ft High-Footfall Retail',
    bedrooms: 'Double Height Retail Shop',
    badge: 'High ROI',
    status: 'Under Construction',
    featured: false,
    isInvestment: true,
    expectedYield: '9.1% Projected Rental Yield',
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An open-to-sky experiential retail destination catering to over 200,000 working corporate professionals and high-density residential towers in Sector 62. Double height frontage suitable for luxury fashion, restaurants, or anchor brands.',
    features: [
      '18ft Clear Floor-to-Ceiling Retail Height (Mezzanine feasible)',
      'Direct Visibility from Main 45-Meter Sector Road',
      'Plaza with Water Fountains & Musical Promenade',
      'Low Maintenance Open Concept Architecture',
      'Catchment of over 20 Top IT & Tech Parks in 2km radius',
      'Ample Multi-Level Parking for 1,200 Cars'
    ],
    amenities: [
      'Alfresco Terrace Dining Spaces',
      'High-Speed Escalators on Every Level',
      'Centralized Air Conditioned Corridors',
      '24/7 Security & CCTV Analytics',
      'Dedicated Logistics & Loading Docks',
      'High Speed Wi-Fi Enabled Common Areas'
    ],
    developer: 'Avenue Commercial Assets',
    possession: 'Possession in Q1 2027'
  },
  {
    id: 'prop-108',
    title: 'The Orchard Estate Villa — Sector 9',
    type: PROPERTY_TYPES.RESIDENCE,
    categoryKey: 'residence',
    location: 'Chandigarh',
    subLocation: 'Sector 9, Prime Heritage Belt',
    price: '₹ 14.20 Cr',
    priceRaw: 142000000,
    area: '5,800 sq.ft Built-Up',
    bedrooms: '5 BHK Signature Villa on 1 Kanal Plot',
    badge: 'Exclusive',
    status: 'Ready to Move',
    featured: true,
    isInvestment: false,
    expectedYield: '4.5% Rental Yield',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753104-685f4f24cb4d?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A bespoke 1-Kanal villa inspired by Le Corbusier modernism combined with warm contemporary minimalist interiors. Features a private courtyard, reflective water mirror, solar glass windows, and mature manicured lawns.',
    features: [
      '1 Kanal (500 sq.yd) Freehold Land with Clear Ownership',
      'Double Glazed Floor-to-Ceiling Glass Walls',
      'Custom Teakwood & Travertine Finishings Throughout',
      'Temperature Controlled Wine Cellar & Cigar Room',
      'Private Swimming Pool with Wooden Deck & Barbecue Pit',
      'Staff Quarters for 3 Helpers with Separate Service Access'
    ],
    amenities: [
      'Private Heated Lap Pool',
      'Solar 15kW Inverter Grid',
      'Fully Landscaped Japanese Zen Garden',
      'Automated Raindrop Retractable Canopy',
      'Smart Home Security & Perimeter Sensors',
      'Covered Garage for 4 Vehicles'
    ],
    developer: 'Corbusier Signature Homes',
    possession: 'Ready for Immediate Move-in'
  },
  {
    id: 'prop-109',
    title: 'Yamuna Aerocity Commercial Plaza',
    type: PROPERTY_TYPES.COMMERCIAL,
    categoryKey: 'commercial',
    location: 'Greater Noida',
    subLocation: 'Sector 22D, Yamuna Expressway (Near Jewar Airport)',
    price: '₹ 3.10 Cr',
    priceRaw: 31000000,
    area: '1,850 sq.ft Commercial Space',
    bedrooms: 'Retail / Corporate Suites',
    badge: 'High Growth',
    status: 'Under Construction',
    featured: false,
    isInvestment: true,
    expectedYield: '11.5% Projected ROI post Airport Launch',
    images: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Located strategically on the 100-meter Yamuna Expressway corridor only 15 minutes from the upcoming Noida International Airport (Jewar). An unparalleled high-potential asset tailored for early-mover investors seeking multi-fold capital appreciation.',
    features: [
      'Located on 100-meter Wide Expressway Service Corridor',
      '15 Minutes from Jewar International Airport',
      'Opposite Proposed Formula 1 / Film City Zone',
      'Flexible Layouts for Showrooms, Offices & Boutique Hotels',
      'Full YEIDA Approved Master Plan Development',
      'Assured Lease Assistance by Global Property Consultants'
    ],
    amenities: [
      'Grand Atrium with Skylight',
      'Multi-cuisine Food Court Level',
      'High-Speed Fibre Internet Grid',
      'Conference & Business Meeting Centre',
      'Multi-Level Basement Parking',
      '24/7 Security Operations Centre'
    ],
    developer: 'Aerotropolis Realty',
    possession: 'Possession in Q3 2026'
  },
  {
    id: 'prop-110',
    title: 'Emerald Pine Estate Plots — New Chandigarh',
    type: PROPERTY_TYPES.PLOTS,
    categoryKey: 'plots',
    location: 'Chandigarh',
    subLocation: 'Mullanpur, New Chandigarh Corridor',
    price: '₹ 1.65 Cr',
    priceRaw: 16500000,
    area: '300 sq.yd (2,700 sq.ft)',
    bedrooms: 'Plotted Residential Land',
    badge: 'New Launch',
    status: 'Ready for Possession',
    featured: false,
    isInvestment: true,
    expectedYield: '15% Projected Capital Appreciation',
    images: [
      'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Nestled against the picturesque Shivalik foothills in New Chandigarh. Premium gated plotted community with eco-friendly infrastructure, underground storm water drainage, manicured walking tracks, and unpolluted fresh air.',
    features: [
      'Unobstructed Shivalik Foothill Views',
      'Approved by GMADA with Clear Title Guarantee',
      'Gated Community with 24/7 Security Patrols',
      'Underground Fiber Optic & Electricity Setup',
      'Immediate Registry with Immediate Building Approvals',
      'Only 15 Minutes Drive from Sector 17 Chandigarh'
    ],
    amenities: [
      'Eco-Park & Organic Garden',
      'Tennis & Basketball Courts',
      'Grand Club with Infinity Pool',
      'Senior Citizen Pavilion',
      'Cycling Track & Forest Walk',
      'Commercial Convenience Arcade'
    ],
    developer: 'Shivalik Greens & Estates',
    possession: 'Immediate Registry'
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: 't-1',
    quote: "Aurelia's property advisors found us our dream penthouse on Golf Course Road in under three weeks. The transparency, curated options, and negotiation guidance were flawless.",
    name: 'Vikramaditya & Rohini Singhania',
    location: 'Gurgaon, Haryana',
    role: 'Luxury Homeowners — The Solitaire'
  },
  {
    id: 't-2',
    quote: "As an NRI investor based in London, acquiring pre-leased Grade-A commercial spaces in Cyber City seemed daunting. The advisory team handled the due diligence, legal verification, and paperwork seamlessly.",
    name: 'Sanjay Mehra',
    location: 'London / Delhi',
    role: 'Institutional Portfolio Investor'
  },
  {
    id: 't-3',
    quote: "The plotted land advisory team steered us toward high-appreciation zones along the Yamuna Expressway before prices skyrocketed. Our investment has already grown 45% in 18 months.",
    name: 'Dr. Anandita Verma',
    location: 'Noida, UP',
    role: 'Land & Plotted Investor'
  },
  {
    id: 't-4',
    quote: "What sets them apart is they don't push random listings. They listen carefully to your budget and lifestyle preferences and only bring verified, high-caliber properties to the table.",
    name: 'Harpreet Singh Dhillon',
    location: 'Chandigarh',
    role: 'Villa Owner — Sector 9'
  }
];

export const INVESTMENT_HIGHLIGHTS = [
  {
    id: 'inv-1',
    title: 'Pre-Leased Commercial Assets',
    subtitle: '8% - 10% Immediate Net Yield',
    description: 'Acquire lockable office suites and high-street retail tenanted by Fortune 500 multinationals with long-term lock-in and structured rental escalations.',
    badge: 'Stable Cash Flow',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    type: 'Commercial'
  },
  {
    id: 'inv-2',
    title: 'Expressway Plotted Corridors',
    subtitle: '18% - 25% Projected Capital Growth',
    description: 'High-appreciation DTCP & GMADA approved plots located strategically around upcoming airports, rapid rail corridors, and economic hubs.',
    badge: 'High Appreciation',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
    type: 'Plots'
  },
  {
    id: 'inv-3',
    title: 'Ultra-Luxury Signature Residences',
    subtitle: 'Generational Wealth Assets',
    description: 'Exclusive sky villas and independent estate homes in prime micro-markets with scarce land supply, ensuring enduring value and prestigious living.',
    badge: 'Prime Capital Growth',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
    type: 'Residence'
  }
];
