
$(document).ready(function(){

	$(window).scroll(function(){
		if( $(this).scrollTop() > 0 ){
			$('header').addClass('header2');
            document.getElementById('nav').style.display = "block";
		} else {
			$('header').removeClass('header2');
            document.getElementById('nav').style.display = "none";
		}
	});

});

function onSubmitForm (event) {
    event.preventDefault();

    const formData = JSON.stringify({
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    })

    const sendFormDataRequest = new Request("https://jsonplaceholder.typicode.com/posts", {
        method: 'POST',
        body: formData,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })

    fetch(sendFormDataRequest)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            Swal.fire(
                'Enviado correctamente',
                'Nos pondremos en contacto contigo',
                'success'
            );
            cleanForm();
        })
        .catch((err) => {
            Swal.fire(
                'Error',
                'Intente nuevamente mas tarde',
                'error'
            );
            console.log(err)
        });
}

function cleanForm() {
    const form = document.getElementById("form");
    form.reset();
}

const submitFormButton = document.getElementById("submitFormButton")
submitFormButton.addEventListener("click", onSubmitForm)

const renderTemperatureChart = () => {

    const ciudadCulturalLocation = {
        latitude: -24.183221938956596,
        longitude: -65.33124425818666,
    }

    const temperatureRequest = new Request(`https://api.open-meteo.com/v1/forecast?latitude=${ciudadCulturalLocation.latitude}&longitude=${ciudadCulturalLocation.longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=America/Argentina/Jujuy`)

    fetch(temperatureRequest)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            
            const chartData = {
                labels: data.daily.time,
                datasets: [{
                    label: 'Maxima',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: data.daily.temperature_2m_max,
                },
                {
                    label: 'Minima',
                    backgroundColor: 'rgb(0, 99, 132)',
                    borderColor: 'rgb(0, 99, 132)',
                    data: data.daily.temperature_2m_min,
                }]
            };
        
            const config = {
                type: 'line',
                data: chartData,
                options: {}
            };
            const myChart = new Chart(
                document.getElementById('myChart'),
                config
            );
        })
        .catch((err) => {
            console.log(err)
        });
}

renderTemperatureChart()