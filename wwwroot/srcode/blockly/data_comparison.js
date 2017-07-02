import Blockly from 'node-blockly/browser';
import VueI18n from 'vue-i18n';
const messages = {
    en: {

        '今日': 'Today',
        '最近7天': 'Last 7 day',
        '最近14天':'Last 14 day',
        '花费':'Amount spent',
        '预算':'Budget',
        '购买数量':'Quantity purchased',
        '收入':'Amount income',
        '花费/收入':'(Spend/Income)%',
        '收入/花费':'Income/Spend',
        '加购物车数量':'Number of shopping carts added',
        '加购物车成本':'Plus shopping cart costs',
        '单次点击费用':'Single click charge',
        '广告系列名':'Campaign Name',
        '广告组名':'Ad Set Name',
        '广告名':'Ad Name',
        '大于':' > ',
        '大于等于':' >= ',
        '小于':' < ',
        '小于等于':' <= ',
        '等于':' = ',
        '不包含':'Does not contain',
        '包含':'Contain',
    },
    zh: {
        '今日': '今日',
        '最近7天':'最近7天',
        '最近14天':'最近14天',
        '花费':'花费',
        '预算':'预算',
        '购买数量':'购买数量',
        '收入':'收入',
        '花费/收入':'花费/收入',
        '收入/花费':'收入/花费',
        '加购物车数量':'加购物车数量',
        '加购物车成本':'加购物车成本',
        '单次点击费用':'单次点击费用',
        '广告系列名':'广告系列名',
        '广告组名':'广告组名',
        '广告名':'广告名',
        '大于':'大于',
        '大于等于':'大于等于',
        '小于':'小于',
        '小于等于':'小于等于',
        '等于':'等于',
        '不包含':'不包含',
        '包含':'包含',
    }
}
// Create VueI18n instance with options
var locale='en';
try{
    var local=localStorage.getItem('data');
    local=JSON.parse(local);
    locale=local.lang?local.lang:'en';
}catch(e){}

const i18n = new VueI18n({
    locale: locale, // set locale
    messages, // set locale messages
})
export default {
    json:{
        "type": "data_comparison",
        "message0": "%1 %2 %3 %4 %5",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "date",
                "options": [
                    [
                        i18n.t("今日"),
                        "0"
                    ],
                    [
                        i18n.t("最近7天"),
                        "7"
                    ],
                    [
                        i18n.t("最近14天"),
                        "14"
                    ]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "field",
                "options": [
                    [
                        i18n.t("花费")+"（Amount Spent）",
                        "getAmountSpent"
                    ],
                    [
                        i18n.t("预算")+"（Budget）",
                        "getBudget"
                    ],
                    [
                        i18n.t("购买数量")+"（Purchase）",
                        "getPurchase"
                    ],
                    [
                        i18n.t("收入")+"（Purchase Value）",
                        "getPurchaseValue"
                    ],
                    [
                        i18n.t("花费/收入")+"（ROAS）",
                        "getROAS"
                    ],
                    [
                        i18n.t("收入/花费")+"（ROI）",
                        "getROI"
                    ],
                    [
                        i18n.t("加购物车数量")+"（Add Cart）",
                        "getAddCart"
                    ],
                    [
                        i18n.t("加购物车成本")+"（CPA）",
                        "getCPA"
                    ],
                    [
                        i18n.t("单次点击费用")+"（CPC）",
                        "getCPC"
                    ],
                    [
                        i18n.t("广告系列名")+"（Campaign Name）",
                        "getCampaignName"
                    ],
                    [
                        i18n.t("广告组名")+"（Adset Name）",
                        "getAdsetName"
                    ],
                    [
                        i18n.t("广告名")+"（Ad Name）",
                        "getAdName"
                    ]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "expression",
                "options": [
                    [
                        i18n.t("大于"),
                        ">"
                    ],
                    [
                        i18n.t("大于等于"),
                        ">="
                    ],
                    [
                        i18n.t("小于"),
                        "<"
                    ],
                    [
                        i18n.t("小于等于"),
                        "<="
                    ],
                    [
                        i18n.t("等于"),
                        "=="
                    ],
                    [
                        i18n.t("不包含"),
                        "NLI"
                    ],
                    [
                        i18n.t("包含"),
                        "LI"
                    ]
                ]
            },
            {
                "type": "field_input",
                "name": "input_value",
                "text": "value"
            },
            {
                "type": "input_value",
                "name": "NAME"
            }
        ],
        "output": null,
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
    },
    init: function(){
        var that=this;
        Blockly.Blocks['data_comparison'] = {

            init: function() {
                this.jsonInit(that.json);
            }
        }
        Blockly.PHP['data_comparison'] = function(block) {
            var dropdown_date = block.getFieldValue('date');
            var dropdown_field = block.getFieldValue('field');
            var dropdown_expression = block.getFieldValue('expression');
            var text_value = block.getFieldValue('input_value');
            var value_input = Blockly.PHP.valueToCode(block, 'input', Blockly.PHP.ORDER_ATOMIC);
            // TODO: Assemble PHP into code variable.
            //var code = '$'+dropdown_field+' '+dropdown_expression+' '+text_value;
            var code = '$this->expression("'+dropdown_date+'","'+dropdown_field+'","'+dropdown_expression+'","'+text_value.replace(/[ $]/g,'')+'")';
            // TODO: Change ORDER_NONE to the correct strength.
            return [code, Blockly.PHP.ORDER_NONE];
        };
    }

}