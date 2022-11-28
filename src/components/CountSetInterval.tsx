/* eslint-disable radix */
import {Text} from 'react-native';
import React, {useEffect, useState} from 'react';

//setInterval
export const CountSetInterval = (props: any) => {
  // label of counter
  // number to increment to
  // duration of count in seconds
  const {number, duration, label} = props;

  // number displayed by component
  const [count, setCount] = useState('0');

  // calc time taken for computation
  const [timeTaken, setTimeTaken] = useState(Date.now());

  useEffect(() => {
    let start = 0;

    // first three numbers from props
    const end = parseInt(number);
    let incre =
      end > 10000
        ? Math.ceil(end / Math.floor(end / 200))
        : end > 1000
        ? Math.ceil(end / 1)
        : end > 100
        ? Math.ceil(end / 1000)
        : Math.ceil(end / 100);

    // if zero, return
    if (start === end) {
      return;
    }
    // find duration per increment
    let totalMilSecDur = parseInt(duration);
    let incrementTime = (totalMilSecDur / end) * 1000;

    // timer increments start counter
    // then updates count
    // ends if start reaches end
    let timer = setInterval(() => {
      start += incre;

      //update uisng state
      setCount(String(start));

      //update using ref
      //   countRef.current.innerHTML = start;

      if (start >= end) {
        clearInterval(timer);
        const diff = Date.now() - timeTaken;
        setTimeTaken(diff / 1000);
        setCount(String(end));
        //uncomment this when using ref
        // setCount(String(start));
      }

      return () => clearInterval(timer);
    }, incrementTime);

    // dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number, duration]);

  return (
    <Text>
      {count}
      {label}
    </Text>
  );
};
