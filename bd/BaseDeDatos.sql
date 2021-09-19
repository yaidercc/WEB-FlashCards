DROP DATABASE flashcards;
CREATE DATABASE flashcards;
use flashcards;

CREATE TABLE usuario(
	id int not null auto_increment primary key,
    username varchar(20) not null,
    email varchar(45) not null,
    clave varchar(25)
)Engine=Innodb;

CREATE TABLE tema(
	id int not null auto_increment primary key,
	tema varchar(30) not null,
	id_usuario int not null,
    foreign key(id_usuario) references usuario(id)
    on delete cascade
    on update cascade
)engine=innodb;

CREATE TABLE termino(
	id int not null auto_increment primary key,
    anverso text not null,
    reverso text not null
)engine=innodb;

CREATE TABLE flashcard(
	id_card int not null auto_increment primary key,
    color varchar(8),
    id_termino int not null,
    foreign key(id_termino)references termino(id)
    on delete cascade
    on update cascade
)engine=innodb;

CREATE TABLE flashcard_tema(
	id_tema int not null,
    id_flashcard int not null,
	foreign key(id_tema)references tema(id),
	foreign key(id_flashcard)references flashcard(id_card)
    on delete cascade
    on update cascade,
    primary key(id_tema,id_flashcard)
)engine=innodb;

/*indices*/
CREATE INDEX username ON usuario(username);
