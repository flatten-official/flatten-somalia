// import and combine translations into a single object that is passed to react-redux-i18n

let languages = ['so', 'en']
let namespaces = ['Auth', 'Admin', 'VolunteerForm', 'Navbar', 'Footer', 'Home']

async function getTranslations() {
    let locales = {}

    for (const language of languages) {
        locales[language] = {}
        for (const ns of namespaces) {
            let translations = await import('./' + language + "/" + ns)
            locales[language][ns] = translations.default
        }
    }

    return locales
}

export default getTranslations;