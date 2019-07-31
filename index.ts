import program from 'commander'
 
program
  .version('0.0.1')
  .option('-f, --file [file]', 'Add a specified file')
  .parse(process.argv);
 