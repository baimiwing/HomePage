
import logo from '/Users/ibrahimhusnanto/Library/Mobile Documents/com~apple~CloudDocs/Programing/react-app/src/assets/twibon pionir.png'; // sesuaikan path-nya

function Logo() {
  return (
    <nav className="logo">
      <div className="logo-brand">
        <img 
          src={logo} 
          alt="Logo" 
          style={{ width: '30px', 
                 height: '30px',
                 position: 'absolute',
                 top: '245px',
                 left: '45px',
                 right: '0',
                 bottom: '0'
        }}
        />
      </div>
    </nav>
  );
}

export default Logo;