import program from "commander";

program
  .version("0.0.1")
  .option("-s, --source [file]", "The file to convert.")
  .option(
    "-n, --output-file [fileName]",
    "The name of the output file. Defaults to routes.js."
  )
  .option(
    "-p, --path",
    "The output path. Defaults to the directory command was executed in."
  )
  .parse(process.argv);

export default function main({ source }) {
  try {
  } catch (e) {
    console.error(e.message);
    program.outputHelp();
    process.exit(2);
  }
}
