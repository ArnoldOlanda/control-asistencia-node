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

#insertar nueva empleado
DELIMITER //
CREATE PROCEDURE insertEmpleado(
    IN dni varchar(8),
    in nom varchar(30),
    in ape varchar(50),
    in cel varchar(9),
    in direc varchar(40),
    in gen char(1),
    in carg int,
    in hor int,
    in usu varchar(50),
    in pass varchar(50))
BEGIN   
    insert into empleado values(dni,nom,ape,cel,direc,gen,carg,hor,usu,pass);
END//
DELIMITER ;
