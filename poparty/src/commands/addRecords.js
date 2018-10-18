const {Command, flags} = require('@oclif/command')
const { createGuests, createHotels, createRooms, createReservations } = require('../operations/populateDatabase')

class AddRecordsCommand extends Command {
  async run() {
    const {flags} = this.parse(AddRecordsCommand)
    const guests = flags.guests || 0
    const hotels = flags.hotels || 0
    const rooms = flags.rooms || 0
    const reservations = flags.reservations || 0
    if(guests>0) {
      this.log(`Attempting to insert ${guests} guest records into database`)
      await createGuests(guests)
    }
    if(hotels>0) {
      this.log(`Attempting to insert ${hotels} hotel records into database`)
      await createHotels(hotels)
    }
    if(rooms>0 && hotels>0) {
      this.log(`Attempting to insert ${rooms} room records into database`)
      await createRooms(rooms, hotels)
    }
    if(reservations>0 && rooms>0 && hotels>0 && guests>0) {
      this.log(`Attempting to insert ${reservations} reservation records into database`)
      await createReservations(reservations, guests, hotels, rooms)
    }
    process.exit(0);
  }
}

AddRecordsCommand.description = ` This command inserts synthetic data into an AWS postgres instance containing a database of hotels and reservations - the intended use is to rapidly load data in order to run database performance experiments
...
Extra documentation goes here
`

AddRecordsCommand.flags = {
  guests: flags.integer({char: 'g', description: 'number of records to insert into guests table'}),
  hotels: flags.integer({char: 'h', description: 'number of records to insert into hotels table'}),
  rooms: flags.integer({char: 'r', description: 'number of records to insert into rooms table'}),
  reservations: flags.integer({char: 'x', description: 'number of records to insert into reservations table'}),
}

module.exports = AddRecordsCommand

