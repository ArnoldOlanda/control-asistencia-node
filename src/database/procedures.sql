#Procedimiento almacenado para listar empleados.
#Establecemos que el delimitador sera '//'
DELIMITER //  
CREATE PROCEDURE listarEmpleados()
BEGIN
    SELECT e.dni,e.nombre,e.apellidos,e.celular,e.correo,e.direccion,e.genero
    ,c.cargo ,h.descripcion 'horario',e.contrasena,t.tipo 'rol',e.estado FROM `empleado`as e 
    INNER join cargo as c on e.cod_cargo = c.codigo 
    inner join horario as h on e.cod_horario=h.codigo 
    INNER JOIN tipo_usuario AS t on e.tipo_usu=t.codigo;
END//

#Reestablecemos el delimitador de nuevo a ';' 
DELIMITER ; 

#Procedimiento almacenado para obtener los registros de cargo,horario y tipo_usuario
DELIMITER //
CREATE PROCEDURE datosParaCrearEmpleado()
BEGIN
    SELECT * FROM cargo;
    SELECT * FROM horario;
    SELECT * FROM tipo_usuario;
END//

DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_busca_empleado (in documento varchar(8))
BEGIN
    SELECT * from empleado where dni=documento;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_inserta_actualiza_empleado (
    IN doc varchar(8),
    in nom varchar(30),
    in ape varchar(50),
    in cel varchar(9),
    in corr varchar(50),
    in direc varchar(40),
    in gen char(1),
    in carg int,
    in hor int,
    in pass varchar(50),
    in tipo int,
    in accion varchar(10))
BEGIN
    if accion='insertar' then
        insert into empleado 
        (dni,nombre,apellidos,celular,correo,direccion,genero,cod_cargo,cod_horario,contrasena,tipo_usu) 
        values(doc,nom,ape,cel,corr,direc,gen,carg,hor,pass,tipo);
    end if;
    if accion='actualizar' then
        update empleado set
        nombre=nom,
        apellidos=ape,
        celular=cel,
        correo=corr,
        direccion=direc,
        genero=gen,
        cod_cargo=carg,
        cod_horario=hor,
        contrasena=pass,
        tipo_usu=tipo
        where dni=doc;
    end if;
END//
DELIMITER ;