import MovieCard from "./MovieList";
import { useState } from "react";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery("");
        alert();
    };

    const movies = [
    { id: 1, title: "101", year: "Lantai 1", image: "john-wick.jpg" },
    { id: 2, title: "102", year: "Lantai 1", image: "terminator.jpg" }, 
    { id: 3, title: "103", year: "Lantai 1", image: "the-matrix.jpg" },
    { id: 4, title: "104", year: "Lantai 1", image: "john-wick.jpg" },
    { id: 5, title: "105", year: "Lantai 1", image: "terminator.jpg" }, 
    { id: 6, title: "201", year: "Lantai 2", image: "the-matrix.jpg" },
    { id: 7, title: "202", year: "Lantai 2", image: "john-wick.jpg" },
    { id: 8, title: "203", year: "Lantai 2", image: "terminator.jpg" }, 
    { id: 9, title: "204", year: "Lantai 2", image: "the-matrix.jpg" },
    { id: 10, title: "205", year: "Lantai 2", image: "john-wick.jpg" },
    { id: 11, title: "206", year: "Lantai 2", image: "terminator.jpg" }, 
    { id: 12, title: "207", year: "Lantai 2", image: "the-matrix.jpg" },
    { id: 13, title: "208", year: "Lantai 2", image: "john-wick.jpg" },
    { id: 14, title: "209", year: "Lantai 2", image: "terminator.jpg" }, 
    { id: 15, title: "210", year: "Lantai 2", image: "the-matrix.jpg" },
    { id: 16, title: "211", year: "Lantai 2", image: "john-wick.jpg" },
    { id: 17, title: "212", year: "Lantai 2", image: "terminator.jpg" }, 
    { id: 18, title: "213", year: "Lantai 2", image: "the-matrix.jpg" },
    { id: 19, title: "301", year: "Lantai 3", image: "john-wick.jpg" },
    { id: 20, title: "302", year: "Lantai 3", image: "terminator.jpg" }, 
    { id: 21, title: "303", year: "Lantai 3", image: "the-matrix.jpg" },
    { id: 22, title: "304", year: "Lantai 3", image: "john-wick.jpg" },
    { id: 23, title: "305", year: "Lantai 3", image: "terminator.jpg" }, 
    { id: 24, title: "306", year: "Lantai 3", image: "the-matrix.jpg" },
    { id: 25, title: "307", year: "Lantai 3", image: "the-matrix.jpg" },
];

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search Room..." 
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery (e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <div className="movies-grid">
            {movies.map ((movie) => (
                movie.title.toLowerCase().startsWith(searchQuery) && <MovieCard movie={movie} key={movie.id} />
            ))}
            </ div>
        </ div>
    )   
}
export default Home