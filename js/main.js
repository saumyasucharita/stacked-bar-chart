console.log('Starting front-end project');
//The graph will show data of these cities for now
cities = ["Shanghai", "Mumbai", "Cairo", "New York", "London", "Paris", "Sydney", "San Jose"]
let cost_data = []; //Global variable
function render() {
    console.log('---------- Rendering!')
    fetchJSONData();   
}

//Function to generate y-axis scale labels
function generateyAxisLabels(start, end, step)
{
	labelStr = '';
	
  	for (let i = start; i >= end; i -= step) {
            labelStr += '<div class="YAxis-label">' + i + '</div>\n';
        }
  	return labelStr;
}

//Generate the main bar-chart
function generateMainBarChart(){
	console.log('In generate Main Bar');
	 let mainDiv = document.querySelector('#bar_chart'); 
	 // Clear anything that might be in the div
	 mainDiv.innerHTML = '';
	 
	 const yAxisDiv = document.createElement('div');
	 yAxisDiv.setAttribute('class', 'YAxis');
	 yAxisDiv.innerHTML = '';
	 yAxisDiv.innerHTML = generateyAxisLabels(6000, 500, 500);
	 
    	 mainDiv.append(yAxisDiv);
    	
  	for (let entry of cost_data) {
    	   const div = document.createElement('div');
	   div.setAttribute('class', 'BarChart-bar');
	   div.style.height = `${entry.barHeight}%`;
		
	    const apartmentDiv = document.createElement('div');
	    apartmentDiv.setAttribute('class', 'BarChart-stack barchart--apartment');
	    apartmentDiv.style.height = `${entry.apartmentHeight}%`;
	    apartmentDiv.setAttribute('onclick', `alert('Apartment rent in ${entry.city} is ${entry.rent} USD')`);

	    const apartmentLabel = document.createElement('p');
	    apartmentLabel.setAttribute('class', 'barchart--label');
	    apartmentLabel.textContent = entry.city;

	    apartmentDiv.appendChild(apartmentLabel);
	    div.appendChild(apartmentDiv);

	    const utilitiesDiv = document.createElement('div');
	    utilitiesDiv.setAttribute('class', 'BarChart-stack barchart--utilities');
	    utilitiesDiv.style.height = `${entry.utilitiesHeight}%`;
	    div.appendChild(utilitiesDiv);

	    const foodDiv = document.createElement('div');
	    foodDiv.setAttribute('class', 'BarChart-stack barchart--food');
	    foodDiv.style.height = `${entry.foodHeight}%`;
	    div.appendChild(foodDiv);   
    	   
	    mainDiv.append(div);
        }
}

//Function to read data from the JSON file
function fetchJSONData() {	
            fetch("./cost_of_living_data.json")
                .then((res) => {
                    if (!res.ok) {
                        throw new Error
                            (`HTTP error! Status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => {
                      for(let cityData of data){
                      const entry = {};
                      	if (cities.includes(cityData['city'])) {
                      		/*console.log('For city', cityData['city']);
        			console.log('Apartment rent is: ', cityData['x48']);
        			console.log('Utilities: ', cityData['x36']);
        			console.log('Meal cost for 60 meals: ', cityData['x1']*60); */
        			
        			//Calculate total living expense for the month
        			let totalSum = parseFloat(cityData['x48']) + parseFloat(cityData['x36']) + parseFloat(cityData['x1']*60);
        			let barHeight = totalSum/6000 * 100;
        			
        			//Calculate bar-section percentage
        			/*console.log('Apartment %', parseFloat(cityData['x48'])/totalSum * 100);
        			console.log('Utilities %', parseFloat(cityData['x36'])/totalSum * 100);
        			console.log('Meal cost %', parseFloat(cityData['x1']*60) /totalSum * 100); */
        			
        			//Set object properties like total bar-height
        			entry.barHeight = barHeight;
        			entry.rent = cityData['x48'];
        			entry.city = cityData['city'];
        			entry.apartmentHeight = parseFloat(cityData['x48'])/totalSum * 100;
        			entry.utilitiesHeight = parseFloat(cityData['x36'])/totalSum * 100;
        			entry.foodHeight = parseFloat(cityData['x1']*60)/totalSum * 100;
        			
        			console.log(entry);
        			cost_data.push(entry);
        			
      			}
                      }
                      generateMainBarChart();
                      })
                .catch((error) => 
                       console.error("Unable to fetch data:", error));
        }
render();
