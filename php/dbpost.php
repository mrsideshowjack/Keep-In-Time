<?php
include_once 'inc/db_connect.php';

$project = $_POST['project'];
$field = $_POST['field'];
$data = $_POST['data'];
$sql = "";

if ($field == 'tasks') {
	$sql="UPDATE project SET tasks=:data WHERE project_id=:projectid";
} elseif ($field == 'wbt') {
	$sql="UPDATE project SET wbt=:data WHERE project_id=:projectid";
} elseif ($field == 'pert') {
	$sql="UPDATE project SET pert=:data WHERE project_id=:projectid";
}

  global $conn;
  try{
    $statement = $conn->prepare($sql);
    $statement->bindParam(':data', $data);
    $statement->bindParam(':projectid', $project);
    $statement->execute();

	echo "maybe it worked";

  }
  catch(PDOException $e) {
    echo "something went wrong";
    echo $e;
  }

?>
