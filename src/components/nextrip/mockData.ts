import { Bus, BoardingDroppingPoint, Seat, SavedPassenger, Coupon, Booking } from './types';

// Saved Passengers for 1-Click fast fill
export const INITIAL_SAVED_PASSENGERS: SavedPassenger[] = [
  {
    id: 'sp-1',
    name: 'Dileep Sai Galla',
    age: 24,
    gender: 'Male',
    phone: '+91 98765 43210',
    email: 'dileepgalla200056@gmail.com',
    isPrimary: true
  },
  {
    id: 'sp-2',
    name: 'Priya Sharma',
    age: 23,
    gender: 'Female',
    phone: '+91 98123 45678',
    email: 'priya.sharma@example.com'
  },
  {
    id: 'sp-3',
    name: 'Rajesh Kumar',
    age: 32,
    gender: 'Male',
    phone: '+91 94455 66778',
    email: 'rajesh.kumar@example.com'
  },
  {
    id: 'sp-4',
    name: 'Sneha Reddy',
    age: 21,
    gender: 'Female',
    phone: '+91 91234 56789',
    email: 'sneha.reddy@example.com'
  }
];

// Coupons Vault
export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'NEXTRIP50',
    title: '50% Mega Travel Deal',
    description: 'Get 50% discount on all premium sleeper and AC buses',
    discountPercent: 50,
    maxDiscount: 500,
    minBooking: 1000,
    validTill: '31 Dec 2026'
  },
  {
    code: 'FIRSTBUS',
    title: 'First Trip Bonus',
    description: 'Flat ₹250 instant discount on your first booking',
    flatDiscount: 250,
    minBooking: 800,
    validTill: '30 Nov 2026'
  },
  {
    code: 'FESTIVE300',
    title: 'Special Festive Bonanza',
    description: 'Flat ₹300 OFF on booking 2 or more seats',
    flatDiscount: 300,
    minBooking: 1500,
    validTill: '15 Oct 2026'
  },
  {
    code: 'WOMENSAFE',
    title: 'Women Solo Traveler Special',
    description: 'Flat ₹200 OFF on all Women-Preferred seats with free insurance',
    flatDiscount: 200,
    minBooking: 1000,
    validTill: '31 Dec 2026'
  }
];

// City Boarding Points Catalog
export const CITY_POINTS: Record<string, { boarding: BoardingDroppingPoint[]; dropping: BoardingDroppingPoint[] }> = {
  'hyderabad': {
    boarding: [
      { id: 'bp-hyd-1', location: 'Ameerpet Metro Hub', time: '08:00 PM', landmark: 'Opposite Big Bazaar' },
      { id: 'bp-hyd-2', location: 'Lakdikapul Bus Stand', time: '08:30 PM', landmark: 'Near Police Control Room' },
      { id: 'bp-hyd-3', location: 'Mehdipatnam Pillar 42', time: '09:00 PM', landmark: 'Under PVNR Expressway' },
      { id: 'bp-hyd-4', location: 'Gachibowli Outer Ring Road', time: '09:30 PM', landmark: 'Near ORR Junction' },
      { id: 'bp-hyd-5', location: 'Miyapur Allwyn X Road', time: '09:50 PM', landmark: 'Near Metro Station Pillar 12' }
    ],
    dropping: [
      { id: 'dp-hyd-1', location: 'Ameerpet Metro', time: '06:30 AM', landmark: 'Opp Metro Pillar 1045' },
      { id: 'dp-hyd-2', location: 'MGBS Central Bus Station', time: '07:00 AM', landmark: 'Platform 5 Arrival' },
      { id: 'dp-hyd-3', location: 'Secunderabad Railway Station', time: '07:30 AM', landmark: 'Opp Gurudwara' },
      { id: 'dp-hyd-4', location: 'Gachibowli Bio Diversity', time: '08:00 AM', landmark: 'Flyover Entry' }
    ]
  },
  'secunderabad': {
    boarding: [
      { id: 'bp-sec-1', location: 'Secunderabad Railway Stn Gate 1', time: '08:15 PM', landmark: 'Near Rathifile Bus Stand' },
      { id: 'bp-sec-2', location: 'Paradise Circle', time: '08:45 PM', landmark: 'Opposite Fire Station' },
      { id: 'bp-sec-3', location: 'Kukatpally Y Junction', time: '09:20 PM', landmark: 'Beside Metro Station' }
    ],
    dropping: [
      { id: 'dp-sec-1', location: 'Secunderabad East Metro', time: '06:45 AM', landmark: 'Main Gate Arrival' },
      { id: 'dp-sec-2', location: 'Paradise Junction', time: '07:15 AM', landmark: 'Near Swimming Pool' }
    ]
  },
  'pune': {
    boarding: [
      { id: 'bp-pn-1', location: 'Swargate Bus Terminal', time: '07:00 PM', landmark: 'Platform 3 Departure' },
      { id: 'bp-pn-2', location: 'Pune Railway Station', time: '07:45 PM', landmark: 'Near Jahangir Hospital' },
      { id: 'bp-pn-3', location: 'Viman Nagar Flyover', time: '08:30 PM', landmark: 'Near Phoenix Mall' },
      { id: 'bp-pn-4', location: 'Wakad Bridge', time: '09:15 PM', landmark: 'Ginger Hotel Junction' },
      { id: 'bp-pn-5', location: 'Hinjewadi Phase 1 Bridge', time: '09:45 PM', landmark: 'Near Infosys Circle' }
    ],
    dropping: [
      { id: 'dp-pn-1', location: 'Hadapsar Magarpatta City', time: '06:15 AM', landmark: 'Opposite Mega Centre' },
      { id: 'dp-pn-2', location: 'Swargate Junction', time: '06:45 AM', landmark: 'Near Laxmi Narayan Theater' },
      { id: 'dp-pn-3', location: 'Pune Station Dhole Patil Rd', time: '07:00 AM', landmark: 'Near Alankar Cinema' },
      { id: 'dp-pn-4', location: 'Wakad Highway Flyover', time: '07:25 AM', landmark: 'Near Bhujbal Chowk' },
      { id: 'dp-pn-5', location: 'Hinjewadi IT Park Shivaji Chowk', time: '07:45 AM', landmark: 'Near Wipro Circle' }
    ]
  },
  'guntur': {
    boarding: [
      { id: 'bp-gun-1', location: 'Guntur RTC Bus Stand', time: '08:00 PM', landmark: 'Opposite RTC Complex' },
      { id: 'bp-gun-2', location: 'Autonagar Bypass', time: '08:30 PM', landmark: 'Near Toll Plaza' },
      { id: 'bp-gun-3', location: 'Collector Office Road', time: '08:50 PM', landmark: 'Near Jinnah Tower' }
    ],
    dropping: [
      { id: 'dp-gun-1', location: 'Guntur Bus Stand Terminal', time: '05:45 AM', landmark: 'Platform 1' },
      { id: 'dp-gun-2', location: 'NTR Stadium Circle', time: '06:15 AM', landmark: 'Beside Municipal Office' },
      { id: 'dp-gun-3', location: 'Autonagar Bypass Point', time: '06:40 AM', landmark: 'Highway Cross' }
    ]
  },
  'chennai': {
    boarding: [
      { id: 'bp-chn-1', location: 'Koyambedu CMBT Hub', time: '07:30 PM', landmark: 'Platform 4 Private Buses' },
      { id: 'bp-chn-2', location: 'Guindy Asiad Bus Terminus', time: '08:15 PM', landmark: 'Near Metro Station' },
      { id: 'bp-chn-3', location: 'Tambaram Sanatorium', time: '09:00 PM', landmark: 'Opposite Railway Station' },
      { id: 'bp-chn-4', location: 'Perungalathur Bypass', time: '09:30 PM', landmark: 'Near Bus Stop' }
    ],
    dropping: [
      { id: 'dp-chn-1', location: 'Koyambedu CMBT Terminal', time: '06:00 AM', landmark: 'In-gate Arrival' },
      { id: 'dp-chn-2', location: 'Guindy Flyover Exit', time: '06:30 AM', landmark: 'Kathipara Junction' },
      { id: 'dp-chn-3', location: 'Tambaram Railway Station', time: '07:00 AM', landmark: 'East Gate' }
    ]
  },
  'bengaluru': {
    boarding: [
      { id: 'bp-blr-1', location: 'Majestic KBS Terminal', time: '07:45 PM', landmark: 'Platform 14 Departure' },
      { id: 'bp-blr-2', location: 'Silk Board Junction', time: '08:30 PM', landmark: 'Near Petrol Bunk' },
      { id: 'bp-blr-3', location: 'Electronic City Toll Gate', time: '09:00 PM', landmark: 'Phase 1 Entry' },
      { id: 'bp-blr-4', location: 'Marathahalli Multiplex', time: '09:30 PM', landmark: 'Near Bridge' }
    ],
    dropping: [
      { id: 'dp-blr-1', location: 'Hebbal Flyover', time: '05:30 AM', landmark: 'Near Esteem Mall' },
      { id: 'dp-blr-2', location: 'Majestic Bus Terminal', time: '06:15 AM', landmark: 'Platform 2' },
      { id: 'dp-blr-3', location: 'Koramangala Sony World Signal', time: '06:45 AM', landmark: '100ft Road' },
      { id: 'dp-blr-4', location: 'Silk Board Junction', time: '07:15 AM', landmark: 'Flyover Pillar 5' }
    ]
  },
  'vijayawada': {
    boarding: [
      { id: 'bp-vjw-1', location: 'Pandit Nehru Bus Station (PNBS)', time: '08:00 PM', landmark: 'Departure Block B' },
      { id: 'bp-vjw-2', location: 'Benz Circle Highway Hub', time: '08:30 PM', landmark: 'Near Jyothi Mall' },
      { id: 'bp-vjw-3', location: 'Ramavarappadu Ring', time: '09:00 PM', landmark: 'Beside Flyover' }
    ],
    dropping: [
      { id: 'dp-vjw-1', location: 'Benz Circle Highway', time: '05:30 AM', landmark: 'Near Sweet Magic' },
      { id: 'dp-vjw-2', location: 'PNBS Central Terminal', time: '06:00 AM', landmark: 'Platform 18' },
      { id: 'dp-vjw-3', location: 'Bhavanipuram Flyover', time: '06:30 AM', landmark: 'Opposite Police Station' }
    ]
  },
  'mumbai': {
    boarding: [
      { id: 'bp-mum-1', location: 'Dadar Asiad Terminus', time: '06:30 PM', landmark: 'Near TT Circle' },
      { id: 'bp-mum-2', location: 'Chembur Maitri Park', time: '07:15 PM', landmark: 'Under Monorail Station' },
      { id: 'bp-mum-3', location: 'Vashi Plaza Highway', time: '08:00 PM', landmark: 'Near Center One Mall' },
      { id: 'bp-mum-4', location: 'Kalamboli McDonald Circle', time: '08:45 PM', landmark: 'Expressway Starting Point' }
    ],
    dropping: [
      { id: 'dp-mum-1', location: 'Vashi Toll Plaza', time: '06:15 AM', landmark: 'Expressway End' },
      { id: 'dp-mum-2', location: 'Maitri Park Chembur', time: '06:45 AM', landmark: 'Eastern Express Highway' },
      { id: 'dp-mum-3', location: 'Dadar TT Circle Terminal', time: '07:30 AM', landmark: 'Swami Narayan Temple' },
      { id: 'dp-mum-4', location: 'Borivali National Park Gate', time: '08:15 AM', landmark: 'Western Express Highway' }
    ]
  }
};

// Realistic bus operators mentioned in requirements
export const OPERATOR_TEMPLATES = [
  {
    operator: 'Vinayaka Travels',
    busName: 'Vinayaka Grand Multi-Axle Volvo 9600',
    busType: 'AC Sleeper 2+1',
    isAC: true,
    isSleeper: true,
    isSeater: false,
    hasWomenSafety: true,
    rating: 4.6,
    totalRatings: 1840,
    basePrice: 2049,
    originalPrice: 4098,
    discountBadge: '50% OFF',
    departureTime: '08:30 PM',
    arrivalTime: '07:00 AM',
    duration: '10h 30m',
    departurePeriod: 'evening' as const,
    amenities: ['Live GPS Tracking', 'Type-C Fast Charging', 'Sanitized Blankets', 'Water Bottle', 'Reading Light', 'CCTV Security', 'SOS Button', 'Emergency Exit']
  },
  {
    operator: 'Kumaran Travels',
    busName: 'Kumaran Royal Class Sleeper',
    busType: 'AC Sleeper 2+1',
    isAC: true,
    isSleeper: true,
    isSeater: false,
    hasWomenSafety: true,
    rating: 4.7,
    totalRatings: 2150,
    basePrice: 2199,
    originalPrice: 3200,
    discountBadge: '30% OFF',
    departureTime: '09:15 PM',
    arrivalTime: '07:30 AM',
    duration: '10h 15m',
    departurePeriod: 'night' as const,
    amenities: ['Personal LCD Screen', 'High-Speed Wi-Fi', 'Fresh Pillow & Duvet', 'Snack Box', 'Mineral Water', 'Charging Ports']
  },
  {
    operator: 'Tamil Nadu Travels',
    busName: 'TN Express BharatBenz Ultra Luxury',
    busType: 'AC Seater / Sleeper 2+1',
    isAC: true,
    isSleeper: true,
    isSeater: true,
    hasWomenSafety: true,
    rating: 4.5,
    totalRatings: 1320,
    basePrice: 1899,
    originalPrice: 2800,
    discountBadge: '32% OFF',
    departureTime: '07:45 PM',
    arrivalTime: '06:15 AM',
    duration: '10h 30m',
    departurePeriod: 'evening' as const,
    amenities: ['Air Suspension', 'Comfort Berths', 'Reading Lamps', 'Emergency Hammer', 'First Aid Kit']
  },
  {
    operator: 'SRS Travels',
    busName: 'SRS Club Class Multi-Axle Volvo',
    busType: 'AC Sleeper 2+1',
    isAC: true,
    isSleeper: true,
    isSeater: false,
    hasWomenSafety: true,
    rating: 4.8,
    totalRatings: 3400,
    basePrice: 2299,
    originalPrice: 3600,
    discountBadge: '35% OFF',
    departureTime: '10:00 PM',
    arrivalTime: '07:45 AM',
    duration: '09h 45m',
    departurePeriod: 'night' as const,
    amenities: ['Deep Cleaned Interiors', 'WiFi', 'Charging Sockets', 'Bottle Holder', 'Luggage Compartment']
  },
  {
    operator: 'Orange Tours & Travels',
    busName: 'Orange Diamond Sleeper Lounge',
    busType: 'AC Sleeper 2+1 (Double Axle)',
    isAC: true,
    isSleeper: true,
    isSeater: false,
    hasWomenSafety: true,
    rating: 4.9,
    totalRatings: 4210,
    basePrice: 2499,
    originalPrice: 4200,
    discountBadge: '40% OFF',
    departureTime: '06:30 PM',
    arrivalTime: '05:15 AM',
    duration: '10h 45m',
    departurePeriod: 'evening' as const,
    amenities: ['Reclining Sleeper Bed', 'Individual AC Vents', 'Noise Cancelling Cabins', 'Free Refreshments', 'Live Location Sharing']
  },
  {
    operator: 'VRL Logistics Star',
    busName: 'VRL I-Shift Volvo Multi-Axle',
    busType: 'AC Seater Multi-Axle 2+2',
    isAC: true,
    isSleeper: false,
    isSeater: true,
    hasWomenSafety: false,
    rating: 4.4,
    totalRatings: 2890,
    basePrice: 1450,
    originalPrice: 2100,
    discountBadge: '30% OFF',
    departureTime: '06:00 AM',
    arrivalTime: '04:30 PM',
    duration: '10h 30m',
    departurePeriod: 'morning' as const,
    amenities: ['Ergonomic Pushback Seats', 'Leg Rest Extender', 'USB Ports', 'Bottle Holder', 'GPS Tracking']
  },
  {
    operator: 'Kaveri Travels',
    busName: 'Kaveri Platinum Sleeper',
    busType: 'AC Sleeper 2+1',
    isAC: true,
    isSleeper: true,
    isSeater: false,
    hasWomenSafety: true,
    rating: 4.6,
    totalRatings: 1650,
    basePrice: 2099,
    originalPrice: 3100,
    discountBadge: '32% OFF',
    departureTime: '09:45 PM',
    arrivalTime: '08:00 AM',
    duration: '10h 15m',
    departurePeriod: 'night' as const,
    amenities: ['Memory Foam Mattresses', 'Blanket Set', 'USB-C Charging', 'Emergency SOS', 'Clean Rest Stop']
  },
  {
    operator: 'Morning Star Travels',
    busName: 'Morning Star Gold Class',
    busType: 'AC Sleeper / Seater 2+1',
    isAC: true,
    isSleeper: true,
    isSeater: true,
    hasWomenSafety: true,
    rating: 4.5,
    totalRatings: 1980,
    basePrice: 1950,
    originalPrice: 2750,
    discountBadge: '28% OFF',
    departureTime: '01:30 PM',
    arrivalTime: '11:45 PM',
    duration: '10h 15m',
    departurePeriod: 'afternoon' as const,
    amenities: ['LED Lighting', 'Cup Holder', 'Luggage Tagging', '24x7 Driver Assist', 'Sanitizer Dispenser']
  },
  {
    operator: 'Intrcity SmartBus',
    busName: 'Intrcity AI Smart Sleeper',
    busType: 'AC Sleeper 2+1 with Smart Lounge',
    isAC: true,
    isSleeper: true,
    isSeater: false,
    hasWomenSafety: true,
    rating: 4.8,
    totalRatings: 3120,
    basePrice: 2350,
    originalPrice: 3800,
    discountBadge: '38% OFF',
    departureTime: '10:30 PM',
    arrivalTime: '08:45 AM',
    duration: '10h 15m',
    departurePeriod: 'night' as const,
    amenities: ['Smart Air Purifier', 'Captain on Board', 'Lounge Access at Hub', 'Automatic Temperature Control', 'Private Privacy Curtains']
  },
  {
    operator: 'Jabbar Travels',
    busName: 'Jabbar Royal Super Deluxe',
    busType: 'Non-AC Sleeper / Seater 2+1',
    isAC: false,
    isSleeper: true,
    isSeater: true,
    hasWomenSafety: false,
    rating: 4.2,
    totalRatings: 940,
    basePrice: 1299,
    originalPrice: 1750,
    discountBadge: '25% OFF',
    departureTime: '08:15 PM',
    arrivalTime: '06:45 AM',
    duration: '10h 30m',
    departurePeriod: 'evening' as const,
    amenities: ['Wide Berths', 'Luggage Space', 'Curtains', 'Mobile Charging']
  },
  {
    operator: 'Dhanunjaya Travels',
    busName: 'Dhanunjaya Scania Multi-Axle',
    busType: 'AC Sleeper 2+1',
    isAC: true,
    isSleeper: true,
    isSeater: false,
    hasWomenSafety: true,
    rating: 4.6,
    totalRatings: 1540,
    basePrice: 2150,
    originalPrice: 3200,
    discountBadge: '33% OFF',
    departureTime: '09:00 PM',
    arrivalTime: '07:15 AM',
    duration: '10h 15m',
    departurePeriod: 'night' as const,
    amenities: ['Scania Hydro Air Suspension', 'Personal Reading Lamps', 'CCTV Security', 'Emergency Call Button']
  },
  {
    operator: 'SVR Travels',
    busName: 'SVR Executive Liner',
    busType: 'AC Seater Pushback 2+2',
    isAC: true,
    isSleeper: false,
    isSeater: true,
    hasWomenSafety: false,
    rating: 4.3,
    totalRatings: 1120,
    basePrice: 1399,
    originalPrice: 1999,
    discountBadge: '30% OFF',
    departureTime: '02:00 PM',
    arrivalTime: '11:55 PM',
    duration: '09h 55m',
    departurePeriod: 'afternoon' as const,
    amenities: ['Comfort Recliners', 'Footrest', 'Audio Entertainment', 'Reading Lamp']
  }
];

// Generate dynamic realistic seat layout for a bus with varying prices
export function generateRealisticSeats(basePrice: number, busType: string): Seat[] {
  const seats: Seat[] = [];
  const isSleeperOnly = busType.toLowerCase().includes('sleeper') && !busType.toLowerCase().includes('seater');

  // Lower Deck (Seats L1 to L15 or Seater / Sleeper berths)
  // Left side: Single column (L1, L4, L7, L10, L13)
  // Right side: Double column (L2, L3, L5, L6, L8, L9, L11, L12, L14, L15)
  const lowerReservedIds = ['L2', 'L5', 'L9', 'L14', 'B2'];
  const lowerWomenReservedIds = ['L1', 'L7'];

  // Lower Deck configuration
  const rows = 5;
  for (let r = 1; r <= rows; r++) {
    // Left single seat/berth
    const leftId = `L${(r - 1) * 3 + 1}`;
    const leftStatus = lowerReservedIds.includes(leftId) 
      ? 'reserved' 
      : lowerWomenReservedIds.includes(leftId) 
      ? 'women_reserved' 
      : 'available';
    
    // Starting lower standard price is basePrice (e.g. ₹2,049), front rows slightly premium
    const leftPrice = r === 1 ? basePrice + 150 : r <= 3 ? basePrice : basePrice - 50;

    seats.push({
      id: leftId,
      number: `LB${r}A`,
      deck: 'lower',
      category: isSleeperOnly ? 'sleeper' : (r <= 2 ? 'sleeper' : 'seater'),
      row: r,
      col: 1,
      status: leftStatus,
      price: leftPrice,
      isWindow: true,
      isSingle: true,
      berthType: isSleeperOnly ? 'Lower Single Sleeper' : (r <= 2 ? 'Lower Sleeper' : 'Lower Seater')
    });

    // Right double seats/berths
    const rightId1 = `L${(r - 1) * 3 + 2}`;
    const rightId2 = `L${(r - 1) * 3 + 3}`;

    const rightStatus1 = lowerReservedIds.includes(rightId1) ? 'reserved' : 'available';
    const rightStatus2 = lowerReservedIds.includes(rightId2) ? 'reserved' : 'available';

    const rightPrice1 = r === 1 ? basePrice + 100 : basePrice;
    const rightPrice2 = r === 1 ? basePrice + 150 : basePrice + 50;

    seats.push({
      id: rightId1,
      number: `LB${r}B`,
      deck: 'lower',
      category: isSleeperOnly ? 'sleeper' : 'seater',
      row: r,
      col: 3,
      status: rightStatus1,
      price: rightPrice1,
      isWindow: false,
      isSingle: false,
      berthType: isSleeperOnly ? 'Lower Aisle Sleeper' : 'Lower Aisle Seater'
    });

    seats.push({
      id: rightId2,
      number: `LB${r}C`,
      deck: 'lower',
      category: isSleeperOnly ? 'sleeper' : 'seater',
      row: r,
      col: 4,
      status: rightStatus2,
      price: rightPrice2,
      isWindow: true,
      isSingle: false,
      berthType: isSleeperOnly ? 'Lower Window Sleeper' : 'Lower Window Seater'
    });
  }

  // Upper Deck (Sleeper berths U1 to U15)
  const upperReservedIds = ['U3', 'U6', 'U10', 'U12'];
  const upperWomenReservedIds = ['U1', 'U7'];

  for (let r = 1; r <= rows; r++) {
    // Upper Single Sleeper (Left)
    const uLeftId = `U${(r - 1) * 3 + 1}`;
    const uLeftStatus = upperReservedIds.includes(uLeftId) 
      ? 'reserved' 
      : upperWomenReservedIds.includes(uLeftId) 
      ? 'women_reserved' 
      : 'available';
    
    // Upper single sleeper price (e.g. ₹2,099 to ₹2,499)
    const uLeftPrice = r === 1 ? basePrice + 450 : r <= 3 ? basePrice + 250 : basePrice + 50;

    seats.push({
      id: uLeftId,
      number: `UB${r}A`,
      deck: 'upper',
      category: r === 1 ? 'vip_sleeper' : 'single_sleeper',
      row: r,
      col: 1,
      status: uLeftStatus,
      price: uLeftPrice,
      isWindow: true,
      isSingle: true,
      berthType: r === 1 ? 'VIP Upper Single Berth' : 'Upper Single Sleeper'
    });

    // Upper Double Sleeper (Right Aisle & Window)
    const uRightId1 = `U${(r - 1) * 3 + 2}`;
    const uRightId2 = `U${(r - 1) * 3 + 3}`;

    const uRightStatus1 = upperReservedIds.includes(uRightId1) ? 'reserved' : 'available';
    const uRightStatus2 = upperReservedIds.includes(uRightId2) ? 'reserved' : 'available';

    // Upper sleeper prices ranging from starting ₹2,099 up to ₹3,089 for VIP
    const uRightPrice1 = r === 1 ? basePrice + 700 : basePrice + 50; // Standard Upper Sleeper ₹2,099
    const uRightPrice2 = r === 1 ? 3089 : basePrice + 100; // Maximum VIP price around ₹3,089

    seats.push({
      id: uRightId1,
      number: `UB${r}B`,
      deck: 'upper',
      category: r === 1 ? 'vip_sleeper' : 'sleeper',
      row: r,
      col: 3,
      status: uRightStatus1,
      price: uRightPrice1,
      isWindow: false,
      isSingle: false,
      berthType: r === 1 ? 'VIP Panoramic Sleeper' : 'Upper Aisle Sleeper'
    });

    seats.push({
      id: uRightId2,
      number: `UB${r}C`,
      deck: 'upper',
      category: r === 1 ? 'vip_sleeper' : 'sleeper',
      row: r,
      col: 4,
      status: uRightStatus2,
      price: uRightPrice2,
      isWindow: true,
      isSingle: false,
      berthType: r === 1 ? 'VIP Captain Upper Sleeper' : 'Upper Window Sleeper'
    });
  }

  return seats;
}

// Generate at least 10+ realistic buses dynamically for any query
export function generateBusesForRoute(fromCity: string, toCity: string, date: string, isWomenPreferred: boolean = false): Bus[] {
  const fromNorm = (fromCity || 'Hyderabad').toLowerCase().trim();
  const toNorm = (toCity || 'Pune').toLowerCase().trim();

  // Get matching points or default
  const fromPoints = CITY_POINTS[fromNorm]?.boarding || [
    { id: 'bp-gen-1', location: `${fromCity} Central Station Bus Bay`, time: '08:30 PM', landmark: 'Main Entrance' },
    { id: 'bp-gen-2', location: `${fromCity} Highway Toll Cross`, time: '09:15 PM', landmark: 'Near Fuel Station' },
    { id: 'bp-gen-3', location: `${fromCity} Ring Road Junction`, time: '09:45 PM', landmark: 'Beside Flyover' }
  ];

  const toPoints = CITY_POINTS[toNorm]?.dropping || [
    { id: 'dp-gen-1', location: `${toCity} Highway Entrance Bridge`, time: '06:30 AM', landmark: 'City Border' },
    { id: 'dp-gen-2', location: `${toCity} Central Terminal Platform 2`, time: '07:15 AM', landmark: 'Main Bus Station' },
    { id: 'dp-gen-3', location: `${toCity} IT Park / Station Circle`, time: '07:50 AM', landmark: 'Near Metro Gate' }
  ];

  return OPERATOR_TEMPLATES.map((tmpl, idx) => {
    const busSeats = generateRealisticSeats(tmpl.basePrice, tmpl.busType);
    const availableSeats = busSeats.filter(s => s.status === 'available' || (isWomenPreferred && s.status === 'women_reserved')).length;

    // Adjust departure and arrival time markers per operator
    const busId = `bus-${fromNorm}-${toNorm}-${idx + 1}`;

    return {
      id: busId,
      operator: tmpl.operator,
      busName: tmpl.busName,
      busType: tmpl.busType,
      isAC: tmpl.isAC,
      isSleeper: tmpl.isSleeper,
      isSeater: tmpl.isSeater,
      hasWomenSafety: tmpl.hasWomenSafety || isWomenPreferred,
      departureTime: tmpl.departureTime,
      departureCity: fromCity || 'Hyderabad',
      arrivalTime: tmpl.arrivalTime,
      arrivalCity: toCity || 'Pune',
      duration: tmpl.duration,
      departurePeriod: tmpl.departurePeriod,
      availableSeatsCount: availableSeats > 0 ? availableSeats : 12,
      rating: tmpl.rating,
      totalRatings: tmpl.totalRatings,
      basePrice: tmpl.basePrice,
      originalPrice: tmpl.originalPrice,
      discountBadge: tmpl.discountBadge,
      amenities: tmpl.amenities,
      boardingPoints: fromPoints,
      droppingPoints: toPoints,
      seats: busSeats
    };
  });
}

// Initial Sample Bookings for "My Bookings"
export const INITIAL_BOOKINGS: Booking[] = [
  {
    bookingId: 'NXT-HYD-PUN-8821',
    pnr: 'NXT-2026-8821',
    bus: {
      id: 'bus-sample-1',
      operator: 'Vinayaka Travels',
      busName: 'Vinayaka Grand Multi-Axle Volvo 9600',
      busType: 'AC Sleeper 2+1',
      isAC: true,
      isSleeper: true,
      isSeater: false,
      hasWomenSafety: true,
      departureTime: '08:30 PM',
      departureCity: 'Hyderabad',
      arrivalTime: '07:00 AM',
      arrivalCity: 'Pune',
      duration: '10h 30m',
      departurePeriod: 'evening',
      availableSeatsCount: 28,
      rating: 4.6,
      totalRatings: 1840,
      basePrice: 2049,
      originalPrice: 4098,
      discountBadge: '50% OFF',
      amenities: ['Live GPS Tracking', 'Type-C Fast Charging', 'Sanitized Blankets', 'Water Bottle'],
      boardingPoints: CITY_POINTS['hyderabad'].boarding,
      droppingPoints: CITY_POINTS['pune'].dropping,
      seats: []
    },
    selectedSeats: [
      {
        id: 'L4',
        number: 'LB2A',
        deck: 'lower',
        category: 'sleeper',
        row: 2,
        col: 1,
        status: 'selected',
        price: 2049,
        isWindow: true,
        isSingle: true,
        berthType: 'Lower Berth (Single Sleeper)'
      }
    ],
    route: {
      from: 'Hyderabad',
      to: 'Pune'
    },
    travelDate: '25 Sep 2026',
    pickupPoint: {
      id: 'bp-hyd-1',
      location: 'Ameerpet Metro Hub',
      time: '08:30 PM',
      landmark: 'Opposite Big Bazaar'
    },
    dropPoint: {
      id: 'dp-pn-2',
      location: 'Swargate Junction',
      time: '07:00 AM',
      landmark: 'Near Laxmi Narayan Theater'
    },
    passengers: [
      {
        seatId: 'L4',
        seatNumber: 'LB2A',
        name: 'Dileep Sai Galla',
        age: 24,
        gender: 'Male',
        phone: '+91 98765 43210',
        email: 'dileepgalla200056@gmail.com'
      }
    ],
    fare: {
      baseFare: 2049,
      seatSpecificPrice: 2049,
      gstAmount: 102,
      convenienceFee: 29,
      discountAmount: 200,
      couponDiscount: 300,
      totalPayable: 1680
    },
    couponCode: 'NEXTRIP50',
    paymentMethod: 'UPI / Google Pay',
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
    bookedAt: '28 Aug 2026, 10:14 PM'
  },
  {
    bookingId: 'NXT-SEC-GUN-4392',
    pnr: 'NXT-2026-4392',
    bus: {
      id: 'bus-sample-2',
      operator: 'Kumaran Travels',
      busName: 'Kumaran Royal Class Sleeper',
      busType: 'AC Sleeper 2+1',
      isAC: true,
      isSleeper: true,
      isSeater: false,
      hasWomenSafety: true,
      departureTime: '09:15 PM',
      departureCity: 'Secunderabad',
      arrivalTime: '05:45 AM',
      arrivalCity: 'Guntur',
      duration: '08h 30m',
      departurePeriod: 'night',
      availableSeatsCount: 18,
      rating: 4.7,
      totalRatings: 2150,
      basePrice: 1799,
      originalPrice: 2600,
      discountBadge: '30% OFF',
      amenities: ['High-Speed Wi-Fi', 'Fresh Pillow & Duvet', 'Mineral Water'],
      boardingPoints: CITY_POINTS['secunderabad'].boarding,
      droppingPoints: CITY_POINTS['guntur'].dropping,
      seats: []
    },
    selectedSeats: [
      {
        id: 'U1',
        number: 'UB1A',
        deck: 'upper',
        category: 'vip_sleeper',
        row: 1,
        col: 1,
        status: 'selected',
        price: 2099,
        isWindow: true,
        isSingle: true,
        berthType: 'Upper Berth (VIP Sleeper)'
      }
    ],
    route: {
      from: 'Secunderabad',
      to: 'Guntur'
    },
    travelDate: '12 Oct 2026',
    pickupPoint: {
      id: 'bp-sec-1',
      location: 'Secunderabad Railway Stn Gate 1',
      time: '09:15 PM',
      landmark: 'Near Rathifile Bus Stand'
    },
    dropPoint: {
      id: 'dp-gun-1',
      location: 'Guntur RTC Bus Stand',
      time: '05:45 AM',
      landmark: 'Platform 1'
    },
    passengers: [
      {
        seatId: 'U1',
        seatNumber: 'UB1A',
        name: 'Dileep Sai Galla',
        age: 24,
        gender: 'Male',
        phone: '+91 98765 43210',
        email: 'dileepgalla200056@gmail.com'
      }
    ],
    fare: {
      baseFare: 2099,
      seatSpecificPrice: 2099,
      gstAmount: 105,
      convenienceFee: 29,
      discountAmount: 150,
      couponDiscount: 250,
      totalPayable: 1833
    },
    couponCode: 'FIRSTBUS',
    paymentMethod: 'Credit Card (Visa •••• 8821)',
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
    bookedAt: '24 Aug 2026, 04:30 PM'
  }
];
