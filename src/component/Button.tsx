import React, { Children } from 'react'
import './Button.css'
import { Link } from 'react-router-dom';

interface ButtonProps {
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    buttonStyle?: string;
    buttonSize?: string;
}
const BUTTON_STYLES = ['btn--primary', 'btn--outline'];
const BUTTON_SIZES = ['btn--medium', 'btn--large'];

const Button: React.FC<ButtonProps> = ({ children, type, onClick, buttonStyle, buttonSize }) => {
    const STYLES = ['btn--primary', 'btn--outline'];
    const SIZES = ['btn--medium', 'btn--large'];

    const checkButtonStyle = STYLES.includes(buttonStyle!) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize!) ? buttonSize : SIZES[0];

    return (
        <Link to='/' className='btn-mobile'>
            <button
            className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            onClick={onClick}
            type={type}
            >   
            {children}
            </button>
        </Link>
        );
};

export default Button;
