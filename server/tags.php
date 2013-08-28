<?php
$times = explode(',', $_REQUEST['t']);
$ctimes = count($times);

$f = @fopen(dirname(__FILE__).'/array.csv', 'a+');


$tasks = createArray($times);

$t = array();
$IDs = array();

while($row = fgetcsv($f, 9000)) {
	foreach($times as $val) {
		if (isTaskInTime($val, $row[2], $row[3])) {
			$tasks[$val][] = array(
				$row[0],
				$row[1],
				$row[2],
				$row[3],
				@date('d-m-Y', $row[2]/1000),
				@date('d-m-Y', $row[3]/1000),
				($row[2] - $val)/(1000 *24*3600),
				($row[3] - $val)/(1000 *24*3600)
			);
			$t[] = array(
				$row[0],
				$row[1],
				$row[2],
				$row[3],
				@date('d-m-Y', $row[2]/1000),
				@date('d-m-Y', $row[3]/1000),
				($row[2] - $val)/(1000 *24*3600),
				($row[3] - $val)/(1000 *24*3600)
			);
		}
	}
	$IDs[] = $row[0];
}
//var_dump($t);
if (count($IDs)) {
	$id = (int) max($IDs);
} else {
	$id = 0;
}

$new_tasks = array();
for ($i = 0; $i < $ctimes; $i++) {
	if (!isset($tasks[$times[$i]]) || !count($tasks[$times[$i]])) {
		$new_tasks += createTask($times[$i], $id);

		$id = $new_tasks[count($new_tasks)-1][0];
	}
}
if (count($new_tasks)) {
	for ($i = 0; $i < count($new_tasks); $i++)
		fputcsv($f, $new_tasks[$i]);
}

for ($i = 0; $i < count($new_tasks); $i++) {
	foreach($times as $val) {
		if (isTaskInTime($val, $new_tasks[$i][2], $new_tasks[$i][3])) {
			$t[]= array(
				$new_tasks[0],
				$new_tasks[1],
				$new_tasks[2],
				$new_tasks[3],
				@date('d-m-Y', $new_tasks[2]/1000),
				@date('d-m-Y', $new_tasks[3]/1000),
				($new_tasks[2] - $val)/1000
			);
		}
	}
}


uasort($t, 'sorting');
function sorting($a, $b) {
	return ($a[2] < $b[2]) ? -1 : 1;
}
echo json_encode($t);
exit;

#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function createTask($time, $id) {


	$r = rand(3, 10);
	$day = 24 * 3600 * 1000;
	$tasks = array();
	for ($i = 0; $i < $r; $i++) {

		$id++;

		$s = rand(-10, 10);
//		var_dump($s);
//		var_dump(rand($s+1, 11));
		$start = $time - $day * $s;
		$end = $time + $day * rand($s+1, 11);

		$tasks[] =  array($id,'Name ' . $id, $start, $end, @date('d-m-Y H:i:s', $start/1000), @date('d-m-Y H:i:s', $end/1000));
	}


	return $tasks;
}

function isTaskInTime($time, $task_start, $task_end){
//	return $task_start <= $time && $task_end >= $time;
	$t = @date('t', $time/1000);
	$time_end = $time+($t*24*3600*1000);
	return ($task_start <= $time || $task_start <= $time_end) && $task_end >= $time;
}

function createArray($times) {
	$arr = array();

	foreach ($times as $val) {
		$arr[$val] = array();
	}

	return $arr;
}