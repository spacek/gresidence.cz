const express = require('express');
const fs = require('fs');
const app = express();
const env = require('dotenv').config();
const mysql = require('mysql');
const requestLib = require('request');

const con = mysql.createConnection({
    host: "localhost",
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DBNAME
});

con.connect(function(err) {
    if (err) throw err;
});

const PORT = process.env.PORT || 2000;

app.set('view engine', 'ejs');
app.set('views', './views');
const bodyParser = require('body-parser');

const jsforce = require('jsforce');
const conn = new jsforce.Connection();

const username = process.env.USERNAME;
const pass = process.env.PASSWORD;

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('*', (req, res, next) => {
    conn.login(username, pass, function (err, res) {
        if (err) {
            return console.error(err);
        }
        next();
    });
});

app.get('/', (req, response) => {
    response.render('index');
});


app.get('/dum', (req, response) => {
    response.render('dum', {
        house: false,
        floor: false
    });
});

app.get('/dum/:houseId', (req, response) => {
    const houseId = String(req.params.houseId).toLocaleUpperCase();

    response.render('dum', {
        house: houseId,
        floor: false
    });
});

app.get('/dum/:houseId/:floorId', (req, response) => {
    const houseId = String(req.params.houseId).toLocaleUpperCase();
    const floorId = String(req.params.floorId).toLocaleUpperCase();

    const soql = 'SELECT Name, Unit_Name__c, Floor__c, Availability__c, IsActive, Building_Name__c, Appt_Object_Type__c, Balcony_Terrace_Footage__c, Footage__c, Floor_Size__c, Price_With_VAT__c, Price_Incl_VAT__c FROM Product2 WHERE (Project__c=\'a001p000012TXMJAA4\'AND Type_of_Unit__c=\'Flat\' AND Floor__c=\''+ floorId +'NP\' AND Building_Name__c = \''+ String(houseId).toLocaleUpperCase() +'\'  ) ORDER BY Availability__c ASC';

    conn.query(soql, function (err, res) {

        if (err) {
            return console.error(err);
        }

        response.render('dum', {
            house: houseId,
            floor: floorId,
            flatsData: JSON.stringify(res.records),
            floorSvg: fs.readFileSync('./public/images/byty/vyberbytu_'+ houseId.toLowerCase() +'_'+ floorId +'np_byty.svg','utf8')
        });

    });
});


app.post('/createLead', (req, response) => {
    // const {FirstName, LastName, Phone, Description, Email} = req.body;
    const {FirstName, LastName, Phone, Description, Email} = req.body;

    if(!FirstName || !LastName || !Phone || !Description || !Email) {
        response.redirect('/');
        response.end();
    }

    const lead = {
        FirstName: FirstName,
        LastName: LastName,
        Phone: Phone,
        Email: Email,
        Description: Description,
        office_location__c: 'Prague',
        LeadSource: 'PPC',
        Status: 'New',
        GDPR__c: true,
        Project__c: 'a001p000012TXMJAA4',
        Campaign__c: '7011p000000P2ClAAK'
    };

    con.query('INSERT INTO leads SET ?', {
        lead: JSON.stringify(lead)
    }, function (error, results, fields) {
        if (error) throw error;
        // Neat!
    });

    conn.sobject("Lead").create(lead, function (err, ret) {
        if (err || !ret.success) {
            return console.error(err, ret);
        }
        console.log("Created record id : " + ret.id);
        conn.sobject("CampaignMember").create({LeadId: ret.id, CampaignId: '7011p000000P2ClAAK', Status: 'Responded'})
    });

    response.redirect('/#sent');
    response.end();

});

app.post('/createBrozuraLead', (req, response) => {
    // const {FirstName, LastName, Phone, Description, Email} = req.body;
    // conn.sobject("Lead").create({
    //     FirstName: FirstName,
    //     LastName: LastName,
    //     Phone: Phone,
    //     Email: Email,
    //     Description: Description,
    //     office_location__c: 'Prague',
    //     LeadSource: 'PPC',
    //     Status: 'New',
    //     GDPR__c: true,
    //     Project__c: 'a001p000012TXMJAA4',
    //     Campaign__c: '7011p000000P2ClAAK'
    // }, function (err, ret) {
    //     if (err || !ret.success) {
    //         return console.error(err, ret);
    //     }
    //     console.log("Created record id : " + ret.id);
    //     conn.sobject("CampaignMember").create({LeadId: ret.id, CampaignId: '7011p000000P2ClAAK', Status: 'Responded'})
    // });
    const {FirstName, LastName, Email} = req.body;
    requestLib.post(
        'http://cl.s50.exct.net/subscribe.aspx?lid=265',
        { json: { "SubAction": "sub_add_update", "MID": "510000399", "thx": "https://gresidence.cz/brozura.pdf", "err": "https://www.gresidence.cz/", "usub": "https://www.gresidence.cz/", "Email Address": Email, "Email Type": "HTML", "First Name": FirstName, "Last Name": LastName  } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // console.log(body);
                response.redirect('https://gresidence.cz/brozura.pdf');
            }
        }
    );
    // response.redirect('/brozura.pdf');
    response.end();

});

app.get('/standardy', (req, response) => {
    response.render('standardy');
});

app.get('/byt/:flatId', (req, response) => {
    let rawdata = fs.readFileSync('apartments.json');
    let apartments = JSON.parse(rawdata);
    const flatId = String(req.params.flatId).toLocaleUpperCase();
    const rooms = apartments[flatId];

    const soql = 'SELECT Name, Unit_Name__c, Floor__c, Availability__c, IsActive, Building_Name__c, Appt_Object_Type__c, Balcony_Terrace_Footage__c, Footage__c, Floor_Size__c, Price_With_VAT__c, Price_Incl_VAT__c FROM Product2 WHERE (Project__c=\'a001p000012TXMJAA4\'AND Type_of_Unit__c=\'Flat\' AND Unit_Name__c=\''+ flatId +'\'  ) ORDER BY Availability__c ASC';

    conn.query(soql, function (err, res) {
        if (err) {
            return console.error(err);
        }

        const flatData = res.records[0];

        response.render('flat', {
            rooms: rooms,
            identifier: String(req.params.flatId).toLocaleUpperCase(),
            data: flatData,
            house: String(flatData.Building_Name__c).toLowerCase(),
            floor: parseInt(String(flatData.Floor__c).substring(0,1))
        });

    });
});

function getStatus(item) {
    switch (item.Availability__c) {
        case 'Available':
            return 'Dostupné'
            break;
        case 'SBK signed':
        case 'Purchase Contract':
        case 'Sold':
        case 'Future Contract':
            return 'Prodáno';
            break;
        case 'Reserved':
        case 'Reservation Contract':
        case 'Pre-Reserved':
            return 'Rezervováno';
        break;
    }

    return '-';
}

function getPrice(item) {
    if(item.Availability__c === 'Available') {
        return String(item.Price_incl_VAT__c).replace(/(.)(?=(\d{3})+$)/g, '$1 ') + ',- Kč';
    }
    return null;
}

function getButton(item) {
    if(item.Availability__c === 'Available') {
        return '<a href="/byt/'+ item.Unit_Name__c.toLowerCase() +'" class="button">Detail</a>'
    }
    return null;
}

app.get('/cenik', (req, response) => {

    const isAjaxRequest = req.xhr;


    let conditions = '';
    let onlyAvailable = false;

    if (req.query.only_available == "1") {
        onlyAvailable = true;
        conditions += ' AND Availability__c = \'Available\'';
    }

    let sizes = [];

    if (req.query.size1kk && req.query.size1kk == "1") {
        sizes.push('1+kk');
    }

    if (req.query.size2kk && req.query.size2kk == "1") {
        sizes.push('2+kk');
    }

    if (req.query.size3kk && req.query.size3kk == "1") {
        sizes.push('3+kk');
    }

    if (req.query.size4kk && req.query.size4kk == "1") {
        sizes.push('4+kk');
    }

    if (sizes.length) {
        conditions = conditions + ' AND Appt_Object_Type__c IN (\'' + sizes.join('\',\'') + '\')';
    }

    const soql = 'SELECT Name, Unit_Name__c, Floor__c, Availability__c, IsActive, Building_Name__c, Appt_Object_Type__c, Balcony_Terrace_Footage__c, Footage__c, Floor_Size__c, Price_With_VAT__c, Price_Incl_VAT__c FROM Product2 WHERE (Project__c=\'a001p000012TXMJAA4\'AND Type_of_Unit__c=\'Flat\' ' + conditions + ' ) ORDER BY Availability__c ASC';

    conn.query(soql, function (err, res) {
        if (err) {
            return console.error(err);
        }
        const gresApts = res;
        gresApts.records.map((el) => {
            el.Footage__c = el.Footage__c.toFixed(1);
            el.Balcony_Terrace_Footage__c = el.Balcony_Terrace_Footage__c.toFixed(1);
            el.Price_With_VAT__c = el.Price_With_VAT__c.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        });

        if (isAjaxRequest) {

            let data = [];
            gresApts.records.forEach(function (item) {
                data.push([
                    item.Unit_Name__c,
                    item.Building_Name__c,
                    item.Floor_Size__c,
                    item.Appt_Object_Type__c,
                    item.Balcony_Terrace_Footage__c,
                    getPrice(item),
                    getStatus(item),
                    getButton(item)
                ])
            });


            response.render('buttons.ejs', {
                size1kk: sizes.includes('1+kk'),
                size2kk: sizes.includes('2+kk'),
                size3kk: sizes.includes('3+kk'),
                size4kk: sizes.includes('4+kk'),
                onlyAvailable: onlyAvailable

            }, function(err, output){
                response.json({
                    data: data,
                    buttons: output
                });

            });


            return;
        }

        response.render('cenik', {
            gresApts: gresApts,
            size1kk: sizes.includes('1+kk'),
            size2kk: sizes.includes('2+kk'),
            size3kk: sizes.includes('3+kk'),
            size4kk: sizes.includes('4+kk'),
            onlyAvailable: onlyAvailable
        });
    });
});


app.listen(PORT, '127.0.0.1', (req, res) => {
    console.log('server started listening on port 9001');
});
