const { gstore } = require("../datastore/db");

const PAPERFORM_KIND = "PaperformSubmission";

exports.pushPaperform = async(form) => {

  try {
    const key = gstore.ds.key([PAPERFORM_KIND, form.submission_id]);
    await gstore.ds.upsert({key, data:form});
  } catch(e) {
    console.error(e);
  }

};
