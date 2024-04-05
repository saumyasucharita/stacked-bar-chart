console.log('Starting front-end project');
cities = ["Shanghai", "Mumbai", "Cairo", "New York", "London", "Paris", "Sydney", "San Jose"]
let cost_data = []; //Global variable
function render() {
    console.log('---------- rendering!')
    
    //console.log(generateyAxisLabels(6000, 500, 500));
    //console.log('***************************');
    console.log(generateMainBarChart());
    fetchJSONData();
    	
    // Loop through the array of information
   /* for (let powerLevelInfo of powerLevels) {

        // Grab the powerLevel and name of each test subject
        let powerLevel = powerLevelInfo[0];
        let name = powerLevelInfo[1];

        // Create a new div that contains this information
        let newDiv = document.createElement('div');

        // Give that div the class TestSubject, and fill in text with the name
        newDiv.classList.add('TestSubject');

        // Challenge 2:
        newDiv.textContent = name + ' - ' + powerLevel;

        // Challenge 3:
        newDiv.style.width = powerLevel * 100 + 'px';

        // Add the div to the page
        console.log('made a new div:', newDiv)
        resultsDiv.appendChild(newDiv); */
    
}

function generateyAxisLabels(start, end, step)
{
	labelStr = '';
	
  	for (let i = start; i >= end; i -= step) {
            labelStr += '<div class="YAxis-label">' + i + '</div>\n';
        }
  	return labelStr;
}

function generateMainBarChart(){
	console.log('In generate Main Bar');
	barchart_str = '';
	
	/*let mainDiv = document.querySelector('#bar_chart'); 
	mainDiv.innerHTML = '';
	
	// Fetch the div from the page
    	let yAxisDiv = document.querySelector('#yAxisLabels');
    	console.log(yAxisDiv);*/

    	// Clear anything that might be in the div
    	//yAxisDiv.innerHTML = generateyAxisLabels(6000, 500, 500);
  	for (let entry of cost_data) {
            //barchart_str += '<div class="BarChart-bar" style="height: 24.98%;"></div>\n';
            //Total Bar Height%
    	   const div = document.createElement('div');
	   div.setAttribute('class', 'BarChart-bar');
	   //barDiv.style.height = `${entry.rent}%`;
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
    	    
    	    //mainDiv.append(yAxisDiv);
	    mainDiv.append(div);
        }
        //console.log(fetchJSONData());
  	return barchart_str;
}
function fetchJSONData() {
	    for(let city of cities){
	    	console.log(city);
	    }	
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
                      		console.log('For city', cityData['city']);
        			console.log('Apartment rent is: ', cityData['x48']);
        			console.log('Utilities: ', cityData['x36']);
        			console.log('Meal cost for 60 meals: ', cityData['x1']*60);
        			let totalSum = parseFloat(cityData['x48']) + parseFloat(cityData['x36']) + parseFloat(cityData['x1']*60);
        			console.log('Total living expense in this city is:', totalSum);
        			let barHeight = totalSum/6000 * 100;
        			console.log('Bar height in %', barHeight);
        			
        			//Calculate bar-section percentage
        			console.log('Apartment %', parseFloat(cityData['x48'])/totalSum * 100);
        			console.log('Utilities %', parseFloat(cityData['x36'])/totalSum * 100);
        			console.log('Meal cost %', parseFloat(cityData['x1']*60) /totalSum * 100);
        			
        			entry.barHeight = barHeight;
        			entry.rent = cityData['x48'];
        			entry.city = cityData['city'];
        			entry.apartmentHeight = parseFloat(cityData['x48'])/totalSum * 100;
        			entry.utilitiesHeight = parseFloat(cityData['x36'])/totalSum * 100;
        			entry.foodHeight = parseFloat(cityData['x1']*60)/totalSum * 100;
        			
        			console.log('Entry');
        			console.log(entry);
        			/*const entry = {rent: 200,
					city: 'San Jose',
					apartmentHeight: '60',
					utilitiesHeight: '10',
					}*/

        			
        			cost_data.push(entry);
        			
      			}
                      }
                      generateMainBarChart();
                      })
                .catch((error) => 
                       console.error("Unable to fetch data:", error));
        }
render();
