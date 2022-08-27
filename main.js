
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