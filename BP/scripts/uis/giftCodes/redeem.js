import actionParser from "../../api/actionParser";
import giftCodes from "../../api/giftCodes";
import { ModalForm } from "../../lib/form_func";
import uiManager from "../../uiManager";

uiManager.addUI("admin.codes.redeem | admin.codes.redeem", "Redeem", (player, error)=>{
    let form = new ModalForm();
    if(error) {
        form.title(`§c${error}`)
    } else {
        form.title(`Redeem Code`)
    }
    form.textField(`Code`, `Code you want to redeem`);
    form.show(player, false, (player, response)=>{
        if(response.canceled) return;
        if(!response.formValues[0] || !giftCodes.getCode(response.formValues[0])) return uiManager.open(player, "admin.codes.redeem", "Invalid Code");
        let code = giftCodes.getCode(response.formValues[0]);
        if(code.useOnce && player.hasTag(`used:${code.code}`)) return uiManager.open(player, "admin.codes.redeem", "You already redeemed this");
        actionParser.runAction(player, code.action);
        player.addTag(`used:${code.code}`)
        player.success(`Successfully redeemed code!`);
    });
})