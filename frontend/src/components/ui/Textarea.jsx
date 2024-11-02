import {forwardRef} from 'react'

// eslint-disable-next-line react/display-name
export const Textarea = forwardRef((props, ref) => {
    return (
    <textarea type="text" className="bg-zinc-800 px-3 py-2 block my-2 w-full" 
    {...props} ref={ref}>
         {/* eslint-disable-next-line react/prop-types */}
        {props.children}
    </textarea>
    )
})

export default Textarea