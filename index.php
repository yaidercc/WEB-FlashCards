<?php
  session_start();
  if(!isset( $_SESSION["user"])){
    header('location: login.php');
  }
?>

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
    <title>FlashCards</title>
  </head>
  <body>
    <input type="hidden"  id="id_user" value=<?=$_SESSION['id_user']?>>
    <!-- navegation bar -->
    <header class="bar">
      <div class="header_content container">
        <h1>FlashCards</h1>
        <ul class="profile">
          <li class="btn_profile">
            <a href="#">
              <img src="img/icon-men.png" alt="men icon" />
              <span><?php echo $_SESSION["user"];?></span>
            </a>
            <ul class="submenu_profile">
              <li>
                <a href="php/salir.php" class="leave" id="leave">
                  <ion-icon name="power-outline"></ion-icon>
                  <span>salir</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
    <!-- section managment flahscards -->
    <section class="mg-top container" >
      <!-- submenu topics -->
      <ul class="container_list-topics">
        <li class="btn_open-topics" id="btn_open-topics">
          <a href="#submenu_topics" class="btn_topics">
            <span>temarios</span>
            <ion-icon name="chevron-down-outline"></ion-icon>
          </a>
          <ul class="submenu_topics" id="submenu_topics">
            <li>
              <div class="input_search" data-search="temarios">
                <input
                  type="search"
                  id="search_topics"
                  name="search"
                  placeholder="Buscar temarios"
                />
                <ion-icon name="search-outline"></ion-icon>
              </div>
            </li>
            <li class="topics_container scroll" id="topics_container">
              
            </li>
            <div class="container_new-topic" id="btn_new-Topic">
              <a href="#">
                <ion-icon name="add-outline"></ion-icon>
                <span>Nuevo</span>
              </a>
            </div>
          </ul>
        </li>
      </ul>
      <!-- flascards managment -->
      <h2 id="topic_title"></h2>
      <div class="flashcard_customize" id="flashcard_customize">
        <a href="#" class="btn btn_primary" id="btn_new-flashcard">
          <ion-icon name="add-outline"></ion-icon>
          <span>nueva flashcard</span>
        </a>
        <div class="input_search">
          <input
            type="search"
            name="search"
            id="search_flashcard"
            placeholder="Buscar flashcards"
            data-search="flashcards"
          />
          <ion-icon name="search-outline"></ion-icon>
        </div>
      </div>
    </section>
    <!-- flashcards -->
    <main class="mg-top container" id="main">
    <div class="container_flashcards scroll" >
        
    </div>
      <!-- <div class="not-found">
        <span><ion-icon name="search-outline"></ion-icon></span>
        <p>No tienes flashcards</p>
      </div>  -->
      
      
    </main>
    <!-- definition flashcards -->
    <section class="mg-top container definition_flashcard">
      <div class="definition">
        <h3>que son las flashcards</h3>
        <p>
        Las tarjetas de estudio o flashcards son un recurso estudiantil
            basado en un recorte, en forma de tarjeta, que por un lado contiene
            una pregunta del temario y, por el otro, la respuesta. Además, las
            tarjetas de estudio pueden contener la información adicional
            necesaria, como definiciones, esquemas, etc...
          </p>
          <a
            href="https://www.universia.net/es/actualidad/orientacion-academica/que-son-las-tarjetas-de-estudio-o-flashcards.html"
            target="_blank"
            >Fuente.</a
          >
      </div>
      <img src="img/flashcards.jpg" alt="" />
    </section>
    <footer class="site-footer">
      <div class="content_footer container">
        <p>&copy; Todos Los Derechos Reservados</p>
        <ul class="info">
          <li>
            <a href="#">
              <ion-icon name="briefcase-outline"></ion-icon>
              <span>portafolio</span>
            </a>
          </li>
          <li>
            <a href="#">
              <ion-icon name="logo-github"></ion-icon>
              <span>repositorio</span>
            </a>
          </li>
          <li>
            <a href="#">
              <ion-icon name="logo-linkedin"></ion-icon>
              <span>linkedin</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>

    <!-- modal window -->
    <div class="overlay" id="overlay">
      <!-- modal agregar temario -->
      <div class="modal" id="modal">
        <div class="header">
          <h2 id="title_modal"></h2>
          <a href="#" class="btn_close" id="btn_close">X</a>
        </div>
        <div>
          <!-- topic -->
          <form action="#" class="form hidden" id="form_topic">
            <div class="input input_modal">
              <label for="topic">ingresa el nombre del temario</label>
              <input type="text" id="topic" name="temario" placeholder="EJ: matematicas"  required >
            </div>
            <div class="btn_submit">
              <ion-icon name="save"></ion-icon>
              <input type="submit" value="guardar" />
            </div>
          </form>
          <!-- flashcard -->
          <form action="#" class="hidden form" id="form_flashcards">
            <div class="input input_modal">
              <label for="question">ingrese la pregunta</label>
              <input
              name="anverso"
                type="text"
                id="question"
                placeholder="EJ: Planeta Mas Grande Del Sistema Solar"
              />
            </div>
            <div class="input input_modal">
              <label for="answer">ingrese la respuesta</label>
              <textarea
              name="reverso"
                type="text"
                id="answer"
                placeholder="EJ: jupiter"
              ></textarea>
            </div>
            <div class="input input_modal">
              <label for="answer">elija un color</label>
              <input type="color" class="input_color" name="color"/>
            </div>
            <div class="btn_submit">
              <ion-icon name="save"></ion-icon>
              <input type="submit" value="guardar" />
            </div>
          </form>
          <!-- change flashcard -->
          <form action="#" class="hidden form" id="form_change_flashcards">
            <input type="hidden" name="id" id="id_card">
            <div class="input input_modal">
              <label for="question">ingrese la pregunta</label>
              <input
              name="anverso"
                type="text"
                id="question_change"
                placeholder="EJ: Planeta Mas Grande Del Sistema Solar"
              />
            </div>
            <div class="input input_modal">
              <label for="answer">ingrese la respuesta</label>
              <textarea
              name="reverso"
                type="text"
                id="answer_change"
                placeholder="EJ: jupiter"
              ></textarea>
            </div>
            <div class="input input_modal">
              <label for="answer">elija un color</label>
              <input type="color" class="input_color" name="color" id="color_change"/>
            </div>
            <div class="btn_submit">
              <ion-icon name="save"></ion-icon>
              <input type="submit" value="guardar" />
            </div>
          </form>
        </div>
      </div>
      
    </div>
    <div id="ohsnap"></div>
    <script src="js/sweetalert2.all.min.js"></script>
    <script src="js/ohsnap.js"></script>
    <script src="js/main.js"></script>
  </body>
</html>
