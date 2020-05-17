<?php
class database_connection_script_library
{
    function get_products($reference)
    {
        $query = "SELECT product_id, product_name, product_price "
            . "FROM product ";

        if ($reference != "ALL") {
            $query .= "WHERE product_id = {$reference} ";
        }

        mysql_connect("127.0.0.1", "admin", "admin");
        mysql_select_db("product_data");
        $result = mysql_query($query);

        return resultset_to_array($result);
    }
}
