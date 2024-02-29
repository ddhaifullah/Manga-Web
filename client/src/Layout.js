import React from 'react';
import NavigationBar from './components/Navbar';
import Footer from './layout/Footer';

const Layout = ({ children }) => {
    return (
        <div>
            <NavigationBar />
            <div>{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
