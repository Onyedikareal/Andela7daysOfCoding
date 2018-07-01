// Registering the Service Worker

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('../worker.js', {scope:'../'}).then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
else {
    console.log('Service workers are not supported.');
  }
  

let val;

let dropdown = document.getElementById('dropdown');
dropdown.length = 0;
let defaultOption = document.createElement('option');
defaultOption.text = "Choose Currency";
dropdown.add(defaultOption);
dropdown.selectedIndex = 0;


let dropdown1 = document.getElementById('dropdown1');
dropdown1.length = 0;
let defaultOption1 = document.createElement('option');
defaultOption1.text = "Choose Currency";
dropdown1.add(defaultOption1);
dropdown1.selectedIndex = 0;
const url = "https://free.currencyconverterapi.com/api/v5/currencies";
fetch(url)
.then(
    res=>res.json()
    )
.then(data =>{
        for(let key in data){
            if(data.hasOwnProperty(key)){
            return data[key];}
        }
    })
.then(
    data1=>{
        let option;
        for(let keys in data1){
            if(data1.hasOwnProperty(keys)){
                option = document.createElement('option');
                let option2 = document.createElement('option');
                option.text = `${data1[keys].currencyName} (${data1[keys].currencySymbol})`;
                option.value = `${data1[keys].id}`
                option2.text = `${data1[keys].currencyName} (${data1[keys].currencySymbol})`;
                option2.value = `${data1[keys].id}`
                dropdown.add(option);
                dropdown1.add(option2);
            }


        }
        
    }
)
.catch(error => {
	console.log(error);
})
let convertFrom;
let convertTo;
dropdown.addEventListener('change', ()=>{
        var x = dropdown.selectedIndex;
       convertFrom = document.getElementsByTagName('option')[x].value;
})
dropdown1.addEventListener('change', ()=>{
    var y = dropdown1.selectedIndex;
    convertTo= document.getElementsByTagName('option')[y].value;
})

document.getElementById('convert').addEventListener('click', function(){
    val = document.getElementById('input').value;
    const query = `${convertFrom}_${convertTo}`;
    const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=y`;
    fetch(url)
        .then(response => response.json())
        .then(parsedData => {
            for(let rate in parsedData){
          if(parsedData.hasOwnProperty(rate)){
           let calc = (parsedData[rate].val); 
            let total = (Number(val) * calc);
            document.getElementById('display').value = (Math.round(total * 100) / 100);
          }
            }
        })
        .catch(error => {
          console.log(error);
      })	
  	
})

                        