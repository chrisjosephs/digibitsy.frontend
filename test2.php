<?php
function export_products_to_file()
{
    $database = new database_connection_script_library();

    $product_details = $database->get_products("ALL");

    for ($counter = 0; $counter < sizeof($product_details); $counter++) {
        $product_details = $database->get_products($counter);
        $product_data[] = array($product_details["product_id"], $product_details["product_name"], $product_details["product_price"]);
    }
    $product_insert_count = 0;
    if (!empty($product_data)) {
        foreach ($product_data as $product) {
            $myfile = "myfile.csv";
            $file_headers = @get_headers($myfile);
            if (!$file_headers || $file_headers[0] == 'HTTP/1.1 404 Not Found') {
                throw new Exception("File not found: " . $myfile, null);
            }
            fputcsv($myfile, $product);

            fclose($myfile);

            $product_insert_count++;
        }
    }
    return $product_insert_count;
}

class database_connection_script_library
{
    function get_products($reference)
    {
        $query = "SELECT product_id, product_name, product_price "
            . "FROM product ";

        if ($reference != "ALL") {
            $query .= "WHERE product_id = {$reference}";
        }
        // mysql_connect is deprecated in favour of PDO now as I swapped it in the last question answer
        $checkconnection = mysql_connect("127.0.0.1", "admin", "admin");
        //Check if it's valid
        if(!$checkconnection) {
            echo("Cannot connect to database");
        }
        else {
            mysql_select_db("product_data");
            $result = mysql_query($query);
        }
        return resultset_to_array($result);
    }
}
