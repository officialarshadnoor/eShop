import React, { useEffect, useState } from 'react';

const CountDown = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date('2024-07-28') - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Clean up the timer
        return () => clearTimeout(timer);
    });

    const timerComponents = Object.keys(timeLeft).map((interval) => {
        if (timeLeft[interval] === undefined) {
            return null;
        }
        return (
            <span key={interval} className='text-[25px] text-[#475ad2]'>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });

    return (
        <div>
            {timerComponents.length ? (
                timerComponents
            ) : (
                <span className="text-[red] text-[25px]">Time's Up!</span>
            )}
        </div>
    );
};

export default CountDown;
