/*

    arg: 
    {
        //"varname": "varvalue" e.g.
        "name": "Pedro"
    }


*/
export default ({htmlString, args }) => {
    const regexVars = /{{([^}]+)}}/g
    const regexKey = /([^{])([^}]+)/g
    const regexLookForTags = /<(\S*?)[^>]*>.*?<\/\1>|<.*?\/>/g 
    let newHTML = htmlString, declarations = '';
    for( let key in args ){
        declarations += `let ${key}=${typeof args[key] == "string" ? `"${args[key]}"` : typeof args[key] == "function" ? `args.${key}`: args[key] };`
    }
    if(newHTML.match(regexVars) != null){
        newHTML.match(regexVars).forEach( variable => {
            const key = variable.match(regexKey) != null ? variable.match(regexKey)[0] : null
            let tempHTML = ''
            if(args[key] != null){
                const htmlTags = args[key].match(regexLookForTags) 
                const isHTML = htmlTags != null
                if(isHTML){
                    const destructuredString = [...args[key]]
                    args[key] = '';
                    destructuredString.forEach( (letter, index) => {
                        args[key] +=  index == 0 ? `${letter} ` : letter == '/' ? ` ${letter}` : letter;
                    })
                }
            }
            try{
                tempHTML = newHTML.replace(/{{([^}]+)}}/, args[key] != null ? '${'+ key +'}' : '${'+key+'}' )
                eval(declarations+'`'+tempHTML+'`') //Checking for undefined variables
                newHTML = newHTML.replace(/{{([^}]+)}}/, args[key] != null ? '${'+ key +'}' : '${'+key+'}' )
            }catch(e){
                console.error(e)
                newHTML = newHTML.replace(/{{([^}]+)}}/, '${'+ undefined +'}' )
            }
        })
    } 
    const computedString = eval(declarations +'`'+ newHTML +'`')
    return computedString;
} 