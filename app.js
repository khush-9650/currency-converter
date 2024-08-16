import countryList from "./codes.js";

const BASE_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies';

const selects = document.querySelectorAll('.dropdown select');
const input = document.querySelector('.amount input');
const btn = document.querySelector('button');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg') ;


selects.forEach((select) => {
    for (let Currencycode in countryList) {
        const newOPtion = document.createElement('option');
        newOPtion.value = Currencycode;
        newOPtion.textContent = Currencycode;
        select.append(newOPtion);

        if (select.name == 'from' && Currencycode == 'USD') {
            newOPtion.selected = 'selected';
        }
        if (select.name == 'to' && Currencycode == 'INR') {
            newOPtion.selected = 'selected';
        }

    }
    select.addEventListener('change', (e) => {
        // console.log(countryList[e.target.value]);
        updateFlag(e.target);
    });

});

const updateFlag = (select) => {
    let currencyCode = select.value;
    let countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = select.parentElement.querySelector('img');
    img.src = newSrc;
}

btn.addEventListener('click', async(e) => {
    e.preventDefault();
    let amtVal = input.value;

    if (amtVal === "" || amtVal <= 0) {
        amtVal = 1;
        input.value = 1;
    }
    let URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    console.log(URL);

    let response = await fetch(URL);
    let data = await response.json();

    let rate = data[toCurr.value.toLowerCase()];
    let finalAmt = rate * amtVal;

    msg.textContent = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;

});