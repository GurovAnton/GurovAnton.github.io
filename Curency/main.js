var urlStack = [
  "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&date=",
  "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&date=",
  "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=CHF&date="
  ],
  ratesEurDol = [],
  ratesChfEur = [],
  date, 
  dateForURL,
  d,
  minRate = {
        rate: 100000,
        date: ""
    },
  maxRate = {
        rate: 0,
        date: ""
    },
  options = {
         year: 'numeric',
         month: 'numeric',
         day: 'numeric'
};
  
 // устанавливаем даты 
  date = new Date(2016, 6, 18);
  d = new Date();
  document.getElementById('fd').innerHTML =date.toLocaleString("en-US", options);
  document.getElementById('sd').innerHTML = d.toLocaleString("en-US", options);
//Функция конвертирует дату в формат для URL

    function convertDate (date) {
      var helper;
      dateForURL = date.toLocaleString("en-US", options);
      dateForURL = dateForURL.split('/');
      helper = dateForURL[0];
      dateForURL[0] = dateForURL[1];
      dateForURL[1]=helper;
     if ( dateForURL[0] / 10 < 1 ) {
        dateForURL[0] = "0" + dateForURL[0];
    }
     if ( dateForURL[1] / 10 < 1 ) {
        dateForURL[1] = "0" + dateForURL[1];
    }
      dateForURL = dateForURL.reverse().join(''); 

      return dateForURL;

    }

    convertDate(date);
    
// Функция, которая возвращает Promise
function getHttp(url) {

  return new Promise(function(resolve, reject) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {

      if (this.status == 200) {

        resolve(this.response);

      } else {

        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);

      }
    };

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });

}

// Функция расчета минимального и максимального рейта. Формирует данные. 

function minMax () {
    
  //объем данных очень большой! Максимально вытягивает около 4-х лет

    while (date<=d) {
        Promise.all([
              getHttp(urlStack[0] + dateForURL + "&json" ),
              getHttp(urlStack[1] + dateForURL + "&json" ),
              getHttp(urlStack[2] + dateForURL + "&json" )
            ])
        .then(function(res) {
              var dollar = JSON.parse(res[0]);
              var euro = JSON.parse(res[1]);
              var chf = JSON.parse(res[2]);
              var rate = euro[0].rate/dollar[0].rate;
              var chfEur = chf[0].rate/euro[0].rate;


                if (minRate.rate > rate) {
                    minRate.rate = rate;
                    minRate.date = euro[0].exchangedate;
                }
                if (maxRate.rate < rate) {
                    maxRate.rate = rate;
                    maxRate.date = euro[0].exchangedate;
                }

                    document.getElementById("minRate").innerHTML = minRate.rate;
                    document.getElementById("maxRate").innerHTML = maxRate.rate;
                    document.getElementById("minRateDate").innerHTML = minRate.date;
                    document.getElementById("maxRateDate").innerHTML = maxRate.date;

              ratesEurDol.push({
                rate: rate,
                date: euro[0].exchangedate
              });

              ratesChfEur.push({
                 rate: chfEur,
                 date: euro[0].exchangedate
                   });

                // Использую локал, но можно MongoDB

              localStorage.setItem('rates',JSON.stringify(ratesEurDol));
              localStorage.setItem('chfEur',JSON.stringify(ratesChfEur));

            })
          .catch(function(e){
              alert("Something wrong(((" + e);
          });

      

            date.setDate(date.getDate() + 1);
            dateForURL =  convertDate(date);
  }
         
            
}
        
           
         
  
// Функция подсчета среднего значения

function getAverage () {

var rates = localStorage.getItem('rates');
rates = JSON.parse(rates);
var average = 0;
for (var i = 0; i < rates.length; i++) {
  average = average + rates[i].rate;
  
}
  average = average/rates.length;
   
  document.getElementById("aver_rate").innerHTML = average;
  document.getElementById("count").innerHTML = countDays(average, rates); 
}

// Фунциия подсчета количества дней

    function countDays (aver, rates) {

      var percent = 0;
      var days = 0;

      for (var i = 0; i < rates.length; i++) {
            percent = aver/rates[i].rate;
            if (percent >= 0.95 && percent <= 1.05) {
            days++;
            }
      }
    return days;
    }

// Функция расчета корреляции

function correlation () {

      var eurUsd = localStorage.getItem('rates');
        eurUsd = JSON.parse(eurUsd);

      var chrEur = localStorage.getItem('chfEur');
        chrEur = JSON.parse(chrEur);

      var usdEuroAver = null,
          chfEuroAver = null ,
          sumTop = null,
          sqrDeviationUsdEuro = null,
          sqrDeviationChfEuro = null,
          result = null;

        for (var i = 0; i < eurUsd.length; i++) {
         usdEuroAver = usdEuroAver + 1/eurUsd[i].rate;
         chfEuroAver = chfEuroAver + chrEur[i].rate;
        }

        usdEuroAver = usdEuroAver/eurUsd.length;
        chfEuroAver = chfEuroAver/chrEur.length;

        for (var j = 0; j < eurUsd.length; j++) {
          sumTop = sumTop + ( 1/eurUsd[j].rate - usdEuroAver )*( chrEur[j].rate - chfEuroAver );
          sqrDeviationUsdEuro = sqrDeviationUsdEuro + Math.pow(( 1/eurUsd[j].rate - usdEuroAver ), 2);
          sqrDeviationChfEuro = sqrDeviationChfEuro +  Math.pow(( chrEur[j].rate - chfEuroAver ), 2);
        }
        
        result = sumTop/Math.sqrt( sqrDeviationUsdEuro * sqrDeviationChfEuro );

        document.getElementById("result_correl").innerHTML = result;
}

document.getElementById("min_max").addEventListener("click", minMax);
document.getElementById("average").addEventListener("click", getAverage);
document.getElementById("correl").addEventListener("click", correlation); 
 