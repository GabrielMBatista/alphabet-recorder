import React from 'react';

interface SvgComponentProps {
    activeNumber: number;
}

const SvgComponent: React.FC<SvgComponentProps> = ({ activeNumber }) => {
    const getPathColor = (index: number): string => {
        return activeNumber >= index ? 'rgb(233, 104, 47)' : 'rgb(255, 207, 31)';
    };

    return (
        <div className='w-72 h-50'>
            <svg viewBox="76.75 188.139 185.396 82.529" xmlns="http://www.w3.org/2000/svg">
                <path d="M 106.237 195 C 106.237 195 106.237 265 106.237 265 C 106.337 265 101.237 267 101.237 267 C 101.237 267 96.237 265 96.237 265 C 96.237 265 96.437 195 96.237 195 L 101.237 192 C 101.337 192 106.237 195 106.237 195 Z" style={{ fill: getPathColor(1), strokeLinejoin: "round", strokeLinecap: "round", stroke: "rgb(0, 150, 208)", strokeWidth: "2px" }} />
                <path d="M 118.744 206.989 L 118.744 253.389 C 118.844 253.389 113.744 254.715 113.744 254.715 L 108.744 253.389 C 108.744 253.389 108.875 207.402 108.744 206.989 L 113.744 205 C 113.844 205 118.744 206.989 118.744 206.989 Z" style={{ fill: getPathColor(1), strokeLinejoin: "round", strokeLinecap: "round", stroke: "rgb(0, 150, 208)", strokeWidth: "2px" }} />
                <path d="M 131.251 195 C 131.251 195 131.251 265 131.251 265 C 131.351 265 126.251 267 126.251 267 C 126.251 267 121.251 265 121.251 265 C 121.251 265 121.451 195 121.251 195 L 126.251 192 C 126.351 192 131.251 195 131.251 195 Z" style={{ fill: getPathColor(2), strokeLinejoin: "round", strokeLinecap: "round", stroke: "rgb(0, 150, 208)", strokeWidth: "2px" }} />
                <path d="M 143.758 206.989 L 143.758 253.389 C 143.858 253.389 138.758 254.715 138.758 254.715 L 133.758 253.389 C 133.758 253.389 133.889 207.402 133.758 206.989 L 138.758 205 C 138.858 205 143.758 206.989 143.758 206.989 Z" style={{ fill: getPathColor(3), strokeLinejoin: "round", strokeLinecap: "round", stroke: "rgb(0, 150, 208)", strokeWidth: "2px" }} />
                <path d="M 156.265 195 C 156.265 195 156.265 265 156.265 265 C 156.365 265 151.265 267 151.265 267 C 151.265 267 146.265 265 146.265 265 C 146.265 265 146.465 195 146.265 195 L 151.265 192 C 151.365 192 156.265 195 156.265 195 Z" style={{ fill: getPathColor(4), strokeLinejoin: "round", strokeLinecap: "round", stroke: "rgb(0, 150, 208)", strokeWidth: "2px" }} />
                <path d="M 168.772 206.989 L 168.772 253.389 C 168.872 253.389 163.772 254.715 163.772 254.715 L 158.772 253.389 C 158.772 253.389 158.903 207.402 158.772 206.989 L 163.772 205 C 163.872 205 168.772 206.989 168.772 206.989 Z" style={{ fill: getPathColor(5), strokeLinejoin: "round", strokeLinecap: "round", stroke: "rgb(0, 150, 208)", strokeWidth: "2px" }} />
                <path d="M 181.279 195 C 181.279 195 181.279 265 181.279 265 C 181.379 265 176.279 267 176.279 267 C 176.279 267 171.279 265 171.279 265 C 171.279 265 171.479 195 171.279 195 L 176.279 192 C 176.379 192 181.279 195 181.279 195 Z" style={{ fill: getPathColor(5), strokeLinejoin: "round", strokeLinecap: "round", stroke: "rgb(0, 150, 208)", strokeWidth: "2px" }} />
                <path d="M 193.786 206.989 L 193.786 253.389 C 193.886 253.389 188.786 254.715 188.786 254.715 L 183.786 253.389 C 183.786 253.389 183.917 207.402 183.786 206.989 L 188.786 205 C 188.886 205 193.786 206.989 193.786 206.989 Z" style={{ fill: getPathColor(6), strokeLinejoin: "round", strokeLinecap: "round", stroke: "rgb(0, 150, 208)", strokeWidth: "2px" }} />
                <path d="M 206.293 195 C 206.293 195 206.293 265 206.293 265 C 206.393 265 201.293 267 201.293 267 C 201.293 267 196.293 265 196.293 265 C 196.293 265 196.493 195 196.293 195 L 201.293 192 C 201.393 192 206.293 195 206.293 195 Z" style={{ fill: getPathColor(7), strokeLinejoin: "round", strokeLinecap: "round", stroke: "rgb(0, 150, 208)", strokeWidth: "2px" }} />
                <path d="M 218.800 206.989 L 218.800 253.389 C 218.900 253.389 213.800 254.715 213.800 254.715 L 208.800 253.389 C 208.800 253.389 208.931 207.402 208.800 206.989 L 213.800 205 C 213.900 205 218.800 206.989 218.800 206.989 Z" style={{ fill: getPathColor(8), strokeLinejoin: "round", strokeLinecap: "round", stroke: "rgb(0, 150, 208)", strokeWidth: "2px" }} />
                <path d="M 231.307 195 C 231.307 195 231.307 265 231.307 265 C 231.407 265 226.307 267 226.307 267 C 226.307 267 221.307 265 221.307 265 C 221.307 265 221.507 195 221.307 195 L 226.307 192 C 226.407 192 231.307 195 231.307 195 Z" style={{ fill: getPathColor(9), strokeLinejoin: "round", strokeLinecap: "round", stroke: "rgb(0, 150, 208)", strokeWidth: "2px" }} />
                <path d="M 243.814 206.989 L 243.814 253.389 C 243.914 253.389 238.814 254.715 238.814 254.715 L 233.814 253.389 C 233.814 253.389 233.945 207.402 233.814 206.989 L 238.814 205 C 238.914 205 243.814 206.989 243.814 206.989 Z" style={{ fill: getPathColor(10), strokeLinejoin: "round", strokeLinecap: "round", stroke: "rgb(0, 150, 208)", strokeWidth: "2px" }} />
                <path d="M 256.321 195 C 256.321 195 256.321 265 256.321 265 C 256.421 265 251.321 267 251.321 267 C 251.321 267 246.321 265 246.321 265 C 246.321 265 246.521 195 246.321 195 L 251.321 192 C 251.421 192 256.321 195 256.321 195 Z" style={{ fill: getPathColor(11), strokeLinejoin: "round", strokeLinecap: "round", stroke: "rgb(0, 150, 208)", strokeWidth: "2px" }} />
            </svg>

        </div>
    );
};

export default SvgComponent;
