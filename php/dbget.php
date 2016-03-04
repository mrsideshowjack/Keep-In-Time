<?php
include_once 'inc/db_connect.php';

$project = $_GET['project'];
$field = $_GET['field'];
$sql = "";

if ($field == 'tasks') {
	$sql="SELECT tasks FROM project WHERE project_id = :projectid";
} elseif ($field == 'wbt') {
	$sql="SELECT wbt FROM project WHERE project_id = :projectid";
} elseif ($field == 'pert') {
	$sql="SELECT pert FROM project WHERE project_id = :projectid";
}


  global $conn;
  try{
    $statement = $conn->prepare($sql);
    //$statement->bindParam(':field', $field);
    $statement->bindParam(':projectid', $project);
    $statement->execute();

    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    header("Content-Type: application/json");
    echo json_encode($results);
  }
  catch(PDOException $e) {
    echo "something went wrong";
    echo $e;
  }


?>
