
export const wordResponseValidation = (data) => {
    for (let el of data) {
        if (typeof el === 'string')return false;
        return true;
    }
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
            d.sseq.forEach((dd) => {
                dd.forEach((ddd) => {
                    ddd[1].dt.forEach(dddd=>{
                        if(dddd[0] === 'text'){
                            obj.dts.push({text: dddd[1]});
                        }else if(dddd[0] === 'vis'){
                            obj.dts[obj.dts.length-1] = {...obj.dts[obj.dts.length-1], vis:dddd[1][0].t};
                        }
                    })
                });
            })
        })
        parsedData.push(obj);
    })
    console.log(parsedData);
    return parsedData;
}