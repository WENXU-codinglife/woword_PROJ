// import CREDENTIALS


const dictionaryAccessKey = 'c1f42caf-a67f-46b9-aba6-e14c23e777e5';

export const dictionaryAPIUrlGen = (entry) => {
    return `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${entry}?key=${dictionaryAccessKey}`;
}