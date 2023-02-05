
export const wordResponseValidation = (data) => {
    for (let el of data) {
        if (typeof el === 'string')return false;
        return true;
    }
}

// The original text and example format contains tags wrapped with '{}' 
// (e.g.  {bc}the action of {a_link|parting} {bc}the state of being {a_link|parted} {bc}{sx|division||})
const definitionTextCleaner = (text) => {
    let openBrace = false;
    let res = '';
    for (let c of text){
        if (c === '{' || c === '}'){
            openBrace = !openBrace;
            continue;
        }else if(!openBrace){
            res += c;
        }
    }
    return res;
}

export const dictionaryApiReponseParser = (data) => {
    console.log(data);
    const parsedData = [];
    data.forEach((fl) => {
        const obj = {
            part: fl.fl,
            dts: []
        };
        fl.def.forEach((d) => {
            console.log('d');
            d.sseq.forEach((dd) => {
                console.log('dd');
                dd.forEach((ddd) => {
                    console.log('ddd',ddd);
                    try {
                        ddd[1].forEach(dddd=>{
                            dddd[1].dt.forEach(ddddd=>{
                                if(ddddd[0] === 'text'){
                                    obj.dts.push({text: definitionTextCleaner(ddddd[1])});
                                }else if(ddddd[0] === 'vis'){
                                    obj.dts[obj.dts.length-1] = {...obj.dts[obj.dts.length-1], vis:definitionTextCleaner(ddddd[1][0].t)};
                                }                            
                            })
                        })
                    } catch (error){
                        console.log(error);
                    }
                    try {
                        ddd[1].dt.forEach(dddd=>{
                            console.log('dddd');
                            if(dddd[0] === 'text'){
                                obj.dts.push({text: definitionTextCleaner(dddd[1])});
                            }else if(dddd[0] === 'vis'){
                                obj.dts[obj.dts.length-1] = {...obj.dts[obj.dts.length-1], vis:definitionTextCleaner(dddd[1][0].t)};
                            }
                        })
                    } catch (error) {
                        console.log(error);
                    };
                });
            })
        })
        parsedData.push(obj);
    })
    console.log(parsedData);
    return parsedData;
}

export const aiResponseCleaner = (msg) => {
    return msg.replaceAll('\n', '');
}

export const stringComparison = (msg1, msg2) => {
    return msg1 === msg2;
}

export const oneLetterDiff = (str1, str2) => {
    if(Math.abs(str1.length - str2.length) > 1)return false;
    const arr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(let i in str1){
        arr[str1[i].charCodeAt() - 'A'.charCodeAt()] += 1;
    }
    for(let i in str2){
        arr[str2[i].charCodeAt() - 'A'.charCodeAt()] -= 1;
    }
    const ans = arr.reduce((ans, el) => 
        el === 0? ans:[...ans, el]
    , []);
    console.log(ans);
    if(ans.length > 2 || ans.length === 0)return false;
    for(let i in ans){
        if(Math.abs(ans[i]) !== 1)return false;
    }
    return true;
}