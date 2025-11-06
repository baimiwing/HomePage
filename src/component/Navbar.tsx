import React, { useState } from 'react';
import { Home, ShoppingCart } from 'lucide-react';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(3);
  const [activeTab, setActiveTab] = useState('home');

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo/Brand */}
          <div className="navbar-brand">
            <h1 className="brand-text">MyShop</h1>
          </div>

          {/* Navigation Buttons */}
          <div className="navbar-buttons">
            <button
              className={`nav-button ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              <Home className="nav-icon" />
              <span className="nav-text">Home</span>
            </button>

            <button
              className={`nav-button ${activeTab === 'cart' ? 'active' : ''}`}
              onClick={() => setActiveTab('cart')}
            >
              <ShoppingCart className="nav-icon" />
              <span className="nav-text">Cart</span>
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}