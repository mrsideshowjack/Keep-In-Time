<?php
// Used to create the database
// Include variables from the given file

$servername = "localhost";
$username= "root";
$password= "root";
$dbname= "KIT";

//Connect to the server

try {
$conn= new PDO ("mysql:host=localhost;dbname=KIT", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$sql="
CREATE TABLE IF NOT EXISTS Project(
ProjectID int NOT NULL AUTO_INCREMENT,
ProjectName varchar(30) NOT NULL,
DateCreated date NOT NULL,
PRIMARY KEY (ProjectID)
);

CREATE TABLE IF NOT EXISTS Task(
ProjectID int NOT NULL AUTO_INCREMENT,
TaskID int NOT NULL,
TaskName varchar (40) NOT NULL,
StartDate date NOT NULL,
EndDate date NOT NULL,
Duration int NOT NULL,
Predecessors int NOT NULL,
GraphType varchar (10), 
PRIMARY KEY(TaskID),
FOREIGN KEY (ProjectID) references Project(ProjectID)
);

";

// Excute the query
$conn->exec($sql);

// Error Detection
}
catch(PDOException $e)
{
	echo $sql . '<br>' . $e->getMessage();
}

//close the connection
$conn =null;
?>
