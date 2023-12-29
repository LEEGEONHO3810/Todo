/* eslint-disable*/

import React, {useState} from 'react';

export default function Form({value,setValue ,handleSubmit }) {

    const handleChange = (e) =>{
        setValue(e.target.value);
    }

    return (
        <div>
            <form className="flex pt-2">
                <input type="text" name="value"
                       className="w-full px-3 py-2 mr-4 text-gray-400 border rounded shadow"
                       placeholder="해야 할 일을 입력하세요.."
                       onChange={handleChange}
                       value={value}
                />
                <input type="submit" value="입력"
                       className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200"
                       onClick={handleSubmit}
                />
            </form>
        </div>
    );
}
