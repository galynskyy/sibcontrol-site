<?php
	$user_data = array(
		"today" => date("Y-m-d H:i:s"),
		"ip" => $_SERVER['REMOTE_ADDR']
	);

	$received_data = array("name" => $_POST['name'],
		"phone" => $_POST['phone'],
		"message" => $_POST['message']
	);

	try
	{
		$connection = new PDO("mysql:host=host;dbname=base","user","password");
	}
	catch (PDOException $e)
	{
		echo 'Connection error: ' . $e->getMessage();
	}
		
	$query = $connection->prepare("INSERT INTO feedbacks (name,phone,message,date,ip) VALUES (:name,:phone,:message,:date,:ip)");
	$query->bindValue(':name', $received_data["name"], PDO::PARAM_STR);
	$query->bindValue(':phone', $received_data["phone"], PDO::PARAM_STR);
	$query->bindValue(':message', $received_data["message"], PDO::PARAM_STR);
	$query->bindValue(':date', $user_data["today"], PDO::PARAM_STR);
	$query->bindValue(':ip', $user_data["ip"], PDO::PARAM_STR);
	$query->execute();
	
	$id = $connection->lastInsertId();
?>
