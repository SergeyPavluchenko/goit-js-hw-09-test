import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputData = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

btnStart.addEventListener('click', onClick);

const fp = flatpickr(inputData, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      Notify.info('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
    }
  },
});

function onClick() {
  const selectedDate = fp.selectedDates[0].getTime();
  if (selectedDate > Date.now()) {
    const timer = setInterval(() => {
      totalTime = selectedDate - Date.now();
      const time = convertMs(totalTime);
      console.log(time);
      updateTime(time);
      if (totalTime < 1000) {
        clearInterval(timer);
        Notify.success('Finish');
        btnStart.disabled = true;
      }
    }, 1000);
  }
}

function updateTime(tm) {
  days.textContent = tm.days;
  hours.textContent = tm.hours;
  minutes.textContent = tm.minutes;
  seconds.textContent = tm.seconds;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
