<?php
/**
 * author vking
 * 文章
 */
namespace Modules\financialRecord;

class lib{
    const TYPE_SPEND=0;
    const TYPE_RECHARGE=1;
    function __construct() {

    }
    function orderUpdate(){
        $data=file_get_contents("php://input");
        $data=@json_decode($data,true);
        debug('orderUpdate '.date("H:i"),$data);
        $root_id="";
        foreach ($data['meta_data'] as $x){
            if($x['key']=='_billing_userid'){
                $root_id=$x['value'];
                break;
            }
        }
        if($data['status']=='on-hold' && $root_id){
            M('financial_record')->where("order_id='{$data['order_key']}'")->delete();
            M('financial_record')->add(array(
                'root_id'=>$root_id,
                'type'=>self::TYPE_RECHARGE,
                'order_id'=>$data['order_key'],
                'value'=>($data['total']+$data['discount_total'])*100,
                'discount_value'=>$data['discount_total']*100,
                'addtime'=>NOW_TIME
            ));
        }
        var_dump('orderUpdate');
    }
}