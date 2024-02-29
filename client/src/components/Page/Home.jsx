import React from 'react';
import Layout from '../../Layout';
import Recomendations from '../../layout/Manga/Recomendation/recomendations';

const Home = () => {
    return (
        <Layout>
            <div className='flex justify-center relative'>
                <img
                    className='w-[68rem] h-96 p-2 rounded-xl'
                    src="https://upload-os-bbs.hoyolab.com/upload/2023/05/15/8009863/dc1a988379412d1c755c41a333366c0a_3556171613405052793.png?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_80"
                    alt="banner"
                />
            </div>
            <h1 className='text-2xl font-bold mt-4 xl:ml-24 sm:ml-0'>Manga Recommendations</h1>
            <Recomendations />
        </Layout>
    );
};

export default Home;
