<?php
/**
 * author vking
 * 文章
 */
namespace Modules\financialRecord;

class lib{
    function __construct($id="") {
    	$this->model=new model();
		$id=$id?$id:I('request.id');
		if($id){
			$this->model->find($id);
		}
    }
    function orderUpdate(){
        $data=file_get_contents("php://input");
        $data=@json_decode($data,true);
        debug('orderUpdate '.date("H:i"),$data);
        var_dump('orderUpdate');
    }
}