CREATE DATABASE SISTEMASEEKCLASS;
CREATE TABLE USUARIOS(
    USUARIO_ID INT NOT NULL AUTO_INCREMENT,
    NOME VARCHAR(100),
    EMAIL VARCHAR(100),
    SENHA VARCHAR(20),
    constraint ID_USUARIO PRIMARY KEY (USUARIO_ID),
    constraint EMAIL_USER unique (EMAIL)
);

create table gradePessoal(
    idGrade int not null auto_increment


);
create table gradeGeral(
    id_turma varcahar(10)

);

create table materia(
    materia_id int not null auto_increment,
    nome varchar(50),
    professor varchar(50),
    horario varchar(100)
);

create table gradeHoraria(
    grade_id int not null auto_increment

);
create table turma(
    turma_id int not null auto_increment,
    nome varchar(50)

);


INSERT INTO USUARIOS(NOME, EMAIL, tipoUsuario, admin, contato) VALUES 
    ("Diógenes Reis",
    "diogenes.reis@ifb.edu.br",
    1,
    true,
    "Telegram: https://t.me/Facklens"
    ),(
        "Hugo Do Carmo Mendes Cesar",
        "hugo.cesar@ifb.edu.br",
        1,
        true,
        "Telegram: https://t.me/RaizenSama"
    ),(
        "Denise Gomes de Moura",
        "denise.moura@ifb.edu.br",
        1,
        true,
        "Telegram:  https://t.me/Prof_Denise"
    ),(
        "Tiago Henrique Faccio Segato",
        "tiago.segato@ifb.edu.br",
        1,
        true,
        "Telegram: https://t.me/tiagosegato"
    );

INSERT INTO USUARIOS(NOME, EMAIL, admin, CONTATO, tipoUsuario, representante ) VALUES
    (
        "Admin",
        "netolima1992@gmail.com",
        true,
        "telegram teste",
        1,
        true
    );

INSERT INTO USUARIOS(NOME, EMAIL) VALUES 
    ("MARIA DENISE SIMOES",
    "maria.simoes@estudante.ifb.edu.br"),
    ("Samuel Machado",
    "samuel.machado@estudante.ifb.edu.br"),
    ("Wendell Rodrigues Feliciano",
    "wendell.feliciano@estudante.ifb.edu.br"),
    ("andre.santos@estudante.ifb.edu.br",
    "André Luiz Gomes Dos Santos"),
    ("caio.sallenave@estudante.ifb.edu.br",
    "Caio Nathan Gomes Sallenave"),
    ("douglas.shibata@estudante.ifb.edu.br", 
    "Douglas Seidi Shibata"),
    ("jose.izabel@estudante.ifb.edu.br",
    "José Augusto Chaves Izabel"),
    ("mikaela.pereira@estudante.ifb.edu.br",
    "Mikaela Brito Pereira");
    //brenda.teixeira@estudante.ifb.edu.br;



alter table notificacoes add column postar boolean
alter table notificacoes add column encaminhada varchar(100);
ALTER TABLE USUARIOS ADD constraint EMAIL_USER UNIQUE (EMAIL);
ALTER TABLE USUARIOS modify email unique;

create database materias;
CREATE TABLE materias(
    MATERIA_ID INT NOT NULL AUTO_INCREMENT,
    NOME VARCHAR(100) NOT NULL,
    PROFESSOR VARCHAR(100) NOT NULL,
    TURNO VARCHAR(1) NOT NULL,
    SEMESTRE INTEGER NOT NULL,
    CARGA_HORARIA INTEGER,
    constraint ID_USUARIO PRIMARY KEY (MATERIA_ID)
);
/* TSIV1*/
INSERT INTO GRADES(NOME, PROFESSOR, TURNO, SEMESTRE, createdAt, updatedAt) VALUES 
("INTRODUÇÃO A COMPUTAÇÃO","HUGO DO CARMO", "V", 1, "2021-05-18 17:41:05", "2021-05-18 17:41:05"),
("LÓGICA DE PROGRAMAÇÃO 1","MARCELO FERES", "V", 1, "2021-05-18 17:41:05", "2021-05-18 17:41:05"),
("METODOLIGIA CIENTÍFICA E ELABORAÇÃO DE TEXTOS", "DENISE GOMES", "V", 1, "2021-05-18 17:41:05", "2021-05-18 17:41:05"),
("CONSTRUÇÃO DE PÁGINAS PARA INTERNET 1", "TIAGO SEGATO", "V", 1, "2021-05-18 17:41:05", "2021-05-18 17:41:05"),
("REDES DE COMPUTADORES E INTERNET", "DIOGENES REIS", "V", 1, "2021-05-18 17:41:05", "2021-05-18 17:41:05");
/* TSIN1*/
INSERT INTO GRADES(NOME, PROFESSOR, TURNO, SEMESTRE, createdAt, updatedAt) VALUES 
("INTRODUÇÃO A COMPUTAÇÃO","DIEGO QUEIROZ", "N", 1, "2021-05-18 17:41:05", "2021-05-18 17:41:05"),
("LÓGICA DE PROGRAMAÇÃO 1","MARCELO FERES", "N", 1, "2021-05-18 17:41:05", "2021-05-18 17:41:05"),
("METODOLIGIA CIENTÍFICA E ELABORAÇÃO DE TEXTOS", "DENISE GOMES", "N", 1, "2021-05-18 17:41:05", "2021-05-18 17:41:05"),
("CONSTRUÇÃO DE PÁGINAS PARA INTERNET 1", "TIAGO SEGATO", "N", 1, "2021-05-18 17:41:05", "2021-05-18 17:41:05"),
("REDES DE COMPUTADORES E INTERNET", "DIOGENES REIS", "N", 1, "2021-05-18 17:41:05", "2021-05-18 17:41:05");
/* TSIV2*/
INSERT INTO GRADES(NOME, PROFESSOR, TURNO, SEMESTRE, createdAt, updatedAt) VALUES 
("CONSTRUÇÃO DE PÁGINAS PARA INTERNET 2","DIEGO QUEIROZ", "V", 2, "2021-05-18 17:41:05", "2021-05-18 17:41:05"),
("ENGENHARIA DE SOFTWARE","GUSTAVO HENRIQUE", "V", 2, "2021-05-18 17:41:05", "2021-05-18 17:41:05"),
("SISTEMAS OPERACIONAIS", "DANIEL SUNDFELD", "V", 2, "2021-05-18 17:41:05", "2021-05-18 17:41:05"),
("LOGICA DE PROGRAMAÇÃO 2", "KADIDJA VALERIA", "V", 2, "2021-05-18 17:41:05", "2021-05-18 17:41:05"),
("GESTÃO DE TI", "HENDERSON MATSURA", "V", 2, "2021-05-18 17:41:05", "2021-05-18 17:41:05");
/* TSIN2*/
INSERT INTO GRADES(NOME, PROFESSOR, TURNO, SEMESTRE) VALUES 
("CONSTRUÇÃO DE PÁGINAS PARA INTERNET 2","FABIO FERRAZ FERNANDEZ", "N", 2),
("ENGENHARIA DE SOFTWARE","GUSTAVO HENRIQUE", "N", 2),
("SISTEMAS OPERACIONAIS", "DANIEL SUNDFELD", "N", 2),
("LOGICA DE PROGRAMAÇÃO 2", "ALISSON WILKER", "N", 2),
("GESTÃO DE TI", "HUGO DO CARMO", "N", 2);
/* TSIV3*/
INSERT INTO MATERIAS(NOME, PROFESSOR, TURNO, SEMESTRE) VALUES 
("ANALISE E PROJETO DE SISTEMAS PARA INTERNET","HENDERSON MATSURA", "V", 3),
("PROGRAMAÇÃO ORIENTADA A OBJETOS","HEITOR JOSE", "V", 3),
("BANCO DE DADOS 1", "ANA REGIA", "V", 3),
("ADMINISTRAÇÃO DE SERVIÇOS PARA INTERNET", "DIOGENES REIS", "V", 3),
("MULTIMIDIA PARA INTERNET", "HENDERSON MATSURA", "V", 3);
/* TSIN3*/
INSERT INTO MATERIAS(NOME, PROFESSOR, TURNO, SEMESTRE) VALUES 
("ANALISE E PROJETO DE SISTEMAS PARA INTERNET","FABIO FERRAZ FERNANDEZ", "N", 3),
("PROGRAMAÇÃO ORIENTADA A OBJETOS","GUSTAVO HENRIQUE", "N", 3),
("BANCO DE DADOS 1", "JEFFERSON PEREIRA DA SILVA", "N", 3),
("ADMINISTRAÇÃO DE SERVIÇOS PARA INTERNET", "DIOGENES REIS", "N", 3),
("MULTIMIDIA PARA INTERNET", "HENDERSON MATSURA", "N", 3);
/* TSIV4*/
INSERT INTO MATERIAS(NOME, PROFESSOR, TURNO, SEMESTRE) VALUES 
("PROJETO DE TRABALHO DE CONCLUSÃO DE CURSO","DANIEL SUNDFELD", "V", 4),
("EMPREENDEDORISMO","EULLER BARROS", "V", 4),
("BANCO DE DADOS 2", "CAIO MOURA", "V", 4),
("SEGURANÇA E AUDITORIA DE SISTEMAS", "CRISTIANE BONFIM", "V", 4),
("PROGRAMAÇÃO PARA INTERNET 1", "MARX GOMES", "V", 4),
("OPTATIVA 1: TOPICOS ESPECIAIS EM TI APLICADO A SISTEMA PARA INTERNET", "ANA REGIA", "V", 4);
/* TSIN4*/
INSERT INTO MATERIAS(NOME, PROFESSOR, TURNO, SEMESTRE) VALUES 
("PROJETO DE TRABALHO DE CONCLUSÃO DE CURSO","DANIEL SUNDFELD", "N", 4),
("EMPREENDEDORISMO","EULLER BARROS", "N", 4),
("BANCO DE DADOS 2", "CAIO MOURA", "N", 4),
("SEGURANÇA E AUDITORIA DE SISTEMAS", "CRISTIANE BONFIM", "N", 4),
("PROGRAMAÇÃO PARA INTERNET 1", "ALISSON WILKER", "N", 4),
("OPTATIVA 1: TOPICOS ESPECIAIS EM GESTÃO DE TI", "BRUNO ROCHA BRAGA", "N", 4),
("OPTATIVA 1: TOPICOS ESPECIAIS EM COMPUTAÇÃO EM NUVEM", "DANIEL SUNDFELD", "N", 4);
/* TSIV5*/
INSERT INTO MATERIAS(NOME, PROFESSOR, TURNO, SEMESTRE) VALUES 
("TRABALHO DE CONCLUSÃO DE CURSO","MARCELO FERES", "V", 5),
("ESTATISTICA","FABIO NOGUEIRA CARLUCCI", "V", 5),
("ÉTICA", "RODRIGO RAMOS", "V", 5),
("COMERCIO ELETRONICO", "HENDERSON MATSURA", "V", 5),
("PROGRAMAÇÃO PARA INTERNET 2", "FABIO HENRIQUE", "V", 5),
("OPTATIVA 2: TOPICOS ESPECIAIS: INTRODUÇÃO A CIENCIA DE DADOS", "FABIO HENRIQUE", "V", 5);
/* TSIN5*/
INSERT INTO MATERIAS(NOME, PROFESSOR, TURNO, SEMESTRE) VALUES 
("TRABALHO DE CONCLUSÃO DE CURSO","MARCELO FERES", "N", 5),
("ESTATISTICA","FABIO NOGUEIRA CARLUCCI", "N", 5),
("ÉTICA", "RODRIGO RAMOS", "N", 5),
("COMERCIO ELETRONICO", "DIEGO QUEIROZ", "N", 5),
("PROGRAMAÇÃO PARA INTERNET 2", "KADIDJA VALERIA", "N", 5),
("OPTATIVA 2: TOPICOS ESPECIAIS EM TI APLICADO A SISTEMAS PARA INTERNET", "DIEGO QUEIROZ", "N", 5);


SELECT email, senha FROM usuarios
WHERE email='jose.nascimento@estudante.ifb.edu.br' AND senha='040510';

insert into usuarios(nome, email, admin, tipoUsuario, representante)values(
    "Admin", "netolima1992@gmail.com", 1,1,1
);

insert into tsin1(horario, segunda, terca, quarta, quinta, sexta)VALUES
 ("19h-19h50","Lógica de programação", "Construção de páginas para internet", "Rede de computadores", "Metodologia científica", "Introdução a computação"),
 ("19h50-20h40","Lógica de programação", "Construção de páginas para internet", "Rede de computadores", "Metodologia científica", "Introdução a computação"),
 ("21h-21h50","Lógica de programação", "Construção de páginas para internet", "Rede de computadores", "Lógica de programação", "Introdução a computação"),
 ("21h50-22h40","Lógica de programação", "Construção de páginas para internet", "Rede de computadores", "Lógica de programação", "Introdução a computação");

 insert into tsiv1(horario, segunda, terca, quarta, quinta, sexta)VALUES
 ("14h-15h","Rede de computadores", "Construção de páginas para internet", "Metodologia científica", "Lógica de programação", "Introdução a computação"),
 ("15h-16h","Rede de computadores", "Construção de páginas para internet", "Metodologia científica", "Lógica de programação", "Introdução a computação"),
 ("16h20-17h20","Rede de computadores", "Construção de páginas para internet", "Lógica de programação", "Lógica de programação", "Introdução a computação"),
 ("17h20-18h20","Rede de computadores", "Construção de páginas para internet", "Lógica de programação", "Lógica de programação", "Introdução a computação");

 insert into tsiv2(horario, segunda, terca, quarta, quinta, sexta)VALUES
 ("14h-15h","Lógica de Programação II", "Construção de páginas para internet II", "Engenharia de Software", "Sistema Operacional", "Gestão de TI"),
 ("15h-16h","Lógica de Programação II", "Construção de páginas para internet II", "Engenharia de Software", "Sistema Operacional", "Gestão de TI"),
 ("16h20-17h20","Lógica de Programação II", "Construção de páginas para internet II", "Engenharia de Software", "Sistema Operacional", "Gestão de TI"),
 ("17h20-18h20","Lógica de Programação II", "Construção de páginas para internet II", "Engenharia de Software", "Sistema Operacional", "Gestão de TI");

 insert into TSIN2(horario, segunda, terca, quarta, quinta, sexta)VALUES
 ("19h-19h50","Sistema Operacional", "Lógica de Programação II", "Construção de páginas para internet II", "Gestão de TI", "Engenharia de Software"),
 ("19h50-20h40","Sistema Operacional", "Lógica de Programação II", "Construção de páginas para internet II", "Gestão de TI", "Engenharia de Software"),
 ("21h-21h50","Sistema Operacional", "Lógica de Programação II", "Construção de páginas para internet II", "Gestão de TI", "Engenharia de Software"),
 ("21h50-22h40","Sistema Operacional", "Lógica de Programação II", "Construção de páginas para internet II", "Gestão de TI", "Engenharia de Software");

 insert into TSIV3(horario, segunda, terca, quarta, quinta, sexta)VALUES
 ("14h-15h","Análise e Projetos de Sistemas para Internet", "Programação Orientada a Objetos", "Banco de dados", "Administração de serviços para internet", "Multimídia para internet"),
 ("15h-16h","Análise e Projetos de Sistemas para Internet", "Programação Orientada a Objetos", "Banco de dados", "Administração de serviços para internet", "Multimídia para internet"),
 ("16h20-17h20","Análise e Projetos de Sistemas para Internet", "Programação Orientada a Objetos", "Banco de dados", "Administração de serviços para internet", "Multimídia para internet"),
 ("17h20-18h20","Análise e Projetos de Sistemas para Internet", "Programação Orientada a Objetos", "Banco de dados", "Administração de serviços para internet", "Multimídia para internet");

 insert into TSIN3(horario, segunda, terca, quarta, quinta, sexta)VALUES
 ("19h-19h50","Multimídia para internet", "Programação Orientada a Objetos", "Análise e Projetos de Sistemas para Internet", "Administração de serviços para internet", "Banco de dados"),
 ("19h50-20h40","Multimídia para internet", "Programação Orientada a Objetos", "Análise e Projetos de Sistemas para Internet", "Administração de serviços para internet", "Banco de dados"),
 ("21h-21h50","Multimídia para internet", "Programação Orientada a Objetos", "Análise e Projetos de Sistemas para Internet", "Administração de serviços para internet", "Banco de dados"),
 ("21h50-22h40","Multimídia para internet", "Programação Orientada a Objetos", "Análise e Projetos de Sistemas para Internet", "Administração de serviços para internet", "Banco de dados");

 insert into TSIV4(horario, segunda, terca, quarta, quinta, sexta)VALUES
 ("14h-15h","Projeto de Trabalho de Conclusão de Curso", "Programação para Internet I", "Segurança e Auditoria de Sistemas", "Banco de Dados II", "Optativa I"),
 ("15h-16h","Projeto de Trabalho de Conclusão de Curso", "Programação para Internet I", "Segurança e Auditoria de Sistemas", "Banco de Dados II", "Optativa I"),
 ("16h20-17h20","Empreendedorismo", "Programação para Internet I", "Segurança e Auditoria de Sistemas", "Banco de Dados II", "Optativa I"),
 ("17h20-18h20","Empreendedorismo", "Programação para Internet I", "Segurança e Auditoria de Sistemas", "Banco de Dados II", "Optativa I");

 insert into TSIN4(horario, segunda, terca, quarta, quinta, sexta)VALUES
 ("19h-19h50","Programação para Internet I", "Projeto de Trabalho de Conclusão de Curso", "Banco de Dados II", "Optativa I", "Segurança e Auditoria de Sistemas"),
 ("19h50-20h40","Programação para Internet I", "Projeto de Trabalho de Conclusão de Curso", "Banco de Dados II", "Optativa I", "Segurança e Auditoria de Sistemas"),
 ("21h-21h50","Programação para Internet I", "Empreendedorismo", "Banco de Dados II", "Optativa I", "Segurança e Auditoria de Sistemas"),
 ("21h50-22h40","Programação para Internet I", "Empreendedorismo", "Banco de Dados II", "Optativa I", "Segurança e Auditoria de Sistemas");

insert into TSIV5(horario, segunda, terca, quarta, quinta, sexta)VALUES
 ("14h-15h","Optativa II", "Programação para Internet II", "Comércio Eletrônico", "Ética", "Estatistica"),
 ("15h-16h","Optativa II", "Programação para Internet II", "Comércio Eletrônico", "Ética", "Estatistica"),
 ("16h20-17h20","Optativa II", "Programação para Internet II", "Comércio Eletrônico", "Trabalho de Conclusão de Curso", "Estatistica"),
 ("17h20-18h20","Optativa II", "Programação para Internet II", "Comércio Eletrônico", "Trabalho de Conclusão de Curso", "Estatistica");

 insert into TSIN5(horario, segunda, terca, quarta, quinta, sexta)VALUES
 ("19h-19h50","Comércio Eletrônico", "Estatistica", "Optativa II", "Trabalho de Conclusão de Curso", "Programação para Internet II"),
 ("19h50-20h40","Comércio Eletrônico", "Estatistica", "Optativa II", "Trabalho de Conclusão de Curso", "Programação para Internet II"),
 ("21h-21h50","Comércio Eletrônico", "Estatistica", "Optativa II", "Ética", "Programação para Internet II"),
 ("21h50-22h40","Comércio Eletrônico", "Estatistica", "Optativa II", "Ética", "Programação para Internet II");


update usuarios set status=0 where id=1;