import React from 'react';

const Header = () => {
    return (
        <header style={styles.header}>
            <h1 style={styles.title}>My React App</h1>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#820C0C',
        color: '#fff',
        padding: '10px',
    },
    title: {
        margin: 0,
    },
};

export default Header;