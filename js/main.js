console.log('Starting front-end project');
cities = ["Shanghai", "Mumbai", "Cairo", "New York", "London", "Paris", "Sydney", "San Jose"]
function render() {
    console.log('---------- rendering!')
    // Fetch the div from the page
    let yAxisDiv = document.querySelector('#yAxisLabels');

    // Clear anything that might be in the div
    yAxisDiv.innerHTML = generateyAxisLabels(6000, 500, 500);
    console.log(generateyAxisLabels(6000, 500, 500));
    console.log('***************************');
    console.log(generateMainBarChart());
    
    	
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
	
  	for (let i = 0; i <= 7; i++) {
            barchart_str += '<div class="BarChart-bar" style="height: 24.98%;"></div>\n';
        }
        console.log(fetchJSONData());
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
      			}
                      }})
                .catch((error) => 
                       console.error("Unable to fetch data:", error));
        }
render();
