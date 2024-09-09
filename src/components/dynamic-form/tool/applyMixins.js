/**
 * 应用混入
 * 用这个方法来装饰某个类实现多继承
 * 只能继承目标类上的公共方法
 * @param baseCtors 需要混入的对象
 */
export function applyMixins() {
    var baseCtors = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        baseCtors[_i] = arguments[_i];
    }
    return function (target) {
        baseCtors.forEach(function (baseCtor) {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                target.prototype[name] = baseCtor.prototype[name];
            });
        });
    };
}
//使用方法
/**
 class _A {
    _a() {
        console.log('_A类');
    }
}

 class A {
    a() {
        console.log('A类');
    }
}

 class B {
    b() {
        console.log('B类');
    }
}

 @applyMixins(A, B)
 class C implements A, B {
    a(): void { }
    b(): void { }
    c() {
        console.log('C类');
    }
}

 let c: C = new C();

 //
 c.a();
 c.b();
 c.c();
 //
 */
