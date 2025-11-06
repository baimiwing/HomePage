import React, { useState } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Eye, Gauge } from 'lucide-react';

export default function WeatherTest() {
  const [city, setCity] = useState('');
  interface WeatherData {
    current: {
      temperature_2m: number;
      relative_humidity_2m: number;
      apparent_temperature: number;
      precipitation: number;
      weather_code: number;
      wind_speed_10m: number;
      wind_direction_10m: number;
    };
    cityName: string;
    country: string;
  }

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk mendapatkan koordinat dari nama kota
  const getCoordinates = async (cityName: string) => {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=id&format=json`
    );
    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      throw new Error('Kota tidak ditemukan');
    }
    
    return {
      lat: data.results[0].latitude,
      lon: data.results[0].longitude,
      name: data.results[0].name,
      country: data.results[0].country
    };
  };

  // Fungsi untuk mendapatkan data cuaca
  const getWeather = async (lat: number, lon: number) => {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto`
    );
    return await response.json();
  };

  // Fungsi untuk menangani pencarian
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!city.trim()) {
      setError('Masukkan nama kota');
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      // Step 1: Dapatkan koordinat dari nama kota
      const coords = await getCoordinates(city);
      
      // Step 2: Dapatkan data cuaca menggunakan koordinat
      const weatherData = await getWeather(coords.lat, coords.lon);
      
      // Gabungkan data
      setWeather({
        ...weatherData,
        cityName: coords.name,
        country: coords.country
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Terjadi kesalahan saat mengambil data'
      );
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk mendapatkan icon cuaca berdasarkan kode
  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun className="w-20 h-20 text-yellow-400" />;
    if (code <= 3) return <Cloud className="w-20 h-20 text-gray-400" />;
    if (code <= 67) return <CloudRain className="w-20 h-20 text-blue-400" />;
    return <Cloud className="w-20 h-20 text-gray-500" />;
  };

  // Fungsi untuk mendapatkan deskripsi cuaca
  const getWeatherDescription = (code: number) => {
    if (code === 0) return 'Cerah';
    if (code === 1) return 'Sebagian Cerah';
    if (code === 2) return 'Berawan Sebagian';
    if (code === 3) return 'Berawan';
    if (code <= 67) return 'Hujan';
    if (code <= 77) return 'Salju';
    if (code <= 82) return 'Hujan Deras';
    return 'Badai';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Utama */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            ☁️ Weather App
          </h1>

          {/* Form Pencarian */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Masukkan nama kota..."
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:bg-gray-400 font-medium transition"
              >
                {loading ? 'Mencari...' : 'Cari'}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-xl">
              {error}
            </div>
          )}

          {/* Weather Display */}
          {weather && weather.current && (
            <div className="space-y-6">
              {/* Kota dan Negara */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {weather.cityName}
                </h2>
                <p className="text-gray-600">{weather.country}</p>
              </div>

              {/* Icon dan Suhu Utama */}
              <div className="flex flex-col items-center py-6">
                {getWeatherIcon(weather.current.weather_code)}
                <div className="text-6xl font-bold text-gray-800 mt-4">
                  {Math.round(weather.current.temperature_2m)}°C
                </div>
                <p className="text-xl text-gray-600 mt-2">
                  {getWeatherDescription(weather.current.weather_code)}
                </p>
                <p className="text-gray-500 mt-1">
                  Terasa seperti {Math.round(weather.current.apparent_temperature)}°C
                </p>
              </div>

              {/* Detail Cuaca */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <Wind className="w-5 h-5" />
                    <span className="font-medium">Angin</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {Math.round(weather.current.wind_speed_10m)} km/h
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <Droplets className="w-5 h-5" />
                    <span className="font-medium">Kelembaban</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {weather.current.relative_humidity_2m}%
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <CloudRain className="w-5 h-5" />
                    <span className="font-medium">Hujan</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {weather.current.precipitation} mm
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <Gauge className="w-5 h-5" />
                    <span className="font-medium">Arah Angin</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {weather.current.wind_direction_10m}°
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Initial State */}
          {!weather && !loading && !error && (
            <div className="text-center py-12 text-gray-500">
              <Cloud className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>Cari kota untuk melihat cuaca</p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-4 text-center text-white text-sm">
          <p>Data dari Open-Meteo API</p>
          <p className="mt-1 opacity-75">Contoh API di React untuk pemula</p>
        </div>
      </div>
    </div>
  );
}