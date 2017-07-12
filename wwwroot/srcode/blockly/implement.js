import Blockly from 'node-blockly/browser';
import VueI18n from 'vue-i18n';
import vk from '../vk.js';
const messages = {
    en: {

        '预算调整': 'Budget adjustment',
        '暂停投放': 'Pause advertising',
        '加上':'Add(+)',
        '减去':'Subtract(-)',
        '调至':'Adjust to',
        '数值或百分比':'Number or x%',
        'ROAS':'ROAS(Spend/Income)%',
        '今日花费':'Amount spent',
    },
    zh: {
        '预算调整': '预算调整',
        '暂停投放': '暂停投放',
        '加上':'加上',
        '减去':'减去',
        '调至':'调至',
        '数值或百分比':'数值或百分比',
        'ROAS':'ROAS(花费/收入)%',
        '今日花费':'当前花费',
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
        "type": "implement",
        "message0": "%1 %2 %3 %4",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "field",
                "options": [
                    [
                        i18n.t("预算调整"),
                        "Budget"
                    ],
                    [
                        i18n.t("暂停投放"),
                        "Pause"
                    ]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "do",
                "options": [
                    [
                        i18n.t("加上"),
                        "+"
                    ],
                    [
                        i18n.t("减去"),
                        "-"
                    ],
                    [
                        i18n.t("调至"),
                        "="
                    ]
                ]
            },
            {
                "type": "field_dropdown",
                "name": "type",
                "options": [
                    [
                        i18n.t("数值或百分比"),
                        "input"
                    ],
                    [
                        i18n.t("ROAS"),
                        "ROAS"
                    ],
                    [
                        i18n.t("今日花费"),
                        "getAmountSpentNow"
                    ]
                ]
            },
            {
                "type": "field_input",
                "name": "value",
                "text": "0%    "
            }
        ],
        "previousStatement": null,
        "colour": 135,
        "tooltip": "",
        "helpUrl": ""
    },
    init: function(){
        var that=this;
        Blockly.Blocks['implement'] = {

            init: function() {
                this.jsonInit(that.json);
            }
        }
        Blockly.PHP['implement'] = function(block) {
            var dropdown_field = block.getFieldValue('field');
            var dropdown_do = block.getFieldValue('do');
            var dropdown_type = block.getFieldValue('type');
            var text_value = block.getFieldValue('value');
            //var value_implement = Blockly.JavaScript.valueToCode(block, 'implement', Blockly.JavaScript.ORDER_ATOMIC);
            // TODO: Assemble PHP into code variable.
            //var code = dropdown_do+'#'+text_value+';\n';
            var code = 'return $this->implement("'+dropdown_field+'","'+dropdown_do+'","'+dropdown_type+'","'+text_value.replace(/[ $]/g,'')+'");';
            return code;
        };
    }

}