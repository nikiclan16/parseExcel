import { useState } from "react";
import { read, readFile, utils } from 'xlsx';


interface ExcelData {
    [key: string]: unknown; 
}

export const useExcel = (limit?:number) => {

    const [fileName, setFileName] = useState('');
    const [excelData, setExcelData] = useState<ExcelData[]>([]);

    const handleFile = async(e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        if(!e.target.files)return;

        const file = e.target.files[0];

        setFileName(file.name);

        const data = await file.arrayBuffer();

        let jsonData: ExcelData[] = [];

        if (limit) {
            const workbook = readFile(data, { sheetRows: limit });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            jsonData = utils.sheet_to_json(worksheet);
        } else {
            const workbook = read(data);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            jsonData = utils.sheet_to_json(worksheet);
        }

        setExcelData(jsonData)
    }
  return {
    fileName,
    excelData,
    handleFile
  }
}
