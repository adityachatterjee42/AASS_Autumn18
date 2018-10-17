const {Command, flags} = require('@oclif/command')
var faker = require('faker')
const { Client } = require('pg')

class AddRecordsCommand extends Command {
  async run() {
    const {flags} = this.parse(AddRecordsCommand)
    const guests = flags.guests || 0
    const hotels = flags.hotels || 0
    const rooms = flags.rooms || 0
    const reservations = flags.reservations || 0
    this.log(`Attempting to insert ${guests + hotels + rooms + reservations} records into database`)
    
  }
}

AddRecordsCommand.description = ` This command inserts synthetic data into an AWS postgres instance containing a database of hotels and reservations - the intended use is to rapidly load data in order to run database performance experiments
...
Extra documentation goes here
`

HelloCommand.flags = {
  guests: flags.integer({char: 'g', description: 'number of records to insert into guests table'}),
  hotels: flags.integer({char: 'h', description: 'number of records to insert into hotels table'}),
  hotels: flags.integer({char: 'h', description: 'number of records to insert into hotels table'}),
  hotels: flags.integer({char: 'h', description: 'number of records to insert into hotels table'}),
}

module.exports = AddRecordsCommand

//-----------------------------------
//!---warning old code below here---!
//-----------------------------------

const client = new Client({
    user: 'masterusername',
    host: 'rds-postgresql-hotelreservation.cqfnnuiplrsh.us-east-2.rds.amazonaws.com',
    database: 'hotelreservation',
    password: 'aass!!07',
    port: 5432
  });

client.connect();

faker.locale = 'en_US';

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

function createGuests(n){
    for(var guestid=1; guestid<=n; guestid++){
        var text = 
        `INSERT INTO guest(guestid, firstname, lastname, address, city, zipcode) 
        VALUES(${guestid}, 
        '${faker.name.firstName()}',
        '${faker.name.lastName()}',
        '${faker.address.streetAddress()}',
        '${faker.address.city()}',
        ${faker.address.zipCode()}
        ) RETURNING *`;
        client.query(text)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack));
    }
}

function createRooms(n, r){
    for(var hotelid=1; hotelid<=n; hotelid++){
        for(var roomnumber=1; roomnumber<=r; roomnumber++){
            var text = 
            `INSERT INTO room(roomid, roomnumber, hotelid) 
            VALUES(${hotelid*100+roomnumber}, 
            '${roomnumber}',
            '${hotelid}'
            ) RETURNING *`;
            client.query(text)
            .then(res => console.log(res.rows[0]))
            .catch(e => console.error(e.stack));
        }
    }
}

function createHotels(n){
    for(var hotelid=1; hotelid<=n; hotelid++){
        var text = 
        `INSERT INTO hotel(hotelid, hotelname, address, city, zipcode) 
        VALUES(${hotelid}, 
        '${faker.company.companyName()}',
        '${faker.address.streetAddress()}',
        '${faker.address.city()}',
        ${faker.address.zipCode()}
        ) RETURNING *`;
        client.query(text)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack));

    }
}

function createReservations(n, g, h, r){
    for(var i=1; i<=n; i++){
        var hotel = getRandom(1, h);
        var room = getRandom(1, r);
        var guest = getRandom(1, g);
        var roomid = hotel*100+room;
        var text = 
        `INSERT INTO reservation(reservationid, roomid, guestid, checkindate, numberofdays) 
        VALUES(${i}, 
        ${roomid},
        ${guest},
        NOW() - '1 day'::INTERVAL * ROUND(RANDOM() * 100),
        ${getRandom(1, 20)}
        ) RETURNING *`;
        console.log(text);
        client.query(text)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack));
    }
}