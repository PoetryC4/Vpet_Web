// validator: (rule: object, value: string, callback: Function) => {
//   const regpEmail = /^[_a-z0-9\u4e00-\u9fa5]+(\.[_a-z0-9\u4e00-\u9fa5]+)*@[a-z0-9\u4e00-\u9fa5]+(\.[a-z0-9\u4e00-\u9fa5]+)*(\.[a-z]{2,})$/;
//   if (!value) {
//     callback(new Error(t("form.emailWarning")));
//   } else if (!regpEmail.test(value)) {
//     callback(new Error(t("form.emailRegpWarning")));
//   } else {
//     callback();
//   }
// }

export const validatorNumber = (rule: object, value: string, callback: Function) => {
    if (!value || value === '') {
        callback(new Error("err.empty"));
    } else if (isNaN(Number(value))) {
        callback(new Error('err.notNumber'));
    } else {
        callback();
    }
}
export const validatorString = (rule: object, value: string, callback: Function) => {
    if (!value || value === '') {
        callback(new Error("err.empty"));
    } else {
        callback();
    }
}