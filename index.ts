import program, { CommanderStatic } from "commander";
import { validateFile, writeRouteConfig } from "./utils";
import { ValidateFileOutput } from "./@types";

program
  .version("0.0.1")
  .option("-s, --source [file]", "The file to convert.")
  .option(
    "-n, --output-file [fileName]",
    "The name of the output file. Defaults to routes.js."
  )
  .option(
    "-p, --output-path",
    "The output path. Defaults to the directory command was executed in."
  )
  .parse(process.argv);

export default function main({ source, outputHelp, outputFile, outputPath }: CommanderStatic): void {
  try {
    const { isValid, error }: ValidateFileOutput = validateFile(source);
    if(!isValid) throw new Error(error);
    const outputLocation: string = outputPath ? `${outputPath}${outputFile}` : `${__dirname}${outputFile}`;
    writeRouteConfig(outputLocation, '');
  } catch (e) {
    console.error(e.message);
    outputHelp();
    process.exit(2);
  }
}
