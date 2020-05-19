<?php
$dbh = null;
// these could be replaced with config stored in another file but this script looks like something only an admin/dev would use
$hostname = "external-domain-2.com";
$username = "admin";
$password = "admin";
$dbname = 'product';
try {
    $pdo = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password);
} catch (Exception $exception) {
    throw $e;
}
$number_of_products = 50;

$product_price_feed = new price_feed_web_service();
$product_price_feed->get_prices();
$file = "http://www.external-domain.com/product_feed.csv";
$file_headers = @get_headers($file);
if (!$file_headers || $file_headers[0] == 'HTTP/1.1 404 Not Found') {
    throw new Exception("File not found: " . $file, null);
}
$product_feed = fgetcsv("http://www.external-domain.com/product_feed.csv");
$product_data = array();
for ($counter = 0; $counter < $number_of_products; $counter++) {
    $product_data[] = array($product_feed[$counter][0], $product_feed[$counter][1], $product_price_feed[$counter][1]);
}

$stmt = $pdo->prepare("INSERT INTO product_price_data (product_id, product_name, price) 
                                    VALUES (:product_id, product_name, :price)");
try {
    $pdo->beginTransaction();
    foreach ($product_data as $row) {
        $stmt->execute($row);
    }
    $pdo->commit();
} catch (Exception $e) {
    $pdo->rollback();
    throw $e;
}

?>
