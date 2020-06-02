import React from 'react';
import preLoader from '../../../assets/Images/preLoader.svg'
import s from './Preloader.module.css'

let PreLoader = (props) => {
    return (<div className={s.preLoader}><img src = {preLoader} alt='preloader' /></div>)
}

export default PreLoader;