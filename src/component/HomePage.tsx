import { useState, useEffect } from "react";
import { Home, ShoppingCart, Clock, Calendar, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

interface Movie {
  id: number;
  title: string;
  year: string;
  image: string;
}

interface TimeSlot {
  time: string;
  isAvailable: boolean;
  status?: string;
}

interface BookingData {
  roomNumber: string;
  roomFloor: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
}

function TimePickerModal({ 
  movie, 
  onClose, 
  onConfirm 
}: { 
  movie: Movie; 
  onClose: () => void; 
  onConfirm: (data: BookingData) => void;
}) {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);

  // Generate time slots from 7 AM to 9 PM
  const generateTimeSlots = () => {
    const slots: TimeSlot[] = [];
    for (let hour = 7; hour <= 21; hour++) {
      const timeString = `${hour.toString().padStart(2, '0')}:00`;
      slots.push({
        time: timeString,
        isAvailable: true
      });
    }
    return slots;
  };

  useEffect(() => {
    checkAvailability();
  }, [selectedDate]);

  const checkAvailability = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/bookings/availability/${movie.title}/${selectedDate}`
      );
      
      const slots = generateTimeSlots();
      const bookedTimes = response.data.bookedSlots;

      // Mark unavailable slots
      const updatedSlots = slots.map(slot => {
        const slotHour = parseInt(slot.time.split(':')[0]);
        const isBooked = bookedTimes.some((booked: any) => {
          const startHour = parseInt(booked.start.split(':')[0]);
          const endHour = parseInt(booked.end.split(':')[0]);
          return slotHour >= startHour && slotHour < endHour;
        });

        return {
          ...slot,
          isAvailable: !isBooked,
          status: isBooked ? 'booked' : 'available'
        };
      });

      setTimeSlots(updatedSlots);
    } catch (error) {
      console.error('Error checking availability:', error);
      setTimeSlots(generateTimeSlots());
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (!selectedStartTime || !selectedEndTime) {
      alert('Pilih waktu mulai dan selesai');
      return;
    }

    const startHour = parseInt(selectedStartTime.split(':')[0]);
    const endHour = parseInt(selectedEndTime.split(':')[0]);

    if (startHour >= endHour) {
      alert('Waktu selesai harus lebih besar dari waktu mulai');
      return;
    }

    onConfirm({
      roomNumber: movie.title,
      roomFloor: movie.year,
      bookingDate: selectedDate,
      startTime: selectedStartTime,
      endTime: selectedEndTime
    });
    onClose();
  };

  const isTimeSlotAvailable = (time: string) => {
    const slot = timeSlots.find(s => s.time === time);
    return slot?.isAvailable ?? true;
  };

  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Pilih Waktu Peminjaman</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="room-info">
            <h3>Ruang {movie.title}</h3>
            <p>{movie.year}</p>
          </div>

{loading ? (
            <div className="loading">Memuat ketersediaan...</div>
          ) : (
            <div className="time-selection-box">
              <div className="time-selection-header">
                <Clock size={20} />
                Pilih Waktu Peminjaman
              </div>

              <div className="date-picker">
                <label>
                  <Calendar size={18} />
                  <span>Pilih Tanggal:</span>
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={getMinDate()}
                  className="date-input"
                />
              </div>

              <div className="time-picker">
                <label>
                  <Clock size={18} />
                  <span>Waktu Mulai:</span>
                </label>
                <select
                  value={selectedStartTime}
                  onChange={(e) => setSelectedStartTime(e.target.value)}
                  className="time-select"
                >
                  <option value="">Pilih waktu mulai</option>
                  {timeSlots.map((slot) => (
                    <option
                      key={slot.time}
                      value={slot.time}
                      disabled={!slot.isAvailable}
                    >
                      {slot.time} {!slot.isAvailable ? '(Sudah dipesan)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="time-picker">
                <label>
                  <Clock size={18} />
                  <span>Waktu Selesai:</span>
                </label>
                <select
                  value={selectedEndTime}
                  onChange={(e) => setSelectedEndTime(e.target.value)}
                  className="time-select"
                >
                  <option value="">Pilih waktu selesai</option>
                  {timeSlots.map((slot) => (
                    <option
                      key={slot.time}
                      value={slot.time}
                      disabled={!slot.isAvailable || (selectedStartTime && slot.time <= selectedStartTime)}
                    >
                      {slot.time} {!slot.isAvailable ? '(Sudah dipesan)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="time-slots-legend">
                <div className="legend-item">
                  <span className="dot available"></span>
                  <span>Tersedia</span>
                </div>
                <div className="legend-item">
                  <span className="dot booked"></span>
                  <span>Sudah dipesan</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Batal
          </button>
          <button 
            className="btn-confirm" 
            onClick={handleConfirm}
            disabled={!selectedStartTime || !selectedEndTime}
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
}

function MovieCard({ 
  movie, 
  onAddToCart, 
  isInCart 
}: { 
  movie: Movie; 
  onAddToCart: (movie: Movie) => void; 
  isInCart: boolean;
}) {
  function onFavoriteClick() {
    if (!isInCart) {
      onAddToCart(movie);
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-image">
        <img src={`/${movie.image}`} alt={movie.title} />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${isInCart ? "disabled" : ""}`}
            onClick={onFavoriteClick}
            disabled={isInCart}
          >
            {isInCart ? "Sudah di Cart" : "Pilih Ruangan"}
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>Ruang {movie.title}</h3>
        <p>{movie.year}</p>
      </div>
    </div>
  );
}

function HomePage({
  movies,
  searchQuery,
  setSearchQuery,
  handleSearch,
  onAddToCart,
  cartItems,
}: any) {
  const isMovieInCart = (movieId: number) => {
    return cartItems.some((item: any) => item.id === movieId);
  };

  return (
    <div className="home">
      <div className="search-form">
        <input
          type="text"
          placeholder="Cari Ruangan..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>
          Cari
        </button>
      </div>
      <div className="movies-grid">
        {movies.map(
          (movie: Movie) =>
            movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
              <MovieCard
                movie={movie}
                key={movie.id}
                onAddToCart={onAddToCart}
                isInCart={isMovieInCart(movie.id)}
              />
            )
        )}
      </div>
    </div>
  );
}

function CartPage({ 
  cartItems, 
  onRemoveFromCart 
}: { 
  cartItems: any[]; 
  onRemoveFromCart: (index: number) => void;
}) {
  const navigate = useNavigate();
  
  const handleSubmited = () => {
    if (cartItems.length === 0) {
      alert('Cart masih kosong');
      return;
    }
    // Pass cart items to registration form
    navigate('/Reg', { state: { bookings: cartItems } });
  };

  const formatDateTime = (item: any) => {
    if (!item.bookingDate) return '';
    const date = new Date(item.bookingDate).toLocaleDateString('id-ID');
    return `${date}, ${item.startTime} - ${item.endTime}`;
  };

  return (
    <div className="cart-page">
      <h2>Keranjang Peminjaman</h2>
      {cartItems.length === 0 ? (
        <p>Keranjang Anda kosong</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item: any, index: number) => (
              <div key={index} className="cart-item">
                <div className="cart-item-info">
                  <h3>Ruang {item.title}</h3>
                  <p className="cart-item-floor">{item.year}</p>
                  {item.bookingDate && (
                    <p className="cart-item-time">
                      <Clock size={16} />
                      {formatDateTime(item)}
                    </p>
                  )}
                </div>
                <button
                  className="remove-btn"
                  onClick={() => onRemoveFromCart(index)}
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>
          <div className="checkout-section">
            <button className="checkout-btn" onClick={handleSubmited}>
              Lanjut ke Pendaftaran
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = () => {
    console.log("Search submitted:", searchQuery);
  };

  const handleAddToCart = (movie: Movie) => {
    const isAlreadyInCart = cartItems.some((item) => item.id === movie.id);

    if (!isAlreadyInCart) {
      setSelectedMovie(movie);
      setShowTimeModal(true);
    }
  };

  const handleTimeConfirm = (bookingData: BookingData) => {
    if (selectedMovie) {
      const newItem = {
        ...selectedMovie,
        ...bookingData
      };
      setCartItems([...cartItems, newItem]);
      setSelectedMovie(null);
    }
  };

  const handleRemoveFromCart = (index: number) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  };

  const movies: Movie[] = [
    { id: 1, title: "101", year: "Lantai 1", image: "classroom.jpg" },
    { id: 2, title: "102", year: "Lantai 1", image: "classroom.jpg" },
    { id: 3, title: "103", year: "Lantai 1", image: "classroom.jpg" },
    { id: 4, title: "104", year: "Lantai 1", image: "classroom.jpg" },
    { id: 5, title: "105", year: "Lantai 1", image: "classroom.jpg" },
    { id: 6, title: "201", year: "Lantai 2", image: "classroom.jpg" },
    { id: 7, title: "202", year: "Lantai 2", image: "classroom.jpg" },
    { id: 8, title: "203", year: "Lantai 2", image: "classroom.jpg" },
    { id: 9, title: "204", year: "Lantai 2", image: "classroom.jpg" },
    { id: 10, title: "205", year: "Lantai 2", image: "classroom.jpg" },
    { id: 11, title: "206", year: "Lantai 2", image: "classroom.jpg" },
    { id: 12, title: "207", year: "Lantai 2", image: "classroom.jpg" },
    { id: 13, title: "208", year: "Lantai 2", image: "classroom.jpg" },
    { id: 14, title: "209", year: "Lantai 2", image: "classroom.jpg" },
    { id: 15, title: "210", year: "Lantai 2", image: "classroom.jpg" },
    { id: 16, title: "211", year: "Lantai 2", image: "classroom.jpg" },
    { id: 17, title: "212", year: "Lantai 2", image: "classroom.jpg" },
    { id: 18, title: "213", year: "Lantai 2", image: "classroom.jpg" },
    { id: 19, title: "301", year: "Lantai 3", image: "classroom.jpg" },
    { id: 20, title: "302", year: "Lantai 3", image: "classroom.jpg" },
    { id: 21, title: "303", year: "Lantai 3", image: "classroom.jpg" },
    { id: 22, title: "304", year: "Lantai 3", image: "classroom.jpg" },
    { id: 23, title: "305", year: "Lantai 3", image: "classroom.jpg" },
    { id: 24, title: "306", year: "Lantai 3", image: "classroom.jpg" },
    { id: 25, title: "307", year: "Lantai 3", image: "classroom.jpg" },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            <h1 className="brand-text">Peminjaman Kelas</h1>
          </div>
          <div className="navbar-buttons">
            <button
              className={`nav-button ${activeTab === "home" ? "active" : ""}`}
              onClick={() => setActiveTab("home")}
            >
              <Home className="nav-icon" />
              <span className="nav-text">Home</span>
            </button>
            <button
              className={`nav-button ${activeTab === "cart" ? "active" : ""}`}
              onClick={() => setActiveTab("cart")}
            >
              <ShoppingCart className="nav-icon" />
              <span className="nav-text">Cart</span>
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {activeTab === "home" && (
        <HomePage
          movies={movies}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          onAddToCart={handleAddToCart}
          cartItems={cartItems}
        />
      )}

      {activeTab === "cart" && (
        <CartPage
          cartItems={cartItems}
          onRemoveFromCart={handleRemoveFromCart}
        />
      )}

      {showTimeModal && selectedMovie && (
        <TimePickerModal
          movie={selectedMovie}
          onClose={() => {
            setShowTimeModal(false);
            setSelectedMovie(null);
          }}
          onConfirm={handleTimeConfirm}
        />
      )}
    </>
  );
}

export default App;
