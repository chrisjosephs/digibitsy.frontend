<?php

class database_connection_script_library
{
    function connect()
    {
        // connect to database server
        // check connection ok

        // connect to database
        // check database connected ok

        // return connection result
    }
}

function get_supplier_records()
{
    // locations of each supplier CSV File
    $supplier_csv[1] = "http://www.external-domain1.com/product_feed.csv";
    $supplier_csv[2] = "http://www.external-domain2.com/product_feed.csv";
    $supplier_csv[3] = "http://www.external-domain3.com/product_feed.csv";
    $supplier_csv[4] = "http://www.external-domain4.com/product_feed.csv";
    // loop through each supplier CSV FILE
    $supplier_records = [];
    // since it is specified column numbers are not the same get associate array $keys = array_shift($csv);

    foreach ($supplier_csv as $csvfile) {
        // check csv file exists
        // fopen csv file
        // column numbers are not the same across each csv so make associate array: $csv[$i] = array_combine($keys, $row); foreach ($csv as $i=>$row) { $csv[$i] = array_combine($keys, $row);
        foreach ($csvfile as $row) {
            // for each row of csv file store column data in $supplier_records
            // use the product_id as the key of the array as it is unique, then only have to compare prices on [product_id][supplier] if >1 item in $supplier_records[product_id], as some many not have the same item, or be out of stock etc
            // $supplier_records[product_id][supplier] = array (product_price => $row['product_price'], product_ean => $row['product_ean']}
        }
    }
    return $supplier_records;
}
function compare_supplier_records($supplier_records)
    // for each supplier_records as supplier_record
    // check which [product_id][supplier] has the lowest [product_id][supplier]=>'product_price'
    // send this to array $record_cheapest
    // return $record_cheapest which has product_id, product_price, product_ean for every product_id from all 4 suppliers
{

}
function write_db_records()
{
    // write database record to library
    // Since product_id may already exist, then use Insert On Duplicate Key Update
}

//  get_suppliers_records, compare_suppler_records, connect to  database_connection_script_library, write_db records
?>

