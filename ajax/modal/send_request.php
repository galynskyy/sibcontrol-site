<?php
	$user_data = array(
		"today" => date("Y-m-d H:i:s"),
		"ip" => $_SERVER['REMOTE_ADDR']
	);

	$received_data = array("name" => $_POST['name'],
		"phone" => $_POST['phone'],
		"type" => $_POST['type']
	);

	$request_data = array(
		"computer" => "Обслуживание компьютеров",
		"control" => "Видеонаблюдение и контроль"
	);

	try
	{
		$connection = new PDO("mysql:host=host;dbname=base","user","password");
	}
	catch (PDOException $e)
	{
		echo 'Connection error: ' . $e->getMessage();
	}

	$query = $connection->prepare("INSERT INTO requests (name,phone,type,date,ip) VALUES (:name,:phone,:type,:date,:ip)");
	$query->bindValue(':name', $received_data["name"], PDO::PARAM_STR);
	$query->bindValue(':phone', $received_data["phone"], PDO::PARAM_STR);
	$query->bindValue(':type', $request_data[$received_data["type"]], PDO::PARAM_STR);
	$query->bindValue(':date', $user_data["today"], PDO::PARAM_STR);
	$query->bindValue(':ip', $user_data["ip"], PDO::PARAM_STR);
	$query->execute();
	
	$id = $connection->lastInsertId();
?>
