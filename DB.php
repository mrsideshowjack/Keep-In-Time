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

CREATE TABLE IF NOT EXISTS User
UserID int NOT NULL AUTO_INCREMENT,
Username varchar(25) NOT NULL,
PRIMARY KEY (UserID)
);

CREATE TABLE IF NOT EXISTS Project(
ProjectID int NOT NULL AUTO_INCREMENT,
ProjectName varchar(30) NOT NULL,
DateCreated date NOT NULL,
PRIMARY KEY (ProjectID),
FOREIGN KEY (UserID) REFERENCES User(User_ID)
);


CREATE TABLE IF NOT EXISTS GANTT
UserID int NOT NULL,
ChartID int NOT NULL AUTO INCREMENT, 
ProjectID int NOT NULL, 
PRIMARY KEY (ChartID),
FOREIGN KEY (UserID) REFERENCES User(User_ID),
FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID)

CREATE TABLE IF NOT EXISTS PERT
UserID int NOT NULL,
ChartID int NOT NULL AUTO INCREMENT, 
ProjectID int NOT NULL, 
PRIMARY KEY (ChartID),
FOREIGN KEY (UserID) REFERENCES User(User_ID),
FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID)


CREATE TABLE IF NOT EXISTS WBT
UserID int NOT NULL,
ChartID int NOT NULL AUTO INCREMENT, 
ProjectID int NOT NULL, 
PRIMARY KEY (ChartID),
FOREIGN KEY (UserID) REFERENCES User(User_ID),
FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID)

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
