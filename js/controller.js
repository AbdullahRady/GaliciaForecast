app.controller("weatherCtrl", function($scope, $http)
{
	var s = $scope;
	
	s.pageData = 
	{
		title: "Galicia Weather forecast",
		mainHeading: "Galicia",
		subHeading: "Weather forecast"
	}
	
	s.apiKey = "aaf3dbb52ffa6b9612db0fffdabda6a0";
	
	
	s.weatherForecast = function(c) 
	{
		s.city = c;
		s.apiCall = "http://api.openweathermap.org/data/2.5/forecast?q="+s.city+",es&appid="+s.apiKey;
		

		$http.get(s.apiCall).success
		(
			function(data)
			{
				s.temp = (data.list[0].main.temp-273.15).toFixed(0);
								
				s.forecast = [];
				
				s.day = 0;
				
				for(var i = 0; i < 32 ; i += 8)
				{
					s.d = new Date(data.list[i].dt_txt);
					s.date = s.d.toDateString();
					
					s.minTemp = (data.list[i].main.temp_min-273.15).toFixed(0);
					s.maxTemp = (data.list[i].main.temp_max-273.15).toFixed(0);					
					s.pressure = data.list[i].main.pressure;
					s.humidity = data.list[i].main.humidity;
					s.weather = data.list[i].weather[0].main;
					s.weatherDescription = data.list[i].weather[0].description;
					s.icon = "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";
					
					s.forecast[s.day] = 
					{
						"date": s.date,
						"min": s.minTemp,
						"max": s.maxTemp,
						"pressure": s.pressure,
						"humidity": s.humidity,
						"weather": s.weather,
						"description": s.weatherDescription,
						"icon": s.icon
					};
					
					s.day++;
					
				}
								
			}
			
		);
							
	}
	
});