import fs from 'fs';

function writeRouteConfig(outputLocation: string, data: string) {
  const formattedData = data
    .split(',')
    .map((val, idx, array) => {
      const index = val.indexOf('component');
      if (index > -1) {
        const lastQuoteMark = val.lastIndexOf('"');
        const componentVal = val.substring(index + 12, lastQuoteMark);
        val =
          idx === array.length - 1
            ? `"component":${componentVal}}]`
            : `"component":${componentVal}}`;
      }
      return val;
    })
    .join(',');
  fs.writeFileSync(outputLocation, formattedData);
  console.log(`File written to ${outputLocation}`, formattedData);
  process.exit(1);
}

export default writeRouteConfig;
