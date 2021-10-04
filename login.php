<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Lobster&family=Poppins:wght@300;400;600;700&display=swap"
      rel="stylesheet"
    />
    <!-- ionicons -->
    <script
      type="module"
      src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
    ></script>
    <script
      nomodule
      src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
    ></script>
    <script src="js/jquery-v1.min.js"></script>
    <link rel="stylesheet" href="css/normalize.css" />
    <link rel="stylesheet" href="css/global.css" />
    <link rel="stylesheet" href="css/styles.css" />
    <title>Login</title>
  </head>
  <body>
    <div class="container-login">
      <div class="container-form">
        <form action="#" class="form" id="form-login" >
          <h2>iniciar sesión</h2>
        
          <div class="input">
            <label >Ingresa tu usuario</label>
            <input type="text" name="user" placeholder="usuario" autocomplete="off" required/>
          </div>
          <div class="input">
            <label >Ingresa tu clave</label>
            <input type="password" name="clave" placeholder="clave" autocomplete="off"  required/>
            
          </div>
          <div class="btn_submit">
            <input type="submit" value="Ingresar" />
          </div>
          <p class="text-sign-in">
            No tienes cuenta? <a href="#" class="get-in">Registrate</a>
          </p>
        </form>
        <!-- registro -->
        <form action="#" class="form" id="form-sign-in">
          <h2>Registrarte</h2>
          
          <div class="input">
            <label >Ingresa tu usuario</label>
            <input type="text" name="user" id="inpt_user" placeholder="usuario" required/>
            <p class="validacion"><ion-icon name="alert-circle-outline"></ion-icon> <span>minimo 6 caracteres, sin espacios</span></p>
          </div>
          <div class="input">
            <label>Ingresa tu correo</label>
            <input type="email" name="email" id="inpt_email"  placeholder="email" required/>
            
          </div>
          <div class="input">
            <label >Ingresa tu clave</label>
            <input type="password" name="clave" id="inpt_clave" placeholder="clave" required/>
            <p class="validacion"> <ion-icon name="alert-circle-outline"></ion-icon><span>minimo 8 caracteres, una mayuscula y un numero</span></p>
          </div>
          
          <div class="btn_submit">
            <input type="submit" value="Ingresar" />
          </div>
          <p class="text-sign-in">
            Ya tienes cuenta? <a href="#" class="get-in">Ingresa</a>
          </p>
        </form>
      </div>
    </div>
    <script src="js/sweetalert2.all.min.js"></script>
    <script src="js/main-login.js"></script>
  </body>
</html>
