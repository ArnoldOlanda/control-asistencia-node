create database control_asistencia;

create table empleado(
    codigo int not null auto_increment,
    dni varchar(8) not null,
    nombre varchar(30) not null,
    apellidos varchar(50) not null,
    celular varchar(9),
    correo varchar(50) not null,
    direccion varchar(40),
    cod_cargo int not null,
    usuario varchar(50) not null,
    contrasena varchar(50) not null,
    tipo_usu int not null,
    estado char(1),
    primary key(codigo)
);

create table cargo(
    codigo int not null auto_increment,
    cargo varchar(50),
    primary key(codigo)
);

create table tipo_usuario(
    codigo int not null auto_increment,
    tipo varchar(30),
    primary key(codigo)
);

ALTER table empleado add FOREIGN KEY (cod_cargo) REFERENCES cargo (codigo);
ALTER table empleado add FOREIGN KEY (tipo_usu) REFERENCES tipo_usuario (codigo);

select * from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where table_schema="control_asistencia" and constraint_type="FOREIGN KEY";

