const {Command, flags} = require('@oclif/command')

class PurgeCommand extends Command {
  async run() {
    const {flags} = this.parse(PurgeCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from C:\\Users\\Aditya Chatterjee\\Desktop\\AASS_Autumn18\\poparty\\src\\commands\\purge.js`)
  }
}

PurgeCommand.description = `Describe the command here
...
Extra documentation goes here
`

PurgeCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = PurgeCommand
