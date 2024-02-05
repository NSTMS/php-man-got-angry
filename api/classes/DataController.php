<?php
class DataController{
    protected static function _filter_data($data, $filter){
        $output = array();
        foreach($filter as $key){
            if(isset($data[$key])) 
                $output[$key] = $data[$key];
        }
        return $output;
    }

    protected static function _cunt_data($data){
        return $data.size();
    }

} 