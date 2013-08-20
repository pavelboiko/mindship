<?php
$data = array();
$data[] = array('dateStart' => '2013-08-20', 'dateEnd' => '2013-09-20', 'length' => '31' );
echo $_GET['callback']. "(".json_encode($data).");";
?>


