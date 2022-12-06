

export function ObjectDeepClone(obj){
    var clone = {}
    Object.keys(obj).forEach(k => clone[k] = obj[k])
    return clone
}

export function DeepCloneSet(obj1, obj2){
    var clone = ObjectDeepClone(obj1)
    Object.keys(obj2).forEach(k => clone[k] = obj2[k])
    return clone
}

export function DeepCloneStateSet(obj1, obj2, setter){
    var clone = DeepCloneSet(obj1, obj2)
    setter(clone)
}
