function mostrarPassword(){
    var cambio = document.getElementById("typePasswordX-2");
    if(cambio.type == "password"){
        cambio.type = "text";
        $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    }else{
        cambio.type = "password";
        $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }
} 

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loggin');

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const inputs = form.querySelectorAll('input');

        let vacio = false;
        inputs.forEach((input) => {
            if(input.value == ''){
                vacio = true;
            }
        });
        if(vacio){
            alert('¡Usuario y/o Contraseña incorrecta!');
        } else {
            /* Seteo la info de usuario en el localStorage, previo a redirigir a la homepage */
            let usuario = document.getElementById('user');
            localStorage.setItem('user', usuario.value);

            window.location.href= "homepage.html"; 
        } 
        
    })
    
})

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  };



