import { useState } from 'react'

export const useDelayFire = (props: any, delay: number = 500) => {
    const [lastPress, setLastPress] = useState(0)
    const [_props, set_props] = useState(props)

    const fire = (toFire: Function) => {
        var time = Date.now()
        if (time > lastPress + delay) {
            toFire()
        }
        setLastPress(time)
    }

    const delayFire = (propName: String, value: any, toFire: Function) => {

        var __props = { ..._props }
        eval("__props." + propName + "=value")
        set_props(__props)
        setTimeout(() => { fire(toFire) }, delay + 1)
    }

    return { delayFire, _props, set_props }
}