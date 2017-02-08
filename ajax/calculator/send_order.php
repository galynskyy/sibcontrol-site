<?php
	$user_data = array(
		"today" => date("Y-m-d H:i:s"),
		"ip" => $_SERVER['REMOTE_ADDR']
	);

	$received_data = array(
		"name" => $_POST['name'],
		"phone" => $_POST['phone'],
		"count" => $_POST['count'],
		"resolution" => $_POST["resolution"],
		"storage" => $_POST["storage"],
		"total" => $_POST["total"]
	);

	$order_data = array("hd" => "HD",
		"fullhd" => "FullHD",
		"quadhd" => "QuadHD",
		"week" => "Неделя",
		"fortnight" => "2 недели",
		"month" => "Месяц"
	);

	try
	{
		$connection = new PDO("mysql:host=178.62.251.159;dbname=sibcontrol","sibuser","foZBEyqX8VlszKVedf");
	}
	catch (PDOException $e)
	{
		echo 'Connection error: ' . $e->getMessage();
	}

	$query = $connection->prepare("INSERT INTO orders (name,phone,count,resolution,storage,total,date,ip) VALUES (:name,:phone,:count,:resolution,:storage,:total,:date,:ip)");
	$query->bindValue(':name', $received_data["name"], PDO::PARAM_STR);
	$query->bindValue(':phone', $received_data["phone"], PDO::PARAM_STR);
	$query->bindValue(':count', $received_data["count"], PDO::PARAM_STR);
	$query->bindValue(':resolution', $order_data[$received_data["resolution"]], PDO::PARAM_STR);
	$query->bindValue(':storage', $order_data[$received_data["storage"]], PDO::PARAM_STR);
	$query->bindValue(':total', $received_data["total"], PDO::PARAM_STR);
	$query->bindValue(':date', $user_data["today"], PDO::PARAM_STR);
	$query->bindValue(':ip', $user_data["ip"], PDO::PARAM_STR);
	$query->execute();
	
	$id = $connection->lastInsertId();
?>
