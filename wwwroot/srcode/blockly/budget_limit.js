import Blockly from 'node-blockly/browser';
import VueI18n from 'vue-i18n';
const messages = {
    en: {

        '预算上限': 'Budget maximum',
        '预算下限': 'Budget minimum',
        '请将此片段放在开始位置':'Please put this fragment at the beginning',
    },
    zh: {
        '预算上限': '预算上限',
        '预算下限':'预算下限',
        '请将此片段放在开始位置':'请将此片段放在开始位置',
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
        "type": "budget_limit",
        "message0": "%1 %2 %3",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "type",
                "options": [
                    [
                        i18n.t("预算上限"),
                        "max"
                    ],
                    [
                        i18n.t("预算下限"),
                        "min"
                    ]
                ]
            },
            {
                "type": "field_input",
                "name": "value",
                "text": "0     "
            },
            {
                "type": "input_value",
                "name": "input"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,

        
        "colour": 300,
        "tooltip": i18n.t("请将此片段放在开始位置"),
        "helpUrl": ""
    },
    init: function(){
        var that=this;
        Blockly.Blocks['budget_limit'] = {

            init: function() {
                this.jsonInit(that.json);
            }
        }
        Blockly.PHP['budget_limit'] = function(block) {
            var dropdown_type = block.getFieldValue('type');
            var text_value = block.getFieldValue('value');
            var value_input = Blockly.PHP.valueToCode(block, 'input', Blockly.PHP.ORDER_ATOMIC);
            // TODO: Assemble PHP into code variable.
            //var code = dropdown_do+'#'+text_value+';\n';
            var code = '$this->setBudgetLimit("'+dropdown_type+'","'+text_value.replace(/[ ]/g,'')+'");';
            return code;
        };
    }

}