<?php
require_once "./SleekDB/src/Store.php";
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

class DataController{
    protected static function _filter_data($data, $filter){
        $output = array();
        foreach($filter as $key){
            if(isset($data[$key])) 
                $output[$key] = $data[$key];
        }
        return $output;
    }

    protected static function _count_data($data){
        return $data.size();
    }

} 

class DB extends DataController{
    public $db_name;
    public $db;

    function __construct($name){
        $this->db_name = $name;
        $db_dir = __DIR__ . "/../db";
        $this->db = new \SleekDB\Store($this->db_name, $db_dir);
    }


    public function _get_all()
    {
        return $this->db->findAll();
    }

    public function _get_by($filter_props){
        return $this->db->findBy($filter_props);
    }

    public function _get_byId($doc_id){
        return $this->db->findById($doc_id);
    }

    public function _filter($data, $filter) {
        return parent::_filter_data($data, $filter);
    }

    public function _update($doc_id, $new_data){
        $this->db->updateById($doc_id, $new_data);
    }

    public function _insert($data){
        return $this->db->insert($data);
    }

    public function _count(){
        //return parent::_countData(_get_all()); // to tak trochę na siłę ig
        return $this->db->count();
    }

    public function _delete_by($props){
        return $this->db->deleteBy($props);
    }

    public function _delete_byId($id)
    {
        return $this->db->deleteById($id);
    }

   

}
