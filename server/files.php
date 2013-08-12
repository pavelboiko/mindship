<?php

$types = array('Ps', 'Ai', 'Jpg', 'Xls', 'Doc', 'Txt', 'Pdf', '...');



$search = $_REQUEST['s'];

$times = explode(',', $_REQUEST['t']);
$count = count($times);

//$time_start = $_REQUEST['time_start'];
//$time_end = $_REQUEST['time_end'];



$data = array();
for ($i = 0; $i < count($times); $i++) {
	$d = @date('t',$times[$i]/1000);

	$arr = array();

	for ($j = 0, $r = rand(20, 120); $j < $r; $j++) {
		$arr[] = array(
			'type' => $types[rand(0, 7)],
			'count' => rand(1, 99),
			'day' => rand(0, $d)
		);
	}

	$data[$times[$i]] = $arr;
}

echo json_encode($data);
exit;



