<?php
	$user_data = array(
		"today" => date("Y-m-d H:i:s"),
		"ip" => $_SERVER['REMOTE_ADDR']
	);

	$received_data = array(
		"name" => $_POST['name'],
		"phone" => $_POST['phone'],
		"time" => $_POST['time']
	);

	$callback_data = array(
		"morning" => "09:00 - 12:00",
		"lunch" => "12:00 - 14:00",
		"day" => "14:00 - 16:00",
		"evening" => "16:00 - 18:00"
	);
	
	try
	{
		$connection = new PDO("mysql:host=host;dbname=base","user","password");
	}
	catch (PDOException $e)
	{
		echo 'Connection error: ' . $e->getMessage();
	}

	$query = $connection->prepare("INSERT INTO callbacks (name,phone,time,date,ip) VALUES (:name,:phone,:time,:date,:ip)");
	$query->bindValue(':name', $received_data["name"], PDO::PARAM_STR);
	$query->bindValue(':phone', $received_data["phone"], PDO::PARAM_STR);
	$query->bindValue(':time', $callback_data[$received_data["time"]], PDO::PARAM_STR);
	$query->bindValue(':date', $user_data["today"], PDO::PARAM_STR);
	$query->bindValue(':ip', $user_data["ip"], PDO::PARAM_STR);
	$query->execute();
	
	$id = $connection->lastInsertId();
?>
