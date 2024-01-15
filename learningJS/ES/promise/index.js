const PENDING = 'PENDING' //进行中
const FULFILLED = 'FULFILLED' //已成功
const REJECTED = 'REJECTED' //已失败
const isFunction = variable => typeof variable === 'function'
class XiaoPromise {
    aa = 1
    constructor(handle) {
        if (!isFunction(handle)) {
            throw new Error('XiaoPromise 必须是一个函数')
        }
        this._status = PENDING
        this._value = undefined
        this._fulfilledQueues = []
        this._rejectedQueues = []
        try {
            console.log('123')
            handle(this._resolve.bind(this), this._reject.bind(this))
        } catch (err) {
            this._reject(err)
        }
    }
    _resolve(val) {
        console.log('_resolve this', this.aa)
        if (this._status !== PENDING) return
        this._status = FULFILLED
        this._value = val
    }
    _reject(val) {
        console.log('_reject this', this.aa)
        if (this._status !== PENDING) return
        this._status = REJECTED
        this._value = val
    }
    then(onFulfilled, onRejected) {
        const { _value, _status } = this
        switch (_status) {
            case PENDING:
                this._fulfilledQueues.push(onFulfilled)
                this._rejectedQueues.push(onRejected)
                break;
        }
    }
}
const sd = new XiaoPromise(() => {

})