#Procedimiento almacenado para listar empleados.
#Establecemos que el delimitador sera '//'
describe empleado;
delimiter //
create procedure sp_verifica_password(in dni_ varchar(8),in contrasena_ varchar(50))
begin
	select nombre from empleado where dni=dni_ and contrasena=contrasena_;
end//

DELIMITER //  
CREATE PROCEDURE listarEmpleados()
BEGIN
    SELECT e.dni,e.nombre,e.apellidos,e.celular,e.correo,e.direccion,e.genero
    ,c.cargo ,h.descripcion 'horario',e.contrasena,t.tipo 'rol',e.estado FROM `empleado`as e 
    INNER join cargo as c on e.cod_cargo = c.codigo 
    inner join horario as h on e.cod_horario=h.codigo 
    INNER JOIN tipo_usuario AS t on e.tipo_usu=t.codigo;
END//

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

DELIMITER //
CREATE PROCEDURE sp_lista_horarios()
BEGIN
    SELECT * FROM horario;
END//

DELIMITER ;

delimiter //
create procedure sp_inserta_actualiza_horario(
	in cod int,
    in descrip varchar(50),
    in inicio time,
    in fin time,
    in accion varchar(50))
begin
	if accion='insertar' then
		insert into horario(descripcion,hora_inicio,hora_fin) values(descrip,inicio,fin);
	end if;
    if accion='actualizar' then
		update horario set
        descripcion=descrip,
        hora_inicio=inicio,
        hora_fin=fin
        where codigo=cod;
    end if;
end//

DELIMITER //
CREATE PROCEDURE sp_eliminar_horario(in cod int)
BEGIN
    delete from horario where codigo=cod;
END//

DELIMITER ;
-- describe empleado;
-- describe asistencia;

DELIMITER //
CREATE PROCEDURE sp_obtener_horario_empleado(in cod int)
begin
	set @codHorario=(select cod_horario from empleado where dni=cod);
	select h.hora_inicio,h.hora_fin,h.codigo from horario h where h.codigo=@codHorario;
end//

-- drop procedure sp_registrar_asistencia
DELIMITER //
CREATE PROCEDURE sp_registrar_asistencia(
	in fecha_ date,
    in cod varchar(8),
    in hora time,
    in horario int,
    in tarde_ char(1),
    in descuento_ float)
begin
	set @existeIngreso=(select codigo from asistencia where fecha=fecha_ and cod_empleado=cod);
    set @existeSalida=(select codigo from asistencia where fecha=fecha_ and cod_empleado=cod and hora_salida is not null);
    
    set @horarioEmpleado=(select hora_fin from horario where codigo=horario);
    set @horaSalida=(select extract(HOUR from @horarioEmpleado));
    set @minutoSalida=(select extract(MINUTE FROM @horarioEmpleado));
    set @horaSalidaMarcada=(select extract(HOUR from hora));
    set @minutoSalidaMarcado=(select extract(MINUTE from hora));
    
    if @existeIngreso is null then -- no existe ingreso
		insert into asistencia (fecha,cod_empleado,hora_ingreso,cod_horario,tarde,descuento)
		values(fecha_,cod,hora,horario,tarde_,descuento_);
        set @message="Asistencia de ingreso registrada";
        select @message 'mensaje';
	elseif @existeIngreso is not null and @existeSalida is null then
		if @horaSalidaMarcada >= @horaSalida and @minutoSalidaMarcado >= @minutoSalida then
			update asistencia set
			hora_salida=hora
			where fecha=fecha_ and cod_empleado=cod;
			set @message="Asistencia de salida registrada";
			select @message 'mensaje';
		else
			set @message="Aun no se puede registrar la asistencia "+ @horaSalidaMarcada + @minutoSalidaMarcado;
			select @message 'mensaje';
        end if;
	elseif @existeIngreso is not null and @existeSalida is not null then
		set @message="ERROR: Este empleado ya registró su asistencia para el dia de hoy";
        select @message 'mensaje';
    end if;
end//

-- drop procedure sp_registrar_falta
delimiter //
create procedure sp_registrar_falta(
in fecha_ date,
in cod_empleado_ varchar(8),
in cod_horario_ int)
begin
	set @existeRegistro=(select codigo from asistencia where fecha=fecha_ and cod_empleado=cod_empleado_);
    if @existeRegistro is null then
		set @message=":( Tienes retraso de mas de una hora se ha marcado la asistencia como falta";
		insert into asistencia (fecha,cod_empleado,cod_horario,falta,descuento)
		values(fecha_,cod_empleado_,cod_horario_,'s',6.0);
		select @message 'mensaje';
	else
		set @message="ERROR: Este empleado ya registró su asistencia para el dia de hoy(2)";
        select @message 'mensaje';
    end if;
end//

-- drop procedure sp_lista_asistencias_hoy
delimiter //
create procedure sp_lista_asistencias_hoy()
begin
    select date_format(a.fecha,'%d/%m/%Y')'fecha',a.cod_empleado,concat_ws(' ',e.apellidos,e.nombre)'nombre',
    a.hora_ingreso,a.hora_salida,a.cod_horario,h.descripcion 'horario',a.descuento from asistencia a 
    inner join empleado e on a.cod_empleado=e.dni 
    inner join horario h on a.cod_horario=h.codigo 
    where fecha=curdate();
end//

delimiter //
create procedure sp_lista_asistencias_ultimo_mes()
begin
	select date_format(a.fecha,'%d/%m/%Y')'fecha',a.cod_empleado,concat_ws(' ',e.apellidos,e.nombre)'nombre',
    a.hora_ingreso,a.hora_salida,a.cod_horario,h.descripcion 'horario',a.descuento from asistencia a 
    inner join empleado e on a.cod_empleado=e.dni 
    inner join horario h on a.cod_horario=h.codigo 
    where extract(year from fecha)=extract(year from curdate()) and
    extract(month from fecha)=extract(month from curdate());
end//

delimiter //
create procedure sp_lista_descuentos_agrupado_por_empleado(in fecha_ varchar(2))
begin
	select e.dni,concat_ws(' ',e.apellidos,e.nombre)'nombre',sum(a.descuento)'total_descuento' from asistencia a
    inner join empleado e on a.cod_empleado=e.dni 
    where extract(month from a.fecha)=fecha_
    group by a.cod_empleado;
end//

describe asistencia;
truncate table asistencia;
select * from asistencia;

select * from horario

update asistencia set hora_salida=null where codigo=1



