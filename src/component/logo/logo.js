import React from 'react';
import './logo.css';
import logoImg from './logo.jpeg';

export default class Logo extends React.Component {
    render() {
        return (
            <div className="logo-container">
                <img className="logo" src={logoImg} alt="logo" />
            </div>
        );
    }
}