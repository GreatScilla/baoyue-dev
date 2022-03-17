import Vue from "vue";
const trigger = (el, type) => {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}

export default () => {
  // 正整数校验
  Vue.directive('int', {
    bind: function (el) {
      const input = el.getElementsByTagName('input')[0]
      input.onkeyup = function (e) {
        if (input.value.length === 1) {
          input.value = input.value.replace(/[^1-9]/g, '')
        } else {
          input.value = input.value.replace(/[^\d]/g, '')
        }
        trigger(input, 'input')
      }
      input.onblur = function (e) {
        if (input.value.length === 1) {
          input.value = input.value.replace(/[^1-9]/g, '')
        } else {
          input.value = input.value.replace(/[^\d]/g, '')
        }
        trigger(input, 'input')
      }
    }
  });
  // 带小数
  Vue.directive("float", {
    bind: function (el) {
      const input = el.getElementsByTagName('input')[0]
      input.onkeyup = function (e) {
        if (input.value.length === 1) {
          input.value = input.value.replace(/[^1-9]/g, '')
        } else {
          input.value = input.value.replace(/[^\d\.]/g, '')
        }
        trigger(input, 'input')
      }
      input.onblur = function (e) {
        if (input.value.length === 1) {
          input.value = input.value.replace(/[^1-9]/g, '')
        } else {
          input.value = input.value.replace(/[^\d\.]/g, '')
        }
        trigger(input, 'input')
      }
    }
  });
  // 带小数
  Vue.directive("num", {
    bind: function (el) {
      const input = el.getElementsByTagName('input')[0]
      input.onkeyup = function (e) {
        if (input.value.length === 1) {
          input.value = input.value.replace(/[^0-9.]/g,'')
        } else {
          input.value = input.value.replace(/[^\d\.]/g, '')
        }
        trigger(input, 'input')
      }
      input.onblur = function (e) {
        if (input.value.length === 1) {
          input.value = input.value.replace(/[^0-9.]/g,'')
        } else {
          input.value = input.value.replace(/[^\d\.]/g, '')
        }
        trigger(input, 'input')
      }
    }
  });
  Vue.directive('LimitInputNumber', {
    bind(el) {
      el.onkeypress = (event) => {
        return (/[\d]/.test(String.fromCharCode(event.keyCode || event.which))) || event.which === 8;
      };
      el.oninput = () => {
        el.children[0].value = el.children[0].value.replace(/\D/ig, '');
      };
    },
  });

  // 浮点数限制两位小数
  Vue.directive('floatTwoDecimal', {
    bind(el) {
      el.oninput = () => {
        el.children[0].value = el.children[0].value.replace(/[^\d.]/g, "")
          .replace(/^\./g, "")
          .replace(/\.{2,}/g, ".")
          .replace(".", "$#$")
          .replace(/\./g, "")
          .replace("$#$", ".")
          .replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
      };
    },
  });

  // v-input-limit='number'
  // eg: v-input-limit='2' 代表可以输入2位小数的数字
  Vue.directive("input-limit", {
    bind(el, binding) {
      var wins_0 = /[^\d]/g //整数判断
      var wins_1 = /[^\d^\.]/g //小数判断
      var flag = true;
      var points = 0;
      var lengths = 0
      var remainder = 0
      var no_int = 0
      const target = el instanceof HTMLInputElement ? el : el.querySelector("input");
      target.addEventListener("compositionstart", e => {
        flag = false;
      });
      target.addEventListener("compositionend", e => {
        flag = true;
      });
      target.addEventListener("input", e => {
        setTimeout(function () {
          if (flag) {
            if (binding.value == 0) {
              if (wins_0.test(e.target.value)) {
                e.target.value = e.target.value.replace(wins_0, "");
                e.target.dispatchEvent(new Event("input")) //手动更新v-model值
              }
            }
            if (binding.value == 1) {
              if (wins_0.test(e.target.value.toString().replace(/\d+\.(\d*)/, '$1'))) {
                remainder = true
              }
              if ((e.target.value.split('.')).length - 1 > 1) {
                points = true
              }
              if (e.target.value.toString().split(".")[1] != undefined) {
                if (e.target.value.toString().split(".")[1].length > 1) {
                  lengths = true
                }
              }
              if (e.target.value.toString().indexOf(".") != -1) {
                no_int = false
              } else {
                no_int = true
              }
              if (wins_1.test(e.target.value) || lengths || points || remainder) {
                if (!no_int) {
                  e.target.value = e.target.value.replace(wins_1, "").replace('.', '$#$').replace(/\./g, '').replace(
                    '$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3').substring(0, e.target.value.indexOf(
                      ".") + 2)
                } else {
                  e.target.value = e.target.value.replace(wins_0, "")
                }
                e.target.dispatchEvent(new Event("input"))
              }
            }


            if (binding.value == 2) {
              if (wins_0.test(e.target.value.toString().replace(/\d+\.(\d*)/, '$1'))) {
                remainder = true
              }
              if ((e.target.value.split('.')).length - 1 > 1) {
                points = true
              }
              if (e.target.value.toString().split(".")[1] != undefined) {
                if (e.target.value.toString().split(".")[1].length > 2) {
                  lengths = true
                }
              }
              if (e.target.value.toString().indexOf(".") != -1) {
                no_int = false
              } else {
                no_int = true
              }
              if (wins_1.test(e.target.value) || lengths || points || remainder) {
                if (!no_int) {
                  e.target.value = e.target.value.replace(wins_1, "").replace('.', '$#$').replace(/\./g, '').replace(
                    '$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3').substring(0, e.target.value.indexOf(
                      ".") + 3)
                } else {
                  e.target.value = e.target.value.replace(wins_0, "")
                }
                e.target.dispatchEvent(new Event("input"))
              }
            }
          }
        }, 0)
      })
    }
  })
};
