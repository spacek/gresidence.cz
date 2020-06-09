jQuery( document ).ready(function() {
    function getParam(p) {
        var match = RegExp('[?&]' + p + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    function getExpiryRecord(value) {
        var expiryPeriod = 90 * 24 * 60 * 60 * 1000; // 90 day expiry in milliseconds

        var expiryDate = new Date().getTime() + expiryPeriod;
        return {
            value: value,
            expiryDate: expiryDate
        };
    }

    function addGclidEtc() {
        var gclidParam = getParam('gclid');
        var gclidFormFields = jQuery("input[name='gclidField']").toArray(); // all possible gclid form field ids here
        var gGroupParam = getParam('g_group');
        var gGroupdFormFields = jQuery("input[name='gGroupField']").toArray(); // all possible g-group form field ids here
        var gCampaignParam = getParam('g_campaign');
        var gCampaignFormFields = jQuery("input[name='gCampaignField']").toArray(); // all possible g-campaign form field ids here
        var utmSourceParam = getParam('utm_source');
        var utmSourceFormFields = jQuery("input[name='utmSourceField']").toArray(); // all possible utm-source form field ids here
        var utmMediumParam = getParam('utm_medium');
        var utmMediumFormFields = jQuery("input[name='utmMediumField']").toArray(); // all possible utm-medium form field ids here
        var utmCampaignParam = getParam('utm_campaign');
        var utmCampaignFormFields = jQuery("input[name='utmCampaignField']").toArray(); // all possible utm-campaign form field ids here
        var utmContentParam = getParam('utm_content');
        var utmContentFormFields = jQuery("input[name='utmContentField']").toArray(); // all possible utm-content form field ids here

        var gclidRecord = null;


        var gclsrcParam = getParam('gclsrc');
        var isGclsrcValid = !gclsrcParam || gclsrcParam.indexOf('aw') !== -1;

        if (gclidParam && isGclsrcValid) {
            gclidRecord = getExpiryRecord(gclidParam);
            localStorage.setItem('gclid', JSON.stringify(gclidRecord));
        }
        if(gGroupParam !== null){
            localStorage.setItem('g_group', JSON.stringify(gGroupParam));
        }
        if(gCampaignParam !== null){
            localStorage.setItem('g_campaign', JSON.stringify(gCampaignParam));
        }
        if(utmSourceParam !== null){
            localStorage.setItem('utm_source', JSON.stringify(utmSourceParam));
        }
        if(utmMediumParam !== null){
            localStorage.setItem('utm_medium', JSON.stringify(utmMediumParam));
        }
        if(utmCampaignParam !== null){
            localStorage.setItem('utm_campaign', JSON.stringify(utmCampaignParam));
        }
        if(utmContentParam !== null){
            localStorage.setItem('utm_content', JSON.stringify(utmContentParam));
        }

        var gclid = gclidRecord || JSON.parse(localStorage.getItem('gclid'));
        var gGroup = JSON.parse(localStorage.getItem('g_group'));
        var gCampaign = JSON.parse(localStorage.getItem('g_campaign'));
        var utmSource = JSON.parse(localStorage.getItem('utm_source'));
        var utmMedium = JSON.parse(localStorage.getItem('utm_medium'));
        var utmCampaign = JSON.parse(localStorage.getItem('utm_campaign'));
        var utmContent = JSON.parse(localStorage.getItem('utm_content'));

        var isGclidValid = gclid && new Date().getTime() < gclid.expiryDate;

        gclidFormFields.forEach(function (field) {
            if (field && isGclidValid) {
                field.value = gclid.value;
            }
        });
        gGroupdFormFields.forEach(function (field) {
            field.value = gGroup;
        });
        gCampaignFormFields.forEach(function (field) {
            field.value = gCampaign;
        });
        utmSourceFormFields.forEach(function (field) {
            field.value = utmSource;
        });
        utmMediumFormFields.forEach(function (field) {
            field.value = utmMedium;
        });
        utmCampaignFormFields.forEach(function (field) {
            field.value = utmCampaign;
        });
        utmContentFormFields.forEach(function (field) {
            field.value = utmContent;
        });
    }
    window.addEventListener('load', addGclidEtc);
});