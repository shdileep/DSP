export type BusType = 'AC' | 'Non-AC' | 'Seater' | 'Sleeper' | 'All';

export interface BoardingDroppingPoint {
  id: string;
  location: string;
  time: string;
  landmark: string;
}

export type SeatDeck = 'lower' | 'upper';
export type SeatCategory = 'seater' | 'sleeper' | 'single_sleeper' | 'vip_sleeper';
export type SeatStatus = 'available' | 'reserved' | 'women_reserved' | 'selected';

export interface Seat {
  id: string;
  number: string;
  deck: SeatDeck;
  category: SeatCategory;
  row: number;
  col: number;
  status: SeatStatus;
  price: number;
  isWindow?: boolean;
  isSingle?: boolean;
  berthType: string; // e.g. 'Lower Berth', 'Upper Berth', 'Lower Seater', 'Upper Sleeper'
}

export interface Bus {
  id: string;
  operator: string;
  busName: string;
  busType: string; // e.g. 'AC Sleeper 2+1'
  isAC: boolean;
  isSleeper: boolean;
  isSeater: boolean;
  hasWomenSafety: boolean;
  departureTime: string; // '08:30 PM'
  departureCity: string;
  arrivalTime: string; // '07:00 AM'
  arrivalCity: string;
  duration: string; // '10h 30m'
  departurePeriod: 'morning' | 'afternoon' | 'evening' | 'night';
  availableSeatsCount: number;
  rating: number;
  totalRatings: number;
  basePrice: number;
  originalPrice: number;
  discountBadge: string; // '50% OFF'
  amenities: string[];
  boardingPoints: BoardingDroppingPoint[];
  droppingPoints: BoardingDroppingPoint[];
  seats: Seat[];
}

export interface SavedPassenger {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  isPrimary?: boolean;
}

export interface PassengerInfo {
  seatId: string;
  seatNumber: string;
  name: string;
  age: number | '';
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
}

export interface FareBreakdown {
  baseFare: number;
  seatSpecificPrice: number;
  gstAmount: number;
  convenienceFee: number;
  discountAmount: number;
  couponDiscount: number;
  totalPayable: number;
}

export interface Booking {
  bookingId: string;
  bus: Bus;
  selectedSeats: Seat[];
  route: {
    from: string;
    to: string;
  };
  travelDate: string;
  pickupPoint: BoardingDroppingPoint;
  dropPoint: BoardingDroppingPoint;
  passengers: PassengerInfo[];
  fare: FareBreakdown;
  couponCode?: string;
  paymentMethod: string;
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  bookingStatus: 'Confirmed' | 'Cancelled' | 'Completed';
  bookedAt: string;
  pnr: string;
}

export interface Coupon {
  code: string;
  title: string;
  description: string;
  discountPercent?: number;
  flatDiscount?: number;
  minBooking: number;
  maxDiscount?: number;
  validTill: string;
}

export type ActiveTab = 'search' | 'results' | 'seat_selection' | 'pickup_drop' | 'passenger_details' | 'fare_payment' | 'my_bookings' | 'my_trips' | 'offers' | 'transactions' | 'profile' | 'settings';
