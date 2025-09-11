import { useEffect } from 'react';
import Game from '../components/Game';
import { getLeaderboardEntry } from '../data';
import { useNavigate } from 'react-router';

function Homepage() {
  useEffect(() => {
    const leaderboardFirstConnect = async () => {
      const results = await getLeaderboardEntry();
      console.log('Starting Connection to API for Leaderboard, Result should be array of objects:', results);
    };
    leaderboardFirstConnect();
  }, []);
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate('login');
  };

  const goToLeaderboardPage = () => {
    navigate('leaderboard');
  };

  const goToPokedex = () => {
    navigate('pokedex');
  };

  const goToHowToPlay = () => {
    navigate('howtoplay');
  };

  return (
    <div className="min-h-screen  p-6 text-black relative">
      <div className="w-full max-w-5xl mx-auto">
        <img src="/PokeBrawlLogo.png" alt="" className="mx-auto w-3/4 sm:w-1/2 md:w-1/3 drop-shadow-xl mb-6" />

        <div className="flex ">
          <div className="mx-auto space-x-8">
            <button
              onClick={goToLoginPage}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg cursor-pointer transition-all duration-400 hover:bg-green-500"
            >
              Login
            </button>
            <button
              onClick={goToLeaderboardPage}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg cursor-pointer transition-all duration-400 hover:bg-yellow-500"
            >
              Leaderboard
            </button>
            <button
              onClick={goToPokedex}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg cursor-pointer transition-all duration-400 hover:bg-gray-600"
            >
              Pokedex
            </button>
            <button
              onClick={goToHowToPlay}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg cursor-pointer transition-all duration-400 hover:bg-red-500"
            >
              How to Play
            </button>
          </div>
        </div>

        <div className="w-full">
          <Game />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
