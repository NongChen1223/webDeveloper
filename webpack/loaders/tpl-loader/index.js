const { tplReplace } = require('../utils')
function tplLoader(source){
    source = source.replace(/\s+/g,'') //去掉空格
    // return source;
    console.log('source 11!!!!',source)

    return `
    export default (options)=>{
        ${tplReplace.toString()}
        return tplReplace('${source}',options)
    }
    `
}
// function tpl(opt){
//     const tplReplace = (template,replaceObj)=>{
//         return template.replace(/\{\{(.*?)\}\}/g,(node,key)=>{
//             return replaceObj[key]
//         })
//     }   

//     return tplReplace(`${source}`,opt  ) 
// }
module.exports = tplLoader

