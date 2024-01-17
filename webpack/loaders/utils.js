function tplReplace(template,replaceObj){
    return template.replace(/\{\{(.*?)\}\}/g,(node,key)=>{
        return replaceObj[key] //替换对象中对应的值
    })
}
moudule.exports = {
    tplReplace
}