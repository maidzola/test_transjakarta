import fs from "node:fs/promises";
import path from "node:path";

export interface CsvRecord {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  salary: string;
  department: string;
}

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let value = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];

    if (character === '"' && line[index + 1] === '"' && inQuotes) {
      value += '"';
      index += 1;
    } else if (character === '"') {
      inQuotes = !inQuotes;
    } else if (character === "," && !inQuotes) {
      values.push(value);
      value = "";
    } else {
      value += character;
    }
  }

  values.push(value);
  return values;
}

export async function readCsv(filePath: string): Promise<CsvRecord[]> {
  const content = await fs.readFile(filePath, "utf8");
  const [headerLine, ...dataLines] = content.trim().split(/\r?\n/);

  if (!headerLine) {
    throw new Error(`CSV file is empty: ${filePath}`);
  }

  const headers = parseCsvLine(headerLine);
  const requiredHeaders: (keyof CsvRecord)[] = [
    "firstName",
    "lastName",
    "email",
    "age",
    "salary",
    "department",
  ];

  if (requiredHeaders.some((header) => !headers.includes(header))) {
    throw new Error(`CSV file is missing required columns: ${filePath}`);
  }

  return dataLines
    .filter((line) => line.trim() !== "")
    .map((line) => {
      const values = parseCsvLine(line);
      const fields = Object.fromEntries(
        headers.map((header, index) => [header, values[index]]),
      );

      return {
        firstName: fields.firstName,
        lastName: fields.lastName,
        email: fields.email,
        age: fields.age,
        salary: fields.salary,
        department: fields.department,
      };
    });
}

export const usersCsvPath = path.join(__dirname, "..", "data", "users.csv");
