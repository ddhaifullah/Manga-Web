import React, { useState, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../utils/Loading';

const Recommendations = () => {
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const MAX_SYNOPSIS_LENGTH = 20;

    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        setIsLoggedIn(!!storedToken);
        
        const fetchComics = async () => {
            try {
                const response = await axios.get('https://api.jikan.moe/v4/manga?limit=16');
                setComics(response.data.data);
            } catch (error) {
                setError('Error fetching comics');
            } finally {
                setLoading(false);
            }
        };

        fetchComics();
    }, []);


    const handleSeeMore = (mangaId) => {
        const path = isLoggedIn ? `/manga-detail/${mangaId}` : '/login';
        navigate(path);
    };

    return (
        <>
            <div className='flex justify-center mt-2 flex-wrap gap-2'>
                {loading && <Loading />}
                {error && <p>{error}</p>}
                {comics.map((comic) => (
                    <div key={comic.mal_id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 border-gray-500'>
                        <div className="card card-compact bg-base-100 shadow-md border-2 border-gray-500 flex flex-col rounded-md">
                            <figure className="overflow-hidden">
                                <img
                                    className="w-full h-48 rounded-xl object-contain mt-2"
                                    src={comic.images.jpg.image_url}
                                    alt={comic.title}
                                />
                            </figure>
                            <div className="card-body p-4 flex-grow">
                                <h2 className="card-title text-sm font-bold mb-2 overflow-hidden line-clamp-1">{comic.title}</h2>
                                <p className="text-xs mb-4">
                                    {comic.synopsis.length > MAX_SYNOPSIS_LENGTH
                                        ? `${comic.synopsis.slice(0, MAX_SYNOPSIS_LENGTH)}...`
                                        : comic.synopsis
                                    }
                                </p>
                                <div className="card-actions justify-end mt-auto">
                                    <button onClick={() => handleSeeMore(comic.mal_id)} className="btn btn-primary text-xs underline">
                                        See more..
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Recommendations;