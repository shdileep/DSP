import React, { useState, useEffect } from 'react';
import { Play, Pause, Sparkles, Navigation } from 'lucide-react';
import { 
  Bus, 
  BoardingDroppingPoint, 
  Seat, 
  PassengerInfo, 
  SavedPassenger, 
  Coupon, 
  Booking, 
  ActiveTab,
  FareBreakdown
} from './types';
import { 
  INITIAL_SAVED_PASSENGERS, 
  INITIAL_BOOKINGS, 
  generateBusesForRoute,
  AVAILABLE_COUPONS
} from './mockData';

// Subcomponents
import BusSearchHeader from './BusSearchHeader';
import BusSidebar from './BusSidebar';
import BusSearchView from './BusSearchView';
import BusResultsList from './BusResultsList';
import BusSeatSelection from './BusSeatSelection';
import PickupDropSelection from './PickupDropSelection';
import PassengerDetailsForm from './PassengerDetailsForm';
import FareSummaryCheckout from './FareSummaryCheckout';
import MyBookingsView from './MyBookingsView';
import OffersView from './OffersView';
import TransactionHistoryView from './TransactionHistoryView';
import ProfileView from './ProfileView';
import SettingsView from './SettingsView';

interface NextTripPCAppProps {
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  activeTabProp?: ActiveTab;
  onTabChangeProp?: (tab: ActiveTab) => void;
}

export default function NextTripPCApp({
  isFullscreen,
  onToggleFullscreen,
  activeTabProp,
  onTabChangeProp
}: NextTripPCAppProps) {
  // Navigation State
  const [internalTab, setInternalTab] = useState<ActiveTab>('search');
  const activeTab = activeTabProp !== undefined ? activeTabProp : internalTab;
  const setActiveTab = (tab: ActiveTab) => {
    setInternalTab(tab);
    if (onTabChangeProp) onTabChangeProp(tab);
  };

  // Search parameters
  const [fromCity, setFromCity] = useState<string>('Hyderabad');
  const [toCity, setToCity] = useState<string>('Pune');
  
  // Default to today's date
  const todayFormatted = new Date().toISOString().split('T')[0];
  const [travelDate, setTravelDate] = useState<string>(todayFormatted);
  const [busTypeFilter, setBusTypeFilter] = useState<string[]>(['AC', 'Sleeper']);
  const [isWomenPreferred, setIsWomenPreferred] = useState<boolean>(false);

  // Automated Exploration Tour State
  const [isAutoTouring, setIsAutoTouring] = useState<boolean>(true);
  const [tourStep, setTourStep] = useState<number>(0);
  const [isTypingFrom, setIsTypingFrom] = useState<boolean>(false);
  const [tourNotification, setTourNotification] = useState<string>('Auto-Tour: Typing Source Location');

  // Available buses list generated dynamically for current route (Guarantees 10+ buses)
  const [buses, setBuses] = useState<Bus[]>(() => {
    return generateBusesForRoute('Hyderabad', 'Pune', todayFormatted, false);
  });

  // Active Booking Flow State
  const [selectedBus, setSelectedBus] = useState<Bus | null>(() => {
    const list = generateBusesForRoute('Hyderabad', 'Pune', todayFormatted, false);
    return list[0] || null;
  });
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>(() => {
    const list = generateBusesForRoute('Hyderabad', 'Pune', todayFormatted, false);
    const bus = list[0];
    return bus?.seats?.filter(s => s.deck === 'lower').slice(0, 2) || [];
  });
  const [selectedPickup, setSelectedPickup] = useState<BoardingDroppingPoint | null>(() => {
    const list = generateBusesForRoute('Hyderabad', 'Pune', todayFormatted, false);
    return list[0]?.boardingPoints[0] || null;
  });
  const [selectedDrop, setSelectedDrop] = useState<BoardingDroppingPoint | null>(() => {
    const list = generateBusesForRoute('Hyderabad', 'Pune', todayFormatted, false);
    return list[0]?.droppingPoints[0] || null;
  });
  const [passengers, setPassengers] = useState<PassengerInfo[]>([
    {
      seatId: 'L4',
      seatNumber: 'L4 (Lower)',
      name: 'Dileep Sai Galla',
      age: '23',
      gender: 'Male',
      phone: '+91 98765 43210',
      email: 'dileepgalla200056@gmail.com'
    }
  ]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(AVAILABLE_COUPONS[0]); // Default festive coupon NEXTRIP50

  // Saved Passengers & Bookings History State
  const [savedPassengers, setSavedPassengers] = useState<SavedPassenger[]>(INITIAL_SAVED_PASSENGERS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  // Automated Exploration Sequence across all pages
  useEffect(() => {
    if (!isAutoTouring) return;

    // Fast, smooth, controlled tour step sequence
    const runTourStep = (step: number) => {
      switch (step) {
        case 0: {
          // 1. Reset to search view and type "Hyderabad"
          setActiveTab('search');
          setTourNotification('Typing "Hyderabad" in From field...');
          setIsTypingFrom(true);
          setFromCity('');
          const target = 'Hyderabad';
          let charIdx = 0;
          const typingInterval = setInterval(() => {
            charIdx++;
            setFromCity(target.slice(0, charIdx));
            if (charIdx >= target.length) {
              clearInterval(typingInterval);
              setIsTypingFrom(false);
            }
          }, 25);
          break;
        }
        case 1: {
          // 2. Select Date & Auto-Trigger Search
          setTourNotification('Selecting Date & Clicking Search...');
          setTravelDate(todayFormatted);
          setTimeout(() => {
            handleSearch();
          }, 250);
          break;
        }
        case 2: {
          // 3. In Results, select top travel operator and click "View Details"
          setTourNotification('Selecting Travel Operator -> View Details...');
          const currentBuses = generateBusesForRoute('Hyderabad', 'Pune', todayFormatted, false);
          setBuses(currentBuses);
          const busToSelect = currentBuses[0];
          if (busToSelect) {
            handleSelectBus(busToSelect);
          }
          break;
        }
        case 3: {
          // 4. In Seat Selection, select seats L4 & L5 and proceed to Book Seat
          setTourNotification('Selecting Seats (L4, L5) -> Book Seat...');
          if (selectedBus) {
            const seats = selectedBus.seats?.filter(s => s.deck === 'lower').slice(0, 2) || [];
            setSelectedSeats(seats);
          }
          setTimeout(() => {
            setActiveTab('pickup_drop');
          }, 350);
          break;
        }
        case 4: {
          // 5. Select Pickup & Drop Points
          setTourNotification('Selecting Boarding & Dropping Points...');
          if (selectedBus) {
            setSelectedPickup(selectedBus.boardingPoints[0] || null);
            setSelectedDrop(selectedBus.droppingPoints[0] || null);
          }
          setTimeout(() => {
            setActiveTab('passenger_details');
          }, 350);
          break;
        }
        case 5: {
          // 6. Autofill Passenger Details
          setTourNotification('Autofilling Passenger Details...');
          setPassengers([
            {
              seatId: 'L4',
              seatNumber: 'L4 (Lower)',
              name: 'Dileep Sai Galla',
              age: '23',
              gender: 'Male',
              phone: '+91 98765 43210',
              email: 'dileepgalla200056@gmail.com'
            }
          ]);
          setTimeout(() => {
            setActiveTab('fare_payment');
          }, 350);
          break;
        }
        case 6: {
          // 7. Apply coupon and process Payment Checkout
          setTourNotification('Applying Coupon NEXTRIP50 -> Confirming Booking...');
          setAppliedCoupon(AVAILABLE_COUPONS[0]);
          setTimeout(() => {
            if (selectedBus) {
              const dummyFare: FareBreakdown = {
                baseFare: selectedBus.basePrice,
                seatSpecificPrice: selectedBus.basePrice,
                gstAmount: Math.round(selectedBus.basePrice * 0.05),
                convenienceFee: 40,
                discountAmount: 150,
                couponDiscount: 50,
                totalPayable: selectedBus.basePrice + Math.round(selectedBus.basePrice * 0.05) + 40 - 150 - 50
              };
              handlePaymentSuccess({
                fare: dummyFare,
                paymentMethod: 'UPI / NetBanking',
                couponCode: 'NEXTRIP50'
              });
            }
          }, 400);
          break;
        }
        case 7: {
          // 8. View My Bookings page
          setTourNotification('Exploring Page: My Bookings & Confirmed Tickets');
          setActiveTab('my_bookings');
          break;
        }
        case 8: {
          // 9. View Offers & Coupons page
          setTourNotification('Exploring Page: Offers & Promotional Discounts');
          setActiveTab('offers');
          break;
        }
        case 9: {
          // 10. View Transaction History page
          setTourNotification('Exploring Page: Transaction History & Ledgers');
          setActiveTab('transactions');
          break;
        }
        case 10: {
          // 11. View Profile page
          setTourNotification('Exploring Page: Passenger Directory & Profiles');
          setActiveTab('profile');
          break;
        }
        case 11: {
          // 12. View Settings page
          setTourNotification('Exploring Page: NextTrip Application Settings');
          setActiveTab('settings');
          break;
        }
        default:
          break;
      }
    };

    runTourStep(tourStep);

    // Fast, snappy, continuous dynamic duration per phase
    const stepDurations = [750, 600, 600, 650, 600, 600, 700, 850, 750, 750, 750, 750];
    const duration = stepDurations[tourStep] || 750;

    const timer = setTimeout(() => {
      setTourStep(prev => (prev + 1) % 12);
    }, duration);

    return () => clearTimeout(timer);
  }, [isAutoTouring, tourStep, selectedBus]);

  // Handle Search Submission
  const handleSearch = () => {
    const generated = generateBusesForRoute(
      fromCity || 'Hyderabad', 
      toCity || 'Pune', 
      travelDate || todayFormatted, 
      isWomenPreferred
    );
    setBuses(generated);
    setActiveTab('results');
  };

  // Toggle Bus Types filter
  const handleToggleBusType = (type: string) => {
    setBusTypeFilter(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // When a user selects a bus from search results
  const handleSelectBus = (bus: Bus) => {
    setSelectedBus(bus);
    setSelectedSeats([]);
    setSelectedPickup(bus.boardingPoints[0] || null);
    setSelectedDrop(bus.droppingPoints[0] || null);
    setPassengers([]);
    setActiveTab('seat_selection');
  };

  // Toggle Seat selection (select / deselect)
  const handleToggleSeat = (seat: Seat) => {
    setSelectedSeats(prev => {
      const exists = prev.some(s => s.id === seat.id);
      let updated: Seat[];
      if (exists) {
        updated = prev.filter(s => s.id !== seat.id);
      } else {
        updated = [...prev, seat];
      }

      // Sync passengers array with selected seats
      setPassengers(updated.map(s => {
        const existingP = passengers.find(p => p.seatId === s.id);
        if (existingP) return existingP;
        
        // Auto default to primary saved passenger if available
        const defaultSp = savedPassengers[0];
        return {
          seatId: s.id,
          seatNumber: s.number,
          name: defaultSp ? defaultSp.name : '',
          age: defaultSp ? defaultSp.age : '',
          gender: defaultSp ? defaultSp.gender : 'Male',
          phone: defaultSp ? defaultSp.phone : '+91 98765 43210',
          email: defaultSp ? defaultSp.email : 'dileepgalla200056@gmail.com'
        };
      }));

      return updated;
    });
  };

  // Update Passenger form fields
  const handleUpdatePassenger = (seatId: string, field: keyof PassengerInfo, value: any) => {
    setPassengers(prev => prev.map(p => {
      if (p.seatId === seatId) {
        return { ...p, [field]: value };
      }
      return p;
    }));
  };

  // Autofill passenger from saved directory
  const handleApplySavedPassenger = (seatId: string, saved: SavedPassenger) => {
    setPassengers(prev => prev.map(p => {
      if (p.seatId === seatId) {
        return {
          ...p,
          name: saved.name,
          age: saved.age,
          gender: saved.gender,
          phone: saved.phone,
          email: saved.email
        };
      }
      return p;
    }));
  };

  // Final Payment Success Handler: Creates booking and redirects to "My Bookings"
  const handlePaymentSuccess = ({
    fare,
    paymentMethod,
    couponCode
  }: {
    fare: FareBreakdown;
    paymentMethod: string;
    couponCode?: string;
  }) => {
    if (!selectedBus) return;

    const randomBookingNum = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      bookingId: `NXT-${(fromCity || 'HYD').slice(0, 3).toUpperCase()}-${(toCity || 'PUN').slice(0, 3).toUpperCase()}-${randomBookingNum}`,
      pnr: `NXT-2026-${randomBookingNum}`,
      bus: selectedBus,
      selectedSeats,
      route: {
        from: fromCity || selectedBus.departureCity,
        to: toCity || selectedBus.arrivalCity
      },
      travelDate: travelDate || todayFormatted,
      pickupPoint: selectedPickup || selectedBus.boardingPoints[0],
      dropPoint: selectedDrop || selectedBus.droppingPoints[0],
      passengers,
      fare,
      couponCode,
      paymentMethod,
      paymentStatus: 'Paid',
      bookingStatus: 'Confirmed',
      bookedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    setBookings(prev => [newBooking, ...prev]);
    setActiveTab('my_bookings');
  };

  // Cancel booking handler
  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => prev.map(b => {
      if (b.bookingId === bookingId) {
        return { ...b, bookingStatus: 'Cancelled', paymentStatus: 'Refunded' };
      }
      return b;
    }));
  };

  // Add saved passenger
  const handleAddSavedPassenger = (p: SavedPassenger) => {
    setSavedPassengers(prev => [...prev, p]);
  };

  // Delete saved passenger
  const handleDeleteSavedPassenger = (id: string) => {
    setSavedPassengers(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="w-full h-full min-h-[580px] bg-[#070d18] text-slate-100 flex flex-col font-sans select-none overflow-hidden rounded-xl border border-slate-800/80 shadow-2xl">
      
      {/* ── 1. PC TOP HEADER (Section 1 Requirements) ── */}
      <BusSearchHeader
        activeTab={activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab);
          setIsAutoTouring(false);
        }}
        isFullscreen={isFullscreen}
        onToggleFullscreen={onToggleFullscreen}
        bookingCount={bookings.filter(b => b.bookingStatus === 'Confirmed').length}
      />

      {/* ── AUTO-EXPLORATION STATUS BAR ── */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-3 py-1 flex items-center justify-between text-[8px] font-mono z-20">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoTouring(!isAutoTouring)}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 border border-sky-500/30 text-sky-400 font-bold transition-colors cursor-pointer"
            title={isAutoTouring ? "Pause Auto Demonstration" : "Resume Auto Demonstration"}
          >
            {isAutoTouring ? <Pause className="w-2.5 h-2.5 text-sky-400" /> : <Play className="w-2.5 h-2.5 text-sky-400" />}
            <span>{isAutoTouring ? "AUTO-DEMO ACTIVE" : "DEMO PAUSED"}</span>
          </button>
          <div className="flex items-center gap-1 text-slate-300">
            <Sparkles className="w-2.5 h-2.5 text-amber-400" />
            <span className="truncate max-w-[280px] sm:max-w-md">{tourNotification}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <span className="hidden sm:inline">Active Route:</span>
          <span className="text-white font-bold">{fromCity || 'Hyderabad'} ➔ {toCity || 'Pune'}</span>
        </div>
      </div>

      {/* ── 2. PC DESKTOP BODY: LEFT SIDEBAR + MAIN CONTENT VIEWPORT ── */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* ── LEFT SIDEBAR (Section 13 Requirements) ── */}
        <BusSidebar
          activeTab={activeTab}
          onNavigate={(tab) => {
            setActiveTab(tab);
            setIsAutoTouring(false);
          }}
          bookingCount={bookings.filter(b => b.bookingStatus === 'Confirmed').length}
        />

        {/* ── MAIN CONTENT VIEWPORT (Scrollable) ── */}
        <main className="flex-1 p-3.5 sm:p-5 lg:p-6 overflow-y-auto no-scrollbar bg-slate-950/60">
          
          {/* TAB: BUS SEARCH */}
          {activeTab === 'search' && (
            <div className="space-y-5">
              <BusSearchView
                fromCity={fromCity}
                toCity={toCity}
                travelDate={travelDate}
                busTypeFilter={busTypeFilter}
                isWomenPreferred={isWomenPreferred}
                onFromCityChange={setFromCity}
                onToCityChange={setToCity}
                onTravelDateChange={setTravelDate}
                onToggleBusType={handleToggleBusType}
                onToggleWomenPreferred={setIsWomenPreferred}
                onSearch={handleSearch}
              />

              {/* Instant Search Results below form */}
              <BusResultsList
                buses={buses}
                fromCity={fromCity}
                toCity={toCity}
                travelDate={travelDate}
                isWomenPreferred={isWomenPreferred}
                onSelectBus={handleSelectBus}
              />
            </div>
          )}

          {/* TAB: SEARCH RESULTS LISTING */}
          {activeTab === 'results' && (
            <div className="space-y-4">
              <BusResultsList
                buses={buses}
                fromCity={fromCity}
                toCity={toCity}
                travelDate={travelDate}
                isWomenPreferred={isWomenPreferred}
                onSelectBus={handleSelectBus}
              />
            </div>
          )}

          {/* TAB: VIEW DETAILS & SEAT SELECTION */}
          {activeTab === 'seat_selection' && selectedBus && (
            <BusSeatSelection
              bus={selectedBus}
              selectedSeats={selectedSeats}
              onToggleSeat={handleToggleSeat}
              onBack={() => setActiveTab('results')}
              onProceed={() => setActiveTab('pickup_drop')}
            />
          )}

          {/* TAB: PICKUP & DROP POINTS SELECTION */}
          {activeTab === 'pickup_drop' && selectedBus && (
            <PickupDropSelection
              bus={selectedBus}
              selectedSeats={selectedSeats}
              selectedPickup={selectedPickup}
              selectedDrop={selectedDrop}
              onSelectPickup={setSelectedPickup}
              onSelectDrop={setSelectedDrop}
              onBack={() => setActiveTab('seat_selection')}
              onProceed={() => setActiveTab('passenger_details')}
            />
          )}

          {/* TAB: PASSENGER DETAILS FORM */}
          {activeTab === 'passenger_details' && selectedBus && selectedPickup && selectedDrop && (
            <PassengerDetailsForm
              bus={selectedBus}
              selectedSeats={selectedSeats}
              travelDate={travelDate}
              pickupPoint={selectedPickup}
              dropPoint={selectedDrop}
              passengers={passengers}
              savedPassengers={savedPassengers}
              onUpdatePassenger={handleUpdatePassenger}
              onApplySavedPassenger={handleApplySavedPassenger}
              onBack={() => setActiveTab('pickup_drop')}
              onProceed={() => setActiveTab('fare_payment')}
            />
          )}

          {/* TAB: FARE SUMMARY & PAYMENT CHECKOUT */}
          {activeTab === 'fare_payment' && selectedBus && selectedPickup && selectedDrop && (
            <FareSummaryCheckout
              bus={selectedBus}
              selectedSeats={selectedSeats}
              travelDate={travelDate}
              pickupPoint={selectedPickup}
              dropPoint={selectedDrop}
              passengers={passengers}
              appliedCoupon={appliedCoupon}
              onApplyCoupon={setAppliedCoupon}
              onBack={() => setActiveTab('passenger_details')}
              onPaymentSuccess={handlePaymentSuccess}
            />
          )}

          {/* TAB: MY BOOKINGS */}
          {activeTab === 'my_bookings' && (
            <MyBookingsView
              bookings={bookings}
              onNavigate={setActiveTab}
              onCancelBooking={handleCancelBooking}
            />
          )}

          {/* TAB: MY TRIPS */}
          {activeTab === 'my_trips' && (
            <MyBookingsView
              bookings={bookings}
              onNavigate={setActiveTab}
              onCancelBooking={handleCancelBooking}
            />
          )}

          {/* TAB: OFFERS & COUPONS */}
          {activeTab === 'offers' && (
            <OffersView
              onSelectCoupon={c => setAppliedCoupon(c)}
              onNavigate={setActiveTab}
            />
          )}

          {/* TAB: TRANSACTION HISTORY */}
          {activeTab === 'transactions' && (
            <TransactionHistoryView
              bookings={bookings}
            />
          )}

          {/* TAB: PASSENGER PROFILES */}
          {activeTab === 'profile' && (
            <ProfileView
              savedPassengers={savedPassengers}
              onAddSavedPassenger={handleAddSavedPassenger}
              onDeleteSavedPassenger={handleDeleteSavedPassenger}
            />
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <SettingsView />
          )}

        </main>
      </div>

    </div>
  );
}
