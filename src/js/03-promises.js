import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formPromises = document.querySelector('.form');

formPromises.addEventListener('submit', onSubmit);

function onSubmit(eve) {
  eve.preventDefault();
  const { delay, amount, step } = eve.currentTarget.elements;

  const numAmount = Number(amount.value);
  const numStep = Number(step.value);
  const numDelay = Number(delay.value);

  for (let position = 1; position <= numAmount; position++) {
    const delays = numDelay + numStep * position;
    createPromise(position, delays)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    eve.currentTarget.reset();
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
