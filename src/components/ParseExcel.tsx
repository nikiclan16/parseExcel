import { FC, useState } from "react"
import { read, utils } from 'xlsx';

export const ParseExcel:FC = () => {

    const [fileName, setFileName] = useState('')

    const handleFile = async(e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        if(!e.target.files)return;

        const file = e.target.files[0];

        setFileName(file.name);

        const data = await file.arrayBuffer();

        const workbook = read(data); 

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const jsonData = utils.sheet_to_json(worksheet);

        // solo matrices:

        // const jsonData = utils.sheet_to_json(worksheet, {
        //     header: 1,
        //     defval: "",
        // });

        // solo matrices.

        console.log(jsonData)
    }

  return (
    <div>
        <h1>ParseExcel</h1>
        {
            fileName && (
                <p>
                    FileName: <span>{fileName}</span>
                </p>
            )
        }
        <input type="file" onChange={(e) => handleFile(e)}/>
    </div>
  )
}
