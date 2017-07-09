<?php
/**
 * author vking
 * 文章
 */
namespace Modules\financialRecord;
use Think\Model\RelationModel;
class model extends RelationModel{
    const TYPE_SPEND=0;
    const TYPE_RECHARGE=1;
    protected $tableName = 'financial_record';
	protected $pk     = 'id';
}