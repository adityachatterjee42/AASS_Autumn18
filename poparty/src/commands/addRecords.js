const {Command, flags} = require('@oclif/command')

class AddRecordsCommand extends Command {
  async run() {
    const {flags} = this.parse(AddRecordsCommand)
    const table = flags.table || null
    const records = flags.records || 0
    this.log(`Attempting to insert ${records} records into table ${table}`)
  }
}

HelloCommand.description = `This command inserts a specified number of records containing synthetic data into a specified table in the schema
...
Extra documentation goes here
`

HelloCommand.flags = {
  table: flags.string({char: 't', description: 'table to insert data into'}),
  records: flags.integer({char: 'r', description: 'number of records to insert'})
}

module.exports = AddRecordsCommand
