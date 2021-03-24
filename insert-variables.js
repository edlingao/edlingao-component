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
    let newHTML = htmlString;
    if(newHTML.match(regexVars) != null){
        newHTML.match(regexVars).forEach( variable => {
            const key = variable.match(regexKey)[0]
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
            newHTML = newHTML.replace(/{{([^}]+)}}/,args[key] )
        })
    } 
    return newHTML;
} 