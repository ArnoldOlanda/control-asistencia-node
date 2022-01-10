-- create database control_asistencia;
-- use control_asistencia;
create table empleado(
    dni varchar(8) not null,
    nombre varchar(30) not null,
    apellidos varchar(50) not null,
    celular varchar(9),
    correo varchar(50) not null,
    direccion varchar(40),
    genero char(1) not null,
    cod_cargo int not null,
    cod_horario int not null,
    contrasena varchar(50) not null,
    tipo_usu int not null,
    estado int not null default 1,
    primary key(dni)
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

create table horario(
    codigo int primary key not null auto_increment,
    descripcion varchar(50) not null,
    hora_inicio time not null,
    hora_fin time not null
);

create table asistencia(
    codigo int primary key not null auto_increment,
    fecha date not null,
    cod_empleado varchar(8) not null,
    hora_ingreso time,
    hora_salida time,
    cod_horario int not null,
    tarde enum('s','n') default 'n',
    falta enum('s','n') default 'n',
    descuento float default 0.0
);

ALTER table empleado add FOREIGN KEY (cod_cargo) REFERENCES cargo (codigo);
ALTER table empleado add FOREIGN KEY (tipo_usu) REFERENCES tipo_usuario (codigo);
ALTER table empleado add FOREIGN KEY (cod_horario) REFERENCES horario (codigo);
ALTER table asistencia add FOREIGN KEY (cod_empleado) REFERENCES empleado (dni);
ALTER table asistencia add FOREIGN KEY (cod_horario) REFERENCES horario (codigo);

-- select * from INFORMATION_SCHEMA.TABLE_CONSTRAINTS where table_schema="control_asistencia" and constraint_type="FOREIGN KEY";


insert into tipo_usuario (tipo) values ('Administrador'),('Usuario');
insert into cargo(cargo) values ('Empleado'),('Secretario'),('Jefe de area');
insert into horario(descripcion,hora_inicio,hora_fin) values ('Mañana','08:00:00','13:00:00');

insert into empleado(dni,nombre,apellidos,celular,correo,direccion,genero,cod_cargo,cod_horario,contrasena,tipo_usu)
values ('70606804','Arnold','Olanda Muñoz','960135245','olanda188@gmail.com','Alto paucarpata A-2','m',4,4,'06041998Aa','4');

