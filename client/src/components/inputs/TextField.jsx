import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
const TextField = ({ label, height = 400, onChange, value = '' }) => {
    return (
        <div className='flex flex-col gap-2'>
            <label className='font-medium'>{label}</label>
            <Editor
                apiKey={import.meta.env.VITE_TINYCME_ID}
                initialValue={value}
                init={{
                    height,
                    width: '100%',
                    menubar: true,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onChange={e => onChange(e.target.getContent())}
            // onFocus={() => setInvalidFields && setInvalidFields([])}
            />
        </div>
    )
}

export default TextField