const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
console.log(body);

btnStart.addEventListener('click', btnStartColor);
btnStop.addEventListener('click', btnStopColor);

function btnStartColor() {
  //   btnStart.setAttribute('disabled', true);
  //   btnStop.removeAttribute('disabled');
  btnStart.disabled = true;
  btnStop.disabled = false;
  changeColorBody = setInterval(() => {
    body.style.background = getRandomHexColor();
  }, 1000);
}

function btnStopColor() {
  btnStart.disabled = false;
  btnStop.disabled = true;
  clearInterval(changeColorBody);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
