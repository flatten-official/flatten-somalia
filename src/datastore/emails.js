const MarketingEmail = require('../models/email');

const moment = require("moment");

class MarketingEmailService {
    constructor() {
        this.entity = undefined;
    }

    createNewUser(email) {
        const data = {
            email: email
        };
        this.entity = new MarketingEmail(data, email);
    }

    async notifySubmit(email) {
        let success = await this.loadEmail(email);
        if (!success) {
            this.createNewUser(email);
        }
        this.setSubmissionTime();
        this.pushEmail();
    }

    async loadEmail(email) {
        let success = true;
        try {
            this.entity = await MarketingEmail.get(email);
        } catch (e) {
            success = false;
        }
        return success;
    }

    async pushEmail() {

        if (this.entity === undefined) {
            throw Error("Cannot push undefined Account entity");
        }

        await this.entity.save(null, {method: 'upsert'}).catch(console.error);
    }

    setSubmissionTime() {
        // get timestamp in ms since unix origin as an integer
        let timestamp = Math.round(moment().startOf('day').valueOf());
        this.entity.submission_times.push(timestamp);
    }
}

exports.insert = async(email) => {
    let emailData = new MarketingEmailService();
    await emailData.notifySubmit(email);
};
