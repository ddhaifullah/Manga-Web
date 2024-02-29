import React from 'react';
import { useParams } from 'react-router-dom';import MangaNews from '../../layout/Manga/News/MangaNews';

const MangaNewsPage = () => {
    const { id } = useParams();

    return (
        <div>
            <h1>Manga News</h1>
            <MangaNews mangaId={id} />
        </div>
    );
};

export default MangaNewsPage;
