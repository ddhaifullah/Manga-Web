import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MangaNews = ({ mangaId }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMangaNews = async () => {
            try {
                const response = await axios.get(`https://api.jikan.moe/v4/manga/news`);
                setNews(response.data.data);
            } catch (error) {
                setError('Error fetching manga news');
            } finally {
                setLoading(false);
            }
        };

        fetchMangaNews();
    }, [mangaId]);

    return (
        <div className="container mx-auto mt-8">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {news.map((item) => (
                <div key={item.mal_id} className="my-4">
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <p className="text-gray-500 text-sm">
                        Date: {item.date} | Author: {item.author_username} | Comments: {item.comments}
                    </p>
                    <p className="text-gray-700 mt-2">{item.excerpt}</p>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        Read More
                    </a>
                </div>
            ))}
        </div>
    );
};

export default MangaNews;
