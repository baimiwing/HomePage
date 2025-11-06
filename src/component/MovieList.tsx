
function MovieList ({movie}: any) {

    function onfavoriteClick() {
        console.log("Favorite clicked");
    }

    return (
        <div className= "movie-card">
            <div className="movie-image">  
                <img  src={`/${movie.title.toLowerCase().replace(/\s+/g, '-')}.jpg`}  alt={movie.title} />
                <div className = "movie-overlay">   
                    <button className="favorite-btn" onClick={onfavoriteClick}>
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                </div>
            </div>
    )
}

export default MovieList;