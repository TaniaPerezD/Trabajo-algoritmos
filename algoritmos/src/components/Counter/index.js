import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const Counter = ({ start, end, duration, counterSubText }) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div ref={ref}>
      {inView ? <CountUp start={start} end={end} duration={duration} /> : start}
      {counterSubText}
    </div>
  );
};

export default Counter;
