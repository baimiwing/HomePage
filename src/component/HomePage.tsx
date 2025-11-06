import { useState } from "react";
import { Home, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie, onAddToCart, isInCart }: any) {
  function onFavoriteClick() {
    if (!isInCart) {
      console.log("Favorite clicked");
      onAddToCart(movie);
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-image">
        <img
          src={`/${movie.image}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button 
            className={`favorite-btn ${isInCart ? 'disabled' : ''}`}
            onClick={onFavoriteClick}
            disabled={isInCart}
          >
            {isInCart ? "Already in Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.year}</p>
      </div>
    </div>
  );
}

function HomePage({ movies, searchQuery, setSearchQuery, handleSearch, onAddToCart, cartItems }: any) {
  const isMovieInCart = (movieId: number) => {
    return cartItems.some((item: any) => item.id === movieId);
  };

  return (
    <div className="home">
      <div className="search-form">
        <input
          type="text"
          placeholder="Search Room..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>Search</button>
      </div>
      <div className="movies-grid">
        {movies.map(
          (movie: any) =>
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

function CartPage({ cartItems, onRemoveFromCart }: any) {
    const navigate = useNavigate();
    const handleSubmited = () => {
    navigate('/Reg');
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item: any, index: number) => (
              <div key={index} className="cart-item">
                <div className="cart-item-info">
                  <h3>{item.title}</h3>
                  <p>{item.year}</p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => onRemoveFromCart(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="checkout-section">
            <button 
              className="checkout-btn"
              onClick={handleSubmited}
            >
              Checkout
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

  const handleSearch = () => {
    alert("Search submitted");
  };

  const handleAddToCart = (movie: any) => {
    const isAlreadyInCart = cartItems.some((item) => item.id === movie.id);
    
    if (!isAlreadyInCart) {
      setCartItems([...cartItems, movie]);
    }
  };

  const handleRemoveFromCart = (index: number) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
  };

  const movies = [
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
    </>
  );
}

export default App;