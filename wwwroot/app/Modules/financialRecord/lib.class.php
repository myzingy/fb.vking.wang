<?php
/**
 * author vking
 * 文章
 */
namespace Modules\financialRecord;

class lib{
    const TYPE_SPEND=0;
    const TYPE_RECHARGE=1;
    const TYPE_SPEND_FREE=2;
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
    function getFinancialFlow($user){
        $root_id=$user->root?$user->root:$user->id;
        $balance=M('financial_record')->where("root_id='{$root_id}' and type!=".self::TYPE_SPEND_FREE)->sum('value')+0;
        $list=M('financial_record')
            ->where("root_id='{$root_id}'")
            ->order("addtime desc")
            ->limit(50)
            ->select();
        $stime=M('user')->where("id='{$root_id}'")->getField('time');
        $day=(int)((NOW_TIME-$stime)/86400);
        $accs=M('user_accounts')->field('account_id,utc_seconds,`status`')->where("root_id='{$root_id}'")->select();
        if($accs){
            $acc_ids=[];
            $utc_seconds=0;
            foreach ($accs as $acc){
                $acc_ids[]="'{$acc['account_id']}'";
                if($acc['status']==0){
                    $utc_seconds=$acc['utc_seconds'];
                }
            }
            $date_start=date("Y-m-d",NOW_TIME+$utc_seconds);
            $insights_count=M('ads_insights')->where("account_id in (".implode(",",$acc_ids).") and type=0 and date_start='{$date_start}'")->count();
            $insights_spend=$insights_count*0.1;

            $time=getDayTime("00:00:00",0,$utc_seconds);
            $optimized_count=M('rules_exec_log')->where("account_id in (".implode(",",$acc_ids).") and time>{$time}")->count();
            $optimized_spend=$optimized_count*0.5;

        }
        return ['data'=>array(
            'balance'=>$balance,
            'list'=>$list,
            'root'=>$user->root,
            'free'=>($day<16),
            'freeday'=>15-$day,
            'spend'=>$insights_spend+$optimized_spend,
        )];
    }
}