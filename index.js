window.addEventListener('load', () => {
	let long;
	let lat;
	let place = document.getElementById('city');
	let temp = document.getElementById('tmep');
	let summmary = document.getElementById('condition');
	let curTime = document.getElementById('time');
	const temperatureContainer = document.getElementById('temperature-container');
	const temperatureSpan = document.getElementById('temperature-span');

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/1cd6eac794827eee9b58e08f3dc71fb7/${lat}, ${long}`;

			fetch(api)
				.then((data) => {
					return data.json();
				})
				.then((res) => {
					console.log(res);
					const { temperature, summary, icon, time } = res.currently;

					//setting the DOM emelents with the api data
					temp.innerText = temperature;
					summmary.innerText = summary;
					place.innerText = res.timezone;
					curTime.innerText = time;

					const celcisu = (temperature - 32) * (5 / 9);

					//Setting the icons here
					setSkycons(icon, document.querySelector('.icons'));

					//setting the temperature
					temperatureContainer.addEventListener('click', () => {
						if (temperatureSpan.innerText === 'F') {
							temperatureSpan.innerText = 'C';
							temp.innerText = Math.floor(celcisu);
						} else {
							temperatureSpan.innerText = 'F';
							temp.innerText = temperature;
						}
					});
				});
		});
	}

	function setSkycons(icon, iconID) {
		const skycons = new Skycons({ color: 'black' });
		const currentIcon = icon.replace(/-/g, '_').toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});
