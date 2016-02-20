<?php
include_once 'inc/db_connect.php';


//$dbh = $conn;

/*$dbh = new PDO( "mysql:host=$servername; dbname=$db;", $username,$password);
$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$querry = $_GET['querry'];

returnResults($dbh, $querry);
*/


function selectData($querry)
{
  global $conn;
  try{

    foreach($conn->query($querry) as $row)
    {

      $data2 = '';

      for($i=0; $i <= (sizeof($row) / 2) - 1 ; $i++)
      {
        $data2 = $data2 .$row[$i].'****';

      }
      $data2 = json_encode($data2);
      echo "<br>". $data2;

    }
  }

  catch(PDOException $e)
  {
    echo "fuck";
    echo $e;
  }
}



function insertData($tableName, $data,$returnId){
  global $conn;
  try {
    //Will contain SQL snippets.
    $rowsSQL = array();

    //Will contain the values that we need to bind.
    $toBind = array();

    //Get a list of column names to use in the SQL statement.
    $columnNames = array_keys($data[0]);

    //Loop through our $data array.
    foreach($data as $arrayIndex => $row){
      $params = array();
      foreach($row as $columnName => $columnValue){
        $param = ":" . $columnName . $arrayIndex;
        $params[] = $param;
        $toBind[$param] = $columnValue;
      }
      $rowsSQL[] = "(" . implode(", ", $params) . ")";
    }

    //Construct our SQL statement
    $sql = "INSERT INTO `$tableName` (" . implode(", ", $columnNames) . ") VALUES " . implode(", ", $rowsSQL);

    //Prepare our PDO statement.
    $pdoStatement = $conn->prepare($sql);

    //Bind our values.
    foreach($toBind as $param => $val){
      $pdoStatement->bindValue($param, $val);
    }
    //Execute our statement (i.e. insert the data).
    $pdoStatement->execute();
    if($returnId == "yes")
    {
      $last_id = $conn->lastInsertId();
      return $last_id;
    }

  }
  catch(PDOException $e)
  {
    echo "Connection failed: " . $e->getMessage();
    echo "    Code". $e->getCode();
  }
}
?>
