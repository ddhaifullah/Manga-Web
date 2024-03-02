import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';

const DetailManga = () => {
    const { id } = useParams();
    const [manga, setManga] = useState(null);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMangaDetail = async () => {
            try {
                const response = await axios.get(`https://api.jikan.moe/v4/manga/${id}`);
                setManga(response.data.data);
            } catch (error) {
                setError('Error fetching manga detail');
            }
        };

        const fetchMangaNews = async () => {
            try {
                const response = await axios.get(`https://api.jikan.moe/v4/manga/${id}/news`);
                setNews(response.data.data);
            } catch (error) {
                setError('Error fetching manga news');
            } finally {
                setLoading(false);
            }
        };

        fetchMangaDetail();
        fetchMangaNews();
    }, [id]);

    return (
        <div className="container mx-auto mt-8">
            {loading && <Loading />}
            {error && <p>{error}</p>}
            {manga && (
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold my-4">{manga.title}</h1>
                    <img src={manga.images.jpg.image_url} alt={manga.title} className="rounded-lg shadow-lg w-32 h-auto" />
                    <div className="my-4">
                        <h2 className="text-xl font-bold mb-2">Synopsis</h2>
                        <p className="text-gray-700 text-sm text-justify">{manga.synopsis}</p>
                    </div>
                    <div className="">
                        <h2 className="text-md font-bold">Details</h2>
                        <p className='text-sm'>
                            <strong>Title (English):</strong> {manga.title_english}
                        </p>
                        <p className='text-sm'>
                            <strong>Title (Japanese):</strong> {manga.title_japanese}
                        </p>
                        <p className='text-sm'>
                            <strong>Type:</strong> {manga.type}
                        </p>
                        <p className='text-sm'>
                            <strong>Chapters:</strong> {manga.chapters}
                        </p>
                        <p className='text-sm'>
                            <strong>Volumes:</strong> {manga.volumes}
                        </p>
                        <p className='text-sm'>
                            <strong>Status:</strong> {manga.status}
                        </p>
                        <p className='text-sm'>
                            <strong>Publishing:</strong> {manga.publishing ? 'Yes' : 'No'}
                        </p>
                        <p className='text-sm'>
                            <strong>Published:</strong> {manga.published.string}
                        </p>
                        <p className='text-sm'>
                            <strong>Score:</strong> {manga.score}
                        </p>
                        <p className='text-sm'>
                            <strong>Scored By:</strong> {manga.scored_by}
                        </p>
                        <p className='text-sm'>
                            <strong>Rank:</strong> {manga.rank}
                        </p>
                        <p className='text-sm'>
                            <strong>Popularity:</strong> {manga.popularity}
                        </p>
                        <p className='text-sm'>
                            <strong>Members:</strong> {manga.members}
                        </p>
                        <p className='text-sm'>
                            <strong>Favorites:</strong> {manga.favorites}
                        </p>
                    </div>

                    <div className="my-2">
                        <h2 className="text-md font-bold">Authors</h2>
                        {manga.authors.map((author) => (
                            <p key={author.mal_id} className='text-sm'>
                                <strong>{author.type}:</strong> {author.name}
                            </p>
                        ))}
                    </div>

                    
                    <div class="container my-24 mx-auto md:px-6">
                        <section class="mb-32 text-center md:text-left">
                            <h2 class="mb-4 text-3xl font-bold">Latest News</h2>
                            {news.map((item) => (
                                <div class="mb-6 flex flex-wrap border rounded-md shadow-md hover:shadow-lg" key={item.mal_id}>
                                    <Link to={item.url}>
                                        <div class="mb-6 mr-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-9/12 xl:w-7/12">
                                            <h5 class="mb-3 text-lg font-bold">{item.title}</h5>
                                            <div
                                            class="mb-3 flex items-center justify-center text-sm font-medium text-danger dark:text-danger-500 md:justify-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                                stroke="currentColor" class="mr-2 h-5 w-5">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                                            </svg>
                                                {item.comments}
                                            </div>
                                            <p class="mb-6 text-neutral-500 dark:text-neutral-300">
                                            <small>Published <u>{item.date}</u> by
                                                <a href={item.url}>{item.author_username}</a></small>
                                            </p>
                                            <p class="text-neutral-500 dark:text-neutral-300">
                                                {item.excerpt}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </section>
                        </div>
                </div>
            )}
        </div>
    );
};

export default DetailManga;