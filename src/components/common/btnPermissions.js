import Vue from 'vue'
/**权限指令**/

  

const has = Vue.directive('has', {
  bind: function (el, binding, vnode) {
    if (!Vue.prototype.$_has()) {
      setTimeout(() => {
        el.parentNode.removeChild(el);
      })
    }
  }
});
const del = Vue.directive('del', {
  bind: function (el, binding, vnode) {
    if (!Vue.prototype.$_del()) {
      setTimeout(() => {
        el.parentNode.removeChild(el);
      })
    }
  }
});
const check = Vue.directive('check', {
  bind: function (el, binding, vnode) {
    if (!Vue.prototype.$_check()) {
      setTimeout(() => {
        el.parentNode.removeChild(el);
      })
    }
  }
});
const online = Vue.directive('online', {
  bind: function (el, binding, vnode) {
    if (!Vue.prototype.$_online()) {
      setTimeout(() => {
        el.parentNode.removeChild(el);
      })
    }
  }
});
const push = Vue.directive('push', {
  bind: function (el, binding, vnode) {
    if (!Vue.prototype.$_push()) {
      setTimeout(() => {
        el.parentNode.removeChild(el);
      })
    }
  }
});
// 权限检查方法
// 增改权限
Vue.prototype.$_has = function () {
  let isExist = false;
  //  console.log(btnPermissions,btnPermissions.indexOf('1'))
  var btnPermissions = sessionStorage.getItem("btnPermissions").split(',');
  if (btnPermissions == undefined || btnPermissions == null) {
    return false;
  }
  if (btnPermissions.indexOf('1') > -1 || btnPermissions.indexOf('2') > -1 || btnPermissions.indexOf('101') > -1) {
    isExist = true;
  }
  return isExist;
};
//删除权限
Vue.prototype.$_del = function () {
  let isExist = false;
  var btnPermissions = sessionStorage.getItem("btnPermissions").split(',');
  if (btnPermissions == undefined || btnPermissions == null) {
    return false;
  }
  if (btnPermissions.indexOf('1') > -1 || btnPermissions.indexOf('3') > -1 || btnPermissions.indexOf('102') > -1) {
    isExist = true;
  }
  return isExist;
};
//审核权限
Vue.prototype.$_check = function () {
  let isExist = false;
  var btnPermissions = sessionStorage.getItem("btnPermissions").split(',');
  if (btnPermissions == undefined || btnPermissions == null) {
    return false;
  }
  if (btnPermissions.indexOf('1') > -1 || btnPermissions.indexOf('2') > -1 || btnPermissions.indexOf('105') > -1) {
    isExist = true;
  }
  return isExist;
};
//上下线权限
Vue.prototype.$_online = function () {
  let isExist = false;
  var btnPermissions = sessionStorage.getItem("btnPermissions").split(',');
  if (btnPermissions == undefined || btnPermissions == null) {
    return false;
  }
  if (btnPermissions.indexOf('1') > -1 || btnPermissions.indexOf('3') > -1 || btnPermissions.indexOf('106') > -1 || btnPermissions.indexOf('2') > -1) {
    isExist = true;
  }
  return isExist;
};
//推送权限
Vue.prototype.$_push = function () {
  let isExist = false;
  var btnPermissions = sessionStorage.getItem("btnPermissions").split(',');
  if (btnPermissions == undefined || btnPermissions == null) {
    return false;
  }
  if (btnPermissions.indexOf('1') > -1 || btnPermissions.indexOf('2') > -1 || btnPermissions.indexOf('107') > -1) {
    isExist = true;
  }
  return isExist;
};
export default {
  has,
  del,
  check,
  online,
  push
}
