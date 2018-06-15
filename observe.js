


function observe (data) {
  if (!data || typeof data !== 'object') { return; }
  Object.keys(data).forEach(function (key) {
    defineReactive(data, key, data[key])
  })
}

function defineReactive (data, key, val) {
  var dep = new Dep()
  observe(val) // 监听子属性对象
  Object.defineProperty(data, key, {
    get: function () {
      Dep.target && dep.addSub(Dep.target)
      return val
    },
    set: function (newVal) {
      if (val === newVal) return;
      val = newVal;
      dep.notify(); // 通知所有订阅者
    }
  })
}

function Dep () {
  this.subs = []
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub)
  },
  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update()
    })
  }
}
