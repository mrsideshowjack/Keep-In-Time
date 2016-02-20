<?php
include_once 'dataQuery.php';

$ProjName = $_GET['ProjectName'];
$ProjDesc = $_GET['ProjectDesc'];
$ProjDate = date("Y-m-d");

$data = array();
//An array of arrays, containing the rows that we want to insert.
$createNewProject = array(
    array(
        'ProjectName' => $ProjName, //projectName
        'ProjectDescription' => $ProjDesc, //project description
        'DateCreated' => $ProjDate, //project creation Date
    )
);

//Call our insert function.
$result = insertData('Project', $createNewProject,"yes");
$data["id"] = $result;
echo json_encode($data);
 ?>
