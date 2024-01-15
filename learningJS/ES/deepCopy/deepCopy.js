//对象浅拷贝
let a1 = { a:1,c:2 }
let obj1 = { b:{ b:1 } }
let obj3 = { c:3 }
let obj4 = { c:4 }
const a2 =   Object.assign(a1,obj1,obj3,obj4) //如果后续参数有和原对象有相同的key值 会覆盖原有对象的key 以此类推无数个后续参数
// console.log('---Object.assign 的深拷贝1---',a1) //a1与a2的值一样 说明Object.assign是浅拷贝
// console.log('---Object.assign 的深拷贝2---',a2)
let b1 = [1,2,3,4]
let b2 = b1.slice()
b1[0] = 'a'

let c1 = [{a:1},{a:2}]
let c2 = c1.slice()
c1[0] = { a:'b' }
// console.log('---数组浅拷贝---',c1)
// console.log('---数组浅拷贝---',c2)

const target = {
    field1: 1,
    field2: undefined,
    field3: 'ConardLi',
    field4: {
        child: 'child',
        child2: {
            child2: 'child2'
        }
    }
}
function clone(target){
    if(typeof target === 'object'){
        let cloneTarget = Array.isArray(target) ? [] : {};
        for(const key in target){
            cloneTarget[key] = clone(target[key])
            console.log('cloneTarget', cloneTarget)
        }
        return cloneTarget
    }else{
        return target;
    }
}
//升级版 
function mapClone(target,map = new Map()){
    if(typeof target === 'object'){
        let cloneTarget = Array.isArray(target) ? [] : {}
        if(map.get(target)){ //map.get 读取key对应值 找不到返回undefined
            return map.get(target)
        }
        map.set(target,cloneTarget) //set 存储键值
        for(const key in target){
            cloneTarget[key] = clone(target[key], map)
        }
        return cloneTarget
    }else{
        return target
    }

}
// const targetCopy =   clone(target)
target.target = target
console.log('target',target)