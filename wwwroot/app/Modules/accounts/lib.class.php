<?php
/**
 * author vking
 * 文章
 */
namespace Modules\accounts;
use Facebook\Facebook;
use FacebookAds\Api;
use FacebookAds\Object\AdAccount;
use FacebookAds\Cursor;
use FacebookAds\Object\Values\ArchivableCrudObjectEffectiveStatuses;
//广告组
use FacebookAds\Object\AdSet;
use FacebookAds\Object\Fields\AdFields;
class lib{
    const FBC_LIMIT_NUM=30;
    function __construct() {
    	$this->model=new model();
    }
    function flushAccounts(){
        $ac_id=I('request.ac_id');
        if(!$ac_id) return;
        $ac=FBC($ac_id);
        vendor("vendor.autoload");
        $fba=Api::init($ac['app_id'],$ac['app_secret'],$ac['access_tokens']);
        $api = Api::instance();

        $campaigns_data=array();
        $after=I('request.after','');
        $active=I('request.active','');
        $EFFECTIVE_STATUS=array(
            ArchivableCrudObjectEffectiveStatuses::ACTIVE,
        );
        $asyn_param=array('ac_id'=>$ac_id,'after'=>'');
        if(!$active){
            array_push($EFFECTIVE_STATUS,ArchivableCrudObjectEffectiveStatuses::PAUSED);
        }else{
            $asyn_param['active']=$active;
        }
        $fields_str=<<<END
        ["account_id"] => string(15) "769185746596586"
    ["account_status"] => NULL
    ["age"] => NULL
    ["agency_client_declaration"] => NULL
    ["amount_spent"] => NULL
    ["balance"] => NULL
    ["business"] => NULL
    ["business_city"] => NULL
    ["business_country_code"] => NULL
    ["business_name"] => NULL
    ["business_state"] => NULL
    ["business_street"] => NULL
    ["business_street2"] => NULL
    ["business_zip"] => NULL
    ["capabilities"] => NULL
    ["created_time"] => NULL
    ["currency"] => NULL
    ["disable_reason"] => NULL
    ["end_advertiser"] => NULL
    ["end_advertiser_name"] => NULL
    ["failed_delivery_checks"] => NULL
    ["funding_source"] => NULL
    ["funding_source_details"] => NULL
    ["has_migrated_permissions"] => NULL
    ["id"] => string(19) "act_769185746596586"
    ["io_number"] => NULL
    ["is_notifications_enabled"] => NULL
    ["is_personal"] => NULL
    ["is_prepay_account"] => NULL
    ["is_tax_id_required"] => NULL
    ["line_numbers"] => NULL
    ["media_agency"] => NULL
    ["min_campaign_group_spend_cap"] => NULL
    ["min_daily_budget"] => NULL
    ["name"] => NULL
    ["offsite_pixels_tos_accepted"] => NULL
    ["owner"] => NULL
    ["partner"] => NULL
    ["rf_spec"] => NULL
    ["salesforce_invoice_group_id"] => NULL
    ["spend_cap"] => NULL
    ["tax_id"] => NULL
    ["tax_id_status"] => NULL
    ["tax_id_type"] => NULL
    ["timezone_id"] => NULL
    ["timezone_name"] => NULL
    ["timezone_offset_hours_utc"] => NULL
    ["tos_accepted"] => NULL
    ["user_role"] => NULL
END;
        preg_match_all("/\[\"(.*)\"\]/",$fields_str,$match);
        $fields=$match[1];

        $campaign =new AdAccount($ac['act_id']);
        $insights = $campaign->getSelf(
            $fields,
            array(
                'action_attribution_windows'=>['1d_click','1d_view'],
            )
        );
        $_d = $insights->getData();
        if(!$_d) return;
        $campaigns_data=[];
        foreach ($fields as $i => $fk) {
            if (is_array($_d[$fk])) {
                continue;
            }
            $campaigns_data[$fk] = $_d[$fk];
        }
        $this->model->add($campaigns_data,null,true);
        asyn('apido/asyn.flushAccountsInsights',array('ac_id'=>$ac_id));
        return $campaigns_data;
    }
    function getAccountData($account_id=""){
        $where=" AI.type!=100 AND AI.date_stop='".date('Y-m-d',NOW_TIME)."' ";
        $ac_id=I('request.ac_id');
        if($ac_id){
            $where.=" AND account.account_id='$ac_id' ";
        }
        if($account_id){
            $where.=" and AI.account_id='$account_id' ";
        }
        $data=$this->model
            ->field('account.id,account.name')
            ->relation(array('insights'))
            ->join('accounts_insights AI ON AI.account_id=account.account_id')
            ->where($where)
            ->order('account.id desc')
            ->select();
        $formatData=formatInsightsData($data,'campaign');
        return array('data'=>$formatData);
    }
    function getFBAccounts($user){
        vendor("vendor.autoload");
        $fbapp=C('fbapp');
        $fb=new Facebook(array(
            'app_id'=>$fbapp['app_id'],
            'app_secret'=>$fbapp['app_secret']
        ));
        $res=$fb->get($user->id.'/adaccounts?fields=account_id,name',$user->long_token?$user->long_token:$user->token);
        return $res->getDecodedBody();
    }
    function addAccounts($user){
        $checked=I('request.checked');
        $nowtime=I('request.nowtime');
        if($nowtime){
            $nowtime=strtotime($nowtime);
            $utc=$nowtime-NOW_TIME;
        }else{
            $utc=0;
        }

        $data=[];
        //$account_ids=[];
        foreach ($checked as $r){
            $data[]=array(
                'account_id'=>$r['account_id'],
                'account_name'=>$r['name'],
                'user_id'=>$user->id,
                'root_id'=>$user->root?$user->root:$user->id,
                'utc_seconds'=>$utc,
                'status'=>0
            );
            //$account_ids[]=$r['account_id'];
        }
        if($data){
//            M('user_accounts')->where(array(
//                'user_id'=>$user->id,
//                'account_id'=>array('in',$account_ids),
//            ))->delete();
            M('user_accounts')->addAll($data,null,true);
        }
    }
    function delAccounts($user){
        $account_id=I('request.account_id');
        if(!$account_id) return;
        M('user_accounts')->where(array(
            'account_id'=>$account_id
        ))->save(array('status'=>1));
    }

    /**
     * @param $field
     *  id=>root_id
     *  user_id
     *  email
     * @return array
     */
    function _getAccounts($field,$isCount=false){
        $mod=M('user_accounts');
        $where=" status=0 ";
        if($field['id']){
            $where.=" and root_id='{$field['id']}' ";
        }
        if($field['email']){
            $where.=" and account_id in (select account_id from user_accounts_links where email='{$field['email']}') ";
        }
        if( $where==" 1=1 ") return ['data'=>[]];
        if($isCount) return $mod->where($where)->count();
        $data=$mod->where($where)->select();
        return ['data'=>$data];
    }
    function getAccounts($user){
        if(!$user->root) return $this->_getAccounts(['id'=>$user->id]);
        $mydata=$this->_getAccounts(['email'=>$user->email]);
        if(!$mydata['data'] && $user->group_id==\Modules\group\lib::GROUP_ID_ADMIN){
            return $this->_getAccounts(['id'=>$user->root]);
        }
        return $mydata;
    }
    function getAccountsForEmail(){
        $userlib=new \Modules\user\lib();
        $user=$userlib->getUserForEmail();
        if(!$user){
            $email=I('request.email');
            $data=$this->_getAccounts(['email'=>$email]);
            if(!$data['data']){
                $root=$userlib->getRoot($email,$group_id);
                if($root && $group_id==\Modules\group\lib::GROUP_ID_ADMIN){
                    $data=$this->_getAccounts(['id'=>$root]);
                }
            }
        }else{
            $data=$this->getAccounts($user);
        }
        return $data;
    }
    function setAccountsForEmail(){
        $checked=I('request.checked');
        $email=I('request.email');
        M('user_accounts_links')->where("email='$email'")->delete();
        //admin group
        $admin_flag=false;
        $userlib=new \Modules\user\lib();
        $user=$userlib->getUserForEmail();
        if(!$user){
            $root=$userlib->getRoot($email,$group_id);
            if($root && $group_id==\Modules\group\lib::GROUP_ID_ADMIN) {
                $admin_flag=true;
            }
        }else{
            if(($root=$user->root) && $user->group_id==\Modules\group\lib::GROUP_ID_ADMIN) {
                $admin_flag=true;
            }
        }
        if($admin_flag && $root){
            $count=$this->_getAccounts(['id'=>$root],true);
            if($count==count($checked)) return;
        }
        $data=[];
        foreach ($checked as $r){
            $data[]=array(
                'account_id'=>$r['account_id'],
                'email'=>$email,
            );
        }
        if($data){
            M('user_accounts_links')->addAll($data);
        }
    }
    function FBC($ac_id=""){
        $mod=M('user_accounts')->alias('UA');
        if($ac_id){
            $mod->field('UA.account_id,UA.account_name,U.token,U.long_token as access_tokens,CONCAT(\'act_\',UA.account_id) as act_id,UA.utc_seconds');
            $mod->where(" UA.account_id='$ac_id' ");
            $mod->join(" user U on U.id=UA.user_id OR U.id=UA.root_id ",'left');
            $data=$mod->find();
            $fbapp=C('fbapp');
            $data=array_merge($data,$fbapp);
            $data['access_tokens']=$data['access_tokens']?$data['access_tokens']:$data['token'];
            unset($data['token']);
        }else{
            //20:00-08:00 不获取数据
            $time=NOW_TIME;
            $day=date("Y-m-d",$time);
            $time_s=$day." 08:00:00";
            $time_e=$day." 20:00:00";
            $offset=I('request.offset',0);
            $mod->field("UA.account_id,UA.account_name");
            $mod->where(" `status`=0 AND FROM_UNIXTIME($time+UA.utc_seconds) >'{$time_s}' AND  FROM_UNIXTIME($time+UA.utc_seconds)<'{$time_e}' ");
            $mod->limit($offset,self::FBC_LIMIT_NUM);
            $data=$mod->select();
            echo $mod->getLastSql();
        }
        return $data;
    }
    //创建日结任务
    function todaySettlementInit(){
        $data=M('user_accounts')->group('root_id')->order('status')->select();
        foreach ($data as $r){
            asyn('apido/asyn.todaySettlement',array('root_id'=>$r['root_id']),null,getDayTime("23:30:00",0,$r['utc_seconds']),5);
        }
    }
    //执行日结任务
    function todaySettlement(){
        $root_id=I('request.root_id');
        if(!$root_id) return;
        $stime=M('user')->where("id='{$root_id}'")->getField('time');
        $day=(int)((NOW_TIME-$stime)/86400);
        $free=$day<16;
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
        $spend=$insights_spend+$optimized_spend;
        if($spend>0){
            M('financial_record')->add(array(
                'root_id'=>$root_id,
                'type'=>$free?\Modules\financialRecord\lib::TYPE_SPEND_FREE:\Modules\financialRecord\lib::TYPE_SPEND,
                'order_id'=>'',
                'value'=>-$spend*100,
                'discount_value'=>0,
                'addtime'=>NOW_TIME
            ));
        }
    }
}