<?php

$datos = $_POST['backup'];

$time = time();
// Obtenemos un array con todos los valores del tiempo
$date = getdate($time);

($date['mday'] < 10) ? $day = ("0" . $date['mday']) : $day = $date['mday'];
($date['mon'] < 10) ? $month = ("0" . $date['mon']) : $month = $date['mon'];

$currentDate =  $day. "-" . $month . "-" . $date['year'];

$nombre = "../backup/backup - " . $currentDate . " .json"; 

// Fichero
$fh = fopen($nombre, 'w') or die("Se produjo un error al crear el archivo");

fwrite($fh, $datos) or die("No se pudo escribir en el archivo");

fclose($fh);


