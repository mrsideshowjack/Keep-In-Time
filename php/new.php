<?php
include_once 'inc/db_connect.php';

$name = $_POST['name'];

  global $conn;
  try{
	$sql="INSERT INTO project (name) VALUES (:name)";
    $statement = $conn->prepare($sql);
    $statement->bindParam(':name', $name);
    $statement->execute();

	echo "maybe it worked";

  }
  catch(PDOException $e) {
    echo "something went wrong";
    echo $e;
  }

?>
