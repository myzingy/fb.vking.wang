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
        debug('orderUpdate',I('request.'));
        var_dump('orderUpdate');
    }
}