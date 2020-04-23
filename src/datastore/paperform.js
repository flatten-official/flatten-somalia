const { gstore } = require("../datastore/db");

const PAPERFORM_KIND = "PaperformSubmission";

exports.pushPaperform = async(form) => {

  let lang = form.data.lang.value;

  let kind = PAPERFORM_KIND;
  if (!(lang === 'en' || lang === "fr")) {
    kind += "-" + lang;
  }

  try {
    const key = gstore.ds.key([kind, form.submission_id]);
    await gstore.ds.upsert({key, data:form});
  } catch(e) {
    console.error(e);
  }

};
