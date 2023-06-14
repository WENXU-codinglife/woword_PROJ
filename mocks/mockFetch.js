// export default async function mockFetch(url) {
//     switch (url) {
//         case "https://dog.ceo/api/breeds/list/all": {
//             return {
//                 ok: true,
//                 status: 200,
//                 json: async () => breedsListResponse,
//             };
//         }
//         case "https://dog.ceo/api/breed/husky/images" :
//         case "https://dog.ceo/api/breed/cattledog/images": {
//             return {
//                 ok: true,
//                 status: 200,
//                 json: async () => dogImagesResponse,
//             };
//         }
//         default: {
//             throw new Error(`Unhandled request: ${url}`);
//         }
//     }
// }

const wordDefinitionResponse = [{"meta":{"id":"gelato","uuid":"33dc5b53-d84a-4e98-b522-ba0c49cfbc4d","sort":"070639000","src":"collegiate","section":"alpha","stems":["gelati","gelato","gelatos"],"offensive":false},"hwi":{"hw":"ge*la*to","prs":[{"mw":"j\u0259-\u02c8l\u00e4-(\u02cc)t\u014d","sound":{"audio":"gelato01","ref":"c","stat":"1"}},{"mw":"je-"}]},"fl":"noun","ins":[{"il":"plural","ifc":"-ti","if":"ge*la*ti","prs":[{"mw":"j\u0259-\u02c8l\u00e4-t\u0113","sound":{"audio":"gelato02","ref":"c","stat":"1"}},{"mw":"je-"}]},{"il":"also","ifc":"-tos","if":"ge*la*tos"}],"def":[{"sseq":[[["sense",{"dt":[["text","{bc}a soft rich ice cream containing little or no air"]]}]]]}],"et":[["text","Italian, literally, frozen"]],"date":"1929","shortdef":["a soft rich ice cream containing little or no air"]}]

const mockFetch = async (url) => {
    switch(url){
        case "https://www.dictionaryapi.com/api/v3/references/collegiate/json/gelato?key=c1f42caf-a67f-46b9-aba6-e14c23e777e5": {
        return {
                ok: true,
                status: 200,
                json: async () => wordDefinitionResponse,
            }

        }
        default: {
            throw new Error(`Unhandled request: ${url}`);
        }
    }
};
export default mockFetch;