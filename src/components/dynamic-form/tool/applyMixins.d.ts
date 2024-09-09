/**
 * 应用混入
 * 用这个方法来装饰某个类实现多继承
 * 只能继承目标类上的公共方法
 * @param baseCtors 需要混入的对象
 */
export declare function applyMixins(...baseCtors: any[]): (target: {
    new (): any;
}) => void;
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
//# sourceMappingURL=applyMixins.d.ts.map